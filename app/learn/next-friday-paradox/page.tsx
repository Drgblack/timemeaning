import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";
import { NextParadoxVisualiser } from "@/components/next-paradox-visualiser";

export const metadata: Metadata = {
  title: "The \"Next Friday\" Paradox — TimeMeaning Learning Centre",
  description: "Why relative dates are a scheduling trap. Learn how TimeMeaning handles the ambiguity of \"next\" in time references.",
};

export default function NextFridayParadoxPage() {
  return (
    <LearnArticle
      title={'The "Next Friday" Paradox'}
      description="Why relative dates are a scheduling trap."
      section="Foundations"
      readTime="5 min"
      verifiedDate="January 2026"
      relatedArticles={[
        { slug: "bulletproof-time", title: "How to Write a Bulletproof Time", readTime: "5 min", type: "learn" },
        { slug: "midnight-trap", title: "Midnight Is a Trap", readTime: "4 min", type: "learn" },
      ]}
    >
      <p>
        It is Monday. You receive an email: &ldquo;Let&apos;s catch up next Friday.&rdquo;
      </p>
      
      <p>
        To some, this means the Friday of the current week. To others, &ldquo;next&rdquo; implies the Friday of the following week. This linguistic rift accounts for a staggering percentage of missed appointments.
      </p>
      
      <p>
        TimeMeaning handles this by identifying these as &ldquo;Relative References&rdquo; and requiring a &ldquo;Reference Anchor&rdquo; to resolve the ambiguity.
      </p>
      
      <TryItChip query="next Friday" label="Try &quot;next Friday&quot;" />
      
      <NextParadoxVisualiser />
      
      <h2>The Interpretation Split</h2>
      
      <p>
        The word &ldquo;next&rdquo; is deceptively simple. In everyday speech, it can mean:
      </p>
      
      <ul>
        <li><strong>The immediately upcoming instance</strong> — If it is Monday and you say &ldquo;next Friday,&rdquo; you mean this Friday (four days away).</li>
        <li><strong>The instance after the current one</strong> — If it is Monday and you say &ldquo;next Friday,&rdquo; you mean the Friday of next week (eleven days away).</li>
      </ul>
      
      <p>
        There is no universally correct interpretation. Regional conventions vary. Personal habits vary. Context sometimes clarifies, but often does not.
      </p>
      
      <h2>How TimeMeaning Resolves This</h2>
      
      <p>
        When TimeMeaning encounters a relative date reference like &ldquo;next Friday,&rdquo; it:
      </p>
      
      <ol>
        <li>Identifies the reference as relative (not absolute)</li>
        <li>Requires an anchor date to resolve (typically &ldquo;today&rdquo;)</li>
        <li>Shows both possible interpretations when ambiguity exists</li>
        <li>Flags the result as ambiguous with an explanation</li>
      </ol>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        Use the &ldquo;This [Date]&rdquo; format or explicitly state &ldquo;Friday of next week&rdquo; to remove doubt.
      </blockquote>
      
      <p>
        Instead of &ldquo;next Friday,&rdquo; write &ldquo;this Friday, 7 February&rdquo; or &ldquo;Friday 14 February.&rdquo; The inclusion of a specific date eliminates the ambiguity entirely.
      </p>
      
      <p>
        For recurring meetings, consider using ISO week notation: &ldquo;Friday of week 6&rdquo; is unambiguous if both parties understand ISO weeks.
      </p>
    </LearnArticle>
  );
}
