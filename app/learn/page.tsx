import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Learning Centre — TimeMeaning",
  description:
    "Clear explanations of how time references work. Timezone abbreviations, DST transitions, ISO 8601, UTC offsets, and more.",
  openGraph: {
    title: "Learning Centre — TimeMeaning",
    description: "Clear explanations of how time references work. Timezone abbreviations, DST transitions, ISO 8601, UTC offsets, and more.",
    type: "website",
    siteName: "TimeMeaning",
    images: [
      {
        url: "https://timemeaning.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TimeMeaning — Understand any time reference instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Centre — TimeMeaning",
    description: "Clear explanations of how time references work.",
    images: ["https://timemeaning.com/og-image.jpg"],
  },
};

// Article data with read times
const foundationsArticles = [
  {
    slug: "ambiguous-timezone-abbreviations",
    title: "The Glossary of Ambiguity: Every Timezone Abbreviation With More Than One Meaning",
    description: "A reference list of timezone abbreviations that map to multiple meanings, with their UTC offsets and maximum spreads.",
    readTime: "8 min",
    featured: true,
  },
  {
    slug: "bulletproof-time",
    title: "How to Write a Bulletproof Time: Best Practices for Unambiguous Time References",
    description: "The three components of a time reference that cannot be misinterpreted, and how to write one.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "dst-shift-dates",
    title: "Understanding Daylight Saving Shift Dates: When the Clocks Change and Why It Matters",
    description: "2026 DST transition dates for the US, Europe, and Australia, plus the dangerous March gap.",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "iso-8601-for-humans",
    title: "Decoding ISO 8601 for Humans: What That Timestamp Actually Means",
    description: "A guide to reading ISO 8601 timestamps, understanding timezone offsets, and converting to local time.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "next-friday-paradox",
    title: "The \"Next Friday\" Paradox",
    description: "Why relative dates are a scheduling trap.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "midnight-trap",
    title: "Midnight Is a Trap",
    description: "The 00:00 vs 24:00 conflict.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "unix-timestamp-primer",
    title: "A Primer on Unix Timestamps",
    description: "The number that runs the internet.",
    readTime: "6 min",
    featured: false,
  },
];

const teamsArticles = [
  {
    slug: "managers-guide-async",
    title: "The Manager's Guide to Async Coordination Across Timezones",
    description: "Practical patterns for distributed teams: explicit timezones, UTC for internal deadlines, and proactive DST flagging.",
    readTime: "7 min",
    featured: true,
  },
  {
    slug: "why-military-time-isnt-enough",
    title: "Why Military Time Isn't Enough: The 24-Hour Clock Solves AM/PM But Not Timezones",
    description: "The 24-hour format eliminates one source of ambiguity but carries no timezone information.",
    readTime: "3 min",
    featured: false,
  },
  {
    slug: "understanding-utc-offsets",
    title: "What Is a UTC Offset and Why Is It More Reliable Than a Timezone Name?",
    description: "UTC offsets are fixed values. Timezone names shift with DST. This distinction matters.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "developer-log-timestamps",
    title: "The Developer's Handbook to Log Timestamps: Unix, ISO, RFC 3339, and How to Resolve Them",
    description: "A practical guide to reading and converting timestamp formats found in log files and API responses.",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "working-with-stakeholders-in-different-zones",
    title: "Working with Stakeholders in Different Zones",
    description: "A communication framework for distributed teams.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "quarterly-calendar-trap",
    title: "The Quarterly Calendar Trap",
    description: "Fiscal quarters and reporting lag.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "scheduling-in-shared-calendars",
    title: "Scheduling in Shared Calendars",
    description: "Best practices for cross-timezone calendar events.",
    readTime: "4 min",
    featured: false,
  },
];

const howItWorksArticles = [
  {
    slug: "how-the-resolver-thinks",
    title: "How TimeMeaning Resolves a Time Reference: A Transparency Guide",
    description: "The five-step deterministic pipeline TimeMeaning uses to interpret a pasted time reference.",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "timezones-without-dst",
    title: "Timezones That Don't Observe DST: The Stable Regions and Why They Confuse Everyone Else",
    description: "Major regions with fixed UTC offsets, and why coordination with them shifts twice a year anyway.",
    readTime: "6 min",
    featured: false,
  },
];

const specialistArticles = [
  {
    slug: "aviation-zulu-time",
    title: "Aviation Time: Zulu, UTC, and Why Pilots Never Use Local Time",
    description: "Every aviation communication in the world uses a single time reference: Zulu time. This is why, and how to read it.",
    readTime: "7 min",
    featured: true,
  },
  {
    slug: "international-date-line",
    title: "The International Date Line Trap: When Your Flight Lands Yesterday",
    description: "A flight departs on Tuesday and arrives on Monday. This is not a typo. It is the consequence of crossing the 180th meridian.",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "nautical-time-zones",
    title: "Nautical Time Zones: Why the High Seas Run on Different Rules",
    description: "On land, timezone boundaries are political. On the high seas, timezone boundaries are geometric — and the geometry is strict.",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "railway-time-revolution",
    title: "The Railway Time Revolution",
    description: "How the train changed how we tell time.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "leap-second-explained",
    title: "Leap Seconds Explained",
    description: "The extra second that breaks systems.",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "cst-nightmare",
    title: "CST: A Case Study in Chaos",
    description: "The most overloaded abbreviation in time.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "time-in-contracts",
    title: "How to Specify Time in Legal Contracts",
    description: "Avoiding costly ambiguity.",
    readTime: "6 min",
    featured: false,
  },
];

interface Article {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  featured: boolean;
}

function ArticleEntry({ article }: { article: Article }) {
  return (
    <Link
      href={`/learn/${article.slug}`}
      className={`learn-article-entry group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 border-b hover:border-[#c8922a]/40 transition-colors ${article.featured ? 'learn-article-featured' : ''}`}
      style={{ 
        padding: article.featured ? '14px 16px 14px 12px' : '14px 0',
        borderLeft: article.featured ? '3px solid #c8922a' : 'none',
        marginLeft: article.featured ? '-16px' : '0',
        marginRight: article.featured ? '-16px' : '0',
      }}
    >
      <div className="flex-1 min-w-0">
        <h3 
          className="learn-article-title font-serif mb-1.5 group-hover:text-[#c8922a] transition-colors"
          style={{ 
            fontSize: '17px', 
            fontWeight: article.featured ? 600 : 500,
          }}
        >
          {article.featured && <span style={{ color: '#c8922a', marginRight: '6px' }}>→</span>}
          {article.title}
        </h3>
        <p className="learn-article-description" style={{ fontSize: '14px', lineHeight: 1.6 }}>
          {article.description}
        </p>
        {/* Read time on mobile - below description, left-aligned */}
        <span className="sm:hidden font-mono text-xs tracking-wide mt-2 block" style={{ color: '#c8922a' }}>
          {article.readTime}
        </span>
      </div>
      {/* Read time on desktop - right-aligned */}
      <span className="hidden sm:block font-mono text-xs tracking-wide whitespace-nowrap mt-1" style={{ color: '#c8922a' }}>
        {article.readTime}
      </span>
    </Link>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="learn-section-label font-mono text-[13px] uppercase tracking-wider mb-4">
      {children}
    </h2>
  );
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Learning Centre", url: "https://timemeaning.com/learn" }
]);

