"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

const sidebarSections = [
  { id: "overview", label: "Overview", indent: 0 },
  { id: "authentication", label: "Authentication", indent: 0 },
  { id: "endpoints", label: "Endpoints", indent: 0 },
  { id: "resolve", label: "POST /v1/resolve", indent: 1 },
  { id: "batch", label: "POST /v1/resolve/batch", indent: 1 },
  { id: "health", label: "GET /v1/health", indent: 1 },
  { id: "request", label: "Request Reference", indent: 0 },
  { id: "input-params", label: "Input parameters", indent: 1 },
  { id: "context-object", label: "Context object", indent: 1 },
  { id: "options-object", label: "Options object", indent: 1 },
  { id: "response", label: "Response Reference", indent: 0 },
  { id: "resolved-object", label: "Resolved object", indent: 1 },
  { id: "timezone-object", label: "Timezone object", indent: 1 },
  { id: "assumptions-array", label: "Assumptions array", indent: 1 },
  { id: "flags-object", label: "Flags object", indent: 1 },
  { id: "parse-trace", label: "Parse trace", indent: 1 },
  { id: "errors", label: "Error Codes", indent: 0 },
  { id: "rate-limits", label: "Rate Limits", indent: 0 },
  { id: "sdks", label: "SDKs & Libraries", indent: 0 },
  { id: "changelog", label: "Changelog", indent: 0 },
];

const errorCodes = [
  { code: "INVALID_INPUT", status: "400", description: "Input string is empty or exceeds 500 characters." },
  { code: "UNPARSEABLE", status: "422", description: "Input could not be parsed as any recognisable time reference." },
  { code: "AMBIGUOUS_UNRESOLVABLE", status: "422", description: "Input is ambiguous and cannot be resolved without additional context. Returns partial result with ambiguity details." },
  { code: "INVALID_CONTEXT", status: "400", description: "Context object contains invalid parameters." },
  { code: "UNAUTHORISED", status: "401", description: "Missing or invalid API key." },
  { code: "RATE_LIMITED", status: "429", description: "Rate limit exceeded. Retry-After header indicates reset time." },
  { code: "INTERNAL_ERROR", status: "500", description: "Engine error. Logged automatically. Contact support if persistent." },
];

function CodeBlock({ children, language = "json" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for JSON
  const highlightJSON = (code: string) => {
    return code
      .replace(/"([^"]+)":/g, '<span style="color:#c8922a">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span style="color:#f5f0e8">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span style="color:#d4a040">$1</span>')
      .replace(/: (true|false|null)/g, ': <span style="color:#c8922a">$1</span>');
  };

  // Simple highlighting for HTTP/shell
  const highlightHTTP = (code: string) => {
    return code
      .replace(/(POST|GET|PUT|DELETE|PATCH)/g, '<span style="color:#c8922a">$1</span>')
      .replace(/(Authorization|Content-Type|X-RateLimit-\w+):/g, '<span style="color:#c8922a">$1</span>:')
      .replace(/(Bearer [^\s]+)/g, '<span style="color:#d4a040">$1</span>')
      .replace(/(https?:\/\/[^\s]+)/g, '<span style="color:#f5f0e8">$1</span>');
  };

  const highlighted = language === "json" ? highlightJSON(children) : highlightHTTP(children);

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: '1px solid #3a3530',
          borderRadius: '4px',
          color: '#8a8278',
          fontSize: '11px',
          cursor: 'pointer',
          transition: 'all 150ms',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#c8922a';
          e.currentTarget.style.color = '#c8922a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#3a3530';
          e.currentTarget.style.color = '#8a8278';
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '6px',
          padding: '16px',
          overflow: 'auto',
        }}
      >
        <pre
          className="font-mono"
          style={{ fontSize: '12px', lineHeight: 1.6, margin: 0, color: '#e8e0d0' }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code
      style={{
        backgroundColor: '#2a2825',
        color: '#f0ece6',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '0.9em',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}
    >
      {children}
    </code>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-mono uppercase scroll-mt-24"
      style={{
        fontSize: '11px',
        letterSpacing: '0.1em',
        color: '#c8922a',
        paddingLeft: '12px',
        borderLeft: '3px solid #c8922a',
        marginBottom: '20px',
        marginTop: '48px',
      }}
    >
      {children}
    </h2>
  );
}

function SubSectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="font-serif scroll-mt-24"
      style={{
        fontSize: '18px',
        color: '#1a1a1a',
        marginBottom: '12px',
        marginTop: '32px',
      }}
    >
      {children}
    </h3>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, marginBottom: '16px' }}>
      {children}
    </p>
  );
}

