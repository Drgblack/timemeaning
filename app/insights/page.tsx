import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Insights — TimeMeaning",
  description:
    "Data-driven observations on timezone ambiguity, scheduling errors, and the measurable cost of unclear time references.",
  openGraph: {
    title: "Insights — TimeMeaning",
    description: "Data-driven observations on timezone ambiguity, scheduling errors, and the measurable cost of unclear time references.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — TimeMeaning",
    description: "Data-driven observations on timezone ambiguity, scheduling errors, and the measurable cost of unclear time references.",
  },
};

const insights = [
  {
    number: "01",
    slug: "ist-most-dangerous-abbreviation",
    title: "IST is the most dangerous timezone abbreviation in global business",
    summary: "Three letters. Three meanings. 5.5 hours of potential error. An analysis of why IST causes more missed meetings than any other abbreviation.",
    readTime: "4 min",
  },
  {
    number: "02",
    slug: "march-gap",
    title: "Three weeks in March when transatlantic meetings silently shift",
    summary: "The US and Europe don't change their clocks on the same day. For three weeks every spring, every standing meeting between the two is one hour wrong.",
    readTime: "3 min",
  },
  {
    number: "03",
    slug: "logs-never-lie-clocks-do",
    title: "Log files never lie — but the clocks that generate them sometimes do",
    summary: "Why UTC-logged systems still produce ambiguous timestamps, and the three clock failure modes that affect every production system.",
    readTime: "5 min",
  },
  {
    number: "04",
    slug: "cost-of-timezone-ambiguity",
    title: "The measurable cost of timezone ambiguity in distributed teams",
    summary: "A framework for calculating what your team actually loses to timezone confusion — and why the number is almost always larger than expected.",
    readTime: "4 min",
  },
  {
    number: "05",
    slug: "zulu-time-civilian-use",
    title: "Why aviation adopted Zulu time — and why civilian teams should too",
    summary: "Aviation solved the timezone problem in 1944. The solution is available to everyone. Almost no one uses it.",
    readTime: "3 min",
  },
];

function InsightCard({ insight }: { insight: typeof insights[0] }) {
  return (
    <article 
      className="insight-card bg-[#fafaf6] dark:bg-[#1f1e1c] border border-border dark:border-[#3a3530] rounded-md transition-colors hover:border-primary/30 dark:hover:border-[#c8922a] dark:hover:bg-[#252220]"
      style={{ padding: '24px' }}
    >
      <div className="flex items-start gap-4">
        <span 
          className="insight-card-number font-mono flex-shrink-0"
          style={{ fontSize: '32px', lineHeight: 1, fontWeight: 500, color: '#c8922a' }}
        >
          {insight.number}
        </span>
        <div className="flex-1 min-w-0">
          <h2 
            className="insight-card-title font-serif mb-2"
            style={{ fontSize: '18px', lineHeight: 1.4, color: 'var(--foreground)' }}
          >
            {insight.title}
          </h2>
          <p 
            className="insight-card-description mb-4"
            style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}
          >
            {insight.summary}
          </p>
          <div className="flex items-center justify-between">
            <span 
              className="insight-card-readtime font-mono text-xs tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              {insight.readTime}
            </span>
            <Link 
              href={`/insights/${insight.slug}`}
              className="insight-card-read-link text-sm hover:underline"
              style={{ color: '#c8922a' }}
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Insights", url: "https://timemeaning.com/insights" }
]);

export default function InsightsPage() {
  return (
  <PageLayout>
  <JsonLd data={breadcrumbSchema} />
  <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        {/* Page header */}
        <header className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight leading-tight mb-4">
            Insights
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Observations on how time ambiguity affects teams, systems, and decisions.
          </p>
          {/* Amber horizontal rule */}
          <div style={{ margin: '20px 0 32px 0', height: '1px', backgroundColor: 'rgba(200, 146, 42, 0.35)' }} />
        </header>

        {/* Insight cards */}
        <div className="flex flex-col gap-4">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>

        {/* Cross-links */}
        <aside style={{ marginTop: '48px' }} className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span style={{ color: '#c8922a', marginRight: '8px' }}>→</span>
            <Link href="/blog" className="text-primary hover:underline">
              Read related articles on the Blog
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            <span style={{ color: '#c8922a', marginRight: '8px' }}>→</span>
            <Link href="/learn" className="text-primary hover:underline">
              Browse the Learning Centre for deeper explanations
            </Link>
          </p>
        </aside>
      </div>
    </PageLayout>
  );
}
