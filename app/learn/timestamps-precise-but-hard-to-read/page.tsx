import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Why Timestamps Are Precise but Hard to Read — TimeMeaning",
  description:
    "ISO 8601 and Unix timestamps are unambiguous to machines. Humans struggle to interpret them without conversion.",
};

export default function ArticlePage() {
  return (
    <PageLayout>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/learn"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Learning Centre
        </Link>
      </nav>

      <article className="prose-custom">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium tracking-tight mb-6">
          Why timestamps are precise but hard to read
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          ISO 8601 and Unix timestamps are unambiguous to machines. Humans
          struggle to interpret them without conversion.
        </p>

        <AdSlot slot="learn-top" />

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Definitions
          </h2>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              <strong>ISO 8601</strong> is an international standard for
              representing dates and times. Example:{" "}
              <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded">
                2025-03-15T14:30:00Z
              </code>
              . This format includes the date, time, and timezone offset,
              eliminating ambiguity.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>Unix timestamp</strong> (also called epoch time) is the
              number of seconds that have elapsed since January 1, 1970, at
              00:00:00 UTC. Example:{" "}
              <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded">
                1742048400
              </code>
              . This represents a single moment in time with no timezone
              ambiguity.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Why they are precise
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            No timezone ambiguity
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            A Unix timestamp represents one exact moment. It does not depend on
            the reader's location or the sender's timezone. ISO 8601 with a "Z"
            suffix or explicit offset similarly pins down the exact moment.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            No date format confusion
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            ISO 8601 uses year-month-day order (YYYY-MM-DD), avoiding the
            ambiguity between US (MM/DD/YYYY) and European (DD/MM/YYYY) date
            formats.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Machine-parseable
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Both formats are designed for software. They can be reliably parsed,
            compared, and converted without natural language interpretation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Why humans find them difficult
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Unix timestamps are not intuitive
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            The number 1742048400 conveys nothing to a human reader. Converting
            it to a readable date requires calculation or a tool. Most people
            cannot estimate whether a given timestamp is today, last year, or a
            decade ago.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            ISO 8601 requires mental parsing
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            While more readable than Unix timestamps, ISO 8601 strings like{" "}
            <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded">
              2025-03-15T14:30:00-05:00
            </code>{" "}
            still require effort to interpret. The "T" separator, the 24-hour
            time, and the offset notation are unfamiliar to many readers.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Local time conversion is needed
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            A timestamp in UTC must be converted to the reader's local timezone
            to be useful for scheduling. "14:30 UTC" means different wall-clock
            times in different locations.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Examples
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left p-3 border-b border-border font-medium">
                    Format
                  </th>
                  <th className="text-left p-3 border-b border-border font-medium">
                    Value
                  </th>
                  <th className="text-left p-3 border-b border-border font-medium">
                    Human reading
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-border">Unix</td>
                  <td className="p-3 border-b border-border font-mono text-xs">
                    1742048400
                  </td>
                  <td className="p-3 border-b border-border text-muted-foreground">
                    March 15, 2025, 2:00 PM UTC
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border">ISO 8601 (UTC)</td>
                  <td className="p-3 border-b border-border font-mono text-xs">
                    2025-03-15T14:00:00Z
                  </td>
                  <td className="p-3 border-b border-border text-muted-foreground">
                    March 15, 2025, 2:00 PM UTC
                  </td>
                </tr>
                <tr>
                  <td className="p-3">ISO 8601 (offset)</td>
                  <td className="p-3 font-mono text-xs">
                    2025-03-15T09:00:00-05:00
                  </td>
                  <td className="p-3 text-muted-foreground">
                    March 15, 2025, 9:00 AM (UTC-5)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Best practices
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Store timestamps in UTC or as Unix time for precision
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Display times in the user's local timezone for readability
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                When sharing with humans, include both the timestamp and a
                human-readable interpretation
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Limitations
          </h2>
          <p className="text-foreground leading-relaxed">
            Timestamps are precise but context-free. They tell you exactly when
            something occurred but not what that moment means (business hours,
            deadlines, relative to other events). Human-readable formats lose
            precision; machine formats lose context. Neither is complete without
            the other.
          </p>
        </section>

        <AdSlot slot="learn-bottom" />

        <section className="p-5 bg-secondary/50 rounded-md">

          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Related:</strong>{" "}
            <Link
              href="/learn/why-time-references-are-ambiguous"
              className="text-primary hover:underline"
            >
              Why time references are often ambiguous
            </Link>{" "}
            ·{" "}
            <Link
              href="/learn/est-vs-edt"
              className="text-primary hover:underline"
            >
              EST vs EDT: why this causes confusion
            </Link>
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

