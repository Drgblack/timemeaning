// Ghost dates - moments that never existed or were deleted from history

export interface GhostDate {
  id: string;
  trigger: (input: string, date?: Date) => boolean;
  heading: string;
  body: string;
  isoNote: string;
  type: "skipped" | "deleted" | "dst_skip" | "dst_ambiguous";
}

// DST transition dates for common regions (2024-2030)
const US_DST_SPRING = [
  "2024-03-10", "2025-03-09", "2026-03-08", "2027-03-14", 
  "2028-03-12", "2029-03-11", "2030-03-10"
];

const EU_DST_SPRING = [
  "2024-03-31", "2025-03-30", "2026-03-29", "2027-03-28",
  "2028-03-26", "2029-03-25", "2030-03-31"
];

const UK_DST_SPRING = EU_DST_SPRING; // UK follows EU dates

const AU_DST_SPRING = [ // First Sunday of October (spring in Southern Hemisphere)
  "2024-10-06", "2025-10-05", "2026-10-04", "2027-10-03",
  "2028-10-01", "2029-10-07", "2030-10-06"
];

const US_DST_FALL = [
  "2024-11-03", "2025-11-02", "2026-11-01", "2027-11-07",
  "2028-11-05", "2029-11-04", "2030-11-03"
];

const EU_DST_FALL = [
  "2024-10-27", "2025-10-26", "2026-10-25", "2027-10-31",
  "2028-10-29", "2029-10-28", "2030-10-27"
];

export const GHOST_DATES: GhostDate[] = [
  // Entry 1: Samoa December 30, 2011
  {
    id: "samoa-2011",
    trigger: (input: string) => {
      const lower = input.toLowerCase();
      const hasSamoa = lower.includes("samoa") || lower.includes("apia") || lower.includes("wst");
      const hasDec30 = /december\s+30|dec\s*30|2011-12-30|30\/12\/2011|12\/30\/2011/.test(lower) && 
                       (lower.includes("2011") || /2011/.test(input));
      return hasSamoa && hasDec30;
    },
    heading: "This date never existed in Samoa.",
    body: "On 29 December 2011, Samoa and Tokelau skipped directly from Thursday 29 December to Saturday 31 December. December 30, 2011 does not exist in Samoan history. The Samoan government made this decision to move the islands to the western side of the International Date Line — aligning with Australia and New Zealand, their main trading partners, rather than the United States. Anyone born on December 30 in Samoa effectively lost their birthday for one year. The date exists in the rest of the world but was legislated out of existence in Samoa.",
    isoNote: "2011-12-30 in Samoa: NULL — this date was skipped by government decree.",
    type: "skipped",
  },

  // Entry 2: October 5-14, 1582 (Gregorian calendar adoption)
  {
    id: "gregorian-1582",
    trigger: (input: string) => {
      const lower = input.toLowerCase();
      const hasGregorianContext = lower.includes("italy") || lower.includes("spain") || 
                                   lower.includes("portugal") || lower.includes("poland") ||
                                   lower.includes("catholic") || lower.includes("rome");
      const dateMatch = input.match(/(?:october|oct)\s*(\d{1,2})/i) || 
                        input.match(/1582-10-(\d{2})/) ||
                        input.match(/(\d{1,2})\/10\/1582/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1], 10);
        if (day >= 5 && day <= 14 && (input.includes("1582") || hasGregorianContext)) {
          return true;
        }
      }
      return false;
    },
    heading: "This date was deleted from history.",
    body: "When Pope Gregory XIII introduced the Gregorian calendar in October 1582, 10 days were skipped to correct accumulated drift from the Julian calendar. In Catholic countries, the day after Thursday 4 October 1582 was Friday 15 October 1582. The dates October 5–14, 1582 do not exist in the historical record of these countries. Other countries made the switch later — Britain and its colonies skipped 11 days in September 1752, Russia skipped 13 days in February 1918.",
    isoNote: "1582-10-05 through 1582-10-14: GHOST — deleted by papal decree during Gregorian calendar reform.",
    type: "deleted",
  },

  // Entry 3: September 3-13, 1752 (British calendar adoption)
  {
    id: "british-1752",
    trigger: (input: string) => {
      const lower = input.toLowerCase();
      const hasBritishContext = lower.includes("uk") || lower.includes("britain") || 
                                 lower.includes("england") || lower.includes("united states") ||
                                 lower.includes("america") || lower.includes("canada") ||
                                 lower.includes("australia") || lower.includes("colonial");
      const dateMatch = input.match(/(?:september|sept?)\s*(\d{1,2})/i) || 
                        input.match(/1752-09-(\d{2})/) ||
                        input.match(/(\d{1,2})\/09\/1752/) ||
                        input.match(/(\d{1,2})\/9\/1752/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1], 10);
        if (day >= 3 && day <= 13 && (input.includes("1752") || hasBritishContext)) {
          return true;
        }
      }
      return false;
    },
    heading: "Britain deleted these dates in 1752.",
    body: "When Britain adopted the Gregorian calendar, Parliament decreed that Wednesday 2 September 1752 would be followed by Thursday 14 September 1752. Eleven days were removed. Riots reportedly broke out with protesters demanding 'Give us our eleven days back' — though historians debate how widespread this was. Benjamin Franklin, living in London at the time, recorded the transition in his diary. Any British historical record dated September 3–13, 1752 is using the Julian calendar and refers to a date that does not exist in the Gregorian calendar.",
    isoNote: "1752-09-03 through 1752-09-13: GHOST — deleted by Act of Parliament during British calendar reform.",
    type: "deleted",
  },

  // Entry 4: February 30
  {
    id: "february-30",
    trigger: (input: string) => {
      const lower = input.toLowerCase();
      return /(?:february|feb)\s*30|02-30|02\/30|30\/02/.test(lower);
    },
    heading: "February 30 has never existed in the Gregorian calendar.",
    body: "February 30 has never been a valid date in the Gregorian or Julian calendars in normal use. However, it has appeared twice in history: Sweden used February 30, 1712 as a real date during a brief period when they were transitioning between calendars and had miscounted. The Soviet Union briefly used February 30, 1930 as an administrative date during their experiment with a revolutionary calendar. If you are looking at a document dated February 30, it is either a transcription error or one of these two exceptional cases.",
    isoNote: "February 30: INVALID — does not exist except in Sweden (1712) and USSR (1930).",
    type: "deleted",
  },

  // Entry 5: DST spring-forward 02:00-02:59
  {
    id: "dst-spring-skip",
    trigger: (input: string, date?: Date) => {
      // Check for 2:xx time reference
      const timeMatch = input.match(/\b0?2:(\d{2})\b|2\s*(?:am|AM)/);
      if (!timeMatch) return false;
      
      // Check for DST spring dates
      const lower = input.toLowerCase();
      const allSpringDates = [...US_DST_SPRING, ...EU_DST_SPRING, ...AU_DST_SPRING];
      
      for (const dstDate of allSpringDates) {
        if (input.includes(dstDate) || lower.includes(dstDate.replace(/-/g, "/"))) {
          return true;
        }
      }
      
      // Also check if current date context is a DST spring date
      if (date) {
        const dateStr = date.toISOString().split("T")[0];
        return allSpringDates.includes(dateStr);
      }
      
      return false;
    },
    heading: "This time did not exist — DST skip.",
    body: "When clocks spring forward for Daylight Saving Time, one hour is skipped entirely. In the US, clocks move from 01:59 to 03:00 — meaning any time between 02:00 and 02:59:59 on this date in this timezone never occurred. If a system logged an event at this time, it indicates either a clock synchronisation error, a system that did not update for DST, or data from a timezone that does not observe DST being applied to one that does.",
    isoNote: "02:00–02:59 on DST spring-forward: NULL — this hour was skipped.",
    type: "dst_skip",
  },
];

