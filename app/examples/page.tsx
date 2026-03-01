import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Worked Examples — TimeMeaning",
  description:
    "Common time references resolved with full explanation. See how TimeMeaning handles ambiguous abbreviations, relative expressions, and technical formats.",
  openGraph: {
    title: "Worked Examples — TimeMeaning",
    description: "Common time references resolved with full explanation. See how TimeMeaning handles ambiguous abbreviations, relative expressions, and technical formats.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worked Examples — TimeMeaning",
    description: "Common time references resolved with full explanation.",
  },
};

interface ExampleCardProps {
  input: string;
  resolved: string;
  note: string;
  interpretations?: string[];
  tryLink: string;
}

function ExampleCard({ input, resolved, note, interpretations, tryLink }: ExampleCardProps) {
  return (
    <article className="bg-surface border border-border rounded-md overflow-hidden">
      {/* Dark terminal input */}
      <div className="bg-[#1a1a1a] px-4 py-3">
        <code className="font-mono text-[#c8922a]" style={{ fontSize: '14px' }}>
          {input}
        </code>
      </div>
      
      {/* Resolution */}
      <div className="px-4 py-4">
        <p className="text-foreground font-sans mb-2" style={{ fontSize: '14px', lineHeight: 1.5 }}>
          {resolved}
        </p>
        
        {interpretations && interpretations.length > 0 && (
          <ul className="mb-3 pl-4" style={{ fontSize: '13px' }}>
            {interpretations.map((interp, i) => (
              <li key={i} className="text-text-secondary list-disc">{interp}</li>
            ))}
          </ul>
        )}
        
        <p className="text-text-muted italic mb-3" style={{ fontSize: '13px', lineHeight: 1.5 }}>
          {note}
        </p>
        
        <Link 
          href={`/?q=${encodeURIComponent(tryLink)}`}
          className="text-sm text-primary hover:underline"
        >
          Try this in the tool →
        </Link>
      </div>
    </article>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 
      className="font-mono text-primary uppercase tracking-wider mb-4"
      style={{ fontSize: '11px', letterSpacing: '0.1em' }}
    >
      {children}
    </h2>
  );
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Examples", url: "https://timemeaning.com/examples" }
]);

