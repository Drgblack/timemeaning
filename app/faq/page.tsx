import { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateFAQSchema, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — TimeMeaning",
  description: "Common questions about TimeMeaning and time interpretation. What is TimeMeaning, how does it work, why is IST ambiguous, and more.",
  alternates: {
    canonical: "https://timemeaning.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions — TimeMeaning",
    description: "Common questions about TimeMeaning and time interpretation.",
  },
};

const faqData = [
  {
    question: "What is TimeMeaning?",
    answer: "TimeMeaning is a free web utility that resolves ambiguous time references. You paste any time expression — from an email, calendar invite, log file, or message — and the tool interprets it in plain English, showing every assumption made and every alternative interpretation considered. It is not a timezone converter. It handles the step before conversion: figuring out what a messily written time reference actually means."
  },
  {
    question: "How is TimeMeaning different from a timezone converter?",
    answer: "A timezone converter assumes you already know the timezone you're converting from and the timezone you're converting to. TimeMeaning handles cases where the timezone itself is ambiguous — where \"3pm IST\" could mean India, Ireland, or Israel, where \"next Friday at noon\" needs a reference date to resolve, or where a Unix timestamp needs to be expressed in human-readable form. Converters move numbers between known references. TimeMeaning interprets unclear references."
  },
  {
    question: "Does TimeMeaning use artificial intelligence or machine learning?",
    answer: "No. TimeMeaning uses a deterministic five-step pipeline: tokenisation, structural parsing, ambiguity detection, DST resolution, and output generation. The same input with the same context always produces the same output. There is no probabilistic guessing. When the tool makes an assumption it documents it explicitly — you can see every step of the reasoning via the parse trace on any result."
  },
  {
    question: "Does TimeMeaning store the time references I paste?",
    answer: "No. Time references are processed to produce your result and are not stored, logged, or used for any purpose beyond the interpretation you requested. The tool does not create user accounts and does not track individual sessions."
  },
  {
    question: "What timezone database does TimeMeaning use?",
    answer: "TimeMeaning uses the IANA Time Zone Database (also called the Olson database or tz database), the authoritative global standard for timezone rules and DST transition dates. It is used by operating systems, programming languages, and standards bodies worldwide. TimeMeaning incorporates each IANA release within 48 hours of publication."
  },
  {
    question: "Why is IST ambiguous?",
    answer: "IST has three valid interpretations: India Standard Time (UTC+5:30), Irish Standard Time (UTC+1 in summer, UTC+0 in winter), and Israel Standard Time (UTC+2 standard, UTC+3 during DST). The maximum spread between these interpretations is 5 hours 30 minutes. A meeting scheduled for \"10am IST\" could mean 04:30 UTC, 09:00 UTC, or 10:00 UTC depending on which IST the sender meant. TimeMeaning flags IST as ambiguous and shows all three interpretations."
  },
  {
    question: "Why is CST ambiguous?",
    answer: "CST has two main interpretations: Central Standard Time (UTC−6, used in central North America during winter) and China Standard Time (UTC+8, used in China year-round). These are 14 hours apart — the largest spread of any two-interpretation ambiguity in common business use. A 9am morning meeting in Central Standard Time is 11pm in China Standard Time. TimeMeaning flags CST as critically ambiguous."
  },
  {
    question: "What is a ghost date?",
    answer: "A ghost date is a calendar date that never existed or occurred twice due to calendar reforms, timezone line crossings, or DST transitions. Examples include 5–14 October 1582 (deleted by the Gregorian calendar reform in Catholic countries), 30 December 2011 in Samoa (skipped when Samoa moved across the International Date Line), and any time between 02:00 and 02:59 on US spring-forward Sunday (clocks jump from 01:59 to 03:00, making 02:30am a time that never occurred). TimeMeaning detects and flags ghost dates."
  },
  {
    question: "What is Y2K38?",
    answer: "Y2K38 is the Unix timestamp overflow problem affecting 32-bit systems. On 19 January 2038 at 03:14:07 UTC, the 32-bit signed integer used to store Unix timestamps will reach its maximum value (2,147,483,647) and overflow. Systems using 32-bit timestamps after this point will malfunction. 64-bit systems are not affected. TimeMeaning flags any resolved timestamp that exceeds this limit."
  },
  {
    question: "What is the DST gap?",
    answer: "The DST gap refers to the period each spring when the United States and European Union change their clocks on different dates. In 2026, the US moves on 8 March and the EU moves on 29 March. During the 21-day gap between these dates, the UTC offset between any US timezone and any EU timezone is one hour different from its normal value. Every standing transatlantic meeting is affected during this period."
  },
  {
    question: "What does Zulu time mean?",
    answer: "Zulu time means UTC, expressed with a Z suffix. The term comes from the NATO phonetic alphabet word for the letter Z. It is the standard time reference in aviation, military communication, and meteorology. A timestamp of 1400Z means 14:00 UTC. The Z suffix in ISO 8601 timestamps (2026-03-10T14:30:00Z) carries the same meaning. Zulu time is one of the only ways to express time that is completely unambiguous regardless of the reader's location."
  },
  {
    question: "Is there an API for TimeMeaning?",
    answer: "Yes, an API for programmatic access to the TimeMeaning time interpretation engine is in development. The API accepts any time reference string and returns a structured interpretation object including the resolved datetime, timezone, DST status, all assumptions made, ambiguity flags, ghost date detection, and Y2K38 safety status. Register for early access at timemeaning.com/developers."
  },
  {
    question: "How do I write an unambiguous time reference?",
    answer: "An unambiguous time reference contains three components: a specific date (not relative expressions like \"next Friday\"), a specific time in 24-hour format or with explicit AM/PM, and an explicit UTC offset (not a timezone abbreviation). Example: Monday 9 March 2026, 14:30, UTC+0. ISO 8601 format with explicit offset is the gold standard: 2026-03-09T14:30:00Z."
  },
];

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqData);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "FAQ", url: "https://timemeaning.com/faq" }
  ]);

  return (
    <PageLayout>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight" style={{ color: '#1a1a1a' }}>
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: '#6a6560' }}>
            Common questions about TimeMeaning and time interpretation.
          </p>
          
          {/* Amber horizontal rule */}
          <div style={{ margin: '20px 0 0 0', height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.5)' }} />
        </header>
        
        {/* FAQ entries - all visible, no accordion */}
        <div className="space-y-8">
          {faqData.map((item, index) => (
            <article key={index} className="faq-item">
              <h3 
                className="font-serif font-medium mb-2"
                style={{ fontSize: '18px', color: '#1a1a1a', lineHeight: 1.4 }}
              >
                {item.question}
              </h3>
              <p 
                className="leading-relaxed dark:text-[#e8e4de]"
                style={{ fontSize: '15px', color: '#3a3530' }}
              >
                {item.answer}
              </p>
            </article>
          ))}
        </div>
        
        {/* Footer note */}
        <footer 
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(200, 146, 42, 0.3)' }}
        >
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#6a6560' }}>
            Have a question not answered here? Check the{" "}
            <a href="/glossary" className="hover:underline" style={{ color: '#c8922a' }}>
              Glossary
            </a>{" "}
            for term definitions or{" "}
            <a href="/contact" className="hover:underline" style={{ color: '#c8922a' }}>
              contact us
            </a>.
          </p>
          <p className="text-sm" style={{ color: '#6a6560' }}>
            <a href="/learn" className="hover:underline" style={{ color: '#c8922a' }}>
              → Explore the Learning Centre for deeper explanations
            </a>
          </p>
        </footer>
      </div>
    </PageLayout>
  );
}