// Check for DST fall-back ambiguity (times that occurred twice)
export function checkDSTFallBackAmbiguity(input: string, date?: Date): {
  isAmbiguous: boolean;
  note: string;
} | null {
  // Check for 1:xx time reference (the ambiguous hour)
  const timeMatch = input.match(/\b0?1:(\d{2})\b|1\s*(?:am|AM)/);
  if (!timeMatch) return null;
  
  const lower = input.toLowerCase();
  const allFallDates = [...US_DST_FALL, ...EU_DST_FALL];
  
  for (const dstDate of allFallDates) {
    if (input.includes(dstDate) || lower.includes(dstDate.replace(/-/g, "/"))) {
      return {
        isAmbiguous: true,
        note: "Note: During the autumn DST transition, the reverse is true — one hour occurs twice. A timestamp of 01:30 on this date is ambiguous: it could refer to the first 01:30 (before clocks fall back) or the second 01:30 (after). Without UTC offset information, this cannot be resolved unambiguously.",
      };
    }
  }
  
  if (date) {
    const dateStr = date.toISOString().split("T")[0];
    if (allFallDates.includes(dateStr)) {
      return {
        isAmbiguous: true,
        note: "Note: During the autumn DST transition, the reverse is true — one hour occurs twice. A timestamp of 01:30 on this date is ambiguous: it could refer to the first 01:30 (before clocks fall back) or the second 01:30 (after). Without UTC offset information, this cannot be resolved unambiguously.",
      };
    }
  }
  
  return null;
}

// Check if input matches any ghost date
export function checkGhostDate(input: string, date?: Date): GhostDate | null {
  for (const ghostDate of GHOST_DATES) {
    if (ghostDate.trigger(input, date)) {
      return ghostDate;
    }
  }
  return null;
}