export default function ExamplesPage() {
  return (
  <PageLayout>
  <JsonLd data={breadcrumbSchema} />
  <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        {/* Page header */}
        <header className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight leading-tight mb-4">
            Worked Examples
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Common time references — and what they actually mean.
          </p>
          {/* Amber horizontal rule */}
          <div style={{ margin: '20px 0 32px 0', height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.35)' }} />
        </header>

        {/* Section 1: Ambiguous Abbreviations */}
        <section className="mb-12">
          <SectionHeading>Ambiguous Abbreviations</SectionHeading>
          <div className="flex flex-col gap-4">
            <ExampleCard
              input="3pm IST"
              resolved="Ambiguous — three valid interpretations shown side by side"
              interpretations={[
                "India Standard Time → 09:30 UTC",
                "Irish Standard Time → 14:00 or 15:00 UTC (DST-dependent)",
                "Israel Standard Time → 13:00 or 12:00 UTC (DST-dependent)",
              ]}
              note="This cannot be resolved without knowing the sender's location. TimeMeaning flags it as ambiguous and shows all three."
              tryLink="3pm IST"
            />
            
            <ExampleCard
              input="9am CST Monday"
              resolved="Ambiguous — two valid interpretations"
              interpretations={[
                "Central Standard Time (US) → 15:00 UTC Monday",
                "China Standard Time → 01:00 UTC Tuesday",
              ]}
              note="CST spans 14 hours. A morning meeting in Chicago is the middle of the night in Beijing."
              tryLink="9am CST Monday"
            />
            
            <ExampleCard
              input="Noon GMT"
              resolved="Unambiguous — 12:00 UTC"
              note="GMT is always UTC+0. Unlike BST which shifts seasonally, GMT does not change. This is one of the few unambiguous timezone expressions."
              tryLink="Noon GMT"
            />
          </div>
        </section>

        {/* Section 2: Relative Expressions */}
        <section className="mb-12" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.25)', marginBottom: '20px' }} />
          <SectionHeading>Relative Expressions</SectionHeading>
          <div className="flex flex-col gap-4">
            <ExampleCard
              input="Next Friday at 3pm EST"
              resolved="Friday 7 March 2026 at 15:00 Eastern Standard Time (UTC-5) = 20:00 UTC"
              note="'Next Friday' interpreted as the upcoming Friday from today's date. EST interpreted as Eastern Standard Time (US), not Australian Eastern Standard Time."
              tryLink="Next Friday at 3pm EST"
            />
            
            <ExampleCard
              input="Tomorrow morning GMT"
              resolved="Partial — 'morning' is ambiguous without a specific time"
              note="'Morning' is not a precise time. TimeMeaning resolves the date but flags 'morning' as unresolved — it could mean anything from 06:00 to 12:00."
              tryLink="Tomorrow morning GMT"
            />
            
            <ExampleCard
              input="End of day Thursday CET"
              resolved="Thursday at 17:00 CET (UTC+1 in winter, UTC+2 in summer — DST-dependent)"
              note="'End of day' conventionally means 17:00 but is not universal. Some organisations use 18:00 or local business close time."
              tryLink="End of day Thursday CET"
            />
          </div>
        </section>

        {/* Section 3: Technical Formats */}
        <section className="mb-12" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.25)', marginBottom: '20px' }} />
          <SectionHeading>Technical Formats</SectionHeading>
          <div className="flex flex-col gap-4">
            <ExampleCard
              input="1741381200"
              resolved="Friday 7 March 2025 at 20:00:00 UTC"
              interpretations={[
                "Format: Unix timestamp (10 digits = seconds since 1970-01-01T00:00:00Z)",
                "Y2K38 status: Safe (well within 32-bit range)",
              ]}
              note="Unix timestamps are unambiguous but require conversion to be human-readable."
              tryLink="1741381200"
            />
            
            <ExampleCard
              input="2026-03-10T14:30:00Z"
              resolved="Tuesday 10 March 2026 at 14:30 UTC — fully unambiguous"
              note="ISO 8601 with Z suffix is the gold standard. No assumptions required."
              tryLink="2026-03-10T14:30:00Z"
            />
            
            <ExampleCard
              input="2026-03-10T14:30:00-05:00"
              resolved="Tuesday 10 March 2026 at 14:30 Eastern Standard Time = 19:30 UTC"
              note="ISO 8601 with explicit UTC offset. Unambiguous — the offset is stated, not inferred."
              tryLink="2026-03-10T14:30:00-05:00"
            />
          </div>
        </section>

        {/* Section 4: Edge Cases */}
        <section className="mb-12" style={{ marginTop: '48px' }}>
          <div style={{ height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.25)', marginBottom: '20px' }} />
          <SectionHeading>Edge Cases</SectionHeading>
          <div className="flex flex-col gap-4">
            <ExampleCard
              input="2:30am on March 8 2026 (US Eastern)"
              resolved="Ghost time — this moment did not exist"
              note="When US clocks spring forward on 8 March 2026, time jumps from 01:59 to 03:00. 02:30 on this date in Eastern time never occurred."
              tryLink="2:30am March 8 2026 EST"
            />
            
            <ExampleCard
              input="December 30 2011 in Samoa"
              resolved="Ghost date — this date was skipped by government decree"
              note="Samoa skipped this date entirely when moving across the International Date Line."
              tryLink="December 30 2011 Samoa"
            />
            
            <ExampleCard
              input="1200Z"
              resolved="12:00 UTC — fully unambiguous"
              note="Zulu time. Used in aviation, military, and meteorology. Z always means UTC."
              tryLink="1200Z"
            />
          </div>
        </section>

        {/* CTA */}
        <div className="pt-8 border-t border-border text-center">
          <Link 
            href="/"
            className="inline-block text-primary hover:underline"
          >
            → Try your own time reference in the main tool
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