export default function APISpecPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = localStorage.getItem("api-spec-banner-dismissed");
    if (dismissed === "true") {
      setBannerDismissed(true);
    }

    // Intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    sidebarSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem("api-spec-banner-dismissed", "true");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />

      {/* Beta banner */}
      {!bannerDismissed && (
        <div
          style={{
            backgroundColor: '#2a2520',
            borderBottom: '1px solid #3a3530',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#c8922a', margin: 0 }}>
            This specification describes the planned private beta API. Implementation details may change before launch.{" "}
            <Link href="/developers" className="underline hover:no-underline">
              Register for early access at timemeaning.com/api
            </Link>
          </p>
          <button
            onClick={handleDismissBanner}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#6a6560',
              cursor: 'pointer',
              padding: '4px',
              fontSize: '18px',
              lineHeight: 1,
            }}
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex-1 flex">
        {/* Sidebar - desktop */}
        <aside
          className="hidden lg:block"
          style={{
            width: '240px',
            flexShrink: 0,
            backgroundColor: '#fafaf6',
            borderRight: '1px solid #e0dbd4',
            position: 'sticky',
            top: '52px',
            height: 'calc(100vh - 52px)',
            overflowY: 'auto',
            padding: '24px 16px',
          }}
        >
          <nav>
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '6px 12px',
                  paddingLeft: section.indent === 1 ? '24px' : '12px',
                  fontSize: section.indent === 1 ? '12px' : '13px',
                  color: activeSection === section.id ? '#c8922a' : '#6a6560',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderLeft: activeSection === section.id ? '2px solid #c8922a' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                  fontWeight: section.indent === 0 ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.color = '#3a3530';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.color = '#6a6560';
                  }
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav toggle */}
        <div className="lg:hidden" style={{ position: 'sticky', top: '52px', zIndex: 40, backgroundColor: '#fafaf6', borderBottom: '1px solid #e0dbd4' }}>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            style={{
              width: '100%',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#3a3530',
            }}
          >
            <span>Navigation</span>
            <span style={{ transform: mobileNavOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>▼</span>
          </button>
          {mobileNavOpen && (
            <nav style={{ padding: '0 16px 16px', maxHeight: '50vh', overflowY: 'auto' }}>
              {sidebarSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    paddingLeft: section.indent === 1 ? '24px' : '12px',
                    fontSize: '13px',
                    color: activeSection === section.id ? '#c8922a' : '#6a6560',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            maxWidth: '720px',
            padding: '32px 24px 64px',
            margin: '0 auto',
          }}
        >
          {/* Overview */}
          <section id="overview">
            <h1 className="font-serif" style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '24px' }}>
              TimeMeaning API Specification
            </h1>
            <Paragraph>
              The TimeMeaning API provides programmatic access to the TimeMeaning interpretation engine — the same engine that powers timemeaning.com. It accepts natural language time references, ISO 8601 timestamps, Unix epoch values, and ambiguous timezone expressions, and returns a fully structured interpretation object with all assumptions made explicit.
            </Paragraph>
            <Paragraph>
              The API is deterministic. The same input with the same context parameters will always return the same output. There is no machine learning inference. This makes it suitable for audit-sensitive applications where interpretation transparency is required.
            </Paragraph>
            <Paragraph>
              <strong>Current version:</strong> v1 (private beta)
            </Paragraph>
          </section>

          {/* Authentication */}
          <SectionHeading id="authentication">Authentication</SectionHeading>
          <Paragraph>
            All API requests require a bearer token passed in the Authorization header:
          </Paragraph>
          <CodeBlock language="http">{`Authorization: Bearer tm_live_xxxxxxxxxxxxxxxxxxxx`}</CodeBlock>
          <Paragraph>
            API keys are issued during private beta registration. Keys are prefixed <InlineCode>tm_live_</InlineCode> for production and <InlineCode>tm_test_</InlineCode> for sandbox environments. Test environment keys return realistic responses but do not count against rate limits and always resolve to a fixed reference date of <InlineCode>2026-01-01T00:00:00Z</InlineCode> for deterministic testing.
          </Paragraph>

          {/* Endpoints */}
          <SectionHeading id="endpoints">Endpoints</SectionHeading>

          <SubSectionHeading id="resolve">POST /v1/resolve</SubSectionHeading>
          <Paragraph>Resolves a single time reference string.</Paragraph>
          <CodeBlock language="http">{`POST https://api.timemeaning.com/v1/resolve
Content-Type: application/json
Authorization: Bearer tm_live_xxxxxxxxxxxx`}</CodeBlock>
          <Paragraph>Request body:</Paragraph>
          <CodeBlock>{`{
  "input": "Let's sync at 3pm EST on Friday",
  "context": {
    "reference_datetime": "2025-03-01T09:00:00Z",
    "locale": "America/New_York",
    "language": "en",
    "cultural_time_system": null
  },
  "options": {
    "include_parse_trace": true,
    "include_alternatives": true,
    "ghost_date_check": true,
    "y2k38_check": true,
    "canonical_formats": true
  }
}`}</CodeBlock>
          <Paragraph>Example response:</Paragraph>
          <CodeBlock>{`{
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
}`}</CodeBlock>

          <SubSectionHeading id="batch">POST /v1/resolve/batch</SubSectionHeading>
          <Paragraph>
            Resolves up to 100 time references in a single request. Useful for processing documents, log files, or message histories.
          </Paragraph>
          <CodeBlock>{`{
  "inputs": [
    {"id": "ref_001", "input": "3pm EST on Friday"},
    {"id": "ref_002", "input": "1715846400"},
    {"id": "ref_003", "input": "next Tuesday morning GMT"}
  ],
  "context": {
    "reference_datetime": "2026-03-01T09:00:00Z"
  },
  "options": {
    "include_parse_trace": false
  }
}`}</CodeBlock>
          <Paragraph>
            Response wraps each result in an array with the supplied id for correlation. Failed individual resolutions return an error object for that item without failing the entire batch.
          </Paragraph>
          <Paragraph>
            Maximum batch size: 100 inputs per request. For larger volumes, paginate requests or contact us about the enterprise streaming endpoint.
          </Paragraph>

          <SubSectionHeading id="health">GET /v1/health</SubSectionHeading>
          <Paragraph>Returns API status and current engine version. No authentication required.</Paragraph>
          <CodeBlock>{`{
  "status": "operational",
  "engine_version": "1.0",
  "iana_db_version": "2024b",
  "uptime_percentage_30d": 99.97,
  "timestamp": "2026-03-01T09:00:00Z"
}`}</CodeBlock>

          {/* Request Reference */}
          <SectionHeading id="request">Request Reference</SectionHeading>

          <SubSectionHeading id="input-params">Input parameters</SubSectionHeading>
          <Paragraph>
            The <InlineCode>input</InlineCode> field accepts any string containing a time reference. Maximum length: 500 characters.
          </Paragraph>

          <SubSectionHeading id="context-object">Context object</SubSectionHeading>
          <Paragraph>All context fields are optional:</Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>reference_datetime</InlineCode> — ISO 8601 timestamp. The &quot;now&quot; to use for relative expressions. Defaults to actual current UTC time.</li>
            <li><InlineCode>locale</InlineCode> — IANA timezone identifier (e.g. &quot;America/New_York&quot;). Used to disambiguate abbreviations when locale context is known.</li>
            <li><InlineCode>language</InlineCode> — BCP 47 language code (e.g. &quot;en-GB&quot;, &quot;de-DE&quot;). Affects natural language parsing. Default: &quot;en&quot;.</li>
            <li><InlineCode>cultural_time_system</InlineCode> — &quot;swahili&quot;, &quot;ethiopian&quot;. Applies non-standard day-start conventions.</li>
          </ul>

          <SubSectionHeading id="options-object">Options object</SubSectionHeading>
          <Paragraph>All options fields are optional booleans:</Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>include_parse_trace</InlineCode> — Include step-by-step parse trace in response. Default: false.</li>
            <li><InlineCode>include_alternatives</InlineCode> — Include alternative interpretations for ambiguous inputs. Default: true.</li>
            <li><InlineCode>ghost_date_check</InlineCode> — Check input against ghost date database. Default: true.</li>
            <li><InlineCode>y2k38_check</InlineCode> — Include Y2K38 safety assessment. Default: true.</li>
            <li><InlineCode>canonical_formats</InlineCode> — Include all canonical format representations. Default: true.</li>
          </ul>

          {/* Response Reference */}
          <SectionHeading id="response">Response Reference</SectionHeading>

          <SubSectionHeading id="resolved-object">Resolved object</SubSectionHeading>
          <Paragraph>Contains the interpreted datetime in multiple formats:</Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>iso_8601_local</InlineCode> — ISO 8601 with local timezone offset</li>
            <li><InlineCode>iso_8601_utc</InlineCode> — ISO 8601 in UTC (Z suffix)</li>
            <li><InlineCode>unix_timestamp</InlineCode> — Seconds since Unix epoch</li>
            <li><InlineCode>rfc_3339</InlineCode> — RFC 3339 format</li>
          </ul>

          <SubSectionHeading id="timezone-object">Timezone object</SubSectionHeading>
          <Paragraph>Contains timezone metadata:</Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>name</InlineCode> — Human-readable timezone name</li>
            <li><InlineCode>iana</InlineCode> — IANA timezone identifier</li>
            <li><InlineCode>utc_offset</InlineCode> — Current UTC offset</li>
            <li><InlineCode>dst_active</InlineCode> — Whether DST is currently active</li>
            <li><InlineCode>dst_next_transition</InlineCode> — Next DST transition time (if applicable)</li>
          </ul>

          <SubSectionHeading id="assumptions-array">Assumptions array</SubSectionHeading>
          <Paragraph>
            Every assumption made during interpretation is returned explicitly. Each assumption object contains:
          </Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>type</InlineCode> — Category of assumption (relative_date, abbreviation_resolution, etc.)</li>
            <li><InlineCode>description</InlineCode> — Human-readable explanation</li>
            <li><InlineCode>confidence</InlineCode> — high, medium, or low</li>
            <li><InlineCode>alternatives</InlineCode> — Array of alternative interpretations (if applicable)</li>
          </ul>

          <SubSectionHeading id="flags-object">Flags object</SubSectionHeading>
          <Paragraph>Boolean flags for special conditions:</Paragraph>
          <ul style={{ fontSize: '14px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '20px', marginBottom: '16px' }}>
            <li><InlineCode>ambiguous</InlineCode> — Input contained ambiguous elements</li>
            <li><InlineCode>ghost_date</InlineCode> — Date is a historically deleted date</li>
            <li><InlineCode>y2k38_unsafe</InlineCode> — Timestamp exceeds 32-bit signed integer maximum</li>
            <li><InlineCode>dst_boundary</InlineCode> — Time falls within a DST transition window</li>
          </ul>

          <SubSectionHeading id="parse-trace">Parse trace</SubSectionHeading>
          <Paragraph>
            When <InlineCode>include_parse_trace</InlineCode> is true, returns an array of strings showing each step of the interpretation pipeline. Useful for debugging and audit trails.
          </Paragraph>

          {/* Error Codes */}
          <SectionHeading id="errors">Error Codes</SectionHeading>
          <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0dbd4' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6a6560', fontWeight: 500 }}>Code</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6a6560', fontWeight: 500 }}>HTTP Status</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6a6560', fontWeight: 500 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {errorCodes.map((err, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e0dbd4' }}>
                    <td style={{ padding: '8px 12px' }}><InlineCode>{err.code}</InlineCode></td>
                    <td style={{ padding: '8px 12px', color: '#3a3530' }}>{err.status}</td>
                    <td style={{ padding: '8px 12px', color: '#3a3530' }}>{err.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paragraph>
            <InlineCode>AMBIGUOUS_UNRESOLVABLE</InlineCode> returns HTTP 422 but includes a partial response body with the detected phrase, candidate interpretations, and the specific reason resolution failed. This allows calling applications to surface the ambiguity to end users rather than failing silently.
          </Paragraph>

          {/* Rate Limits */}
          <SectionHeading id="rate-limits">Rate Limits</SectionHeading>
          <CodeBlock language="http">{`Free tier:      1,000 requests/month, 10 requests/second
Growth tier:    100,000 requests/month, 50 requests/second  
Enterprise:     Custom — contact for details`}</CodeBlock>
          <Paragraph>Rate limit headers are returned on every response:</Paragraph>
          <CodeBlock language="http">{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1741392000`}</CodeBlock>

          {/* SDKs */}
          <SectionHeading id="sdks">SDKs & Libraries</SectionHeading>
          <Paragraph>Official SDKs are planned for private beta launch:</Paragraph>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {["JavaScript / TypeScript", "Python", "Ruby"].map((sdk) => (
              <span
                key={sdk}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#2a2825',
                  color: '#8a8278',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                }}
              >
                {sdk}
              </span>
            ))}
          </div>
          <Paragraph>
            The API is REST/JSON and can be called from any language without an SDK. If you build an unofficial SDK, let us know and we&apos;ll link to it here.
          </Paragraph>
          <Paragraph style={{ fontStyle: 'italic', color: '#6a6560' }}>
            Community libraries will be listed here as they are submitted.
          </Paragraph>

          {/* Changelog */}
          <SectionHeading id="changelog">Changelog</SectionHeading>
          <div style={{ borderLeft: '2px solid #e0dbd4', paddingLeft: '16px' }}>
            <h4 className="font-mono" style={{ fontSize: '13px', color: '#c8922a', marginBottom: '8px' }}>
              v1.0 — Private beta
            </h4>
            <ul style={{ fontSize: '13px', color: '#3a3530', lineHeight: 1.7, paddingLeft: '16px', margin: 0 }}>
              <li>Initial release. POST /v1/resolve, POST /v1/resolve/batch, GET /v1/health.</li>
              <li>Natural language, ISO 8601, Unix epoch, RFC 3339 input support.</li>
              <li>Ghost date detection: 5 entries.</li>
              <li>Y2K38 safety assessment included.</li>
              <li>IANA timezone database 2024b.</li>
            </ul>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
