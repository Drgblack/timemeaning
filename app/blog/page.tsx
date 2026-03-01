import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Blog — TimeMeaning",
  description: "Articles on timezone confusion, scheduling errors, and the hidden complexity of time.",
  openGraph: {
    title: "Blog — TimeMeaning",
    description: "Articles on timezone confusion, scheduling errors, and the hidden complexity of time.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — TimeMeaning",
    description: "Articles on timezone confusion, scheduling errors, and the hidden complexity of time.",
  },
};

const articles = [
  {
    slug: "cst-trap",
    title: "The CST Trap: How a Single Abbreviation Can Be 13 Hours Off",
    description: "Two time zones share the abbreviation CST — and the difference between them is fourteen hours.",
    date: "February 2026",
    year: 2026,
    readTime: "6 min",
    decorativeText: "CST",
  },
  {
    slug: "dst-no-mans-land",
    title: "The DST No Man's Land: Why March and November Break International Teams",
    description: "The US and Europe change clocks on different days, creating a multi-week window of offset confusion.",
    date: "February 2026",
    year: 2026,
    readTime: "7 min",
    decorativeText: "DST",
  },
  {
    slug: "search-engines-lie",
    title: "Why Search Engines Lie to You About Time",
    description: "Google resolves ambiguous timezone abbreviations silently, without telling you which one it assumed.",
    date: "February 2026",
    year: 2026,
    readTime: "5 min",
    decorativeText: "?",
  },
  {
    slug: "3pm-ist-disaster",
    title: "The 3pm IST Disaster: A Story About a Missed Pitch",
    description: "A composite fiction about two professionals who read the same abbreviation and understood it differently.",
    date: "January 2026",
    year: 2026,
    readTime: "8 min",
    decorativeText: "IST",
  },
  {
    slug: "stop-asking-what-time",
    title: "Stop Asking \"What Time Is It There?\" — Meaning Matters More Than Conversion",
    description: "Conversion tells you the equivalent of a time you already understand. Interpretation tells you what a time means.",
    date: "January 2026",
    year: 2026,
    readTime: "5 min",
    decorativeText: "UTC",
  },
  {
    slug: "log-file-limbo",
    title: "Log File Limbo: The Hidden Tax of UTC Timestamps in a Crisis",
    description: "The cognitive cost of converting UTC log timestamps to local time during a severity-one incident.",
    date: "January 2026",
    year: 2026,
    readTime: "6 min",
    decorativeText: "LOG",
  },
  {
    slug: "history-of-messy-time",
    title: "The History of Messy Time: How Railways, Wars, and Politics Built the Timezone Map",
    description: "The timezone map is not a clean engineering artefact — it is a geological record of political decisions.",
    date: "December 2025",
    year: 2025,
    readTime: "9 min",
    decorativeText: "1884",
  },
  {
    slug: "timezone-anxiety",
    title: "Remote Work's Silent Productivity Killer: Timezone Anxiety",
    description: "A distributed team of twenty people can lose hundreds of hours per year to timezone double-checking.",
    date: "December 2025",
    year: 2025,
    readTime: "6 min",
    decorativeText: "TZ",
  },
  {
    slug: "death-of-the-dropdown",
    title: "The Death of the Dropdown: Why \"Select Your City\" Is a UX Failure",
    description: "The standard timezone dropdown was designed for settings panels, not for resolving ambiguous input.",
    date: "November 2025",
    year: 2025,
    readTime: "5 min",
    decorativeText: "UX",
  },
  {
    slug: "universal-time-vs-human-time",
    title: "Universal Time vs. Human Time: Why UTC and Natural Language Will Always Conflict",
    description: "Humans will continue to write 'next Tuesday morning' because it communicates what they mean to other humans.",
    date: "November 2025",
    year: 2025,
    readTime: "7 min",
    decorativeText: "vs",
  },
];

// Get featured article (most recent)
const featuredArticle = articles[0];
const remainingArticles = articles.slice(1);

// Group remaining articles by year
const articlesByYear = remainingArticles.reduce((acc, article) => {
  if (!acc[article.year]) {
    acc[article.year] = [];
  }
  acc[article.year].push(article);
  return acc;
}, {} as Record<number, typeof articles>);

const years = Object.keys(articlesByYear).map(Number).sort((a, b) => b - a);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "TimeMeaning", url: "https://timemeaning.com" },
  { name: "Blog", url: "https://timemeaning.com/blog" }
]);

