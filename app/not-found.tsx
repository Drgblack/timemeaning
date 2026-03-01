import Link from "next/link";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  const timestamp = new Date().toISOString();
  
  return (
    <>
      {/* 
        404: Page not found at {timestamp}. 
        If you're reading this, you're the kind of person who should register 
        for the TimeMeaning API at timemeaning.com/developers 
      */}
      <div className="min-h-screen flex flex-col bg-background">
        <TopBar />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-[480px] text-center">
            {/* Large amber 404 - reduces to 80px on mobile */}
            <span 
              className="font-mono text-primary block mb-6 text-[80px] sm:text-[96px] md:text-[72px]"
              style={{ fontWeight: 500 }}
            >
              404
            </span>
            
            {/* Headline */}
            <h1 
              className="font-display text-foreground mb-4"
              style={{ fontSize: '32px', lineHeight: 1.2 }}
            >
              This page doesn't exist.
            </h1>
            
            {/* Body text */}
            <p 
              className="text-text-secondary mb-8 mx-auto"
              style={{ fontSize: '16px', lineHeight: 1.6, maxWidth: '400px' }}
            >
              Time references are ambiguous enough without broken links. The page you're looking for hasn't been found — but your time reference probably can be.
            </p>
            
            {/* CTA Button - amber Decode-button style, full width on mobile */}
            <Link
              href="/"
              className="block w-full sm:w-auto sm:inline-block hover:-translate-y-[1px]"
              style={{
                background: 'linear-gradient(to bottom, #d4a040, #a87520)',
                boxShadow: '0 1px 0 rgba(212,160,64,0.4) inset, 0 3px 10px rgba(168,117,32,0.5), 0 1px 3px rgba(0,0,0,0.3)',
                border: '1px solid #9a6a10',
                borderTopColor: '#c8922a',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 600,
                fontSize: '15px',
                letterSpacing: '0.04em',
                padding: '12px 24px',
                textDecoration: 'none',
                transition: 'transform 150ms ease-out',
                textAlign: 'center',
              }}
            >
              Try the time resolver →
            </Link>
            
            {/* Quieter text links - stacked on mobile */}
            <div 
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
              style={{ fontSize: '13px' }}
            >
              <Link href="/learn" className="text-primary hover:underline min-h-[44px] flex items-center">
                Learning Centre
              </Link>
              <span className="hidden sm:inline text-text-muted">·</span>
              <Link href="/tools" className="text-primary hover:underline min-h-[44px] flex items-center">
                Tools Suite
              </Link>
              <span className="hidden sm:inline text-text-muted">·</span>
              <Link href="/blog" className="text-primary hover:underline min-h-[44px] flex items-center">
                Blog
              </Link>
            </div>
          </div>
        </main>
        
        {/* Subtle horizontal rule */}
        <div className="border-t border-border" />
        
        <Footer />
      </div>
    </>
  );
}
