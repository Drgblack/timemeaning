import { Metadata } from "next";
import { LearnArticle, CodeBlock } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "Leap Seconds Explained — TimeMeaning Learning Centre",
  description: "The extra second that breaks systems. Learn why leap seconds exist and how they cause chaos.",
};

export default function LeapSecondExplainedPage() {
  return (
    <LearnArticle
      title="Leap Seconds Explained"
      description="The extra second that breaks systems."
      section="For Specialists"
      readTime="6 min"
      verifiedDate="January 2026"
      keyFacts={[
        "27 leap seconds added since 1972",
        "Last leap second: 31 December 2016",
        "UTC will stop using leap seconds by 2035",
        "A minute can have 61 seconds (or theoretically 59)",
      ]}
      relatedArticles={[
        { slug: "unix-timestamp-primer", title: "A Primer on Unix Timestamps", readTime: "6 min", type: "learn" },
        { slug: "developer-log-timestamps", title: "The Developer's Handbook to Log Timestamps", readTime: "6 min", type: "learn" },
      ]}
    >
      <p>
        The Earth&apos;s rotation is slowing. Tidal friction, glacial melting, and other factors cause our planet to take slightly longer to complete each rotation. This creates a problem: atomic clocks keep perfect time, but the Earth does not.
      </p>
      
      <p>
        The solution? Add (or theoretically remove) a second occasionally to keep UTC aligned with astronomical time. These are leap seconds.
      </p>
      
      <h2>How Leap Seconds Work</h2>
      
      <p>
        When the International Earth Rotation and Reference Systems Service (IERS) determines that UTC has drifted too far from astronomical time, they announce a leap second. This typically occurs on 30 June or 31 December at 23:59:59 UTC.
      </p>
      
      <p>
        Instead of the clock going from 23:59:59 to 00:00:00, it goes:
      </p>
      
      <CodeBlock>
{`23:59:59
23:59:60  ← leap second
00:00:00`}
      </CodeBlock>
      
      <p>
        Yes, the minute has 61 seconds. This is valid according to ISO 8601, but many systems do not handle it correctly.
      </p>
      
      <h2>Why Leap Seconds Break Things</h2>
      
      <p>
        Leap seconds have caused notable outages:
      </p>
      
      <ul>
        <li><strong>2012</strong> — Reddit, Gawker, and LinkedIn experienced outages due to a Linux kernel bug triggered by the leap second.</li>
        <li><strong>2015</strong> — Twitter and Instagram had issues when the leap second caused system clocks to report impossible times.</li>
        <li><strong>2017</strong> — Cloudflare reported that some DNS servers briefly returned dates in 1970 due to leap second handling.</li>
      </ul>
      
      <h2>Leap Second Smearing</h2>
      
      <p>
        Google and other major cloud providers use &ldquo;leap second smearing&rdquo; — instead of adding a full second, they slow their clocks very slightly over a 24-hour period. The leap second is &ldquo;smeared&rdquo; across the day.
      </p>
      
      <p>
        This avoids the 23:59:60 problem but means that during smearing, Google&apos;s clocks are technically wrong by tiny amounts. For most applications, this is acceptable.
      </p>
      
      <h2>The End of Leap Seconds</h2>
      
      <p>
        In 2022, the General Conference on Weights and Measures voted to abandon leap seconds by 2035. After that date, UTC will be allowed to drift from astronomical time by up to one minute before any correction is made (likely over decades rather than with discrete seconds).
      </p>
      
      <blockquote>
        Leap seconds were a elegant solution to a coordination problem. But in a world of distributed systems, adding a second to every clock on Earth at the same instant creates more problems than it solves.
      </blockquote>
      
      <p>
        For now, if you maintain systems that care about subsecond precision, be aware that 30 June and 31 December may contain surprise seconds.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
