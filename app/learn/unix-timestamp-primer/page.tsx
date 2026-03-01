import { Metadata } from "next";
import { LearnArticle, TryItChip, CodeBlock, DirectAnswer } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "A Primer on Unix Timestamps — TimeMeaning Learning Centre",
  description: "The number that runs the internet. Learn how Unix timestamps work and why they're so reliable.",
  alternates: {
    canonical: "https://timemeaning.com/learn/unix-timestamp-primer",
  },
};

export default function UnixTimestampPrimerPage() {
  return (
    <LearnArticle
      title="A Primer on Unix Timestamps"
      description="The number that runs the internet."
      section="Foundations"
      readTime="6 min"
      verifiedDate="January 2026"
      keyFacts={[
        "Unix epoch: 1 January 1970 00:00:00 UTC",
        "Current timestamp: ~1,770,000,000 (increases by 1 per second)",
        "No timezone ambiguity — always UTC",
        "32-bit systems overflow in 2038 (Y2K38 problem)",
      ]}
      relatedTool={{
        slug: "unix-birthday",
        name: "Unix Birthday Calculator",
        description: "Find the Unix timestamp of any moment — including the second you were born.",
      }}
      relatedArticles={[
        { slug: "developer-log-timestamps", title: "The Developer's Handbook to Log Timestamps", readTime: "6 min", type: "learn" },
        { slug: "iso-8601-for-humans", title: "Decoding ISO 8601 for Humans", readTime: "4 min", type: "learn" },
      ]}
    >
      <DirectAnswer>
        A Unix timestamp is the number of seconds elapsed since 1 January 1970 at 00:00:00 UTC. It is always expressed in UTC — Unix timestamps do not observe timezones or daylight saving time. The current Unix timestamp can be obtained in most programming languages: Date.now() in JavaScript returns milliseconds; time.time() in Python returns seconds.
      </DirectAnswer>

      <p>
        A Unix timestamp is the number of seconds that have elapsed since 1 January 1970 00:00:00 UTC. This moment is known as the Unix epoch, and it forms the foundation of timekeeping in computing.
      </p>
      
      <TryItChip query="1735689600" label="Try a Unix timestamp" />
      
      <h2>Why Unix Time Matters</h2>
      
      <p>
        Unix time has one massive advantage over human-readable dates: <strong>it carries no timezone ambiguity</strong>. A Unix timestamp is always UTC. There is no DST shift, no regional interpretation, no AM/PM confusion.
      </p>
      
      <p>
        When you see <code>1735689600</code>, it means exactly one thing: 1 January 2025 00:00:00 UTC. Every system in the world will interpret this identically.
      </p>
      
      <h2>Reading Unix Timestamps</h2>
      
      <p>
        Unix timestamps come in two common formats:
      </p>
      
      <ul>
        <li><strong>Seconds</strong> — A 10-digit number like <code>1735689600</code></li>
        <li><strong>Milliseconds</strong> — A 13-digit number like <code>1735689600000</code></li>
      </ul>
      
      <p>
        To convert mentally, note that:
      </p>
      
      <CodeBlock>
{`1,700,000,000 ≈ November 2023
1,750,000,000 ≈ June 2025
1,800,000,000 ≈ January 2027
1,900,000,000 ≈ June 2030`}
      </CodeBlock>
      
      <h2>The Y2K38 Problem</h2>
      
      <p>
        On 19 January 2038, at 03:14:07 UTC, 32-bit Unix timestamps will overflow. The maximum value a signed 32-bit integer can hold is 2,147,483,647 seconds past the epoch — and that moment occurs in 2038.
      </p>
      
      <p>
        Systems still using 32-bit timestamps will experience dates wrapping around to 1901 or behaving unpredictably. Most modern systems use 64-bit timestamps, which extend the usable range by billions of years.
      </p>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        When storing or transmitting times between systems, Unix timestamps eliminate timezone ambiguity entirely. Convert to local time only at the display layer.
      </blockquote>
      
      <p>
        For APIs and databases, Unix time (in seconds or milliseconds) is often the safest choice. It requires no timezone context to interpret and compares trivially with arithmetic operators.
      </p>
    </LearnArticle>
  );
}
