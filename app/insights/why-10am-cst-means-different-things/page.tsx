import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "Why '10am CST' means different things to different people — TimeMeaning",
  description: "CST can refer to Central Standard Time (UTC-6), China Standard Time (UTC+8), or Cuba Standard Time (UTC-5). Without explicit context, the abbreviation is ambiguous.",
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
            Why '10am CST' means different things to different people
          </h1>
        </header>

        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              The problem with timezone abbreviations
            </h2>
            <p>
              Timezone abbreviations are not unique. CST is one of the most common examples of this ambiguity. When someone writes "10am CST," they could mean:
            </p>
            <ul className="mt-4 space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span><strong>Central Standard Time</strong> (North America) — UTC-6</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span><strong>China Standard Time</strong> — UTC+8</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span><strong>Cuba Standard Time</strong> — UTC-5</span>
              </li>
            </ul>
            <p className="mt-4">
              The difference between Central Standard Time and China Standard Time is 14 hours. A meeting scheduled for "10am CST" could be happening at completely different points in the day depending on which CST the sender meant.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Why context doesn't always help
            </h2>
            <p>
              In theory, context should resolve the ambiguity. If you're emailing a colleague in Chicago, CST probably means Central Standard Time. If you're coordinating with a team in Beijing, it probably means China Standard Time.
            </p>
            <p className="mt-3">
              In practice, context is often unclear:
            </p>
            <ul className="mt-4 space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Group emails with recipients in multiple regions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Calendar invites forwarded without the original context</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Messages in Slack channels with international members</span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Automated notifications from systems configured in different regions</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              Other ambiguous abbreviations
            </h2>
            <p>
              CST is not the only problematic abbreviation. Other common examples include:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm">
              <div className="space-y-2">
                <p><strong>IST</strong> — India Standard Time, Irish Standard Time, or Israel Standard Time</p>
                <p><strong>BST</strong> — British Summer Time or Bangladesh Standard Time</p>
                <p><strong>EST</strong> — Eastern Standard Time (but often used when EDT applies)</p>
                <p><strong>PST</strong> — Pacific Standard Time (but often used year-round)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              How to avoid confusion
            </h2>
            <p>
              The clearest way to specify a time is to include the UTC offset explicitly:
            </p>
            <div className="mt-4 bg-secondary/50 rounded-md p-4 font-mono text-sm">
              <p>10:00 AM UTC-6</p>
              <p>10:00 AM UTC+8</p>
            </div>
            <p className="mt-4">
              Alternatively, use the full timezone name (Central Standard Time, China Standard Time) or include a city reference (10am Chicago time, 10am Beijing time).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground font-medium mb-3">
              What TimeMeaning does
            </h2>
            <p>
              When you paste a time reference containing "CST" or another ambiguous abbreviation, TimeMeaning attempts to interpret it based on any available context in the surrounding text. If the context is insufficient, it will note the ambiguity and explain which interpretation was chosen and why.
            </p>
          </section>
        </div>

        {/* Related link */}
        <aside className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Related:{" "}
            <Link href="/learn/est-vs-edt" className="text-foreground hover:underline">
              EST vs EDT — Why the distinction matters
            </Link>
          </p>
        </aside>
      </article>
    </PageLayout>
  );
}
