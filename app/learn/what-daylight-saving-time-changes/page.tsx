import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "What Daylight Saving Time Actually Changes — TimeMeaning",
  description:
    "DST shifts the clock, not the timezone. This distinction causes most DST-related errors in scheduling and communication.",
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
          What daylight saving time actually changes
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          DST shifts the clock, not the timezone. This distinction causes most
          DST-related errors in scheduling and communication.
        </p>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Definition
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            <strong>Daylight Saving Time (DST)</strong> is the practice of
            advancing clocks by one hour during warmer months so that evening
            daylight lasts longer. When DST ends, clocks are set back one hour.
            The geographic timezone does not change — only the offset from UTC.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            What changes during DST transitions
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            The UTC offset changes
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            A location observing Eastern Time in the US is UTC-5 during standard
            time (EST) and UTC-4 during daylight time (EDT). The offset shifts,
            but the location's timezone identifier remains "America/New_York."
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Clock times jump or repeat
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            When clocks "spring forward," an hour is skipped. 2:00am becomes
            3:00am instantly. When clocks "fall back," an hour repeats. 1:30am
            occurs twice. Times during these transitions can be ambiguous or
            invalid.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            The timezone name changes
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            EST becomes EDT. PST becomes PDT. GMT becomes BST in the UK. These
            are different abbreviations representing different UTC offsets.
            Using the wrong abbreviation shifts the time by one hour.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Common errors
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Using "EST" year-round when EDT applies during summer months
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Scheduling meetings during the skipped or repeated hour
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Assuming all regions observe DST (Arizona, Hawaii, and most of
                the world do not)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Forgetting that DST transitions occur on different dates in
                different countries
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            When DST transitions occur
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            In the United States, DST begins on the second Sunday of March and
            ends on the first Sunday of November. In the European Union, it
            begins on the last Sunday of March and ends on the last Sunday of
            October. Southern hemisphere countries that observe DST do so during
            their summer months, which are opposite to the northern hemisphere.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Limitations
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            DST rules change. Governments modify or abolish DST with varying
            notice. Historical dates may have followed different rules than
            current ones. Always verify DST status for the specific date and
            location in question.
          </p>
        </section>

        <section className="p-5 bg-secondary/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Related:</strong>{" "}
            <Link
              href="/learn/est-vs-edt"
              className="text-primary hover:underline"
            >
              EST vs EDT: why this causes confusion
            </Link>{" "}
            ·{" "}
            <Link
              href="/learn/why-time-references-are-ambiguous"
              className="text-primary hover:underline"
            >
              Why time references are often ambiguous
            </Link>
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