export default function LearnPage() {
  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-medium tracking-tight mb-4">
          Learning Centre
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          Clear explanations of how time references work.
        </p>
        {/* Amber horizontal rule - more visible */}
        <div style={{ margin: '20px 0 32px 0', height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.5)' }} />
      </header>

      {/* Foundations section - first section, smaller top margin */}
      <section className="mb-8" style={{ marginTop: '32px' }}>
        <SectionHeading>Foundations</SectionHeading>
        <div>
          {foundationsArticles.map((article) => (
            <ArticleEntry key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* For Teams & Managers section */}
      <section className="mb-8" style={{ marginTop: '48px' }}>
        <SectionHeading>For Teams & Managers</SectionHeading>
        <div>
          {teamsArticles.map((article) => (
            <ArticleEntry key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* How the Tool Works section */}
      <section className="mb-8" style={{ marginTop: '48px' }}>
        <SectionHeading>How the Tool Works</SectionHeading>
        <div>
          {howItWorksArticles.map((article) => (
            <ArticleEntry key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* For Specialists section */}
      <section className="mb-8" style={{ marginTop: '48px' }}>
        <SectionHeading>For Specialists</SectionHeading>
        <div>
          {specialistArticles.map((article) => (
            <ArticleEntry key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Bottom cross-links */}
      <aside className="mt-16 pt-8 border-t border-border space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary mr-2">→</span>
          <Link href="/" className="text-primary hover:underline">
            Try TimeMeaning
          </Link>{" "}
          with your own time reference.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="text-primary mr-2">→</span>
          <Link href="/examples" className="text-primary hover:underline">
            See worked examples
          </Link>{" "}
          of common time confusion.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="text-primary mr-2">→</span>
          <Link href="/tools" className="text-primary hover:underline">
            Use the Tools suite
          </Link>{" "}
          to diagnose your team&apos;s timezone risk.
        </p>
      </aside>
    </PageLayout>
  );
}
