import type { TimeInterpretation } from "@/components/time-result";

// Timezone abbreviation mappings with common ambiguities
const TIMEZONE_MAP: Record<
  string,
  { name: string; offset: string; alternatives?: string[] }
> = {
  CST: {
    name: "Central Standard Time (US)",
    offset: "UTC-6",
    alternatives: ["China Standard Time (UTC+8)"],
  },
  EST: { name: "Eastern Standard Time", offset: "UTC-5" },
  PST: { name: "Pacific Standard Time", offset: "UTC-8" },
  MST: { name: "Mountain Standard Time", offset: "UTC-7" },
  CDT: { name: "Central Daylight Time", offset: "UTC-5" },
  EDT: { name: "Eastern Daylight Time", offset: "UTC-4" },
  PDT: { name: "Pacific Daylight Time", offset: "UTC-7" },
  MDT: { name: "Mountain Daylight Time", offset: "UTC-6" },
  GMT: { name: "Greenwich Mean Time", offset: "UTC+0" },
  UTC: { name: "Coordinated Universal Time", offset: "UTC+0" },
  IST: {
    name: "India Standard Time",
    offset: "UTC+5:30",
    alternatives: ["Irish Standard Time (UTC+1)", "Israel Standard Time (UTC+2)"],
  },
  BST: { name: "British Summer Time", offset: "UTC+1" },
  CET: { name: "Central European Time", offset: "UTC+1" },
  CEST: { name: "Central European Summer Time", offset: "UTC+2" },
  JST: { name: "Japan Standard Time", offset: "UTC+9" },
  AEST: { name: "Australian Eastern Standard Time", offset: "UTC+10" },
  AEDT: { name: "Australian Eastern Daylight Time", offset: "UTC+11" },
  SGT: { name: "Singapore Time", offset: "UTC+8" },
  HKT: { name: "Hong Kong Time", offset: "UTC+8" },
  KST: { name: "Korea Standard Time", offset: "UTC+9" },
};

// Day name patterns
const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function getNextDayOfWeek(dayName: string, fromDate: Date): Date {
  const targetDay = DAYS.indexOf(dayName.toLowerCase());
  if (targetDay === -1) return fromDate;

  const result = new Date(fromDate);
  const currentDay = result.getDay();
  let daysUntil = targetDay - currentDay;

  if (daysUntil <= 0) {
    daysUntil += 7;
  }

  result.setDate(result.getDate() + daysUntil);
  return result;
}

function parseTimeString(
  timeStr: string
): { hours: number; minutes: number } | null {
  // Match patterns like "10am", "10:30pm", "14:00", "2 PM"
  const patterns = [
    /(\d{1,2}):(\d{2})\s*(am|pm)?/i,
    /(\d{1,2})\s*(am|pm)/i,
    /(\d{2})(\d{2})(?:\s*h(?:rs?)?)?/i,
  ];

  for (const pattern of patterns) {
    const match = timeStr.match(pattern);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[2]?.length === 2 ? parseInt(match[2], 10) : 0;
      const period = match[3]?.toLowerCase();

      if (period === "pm" && hours !== 12) hours += 12;
      if (period === "am" && hours === 12) hours = 0;

      return { hours, minutes };
    }
  }
  return null;
}

function extractTimezone(text: string): {
  timezone: string;
  info: (typeof TIMEZONE_MAP)[string];
} | null {
  const upperText = text.toUpperCase();
  for (const [abbr, info] of Object.entries(TIMEZONE_MAP)) {
    if (upperText.includes(abbr)) {
      return { timezone: abbr, info };
    }
  }
  return null;
}

function extractDayReference(
  text: string
): { day: string; isNext: boolean } | null {
  const lowerText = text.toLowerCase();
  const nextMatch = lowerText.match(/next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);
  if (nextMatch) {
    return { day: nextMatch[1], isNext: true };
  }

  for (const day of DAYS) {
    if (lowerText.includes(day)) {
      return { day, isNext: false };
    }
  }
  return null;
}

