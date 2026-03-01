import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";

export const metadata: Metadata = {
  title: "Y2K38: The 2038 Problem — TimeMeaning Learning Centre",
  description: "Understanding the Year 2038 problem: when 32-bit Unix time runs out.",
};

export default function Y2K38ArticlePage() {
  return (
    <PageLayout>
      <article>
        <header className="mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
            Learning Centre
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight">
            Y2K38: The 2038 Problem
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Understanding why 32-bit Unix time runs out on 19 January 2038 — and what it means for legacy systems.
          </p>
        </header>

        <div className="prose prose-neutral max-w-none">
          <div className="p-6 bg-surface border border-border rounded-md mb-8">
            <p className="text-sm text-text-muted italic">
              This article is coming soon. In the meantime, here is the key information:
            </p>
          </div>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">The Overflow Point</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            On <strong>19 January 2038 at 03:14:07 UTC</strong>, 32-bit signed integer Unix timestamps will overflow. The maximum value of a 32-bit signed integer is 2,147,483,647 — and that many seconds after 1 January 1970 is the Y2K38 moment.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">What Happens at Overflow</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Systems using 32-bit <code className="bg-muted px-1.5 py-0.5 rounded text-sm">time_t</code> will interpret the next second as a large negative number, causing dates to wrap back to <strong>13 December 1901</strong>. This could cause system failures, incorrect date calculations, and data corruption.
          </p>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">Which Systems Are Affected</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>Embedded systems (IoT devices, industrial controllers, automotive systems)</li>
            <li>Older database schemas with 32-bit timestamp fields</li>
            <li>Legacy C code using <code className="bg-muted px-1.5 py-0.5 rounded text-sm">int</code> or <code className="bg-muted px-1.5 py-0.5 rounded text-sm">long</code> for time storage</li>
            <li>Some 32-bit operating systems and file systems</li>
          </ul>

          <h2 className="font-display text-2xl text-foreground mt-8 mb-4">The Fix</h2>
          <p className="text-text-secondary leading-relaxed">
            Modern systems use 64-bit integers for time storage, which extends the range to approximately 292 billion years. Most operating systems, programming languages, and databases have already migrated. The risk lies in forgotten legacy systems, embedded devices, and data stored in old formats.
          </p>
        </div>

        <ShareButtons 
          label="SHARE THIS ARTICLE" 
          shareText="Y2K38: When 32-bit Unix time runs out on 19 January 2038:"
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
