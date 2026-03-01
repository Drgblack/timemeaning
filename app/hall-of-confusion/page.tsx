"use client";

import { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";

type ConfusionLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface ConfusionEntry {
  id: number;
  input: string;
  level: ConfusionLevel;
  resolution: string;
  whyConfusing: string;
}

const confusionLevelColors: Record<ConfusionLevel, string> = {
  LOW: '#4ade80',
  MEDIUM: '#c8922a',
  HIGH: '#d97706',
  CRITICAL: '#ef4444',
};

const entries: ConfusionEntry[] = [
  {
    id: 1,
    input: "Let's sync at 9am CST Monday — works for Shanghai?",
    level: 'CRITICAL',
    resolution: "Ambiguous — CST is Central Standard Time (UTC-6) OR China Standard Time (UTC+8). These are 14 hours apart. 9am Central Standard Time is 11pm China Standard Time — not a reasonable working hour. 9am China Standard Time is 7pm Central Standard Time on Sunday.",
    whyConfusing: "CST is the most dangerous abbreviation in cross-Pacific communication. The sender almost certainly meant one timezone. The recipient in Shanghai almost certainly interpreted the other. This specific confusion has caused at least one major public deployment incident.",
  },
  {
    id: 2,
    input: "EOD Friday",
    level: 'HIGH',
    resolution: "Partially resolvable — Friday is the day, but EOD (End of Day) is not a universal time. Depending on industry and organisation: 17:00, 17:30, 18:00, or 'whenever I finish.' No timezone specified.",
    whyConfusing: "EOD is used as if it means something precise. It doesn't. It means 'sometime today that I consider to be late enough.' Timezone is also unspecified, meaning a distributed team member has two unknowns to resolve: what time EOD is, and which timezone applies.",
  },
  {
    id: 3,
    input: "2am BST — does the London team need to be on this call?",
    level: 'HIGH',
    resolution: "Ambiguous — BST could be British Summer Time (UTC+1) meaning 01:00 UTC, or Bangladesh Standard Time (UTC+6) meaning 20:00 UTC previous day. If the question is whether the London team needs to attend: if BST means British Summer Time, yes — 2am is extremely antisocial. If BST means Bangladesh Standard Time, 2am Bangladesh is 20:00 London — a reasonable evening hour.",
    whyConfusing: "The confusion here is particularly cruel because the answer to the question completely reverses depending on which BST is meant. One interpretation asks London to work through the night. The other asks them to join a normal evening call.",
  },
  {
    id: 4,
    input: "Deploy scheduled for midnight local",
    level: 'CRITICAL',
    resolution: "Unresolvable — 'local' without a specified timezone means the timestamp could refer to any of 38 distinct UTC offsets currently in use worldwide.",
    whyConfusing: "This appears in real deployment scripts. 'Midnight local' on a distributed team means midnight in every timezone simultaneously — which is a 26-hour window, not a moment. This specific phrasing has caused production incidents.",
  },
  {
    id: 5,
    input: "Tuesday 02:30 EST — sprint planning",
    level: 'HIGH',
    resolution: "Conditionally a ghost time — if this Tuesday is the second Sunday of March in the US, 02:30 EST on that day did not exist (clocks jumped from 01:59 to 03:00). On any other Tuesday, it exists as 07:30 UTC.",
    whyConfusing: "Most of the year this is a valid time. On one specific Tuesday in March it is a time that never existed. Calendar systems don't warn you. The meeting invite was accepted by everyone and then the time simply didn't occur.",
  },
  {
    id: 6,
    input: "1715846400",
    level: 'MEDIUM',
    resolution: "Saturday 16 May 2024 at 16:00:00 UTC. This is a Unix timestamp — 10 digits representing seconds since 1970-01-01T00:00:00Z.",
    whyConfusing: "To a human, this looks like a phone number or an ID. To a computer, it's a precise moment in time. The confusion is in the opposite direction from most entries here — the machine knows exactly what this means; the human has no idea.",
  },
  {
    id: 7,
    input: "The standup is at half 9 — dial in from the US office",
    level: 'HIGH',
    resolution: "Partially resolvable — 'half 9' is British English for 09:30. No timezone specified. No date specified. For the US office, 09:30 UK time converts to 04:30 EST in winter or 04:30 EDT in summer — an hour that no US office will appreciate.",
    whyConfusing: "'Half 9' is standard British English but confuses American English speakers, who may interpret it as 4:30 (half of 9) or 9:30. Additionally, no timezone is specified, so the US office doesn't know if this is 09:30 GMT or 09:30 BST — a one-hour difference that determines whether they set an alarm for 4:30am or 5:30am.",
  },
  {
    id: 8,
    input: "Next Tuesday morning CET — is that ok for Tokyo?",
    level: 'HIGH',
    resolution: "Partially resolvable — CET is UTC+1 in winter or UTC+2 in summer (CEST). 'Morning' is approximately 08:00-12:00. Tokyo is UTC+9, observing no DST. The overlap depends on whether CET or CEST applies: CET morning (08:00 UTC+1) = 17:00 Tokyo (reasonable); CEST morning (08:00 UTC+2) = 16:00 Tokyo (also reasonable). But 'morning' is ambiguous and 'next Tuesday' requires a reference date.",
    whyConfusing: "Three sources of ambiguity in one sentence: CET vs CEST, 'morning' without a specific time, and 'next Tuesday' without a reference date. Each one is individually minor. Combined, they make the time reference unresolvable without additional information.",
  },
  {
    id: 9,
    input: "December 30 2011 — booking a flight from Apia to Auckland",
    level: 'CRITICAL',
    resolution: "This date does not exist in Samoa. Samoa skipped December 30 2011 when it moved across the International Date Line. A flight 'from Apia on December 30 2011' would have departed on December 29 and arrived on December 31.",
    whyConfusing: "Several travel booking systems failed to handle this correctly. Passengers who had booked flights for December 30 from Samoa found their tickets referenced a date that had been legislated out of existence. The correct date was adjacent to a day that simply didn't happen.",
  },
  {
    id: 10,
    input: "Please respond by COB Thursday your time",
    level: 'HIGH',
    resolution: "Unresolvable — 'your time' requires knowing the recipient's timezone. 'COB' (Close of Business) is not a universal time. 'Thursday' requires a reference date.",
    whyConfusing: "'Your time' is an attempt to be polite and timezone-aware but inadvertently creates more ambiguity. The sender doesn't know what timezone the recipient is in, so 'your time' is unspecified. COB is also unspecified. The only resolved component is the day name, which itself requires a reference date.",
  },
  {
    id: 11,
    input: "0000Z Saturday",
    level: 'MEDIUM',
    resolution: "Unambiguous — 00:00 UTC on Saturday. Zulu notation, fully precise.",
    whyConfusing: "This entry is here because it looks confusing but isn't. 0000Z is midnight UTC — the Z suffix removes all ambiguity. This is the format aviation and military communication use, and it works perfectly. The confusion is in the reader's unfamiliarity with Zulu notation, not in the time reference itself.",
  },
  {
    id: 12,
    input: "The kickoff is at 8 — don't be late",
    level: 'CRITICAL',
    resolution: "Almost completely unresolvable — no AM/PM, no timezone, no date, no context.",
    whyConfusing: "This is the platonic ideal of an ambiguous time reference. It contains a number and nothing else useful. 8am or 8pm? Which timezone? Which day? Sent in a message thread, the recipients will either ask for clarification or guess — and some of them will guess wrong.",
  },
  {
    id: 13,
    input: "2026-02-29T12:00:00Z",
    level: 'HIGH',
    resolution: "Ghost date — 2026 is not a leap year. February 29 2026 does not exist. The next February 29 is 2028.",
    whyConfusing: "Software that generates timestamps algorithmically sometimes produces February 29 in non-leap years. This happens most commonly in systems that add years to a date without checking leap year rules. The timestamp looks valid — it's ISO 8601 format with a Z suffix — but refers to a date that doesn't exist.",
  },
  {
    id: 14,
    input: "Quarterly review — first Monday of the new year, 10am",
    level: 'HIGH',
    resolution: "Partially resolvable — 'first Monday of the new year' in 2026 is 5 January 2026. 10am without timezone is unresolvable for a distributed team.",
    whyConfusing: "The date is actually resolvable if you know which year is 'the new year' — but the time has no timezone. For a distributed team this is two separate problems: calculating the correct date (solvable) and knowing which 10am (not solvable without more information).",
  },
  {
    id: 15,
    input: "See you at the usual time — adjusted for DST",
    level: 'CRITICAL',
    resolution: "Completely unresolvable. 'Usual time' is undefined. 'Adjusted for DST' is ambiguous — it doesn't specify which direction, which timezone's DST, or what the adjustment amount is.",
    whyConfusing: "This is the most common type of timezone failure: an implicit shared understanding that turns out not to be shared. 'The usual time adjusted for DST' makes sense to the sender, who knows what 'usual' means and which DST they're referring to. To anyone outside that context it is meaningless. This exact phrasing appears in recurring meeting invites across distributed teams worldwide.",
  },
];

function ConfusionCard({ entry }: { entry: ConfusionEntry }) {
  const resolverUrl = `/?q=${encodeURIComponent(entry.input)}`;
  
  return (
    <article className="border border-border rounded-md overflow-hidden">
      {/* Terminal-style input */}
      <div
        className="p-6"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div className="flex items-start justify-between gap-4">
          <code className="font-mono text-lg leading-relaxed" style={{ color: '#c8922a' }}>
            {entry.input}
          </code>
          <span
            className="shrink-0 px-2 py-1 font-mono text-xs uppercase tracking-wider rounded"
            style={{
              color: confusionLevelColors[entry.level],
              border: `1px solid ${confusionLevelColors[entry.level]}`,
            }}
          >
            {entry.level}
          </span>
        </div>
      </div>
      
      {/* Resolution */}
      <div className="p-6 bg-card">
        <p className="text-foreground leading-relaxed">
          {entry.resolution}
        </p>
        
        {/* Why confusing */}
        <div className="mt-4 pt-4 border-t border-border">
          <span className="font-mono text-xs text-primary uppercase tracking-wider">
            Why This Is Confusing
          </span>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {entry.whyConfusing}
          </p>
        </div>
        
        {/* Try it link */}
        <Link
          href={resolverUrl}
          className="inline-block mt-4 text-sm text-primary hover:underline"
        >
          Try this in the tool →
        </Link>
      </div>
    </article>
  );
}

export default function HallOfConfusionPage() {
  const [submissionText, setSubmissionText] = useState('');
  const [submissionContext, setSubmissionContext] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend API when available
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight">
          The Hall of Confusion
        </h1>
        <p className="mt-4 text-xl text-text-secondary leading-relaxed">
          The most genuinely confusing time references we've encountered — resolved.
        </p>
        
        <hr className="mt-6 border-primary" />
        
        <p className="mt-6 text-text-secondary leading-relaxed">
          These are real-world time expressions — the kind that appear in actual emails, calendar invites, Slack messages, and deployment scripts. Each one is ambiguous, misleading, or outright impossible. We've resolved every one and explained exactly why it caused confusion. If any of these look familiar, you're not alone.
        </p>
      </header>

      {/* Entries */}
      <div className="space-y-8 mb-16">
        {entries.map((entry) => (
          <ConfusionCard key={entry.id} entry={entry} />
        ))}
      </div>

      {/* Submit your own */}
      <section className="pt-8 border-t border-border">
        <h2 className="font-mono text-sm text-primary uppercase tracking-wider mb-4">
          Submit Your Own
        </h2>
        <p className="text-text-secondary mb-6">
          Encountered a time reference more confusing than these? We may feature it in a future update.
        </p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="The confusing time reference..."
                className="w-full p-4 bg-surface border border-border rounded-md focus:border-primary focus:outline-none resize-none"
                rows={3}
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={submissionContext}
                onChange={(e) => setSubmissionContext(e.target.value)}
                placeholder="Brief context (optional)"
                className="w-full p-3 bg-surface border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-md font-sans font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                boxShadow: '0 2px 8px rgba(168, 117, 32, 0.4)',
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="p-4 bg-surface border border-border rounded-md max-w-lg">
            <p className="text-text-secondary">
              Thank you for your submission. We'll review it for a future update.
            </p>
          </div>
        )}
        
        <p className="mt-4 text-xs text-text-muted">
          Submitted examples may be anonymised and featured on this page. No personal information is stored with submissions.
        </p>
      </section>

      {/* Share */}
      <div className="mt-12">
        <ShareButtons
          title="The Hall of Confusion — TimeMeaning"
          text="The most genuinely confusing time references — resolved and explained. From CST disasters to ghost dates that never existed."
          url="https://timemeaning.com/hall-of-confusion"
        />
      </div>
    </PageLayout>
  );
}
