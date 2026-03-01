import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "Why international teams miss meetings — TimeMeaning",
  description: "Timezone offsets change throughout the year due to daylight saving. A meeting that works in January may not work in July, even if nothing appears to have changed.",
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
            Why international teams miss meetings
          </h1>
        </header>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              The assumption that breaks
            </h2>
            <p>
              Teams working across timezones often establish a meeting time that works for everyone. "Let's meet at 9am New York / 2pm London / 10pm Tokyo." The times are calculated once, shared, and remembered.
            </p>
            <p className="mt-3">
              The problem is that this calculation is only valid for part of the year. When daylight saving transitions occur — and they occur at different times in different places — the offsets between timezones change.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              A three-timezone example
            </h2>
            <p>
              Consider a team with members in New York, London, and Tokyo:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm space-y-4">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Winter (January)</p>
                <p>New York: 9:00 AM EST (UTC-5)</p>
                <p>London: 2:00 PM GMT (UTC+0)</p>
                <p>Tokyo: 11:00 PM JST (UTC+9)</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Summer (July)</p>
                <p>New York: 9:00 AM EDT (UTC-4)</p>
                <p>London: 2:00 PM BST (UTC+1)</p>
                <p>Tokyo: 10:00 PM JST (UTC+9)</p>
              </div>
            </div>
            <p className="mt-4">
              Japan does not observe daylight saving time. When New York and London both shift their clocks forward in spring, the Tokyo participant's local time for the meeting changes by one hour — from 11pm to 10pm — even though "nothing changed" from the perspective of the Western participants.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              The gap week problem
            </h2>
            <p>
              The situation is more complex during the weeks when some regions have changed clocks but others have not. For approximately two weeks in March and one week in October/November, the offsets between US and European timezones are one hour different than usual.
            </p>
            <p className="mt-3">
              Teams that have memorised their meeting times, rather than relying on calendar invites, often discover this the hard way.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Why calendar invites don't always help
            </h2>
            <p>
              Calendar software generally handles timezone conversions correctly. If a meeting is created as "9:00 AM America/New_York," the calendar will show the correct local time for each participant throughout the year.
            </p>
            <p className="mt-3">
              However, meetings are often communicated outside of calendars:
            </p>
            <ul className="mt-4 space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Slack messages saying "let's meet at 9am ET"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Email threads with times mentioned in the body</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Wiki pages or documentation with standing meeting times</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Verbal agreements or team habits</span>
              </li>
            </ul>
            <p className="mt-4">
              In these cases, the timezone conversion is done manually, often once, and then remembered incorrectly when DST changes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Regions without daylight saving
            </h2>
            <p>
              Many regions do not observe daylight saving time, including:
            </p>
            <ul className="mt-4 space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Most of Asia (Japan, China, India, Singapore, etc.)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Most of Africa</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Most of South America</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Parts of Australia</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Arizona and Hawaii in the United States</span>
              </li>
            </ul>
            <p className="mt-4">
              Teams with members in these regions often bear the burden of adapting to DST changes elsewhere, even though their own clocks never change.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              What TimeMeaning shows
            </h2>
            <p>
              When you paste a time reference, TimeMeaning interprets it in the context of current DST status for the relevant timezone. If you're checking a time that was communicated weeks ago, you can see whether the DST situation has changed and how that affects the interpretation.
            </p>
          </section>
        </div>

        {/* Related link */}
        <aside className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Related:{" "}
            <Link href="/insights/the-week-daylight-saving-breaks-your-calendar" className="text-foreground hover:underline">
              The week daylight saving breaks your calendar
            </Link>
          </p>
        </aside>
      </article>
    </PageLayout>
  );
}
