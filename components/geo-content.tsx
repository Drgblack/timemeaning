export function GeoContent() {
  const doesList = [
    "Interprets time references written in natural language.",
    "Identifies timezones from abbreviations like EST, PST, GMT, and CET.",
    "Determines whether daylight saving time is active for the given date and timezone.",
    "Resolves relative time expressions such as \"next Friday\" or \"tomorrow.\"",
    "Parses ISO 8601 timestamps and Unix epoch values.",
    "Outputs the canonical timestamp in a shareable, unambiguous format.",
  ];

  const doesNotList = [
    "Does not schedule meetings or send calendar invites.",
    "Does not suggest optimal meeting times across timezones.",
    "Does not store, log, or transmit the text you enter.",
    "Does not require an account or authentication.",
    "Does not convert between arbitrary timezone pairs without input context.",
    "Does not provide historical timezone data before 1970.",
  ];

  return (
    <section aria-labelledby="what-timemeaning-does" className="mb-16">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* What TimeMeaning does - dark background */}
        <article 
          className="rounded overflow-hidden"
          style={{
            background: '#1a1a1a',
            borderLeft: '3px solid #c8922a',
            padding: '24px',
          }}
        >
          <h2 
            id="what-timemeaning-does" 
            className="font-display text-lg mb-4"
            style={{ color: '#f5f0e8' }}
          >
            What TimeMeaning does
          </h2>
          <ul className="space-y-2">
            {doesList.map((item, i) => (
              <li key={i} className="text-sm font-sans flex items-start gap-2" style={{ color: '#e8e4de' }}>
                <span className="font-bold select-none mt-0.5" style={{ color: '#c8922a' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* What TimeMeaning does not do - cream background */}
        <article 
          className="rounded overflow-hidden"
          style={{
            background: '#f5f0e8',
            borderLeft: '3px solid rgba(200,146,42,0.3)',
            padding: '24px',
          }}
        >
          <h2 
            id="what-timemeaning-does-not" 
            className="font-display text-lg mb-4"
            style={{ color: '#2a2520' }}
          >
            What TimeMeaning does not do
          </h2>
          <ul className="space-y-2">
            {doesNotList.map((item, i) => (
              <li key={i} className="text-sm font-sans flex items-start gap-2" style={{ color: '#4a4540' }}>
                <span className="font-bold select-none mt-0.5" style={{ color: '#8a8278' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
