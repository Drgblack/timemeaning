export interface AbbreviationMeaning {
  name: string;
  offset: string;
  dst: "observes" | "does not observe" | "seasonal";
  regions: string;
  note?: string;
}

export interface AbbreviationData {
  abbreviation: string;
  meanings: AbbreviationMeaning[];
}

export const timezoneAbbreviations: AbbreviationData[] = [
  {
    abbreviation: "IST",
    meanings: [
      { name: "India Standard Time", offset: "UTC+5:30", dst: "does not observe", regions: "India" },
      { name: "Irish Standard Time", offset: "UTC+1 summer, UTC+0 winter", dst: "seasonal", regions: "Ireland", note: "Only used during summer; winter uses GMT" },
      { name: "Israel Standard Time", offset: "UTC+2 standard, UTC+3 DST", dst: "observes", regions: "Israel", note: "DST dates vary annually by decree" },
    ],
  },
  {
    abbreviation: "CST",
    meanings: [
      { name: "Central Standard Time", offset: "UTC−6", dst: "observes", regions: "US, Canada", note: "Transitions to CDT (UTC−5) during DST" },
      { name: "China Standard Time", offset: "UTC+8", dst: "does not observe", regions: "China" },
    ],
  },
  {
    abbreviation: "BST",
    meanings: [
      { name: "British Summer Time", offset: "UTC+1", dst: "seasonal", regions: "United Kingdom", note: "Only used during summer; winter uses GMT" },
      { name: "Bangladesh Standard Time", offset: "UTC+6", dst: "does not observe", regions: "Bangladesh" },
    ],
  },
  {
    abbreviation: "AST",
    meanings: [
      { name: "Atlantic Standard Time", offset: "UTC−4", dst: "observes", regions: "Canada, Caribbean", note: "Transitions to ADT (UTC−3) during DST" },
      { name: "Arabia Standard Time", offset: "UTC+3", dst: "does not observe", regions: "Saudi Arabia, Qatar, Kuwait, Bahrain, Yemen" },
    ],
  },
  {
    abbreviation: "EST",
    meanings: [
      { name: "Eastern Standard Time", offset: "UTC−5", dst: "observes", regions: "US, Canada", note: "Transitions to EDT (UTC−4) during DST" },
      { name: "Eastern Standard Time (Australia)", offset: "UTC+10", dst: "observes", regions: "Queensland (year-round), NSW/VIC (standard only)", note: "NSW/VIC observe AEDT (UTC+11) in summer" },
    ],
  },
  {
    abbreviation: "SST",
    meanings: [
      { name: "Samoa Standard Time", offset: "UTC−11", dst: "does not observe", regions: "American Samoa, Jarvis Island" },
      { name: "Singapore Standard Time", offset: "UTC+8", dst: "does not observe", regions: "Singapore" },
    ],
  },
  {
    abbreviation: "GST",
    meanings: [
      { name: "Gulf Standard Time", offset: "UTC+4", dst: "does not observe", regions: "UAE, Oman" },
      { name: "South Georgia Time", offset: "UTC−2", dst: "does not observe", regions: "South Georgia and South Sandwich Islands" },
    ],
  },
  {
    abbreviation: "WST",
    meanings: [
      { name: "Western Standard Time (Australia)", offset: "UTC+8", dst: "does not observe", regions: "Western Australia" },
      { name: "West Samoa Time", offset: "UTC+13", dst: "does not observe", regions: "Samoa", note: "Distinct from American Samoa" },
    ],
  },
  {
    abbreviation: "CDT",
    meanings: [
      { name: "Central Daylight Time", offset: "UTC−5", dst: "seasonal", regions: "US, Canada" },
      { name: "Cuba Daylight Time", offset: "UTC−4", dst: "seasonal", regions: "Cuba" },
    ],
  },
  {
    abbreviation: "GMT",
    meanings: [
      { name: "Greenwich Mean Time", offset: "UTC+0", dst: "does not observe", regions: "UK (winter), Iceland, West Africa", note: "Sometimes confused with BST when used for UK time in summer" },
    ],
  },
  {
    abbreviation: "UTC",
    meanings: [
      { name: "Coordinated Universal Time", offset: "UTC+0", dst: "does not observe", regions: "Worldwide standard" },
    ],
  },
  {
    abbreviation: "CET",
    meanings: [
      { name: "Central European Time", offset: "UTC+1 standard, UTC+2 summer (CEST)", dst: "observes", regions: "Most of Europe", note: "The name is stable but the offset shifts seasonally" },
    ],
  },
  {
    abbreviation: "PST",
    meanings: [
      { name: "Pacific Standard Time", offset: "UTC−8", dst: "observes", regions: "US, Canada", note: "Transitions to PDT (UTC−7); sometimes incorrectly used year-round" },
    ],
  },
  {
    abbreviation: "PDT",
    meanings: [
      { name: "Pacific Daylight Time", offset: "UTC−7", dst: "seasonal", regions: "US, Canada" },
    ],
  },
  {
    abbreviation: "MST",
    meanings: [
      { name: "Mountain Standard Time", offset: "UTC−7", dst: "observes", regions: "US, Canada", note: "Arizona uses MST year-round (no DST)" },
    ],
  },
  {
    abbreviation: "MDT",
    meanings: [
      { name: "Mountain Daylight Time", offset: "UTC−6", dst: "seasonal", regions: "US, Canada" },
    ],
  },
  {
    abbreviation: "AEST",
    meanings: [
      { name: "Australian Eastern Standard Time", offset: "UTC+10", dst: "observes", regions: "Queensland, NSW, VIC, TAS, ACT", note: "NSW/VIC/TAS observe AEDT (UTC+11) in summer" },
    ],
  },
  {
    abbreviation: "AEDT",
    meanings: [
      { name: "Australian Eastern Daylight Time", offset: "UTC+11", dst: "seasonal", regions: "NSW, VIC, TAS, ACT" },
    ],
  },
  {
    abbreviation: "JST",
    meanings: [
      { name: "Japan Standard Time", offset: "UTC+9", dst: "does not observe", regions: "Japan" },
    ],
  },
  {
    abbreviation: "KST",
    meanings: [
      { name: "Korea Standard Time", offset: "UTC+9", dst: "does not observe", regions: "South Korea" },
    ],
  },
  {
    abbreviation: "HKT",
    meanings: [
      { name: "Hong Kong Time", offset: "UTC+8", dst: "does not observe", regions: "Hong Kong" },
    ],
  },
  {
    abbreviation: "SGT",
    meanings: [
      { name: "Singapore Time", offset: "UTC+8", dst: "does not observe", regions: "Singapore" },
    ],
  },
  {
    abbreviation: "WIB",
    meanings: [
      { name: "Western Indonesian Time", offset: "UTC+7", dst: "does not observe", regions: "Western Indonesia (Java, Sumatra)" },
    ],
  },
  {
    abbreviation: "WIT",
    meanings: [
      { name: "Eastern Indonesian Time", offset: "UTC+9", dst: "does not observe", regions: "Eastern Indonesia (Papua)" },
    ],
  },
  {
    abbreviation: "WITA",
    meanings: [
      { name: "Central Indonesian Time", offset: "UTC+8", dst: "does not observe", regions: "Central Indonesia (Bali, Sulawesi)" },
    ],
  },
  {
    abbreviation: "EDT",
    meanings: [
      { name: "Eastern Daylight Time", offset: "UTC−4", dst: "seasonal", regions: "US, Canada" },
    ],
  },
];

export function searchAbbreviations(query: string): AbbreviationData[] {
  if (!query.trim()) return [];
  const normalised = query.toUpperCase().trim();
  return timezoneAbbreviations.filter(
    (abbr) => abbr.abbreviation.startsWith(normalised) || abbr.abbreviation === normalised
  );
}

export function isAmbiguous(data: AbbreviationData): boolean {
  return data.meanings.length > 1;
}

export const ambiguousAbbreviations = ["CST", "IST", "BST", "AST", "EST", "SST", "GST", "WST", "CDT"];
