import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "How software and humans disagree about time — TimeMeaning",
  description: "Software stores time as UTC timestamps. Humans think in local time. The translation between them is where confusion happens.",
};

export default function Article() {
  return (
    <PageLayout>
      <article className="prose-neutral">
        <header className="mb-10">
          <Link 
            href="/insights" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
          >
            ← Back to Insights
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-medium tracking-tight mt-4">
            How software and humans disagree about time
          </h1>
        </header>

        <AdSlot slot="insights-top" />

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Two different models of time
            </h2>
            <p>
              Humans experience time locally. When you think "9 o'clock," you mean 9 o'clock in your timezone, with your current daylight saving status, on your calendar.
            </p>
            <p className="mt-3">
              Software stores time differently. Most systems use UTC (Coordinated Universal Time) — a single, universal reference point with no timezone offset and no daylight saving. The timestamp <code className="bg-secondary/50 px-1.5 py-0.5 rounded text-sm">2024-03-15T14:00:00Z</code> means the same instant everywhere in the world.
            </p>
            <p className="mt-3">
              The translation between UTC and local time is where things go wrong.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Where the translation happens
            </h2>
            <p>
              When software displays a time to a user, it typically:
            </p>
            <ol className="mt-4 space-y-2 ml-4 list-decimal list-inside">
              <li>Retrieves the UTC timestamp from storage</li>
              <li>Determines the user's timezone (from browser, settings, or assumptions)</li>
              <li>Converts the UTC time to local time</li>
              <li>Formats it for display</li>
            </ol>
            <p className="mt-4">
              Each of these steps can introduce errors or ambiguity.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Common failure modes
            </h2>
            
            <div className="mt-4 space-y-4">
              <div className="bg-secondary/50 rounded-md p-4">
                <p className="font-medium text-foreground mb-2">Wrong timezone assumption</p>
                <p className="text-sm text-muted-foreground">
                  The system assumes a default timezone (often UTC or the server's timezone) instead of detecting the user's actual timezone. Times appear shifted by several hours.
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-md p-4">
                <p className="font-medium text-foreground mb-2">Missing timezone in display</p>
                <p className="text-sm text-muted-foreground">
                  The system shows "3:00 PM" without indicating which timezone. The user assumes their local timezone, but the system meant something else.
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-md p-4">
                <p className="font-medium text-foreground mb-2">DST not accounted for</p>
                <p className="text-sm text-muted-foreground">
                  The system uses a fixed offset (like UTC-5) instead of a proper timezone identifier (like America/New_York). When daylight saving changes, the displayed times are wrong.
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-md p-4">
                <p className="font-medium text-foreground mb-2">User input stored incorrectly</p>
                <p className="text-sm text-muted-foreground">
                  A user enters "9:00 AM" meaning their local time, but the system interprets it as UTC or another timezone. The meeting ends up scheduled at the wrong time.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Epoch timestamps
            </h2>
            <p>
              Many systems store time as a Unix epoch timestamp — the number of seconds since January 1, 1970, 00:00:00 UTC. For example:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm">
              <p>1710507600</p>
              <p className="text-muted-foreground mt-1">= March 15, 2024, 2:00 PM UTC</p>
              <p className="text-muted-foreground">= March 15, 2024, 10:00 AM EDT</p>
              <p className="text-muted-foreground">= March 15, 2024, 11:00 PM JST</p>
            </div>
            <p className="mt-4">
              Epoch timestamps are unambiguous — they represent a single instant in time. But they're not human-readable, so every display requires conversion.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              ISO 8601 format
            </h2>
            <p>
              The ISO 8601 standard provides a human-readable format that can include timezone information:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm space-y-2">
              <p><code>2024-03-15T14:00:00Z</code> — UTC (the Z means "Zulu time," i.e., UTC)</p>
              <p><code>2024-03-15T10:00:00-04:00</code> — EDT (4 hours behind UTC)</p>
              <p><code>2024-03-15T23:00:00+09:00</code> — JST (9 hours ahead of UTC)</p>
            </div>
            <p className="mt-4">
              All three of these represent the same instant. The format makes the timezone explicit, reducing ambiguity.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              What TimeMeaning does
            </h2>
            <p>
              TimeMeaning accepts both human-readable time expressions and technical formats like epoch timestamps or ISO 8601. It interprets them, converts them, and shows the result in multiple formats — including UTC, local time, and the canonical ISO 8601 representation.
            </p>
            <p className="mt-3">
              This helps bridge the gap between how software stores time and how humans understand it.
            </p>
          </section>
        </div>

        <AdSlot slot="insights-bottom" />

        {/* Related link */}
        <aside className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Related:{" "}
            <Link href="/learn/timestamps-precise-but-hard-to-read" className="text-foreground hover:underline">
              Why timestamps are precise but hard to read
            </Link>
          </p>
        </aside>
      </article>
    </PageLayout>
  );
}
