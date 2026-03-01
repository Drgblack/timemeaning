import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import AdSlot from "@/components/AdSlot";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "What 'Next Friday' Means in Different Contexts — TimeMeaning",
  description:
    "Relative time expressions like 'next Friday' are interpreted differently depending on when and where they are spoken.",
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
          What 'next Friday' means in different contexts
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Relative time expressions like 'next Friday' are interpreted
          differently depending on when and where they are spoken.
        </p>

        <AdSlot slot="learn-top" />

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Definition
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            <strong>Relative time expressions</strong> are time references that
            depend on the current moment. They include phrases like "tomorrow,"
            "next week," "in two days," "this Friday," and "next Friday." Their
            meaning changes based on when they are spoken or written.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            The 'next Friday' problem
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            If someone says "next Friday" on a Monday, they might mean:
          </p>
          <ul className="space-y-3 text-foreground mb-4">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>The coming Friday</strong> (4 days away)
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>The Friday after the coming one</strong> (11 days away)
              </span>
            </li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">
            Some speakers use "this Friday" for the coming Friday and reserve
            "next Friday" for the one after. Others use "next Friday" to mean
            the very next Friday that will occur. There is no universal
            standard.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Factors that affect interpretation
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Day of the week spoken
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            If someone says "next Friday" on Thursday, most people interpret
            this as the Friday of the following week, not the next day. But if
            said on Sunday, it more often means the coming Friday.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Regional conventions
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Interpretation varies by region. In some cultures, "next" always
            means "the one after this," while in others it means "the nearest
            upcoming." There is no consistent rule across English-speaking
            regions.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            Individual habits
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Even within the same office or family, different people may use
            "next Friday" differently. Personal interpretation often depends on
            how the phrase was used in one's upbringing.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Other ambiguous relative expressions
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>"This weekend"</strong> — Does it include Friday
                evening? Does it start Saturday morning?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>"Next month"</strong> — The first of next month, or
                approximately 30 days from now?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>"End of week"</strong> — Friday? Saturday? Sunday?
                Depends on locale and context.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                <strong>"In a few days"</strong> — Two days? Three? Five? No
                standard definition.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            How to reduce confusion
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Include the date: "Friday the 15th" removes all ambiguity
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Use day counts: "in 4 days" is clearer than "this Friday"
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                Ask for clarification when stakes are high
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Limitations
          </h2>
          <p className="text-foreground leading-relaxed">
            Without knowing when a relative expression was written, it cannot be
            resolved to an absolute date. Even with the send date known, the
            intended meaning may still be ambiguous due to varying conventions.
            When a relative expression appears in undated text, the best
            approach is to identify possible interpretations and their
            assumptions.
          </p>
        </section>

        <ArticleChatPrompt />

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
              href="/learn/timestamps-precise-but-hard-to-read"
              className="text-primary hover:underline"
            >
              Why timestamps are precise but hard to read
            </Link>
          </p>
        </section>
      </article>
    </PageLayout>
  );
}


