import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { ShareButtons } from "@/components/share-buttons"
import { JsonLd, generateFAQSchema, generateBreadcrumbSchema } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "How It Works — TimeMeaning",
  description: "The deterministic five-step pipeline TimeMeaning uses to interpret time references. No machine learning. Every assumption documented.",
  alternates: {
    canonical: "https://timemeaning.com/how-it-works",
  },
  openGraph: {
    title: "How It Works — TimeMeaning",
    description: "The deterministic five-step pipeline TimeMeaning uses to interpret time references. No machine learning. Every assumption documented.",
    type: "website",
    siteName: "TimeMeaning",
    images: [
      {
        url: "https://timemeaning.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TimeMeaning — Understand any time reference instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works — TimeMeaning",
    description: "The deterministic five-step pipeline TimeMeaning uses to interpret time references.",
    images: ["https://timemeaning.com/og-image.jpg"],
  },
}

const faqData = [
  {
    question: "What does TimeMeaning do?",
    answer: "TimeMeaning resolves ambiguous time references — including natural language phrases, timezone abbreviations, Unix timestamps, and relative expressions — into precise, explained interpretations with every assumption shown explicitly."
  },
  {
    question: "Does TimeMeaning store my time references?",
    answer: "No. Time references are processed entirely to produce your result. They are not stored on servers, logged, analysed, or used for any purpose beyond producing the interpretation you requested."
  },
  {
    question: "What is the difference between TimeMeaning and a timezone converter?",
    answer: "A timezone converter assumes you know what timezone you are in and what timezone you are converting to. TimeMeaning handles the step before that — figuring out what a messily written time reference actually refers to, when the timezone is ambiguous, when DST changes the answer, or when the expression is relative and needs anchoring to a specific date."
  },
  {
    question: "Does TimeMeaning use machine learning?",
    answer: "No. TimeMeaning uses a deterministic five-step pipeline. The same input with the same context always produces the same output. Every assumption is documented and shown explicitly — there is no probabilistic guessing."
  },
  {
    question: "What timezone database does TimeMeaning use?",
    answer: "TimeMeaning uses the IANA Time Zone Database, the authoritative global standard for timezone and DST data used by operating systems, programming languages, and standards bodies worldwide."
  }
];

export default function HowItWorksPage() {
  const faqSchema = generateFAQSchema(faqData);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "How It Works", url: "https://timemeaning.com/how-it-works" }
  ]);

  return (
    <PageLayout>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="prose-like" style={{ maxWidth: '680px' }}>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-6">
          How TimeMeaning resolves a time reference
        </h1>

        <p className="text-foreground/85 leading-relaxed mb-10">
          TimeMeaning takes any pasted text containing a time reference and works through 
          a sequence of steps to produce a clear, explained result. Here is what happens.
        </p>

        <div className="space-y-10">
          <section style={{ marginTop: '40px' }}>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Step 1: Detection
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              The tool scans your pasted text for time expressions — including natural 
              language phrases like &ldquo;next Wednesday at 9&rdquo;, technical formats like ISO-8601 
              timestamps and Unix epoch values, timezone abbreviations like CST, IST, or BST, 
              and mixed-zone statements like &ldquo;9am London, LA morning&rdquo;. Multiple time 
              references in a single paste are handled simultaneously.
            </p>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Step 2: Disambiguation
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Many timezone abbreviations map to more than one region. CST, for example, 
              refers to both Central Standard Time in the United States (UTC−6) and China 
              Standard Time (UTC+8) — a difference of fourteen hours. When an abbreviation 
              is ambiguous, TimeMeaning flags it explicitly and asks a single clarifying 
              question before proceeding. It never guesses silently.
            </p>
            <p className="text-foreground/85 leading-relaxed mt-4">
              TimeMeaning maintains a manually verified database of 87 timezone abbreviations with documented alternative interpretations, maximum UTC offset spreads, and usage regions. This database is updated with each IANA release and is the basis for all ambiguity detection in the resolver.
            </p>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Step 3: DST resolution
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Daylight Saving Time rules vary by country, by region within a country, and 
              by year. The United States, Europe, and Australia observe daylight saving but 
              switch on different dates. Many countries do not observe it at all. TimeMeaning 
              applies the correct DST rule for the specific date in the input, not just the 
              current date, and flags whether a DST transition is approaching.
            </p>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Step 4: Output
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              The resolved result displays: the interpreted date and time, the timezone with 
              its current UTC offset, DST status (active or inactive), any day or date changes 
              across regions, the canonical ISO-8601 timestamp, and a plain-English explanation 
              of every assumption made. Nothing is hidden.
            </p>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Step 5: Sharing
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Every resolved result generates a unique canonical URL. That link reproduces the 
              same interpretation and explanation for anyone who opens it. It is designed to be 
              pasted into a chat message, email, or ticket as a verifiable reference — not just 
              an answer, but a source.
            </p>
          </section>
        </div>

        <section style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.4)', margin: '0 0 32px 0' }} />
          <h2 className="font-serif text-xl font-medium text-foreground mb-4">
            What TimeMeaning does not do
          </h2>
          <p className="text-foreground/85 leading-relaxed">
            It does not suggest meeting times. It does not access your calendar. It does not 
            require an account. It does not store your pasted text. It does not use your data 
            for any purpose. It interprets. Nothing else.
          </p>
        </section>

        {/* FAQ link */}
        <p className="mt-6 text-foreground/85">
          See our <a href="/faq" className="text-primary hover:underline">FAQ</a> for more common questions about TimeMeaning.
        </p>

        {/* Share buttons */}
        <ShareButtons label="SHARE TIMEMEANING" />
      </article>
    </PageLayout>
  )
}
