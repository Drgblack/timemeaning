// DST transition data for 2026 and 2027
// All dates are in ISO format (YYYY-MM-DD)
// Time is local time when the transition occurs

export interface DSTTransition {
  region: string;
  date: string; // ISO date
  time: string; // Local time of transition
  fromOffset: string;
  toOffset: string;
  direction: "spring-forward" | "fall-back";
  note?: string;
}

export interface RegionDST {
  region: string;
  observesDST: boolean;
  transitions: DSTTransition[];
  note?: string;
}

// 2026 DST transitions
export const dstData2026: RegionDST[] = [
  // United States (most states)
  {
    region: "United States",
    observesDST: true,
    transitions: [
      { region: "United States", date: "2026-03-08", time: "02:00", fromOffset: "varies", toOffset: "+1 hour", direction: "spring-forward", note: "Clocks spring forward" },
      { region: "United States", date: "2026-11-01", time: "02:00", fromOffset: "varies", toOffset: "-1 hour", direction: "fall-back", note: "Clocks fall back" },
    ],
  },
  // Canada (most provinces)
  {
    region: "Canada",
    observesDST: true,
    transitions: [
      { region: "Canada", date: "2026-03-08", time: "02:00", fromOffset: "varies", toOffset: "+1 hour", direction: "spring-forward" },
      { region: "Canada", date: "2026-11-01", time: "02:00", fromOffset: "varies", toOffset: "-1 hour", direction: "fall-back" },
    ],
  },
  // European Union
  {
    region: "European Union",
    observesDST: true,
    transitions: [
      { region: "European Union", date: "2026-03-29", time: "01:00 UTC", fromOffset: "CET/WET/EET", toOffset: "CEST/WEST/EEST", direction: "spring-forward", note: "Clocks spring forward" },
      { region: "European Union", date: "2026-10-25", time: "01:00 UTC", fromOffset: "CEST/WEST/EEST", toOffset: "CET/WET/EET", direction: "fall-back", note: "Clocks fall back" },
    ],
  },
  // United Kingdom
  {
    region: "United Kingdom",
    observesDST: true,
    transitions: [
      { region: "United Kingdom", date: "2026-03-29", time: "01:00", fromOffset: "GMT (UTC+0)", toOffset: "BST (UTC+1)", direction: "spring-forward" },
      { region: "United Kingdom", date: "2026-10-25", time: "02:00", fromOffset: "BST (UTC+1)", toOffset: "GMT (UTC+0)", direction: "fall-back" },
    ],
  },
  // Australia - New South Wales, Victoria, Tasmania, South Australia, ACT
  {
    region: "Australia (NSW, VIC, TAS, SA, ACT)",
    observesDST: true,
    transitions: [
      { region: "Australia (NSW, VIC, TAS, SA, ACT)", date: "2026-04-05", time: "03:00", fromOffset: "AEDT (UTC+11) / ACDT (UTC+10:30)", toOffset: "AEST (UTC+10) / ACST (UTC+9:30)", direction: "fall-back", note: "End of daylight saving" },
      { region: "Australia (NSW, VIC, TAS, SA, ACT)", date: "2026-10-04", time: "02:00", fromOffset: "AEST (UTC+10) / ACST (UTC+9:30)", toOffset: "AEDT (UTC+11) / ACDT (UTC+10:30)", direction: "spring-forward", note: "Start of daylight saving" },
    ],
  },
  // Australia - Queensland, Northern Territory, Western Australia
  {
    region: "Australia (QLD, NT, WA)",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
  // New Zealand
  {
    region: "New Zealand",
    observesDST: true,
    transitions: [
      { region: "New Zealand", date: "2026-04-05", time: "03:00", fromOffset: "NZDT (UTC+13)", toOffset: "NZST (UTC+12)", direction: "fall-back" },
      { region: "New Zealand", date: "2026-09-27", time: "02:00", fromOffset: "NZST (UTC+12)", toOffset: "NZDT (UTC+13)", direction: "spring-forward" },
    ],
  },
  // Mexico (most of country - except Sonora which follows Arizona)
  {
    region: "Mexico",
    observesDST: true,
    transitions: [
      { region: "Mexico", date: "2026-04-05", time: "02:00", fromOffset: "varies", toOffset: "+1 hour", direction: "spring-forward" },
      { region: "Mexico", date: "2026-10-25", time: "02:00", fromOffset: "varies", toOffset: "-1 hour", direction: "fall-back" },
    ],
    note: "Border regions may follow US schedule",
  },
  // Chile
  {
    region: "Chile",
    observesDST: true,
    transitions: [
      { region: "Chile", date: "2026-04-05", time: "00:00", fromOffset: "CLST (UTC-3)", toOffset: "CLT (UTC-4)", direction: "fall-back" },
      { region: "Chile", date: "2026-09-06", time: "00:00", fromOffset: "CLT (UTC-4)", toOffset: "CLST (UTC-3)", direction: "spring-forward" },
    ],
  },
  // Brazil (no longer observes DST as of 2019)
  {
    region: "Brazil",
    observesDST: false,
    transitions: [],
    note: "Abolished daylight saving time in 2019",
  },
  // Morocco
  {
    region: "Morocco",
    observesDST: true,
    transitions: [
      { region: "Morocco", date: "2026-03-29", time: "02:00", fromOffset: "UTC+0", toOffset: "UTC+1", direction: "spring-forward" },
      { region: "Morocco", date: "2026-10-25", time: "03:00", fromOffset: "UTC+1", toOffset: "UTC+0", direction: "fall-back" },
    ],
    note: "Suspends DST during Ramadan",
  },
  // Japan
  {
    region: "Japan",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
  // China
  {
    region: "China",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
  // India
  {
    region: "India",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
  // Singapore
  {
    region: "Singapore",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
  // UAE
  {
    region: "United Arab Emirates",
    observesDST: false,
    transitions: [],
    note: "Does not observe daylight saving time",
  },
];

// 2027 DST transitions
export const dstData2027: RegionDST[] = [
  {
    region: "United States",
    observesDST: true,
    transitions: [
      { region: "United States", date: "2027-03-14", time: "02:00", fromOffset: "varies", toOffset: "+1 hour", direction: "spring-forward" },
      { region: "United States", date: "2027-11-07", time: "02:00", fromOffset: "varies", toOffset: "-1 hour", direction: "fall-back" },
    ],
  },
  {
    region: "Canada",
    observesDST: true,
    transitions: [
      { region: "Canada", date: "2027-03-14", time: "02:00", fromOffset: "varies", toOffset: "+1 hour", direction: "spring-forward" },
      { region: "Canada", date: "2027-11-07", time: "02:00", fromOffset: "varies", toOffset: "-1 hour", direction: "fall-back" },
    ],
  },
  {
    region: "European Union",
    observesDST: true,
    transitions: [
      { region: "European Union", date: "2027-03-28", time: "01:00 UTC", fromOffset: "CET/WET/EET", toOffset: "CEST/WEST/EEST", direction: "spring-forward" },
      { region: "European Union", date: "2027-10-31", time: "01:00 UTC", fromOffset: "CEST/WEST/EEST", toOffset: "CET/WET/EET", direction: "fall-back" },
    ],
  },
  {
    region: "United Kingdom",
    observesDST: true,
    transitions: [
      { region: "United Kingdom", date: "2027-03-28", time: "01:00", fromOffset: "GMT (UTC+0)", toOffset: "BST (UTC+1)", direction: "spring-forward" },
      { region: "United Kingdom", date: "2027-10-31", time: "02:00", fromOffset: "BST (UTC+1)", toOffset: "GMT (UTC+0)", direction: "fall-back" },
    ],
  },
];

export function getAllTransitions(): DSTTransition[] {
  const all: DSTTransition[] = [];
  [...dstData2026, ...dstData2027].forEach(region => {
    all.push(...region.transitions);
  });
  return all.sort((a, b) => a.date.localeCompare(b.date));
}

export function getTransitionsInRange(startDate: Date, endDate: Date): DSTTransition[] {
  const all = getAllTransitions();
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  return all.filter(t => t.date >= start && t.date <= end);
}

export function getStableRegions(): RegionDST[] {
  return [...dstData2026].filter(r => !r.observesDST);
}
