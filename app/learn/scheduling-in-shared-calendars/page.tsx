import { Metadata } from "next";
import { LearnArticle, TryItChip } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Scheduling in Shared Calendars — TimeMeaning Learning Centre",
  description: "Best practices for cross-timezone calendar events. Avoid the common pitfalls of shared calendars.",
};

export default function SchedulingInSharedCalendarsPage() {
  return (
    <LearnArticle
      title="Scheduling in Shared Calendars"
      description="Best practices for cross-timezone calendar events."
      section="For Teams & Managers"
      readTime="4 min"
      verifiedDate="January 2026"
      relatedTool={{
        slug: "overlap",
        name: "Global Overlap Burnout Meter",
        description: "Calculate shared working hours across multiple timezones.",
      }}
      relatedArticles={[
        { slug: "working-with-stakeholders-in-different-zones", title: "Working with Stakeholders in Different Zones", readTime: "5 min", type: "learn" },
        { slug: "managers-guide-async", title: "The Manager's Guide to Async Coordination", readTime: "7 min", type: "learn" },
      ]}
    >
      <p>
        Calendar applications handle timezones automatically. This is both a blessing and a curse. When it works, events appear at the correct local time for each attendee. When it fails, meetings are missed and confusion follows.
      </p>
      
      <h2>How Calendar Timezone Conversion Works</h2>
      
      <p>
        When you create an event:
      </p>
      
      <ol>
        <li>The calendar app stores the event in your current timezone (or a timezone you specify)</li>
        <li>When another user views the event, it converts to their timezone</li>
        <li>DST changes are handled based on the timezone rules at the event&apos;s date</li>
      </ol>
      
      <p>
        This usually works. But problems arise in several scenarios.
      </p>
      
      <h2>The Travelling Organiser Problem</h2>
      
      <p>
        You create a recurring weekly meeting while in London. You then travel to New York. The meeting was created in London time, so it stays at that time — which may now be inconvenient for you.
      </p>
      
      <p>
        Worse, if you edit the meeting while in New York, some calendar applications will reinterpret the time in your new timezone, shifting all future occurrences.
      </p>
      
      <h2>The DST Shift Problem</h2>
      
      <p>
        You schedule a meeting for &ldquo;9am London time&rdquo; with a colleague in New York. In winter, London is GMT (UTC+0) and New York is EST (UTC-5), so the meeting is at 4am New York time — probably not what you intended, but at least consistent.
      </p>
      
      <p>
        In March, the US shifts to daylight saving before the UK does. For three weeks, the offset between London and New York changes from 5 hours to 4 hours. The meeting time shifts for the New York attendee.
      </p>
      
      <TryItChip query="9am London time" label="Try &quot;9am London time&quot;" />
      
      <h2>Best Practices</h2>
      
      <h3>1. Use UTC for Internal Anchoring</h3>
      
      <p>
        For recurring meetings that span multiple timezones, consider anchoring to UTC. &ldquo;This meeting occurs at 14:00 UTC every Tuesday&rdquo; is unambiguous and will not shift with DST.
      </p>
      
      <h3>2. Include Multiple Timezones in the Description</h3>
      
      <p>
        In the event description, list the local time for each major attendee group:
      </p>
      
      <blockquote>
        Weekly Sync — 14:00 UTC / 9am New York / 2pm London / 10pm Singapore
      </blockquote>
      
      <h3>3. Review Recurring Events Quarterly</h3>
      
      <p>
        DST transitions happen in March/April and October/November. Review your recurring meetings after each transition to ensure they still occur at sensible times for all attendees.
      </p>
      
      <h2>Key Advice</h2>
      
      <blockquote>
        Calendar apps hide complexity. This is usually good, but it means you cannot see when something will go wrong until it does. Be proactive about DST transitions and timezone changes.
      </blockquote>
    </LearnArticle>
  );
}
