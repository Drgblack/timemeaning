"use client";

const workedExamples = [
  {
    id: 1,
    title: "The Relative Date Trap",
    userInput: "Let's sync next Tuesday at 2pm.",
    interpretation: {
      referenceDate: "Sunday, 1 March 2026 (Today)",
      identifiedReference: "\"Next Tuesday\"",
      assumption: "Interpreted as the first Tuesday of the following week.",
      resolvedTimestamp: "Tuesday, 10 March 2026, 14:00 (Local Time)",
      iso8601: "2026-03-10T14:00:00",
    },
    warning: null,
    note: null,
  },
  {
    id: 2,
    title: "The Midnight Ambiguity",
    userInput: "Project due Friday at Midnight PST.",
    interpretation: {
      identifiedReference: "\"Midnight\"",
      assumption: "Interpreted as the start of the day (00:00).",
      resolvedTimestamp: "Friday, 6 March 2026, 00:00 PST",
      iso8601: "2026-03-06T08:00:00Z (UTC)",
    },
    warning: "This occurs at the end of Thursday night. If you intended the end of Friday, use \"Friday 23:59.\"",
    note: null,
  },
  {
    id: 3,
    title: "The DST \"Gap Week\"",
    userInput: "London/NY Sync: 15:00 GMT, March 15.",
    interpretation: {
      dateContext: "Within the US/UK DST Mismatch period.",
      london: "15:00 GMT (UTC+0)",
      newYork: "11:00 EDT (UTC-4)",
      iso8601: "2026-03-15T15:00:00Z",
    },
    warning: null,
    note: "Clocks in New York have shifted for DST, but London remains on GMT. The usual 5-hour difference is currently 4 hours.",
  },
  {
    id: 4,
    title: "The Developer Log",
    userInput: "error_log_id: 1741512000",
    interpretation: {
      format: "Unix Epoch (Seconds)",
      resolvedDate: "Monday, 9 March 2026",
      resolvedTime: "09:20:00 UTC",
      localTime: "Monday, 9 March 2026, 09:20:00 GMT",
      iso8601: "2026-03-09T09:20:00Z",
    },
    warning: null,
    note: null,
  },
];

export function ToolInAction() {
  return (
    <section className="mt-16 pt-10 border-t border-border">
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
          Worked Examples
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mt-2">
          The Tool in Action
        </h2>
        <p className="mt-3 text-sm text-text-muted max-w-md mx-auto">
          See how TimeMeaning interprets common time references and surfaces hidden assumptions.
        </p>
      </div>

      {/* Examples grid - 2 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workedExamples.map((example) => (
          <div
            key={example.id}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            {/* Example header */}
            <div className="px-5 py-4 border-b border-border bg-[#1a1a1a]">
              <span className="font-mono text-xs text-primary">
                Example {example.id}
              </span>
              <h3 className="font-serif text-lg text-foreground mt-1">
                {example.title}
              </h3>
            </div>

            {/* User Input - terminal style */}
            <div className="px-5 py-4 bg-[#0f0f0d] border-b border-border">
              <span className="font-mono text-[10px] text-[#6a6460] uppercase tracking-wider block mb-2">
                User Input
              </span>
              <code className="font-mono text-sm text-[#c8922a] block leading-relaxed">
                {example.userInput}
              </code>
            </div>

            {/* Interpretation - with amber border */}
            <div 
              className="px-5 py-4"
              style={{ borderLeft: '3px solid #c8922a' }}
            >
              <span className="font-mono text-[10px] text-primary uppercase tracking-wider block mb-3">
                TimeMeaning Interpretation
              </span>
              
              <dl className="space-y-2 text-sm">
                {example.interpretation.referenceDate && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Reference Date:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.referenceDate}</dd>
                  </div>
                )}
                {example.interpretation.identifiedReference && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Identified Reference:</dt>
                    <dd className="font-mono text-foreground">{example.interpretation.identifiedReference}</dd>
                  </div>
                )}
                {example.interpretation.dateContext && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Date Context:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.dateContext}</dd>
                  </div>
                )}
                {example.interpretation.format && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Format:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.format}</dd>
                  </div>
                )}
                {example.interpretation.assumption && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Assumption:</dt>
                    <dd className="font-sans text-foreground italic">{example.interpretation.assumption}</dd>
                  </div>
                )}
                {example.interpretation.london && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">London:</dt>
                    <dd className="font-mono text-foreground">{example.interpretation.london}</dd>
                  </div>
                )}
                {example.interpretation.newYork && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">New York:</dt>
                    <dd className="font-mono text-foreground">{example.interpretation.newYork}</dd>
                  </div>
                )}
                {example.interpretation.resolvedDate && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Resolved Date:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.resolvedDate}</dd>
                  </div>
                )}
                {example.interpretation.resolvedTime && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Resolved Time:</dt>
                    <dd className="font-mono text-foreground">{example.interpretation.resolvedTime}</dd>
                  </div>
                )}
                {example.interpretation.localTime && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Local Time:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.localTime}</dd>
                  </div>
                )}
                {example.interpretation.resolvedTimestamp && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-sans text-text-muted">Resolved Timestamp:</dt>
                    <dd className="font-sans text-foreground">{example.interpretation.resolvedTimestamp}</dd>
                  </div>
                )}
                <div className="flex flex-wrap gap-x-2 pt-1">
                  <dt className="font-sans text-text-muted">ISO 8601:</dt>
                  <dd className="font-mono text-primary">{example.interpretation.iso8601}</dd>
                </div>
              </dl>

              {/* Warning - high contrast */}
              {example.warning && (
                <div 
                  className="mt-4 p-3 rounded text-sm"
                  style={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider block mb-1" style={{ color: '#ef4444' }}>
                    Warning
                  </span>
                  <p className="font-sans leading-relaxed" style={{ color: '#fca5a5' }}>
                    {example.warning}
                  </p>
                </div>
              )}

              {/* Note - informational */}
              {example.note && (
                <div 
                  className="mt-4 p-3 rounded text-sm"
                  style={{ 
                    backgroundColor: 'rgba(200, 146, 42, 0.1)',
                    border: '1px solid rgba(200, 146, 42, 0.3)',
                  }}
                >
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider block mb-1">
                    Note
                  </span>
                  <p className="font-sans text-foreground leading-relaxed">
                    {example.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
