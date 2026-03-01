import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import AdSlot from "@/components/AdSlot";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "EST vs EDT: Why This Causes Confusion — TimeMeaning",
  description:
    "Eastern Standard Time and Eastern Daylight Time are not the same. Using the wrong one shifts your time by an hour.",
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
          EST vs EDT: why this causes confusion
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Eastern Standard Time and Eastern Daylight Time are not the same.
          Using the wrong one shifts your time by an hour.
        </p>

        <AdSlot slot="learn-top" />

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Definitions
          </h2>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              <strong>EST (Eastern Standard Time)</strong> is UTC-5. It is
              observed during winter months in the Eastern timezone of North
              America.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>EDT (Eastern Daylight Time)</strong> is UTC-4. It is
              observed during summer months when daylight saving time is in
              effect.
            </p>
            <p className="text-foreground leading-relaxed">
              <strong>ET (Eastern Time)</strong> is a general reference that
              automatically adjusts for whichever offset is currently in effect.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Why the confusion occurs
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            People use EST year-round
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Many people write "EST" regardless of the season. In casual usage,
            "EST" often means "Eastern Time" rather than specifically "Eastern
            Standard Time." This creates ambiguity because the reader cannot
            know whether the sender means UTC-5 or is simply using EST as a
            shorthand for the Eastern timezone.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            The abbreviations are similar
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            EST and EDT differ by only one letter. This makes them easy to
            confuse or mistype. The same pattern applies to PST/PDT, CST/CDT,
            and MST/MDT.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Software inconsistencies
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Some calendar applications display "EST" even during daylight saving
            time. Email clients may show timestamps with incorrect abbreviations.
            These software behaviors reinforce incorrect usage.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            The practical impact
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            If someone schedules a call for "3pm EST" in July, they probably
            mean 3pm Eastern Time (EDT, UTC-4). If you interpret this literally
            as EST (UTC-5), you will join the call an hour late.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Conversely, if a system records a timestamp as "EST" when EDT was in
            effect, the stored time is incorrect by one hour.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            How to avoid errors
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Use "ET" (Eastern Time) when you mean "whatever offset applies
                on that date"
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Use UTC offsets (e.g., "3pm UTC-4") for precision
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Use IANA timezone identifiers (e.g., "America/New_York") in
                systems and APIs
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                When reading "EST" in summer, assume the sender likely means EDT
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Limitations
          </h2>
          <p className="text-foreground leading-relaxed">
            When someone writes "EST" during summer, it is impossible to know
            with certainty whether they meant EST (UTC-5), EDT (UTC-4), or
            simply "Eastern Time." Context and convention suggest EDT is more
            likely, but confirmation may be necessary for time-sensitive
            coordination.
          </p>
        </section>

        <ArticleChatPrompt />

        <AdSlot slot="learn-bottom" />

        <section className="p-5 bg-secondary/50 rounded-md">

          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Related:</strong>{" "}
            <Link
              href="/learn/what-daylight-saving-time-changes"
              className="text-primary hover:underline"
            >
              What daylight saving time actually changes
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


