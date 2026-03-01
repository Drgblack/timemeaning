// Easter Egg definitions for TimeMeaning
// These are humorous, on-brand responses that treat impossible or absurd time references
// with the same deadpan precision as real ones.

export interface EasterEggResult {
  isEasterEgg: true;
  detectedPhrase: string;
  interpretedTime: string;
  timezone: string;
  dstStatus: string;
  isoFormat: string;
  plainEnglish: string;
  assumptions: string[];
}

interface EasterEggTrigger {
  patterns: RegExp[];
  result: Omit<EasterEggResult, 'isEasterEgg'>;
}

const easterEggs: EasterEggTrigger[] = [
  {
    patterns: [/heat death of the universe/i, /end of the universe/i],
    result: {
      detectedPhrase: "The Heat Death of the Universe",
      interpretedTime: "Approximately 10¹⁰⁶ years from now",
      timezone: "Universal — no regional exceptions apply at this scale",
      dstStatus: "Not observed. No star remains to cause seasonal variation.",
      isoFormat: "+999999999-12-31T23:59:59Z (maximum representable ISO 8601 date)",
      plainEnglish: "The universe will reach thermodynamic equilibrium — maximum entropy, no usable energy, no further change possible — in approximately ten to the power of one hundred and six years. All timezones will have converged to the same temperature: absolute zero. DST will not be observed.",
      assumptions: [
        "Assumed heat death over Big Rip or Big Crunch scenarios",
        "Gregorian calendar extrapolated beyond its intended range",
        "UTC+0 assumed as there will be no one left to argue for UTC+5:30"
      ]
    }
  },
  {
    patterns: [/tea time in wonderland/i, /mad hatter/i, /six o'clock in wonderland/i],
    result: {
      detectedPhrase: "Tea Time in Wonderland",
      interpretedTime: "Always 6:00 PM. Perpetually.",
      timezone: "Wonderland Standard Time — UTC offset undefined, clocks non-functional",
      dstStatus: "Time stopped at this moment following a dispute with Time itself. DST cannot apply to a clock that does not move.",
      isoFormat: "????-??-??T18:00:00+??:??",
      plainEnglish: "At the Mad Hatter's table, it is always six o'clock — the moment the Hatter offended Time and was punished with eternal teatime. The clocks show six. They have always shown six. They will always show six. If your meeting invite says six o'clock in Wonderland, you are already late, because the meeting never ended.",
      assumptions: [
        "Lewis Carroll's account treated as primary source",
        '"Six o\'clock" interpreted as 18:00, not 06:00, as tea is not served at dawn'
      ]
    }
  },
  {
    patterns: [/unix epoch/i, /epoch zero/i, /january 1 1970/i, /1970-01-01/i],
    result: {
      detectedPhrase: "Unix Epoch Zero",
      interpretedTime: "Thursday, 1 January 1970 at 00:00:00 UTC",
      timezone: "UTC+0 — the only correct timezone for this moment",
      dstStatus: "Inactive. It was January. Also, computing had not yet invented the concept of wasting time on DST handling.",
      isoFormat: "1970-01-01T00:00:00Z",
      plainEnglish: "This is the moment from which all Unix time is counted. Every timestamp in every server log, every database record, every epoch value you have ever seen is measured in seconds from this exact point. Before this moment, Unix time is negative. After this moment, Unix time is a very large number that will eventually overflow, which is a problem for 19 January 2038 to deal with.",
      assumptions: [
        "Coordinated Universal Time assumed",
        "Gregorian calendar assumed",
        "The Y2038 problem noted but not resolved here"
      ]
    }
  },
  {
    patterns: [/y2k/i, /year 2000/i, /millennium bug/i, /january 1 2000/i],
    result: {
      detectedPhrase: "Y2K — The Millennium Bug",
      interpretedTime: "Saturday, 1 January 2000 at 00:00:00 UTC",
      timezone: "Global — all timezones simultaneously held their breath",
      dstStatus: "Irrelevant. Civilisation was about to end.",
      isoFormat: "2000-01-01T00:00:00Z",
      plainEnglish: "At this moment, approximately 317 million lines of legacy code quietly decided not to destroy civilisation. Banks remained open. Planes stayed airborne. Nuclear systems did not misfire. The disaster that wasn't cost an estimated $300–600 billion to prevent — making it either the most expensive insurance policy in history or the most expensive non-event, depending on your perspective. TimeMeaning was not involved but endorses the decision to fix the bug rather than hope for the best.",
      assumptions: [
        "UTC assumed for the canonical rollover moment",
        "Catastrophic infrastructure failure assumed to have been averted",
        "Smug retrospective commentary noted"
      ]
    }
  },
  {
    patterns: [/mars sol/i, /mars time/i, /martian time/i],
    result: {
      detectedPhrase: "Mars Sol 100",
      interpretedTime: "Sol 100 of the Martian mission calendar",
      timezone: "Mars Coordinated Time (MTC) — UTC offset from Earth: currently −12 minutes 19 seconds per day, compounding",
      dstStatus: "Not observed. Mars has seasons — axial tilt 25.19° — but no governing body has legislated DST. Yet.",
      isoFormat: "Not applicable. The ISO 8601 standard does not cover interplanetary timekeeping.",
      plainEnglish: "A Martian Sol is 24 hours, 39 minutes, and 35.244 seconds long. NASA mission teams working on Mars rovers maintain \"Mars time\" — sleeping and waking on Martian schedules — which drifts against Earth time at a rate of roughly 40 minutes per day. After a month, Mars-time workers are living nocturnally by Earth standards. This is the most extreme timezone shift any commute has ever produced.",
      assumptions: [
        "Sol interpreted as Martian solar day",
        "MTC used as reference",
        "Dust storm probability not factored into schedule reliability"
      ]
    }
  },
  {
    patterns: [/5 o'clock somewhere/i, /five o'clock somewhere/i, /it's 5 o'clock somewhere/i],
    result: {
      detectedPhrase: "It's 5 o'clock somewhere",
      interpretedTime: "17:00, confirmed, in multiple locations simultaneously",
      timezone: "Several. This phrase has never failed to be technically accurate.",
      dstStatus: "Irrelevant to the spirit of the enquiry.",
      isoFormat: "Varies by jurisdiction. The intent is universal.",
      plainEnglish: "Confirmed. As of this moment, it is 17:00 in at least one populated timezone on Earth. This is always true. The statement \"it's 5 o'clock somewhere\" has been factually correct every minute of every day since timezones were standardised in 1884. TimeMeaning validates this interpretation without reservation. You may proceed accordingly.",
      assumptions: [
        '"5 o\'clock" interpreted as 17:00',
        '"Somewhere" interpreted as Earth',
        "Moral judgement withheld"
      ]
    }
  },
  {
    patterns: [/beer o'clock/i, /beer oclock/i, /beer-o-clock/i],
    result: {
      detectedPhrase: "Beer O'Clock",
      interpretedTime: "Now. Definitively now.",
      timezone: "Local — this expression is jurisdiction-aware and self-resolving",
      dstStatus: "Beer O'Clock automatically adjusts for DST without user input.",
      isoFormat: "[current timestamp] — dynamically resolved to the present moment",
      plainEnglish: "Beer O'Clock is a rare example of a fully unambiguous time expression. It refers to the current moment, in the user's local timezone, when the decision to stop working has been made. Unlike most time expressions, Beer O'Clock requires no disambiguation, carries no ambiguity, and is universally understood across all 195 countries where TimeMeaning operates. It is the only time expression this tool has never had to flag as unclear.",
      assumptions: [
        "Local timezone assumed",
        "Decision already made",
        "No follow-up meeting scheduled"
      ]
    }
  },
  {
    patterns: [/end of the internet/i, /end of internet/i, /reach the end of the internet/i],
    result: {
      detectedPhrase: "The End of the Internet",
      interpretedTime: "Page last updated: 404. Timestamp unavailable.",
      timezone: "The end of the internet exists outside all known timezone jurisdictions.",
      dstStatus: "Not observed. There is no daylight here.",
      isoFormat: "∞",
      plainEnglish: "You have reached the end of the internet. There is nothing beyond this point. The last page was a forum thread from 2003 asking whether anyone else thought Limewire was slowing down their computer. No one replied. Estimated travel time from your current location: approximately your entire remaining battery life plus the time it takes to realise you should have gone outside. TimeMeaning has resolved this timestamp as the present moment — because the end of the internet is wherever you stop clicking.",
      assumptions: [
        '"Internet" interpreted as the World Wide Web',
        "Travel time estimated using current tab count as a velocity modifier",
        "No return journey assumed"
      ]
    }
  },
  {
    patterns: [/hammer time/i, /stop hammer time/i],
    result: {
      detectedPhrase: "Hammer Time",
      interpretedTime: "Now. You cannot touch this.",
      timezone: "Cannot be converted. Cannot be disputed. Cannot be altered.",
      dstStatus: "Hammer Time does not observe Daylight Saving Time. Hammer Time observes no authority but itself.",
      isoFormat: "STOP",
      plainEnglish: "Hammer Time is one of the most precisely defined informal time expressions in recorded human culture. It begins at the exact moment MC Hammer instructs you to stop and cannot end until he indicates otherwise. No UTC offset applies. No regional variation exists. TimeMeaning treats this as an unambiguous time expression and declines to flag it for review.",
      assumptions: [
        "Stanley Kirk Burrell's authority over this time expression recognised",
        "Parachute trousers assumed"
      ]
    }
  },
  {
    patterns: [/half past a monkey's/i, /half past a monkey/i],
    result: {
      detectedPhrase: "Half Past a Monkey's",
      interpretedTime: "Approximately 30 minutes past an unspecified primate",
      timezone: "British English — this expression is geographically constrained to the United Kingdom and parts of the Commonwealth",
      dstStatus: "The monkey has not been consulted on DST. Interpretation proceeds without its input.",
      isoFormat: "????-??-??T??:30:00 — minutes confirmed, all other fields unknown",
      plainEnglish: "\"Half past a monkey's\" is a traditional British English deflection used when someone asks what time it is and the speaker either does not know or does not wish to say. TimeMeaning has parsed the expression, confirmed the 30-minute component, and cannot resolve the hour, date, timezone, or species of primate. This represents the tool's maximum ambiguity rating: 97% unresolvable. The full expression — \"half past a monkey's ar**\" — contains additional anatomical data that does not assist with timezone resolution.",
      assumptions: [
        "British English register assumed",
        "30-minute component treated as the only reliable data point",
        "Primate taxonomy not pursued further"
      ]
    }
  },
  {
    patterns: [/when pigs fly/i, /pigs fly/i],
    result: {
      detectedPhrase: "When Pigs Fly",
      interpretedTime: "No historical record of occurrence. Event unscheduled.",
      timezone: "Global — this event, if it occurs, will be timezone-agnostic",
      dstStatus: "Cannot be determined in advance of the event.",
      isoFormat: "null",
      plainEnglish: "TimeMeaning has searched its complete timezone database, its DST rules table, and its natural language parsing library and found no record of porcine aviation. The phrase \"when pigs fly\" is widely used to indicate an event that will never occur. TimeMeaning will update this interpretation if evidence of the underlying event becomes available. Until then, if your meeting invite contains this time expression, do not add it to your calendar.",
      assumptions: [
        "Standard Sus scrofa (domestic pig) assumed",
        "Hot air balloon and catapult scenarios excluded",
        "TimeMeaning monitoring the situation"
      ]
    }
  },
  {
    patterns: [/dst on the moon/i, /moon time/i, /lunar time/i],
    result: {
      detectedPhrase: "DST on the Moon",
      interpretedTime: "The Moon does not have a time.",
      timezone: "Lunar Standard Time has been proposed but not adopted. NASA uses UTC for lunar missions.",
      dstStatus: "The Moon is tidally locked to Earth. It does not rotate relative to the Sun in any way that would make seasonal timekeeping meaningful. DST would be incoherent.",
      isoFormat: "UTC, for mission purposes. The Moon itself does not care.",
      plainEnglish: "The Moon's surface experiences approximately two weeks of continuous daylight followed by two weeks of continuous darkness. The concept of \"saving daylight\" is therefore both impossible and redundant. Every moment on the Moon is either entirely light or entirely dark, depending on your location. The proposed Lunar Standard Time would be based on the Moon's own gravitational time dilation — which runs approximately 56 microseconds per day faster than Earth time. This is the most technically correct form of timezone confusion TimeMeaning has ever been asked to resolve.",
      assumptions: [
        "Earth's Moon assumed",
        "General relativity acknowledged",
        "No human settlement on the Moon assumed as of current date"
      ]
    }
  }
];

/**
 * Check if the input matches any Easter Egg trigger
 * Returns the Easter Egg result if found, null otherwise
 */
export function checkEasterEgg(input: string): EasterEggResult | null {
  const normalizedInput = input.trim().toLowerCase();
  
  for (const egg of easterEggs) {
    for (const pattern of egg.patterns) {
      if (pattern.test(normalizedInput)) {
        return {
          isEasterEgg: true,
          ...egg.result
        };
      }
    }
  }
  
  return null;
}

/**
 * Generate a simple hash for shareable URLs
 */
export function generateHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to base36 and pad/truncate to 8 characters
  const base36 = Math.abs(hash).toString(36);
  return (base36 + '00000000').substring(0, 8);
}
