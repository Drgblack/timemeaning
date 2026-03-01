import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "How to Write a Bulletproof Time: Best Practices for Unambiguous Time References — TimeMeaning",
  description: "The three components of a time reference that cannot be misinterpreted, and how to write one.",
};

export default function BulletproofTimePage() {
  return (
    <LearnArticle
      title="How to Write a Bulletproof Time: Best Practices for Unambiguous Time References"
      date="February 2026"
    >
      <p>
        A bulletproof time reference is one that cannot be misinterpreted regardless of where the reader is located. Writing one requires including three pieces of information: the time, the UTC offset, and a geographic anchor. Each element serves a different purpose.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">The three components</h2>
      
      <p>
        <strong>The time itself:</strong> use 24-hour format where possible to eliminate AM/PM ambiguity. <span className="font-mono text-sm">"14:00"</span> is unambiguous. <span className="font-mono text-sm">"2pm"</span> requires the reader to know whether you are using a 12-hour clock, which is not universal.
      </p>
      
      <p>
        <strong>The UTC offset:</strong> write the offset explicitly as <span className="font-mono text-sm">UTC+X</span> or <span className="font-mono text-sm">UTC−X</span>. Do not use an abbreviation. <span className="font-mono text-sm">"UTC+5:30"</span> is unambiguous. <span className="font-mono text-sm">"IST"</span> is not. Include the sign explicitly — <span className="font-mono text-sm">"UTC+0"</span> rather than <span className="font-mono text-sm">"UTC"</span>.
      </p>
      
      <p>
        <strong>The geographic anchor:</strong> include a city name as a human-readable cross-reference. City names are more stable than timezone names (which change with DST) and more recognisable to non-technical readers than UTC offsets alone. <span className="font-mono text-sm">"14:00 UTC+5:30 (Mumbai)"</span> gives the reader three independent ways to verify the time.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">The full format</h2>
      
      <p>
        The recommended format for a bulletproof time reference in written communication is:
      </p>
      
      <div className="bg-muted p-4 rounded-md my-6">
        <p className="font-mono text-sm mb-0">
          [Day, Date] at [HH:MM] [UTC±offset] ([City])
        </p>
      </div>
      
      <p>
        Example: <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">Tuesday 10 March at 14:00 UTC+5:30 (Mumbai)</span>
      </p>
      
      <p>
        For audiences in multiple timezones, include each relevant local equivalent in parentheses:
      </p>
      
      <div className="bg-muted p-4 rounded-md my-6">
        <p className="font-mono text-sm mb-0">
          Tuesday 10 March at 14:00 UTC+5:30 (Mumbai) — 09:30 UTC+1 (London) — 04:30 UTC−4 (New York)
        </p>
      </div>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">What to avoid</h2>
      
      <p>
        <strong>Abbreviations alone:</strong> <span className="font-mono text-sm">"3pm CST"</span> is ambiguous. <span className="font-mono text-sm">"3pm CST (Chicago)"</span> is better. <span className="font-mono text-sm">"15:00 UTC−6 (Chicago)"</span> is bulletproof.
      </p>
      
      <p>
        <strong>"Local time" without a reference:</strong> <span className="font-mono text-sm">"the call is at 10am local time"</span> tells a distributed audience nothing.
      </p>
      
      <p>
        <strong>Relative phrases without anchors:</strong> <span className="font-mono text-sm">"Tuesday morning"</span> means different things to people in different timezones and becomes incorrect once the message crosses a date boundary.
      </p>
      
      <p>
        <strong>Relying on calendar software to handle the conversion:</strong> calendar invites store times correctly when created carefully, but forwarded invites, copy-pasted times, and times mentioned in message bodies are not processed by calendar software and carry no timezone metadata.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">The shareable link as an alternative</h2>
      
      <p>
        When writing a bulletproof time is not practical — in a casual Slack message, for example — a shareable link from a time interpretation tool is an equivalent alternative. Paste the time into TimeMeaning, resolve it, and share the canonical link. The recipient sees the full interpretation with all assumptions stated, regardless of their location.
      </p>
    </LearnArticle>
  );
}