export default function BlogPage() {
  return (
  <PageLayout>
  <JsonLd data={breadcrumbSchema} />
  <div className="max-w-2xl">
        {/* Page header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-foreground font-medium tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Articles on timezone confusion, scheduling errors, and the hidden complexity of time.
          </p>
          {/* Amber horizontal rule */}
          <div className="mt-6 h-px" style={{ backgroundColor: 'rgba(200, 146, 42, 0.5)' }} />
        </header>

        {/* Featured article - full width card */}
        <Link 
          href={`/blog/${featuredArticle.slug}`}
          className="group block mb-12 rounded-lg overflow-hidden relative"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <div className="p-6 sm:p-8 relative z-10">
            <div className="max-w-md">
              <h2 
                className="font-serif text-xl sm:text-2xl leading-tight mb-3 group-hover:opacity-80 transition-opacity"
                style={{ color: '#f5f0e8' }}
              >
                {featuredArticle.title}
              </h2>
              <p 
                className="text-sm sm:text-[15px] leading-relaxed mb-4"
                style={{ color: '#8a8278' }}
              >
                {featuredArticle.description}
              </p>
              <span 
                className="font-mono text-xs tracking-wide"
                style={{ color: '#c8922a' }}
              >
                {featuredArticle.readTime} read
              </span>
              <span 
                className="block mt-3 text-sm"
                style={{ color: '#c8922a' }}
              >
                Read article →
              </span>
            </div>
          </div>
          {/* Decorative oversized text - hidden on mobile */}
          <div 
            className="hidden sm:block absolute top-1/2 right-4 sm:right-8 -translate-y-1/2 font-mono select-none pointer-events-none"
            style={{ 
              fontSize: '100px',
              lineHeight: 1,
              color: '#c8922a',
              opacity: 0.12,
            }}
          >
            {featuredArticle.decorativeText}
          </div>
        </Link>

        {/* Article list container with narrower width */}
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Section label */}
        <div className="mb-6">
          <span 
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: '#c8922a' }}
          >
            All Articles
          </span>
        </div>

        {/* Hall of Confusion featured entry */}
        <Link 
          href="/hall-of-confusion"
          className="group block mb-8 py-4 px-4 rounded-sm -mx-4"
          style={{ 
            backgroundColor: 'rgba(200, 146, 42, 0.08)',
            borderLeft: '3px solid #c8922a',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-serif text-[17px] text-foreground font-medium mb-1.5 group-hover:text-primary transition-colors">
                <span style={{ color: '#c8922a', marginRight: '6px' }}>→</span>
                The Hall of Confusion — 15 time references more ambiguous than you think
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The most genuinely confusing time references we{"'"}ve encountered, resolved and explained.
              </p>
            </div>
            <span 
              className="font-mono text-[10px] uppercase tracking-wider whitespace-nowrap mt-1 sm:mt-0"
              style={{ color: '#c8922a' }}
            >
              Featured
            </span>
          </div>
        </Link>

        {/* Articles grouped by year */}
        {years.map((year) => (
          <section key={year} className="mb-10">
            {/* Year marker */}
            <div className="mb-4 pb-2 border-b border-border dark:border-[#2a2520]">
              <span 
                className="blog-year-marker font-mono text-xs uppercase tracking-wider"
              >
                {year}
              </span>
            </div>
            
            {/* Article list */}
            <div>
              {articlesByYear[year].map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="blog-article-entry group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-4 border-b border-[#e8e4de] dark:border-[#2a2520] hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="blog-article-title font-serif text-[17px] font-medium mb-1.5 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="blog-article-description text-sm leading-relaxed mb-1">
                      {article.description}
                    </p>
                    <span className="blog-article-date text-xs">
                      {article.date}
                    </span>
                  </div>
                  {/* Read time - desktop */}
                  <span 
                    className="hidden sm:block font-mono text-xs tracking-wide whitespace-nowrap mt-1"
                    style={{ color: '#c8922a' }}
                  >
                    {article.readTime}
                  </span>
                  {/* Read time - mobile */}
                  <span 
                    className="sm:hidden font-mono text-xs tracking-wide"
                    style={{ color: '#c8922a' }}
                  >
                    {article.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Cross-links */}
        <aside className="mt-16 pt-8 border-t border-border space-y-2">
          <p className="text-sm text-muted-foreground">
            <span style={{ color: '#c8922a', marginRight: '8px' }}>→</span>
            Browse the{" "}
            <Link href="/learn" className="text-primary hover:underline">
              Learning Centre
            </Link>{" "}
            for deeper explanations
          </p>
          <p className="text-sm text-muted-foreground">
            <span style={{ color: '#c8922a', marginRight: '8px' }}>→</span>
            Read{" "}
            <Link href="/insights" className="text-primary hover:underline">
              Insights
            </Link>{" "}
            for data-driven analysis
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            {/* RSS Icon */}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="#f26522"
              className="mr-2 flex-shrink-0"
              aria-hidden="true"
            >
              <rect width="24" height="24" rx="4" fill="#f26522"/>
              <circle cx="6" cy="18" r="2.5" fill="white"/>
              <path d="M4 11a7 7 0 0 1 7 7h-2.5a4.5 4.5 0 0 0-4.5-4.5V11z" fill="white"/>
              <path d="M4 5a13 13 0 0 1 13 13h-2.5a10.5 10.5 0 0 0-10.5-10.5V5z" fill="white"/>
            </svg>
            <Link href="/feed.xml" className="text-primary hover:underline">
              Subscribe via RSS
            </Link>
          </p>
        </aside>
        </div>{/* End of narrower article list container */}
      </div>
    </PageLayout>
  );
}
