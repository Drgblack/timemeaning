"use client";

import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons, MobileShareBar } from "@/components/share-buttons";
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema } from "@/components/json-ld";
import AdSlot from "@/components/AdSlot";

interface RelatedArticle {
  slug: string;
  title: string;
  description: string;
  readTime: string;
}

interface BlogArticleProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  datePublished: string; // ISO format YYYY-MM-DD
  readTime: string;
  relatedLearnArticle?: {
    slug: string;
    title: string;
  };
  relatedArticles?: RelatedArticle[];
  children: React.ReactNode;
}

export function BlogArticle({ 
  title, 
  description,
  slug,
  date, 
  datePublished,
  readTime,
  relatedLearnArticle,
  relatedArticles = [],
  children 
}: BlogArticleProps) {
  const articleSchema = generateArticleSchema({
    title,
    description,
    slug,
    datePublished,
    section: "blog"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "Blog", url: "https://timemeaning.com/blog" },
    { name: title, url: `https://timemeaning.com/blog/${slug}` }
  ]);

  return (
    <PageLayout>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="max-w-[680px]">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-block text-sm text-text-secondary font-sans hover:text-foreground transition-colors mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-8">
          {/* Small amber label */}
          <span 
            className="article-breadcrumb font-mono text-[10px] uppercase tracking-wider block mb-4"
            style={{ color: '#c8922a' }}
          >
            TimeMeaning — Blog
          </span>
          
          {/* Headline */}
          <h1 
            className="font-serif text-[28px] sm:text-[36px] text-foreground tracking-tight leading-tight mb-4"
            style={{ maxWidth: '100%' }}
          >
            {title}
          </h1>
          
          {/* Description / standfirst */}
          <p 
            className="text-lg italic leading-relaxed mb-4 dark:text-[#c8c0b0]"
            style={{ color: '#6a6560', maxWidth: '560px' }}
          >
            {description}
          </p>
          
          {/* Metadata line */}
          <div className="article-metadata flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: '#c8922a' }}>
              {readTime} read
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-xs" style={{ color: '#c8922a' }}>
              {date}
            </span>
          </div>
          
          {/* Amber horizontal rule */}
          <div className="mt-6 h-px" style={{ backgroundColor: 'rgba(200, 146, 42, 0.4)' }} />
        </header>
        
        {/* Ad slot below headline */}
        <AdSlot slot="blog-headline" format="leaderboard" />

        {/* Article body with custom typography */}
        <div 
          className="blog-article-body font-sans"
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
          
          {/* Contextual learning link */}
          {relatedLearnArticle && (
            <div className="mb-8">
              <span 
                className="font-mono text-[10px] uppercase tracking-wider block mb-2"
                style={{ color: '#c8922a' }}
              >
                Go Deeper
              </span>
              <Link 
                href={`/learn/${relatedLearnArticle.slug}`}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                → {relatedLearnArticle.title}
              </Link>
            </div>
          )}
          
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
                More From The Blog
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group block p-4 rounded-lg border border-border hover:border-primary/40 transition-colors"
                  >
                    <h3 className="font-serif text-sm text-foreground font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <span 
                      className="font-mono text-[10px]"
                      style={{ color: '#c8922a' }}
                    >
                      {article.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>

        {/* Add padding for mobile share bar */}
        <div className="h-14 md:hidden" />
      </article>

      {/* Mobile sticky share bar */}
      <MobileShareBar pageTitle={title} />

      {/* Scoped styles for article body */}
      <style jsx global>{`
        .blog-article-body > p:first-of-type {
          font-size: 18px;
        }
        
        .blog-article-body p {
          margin-bottom: 24px;
        }
        
        .blog-article-body h2 {
          font-family: var(--font-serif);
          font-size: 22px;
          color: #1a1a1a;
          margin-top: 40px;
          margin-bottom: 16px;
          font-weight: 500;
        }
        
        .blog-article-body h3 {
          font-size: 17px;
          font-weight: 600;
          color: #3a3530;
          margin-top: 28px;
          margin-bottom: 12px;
        }
        
        .blog-article-body code:not(pre code) {
          font-family: var(--font-mono);
          font-size: 14px;
          background-color: #1a1a1a;
          color: #c8922a;
          padding: 2px 6px;
          border-radius: 3px;
        }
        
        .blog-article-body pre {
          background-color: #0f0f0d;
          color: #c8922a;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 24px 0;
        }
        
        .blog-article-body blockquote {
          padding-left: 24px;
          border-left: 3px solid #c8922a;
          font-size: 20px;
          font-style: italic;
          color: #3a3530;
          margin: 32px 0;
        }
        
        /* Mobile: Pull quotes use top border instead of left border */
        @media (max-width: 639px) {
          .blog-article-body blockquote {
            padding-left: 0;
            padding-top: 16px;
            border-left: none;
            border-top: 3px solid #c8922a;
          }
        }
        
        .blog-article-body .key-term {
          background-color: #f5f0e8;
          border-left: 3px solid #c8922a;
          padding: 16px;
          border-radius: 8px;
          margin: 24px 0;
        }
        
        .blog-article-body a {
          color: #c8922a;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .blog-article-body a:hover {
          text-decoration: none;
        }
        
        .blog-article-body ul, .blog-article-body ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        .blog-article-body li {
          margin-bottom: 8px;
        }
        
        /* Dark mode styles */
        .dark .blog-article-body {
          color: #e8e4de;
        }
        
        .dark .blog-article-body > p:first-of-type {
          color: #f0ece6;
        }
        
        .dark .blog-article-body h2 {
          color: #f5f0e8;
        }
        
        .dark .blog-article-body h3 {
          color: #f0ece6;
        }
        
        .dark .blog-article-body blockquote {
          color: #e8e4de;
        }
        
        .dark .blog-article-body .key-term {
          background-color: #1f1e1c;
          color: #e8e4de;
        }
      `}</style>
    </PageLayout>
  );
}

// Helper components for article content
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

export function KeyTermBox({ children }: { children: React.ReactNode }) {
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