function isDSTActive(date: Date, timezone: string): boolean {
  // Simplified DST check for US timezones
  // DST in US: Second Sunday of March to First Sunday of November
  const month = date.getMonth();
  if (month > 2 && month < 10) return true; // April to October
  if (month === 2) {
    // March - check if after second Sunday
    const secondSunday = new Date(date.getFullYear(), 2, 1);
    while (secondSunday.getDay() !== 0) secondSunday.setDate(secondSunday.getDate() + 1);
    secondSunday.setDate(secondSunday.getDate() + 7);
    return date >= secondSunday;
  }
  if (month === 10) {
    // November - check if before first Sunday
    const firstSunday = new Date(date.getFullYear(), 10, 1);
    while (firstSunday.getDay() !== 0) firstSunday.setDate(firstSunday.getDate() + 1);
    return date < firstSunday;
  }
  return false;
}

export function parseTimeInput(input: string): TimeInterpretation | null {
  if (!input.trim()) return null;

  const assumptions: string[] = [];
  const dateBoundaryChanges: string[] = [];
  let confidence: "high" | "medium" | "low" = "high";

  // Extract components
  const time = parseTimeString(input);
  const tz = extractTimezone(input);
  const dayRef = extractDayReference(input);

  if (!time) {
    return null;
  }

  // Build the date
  let targetDate = new Date();
  if (dayRef) {
    targetDate = getNextDayOfWeek(dayRef.day, new Date());
  }

  targetDate.setHours(time.hours, time.minutes, 0, 0);

  // Handle timezone
  let timezone = "Local Time";
  let utcOffset = `UTC${new Date().getTimezoneOffset() > 0 ? "-" : "+"}${Math.abs(new Date().getTimezoneOffset() / 60)}`;

  if (tz) {
    timezone = tz.info.name;
    utcOffset = tz.info.offset;

    if (tz.info.alternatives) {
      assumptions.push(
        `Assumed ${tz.timezone} = ${tz.info.name}, not ${tz.info.alternatives.join(" or ")}`
      );
      confidence = "medium";
    }
  } else {
    assumptions.push("No timezone specified — using your local timezone");
    confidence = "medium";
  }

  // Check DST
  const isDst = tz ? isDSTActive(targetDate, tz.timezone) : isDSTActive(targetDate, "local");

  // Check for date boundary changes (LA mention in example)
  if (input.toLowerCase().includes("la") || input.toLowerCase().includes("los angeles")) {
    const laOffset = isDst ? -7 : -8; // PDT or PST
    if (tz && tz.timezone.startsWith("C")) {
      // Central time
      const hourDiff = Math.abs(laOffset - (isDst ? -5 : -6));
      if (time.hours - hourDiff < 0) {
        dateBoundaryChanges.push(
          `This time falls on the previous day in Los Angeles (Pacific Time)`
        );
      }
    }
  }

  // Format outputs
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const interpretedDate = targetDate.toLocaleDateString("en-US", options);
  const interpretedTime = targetDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // ISO timestamp
  const isoTimestamp = targetDate.toISOString();

  // Generate explanation
  let explanation = `This refers to ${interpretedTime} on ${interpretedDate}`;
  if (tz) {
    explanation += ` in ${tz.info.name}`;
  }
  explanation += ". ";
  if (isDst) {
    explanation += "Daylight Saving Time is currently in effect for this timezone. ";
  }
  if (dateBoundaryChanges.length > 0) {
    explanation += "Note that this time crosses date boundaries in some regions.";
  }

  return {
    inputText: input,
    interpretedDate,
    interpretedTime,
    timezone,
    utcOffset,
    isDstActive: isDst,
    dateBoundaryChanges,
    assumptions,
    isoTimestamp,
    explanation,
    confidence,
  };
}
