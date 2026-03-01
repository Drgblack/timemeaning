"use client";

import { useConsent } from "@/components/cookie-consent";

export function Footer() {
  const { openPreferencesModal } = useConsent();

  return (
    <footer 
      className="mt-auto transition-colors duration-200"
      style={{
        background: '#1a1a1a',
        borderTop: '1px solid rgba(200,146,42,0.2)',
        padding: '40px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
        {/* Privacy statement */}
        <p 
          className="text-[13px] mb-6 text-center sm:text-left"
          style={{ color: '#8a8278', maxWidth: '560px' }}
        >
          TimeMeaning does not store the text you paste. Timezone rules sourced from the IANA Time Zone Database.
        </p>

        {/* Links - two rows */}
        <nav 
          className="flex flex-wrap justify-center sm:justify-start text-[13px]"
          style={{ gap: '12px', rowGap: '8px' }}
        >
          <a
            href="/learn"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Learn
          </a>
          <a
            href="/examples"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Examples
          </a>
          <a
            href="/tools"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Tools
          </a>
          <a
            href="/insights"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Insights
          </a>
          <a
            href="/about"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            About
          </a>
          <a
            href="/how-it-works"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            How it works
          </a>
          <a
            href="/blog"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Blog
          </a>
          <a
            href="/developers"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            API
          </a>
          <a
            href="/privacy"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Privacy
          </a>
          <a
            href="/glossary"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Glossary
          </a>
          <a
            href="/faq"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            FAQ
          </a>
          <a
            href="/changelog"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Changelog
          </a>
          <a
            href="/terms"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Terms
          </a>
          <button
            onClick={openPreferencesModal}
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Cookie Preferences
          </button>
          <a
            href="/stats"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Stats
          </a>
          <a
            href="/contact"
            className="transition-colors"
            style={{ color: '#8a8278' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8a8278'}
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
