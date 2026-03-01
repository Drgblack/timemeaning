import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "The Quarterly Calendar Trap — TimeMeaning Learning Centre",
  description: "Fiscal quarters and reporting lag. Learn why Q1 doesn't mean the same thing everywhere.",
};

export default function QuarterlyCalendarTrapPage() {
  return (
    <LearnArticle
      title="The Quarterly Calendar Trap"
      description="Fiscal quarters and reporting lag."
      section="For Teams & Managers"
      readTime="4 min"
      verifiedDate="January 2026"
      keyFacts={[
        "Calendar Q1 = Jan–Mar, but fiscal Q1 varies by organisation",
        "UK government fiscal year starts 6 April",
        "US federal fiscal year starts 1 October",
        "Many companies use non-standard fiscal calendars",
      ]}
      relatedArticles={[
        { slug: "working-with-stakeholders-in-different-zones", title: "Working with Stakeholders in Different Zones", readTime: "5 min", type: "learn" },
        { slug: "managers-guide-async", title: "The Manager's Guide to Async Coordination", readTime: "7 min", type: "learn" },
      ]}
    >
      <p>
        &ldquo;We&apos;ll finalise the budget in Q1.&rdquo; This statement is meaningless without knowing whose Q1.
      </p>
      
      <p>
        Calendar quarters are straightforward: Q1 is January through March, Q2 is April through June, and so on. But fiscal quarters — the ones that matter for budgets, reports, and deadlines — vary wildly.
      </p>
      
      <TryItChip query="Q1 2026" label="Try &quot;Q1 2026&quot;" />
      
      <h2>Fiscal Year Variations</h2>
      
      <p>
        Consider these common fiscal year start dates:
      </p>
      
      <ul>
        <li><strong>Calendar year</strong> — Q1 starts 1 January</li>
        <li><strong>UK government</strong> — Q1 starts 6 April</li>
        <li><strong>US federal government</strong> — Q1 starts 1 October</li>
        <li><strong>Many retailers</strong> — Q1 starts 1 February (after the holiday season)</li>
        <li><strong>Some tech companies</strong> — Fiscal years aligned to founding dates or IPO dates</li>
      </ul>
      
      <p>
        When Apple announces &ldquo;Q1 results,&rdquo; they mean October through December — what most people would call Q4.
      </p>
      
      <h2>The Reporting Lag Problem</h2>
      
      <p>
        Even when you know which quarter is meant, there is often a lag between the quarter ending and results being available. &ldquo;Q1 numbers&rdquo; might not be finalised until weeks or months into Q2.
      </p>
      
      <p>
        This creates confusion in conversations:
      </p>
      
      <ul>
        <li>&ldquo;Q1 numbers&rdquo; might mean the quarter that just ended</li>
        <li>&ldquo;Q1 targets&rdquo; might mean the quarter we are currently in</li>
        <li>&ldquo;Q1 planning&rdquo; might mean preparing for the next Q1</li>
      </ul>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        Always specify the actual date range when discussing quarters. &ldquo;Q1 FY26 (October–December 2025)&rdquo; is unambiguous. &ldquo;Q1&rdquo; alone is not.
      </blockquote>
      
      <p>
        When working across organisations, ask explicitly: &ldquo;Which months does your Q1 cover?&rdquo; This one question prevents significant confusion.
      </p>
      
      <p>
        For recurring reports, include a legend that maps your organisation&apos;s quarters to calendar months. Make the conversion obvious so readers do not need to guess.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
