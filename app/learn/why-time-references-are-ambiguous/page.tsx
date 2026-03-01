import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Why Time References Are Often Ambiguous — TimeMeaning",
  description:
    "Time expressions depend on context, location, and shared assumptions. When any of these are missing, confusion follows. Learn what makes time references ambiguous.",
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
          Why time references are often ambiguous
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Time expressions depend on context, location, and shared assumptions.
          When any of these are missing, confusion follows.
        </p>

        <AdSlot slot="learn-top" />

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Definition
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            An <strong>ambiguous time reference</strong> is any expression of
            time that can be interpreted in more than one way. The ambiguity may
            arise from missing timezone information, unclear date formats,
            relative expressions, or unstated assumptions about context.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Sources of ambiguity
          </h2>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            1. Missing timezone
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            "The meeting is at 3pm" does not specify which 3pm. If the sender is
            in London and the receiver is in New York, they may assume different
            times. Without an explicit timezone, the reference is incomplete.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            2. Date format variation
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            "04/05/2025" means April 5 in the United States and May 4 in most of
            Europe. The same string represents different dates depending on the
            reader's locale expectations.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            3. Relative expressions
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            "Next Tuesday" or "in two weeks" depend on when the message was
            sent. If the send date is unknown, the target date cannot be
            calculated. Even when the send date is known, interpretations vary
            by culture and context.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            4. Daylight saving transitions
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            "EST" and "EDT" are different offsets, but many people use "EST"
            year-round. A reference to "3pm EST" in July may actually mean EDT,
            shifting the time by one hour.
          </p>

          <h3 className="font-medium text-foreground mt-6 mb-3">
            5. Implicit context
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            "End of day" assumes a shared understanding of what time that means.
            It could be 5pm, 6pm, midnight, or the close of business in a
            specific timezone. Without explicit definition, it remains
            ambiguous.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Examples
          </h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                "Let's sync at 10am" — Which timezone? Whose 10am?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                "Deadline: 01/02/2025" — January 2 or February 1?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                "Available next week" — Starting when? Ending when?
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-muted-foreground shrink-0">•</span>
              <span>
                "3pm EST" in summer — Does the sender mean EST or EDT?
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-foreground font-medium mb-4">
            Limitations
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Not all ambiguity can be resolved. When critical context is missing,
            the best approach is to request clarification. Automated tools can
            identify likely interpretations and flag assumptions, but cannot
            read the sender's intent.
          </p>
        </section>

        <AdSlot slot="learn-bottom" />

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
              href="/learn/what-next-friday-means"
              className="text-primary hover:underline"
            >
              What 'next Friday' means in different contexts
            </Link>
          </p>
        </section>
      </article>
    </PageLayout>
  );
}

