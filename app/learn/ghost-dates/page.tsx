import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Ghost Dates: Calendar Reforms and Missing Days — TimeMeaning Learning Centre",
  description: "Dates that never existed: from the Gregorian calendar reform to Samoa's missing Friday.",
};

export default function GhostDatesArticlePage() {
  return (
    <PageLayout>
      <article>
        <header className="mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
            Learning Centre
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight">
            Ghost Dates: Missing Days in History
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Throughout history, entire days have been deleted from calendars. These "ghost dates" never existed — and can cause subtle bugs in historical calculations.
          </p>
        </header>

        <AdSlot slot="learn-top" />

        <div className="prose prose-neutral max-w-none">
          <div className="p-6 bg-surface border border-border rounded-md mb-8">
            <p className="text-sm text-text-muted italic">
              This article is coming soon. In the meantime, here is a summary of major ghost date events:
            </p>
          </div>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">The Gregorian Calendar Reform (1582)</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            When Pope Gregory XIII introduced the Gregorian calendar, Catholic countries skipped from Thursday 4 October 1582 directly to Friday 15 October 1582. The dates <strong>October 5–14, 1582</strong> do not exist in Italian, Spanish, Portuguese, or Polish historical records.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">Britain's Lost Days (1752)</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Britain and its colonies adopted the Gregorian calendar 170 years later. Wednesday 2 September 1752 was followed by Thursday 14 September 1752. The dates <strong>September 3–13, 1752</strong> do not exist in British or American historical records.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">Samoa's Missing Friday (2011)</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            On 29 December 2011, Samoa and Tokelau skipped directly to 31 December, crossing the International Date Line. <strong>December 30, 2011</strong> never occurred in Samoa — the most recent ghost date in history.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">February 30</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            February 30 has never existed in normal calendar use, but it appeared twice: Sweden used it in 1712 during a calendar transition, and the Soviet Union used it administratively in 1930.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">DST Ghost Hours</h2>
          <p className="text-text-secondary leading-relaxed">
            Every spring, when clocks spring forward for Daylight Saving Time, one hour is skipped entirely. In the US, times between 02:00 and 02:59 on the second Sunday of March do not exist. These "ghost hours" can cause bugs in scheduling systems and log analysis.
          </p>
        </div>

        <AdSlot slot="learn-bottom" />

        <ShareButtons 
          label="SHARE THIS ARTICLE" 
          shareText="Ghost dates: the days that were deleted from history:"
        />

        <div className="mt-8 pt-6 border-t border-border">
          <Link href="/learn" className="text-sm text-primary hover:underline">
            ← Back to Learning Centre
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
