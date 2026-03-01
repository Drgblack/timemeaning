// Static search index for site-wide search
// Generated at build time containing all searchable content

export interface SearchEntry {
  id: string;
  type: 'LEARN' | 'BLOG' | 'TOOL';
  title: string;
  description: string;
  keywords: string[];
  url: string;
  readTime?: string;
}

export const searchIndex: SearchEntry[] = [
  // LEARNING CENTRE ARTICLES
  {
    id: 'learn-ambiguous-abbreviations',
    type: 'LEARN',
    title: 'The Glossary of Ambiguity: Every Timezone Abbreviation With More Than One Meaning',
    description: 'A reference list of timezone abbreviations that map to multiple meanings, with their UTC offsets and maximum spreads.',
    keywords: ['IST', 'CST', 'BST', 'AST', 'EST', 'SST', 'PST', 'ambiguous', 'abbreviation', 'timezone', 'UTC', 'offset', 'glossary', 'reference'],
    url: '/learn/ambiguous-timezone-abbreviations',
    readTime: '8 min'
  },
  {
    id: 'learn-bulletproof-time',
    type: 'LEARN',
    title: 'How to Write a Bulletproof Time: Best Practices for Unambiguous Time References',
    description: 'The three components of a time reference that cannot be misinterpreted, and how to write one.',
    keywords: ['bulletproof', 'best practice', 'unambiguous', 'clear', 'writing', 'format', 'communication'],
    url: '/learn/bulletproof-time',
    readTime: '5 min'
  },
  {
    id: 'learn-dst-shift-dates',
    type: 'LEARN',
    title: 'Understanding Daylight Saving Shift Dates: When the Clocks Change and Why It Matters',
    description: '2026 DST transition dates for the US, Europe, and Australia, plus the dangerous March gap.',
    keywords: ['DST', 'daylight saving', 'shift', 'transition', 'clock change', 'spring forward', 'fall back', 'March', 'November', 'Europe', 'US', 'Australia'],
    url: '/learn/dst-shift-dates',
    readTime: '6 min'
  },
  {
    id: 'learn-iso-8601',
    type: 'LEARN',
    title: 'Decoding ISO 8601 for Humans: What That Timestamp Actually Means',
    description: 'A guide to reading ISO 8601 timestamps, understanding timezone offsets, and converting to local time.',
    keywords: ['ISO 8601', 'ISO', 'timestamp', 'format', 'standard', 'international', 'decode', 'read', 'convert'],
    url: '/learn/iso-8601-for-humans',
    readTime: '4 min'
  },
  {
    id: 'learn-managers-guide',
    type: 'LEARN',
    title: "The Manager's Guide to Async Coordination Across Timezones",
    description: 'Practical patterns for distributed teams: explicit timezones, UTC for internal deadlines, and proactive DST flagging.',
    keywords: ['manager', 'async', 'coordination', 'distributed', 'team', 'remote', 'patterns', 'UTC', 'deadline'],
    url: '/learn/managers-guide-async',
    readTime: '7 min'
  },
  {
    id: 'learn-military-time',
    type: 'LEARN',
    title: "Why Military Time Isn't Enough: The 24-Hour Clock Solves AM/PM But Not Timezones",
    description: 'The 24-hour format eliminates one source of ambiguity but carries no timezone information.',
    keywords: ['military time', '24-hour', 'clock', 'AM', 'PM', 'format', 'ambiguity'],
    url: '/learn/why-military-time-isnt-enough',
    readTime: '3 min'
  },
  {
    id: 'learn-utc-offsets',
    type: 'LEARN',
    title: 'What Is a UTC Offset and Why Is It More Reliable Than a Timezone Name?',
    description: 'UTC offsets are fixed values. Timezone names shift with DST. This distinction matters.',
    keywords: ['UTC', 'offset', 'timezone', 'name', 'reliable', 'fixed', 'DST', '+0530', 'GMT'],
    url: '/learn/understanding-utc-offsets',
    readTime: '5 min'
  },
  {
    id: 'learn-developer-logs',
    type: 'LEARN',
    title: "The Developer's Handbook to Log Timestamps: Unix, ISO, RFC 3339, and How to Resolve Them",
    description: 'A practical guide to reading and converting timestamp formats found in log files and API responses.',
    keywords: ['developer', 'log', 'timestamp', 'Unix', 'epoch', 'ISO', 'RFC 3339', 'API', 'format', 'convert'],
    url: '/learn/developer-log-timestamps',
    readTime: '6 min'
  },
  {
    id: 'learn-resolver',
    type: 'LEARN',
    title: 'How TimeMeaning Resolves a Time Reference: A Transparency Guide',
    description: 'The five-step deterministic pipeline TimeMeaning uses to interpret a pasted time reference.',
    keywords: ['resolver', 'pipeline', 'algorithm', 'interpret', 'transparency', 'how it works', 'deterministic'],
    url: '/learn/how-the-resolver-thinks',
    readTime: '5 min'
  },
  {
    id: 'learn-no-dst',
    type: 'LEARN',
    title: "Timezones That Don't Observe DST: The Stable Regions and Why They Confuse Everyone Else",
    description: 'Major regions with fixed UTC offsets, and why coordination with them shifts twice a year anyway.',
    keywords: ['DST', 'no DST', 'stable', 'fixed', 'Arizona', 'Hawaii', 'India', 'China', 'UTC offset'],
    url: '/learn/timezones-without-dst',
    readTime: '6 min'
  },
  {
    id: 'learn-aviation-zulu',
    type: 'LEARN',
    title: 'Aviation Time: Zulu, UTC, and Why Pilots Never Use Local Time',
    description: 'Every aviation communication in the world uses a single time reference: Zulu time. This is why, and how to read it.',
    keywords: ['aviation', 'Zulu', 'Z', 'UTC', 'pilot', 'flight', 'METAR', 'ATC', 'NOTAM'],
    url: '/learn/aviation-zulu-time',
    readTime: '7 min'
  },
  {
    id: 'learn-date-line',
    type: 'LEARN',
    title: 'The International Date Line Trap: When Your Flight Lands Yesterday',
    description: 'A flight departs on Tuesday and arrives on Monday. This is not a typo. It is the consequence of crossing the 180th meridian.',
    keywords: ['date line', 'international', '180', 'meridian', 'yesterday', 'tomorrow', 'Pacific', 'crossing'],
    url: '/learn/international-date-line',
    readTime: '6 min'
  },
  {
    id: 'learn-nautical',
    type: 'LEARN',
    title: 'Nautical Time Zones: Why the High Seas Run on Different Rules',
    description: 'On land, timezone boundaries are political. On the high seas, timezone boundaries are geometric — and the geometry is strict.',
    keywords: ['nautical', 'sea', 'ocean', 'ship', 'maritime', 'longitude', 'geometric', 'navy'],
    url: '/learn/nautical-time-zones',
    readTime: '7 min'
  },

  // BLOG ARTICLES
  {
    id: 'blog-cst-trap',
    type: 'BLOG',
    title: 'The CST Trap: How a Single Abbreviation Can Be 13 Hours Off',
    description: 'Two time zones share the abbreviation CST — and the difference between them is fourteen hours.',
    keywords: ['CST', 'China', 'Central', 'trap', 'ambiguous', 'abbreviation', '13 hours', '14 hours'],
    url: '/blog/cst-trap',
  },
  {
    id: 'blog-dst-no-mans-land',
    type: 'BLOG',
    title: "The DST No Man's Land: Why March and November Break International Teams",
    description: 'The US and Europe change clocks on different days, creating a multi-week window of offset confusion.',
    keywords: ['DST', 'March', 'November', 'US', 'Europe', 'gap', 'window', 'confusion', 'international'],
    url: '/blog/dst-no-mans-land',
  },
  {
    id: 'blog-search-engines',
    type: 'BLOG',
    title: 'Why Search Engines Lie to You About Time',
    description: 'Google resolves ambiguous timezone abbreviations silently, without telling you which one it assumed.',
    keywords: ['Google', 'search', 'engine', 'lie', 'silent', 'assumption', 'wrong'],
    url: '/blog/search-engines-lie',
  },
  {
    id: 'blog-3pm-ist',
    type: 'BLOG',
    title: 'The 3pm IST Disaster: A Story About a Missed Pitch',
    description: 'A composite fiction about two professionals who read the same abbreviation and understood it differently.',
    keywords: ['IST', 'India', 'Israel', 'Ireland', 'pitch', 'missed', 'meeting', 'disaster', 'story'],
    url: '/blog/3pm-ist-disaster',
  },
  {
    id: 'blog-stop-asking',
    type: 'BLOG',
    title: 'Stop Asking "What Time Is It There?" — Meaning Matters More Than Conversion',
    description: 'Conversion tells you the equivalent of a time you already understand. Interpretation tells you what a time means.',
    keywords: ['conversion', 'meaning', 'interpretation', 'understand', 'difference'],
    url: '/blog/stop-asking-what-time',
  },
  {
    id: 'blog-log-limbo',
    type: 'BLOG',
    title: 'Log File Limbo: The Hidden Tax of UTC Timestamps in a Crisis',
    description: 'The cognitive cost of converting UTC log timestamps to local time during a severity-one incident.',
    keywords: ['log', 'UTC', 'timestamp', 'crisis', 'incident', 'severity', 'developer', 'cognitive'],
    url: '/blog/log-file-limbo',
  },
  {
    id: 'blog-history',
    type: 'BLOG',
    title: 'The History of Messy Time: How Railways, Wars, and Politics Built the Timezone Map',
    description: 'The timezone map is not a clean engineering artefact — it is geological record of political decisions.',
    keywords: ['history', 'railway', 'war', 'politics', 'map', 'origin', 'evolution'],
    url: '/blog/history-of-messy-time',
  },
  {
    id: 'blog-timezone-anxiety',
    type: 'BLOG',
    title: "Remote Work's Silent Productivity Killer: Timezone Anxiety",
    description: 'A distributed team of twenty people can lose hundreds of hours per year to timezone double-checking.',
    keywords: ['remote', 'anxiety', 'productivity', 'distributed', 'checking', 'stress', 'mental'],
    url: '/blog/timezone-anxiety',
  },
  {
    id: 'blog-dropdown',
    type: 'BLOG',
    title: 'The Death of the Dropdown: Why "Select Your City" Is a UX Failure',
    description: 'The standard timezone dropdown was designed for settings panels, not for resolving ambiguous input.',
    keywords: ['dropdown', 'UX', 'UI', 'select', 'city', 'failure', 'design', 'interface'],
    url: '/blog/death-of-the-dropdown',
  },
  {
    id: 'blog-universal-vs-human',
    type: 'BLOG',
    title: 'Universal Time vs. Human Time: Why UTC and Natural Language Will Always Conflict',
    description: "Humans will continue to write 'next Tuesday morning' because it communicates what they mean to other humans.",
    keywords: ['UTC', 'natural', 'language', 'human', 'conflict', 'Tuesday', 'morning', 'communication'],
    url: '/blog/universal-time-vs-human-time',
  },

  // TOOLS
  {
    id: 'tool-quiz',
    type: 'TOOL',
    title: 'The Confidently Wrong Quiz',
    description: 'Test whether you actually understand timezone abbreviations, or just think you do.',
    keywords: ['quiz', 'test', 'knowledge', 'abbreviation', 'confident', 'wrong', 'score'],
    url: '/tools/quiz',
  },
  {
    id: 'tool-meeting-cost',
    type: 'TOOL',
    title: 'Cost of a Missed Meeting Calculator',
    description: 'Calculate how much money your team wastes each year on timezone confusion.',
    keywords: ['calculator', 'cost', 'money', 'meeting', 'missed', 'waste', 'salary', 'ROI'],
    url: '/tools/meeting-cost',
  },
  {
    id: 'tool-ambiguity-audit',
    type: 'TOOL',
    title: 'The Ambiguity Audit',
    description: 'Three questions that reveal how close your team is to a timezone disaster.',
    keywords: ['audit', 'risk', 'assessment', 'questions', 'team', 'disaster', 'score'],
    url: '/tools/ambiguity-audit',
  },
  {
    id: 'tool-overlap',
    type: 'TOOL',
    title: 'The Global Overlap Burnout Meter',
    description: 'See who on your team is sacrificing their evenings so meetings can happen.',
    keywords: ['overlap', 'burnout', 'meter', 'sacrifice', 'evening', 'working hours', 'team'],
    url: '/tools/overlap',
  },
  {
    id: 'tool-dst-map',
    type: 'TOOL',
    title: 'DST Danger Map',
    description: 'Which regions are switching Daylight Saving Time in the next 14 days.',
    keywords: ['DST', 'map', 'danger', 'switch', 'region', 'upcoming', 'calendar'],
    url: '/tools/dst-map',
  },
  {
    id: 'tool-lookup',
    type: 'TOOL',
    title: 'Abbreviation Lookup',
    description: 'Instantly see every meaning for any timezone abbreviation.',
    keywords: ['lookup', 'search', 'abbreviation', 'meaning', 'reference', 'dictionary'],
    url: '/tools/lookup',
  },
  {
    id: 'tool-time-dilation',
    type: 'TOOL',
    title: 'Time Dilation Calculator',
    description: 'How much younger would you be after six months on the ISS?',
    keywords: ['dilation', 'relativity', 'Einstein', 'ISS', 'GPS', 'space', 'physics', 'calculator'],
    url: '/tools/time-dilation',
  },
];

// Popular searches for zero state
export const popularSearches = [
  'IST ambiguity',
  'DST shift dates',
  'ISO 8601',
  'UTC offset',
  'Bulletproof time',
  'Aviation Zulu',
];

// Quick navigation for zero state
export const quickNavigation = [
  { label: 'Learning Centre', url: '/learn' },
  { label: 'Blog', url: '/blog' },
  { label: 'Tools Suite', url: '/tools' },
  { label: 'Timezone Risk Quiz', url: '/tools/quiz' },
];
