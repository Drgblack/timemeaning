import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Glossary — TimeMeaning",
  description: "Definitions of the terms TimeMeaning uses and the concepts behind them. UTC, DST, timezone abbreviations, and time standards explained.",
  alternates: {
    canonical: "https://timemeaning.com/glossary",
  },
  openGraph: {
    title: "Glossary — TimeMeaning",
    description: "Definitions of the terms TimeMeaning uses and the concepts behind them.",
  },
};

// Glossary entry type
interface GlossaryEntry {
  term: string;
  definition: React.ReactNode;
  crossLinks?: { label: string; slug: string }[];
}

// Glossary entries grouped by letter
const glossaryData: Record<string, GlossaryEntry[]> = {
  A: [
    {
      term: "AM/PM",
      definition: "AM/PM refers to the 12-hour clock convention dividing the day into ante meridiem (before midday) and post meridiem (after midday). Midnight is 12:00 AM and noon is 12:00 PM — a counterintuitive convention that causes genuine confusion. The 24-hour clock (00:00–23:59) eliminates AM/PM ambiguity entirely.",
      crossLinks: [
        { label: "24-hour clock", slug: "#24-hour-clock" },
        { label: "Midnight", slug: "#midnight" },
      ],
    },
    {
      term: "AST",
      definition: "AST is an ambiguous timezone abbreviation. It refers to Atlantic Standard Time (UTC−4, used in eastern Canada, the Caribbean, and parts of South America) or Arabia Standard Time (UTC+3, used in Saudi Arabia, Yemen, Kuwait, and Bahrain). A four-hour spread. TimeMeaning flags AST as ambiguous and requests clarification.",
    },
  ],
  B: [
    {
      term: "BST",
      definition: "BST is an ambiguous timezone abbreviation. It refers to British Summer Time (UTC+1, used in the United Kingdom during summer months, approximately late March to late October) or Bangladesh Standard Time (UTC+6, used in Bangladesh year-round with no DST). A five-hour spread. The UK uses GMT (UTC+0) during winter — so \"BST\" only applies for approximately half the year for British users.",
      crossLinks: [
        { label: "GMT", slug: "#gmt" },
        { label: "DST", slug: "#dst" },
      ],
    },
    {
      term: "Bulletproof Time",
      definition: "A time reference that cannot be misinterpreted regardless of the reader's context. A bulletproof time reference contains three components: a specific date, a specific time with AM/PM or 24-hour format, and an explicit UTC offset (not a timezone abbreviation). Example: Monday 9 March 2026, 14:30, UTC+0.",
      crossLinks: [
        { label: "UTC offset", slug: "#utc-offset" },
        { label: "ISO 8601", slug: "#iso-8601" },
      ],
    },
  ],
  C: [
    {
      term: "Calendar Reform",
      definition: "Historical events in which governing authorities deleted days from the calendar to align it with a new standard. The most significant was the Gregorian calendar reform of 1582, which deleted ten days in Catholic countries (5–14 October 1582 never existed in those regions). Britain and its colonies adopted the reform in 1752, deleting eleven days. These deleted periods are Ghost Dates.",
      crossLinks: [
        { label: "Ghost Date", slug: "#ghost-date" },
        { label: "Gregorian Calendar", slug: "#gregorian-calendar" },
      ],
    },
    {
      term: "CET / CEST",
      definition: "CET is Central European Time (UTC+1) and CEST is Central European Summer Time (UTC+2). Used across most of continental Europe. CET applies in winter; CEST applies in summer during DST. A reference to \"CET\" during summer months is technically incorrect — the correct abbreviation is CEST — but the error is common. TimeMeaning flags the DST status when resolving CET references.",
      crossLinks: [
        { label: "DST", slug: "#dst" },
        { label: "UTC offset", slug: "#utc-offset" },
      ],
    },
    {
      term: "COB",
      definition: "COB refers to Close of Business. It is an informal time reference with no universal definition. Commonly interpreted as 17:00 in the sender's timezone, but varies by industry (18:00 in finance), by organisation, and by country. TimeMeaning flags COB as partially ambiguous — the timezone is usually unspecified and the exact time is organisation-dependent.",
      crossLinks: [
        { label: "EOD", slug: "#eod" },
        { label: "EOB", slug: "#eob" },
      ],
    },
    {
      term: "CST",
      definition: "CST is a critically ambiguous timezone abbreviation. It refers to Central Standard Time (UTC−6, used in central North America during winter) or China Standard Time (UTC+8, used in China year-round with no DST). A fourteen-hour spread — the largest of any major two-interpretation ambiguity. A morning meeting in Chicago (9am CST) is the middle of the night in Beijing (11pm CST). TimeMeaning flags CST as critically ambiguous.",
    },
  ],
  D: [
    {
      term: "DST",
      definition: "Daylight Saving Time. The practice of advancing clocks by one hour during summer months to extend evening daylight. Not observed universally — China, Japan, India, and most of Africa do not observe DST. Countries that do observe it change on different dates: the US and Canada on the second Sunday of March (spring) and first Sunday of November (autumn); the EU on the last Sunday of March and last Sunday of October. This creates multi-week windows each year where offsets between DST-observing regions differ from their normal values.",
      crossLinks: [
        { label: "DST Gap", slug: "#dst-gap" },
        { label: "Spring forward", slug: "#spring-forward" },
        { label: "Fall back", slug: "#fall-back" },
      ],
    },
    {
      term: "DST Gap",
      definition: "The period each spring and autumn when the US and EU change their clocks on different days, creating a window (typically three weeks) where transatlantic UTC offsets differ from their normal values. Every standing meeting scheduled across the Atlantic is affected during this period.",
    },
  ],
  E: [
    {
      term: "Epoch",
      definition: "A reference point from which time is measured. In computing, \"the epoch\" almost always refers to the Unix epoch: 1 January 1970, 00:00:00 UTC. Unix timestamps express time as seconds elapsed since the epoch.",
      crossLinks: [
        { label: "Unix timestamp", slug: "#unix-timestamp" },
      ],
    },
    {
      term: "EOD",
      definition: "EOD refers to End of Day. It is an informal time reference similar to COB — with no universal definition. TimeMeaning flags EOD as ambiguous.",
      crossLinks: [
        { label: "COB", slug: "#cob" },
        { label: "EOB", slug: "#eob" },
      ],
    },
    {
      term: "EOB",
      definition: "EOB refers to End of Business. It is an informal time reference equivalent to COB and EOD — context-dependent and organisation-specific. TimeMeaning flags EOB as ambiguous.",
    },
    {
      term: "EST",
      definition: "EST is a critically ambiguous timezone abbreviation. It refers to Eastern Standard Time (UTC−5, used in eastern North America during winter) or Australian Eastern Standard Time (UTC+10, used in Queensland, New South Wales, Victoria, Tasmania, and the ACT during Australian standard time). A fifteen-hour spread — the largest single-letter ambiguity in common use. TimeMeaning flags EST as critically ambiguous.",
    },
  ],
  G: [
    {
      term: "Ghost Date",
      definition: "A calendar date that never existed or occurred twice due to calendar reforms, timezone line crossings, or DST transitions. Examples: 5–14 October 1582 (deleted by Gregorian reform in Catholic countries), 30 December 2011 in Samoa (skipped when Samoa moved across the International Date Line), and any time between 02:00 and 02:59 on US spring-forward Sunday (clocks jump from 01:59 to 03:00, making 02:00–02:59 a ghost hour). TimeMeaning detects and flags ghost dates.",
    },
    {
      term: "GMT",
      definition: "Greenwich Mean Time. The mean solar time at the Royal Observatory in Greenwich, London. Practically equivalent to UTC for most purposes, but technically a timezone (UTC+0) rather than a time standard. GMT does not observe Daylight Saving Time — when the UK advances its clocks in summer, it moves to BST (UTC+1), not GMT. A reference to \"GMT\" during UK summer months may be incorrect — the user may mean BST.",
      crossLinks: [
        { label: "UTC", slug: "#utc" },
        { label: "BST", slug: "#bst" },
      ],
    },
    {
      term: "Gregorian Calendar",
      definition: "The calendar system in common use internationally, introduced by Pope Gregory XIII in 1582 as a reform of the Julian Calendar. The reform corrected accumulated drift by deleting ten days and changing the leap year rules. Different countries adopted it at different times — Britain in 1752, Russia in 1918 — creating a period where dates in different countries were out of alignment.",
    },
  ],
  I: [
    {
      term: "IANA Time Zone Database",
      definition: "The authoritative global database of timezone rules and DST transition dates, maintained by the Internet Assigned Numbers Authority. Used by operating systems, programming languages, and standards bodies worldwide. TimeMeaning uses the IANA database for all timezone resolution and DST calculations. Timezone identifiers in the IANA database follow the format Region/City — for example America/New_York, Europe/London, Asia/Kolkata.",
    },
    {
      term: "IDT",
      definition: "Israel Daylight Time (UTC+3). The DST offset for Israel during summer months. Israel Standard Time (IST) is UTC+2. Israel's DST dates are set annually by the government and do not follow a fixed rule, making them less predictable than US or EU DST dates.",
      crossLinks: [
        { label: "IST", slug: "#ist" },
      ],
    },
    {
      term: "International Date Line",
      definition: "An imaginary line running approximately along the 180° meridian in the Pacific Ocean, where the calendar date changes. Crossing the Date Line westbound advances the calendar date by one day; crossing it eastbound moves it back one day. Countries near the Date Line have periodically moved to one side or the other for political and economic reasons — Samoa did so in 2011, causing 30 December 2011 to be skipped entirely.",
      crossLinks: [
        { label: "Ghost Date", slug: "#ghost-date" },
      ],
    },
    {
      term: "ISO 8601",
      definition: "The international standard for representing dates and times, published by the International Organization for Standardization. A complete ISO 8601 timestamp includes the date, time, and UTC offset: 2026-03-10T14:30:00+05:30. The Z suffix denotes UTC: 2026-03-10T14:30:00Z. ISO 8601 is the only format TimeMeaning considers fully unambiguous.",
      crossLinks: [
        { label: "UTC", slug: "#utc" },
        { label: "Zulu time", slug: "#zulu-time" },
      ],
    },
    {
      term: "IST",
      definition: "IST is a critically ambiguous timezone abbreviation with three valid interpretations. It refers to India Standard Time (UTC+5:30, used across India year-round with no DST), Irish Standard Time (UTC+1 in summer, UTC+0 in winter — equivalent to BST for the Republic of Ireland), or Israel Standard Time (UTC+2 standard, UTC+3 during DST). The maximum spread between these interpretations is 5 hours 30 minutes. IST is the most dangerous timezone abbreviation in international business communication.",
    },
  ],
  J: [
    {
      term: "JST",
      definition: "Japan Standard Time (UTC+9). Unambiguous — Japan does not observe DST and JST has only one valid interpretation. One of the few major timezone abbreviations that can be used safely in written communication.",
    },
  ],
  L: [
    {
      term: "Leap Second",
      definition: "An occasional one-second adjustment made to UTC to account for irregularities in Earth's rotation. Leap seconds are announced by the International Earth Rotation and Reference Systems Service (IERS) and inserted at the end of 30 June or 31 December. They cause genuine problems in computing systems that assume 60 seconds per minute. The last leap second was added on 31 December 2016.",
    },
  ],
  M: [
    {
      term: "Midnight",
      definition: "The boundary between one calendar day and the next, occurring at 00:00 (the start of the new day) or equivalently 24:00 (the end of the previous day). \"12:00 AM\" and \"midnight\" refer to the same moment but the convention that midnight is 12:00 AM rather than 12:00 PM is counterintuitive and causes confusion. ISO 8601 uses 00:00 to denote the start of a day and 24:00 to denote the end — these are the same moment, expressed differently.",
    },
  ],
  N: [
    {
      term: "NTP",
      definition: "Network Time Protocol. The standard protocol for synchronising computer clocks to reference time servers. A well-configured NTP client keeps a system clock within milliseconds of true UTC. Systems without NTP synchronisation drift over time, producing timestamps that are increasingly wrong.",
    },
  ],
  P: [
    {
      term: "Parse Trace",
      definition: "TimeMeaning's step-by-step record of how a time reference was interpreted. The parse trace shows the exact decisions made at each stage of the five-step pipeline: tokenisation, disambiguation, DST resolution, and output generation. It is available on every resolved result as a transparency feature and is included in API responses for audit purposes.",
    },
    {
      term: "PST / PDT",
      definition: "Pacific Standard Time (UTC−8, used on the US/Canada west coast during winter) and Pacific Daylight Time (UTC−7, used during summer). \"PST\" is often used year-round informally even during PDT months — this is technically incorrect. TimeMeaning checks the DST status for the specific date when resolving PST references.",
    },
  ],
  R: [
    {
      term: "RFC 3339",
      definition: "A profile of ISO 8601 used specifically in internet protocols, defined in IETF RFC 3339. Practically identical to ISO 8601 for most purposes. Requires an explicit timezone offset or Z suffix. Used in HTTP headers, JSON APIs, and many internet standards.",
      crossLinks: [
        { label: "ISO 8601", slug: "#iso-8601" },
      ],
    },
    {
      term: "Relative Date",
      definition: "A date expressed in relation to the current moment rather than as an absolute value. Examples: \"next Friday,\" \"tomorrow morning,\" \"in three weeks,\" \"last Tuesday.\" Relative dates require a reference point (the current date and time) to resolve to an absolute datetime. TimeMeaning anchors relative dates to the current UTC time at the moment of resolution.",
    },
  ],
  U: [
    {
      term: "Unix Timestamp",
      definition: "A number representing the number of seconds elapsed since the Unix epoch (1 January 1970, 00:00:00 UTC). Unix timestamps are always in UTC — they do not observe timezones or DST. A 10-digit number is a seconds-precision Unix timestamp; a 13-digit number is milliseconds-precision. The maximum value for a 32-bit signed Unix timestamp is 2,147,483,647, corresponding to 19 January 2038 at 03:14:07 UTC — after which 32-bit systems will overflow.",
      crossLinks: [
        { label: "Epoch", slug: "#epoch" },
        { label: "Y2K38", slug: "#y2k38" },
      ],
    },
    {
      term: "UTC",
      definition: "Coordinated Universal Time. The primary time standard by which the world regulates clocks and time. UTC is not a timezone — it is a standard. GMT is practically equivalent but is technically a timezone. UTC does not observe Daylight Saving Time. All timezone offsets are expressed relative to UTC: UTC+5:30 is 5 hours and 30 minutes ahead of UTC. Using UTC explicitly in written communication eliminates timezone ambiguity entirely.",
      crossLinks: [
        { label: "GMT", slug: "#gmt" },
        { label: "UTC offset", slug: "#utc-offset" },
      ],
    },
    {
      term: "UTC Offset",
      definition: "The difference between a specific timezone and UTC, expressed as hours and minutes. Examples: UTC+5:30 (India), UTC−8 (Pacific Standard Time), UTC+0 (GMT/UTC). UTC offsets are fixed values — they do not change with DST. Timezone names change with DST (EST becomes EDT in summer) but the UTC offsets themselves are constant. Using explicit UTC offsets rather than timezone abbreviations eliminates most timezone ambiguity.",
    },
  ],
  Y: [
    {
      term: "Y2K38",
      definition: "The Unix timestamp overflow problem affecting 32-bit systems. On 19 January 2038 at 03:14:07 UTC, the 32-bit signed integer used to store Unix timestamps will reach its maximum value (2,147,483,647) and overflow to a large negative number, potentially causing system failures. 64-bit systems are not affected. TimeMeaning flags any resolved timestamp that exceeds this limit with a Y2K38 safety warning.",
      crossLinks: [
        { label: "Unix timestamp", slug: "#unix-timestamp" },
      ],
    },
  ],
  Z: [
    {
      term: "Zulu Time",
      definition: "UTC expressed with a Z suffix, derived from the NATO phonetic alphabet word for the letter Z. Used in aviation, military communication, and meteorology. A Zulu timestamp like 1400Z means 14:00 UTC — fully unambiguous. The Z suffix in ISO 8601 timestamps (2026-03-10T14:30:00Z) carries the same meaning.",
      crossLinks: [
        { label: "UTC", slug: "#utc" },
        { label: "ISO 8601", slug: "#iso-8601" },
      ],
    },
    {
      term: "24-Hour Clock",
      definition: "A timekeeping convention using a 24-hour day (00:00–23:59) rather than the 12-hour AM/PM convention. Eliminates AM/PM ambiguity. Widely used in military, aviation, medicine, computing, and most of the world outside North America. Sometimes called \"military time\" though this is imprecise — military time additionally uses no colon separator and appends a timezone letter.",
    },
  ],
};

