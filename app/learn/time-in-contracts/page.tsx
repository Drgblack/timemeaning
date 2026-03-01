import { Metadata } from "next";
import { LearnArticle, TryItChip, CodeBlock } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "How to Specify Time in Legal Contracts — TimeMeaning Learning Centre",
  description: "Avoiding costly ambiguity. Learn best practices for specifying time in legally binding documents.",
};

export default function TimeInContractsPage() {
  return (
    <LearnArticle
      title="How to Specify Time in Legal Contracts"
      description="Avoiding costly ambiguity."
      section="For Specialists"
      readTime="6 min"
      verifiedDate="January 2026"
      relatedArticles={[
        { slug: "bulletproof-time", title: "How to Write a Bulletproof Time", readTime: "5 min", type: "learn" },
        { slug: "midnight-trap", title: "Midnight Is a Trap", readTime: "4 min", type: "learn" },
      ]}
    >
      <p>
        Time specifications in contracts have led to litigation worth millions. The phrase &ldquo;by end of day Friday&rdquo; has been contested in courts across jurisdictions. When money or rights depend on timing, ambiguity is expensive.
      </p>
      
      <h2>The Four Components of an Airtight Time Specification</h2>
      
      <p>
        Every contractual time reference should include:
      </p>
      
      <ol>
        <li><strong>The date</strong> — In unambiguous format (7 February 2026, not 2/7/26)</li>
        <li><strong>The time</strong> — In 24-hour format (17:00, not 5pm)</li>
        <li><strong>The timezone</strong> — As a UTC offset or IANA identifier</li>
        <li><strong>The location reference</strong> — Whose timezone governs</li>
      </ol>
      
      <p>
        Example of a well-specified deadline:
      </p>
      
      <CodeBlock>
{`"The Response Period shall expire at 17:00 UTC-5 
(Eastern Standard Time) on 7 February 2026, 
being the local time at the Company's registered 
office in New York, New York."`}
      </CodeBlock>
      
      <TryItChip query="17:00 UTC-5 on 7 February 2026" label="Try this time specification" />
      
      <h2>Governing Timezone Clauses</h2>
      
      <p>
        Many contracts include a &ldquo;Governing Time&rdquo; clause that establishes which timezone applies to all time references in the document:
      </p>
      
      <CodeBlock>
{`"All times specified in this Agreement shall be 
interpreted as local time in London, United Kingdom 
(GMT/BST as applicable at the relevant date)."`}
      </CodeBlock>
      
      <p>
        This single clause eliminates the need to specify timezones for every deadline. However, it introduces a DST dependency — &ldquo;as applicable at the relevant date&rdquo; accounts for the difference between GMT and BST.
      </p>
      
      <h2>The &ldquo;Close of Business&rdquo; Problem</h2>
      
      <p>
        &ldquo;Close of business&rdquo; (COB) is commonly used but inherently ambiguous:
      </p>
      
      <ul>
        <li>What time is &ldquo;close of business&rdquo;? 17:00? 18:00? When the last employee leaves?</li>
        <li>Whose business? The sender&apos;s office? The recipient&apos;s? The company headquarters?</li>
        <li>What if the business is closed that day (weekend, holiday)?</li>
      </ul>
      
      <p>
        Better alternatives:
      </p>
      
      <ul>
        <li>&ldquo;By 17:00 London time on [date]&rdquo;</li>
        <li>&ldquo;Before midnight UTC on [date]&rdquo;</li>
        <li>&ldquo;No later than 23:59 on [date] in the timezone of the receiving party&apos;s principal place of business&rdquo;</li>
      </ul>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        In contracts, there is no such thing as an &ldquo;obvious&rdquo; time interpretation. Every time reference will be interpreted in the way most favourable to the party seeking to enforce or escape it. Remove the ambiguity before signing.
      </blockquote>
      
      <p>
        Have your legal counsel review time specifications specifically. Many contract templates use ambiguous phrasing that has never been tested in court — until it matters.
      </p>
    </LearnArticle>
  );
}
