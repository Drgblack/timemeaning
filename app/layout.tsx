import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/lib/theme/context';
import { CookieConsentProvider } from '@/components/cookie-consent';
import { DebugDiagnostic } from '@/components/debug-diagnostic';
import { AdSenseLoader } from '@/components/adsense-loader';
import ChatButton from '@/components/ChatButton';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TimeMeaning — Understand any time reference instantly',
  description:
    'Paste any time reference — ambiguous abbreviations, relative expressions, Unix timestamps — and get a plain-English interpretation with every assumption shown. Free, no account required.',
  keywords: [
    'time interpretation',
    'timezone converter',
    'ambiguous time',
    'DST',
    'time reference',
    'EST to UTC',
    'time zone converter',
    'what time is',
  ],
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'TimeMeaning — Understand any time reference instantly',
    description:
      'Paste any time reference — ambiguous abbreviations, relative expressions, Unix timestamps — and get a plain-English interpretation with every assumption shown. Free, no account required.',
    type: 'website',
    siteName: 'TimeMeaning',
    images: [
      {
        url: 'https://timemeaning.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TimeMeaning — Understand any time reference instantly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeMeaning — Understand any time reference instantly',
    description:
      'Paste any time reference — ambiguous abbreviations, relative expressions, Unix timestamps — and get a plain-English interpretation with every assumption shown. Free, no account required.',
    images: ['https://timemeaning.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://timemeaning.com',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#c8922a' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1916' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        
        

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TimeMeaning" />

        {/* RSS Feed autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="TimeMeaning Blog" href="/feed.xml" />

        {/* Google Consent Mode v2 - using native script for SSR compatibility */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500});try{var c=localStorage.getItem('tm_consent');if(c==='full'){gtag('consent','update',{'ad_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','analytics_storage':'granted'});}else if(c==='essential'){gtag('consent','update',{'analytics_storage':'granted'});}else if(c==='custom'){var p=JSON.parse(localStorage.getItem('tm_consent_prefs')||'{}');if(p.advertising){gtag('consent','update',{'ad_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','analytics_storage':'granted'});}else if(p.analytics){gtag('consent','update',{'analytics_storage':'granted'});}}}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <CookieConsentProvider>
            {children}
            <DebugDiagnostic />
            <AdSenseLoader />
          </CookieConsentProvider>
        </ThemeProvider>
        <Analytics />
        <ChatButton />
      </body>
    </html>
  );
}




