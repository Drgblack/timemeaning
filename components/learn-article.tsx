"use client";

import Link from "next/link";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { ShareButtons, MobileShareBar } from "@/components/share-buttons";
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema } from "@/components/json-ld";
import AdSlot from "@/components/AdSlot";

type SectionLabel = "Foundations" | "For Teams & Managers" | "How the Tool Works" | "For Specialists";

interface RelatedTool {
  slug: string;
  name: string;
  description: string;
}

interface RelatedArticle {
  slug: string;
  title: string;
  readTime: string;
  type: "learn" | "blog";
}

interface LearnArticleProps {
  title: string;
  description: string;
  slug: string;
  section: SectionLabel;
  readTime: string;
  verifiedDate: string;
  datePublished?: string; // ISO format YYYY-MM-DD
  keyFacts?: string[];
  relatedTool?: RelatedTool;
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
}

export function LearnArticle({ 
  title, 
  description,
  slug,
  section,
  readTime,
  verifiedDate,
  datePublished = "2026-01-15",
  keyFacts,
  relatedTool,
  relatedArticles = [],
  children 
}: LearnArticleProps) {
  const articleSchema = generateArticleSchema({
    title,
    description,
    slug,
    datePublished,
    section: "learn"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "Learning Centre", url: "https://timemeaning.com/learn" },
    { name: title, url: `https://timemeaning.com/learn/${slug}` }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TopBar />
      
      <main id="main-content" className="flex-1">
        <div className="max-w-[680px] mx-auto px-4 py-12 sm:py-16">
          <article>
            {/* Back link */}
            <Link 
              href="/learn" 
              className="inline-block text-sm text-text-secondary font-sans hover:text-foreground transition-colors mb-8"
            >
              ← Back to Learning Centre
            </Link>

            {/* Article header */}
            <header className="mb-8">
              {/* Small amber label */}
              <span 
                className="article-breadcrumb font-mono text-[10px] uppercase tracking-wider block mb-2"
                style={{ color: '#c8922a' }}
              >
                TimeMeaning — Learning Centre
              </span>
              
              {/* Section label */}
              <span 
                className="text-[11px] uppercase tracking-wider block mb-4"
                style={{ color: '#8a8278' }}
              >
                {section}
              </span>
              
              {/* Headline */}
              <h1 
                className="font-serif text-[28px] sm:text-[36px] text-foreground tracking-tight leading-tight mb-4"
              >
                {title}
              </h1>
              
              {/* Description / standfirst */}
              <p 
                className="text-lg leading-relaxed mb-4 dark:text-[#c8c0b0]"
                style={{ color: '#6a6560' }}
              >
                {description}
              </p>
              
              {/* Metadata line */}
              <div className="article-metadata flex items-center gap-2">
                <span className="font-mono text-xs" style={{ color: '#c8922a' }}>
                  {readTime} read
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="verified-badge font-mono text-xs" style={{ color: '#c8922a' }}>
                  Verified {verifiedDate}
                </span>
              </div>
              
              {/* Amber horizontal rule */}
              <div className="mt-6 h-px" style={{ backgroundColor: 'rgba(200, 146, 42, 0.4)' }} />
            </header>
            
            {/* Ad slot below headline */}
            <AdSlot slot="learn-headline" format="leaderboard" />

            {/* Key facts box - appears near the top for data-heavy articles */}
            {keyFacts && keyFacts.length > 0 && (
              <div 
                className="mb-8 p-4 rounded-lg"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <span 
                  className="font-mono text-[10px] uppercase tracking-wider block mb-3"
                  style={{ color: '#c8922a' }}
                >
                  Key Facts
                </span>
                <ul className="space-y-1">
                  {keyFacts.map((fact, index) => (
                    <li 
                      key={index}
                      className="font-mono text-sm"
                      style={{ color: '#f5f0e8' }}
                    >
                      • {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article body with custom typography */}
            <div 
              className="learn-article-body font-sans"
              style={{ 
                fontSize: '16px',
                lineHeight: 1.75,
              }}
            >
              {children}
            </div>

            {/* Article footer */}
            <footer className="mt-12">
              {/* Amber horizontal rule */}
              <div className="mb-8 h-px" style={{ backgroundColor: 'rgba(200, 146, 42, 0.4)' }} />
              
              {/* Related tool */}
              {relatedTool && (
                <div className="mb-8">
                  <span 
                    className="font-mono text-[10px] uppercase tracking-wider block mb-2"
                    style={{ color: '#c8922a' }}
                  >
                    Related Tool
                  </span>
                  <Link 
                    href={`/tools/${relatedTool.slug}`}
                    className="group block p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                  >
                    <h3 className="font-sans text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {relatedTool.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {relatedTool.description}
                    </p>
                    <span 
                      className="text-xs"
                      style={{ color: '#c8922a' }}
                    >
                      Open tool →
                    </span>
                  </Link>
                </div>
              )}
              
              {/* Ask about this article */}
              <div 
                className="article-chat-prompt mb-8 p-4 rounded-lg border dark:bg-[#252220] dark:border-[#3a3530]"
                style={{ 
                  backgroundColor: 'rgba(200, 146, 42, 0.06)',
                  borderColor: 'rgba(200, 146, 42, 0.3)',
                  borderLeftWidth: '3px',
                  borderLeftColor: '#c8922a',
                }}
              >
                <span 
                  className="prompt-label font-mono text-[10px] uppercase tracking-wider block mb-2"
                  style={{ color: '#c8922a' }}
                >
                  Have a Question?
                </span>
                <button 
                  className="prompt-link text-sm font-sans hover:underline dark:text-[#f0ece6]"
                  style={{ color: '#c8922a' }}
                  onClick={() => {
                    // Future: Open AI chat assistant
                    window.location.href = '/contact';
                  }}
                >
                  Ask the TimeMeaning assistant →
                </button>
              </div>
              
              {/* Share component */}
              <ShareButtons 
                label="SHARE THIS ARTICLE" 
                pageTitle={title}
              />
              
              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-10">
                  <span 
                    className="font-mono text-[10px] uppercase tracking-wider block mb-4"
                    style={{ color: '#c8922a' }}
                  >
                    Continue Learning
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedArticles.slice(0, 2).map((article) => (
                      <Link
                        key={article.slug}
                        href={article.type === 'learn' ? `/learn/${article.slug}` : `/blog/${article.slug}`}
                        className="group block p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                      >
                        <h3 className="font-serif text-sm text-foreground font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-mono text-[10px]"
                            style={{ color: '#c8922a' }}
                          >
                            {article.readTime}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {article.type === 'learn' ? 'Learning Centre' : 'Blog'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </footer>

            {/* Add padding for mobile share bar */}
            <div className="h-14 md:hidden" />
          </article>
        </div>
      </main>

      {/* Mobile sticky share bar */}
      <MobileShareBar pageTitle={title} />

      <Footer />
      
      {/* Verified date note */}
      <div 
        className="text-center py-4 border-t border-border dark:bg-[#1a1916]"
        style={{ backgroundColor: '#faf8f5' }}
      >
        <p className="text-[10px] text-muted-foreground/60 dark:text-[#8a8278] max-w-xl mx-auto px-4">
          Timezone rules are sourced from the IANA Time Zone Database. DST transition dates are verified annually. 
          If you notice an error, please <Link href="/contact" className="underline hover:no-underline">contact us</Link>.
        </p>
      </div>

      {/* Scoped styles for article body */}
      <style jsx global>{`
        .learn-article-body > p:first-of-type {
          font-size: 18px;
        }
        
        .learn-article-body p {
          margin-bottom: 24px;
        }
        
        .learn-article-body h2 {
          font-family: var(--font-serif);
          font-size: 22px;
          color: #1a1a1a;
          margin-top: 40px;
          margin-bottom: 16px;
          font-weight: 500;
        }
        
        .learn-article-body h3 {
          font-size: 17px;
          font-weight: 600;
          color: #3a3530;
          margin-top: 28px;
          margin-bottom: 12px;
        }
        
        .learn-article-body code:not(pre code) {
          font-family: var(--font-mono);
          font-size: 14px;
          background-color: #1a1a1a;
          color: #c8922a;
          padding: 2px 6px;
          border-radius: 3px;
        }
        
        .learn-article-body pre {
          background-color: #0f0f0d;
          color: #c8922a;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 24px 0;
        }
        
        .learn-article-body blockquote {
          padding-left: 24px;
          border-left: 3px solid #c8922a;
          font-size: 20px;
          font-style: italic;
          color: #3a3530;
          margin: 32px 0;
        }
        
        /* Mobile: Pull quotes use top border instead of left border */
        @media (max-width: 639px) {
          .learn-article-body blockquote {
            padding-left: 0;
            padding-top: 16px;
            border-left: none;
            border-top: 3px solid #c8922a;
          }
        }
        
        .learn-article-body a {
          color: #c8922a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .learn-article-body a:hover {
          text-decoration: none;
        }
        
        .learn-article-body ul, .learn-article-body ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        .learn-article-body li {
          margin-bottom: 8px;
        }
        
        /* Dark mode styles */
        .dark .learn-article-body {
          color: #e8e4de;
        }
        
        .dark .learn-article-body > p:first-of-type {
          color: #f0ece6;
        }
        
        .dark .learn-article-body h2 {
          color: #f5f0e8;
        }
        
        .dark .learn-article-body h3 {
          color: #f0ece6;
        }
        
        .dark .learn-article-body blockquote {
          color: #e8e4de;
        }
      `}</style>
    </div>
  );
}

// Helper components for learning centre articles

export function KeyFactsBox({ facts }: { facts: string[] }) {
  return (
    <div 
      className="mb-8 p-4 rounded-lg"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <span 
        className="font-mono text-[10px] uppercase tracking-wider block mb-3"
        style={{ color: '#c8922a' }}
      >
        Key Facts
      </span>
      <ul className="space-y-1">
        {facts.map((fact, index) => (
          <li 
            key={index}
            className="font-mono text-sm"
            style={{ color: '#f5f0e8' }}
          >
            • {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TryItChip({ query, label }: { query: string; label: string }) {
  const encodedQuery = encodeURIComponent(query);
  
  return (
    <div 
      className="try-it-chip my-6 p-4 rounded-lg border w-full dark:bg-[#252220] dark:border-[#c8922a]/50"
      style={{ 
        backgroundColor: '#fdf6e8',
        borderColor: 'rgba(200, 146, 42, 0.4)',
      }}
    >
      <span 
        className="font-mono text-[10px] uppercase tracking-wider block mb-2"
        style={{ color: '#c8922a' }}
      >
        Try In The Tool
      </span>
      <Link
        href={`/?q=${encodedQuery}`}
        className="block w-full sm:inline-block sm:w-auto px-4 py-3 sm:px-3 sm:py-1.5 min-h-[48px] sm:min-h-0 rounded-md font-mono text-sm text-center sm:text-left transition-colors"
        style={{ 
          backgroundColor: '#1a1a1a',
          color: '#c8922a',
        }}
      >
        {label}
      </Link>
    </div>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote 
      className="dark:text-[#e8e4de]"
      style={{
        paddingLeft: '24px',
        borderLeft: '3px solid #c8922a',
        fontSize: '20px',
        fontStyle: 'italic',
        color: '#3a3530',
        margin: '32px 0',
      }}
    >
      {children}
    </blockquote>
  );
}

export function KeyTermBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div 
      className="key-term-box dark:bg-[#1f1e1c] dark:text-[#e8e4de]"
      style={{
        backgroundColor: '#f5f0e8',
        borderLeft: '3px solid #c8922a',
        padding: '16px',
        borderRadius: '8px',
        margin: '24px 0',
      }}
    >
      {title && (
        <strong className="block mb-2 dark:text-[#f0ece6]" style={{ color: '#1a1a1a' }}>
          {title}
        </strong>
      )}
      {children}
    </div>
  );
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre 
      style={{
        backgroundColor: '#0f0f0d',
        color: '#c8922a',
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        padding: '16px',
        borderRadius: '8px',
        overflowX: 'auto',
        margin: '24px 0',
      }}
    >
      {children}
    </pre>
  );
}

/**
 * Direct Answer Block - optimized for AI citation and featured snippets.
 * Provides a concise, quotable summary at the top of an article.
 */
export function DirectAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="direct-answer dark:bg-[#1f1a0f] dark:border-l-[#c8922a]"
      style={{
        backgroundColor: '#f5f0e8',
        borderLeft: '3px solid #c8922a',
        padding: '16px 20px',
        marginBottom: '32px',
        borderRadius: '0 4px 4px 0',
        fontSize: '15px',
        lineHeight: 1.7,
        color: '#3a3530',
      }}
    >
      {children}
    </div>
  );
}
