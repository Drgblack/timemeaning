import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Midnight Is a Trap — TimeMeaning Learning Centre",
  description: "The 00:00 vs 24:00 conflict. Learn why midnight is the most confusing minute of the day.",
};

export default function MidnightTrapPage() {
  return (
    <LearnArticle
      title="Midnight Is a Trap"
      description="The 00:00 vs 24:00 conflict."
      section="Foundations"
      readTime="4 min"
      verifiedDate="January 2026"
      keyFacts={[
        "12:00 AM = 00:00 = start of the day",
        "12:00 PM = 12:00 = noon",
        "24:00 is rarely used but equals 00:00 of the next day",
        "\"Friday at midnight\" is ambiguous without clarification",
      ]}
      relatedArticles={[
        { slug: "next-friday-paradox", title: "The \"Next Friday\" Paradox", readTime: "5 min", type: "learn" },
        { slug: "bulletproof-time", title: "How to Write a Bulletproof Time", readTime: "5 min", type: "learn" },
      ]}
    >
      <p>
        Midnight is the most confusing minute of the day. Technically, 12:00 AM is the start of the day, not the end.
      </p>
      
      <p>
        If a deadline is &ldquo;Friday at Midnight,&rdquo; does that mean the night between Thursday and Friday, or Friday and Saturday?
      </p>
      
      <p>
        Most digital systems use the 24-hour clock where 00:00 marks the start of a new date.
      </p>
      
      <TryItChip query="Friday at midnight" label="Try &quot;Friday at midnight&quot;" />
      
      <h2>The Two Midnights</h2>
      
      <p>
        Consider Friday, 7 February:
      </p>
      
      <ul>
        <li><strong>Friday 00:00</strong> — The very first moment of Friday, immediately after Thursday 23:59:59.</li>
        <li><strong>Friday 24:00</strong> — Technically the same instant as Saturday 00:00. Rarely used, but valid in ISO 8601.</li>
      </ul>
      
      <p>
        When someone says &ldquo;Friday at midnight,&rdquo; they usually mean one of these two instants. The problem is that both are defensible interpretations.
      </p>
      
      <h2>The 12-Hour Clock Compounds the Problem</h2>
      
      <p>
        The 12-hour clock adds another layer of confusion:
      </p>
      
      <ul>
        <li><strong>12:00 AM</strong> — Midnight. The start of the day.</li>
        <li><strong>12:00 PM</strong> — Noon. The middle of the day.</li>
      </ul>
      
      <p>
        This is counterintuitive. The &ldquo;AM&rdquo; in 12:00 AM suggests morning, but midnight is not morning in any meaningful sense. Many people reverse these, leading to missed deadlines and incorrect scheduling.
      </p>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        For total clarity, use &ldquo;11:59 PM&rdquo; or &ldquo;23:59&rdquo; to ensure there is no ambiguity. If you mean the start of the day, say &ldquo;00:01&rdquo; or &ldquo;12:01 AM.&rdquo;
      </blockquote>
      
      <p>
        Better yet, avoid midnight entirely. &ldquo;End of day Friday&rdquo; can be expressed as &ldquo;Friday 23:59&rdquo; or &ldquo;before Saturday.&rdquo; &ldquo;Start of day Saturday&rdquo; can be expressed as &ldquo;Saturday 00:01.&rdquo;
      </p>
      
      <p>
        The one-minute adjustment eliminates the midnight trap entirely.
      </p>
    </LearnArticle>
  );
}
