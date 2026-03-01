import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "What Is a UTC Offset and Why Is It More Reliable Than a Timezone Name? — TimeMeaning",
  description: "UTC offsets are fixed values. Timezone names shift with DST. This distinction matters.",
};

export default function UnderstandingUtcOffsetsPage() {
  return (
    <LearnArticle
      title="What Is a UTC Offset and Why Is It More Reliable Than a Timezone Name?"
      date="February 2026"
    >
      <p>
        A UTC offset is a signed number that expresses how far ahead of or behind Coordinated Universal Time (UTC) a given location is at a given moment. <span className="font-mono text-sm">UTC+5:30</span> means five hours and thirty minutes ahead of UTC. <span className="font-mono text-sm">UTC−8</span> means eight hours behind.
      </p>
      
      <p>
        Offsets are more reliable than timezone names for one specific reason: they are fixed values. <span className="font-mono text-sm">UTC+5:30</span> always means <span className="font-mono text-sm">UTC+5:30</span>. "India Standard Time" also always means <span className="font-mono text-sm">UTC+5:30</span> — but "Eastern Time" means <span className="font-mono text-sm">UTC−5</span> in winter and <span className="font-mono text-sm">UTC−4</span> in summer, because Eastern Time observes DST. The name is stable. The offset it refers to is not.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">The problem with named timezones</h2>
      
      <p>
        "Eastern Time" is a label that maps to two different offsets depending on the date: EST (<span className="font-mono text-sm">UTC−5</span>) in winter and EDT (<span className="font-mono text-sm">UTC−4</span>) in summer. "Central European Time" maps to <span className="font-mono text-sm">UTC+1</span> in winter and <span className="font-mono text-sm">UTC+2</span> in summer. Any system or communication that stores a time as "Eastern Time" without recording whether DST is active has recorded ambiguous information.
      </p>
      
      <p>
        This is why software engineers use IANA timezone identifiers (like <span className="font-mono text-sm">America/New_York</span>) rather than names like "Eastern Time." The IANA identifier is associated with a full set of historical and future DST rules, so the software can determine the correct offset for any specific date. The name alone cannot.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Reading an offset</h2>
      
      <div className="space-y-3">
        <p>
          <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">UTC+5:30</span> — add 5 hours 30 minutes to UTC to get local time. If it is 09:00 UTC, it is 14:30 <span className="font-mono text-sm">UTC+5:30</span>.
        </p>
        <p>
          <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">UTC−5</span> — subtract 5 hours from UTC. If it is 14:00 UTC, it is 09:00 <span className="font-mono text-sm">UTC−5</span>.
        </p>
        <p>
          <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">UTC+0</span> — same as UTC. Used in the UK in winter (GMT) and Iceland year-round.
        </p>
      </div>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">When to use an offset instead of a name</h2>
      
      <p>
        Use an explicit UTC offset any time you are communicating a time to someone in a different timezone and precision matters. Include the offset alongside the timezone name or city for maximum clarity: <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">"09:00 EST (UTC−5, New York)"</span>. In API design, log files, and database records, store times in UTC and convert to local time at display only.
      </p>
    </LearnArticle>
  );
}
