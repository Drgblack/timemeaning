"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { TopBar } from "@/components/top-bar";

const API_RESPONSE_EXAMPLE = `{
  "input": "Let's sync at 3pm EST on Friday",
  "detected_phrase": "3pm EST on Friday",
  "resolved": {
    "iso_8601_local": "2025-03-07T15:00:00-05:00",
    "iso_8601_utc": "2025-03-07T20:00:00Z",
    "unix_timestamp": 1741381200,
    "rfc_3339": "2025-03-07T20:00:00+00:00"
  },
  "timezone": {
    "name": "Eastern Standard Time",
    "iana": "America/New_York",
    "utc_offset": "-05:00",
    "dst_active": false,
    "dst_next_transition": "2025-03-09T07:00:00Z"
  },
  "assumptions": [
    {
      "type": "relative_date",
      "description": "Friday interpreted as upcoming Friday — 2025-03-07",
      "confidence": "high"
    },
    {
      "type": "abbreviation_resolution",
      "description": "EST resolved as Eastern Standard Time (US), not Australian Eastern Standard Time",
      "confidence": "medium",
      "alternatives": ["Australia/Sydney (UTC+10)"]
    }
  ],
  "flags": {
    "ambiguous": true,
    "ghost_date": false,
    "y2k38_unsafe": false,
    "dst_boundary": false
  },
  "parse_trace": [
    "01 INPUT: 'Let's sync at 3pm EST on Friday'",
    "02 TOKENISED: ['3pm', 'EST', 'Friday']",
    "03 TIME: 15:00 (PM confirmed)",
    "04 ABBREVIATION: EST → Eastern Standard Time (UTC-5) [primary]",
    "05 RELATIVE DATE: Friday → 2025-03-07",
    "06 DST CHECK: 2025-03-07 America/New_York → inactive",
    "07 OUTPUT: 2025-03-07T15:00:00-05:00"
  ],
  "meta": {
    "engine_version": "1.0",
    "iana_db_version": "2024b",
    "processing_ms": 4
  }
}`;

const capabilities = [
  { label: "NATURAL LANGUAGE", description: "Resolves expressions like 'next Friday at 3pm EST' into a structured datetime object." },
  { label: "AMBIGUOUS ABBREVIATIONS", description: "Detects and flags ambiguous timezone abbreviations. Returns all candidate interpretations, not just one." },
  { label: "ISO 8601 & RFC 3339", description: "Parses and validates ISO 8601 and RFC 3339 timestamps with full offset and DST awareness." },
  { label: "UNIX TIMESTAMPS", description: "Converts Unix epoch values to human-readable dates with Y2K38 safety assessment." },
  { label: "RELATIVE EXPRESSIONS", description: "Resolves 'tomorrow', 'next week', 'in 3 hours' relative to a supplied reference datetime." },
  { label: "DST BOUNDARIES", description: "Flags times that fall within DST transition windows — including hours that never existed or occurred twice." },
  { label: "GHOST DATES", description: "Detects historically deleted dates — Samoa 2011, Gregorian reform 1582, DST spring-forward gaps." },
  { label: "CULTURAL TIME", description: "Resolves Swahili time, Ethiopian time, and other non-standard day-start conventions. (Beta)" },
];

const pricingTiers = [
  {
    label: "FREE TIER",
    heading: "1,000 calls / month",
    body: "For developers evaluating the API and building prototypes. Full response object. No credit card required.",
    footer: "Available at launch",
  },
  {
    label: "GROWTH",
    heading: "Up to 100,000 calls / month",
    body: "For production applications. Priority support. SLA documentation available on request.",
    footer: "Pricing to be confirmed",
  },
  {
    label: "ENTERPRISE",
    heading: "Unlimited volume",
    body: "Custom contracts, on-premise deployment options, dedicated support, and compliance documentation for regulated industries.",
    footer: "Contact for early pricing",
  },
];

const useCaseOptions = [
  { value: "", label: "Select your use case...", disabled: true },
  { value: "scheduling", label: "Scheduling or calendar tool" },
  { value: "support", label: "Customer support platform" },
  { value: "legal", label: "Legal or compliance software" },
  { value: "developer", label: "Developer tooling or CLI" },
  { value: "document", label: "Document processing" },
  { value: "enterprise", label: "Enterprise / internal tooling" },
  { value: "other", label: "Other" },
];

const volumeOptions = [
  { value: "", label: "Select estimated volume...", disabled: true },
  { value: "under10k", label: "Under 10,000 / month" },
  { value: "10k-100k", label: "10,000 – 100,000 / month" },
  { value: "100k-1m", label: "100,000 – 1M / month" },
  { value: "over1m", label: "Over 1M / month" },
  { value: "unsure", label: "Not sure yet" },
];

