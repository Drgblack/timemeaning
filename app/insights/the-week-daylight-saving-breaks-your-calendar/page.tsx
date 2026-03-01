import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "The week daylight saving breaks your calendar — TimeMeaning",
  description: "When clocks change for daylight saving time, recurring meetings shift relative to other timezones. A 9am call can become 8am or 10am depending on where participants are located.",
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
            The week daylight saving breaks your calendar
          </h1>
        </header>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              The problem
            </h2>
            <p>
              Daylight saving time transitions happen on different dates in different countries. The United States changes clocks on the second Sunday of March and the first Sunday of November. The European Union changes on the last Sunday of March and the last Sunday of October. Many countries — including most of Asia, Africa, and South America — do not observe daylight saving at all.
            </p>
            <p className="mt-3">
              This creates periods where the offset between two timezones temporarily changes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              A concrete example
            </h2>
            <p>
              Consider a recurring meeting between New York and London:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm space-y-3">
              <div>
                <p className="text-muted-foreground text-xs mb-1">January (both on standard time)</p>
                <p>New York: 9:00 AM EST (UTC-5)</p>
                <p>London: 2:00 PM GMT (UTC+0)</p>
                <p className="text-muted-foreground">Offset: 5 hours</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Mid-March (US has changed, UK has not)</p>
                <p>New York: 9:00 AM EDT (UTC-4)</p>
                <p>London: 1:00 PM GMT (UTC+0)</p>
                <p className="text-muted-foreground">Offset: 4 hours</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">April (both on summer time)</p>
                <p>New York: 9:00 AM EDT (UTC-4)</p>
                <p>London: 2:00 PM BST (UTC+1)</p>
                <p className="text-muted-foreground">Offset: 5 hours</p>
              </div>
            </div>
            <p className="mt-4">
              From the London participant's perspective, the meeting appears to shift by one hour during the gap weeks, even though the New York participant scheduled it at the same local time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              How calendar software handles this
            </h2>
            <p>
              Most calendar applications handle this correctly if the meeting was created with a specific timezone. The meeting stays at "9:00 AM New York time" and the London participant sees the correct local time for each occurrence.
            </p>
            <p className="mt-3">
              Problems arise when:
            </p>
            <ul className="mt-4 space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Meeting times are communicated in plain text rather than calendar invites</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Calendar events are created without timezone information</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Participants manually adjust for timezone differences without accounting for DST</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>External systems send notifications with incorrect or missing timezone data</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              The gap weeks
            </h2>
            <p>
              The most problematic periods are the "gap weeks" when one region has changed clocks but another has not:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm space-y-2">
              <p><strong>March gap (typically 2-3 weeks)</strong></p>
              <p className="text-muted-foreground">US changes mid-March, EU changes late March</p>
              <p className="mt-3"><strong>October/November gap (typically 1 week)</strong></p>
              <p className="text-muted-foreground">EU changes late October, US changes early November</p>
            </div>
            <p className="mt-4">
              During these periods, the time difference between regions is temporarily different from the rest of the year. Meetings scheduled by habit or memory, rather than by calendar invite, are especially likely to go wrong.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              What TimeMeaning shows
            </h2>
            <p>
              When you paste a time reference, TimeMeaning checks whether daylight saving is currently active in the relevant timezone and whether a transition is approaching. If the time falls near a DST boundary, the result will note this and explain which offset applies.
            </p>
          </section>
        </div>

        {/* Related link */}
        <aside className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Related:{" "}
            <Link href="/learn/what-daylight-saving-time-changes" className="text-foreground hover:underline">
              What daylight saving time actually changes
            </Link>
          </p>
        </aside>
      </article>
    </PageLayout>
  );
}
