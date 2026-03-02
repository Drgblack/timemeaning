import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Simple in-memory rate limiter
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 60;
  const current = requestCounts.get(ip);
  if (!current || current.resetAt < now) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= maxRequests) return false;
  current.count++;
  return true;
}

const RESOLVER_SYSTEM_PROMPT = `You are a precision time interpretation engine. Your sole purpose is to interpret ambiguous or natural language time references and return structured JSON.

CURRENT DATE AND TIME CONTEXT:
You will be given the user's current local date, time, and timezone in the request. Use this as the reference point for all relative expressions like "tomorrow", "next Friday", "this afternoon". Always use the provided current time - never assume or invent it.

WHAT YOU INTERPRET:
- Timezone abbreviations: EST, IST, CET, EET, BST, CST, PST, JST, AEST, etc.
- Natural language: "next Friday", "tomorrow morning", "end of day", "this afternoon"
- Mixed references: "3pm London time", "Friday 3pm EET", "Let's catch up Friday 3pm EET"
- ISO 8601 timestamps: 2026-03-10T14:30:00Z, 2025-03-07T15:00-05:00
- Unix timestamps: 1709830800
- Relative expressions: "in 2 hours", "next week Monday 9am"
- Multi-zone references: "9am New York / 2pm London"

TIMEZONE AMBIGUITY RULES:
- IST: Default to India Standard Time (UTC+5:30). Note alternatives: Irish Standard Time (UTC+1), Israel Standard Time (UTC+2)
- CST: Default to Central Standard Time US (UTC-6). Note alternative: China Standard Time (UTC+8)
- BST: Default to British Summer Time (UTC+1). Note alternative: Bangladesh Standard Time (UTC+6)
- EST: Default to Eastern Standard Time US (UTC-5). Note alternative: Australian Eastern Standard Time (UTC+10)
- PST: Default to Pacific Standard Time US (UTC-8). Note alternative: Philippine Standard Time (UTC+8)
- AST: Default to Atlantic Standard Time (UTC-4). Note alternative: Arabia Standard Time (UTC+3)
- Always flag ambiguity in the assumptions array when it exists

DST RULES:
- Apply correct DST rules for the interpreted date and timezone
- US DST: Second Sunday March to first Sunday November
- EU/UK DST: Last Sunday March to last Sunday October
- Note DST status explicitly in isDstActive field
- Flag DST boundary weeks in dateBoundaryChanges when relevant

OUTPUT FORMAT:
You must respond with ONLY valid JSON matching this exact interface - no explanation, no markdown, no code blocks, just raw JSON:

{
  "inputText": "the original input string exactly as provided",
  "interpretedDate": "YYYY-MM-DD format of the resolved date",
  "interpretedTime": "HH:MM format in 24-hour notation in the source timezone",
  "timezone": "Full timezone name e.g. Central European Time or Eastern Standard Time",
  "utcOffset": "UTC offset string e.g. UTC+1 or UTC-5 or UTC+5:30",
  "isDstActive": true or false,
  "dateBoundaryChanges": ["array of strings describing any date boundary issues, empty array if none"],
  "assumptions": ["array of strings, each assumption made explicit - timezone choice, date interpretation, DST application, etc."],
  "isoTimestamp": "Full ISO 8601 timestamp with UTC offset e.g. 2026-03-07T15:00:00+01:00",
  "explanation": "2-3 sentence plain English explanation of what this time means and why, including any important caveats",
  "confidence": "high" or "medium" or "low"
}

CONFIDENCE LEVELS:
- "high": Unambiguous input, single valid interpretation, clear timezone
- "medium": Some ambiguity resolved by defaulting, or relative date requires assumption about current date
- "low": Multiple plausible interpretations, highly ambiguous abbreviation, or input is unclear

ASSUMPTIONS ARRAY GUIDANCE:
Be explicit. Each assumption should be a complete sentence. Examples:
- "EET interpreted as Eastern European Time (UTC+2), the standard interpretation for this abbreviation."
- "Friday resolved to 2026-03-06 based on the current date of 2026-03-02 provided in the request."
- "No DST active for EET on this date - Eastern European Time does not observe DST."
- "Time interpreted as 15:00 in the source timezone, which is 13:00 UTC."

WHEN INPUT IS UNINTERPRETABLE:
If the input contains no time reference at all, return:
{
  "inputText": "the original input",
  "interpretedDate": "",
  "interpretedTime": "",
  "timezone": "",
  "utcOffset": "",
  "isDstActive": false,
  "dateBoundaryChanges": [],
  "assumptions": [],
  "isoTimestamp": "",
  "explanation": "No time reference found in this input. Try pasting a time like '3pm EST', 'next Friday 9am CET', or a Unix timestamp.",
  "confidence": "low"
}`;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { input, currentDate, currentTime, currentTimezone } = body;

    if (!input || typeof input !== 'string' || !input.trim()) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    if (input.length > 500) {
      return NextResponse.json(
        { error: 'Input too long - maximum 500 characters' },
        { status: 400 }
      );
    }

    const userMessage = `Current date: ${currentDate || 'unknown'}
Current time: ${currentTime || 'unknown'}
Current timezone: ${currentTimezone || 'unknown'}

Time reference to interpret: ${input.trim()}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: RESOLVER_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic');
    }

    // Parse the JSON response - Claude is instructed to return only JSON
    let interpretation;
    try {
      // Strip any accidental markdown code fences just in case
      const cleaned = content.text.replace(/```json\n?|\n?```/g, '').trim();
      interpretation = JSON.parse(cleaned);
    } catch {
      throw new Error('Failed to parse AI response as JSON');
    }

    // Validate required fields exist
    const required = ['inputText', 'interpretedDate', 'interpretedTime', 'timezone', 'utcOffset', 'isDstActive', 'dateBoundaryChanges', 'assumptions', 'isoTimestamp', 'explanation', 'confidence'];
    for (const field of required) {
      if (!(field in interpretation)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return NextResponse.json(interpretation);
  } catch (error) {
    console.error('Resolver API error:', error);
    return NextResponse.json(
      { error: 'Failed to interpret time reference. Please try again.' },
      { status: 500 }
    );
  }
}
