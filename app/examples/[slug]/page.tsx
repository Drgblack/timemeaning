import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

const examples: Record<string, {
  title: string;
  input: string;
  interpretation: string;
  timezone: string;
  utcOffset: string;
  dst: string;
  explanation: string;
  relatedLearn: { href: string; title: string };
}> = {
  "3pm-est-in-summer": {
    title: "3pm EST in summer",
    input: "3pm EST on July 15, 2024",
    interpretation: "Monday, July 15, 2024 at 3:00 PM EDT",
    timezone: "America/New_York (Eastern Time)",
    utcOffset: "UTC-04:00",
    dst: "Active (Eastern Daylight Time)",
    explanation: "EST technically refers to Eastern Standard Time (UTC-5), which is only in effect during winter months. In July, the Eastern timezone observes EDT (Eastern Daylight Time, UTC-4). TimeMeaning interprets 'EST' as the user's likely intent: Eastern Time, regardless of the DST label used.",
    relatedLearn: { href: "/learn/est-vs-edt", title: "EST vs EDT: What's the difference?" },
  },
  "next-friday-10am": {
    title: "Next Friday at 10am",
    input: "next Friday at 10am",
    interpretation: "Depends on current date",
    timezone: "User's local timezone",
    utcOffset: "Varies",
    dst: "Depends on date",
    explanation: "Relative dates like 'next Friday' require knowing when the query was made. If asked on a Monday, 'next Friday' typically means the Friday of the same week. If asked on a Saturday, it usually means the Friday of the following week. The interpretation also depends on whether you consider the current day as 'this' week or the start of 'next' week.",
    relatedLearn: { href: "/learn/what-next-friday-means", title: "What does 'next Friday' actually mean?" },
  },
  "unix-timestamp": {
    title: "Unix timestamp: 1709251200",
    input: "1709251200",
    interpretation: "Friday, March 1, 2024 at 12:00:00 AM UTC",
    timezone: "UTC",
    utcOffset: "UTC+00:00",
    dst: "Not applicable",
    explanation: "Unix timestamps represent seconds since January 1, 1970 (UTC). They are unambiguous and timezone-independent, but require conversion to be human-readable. The value 1709251200 corresponds to midnight UTC on March 1, 2024. Local time interpretation requires knowing the user's timezone.",
    relatedLearn: { href: "/learn/timestamps-precise-but-hard-to-read", title: "Why timestamps are precise but hard to read" },
  },
  "10am-cst": {
    title: "10am CST",
    input: "10am CST",
    interpretation: "Requires context",
    timezone: "Ambiguous",
    utcOffset: "UTC-06:00 (US) or UTC+08:00 (China)",
    dst: "Depends on interpretation",
    explanation: "CST is an ambiguous abbreviation. In North America, it refers to Central Standard Time (UTC-6). In China, it refers to China Standard Time (UTC+8). There's a 14-hour difference between these interpretations. TimeMeaning uses contextual clues when available, or prompts for clarification.",
    relatedLearn: { href: "/learn/ambiguous-timezone-abbreviations", title: "Ambiguous timezone abbreviations" },
  },
  "iso-8601-with-offset": {
    title: "ISO 8601 with offset",
    input: "2024-03-15T14:30:00+05:30",
    interpretation: "Friday, March 15, 2024 at 2:30 PM IST",
    timezone: "Asia/Kolkata (Indian Standard Time)",
    utcOffset: "UTC+05:30",
    dst: "Not observed in this timezone",
    explanation: "ISO 8601 format with an explicit timezone offset is unambiguous. The +05:30 offset corresponds to Indian Standard Time. This format is machine-readable and internationally recognized. The equivalent UTC time is 09:00:00.",
    relatedLearn: { href: "/learn/iso-8601-for-humans", title: "ISO 8601 for humans" },
  },
  "dst-transition-day": {
    title: "2am on DST transition day",
    input: "2:30am on March 10, 2024 in New York",
    interpretation: "This time does not exist",
    timezone: "America/New_York",
    utcOffset: "N/A",
    dst: "Transition in progress",
    explanation: "On March 10, 2024, the Eastern US transitioned from EST to EDT at 2:00 AM. Clocks moved forward from 1:59:59 AM directly to 3:00:00 AM, skipping the 2:00 AM hour entirely. Any time between 2:00:00 AM and 2:59:59 AM on this day does not exist in this timezone. TimeMeaning flags these invalid times.",
    relatedLearn: { href: "/learn/dst-shift-dates", title: "When daylight saving time shifts" },
  },
};

export async function generateStaticParams() {
  return Object.keys(examples).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const example = examples[slug];
  if (!example) return { title: "Example not found — TimeMeaning" };
  
  return {
    title: `${example.title} — Time Reference Example — TimeMeaning`,
    description: example.explanation.slice(0, 160),
  };
}

export default async function ExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const example = examples[slug];
  
  if (!example) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
          <nav className="mb-8">
            <Link 
              href="/examples" 
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              ← Back to examples
            </Link>
          </nav>

          <article>
            <header className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
                {example.title}
              </h1>
              <p className="text-sm text-text-muted">
                Time reference example
              </p>
            </header>

            {/* Input */}
            <section className="mb-8">
              <h2 className="text-xs text-text-muted uppercase tracking-wide mb-2">Input</h2>
              <div className="bg-surface border border-border rounded-md p-4">
                <code className="font-mono text-accent">{example.input}</code>
              </div>
            </section>

            {/* Interpretation */}
            <section className="mb-8 bg-surface border-l-4 border-primary rounded-r-md p-5">
              <h2 className="text-xs text-text-muted uppercase tracking-wide mb-3">Interpretation</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-text-muted">Result</dt>
                  <dd className="font-mono text-foreground">{example.interpretation}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">Timezone</dt>
                  <dd className="font-mono text-sm text-accent">{example.timezone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">UTC Offset</dt>
                  <dd className="font-mono text-sm text-accent">{example.utcOffset}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">Daylight Saving</dt>
                  <dd className="text-sm text-text-secondary">{example.dst}</dd>
                </div>
              </dl>
            </section>

            {/* Explanation */}
            <section className="mb-10">
              <h2 className="text-xs text-text-muted uppercase tracking-wide mb-3">Explanation</h2>
              <p className="text-text-secondary leading-relaxed">
                {example.explanation}
              </p>
            </section>

            {/* Related learning */}
            <section className="pt-6 border-t border-border">
              <h2 className="text-xs text-text-muted uppercase tracking-wide mb-3">Related</h2>
              <Link 
                href={example.relatedLearn.href}
                className="text-primary hover:underline"
              >
                {example.relatedLearn.title}
              </Link>
            </section>

            {/* CTA */}
            <section className="mt-10 pt-6 border-t border-border">
              <p className="text-sm text-text-muted">
                <Link href="/" className="text-primary hover:underline">Try TimeMeaning</Link> with your own time reference.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
