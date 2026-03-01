import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { CHAT_CONFIG, SYSTEM_PROMPT, ARTICLE_CONTEXT_PROMPTS } from '@/lib/chatConfig';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory rate limiter — replace with Redis-based for production
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 30;
  const current = requestCounts.get(ip);
  if (!current || current.resetAt < now) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= maxRequests) return false;
  current.count++;
  return true;
}

function getStaticFallback(messages: any[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

  if (lastMessage.includes('ist')) {
    return 'IST has three meanings: India Standard Time (UTC+5:30), Irish Standard Time (UTC+1 in summer, UTC+0 in winter), and Israel Standard Time (UTC+2 standard, UTC+3 during DST). These interpretations are up to 5.5 hours apart. Use the TimeMeaning resolver at timemeaning.com to resolve a specific IST reference.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('cst')) {
    return 'CST has two main meanings: Central Standard Time (UTC−6, used in central North America) and China Standard Time (UTC+8). These are 14 hours apart. Use timemeaning.com/tools/lookup?q=CST to see all interpretations.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('bst')) {
    return 'BST has two meanings: British Summer Time (UTC+1, used in the UK during summer months) and Bangladesh Standard Time (UTC+6). These are 5 hours apart. Use timemeaning.com/tools/lookup?q=BST to see both interpretations.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('dst') || lastMessage.includes('daylight')) {
    return 'Daylight Saving Time shifts clocks forward in spring and back in autumn. The US, EU, UK, and Australia all change on different dates, creating windows where offsets between regions differ from their usual values. See timemeaning.com/tools/dst-map for current DST status by region.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('utc') || lastMessage.includes('gmt')) {
    return 'UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks. GMT (Greenwich Mean Time) is effectively identical to UTC for most practical purposes, but GMT is a timezone while UTC is a time standard. Neither observes Daylight Saving Time.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('unix') || lastMessage.includes('epoch') || lastMessage.includes('timestamp')) {
    return 'A Unix timestamp is the number of seconds elapsed since 1 January 1970 00:00:00 UTC (the Unix epoch). It is timezone-independent. To convert: paste the number into timemeaning.com and it will return the human-readable UTC equivalent.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('iso') || lastMessage.includes('8601')) {
    return 'ISO 8601 is the international standard for representing dates and times. A complete ISO 8601 timestamp looks like `2026-03-10T14:30:00+01:00` — date, T separator, time, and UTC offset. The Z suffix means UTC exactly: `2026-03-10T14:30:00Z`.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }
  if (lastMessage.includes('zulu') || lastMessage.includes('military')) {
    return 'Zulu time is military and aviation notation for UTC. "14:30Z" means 14:30 UTC. Each timezone has a letter code — Z for UTC, A for UTC+1, N for UTC-1, and so on. Zulu is unambiguous, which is why aviation uses it exclusively.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
  }

  return 'I\'m having trouble connecting right now. For time interpretation questions, try the main resolver at timemeaning.com, or the Timezone Abbreviation Lookup at timemeaning.com/tools/lookup.\n\n*Verify critical time decisions with authoritative sources. Timezone rules change.*';
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in an hour.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { messages, pageContext } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request — messages array required' },
        { status: 400 }
      );
    }

    if (messages.length > CHAT_CONFIG.maxMessagesPerSession * 2) {
      return NextResponse.json(
        { error: 'Session limit reached', code: 'SESSION_LIMIT' },
        { status: 429 }
      );
    }

    let systemPrompt = SYSTEM_PROMPT;
    if (pageContext && ARTICLE_CONTEXT_PROMPTS[pageContext]) {
      systemPrompt += `\n\nPAGE CONTEXT: ${ARTICLE_CONTEXT_PROMPTS[pageContext]}`;
    }

    const sanitisedMessages = messages.map((m: any) => ({
      role: m.role as 'user' | 'assistant',
      content: String(m.content).slice(0, 2000),
    }));

    try {
      const response = await anthropic.messages.create({
        model: CHAT_CONFIG.primaryModel,
        max_tokens: CHAT_CONFIG.maxTokens,
        system: systemPrompt,
        messages: sanitisedMessages,
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Anthropic');
      }

      return NextResponse.json({
        response: content.text,
        model: 'claude',
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
      });
    } catch (primaryError) {
      console.error('Primary model failed, attempting fallback:', primaryError);

      try {
        const fallbackResponse = await openai.chat.completions.create({
          model: CHAT_CONFIG.fallbackModel,
          max_tokens: CHAT_CONFIG.maxTokens,
          messages: [
            { role: 'system', content: systemPrompt },
            ...sanitisedMessages,
          ],
        });

        const fallbackContent = fallbackResponse.choices[0]?.message?.content;
        if (!fallbackContent) throw new Error('Empty fallback response');

        return NextResponse.json({
          response: fallbackContent,
          model: 'fallback',
          usage: {
            inputTokens: fallbackResponse.usage?.prompt_tokens || 0,
            outputTokens: fallbackResponse.usage?.completion_tokens || 0,
          },
        });
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
        return NextResponse.json({
          response: getStaticFallback(sanitisedMessages),
          model: 'static',
          usage: { inputTokens: 0, outputTokens: 0 },
        });
      }
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