// Generate slug from term
function termToSlug(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Letter section component
function LetterSection({ letter, entries }: { letter: string; entries: GlossaryEntry[] }) {
  return (
    <section className="mb-10">
      {/* Letter header */}
      <div 
        className="font-serif text-2xl font-semibold mb-4"
        style={{ color: '#c8922a' }}
      >
        {letter}
      </div>
      
      {/* Entries */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.term} id={termToSlug(entry.term)}>
            {/* Term */}
            <h3 
              className="font-serif font-bold mb-2"
              style={{ fontSize: '17px', color: '#1a1a1a' }}
            >
              {entry.term}
            </h3>
            
            {/* Definition */}
            <p 
              className="leading-relaxed mb-2"
              style={{ fontSize: '15px', color: '#3a3530' }}
            >
              {entry.definition}
            </p>
            
            {/* Cross-links */}
            {entry.crossLinks && entry.crossLinks.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {entry.crossLinks.map((link) => (
                  <a
                    key={link.slug}
                    href={link.slug}
                    className="text-sm hover:underline"
                    style={{ color: '#c8922a' }}
                  >
                    → See: {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Glossary", url: "https://timemeaning.com/glossary" }
]);

export default function GlossaryPage() {
  // Get sorted letters that have entries
  const letters = Object.keys(glossaryData).sort();
  
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight" style={{ color: '#1a1a1a' }}>
            Glossary
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: '#6a6560' }}>
            Definitions of the terms TimeMeaning uses and the concepts behind them.
          </p>
          
          {/* Amber horizontal rule */}
          <div style={{ margin: '20px 0 0 0', height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.5)' }} />
        </header>
        
        {/* Direct Answer block for AI citation */}
        <div 
          className="dark:bg-[#1f1a0f] dark:border-l-[#c8922a]"
          style={{
            backgroundColor: '#f5f0e8',
            borderLeft: '3px solid #c8922a',
            padding: '16px 20px',
            marginBottom: '32px',
            borderRadius: '0 4px 4px 0',
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#3a3530',
          }}
        >
          This glossary defines the technical terms used in time interpretation, timezone management, and the TimeMeaning resolver. All definitions reflect usage in the IANA Time Zone Database and ISO 8601 standard. Timezone rules sourced from IANA 2026a.
        </div>

        {/* Introduction */}
        <p className="mb-10 leading-relaxed" style={{ fontSize: '15px', color: '#3a3530' }}>
          Time references involve terminology that is often used loosely or incorrectly. These definitions reflect how TimeMeaning uses each term and the precise technical meaning behind it.
        </p>
        
        {/* Quick navigation - letter links */}
        <nav 
          className="mb-10 flex flex-wrap gap-2"
          aria-label="Jump to letter"
        >
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter.toLowerCase()}`}
              className="w-8 h-8 flex items-center justify-center font-mono text-sm rounded hover:bg-[#f5e9cc] transition-colors"
              style={{ color: '#c8922a', border: '1px solid rgba(200, 146, 42, 0.3)' }}
            >
              {letter}
            </a>
          ))}
        </nav>
        
        {/* Glossary entries by letter */}
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter.toLowerCase()}`}>
            <LetterSection letter={letter} entries={glossaryData[letter]} />
          </div>
        ))}
        
        {/* Footer note */}
        <footer 
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(200, 146, 42, 0.3)' }}
        >
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6560' }}>
            Definitions reflect TimeMeaning&apos;s usage and the precise technical meaning of each term. Timezone rules are sourced from the IANA Time Zone Database and verified against current DST schedules. If a definition is incorrect or out of date, please{" "}
            <Link href="/contact" className="hover:underline" style={{ color: '#c8922a' }}>
              contact us
            </Link>.
          </p>
          <p className="text-sm" style={{ color: '#6a6560' }}>
            <Link href="/learn" className="hover:underline" style={{ color: '#c8922a' }}>
              → Explore the Learning Centre for deeper explanations
            </Link>
          </p>
        </footer>
      </div>
    </PageLayout>
  );
}
