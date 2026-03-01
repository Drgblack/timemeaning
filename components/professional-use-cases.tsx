import Link from "next/link";

const useCases = [
  {
    label: "FOR DEVELOPERS",
    heading: "Log file timestamps",
    body: "Paste any log line containing a Unix epoch, ISO 8601, or RFC 3339 timestamp and get an immediate plain-English interpretation. Useful during incidents when UTC arithmetic under pressure costs time you don't have.",
    link: "/learn/developer-log-timestamps",
    linkText: "Read: Developer log timestamp guide →",
  },
  {
    label: "FOR SUPPORT TEAMS",
    heading: "Ticket and email timestamps",
    body: "When a customer writes \"I submitted this at 3pm IST\" and your team is in Dublin, paste it here. Get the interpreted time, the UTC equivalent, and a shareable link to send back as confirmation.",
    link: "/learn/how-the-resolver-thinks",
    linkText: "Read: How TimeMeaning resolves a time reference →",
  },
  {
    label: "FOR DISTRIBUTED TEAMS",
    heading: "Meeting references across timezones",
    body: "Paste the time from any message, calendar invite, or Slack thread. Get a verified interpretation with all assumptions stated explicitly — shareable as a canonical link so the whole team sees the same answer.",
    link: "/learn/managers-guide-async",
    linkText: "Read: Manager's guide to async coordination →",
  },
];

export function ProfessionalUseCases() {
  return (
    <section aria-labelledby="professional-use-cases" className="pt-8" style={{ borderTop: '1px solid #e0dbd4' }}>
      <h2 
        id="professional-use-cases" 
        className="font-display text-[28px] mb-3"
        style={{
          color: '#1a1a1a',
          borderLeft: '3px solid #c8922a',
          paddingLeft: '16px',
        }}
      >
        For professionals who need precision
      </h2>
      <p className="leading-relaxed font-sans mb-8" style={{ color: '#4a4540' }}>
        TimeMeaning handles the time references that appear in professional contexts — not just meeting invites, but the formats that appear in logs, tickets, and APIs.
      </p>

      {/* Use case cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((useCase, i) => (
          <article 
            key={i}
            className="flex flex-col h-full"
            style={{
              background: '#ffffff',
              border: '1px solid #e8e4de',
              borderRadius: '4px',
              padding: '24px',
            }}
          >
            <span 
              className="font-mono text-[11px] uppercase"
              style={{ color: '#c8922a', letterSpacing: '0.1em', marginBottom: '8px' }}
            >
              {useCase.label}
            </span>
            <h3 
              className="font-display text-lg mt-1 mb-3"
              style={{ color: '#1a1a1a' }}
            >
              {useCase.heading}
            </h3>
            <p 
              className="flex-1"
              style={{ fontSize: '14px', lineHeight: '1.65', color: '#4a4540' }}
            >
              {useCase.body}
            </p>
            <Link 
              href={useCase.link}
              className="text-[13px] hover:underline mt-4"
              style={{ color: '#c8922a' }}
            >
              {useCase.linkText}
            </Link>
          </article>
        ))}
      </div>

      {/* Trust note */}
      <p className="mt-6 text-sm text-center" style={{ color: '#8a8278' }}>
        TimeMeaning is free to use. No account required. All interpretations run in your browser.
      </p>
    </section>
  );
}
