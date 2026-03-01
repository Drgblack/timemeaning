import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "CST: A Case Study in Chaos — TimeMeaning Learning Centre",
  description: "The most overloaded abbreviation in time. Learn why CST causes so many scheduling disasters.",
};

export default function CstNightmarePage() {
  return (
    <LearnArticle
      title="CST: A Case Study in Chaos"
      description="The most overloaded abbreviation in time."
      section="For Specialists"
      readTime="5 min"
      verifiedDate="January 2026"
      keyFacts={[
        "CST has at least 5 different meanings",
        "UTC offsets range from -6 to +9.5",
        "Maximum spread: 15.5 hours",
        "Used in North America, China, Cuba, and Australia",
      ]}
      relatedTool={{
        slug: "lookup",
        name: "Abbreviation Lookup",
        description: "Search any timezone abbreviation and see every possible meaning.",
      }}
      relatedArticles={[
        { slug: "ambiguous-timezone-abbreviations", title: "The Glossary of Ambiguity", readTime: "8 min", type: "learn" },
        { slug: "bulletproof-time", title: "How to Write a Bulletproof Time", readTime: "5 min", type: "learn" },
      ]}
    >
      <p>
        &ldquo;The call is at 10am CST.&rdquo; This sentence is meaningless without additional context — because CST does not specify a single timezone.
      </p>
      
      <TryItChip query="10am CST" label="Try &quot;10am CST&quot;" />
      
      <h2>The Five CSTs</h2>
      
      <p>
        CST can refer to:
      </p>
      
      <ul>
        <li><strong>Central Standard Time (North America)</strong> — UTC-6. Used in Chicago, Dallas, Mexico City.</li>
        <li><strong>China Standard Time</strong> — UTC+8. Used throughout mainland China.</li>
        <li><strong>Cuba Standard Time</strong> — UTC-5. Used in Havana.</li>
        <li><strong>Central Standard Time (Australia)</strong> — UTC+9:30. Used in Adelaide, Darwin.</li>
        <li><strong>Central Summer Time (Australia)</strong> — UTC+10:30. Adelaide during DST.</li>
      </ul>
      
      <p>
        When someone writes &ldquo;CST,&rdquo; which do they mean? The answer is usually determined by context — but context is not always available, and assumptions are often wrong.
      </p>
      
      <h2>The 15.5-Hour Spread</h2>
      
      <p>
        The difference between Central Standard Time (North America) at UTC-6 and Central Summer Time (Australia) at UTC+10:30 is 16.5 hours. If you interpret CST as one when the sender meant the other, you will be off by more than half a day.
      </p>
      
      <p>
        This is not a theoretical problem. We have documented cases of:
      </p>
      
      <ul>
        <li>International calls scheduled 16 hours apart</li>
        <li>Flight connections missed due to CST confusion</li>
        <li>Contract deadlines interpreted differently by each party</li>
      </ul>
      
      <h2>How TimeMeaning Handles CST</h2>
      
      <p>
        When TimeMeaning encounters CST without additional context, it:
      </p>
      
      <ol>
        <li>Flags the abbreviation as ambiguous</li>
        <li>Lists all five possible meanings</li>
        <li>Shows the UTC offset and current time for each</li>
        <li>Uses geolocation (if available) to suggest the most likely interpretation</li>
      </ol>
      
      <p>
        The result is never a single answer. Instead, it is a ranked list of possibilities with clear explanations.
      </p>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        Never use CST in international communication. Use the UTC offset (UTC-6, UTC+8) or the full timezone name (America/Chicago, Asia/Shanghai).
      </blockquote>
      
      <p>
        If you must use an abbreviation, at least add the country: &ldquo;CST (US)&rdquo; or &ldquo;CST (China).&rdquo; This narrows the interpretation space significantly.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
