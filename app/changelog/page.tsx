import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Changelog — TimeMeaning",
  description: "Updates to timezone rules, parser improvements, and new features. TimeMeaning tracks changes to the IANA Time Zone Database and documents all resolver updates.",
  openGraph: {
    title: "Changelog — TimeMeaning",
    description: "Updates to timezone rules, parser improvements, and new features.",
    url: "https://timemeaning.com/changelog",
    siteName: "TimeMeaning",
    type: "website",
  },
};

type ChangeType = "FEATURE" | "IMPROVEMENT" | "TIMEZONE RULE" | "FIX";

interface ChangelogEntry {
  date: string;
  version: string;
  type: ChangeType;
  description: string;
}

const changelogEntries: ChangelogEntry[] = [
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Initial public launch. Core resolver supporting natural language time references, timezone abbreviation disambiguation, DST-aware resolution, Unix timestamp parsing, ISO 8601 and RFC 3339 support, and shareable result links.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Timezone Risk Suite launched: Confidently Wrong Quiz, Cost of a Missed Meeting Calculator, Team Ambiguity Audit, Global Overlap Burnout Meter, DST Danger Map, Abbreviation Lookup, Time Dilation Calculator, Unix Birthday tool.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Learning Centre launched with 13 articles covering timezone fundamentals, DST transitions, ISO 8601, Unix timestamps, aviation Zulu time, the International Date Line, and nautical time zones.",
  },
  {
    date: "March 2026",
    version: "IANA 2026a",
    type: "TIMEZONE RULE",
    description: "IANA Time Zone Database version 2026a incorporated. Includes updated DST rules for Kazakhstan (permanent UTC+5), Palestine (revised DST schedule), and Lebanon (permanent standard time adoption).",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Ghost Date detection added. The resolver now identifies and flags calendar dates that never existed or occurred twice due to calendar reforms, DST transitions, or International Date Line crossings.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Y2K38 safety flagging added. Unix timestamps exceeding the 32-bit signed integer maximum (2,147,483,647 — 19 January 2038 at 03:14:07 UTC) are flagged with a safety warning.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Parse trace added to result cards. The step-by-step deterministic pipeline is now visible to users via the expandable \"View parse trace\" link on every result.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "IMPROVEMENT",
    description: "Keyboard shortcuts added: Cmd/Ctrl+K to open search, / to focus resolver input, Escape to close panels. Skip-to-main-content link added for accessibility.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "RSS feed added for blog articles at /feed.xml. Glossary page added with 35 timezone-related definitions.",
  },
  {
    date: "March 2026",
    version: "v1.0",
    type: "FEATURE",
    description: "Recently Resolved history added. The resolver now remembers your last 10 successful decodes in localStorage for quick re-access.",
  },
];

function getTypeBadgeStyles(type: ChangeType): { backgroundColor: string; color: string } {
  switch (type) {
    case "FEATURE":
      return { backgroundColor: "rgba(76, 175, 80, 0.15)", color: "#4caf50" };
    case "IMPROVEMENT":
      return { backgroundColor: "rgba(200, 146, 42, 0.15)", color: "#c8922a" };
    case "TIMEZONE RULE":
      return { backgroundColor: "rgba(66, 165, 245, 0.15)", color: "#42a5f5" };
    case "FIX":
      return { backgroundColor: "rgba(158, 158, 158, 0.15)", color: "#9e9e9e" };
    default:
      return { backgroundColor: "rgba(200, 146, 42, 0.15)", color: "#c8922a" };
  }
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Changelog", url: "https://timemeaning.com/changelog" },
]);

export default function ChangelogPage() {
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      <div style={{ maxWidth: "680px" }}>
        {/* Header */}
        <header style={{ marginBottom: "40px" }}>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 5vw, 42px)",
              fontWeight: 500,
              color: "#1a1a1a",
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Changelog
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "#6a6560",
              lineHeight: 1.5,
            }}
          >
            Updates to timezone rules, parser improvements, and new features.
          </p>
          {/* Amber horizontal rule */}
          <div
            style={{
              marginTop: "20px",
              height: "1px",
              backgroundColor: "rgba(200, 146, 42, 0.5)",
            }}
          />
        </header>

        {/* Intro paragraph */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#3a3530",
            marginBottom: "40px",
          }}
        >
          TimeMeaning tracks changes to the IANA Time Zone Database and updates
          the resolver accordingly. This changelog documents rule changes, parser
          improvements, and new features — in reverse chronological order.
        </p>

        {/* Changelog entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {changelogEntries.map((entry, index) => {
            const badgeStyles = getTypeBadgeStyles(entry.type);
            return (
              <article
                key={index}
                style={{
                  paddingBottom: "32px",
                  borderBottom:
                    index < changelogEntries.length - 1
                      ? "1px solid #e8e4de"
                      : "none",
                }}
              >
                {/* Date and badges row */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  {/* Date */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "13px",
                      color: "#c8922a",
                      fontWeight: 500,
                    }}
                  >
                    {entry.date}
                  </span>

                  <span style={{ color: "#ccc" }}>·</span>

                  {/* Version badge */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      backgroundColor: "rgba(200, 146, 42, 0.12)",
                      color: "#b8842a",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: 500,
                    }}
                  >
                    {entry.version}
                  </span>

                  {/* Type badge */}
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontWeight: 600,
                      ...badgeStyles,
                    }}
                  >
                    {entry.type}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.65,
                    color: "#3a3530",
                    margin: 0,
                  }}
                >
                  {entry.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <aside
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(200, 146, 42, 0.3)",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#6a6560",
              marginBottom: "16px",
            }}
          >
            IANA Time Zone Database releases are tracked at{" "}
            <a
              href="https://www.iana.org/time-zones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              iana.org/time-zones
            </a>
            . TimeMeaning incorporates each release within 48 hours of
            publication.
          </p>

          <p
            style={{
              fontSize: "13px",
              color: "#8a8580",
            }}
          >
            Changes are also announced via the{" "}
            <Link href="/feed.xml" className="text-primary hover:underline">
              RSS feed
            </Link>
            .
          </p>
        </aside>
      </div>
    </PageLayout>
  );
}
