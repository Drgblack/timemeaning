import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "Working with Stakeholders in Different Zones — TimeMeaning Learning Centre",
  description: "A communication framework for distributed teams. Learn best practices for cross-timezone collaboration.",
};

export default function WorkingWithStakeholdersPage() {
  return (
    <LearnArticle
      title="Working with Stakeholders in Different Zones"
      description="A communication framework for distributed teams."
      section="For Teams & Managers"
      readTime="5 min"
      verifiedDate="January 2026"
      relatedTool={{
        slug: "overlap",
        name: "Global Overlap Burnout Meter",
        description: "Calculate shared working hours and identify who's sacrificing the most.",
      }}
      relatedArticles={[
        { slug: "managers-guide-async", title: "The Manager's Guide to Async Coordination", readTime: "7 min", type: "learn" },
        { slug: "quarterly-calendar-trap", title: "The Quarterly Calendar Trap", readTime: "4 min", type: "learn" },
      ]}
    >
      <p>
        When your team spans multiple timezones, every scheduled interaction becomes a negotiation. Someone is always outside their normal working hours. The question is whether that burden is distributed fairly and communicated clearly.
      </p>
      
      <h2>The Three Rules</h2>
      
      <h3>1. Always Include the Timezone</h3>
      
      <p>
        Never send a meeting invite or deadline that says &ldquo;3pm&rdquo; without specifying <em>whose</em> 3pm. The sender&apos;s timezone is not implied — it must be explicit.
      </p>
      
      <p>
        Better: &ldquo;3pm London time (GMT)&rdquo; or &ldquo;3pm ET (UTC-5).&rdquo;
      </p>
      
      <TryItChip query="3pm London time" label="Try &quot;3pm London time&quot;" />
      
      <h3>2. Rotate the Sacrifice</h3>
      
      <p>
        If a recurring meeting is scheduled at a time convenient for one timezone, rotate it periodically so that no single region is permanently disadvantaged.
      </p>
      
      <p>
        A weekly standup at 9am New York is 2pm London, 11pm Sydney. Over time, this creates resentment and burnout for the Sydney team. Rotate the slot quarterly.
      </p>
      
      <h3>3. Default to Async</h3>
      
      <p>
        Many meetings can be replaced with asynchronous communication. A recorded video update, a shared document, or a threaded discussion often achieves the same outcome without requiring simultaneous attendance.
      </p>
      
      <p>
        Reserve synchronous meetings for decisions that genuinely require real-time dialogue.
      </p>
      
      <h2>Communication Templates</h2>
      
      <p>
        When scheduling across zones, use this format:
      </p>
      
      <blockquote>
        &ldquo;Let&apos;s meet on Tuesday 11 February at 15:00 UTC (10am New York / 3pm London / midnight Sydney). If this doesn&apos;t work for your timezone, please suggest an alternative.&rdquo;
      </blockquote>
      
      <p>
        This template:
      </p>
      
      <ul>
        <li>Uses an unambiguous reference time (UTC)</li>
        <li>Shows the conversion for key locations</li>
        <li>Invites feedback from those who may be disadvantaged</li>
      </ul>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        The goal is not to find a time that works for everyone — that often does not exist. The goal is to make the trade-offs visible and rotate the burden fairly.
      </blockquote>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