export default function APIPage() {
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [volume, setVolume] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !useCase || !volume) return;
    
    // TODO: Send to backend API when available
    // For now, just show success state
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#fafaf6',
    border: '2px solid #e0dbd4',
    borderRadius: '6px',
    fontSize: '15px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    color: '#1a1a1a',
    outline: 'none',
    transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236a6560' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* Dark hero section */}
        <div style={{ backgroundColor: '#1a1a1a', paddingTop: '96px', paddingBottom: '80px' }}>
          <div className="max-w-2xl mx-auto px-4 text-center">
            {/* Hero label */}
            <span 
              className="font-mono uppercase block mb-6"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#c8922a' }}
            >
              TimeMeaning API — Private Beta
            </span>
            
            {/* Headline */}
            <h1 
              className="font-serif"
              style={{ fontSize: '52px', color: '#f5f0e8', lineHeight: 1.1, marginBottom: '24px' }}
            >
              The time interpretation engine. For your product.
            </h1>
            
            {/* Subheading */}
            <p 
              style={{ fontSize: '18px', color: '#c8c0b0', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.6 }}
            >
              A single API endpoint that resolves any time reference — ambiguous abbreviations, relative expressions, Unix timestamps, ISO 8601 — and returns a structured interpretation with all assumptions shown.
            </p>
            
            {/* Trust signals */}
            <div 
              className="font-mono"
              style={{ fontSize: '12px', color: '#c8922a', letterSpacing: '0.02em' }}
            >
              Deterministic — no ML · Assumptions always returned · Y2K38 and ghost date aware
            </div>
          </div>
        </div>

        {/* Warm content area */}
        <div style={{ backgroundColor: '#fafaf6' }}>
          <div className="max-w-3xl mx-auto px-4 py-16">
            
            {/* Waiting list form */}
            <div 
              style={{ 
                maxWidth: '480px', 
                margin: '0 auto 64px',
                backgroundColor: '#ffffff',
                border: '1px solid #e0dbd4',
                borderRadius: '8px',
                padding: '32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-serif" style={{ fontSize: '22px', color: '#1a1a1a', marginBottom: '8px' }}>
                    Register for early access
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6a6560', marginBottom: '24px', lineHeight: 1.6 }}>
                    The API is in development. Register your interest and we&apos;ll notify you when private beta opens. No spam. One email when it&apos;s ready.
                  </p>

                  {/* Email field */}
                  <div style={{ marginBottom: '16px' }}>
                    <label 
                      htmlFor="email" 
                      style={{ display: 'block', fontSize: '13px', color: '#3a3530', marginBottom: '6px', fontWeight: 500 }}
                    >
                      Work email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#c8922a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,146,42,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0dbd4';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Use case field */}
                  <div style={{ marginBottom: '16px' }}>
                    <label 
                      htmlFor="useCase" 
                      style={{ display: 'block', fontSize: '13px', color: '#3a3530', marginBottom: '6px', fontWeight: 500 }}
                    >
                      Primary use case
                    </label>
                    <select
                      id="useCase"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      required
                      style={selectStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#c8922a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,146,42,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0dbd4';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {useCaseOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Volume field */}
                  <div style={{ marginBottom: '24px' }}>
                    <label 
                      htmlFor="volume" 
                      style={{ display: 'block', fontSize: '13px', color: '#3a3530', marginBottom: '6px', fontWeight: 500 }}
                    >
                      Approximate monthly API calls needed
                    </label>
                    <select
                      id="volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      required
                      style={selectStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#c8922a';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,146,42,0.15)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0dbd4';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {volumeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                      boxShadow: '0 1px 0 rgba(212,160,64,0.4) inset, 0 3px 10px rgba(168,117,32,0.5), 0 1px 3px rgba(0,0,0,0.3)',
                      border: '1px solid #9a6a10',
                      borderTopColor: '#c8922a',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '15px',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      transition: 'transform 150ms ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderTopColor = '#d4a040';
                      e.currentTarget.style.boxShadow = '0 1px 0 rgba(218,168,72,0.4) inset, 0 5px 16px rgba(168,117,32,0.6), 0 2px 4px rgba(0,0,0,0.25)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderTopColor = '#c8922a';
                      e.currentTarget.style.boxShadow = '0 1px 0 rgba(212,160,64,0.4) inset, 0 3px 10px rgba(168,117,32,0.5), 0 1px 3px rgba(0,0,0,0.3)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(1px)';
                      e.currentTarget.style.boxShadow = '0 1px 0 rgba(168,117,32,0.3) inset, 0 1px 3px rgba(0,0,0,0.2)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 1px 0 rgba(218,168,72,0.4) inset, 0 5px 16px rgba(168,117,32,0.6), 0 2px 4px rgba(0,0,0,0.25)';
                    }}
                  >
                    Register for early access →
                  </button>

                  <p style={{ fontSize: '11px', color: '#8a8278', marginTop: '16px', textAlign: 'center', lineHeight: 1.5 }}>
                    We will contact you at the email provided when private beta invitations are sent. We don&apos;t share your details.
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  {/* Checkmark icon */}
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      margin: '0 auto 16px',
                      backgroundColor: '#c8922a',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="font-serif" style={{ fontSize: '22px', color: '#1a1a1a', marginBottom: '12px' }}>
                    You&apos;re on the list.
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6a6560', lineHeight: 1.6 }}>
                    We&apos;ll email you at <strong style={{ color: '#1a1a1a' }}>{submittedEmail}</strong> when private beta opens. In the meantime, explore what the API will be able to do below.
                  </p>
                </div>
              )}
            </div>

            {/* Section 1: What the API resolves */}
            <section style={{ marginBottom: '64px' }}>
              <h2 
                className="font-mono uppercase"
                style={{ 
                  fontSize: '11px', 
                  letterSpacing: '0.1em', 
                  color: '#c8922a',
                  paddingLeft: '12px',
                  borderLeft: '3px solid #c8922a',
                  marginBottom: '24px',
                }}
              >
                What the API Resolves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <div 
                    key={i}
                    style={{
                      padding: '16px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0dbd4',
                      borderRadius: '6px',
                    }}
                  >
                    <span 
                      className="font-mono uppercase block"
                      style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#c8922a', marginBottom: '6px' }}
                    >
                      {cap.label}
                    </span>
                    <p style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.5 }}>
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Response structure */}
            <section style={{ marginBottom: '64px' }}>
              <h2 
                className="font-mono uppercase"
                style={{ 
                  fontSize: '11px', 
                  letterSpacing: '0.1em', 
                  color: '#c8922a',
                  paddingLeft: '12px',
                  borderLeft: '3px solid #c8922a',
                  marginBottom: '24px',
                }}
              >
                What You Get Back
              </h2>
              
              {/* JSON code block */}
              <div 
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  padding: '24px',
                  overflow: 'auto',
                  marginBottom: '16px',
                }}
              >
                <pre 
                  className="font-mono"
                  style={{ fontSize: '12px', lineHeight: 1.6, margin: 0 }}
                >
                  {API_RESPONSE_EXAMPLE.split('\n').map((line, i) => {
                    // Simple syntax highlighting
                    const highlighted = line
                      .replace(/"([^"]+)":/g, '<span style="color:#c8922a">"$1"</span>:')
                      .replace(/: "([^"]+)"/g, ': <span style="color:#f5f0e8">"$1"</span>')
                      .replace(/: (\d+)/g, ': <span style="color:#d4a040">$1</span>')
                      .replace(/: (true|false)/g, ': <span style="color:#c8922a">$1</span>');
                    return (
                      <div key={i} dangerouslySetInnerHTML={{ __html: highlighted }} />
                    );
                  })}
                </pre>
              </div>
              
              <p style={{ fontSize: '13px', color: '#6a6560', fontStyle: 'italic' }}>
                Every field shown above will be returned on every call. Assumptions are always explicit. No silent resolutions.
              </p>
              
              <Link 
                href="/developers/spec"
                style={{ 
                  display: 'inline-block',
                  marginTop: '12px',
                  fontSize: '13px', 
                  color: '#c8922a',
                }}
                className="hover:underline"
              >
                View full API specification →
              </Link>
            </section>

            {/* Section 3: Pricing */}
            <section>
              <h2 
                className="font-mono uppercase"
                style={{ 
                  fontSize: '11px', 
                  letterSpacing: '0.1em', 
                  color: '#c8922a',
                  paddingLeft: '12px',
                  borderLeft: '3px solid #c8922a',
                  marginBottom: '24px',
                }}
              >
                Indicative Pricing
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ alignItems: 'stretch' }}>
                {pricingTiers.map((tier, i) => (
                  <div 
                    key={i}
                    style={{
                      padding: '20px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e0dbd4',
                      borderRadius: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <span 
                      className="font-mono uppercase"
                      style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#c8922a' }}
                    >
                      {tier.label}
                    </span>
                    <h3 
                      className="font-serif"
                      style={{ fontSize: '18px', color: '#1a1a1a', marginTop: '8px', marginBottom: '12px' }}
                    >
                      {tier.heading}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6a6560', lineHeight: 1.5, flex: 1 }}>
                      {tier.body}
                    </p>
                    <p 
                      className="font-mono"
                      style={{ fontSize: '11px', color: '#8a8278', marginTop: '16px' }}
                    >
                      {tier.footer}
                    </p>
                  </div>
                ))}
              </div>
              
              <p style={{ fontSize: '13px', color: '#6a6560', textAlign: 'center', marginTop: '24px', fontStyle: 'italic' }}>
                Pricing is indicative and subject to change before launch. Early access registrants will receive preferred pricing.
              </p>
            </section>

          </div>
        </div>

        {/* API development note above footer */}
        <div style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #3a3530', padding: '12px 16px' }}>
          <p style={{ fontSize: '12px', color: '#6a6560', textAlign: 'center', margin: 0 }}>
            TimeMeaning API is in private development. The consumer tool at timemeaning.com is free and will remain free.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
