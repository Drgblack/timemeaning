import type { Metadata } from "next"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "About TimeMeaning",
  description: "TimeMeaning is a free utility for resolving ambiguous time references. No guessing. No silent assumptions. Every interpretation explained.",
  alternates: {
    canonical: "https://timemeaning.com/about",
  },
  openGraph: {
    title: "About TimeMeaning",
    description: "TimeMeaning is a free utility for resolving ambiguous time references. No guessing. No silent assumptions. Every interpretation explained.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TimeMeaning",
    description: "TimeMeaning is a free utility for resolving ambiguous time references.",
  },
}

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "About", url: "https://timemeaning.com/about" }
  ]);

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      <article className="max-w-[640px] mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight leading-tight mb-10">
          About TimeMeaning
        </h1>

        {/* Section 1: What this is */}
        <section className="mb-10">
          <div className="prose-tm font-sans space-y-4">
            <p>
              TimeMeaning is a free public utility for resolving ambiguous time references. You paste a time expression — from an email, a calendar invite, a log file, a message thread — and the tool tells you what it actually means, with every assumption stated explicitly.
            </p>
            <p>
              It is not a timezone converter. Converters assume you know what timezone you're in and what timezone you're converting to. TimeMeaning handles the step before that — figuring out what a messily written time reference actually refers to, when the timezone is ambiguous, when daylight saving time changes the answer, or when the expression is relative ("next Friday") and needs anchoring to a specific date.
            </p>
            <p>
              The tool is deterministic. The same input with the same context always produces the same output. There is no machine learning making probabilistic guesses. When the tool makes an assumption — that EST means Eastern Standard Time rather than Australian Eastern Standard Time, that "next Friday" means the upcoming Friday rather than the one after — it says so explicitly. You can see every step of the reasoning.
            </p>
          </div>
        </section>

        {/* Section 2: Why it exists */}
        <section className="mb-10" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.3)', marginBottom: '24px' }} />
          <h2 className="font-display text-xl text-foreground mb-4">Why it exists</h2>
          <div className="prose-tm font-sans space-y-4">
            <p>
              Timezone ambiguity is a solved problem at the machine level. UTC is unambiguous. ISO 8601 with an explicit offset is unambiguous. The IANA timezone database is authoritative and comprehensive.
            </p>
            <p>
              The problem is that humans don't write machine-readable time references. They write "3pm IST" and "next Friday morning GMT" and "end of day Thursday CET." These expressions are natural in speech and writing but genuinely ambiguous when read by someone in a different context. The sender knows which IST they mean. The recipient cannot.
            </p>
            <p>
              Most tools that exist to help with this problem resolve the ambiguity silently — they make a guess based on your IP address, your account settings, or the most common interpretation, and present the result as if no ambiguity existed. This is worse than no resolution at all, because it creates false confidence in an interpretation that may be wrong.
            </p>
            <p>
              TimeMeaning takes a different position: ambiguity should be surfaced, not hidden. Every assumption is shown. Every interpretation is explained. The goal is not to guess correctly — it is to make the reasoning transparent enough that you can decide whether the interpretation is right for your context.
            </p>
          </div>
        </section>

        {/* Section 3: The philosophy (pull-quote) - top border on mobile */}
        <section style={{ margin: '40px 0' }}>
          <div 
            className="font-sans sm:border-l-[3px] sm:border-l-[#c8922a] sm:border-t-0 border-t-[3px] border-t-[#c8922a] sm:pl-5 pt-4 sm:pt-0"
            style={{ 
              backgroundColor: '#f5f0e8', 
              padding: '24px',
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#3a3530',
            }}
          >
            TimeMeaning treats time interpretation as a problem of meaning, not conversion. A timezone converter moves a number from one frame of reference to another. TimeMeaning asks a prior question: what does this time reference actually mean? Ambiguity is not an edge case to be handled silently. It is the central problem. Surfacing it is the product.
          </div>
        </section>

        {/* Section 4: How it works */}
        <section className="mb-10" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.3)', marginBottom: '24px' }} />
          <h2 className="font-display text-xl text-foreground mb-4">How it works</h2>
          <div className="prose-tm font-sans space-y-4">
            <p>
              The resolver uses a deterministic five-step pipeline: tokenisation, structural parsing, ambiguity detection, DST resolution, and output generation. It draws on the IANA Time Zone Database for timezone rules and DST transition dates. It does not learn from or retain your input — time references are processed in your browser and not transmitted to any server.
            </p>
            <p>
              A full explanation of the pipeline, including the reasoning behind specific disambiguation choices, is available in the Learning Centre.
            </p>
            <Link href="/learn/how-the-resolver-thinks" className="block text-primary hover:underline" style={{ marginTop: '8px' }}>
              → How TimeMeaning resolves a time reference
            </Link>
          </div>
        </section>

        {/* Section 5: Who built this */}
        <section className="mb-10" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.3)', marginBottom: '24px' }} />
          <h2 className="font-display text-xl text-foreground mb-4">Who built this</h2>
          <div className="prose-tm font-sans space-y-4">
            <p>
              TimeMeaning was designed and built as a precision utility for anyone who works across timezones — developers, distributed team managers, support professionals, aviation and maritime crews, and anyone who has ever spent five minutes wondering whether a meeting invite has the right time.
            </p>
            <p>
              The tool is free to use and will remain free. An API for programmatic access is in development for teams who need to resolve time references at scale.
            </p>
            <Link href="/developers" className="block text-primary hover:underline" style={{ marginTop: '8px' }}>
              → Register for API early access
            </Link>
          </div>
        </section>

        {/* Section 6: The data */}
        <section className="mb-10" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.3)', marginBottom: '24px' }} />
          <h2 className="font-display text-xl text-foreground mb-4">The data</h2>
          <div className="prose-tm font-sans space-y-4">
            <p>
              TimeMeaning does not store the time references you enter. It does not create user accounts. It does not track individual sessions. Anonymous aggregate analytics help us understand which tools and articles are most useful — no personal data is involved.
            </p>
            <p>
              Timezone rules are sourced from the IANA Time Zone Database, the authoritative global standard for timezone and DST data used by operating systems, programming languages, and standards bodies worldwide.
            </p>
            <p>
              TimeMeaning incorporates each IANA Time Zone Database release within 48 hours of publication. The current incorporated version is IANA 2026a. Historical timezone rules for dates before the current release are resolved using the correct historical IANA data for that date, not the current rules.
            </p>
          </div>
        </section>

        {/* Section 7: Contact */}
        <section className="mb-10" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.3)', marginBottom: '24px' }} />
          <h2 className="font-display text-xl text-foreground mb-4">Contact</h2>
          <div className="prose-tm font-sans space-y-4">
            <p>
              Questions, corrections, and feedback are welcome. If you find an interpretation that is wrong, a timezone rule that is out of date, or an ambiguity the tool handles incorrectly, please let us know.
            </p>
            <p>
              Common questions answered in our <Link href="/faq" className="text-primary hover:underline">FAQ</Link>.
            </p>
            <Link href="/contact" className="block text-primary hover:underline" style={{ marginTop: '8px' }}>
              → Contact
            </Link>
          </div>
        </section>
      </article>
    </PageLayout>
  )
}
