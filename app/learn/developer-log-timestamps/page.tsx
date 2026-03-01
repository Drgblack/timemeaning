import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "The Developer's Handbook to Log Timestamps: Unix, ISO, RFC 3339, and How to Resolve Them — TimeMeaning",
  description: "A practical guide to reading and converting timestamp formats found in log files and API responses.",
};

export default function DeveloperLogTimestampsPage() {
  return (
    <LearnArticle
      title="The Developer's Handbook to Log Timestamps: Unix, ISO, RFC 3339, and How to Resolve Them"
      date="February 2026"
    >
      <p>
        Log files use several different timestamp formats depending on the system, language, and logging framework involved. Understanding each format and how to convert it quickly is a practical skill for anyone who reads logs under pressure.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Unix timestamp (epoch time)</h2>
      
      <p>
        <strong>Format:</strong> a plain integer, e.g. <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">1741600200</span>
      </p>
      
      <p>
        <strong>Meaning:</strong> the number of seconds elapsed since 00:00:00 UTC on 1 January 1970, known as the Unix epoch. Some systems use milliseconds rather than seconds — a 13-digit integer (<span className="font-mono text-sm">1741600200000</span>) is milliseconds.
      </p>
      
      <p>
        <strong>To convert:</strong> divide by 1000 if in milliseconds to get seconds, then use a converter or the command <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">date -d @1741600200</span> on Linux/macOS. The result is <span className="font-mono text-sm">2026-03-10 14:30:00 UTC</span>.
      </p>
      
      <p>
        <strong>Advantages:</strong> compact, sortable, unambiguous, no DST issues. <strong>Disadvantages:</strong> not human-readable without conversion.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">ISO 8601</h2>
      
      <p>
        <strong>Format:</strong> <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">2026-03-10T14:30:00Z</span> or <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">2026-03-10T14:30:00+05:30</span>
      </p>
      
      <p>
        <strong>Meaning:</strong> covered in detail in the <a href="/learn/iso-8601-for-humans" className="text-primary hover:underline">ISO 8601 guide</a> in this learning centre. The key point for log parsing: always check the trailing character. <span className="font-mono text-sm">Z</span> means UTC. A numeric offset means local time with that offset. No trailing character is an ambiguous local time and should be treated with suspicion.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">RFC 3339</h2>
      
      <p>
        <strong>Format:</strong> <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">2026-03-10T14:30:00+00:00</span>
      </p>
      
      <p>
        RFC 3339 is a profile of ISO 8601 used in internet protocols (HTTP, email, Atom feeds). It is nearly identical to ISO 8601 but requires an explicit timezone offset — no naked local times. The offset <span className="font-mono text-sm">+00:00</span> is equivalent to <span className="font-mono text-sm">Z</span>. RFC 3339 timestamps are always unambiguous.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Syslog format</h2>
      
      <p>
        <strong>Format:</strong> <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">Mar 10 14:30:00</span>
      </p>
      
      <p>
        This is the traditional syslog format defined in RFC 3164. It contains no year and no timezone information. The timezone is assumed to be the local timezone of the system that generated the log. When aggregating logs from systems in different timezones, syslog timestamps are unreliable without additional context. Prefer RFC 5424 syslog format which includes a full ISO 8601 timestamp with timezone.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Quick reference</h2>
      
      <div className="bg-muted p-4 rounded-md space-y-2">
        <p className="font-mono text-sm mb-0">Unix seconds → divide by 1 (already seconds) → date -d @[value]</p>
        <p className="font-mono text-sm mb-0">Unix milliseconds → divide by 1000 → date -d @[value]</p>
        <p className="font-mono text-sm mb-0">ISO 8601 with Z → UTC directly</p>
        <p className="font-mono text-sm mb-0">ISO 8601 with offset → subtract offset to get UTC</p>
        <p className="font-mono text-sm mb-0">RFC 3339 → same as ISO 8601 with offset</p>
        <p className="font-mono text-sm mb-0">Syslog (RFC 3164) → local time of originating system, timezone unknown</p>
      </div>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
