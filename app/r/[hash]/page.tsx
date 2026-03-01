import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getResult, type StoredResult } from "@/lib/result-store";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import type { EasterEggResult } from "@/lib/easter-eggs";

interface PageProps {
  params: Promise<{ hash: string }>;
}

// Check if result is an Easter Egg
function isEasterEgg(interpretation: StoredResult['interpretation']): interpretation is EasterEggResult {
  return 'isEasterEgg' in interpretation && interpretation.isEasterEgg === true;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hash } = await params;
  const stored = getResult(hash);
  
  if (!stored) {
    return {
      title: "Result Not Found — TimeMeaning",
    };
  }

  const interpretation = stored.interpretation;
  const isEgg = isEasterEgg(interpretation);
  
  const title = isEgg 
    ? `${interpretation.interpretedTime} — Verified by TimeMeaning`
    : `${interpretation.interpretedDate} at ${interpretation.interpretedTime} — Verified by TimeMeaning`;
  
  const description = isEgg
    ? `"${interpretation.detectedPhrase}" resolved. ${interpretation.plainEnglish.substring(0, 150)}...`
    : `"${stored.inputText}" resolved to ${interpretation.interpretedDate} at ${interpretation.interpretedTime} ${interpretation.timezone}. Assumptions shown.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "TimeMeaning",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ShareableResultPage({ params }: PageProps) {
  const { hash } = await params;
  const stored = getResult(hash);

  if (!stored) {
    notFound();
  }

  const interpretation = stored.interpretation;
  const isEgg = isEasterEgg(interpretation);
  const generatedDate = new Date(stored.generatedAt);
  const formattedGeneratedDate = generatedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedGeneratedTime = generatedDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Shared Top Bar - identical to all pages */}
      <TopBar />

      <main className="flex-1 max-w-[680px] mx-auto px-4 py-12 w-full">
        {/* Hero block */}
        <div className={`rounded-lg overflow-hidden ${isEgg ? 'bg-[#1a1a1a]' : 'bg-surface'}`}>
          {/* Easter Egg badge */}
          {isEgg && (
            <div className="px-6 pt-4 flex justify-end">
              <span className="font-mono text-[10px] text-[#c8922a] uppercase tracking-wider">
                Easter Egg Detected
              </span>
            </div>
          )}

          {/* Verified label */}
          <div className="px-6 pt-6">
            <span className={`font-mono text-xs uppercase tracking-wider ${isEgg ? 'text-[#c8922a]' : 'text-primary'}`}>
              Verified Time Interpretation
            </span>
          </div>

          {/* Original phrase - terminal style */}
          <div className="px-6 pt-4">
            <div className={`font-mono text-sm px-4 py-3 rounded ${isEgg ? 'bg-[#0f0f0e] text-[#c8922a]' : 'bg-[#1a1a1a] text-[#c8922a]'}`}>
              &ldquo;{isEgg ? interpretation.detectedPhrase : stored.inputText}&rdquo;
            </div>
          </div>

          {/* Resolved time - the headline */}
          <div className="px-6 pt-6 pb-6">
            <h1 className={`font-display text-[40px] sm:text-[48px] leading-tight ${isEgg ? 'text-[#f0ece6]' : 'text-foreground'}`}>
              {isEgg ? interpretation.interpretedTime : `${interpretation.interpretedDate} at ${interpretation.interpretedTime}`}
            </h1>
          </div>

          {/* Inline facts row */}
          <div className={`px-6 pb-6 ${isEgg ? 'border-t border-[#3a3730]' : 'border-t border-border'} pt-4`}>
            <div className={`font-mono text-xs ${isEgg ? 'text-[#a09890]' : 'text-text-muted'} flex flex-wrap gap-x-2`}>
              <span>{isEgg ? interpretation.timezone : `${interpretation.timezone} (${interpretation.utcOffset})`}</span>
              <span className={isEgg ? 'text-[#6a6460]' : 'text-text-muted/50'}>·</span>
              <span>DST: {isEgg ? interpretation.dstStatus.split('.')[0] : (interpretation.isDstActive ? 'Active' : 'Inactive')}</span>
              <span className={isEgg ? 'text-[#6a6460]' : 'text-text-muted/50'}>·</span>
              <span>ISO: {isEgg ? interpretation.isoFormat.split(' ')[0] : interpretation.isoTimestamp}</span>
            </div>
          </div>
        </div>

        {/* Plain English - for Easter Eggs */}
        {isEgg && (
          <div className="mt-8 p-6 bg-surface border border-border rounded-lg">
            <h2 className="font-mono text-xs text-primary uppercase tracking-wider mb-4">
              Plain English
            </h2>
            <p className="text-foreground leading-relaxed">
              {interpretation.plainEnglish}
            </p>
          </div>
        )}

        {/* Assumptions block */}
        <div className="mt-8 p-6 bg-surface border border-border border-l-[3px] border-l-primary rounded-lg">
          <h2 className="font-mono text-xs text-primary uppercase tracking-wider mb-4">
            Assumptions Made
          </h2>
          <ul className="space-y-2">
            {(isEgg ? interpretation.assumptions : interpretation.assumptions).map((assumption, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-primary select-none">›</span>
                {assumption}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-muted italic">
            These assumptions were inferred from context. If any assumption is incorrect, the original sender should clarify.
          </p>
        </div>

        {/* Verification stamp */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <span className="font-display text-lg text-foreground">TimeMeaning</span>
              <p className="mt-2 text-sm text-text-secondary">
                Interpretation generated {formattedGeneratedDate} at {formattedGeneratedTime}
              </p>
              <p className="mt-2 text-sm text-text-muted">
                This interpretation applies the correct DST rules for the specific date referenced. It is timezone-aware and daylight-saving-accurate.
              </p>
            </div>
          </div>
        </div>

        {/* Contextual learning link */}
        {!isEgg && (
          <div className="mt-8">
            <h2 className="font-mono text-xs text-primary uppercase tracking-wider mb-2">
              Understand This Result
            </h2>
            <Link 
              href="/learn/understanding-utc-offsets"
              className="text-sm text-primary hover:underline"
            >
              Why UTC offsets are more reliable than timezone names →
            </Link>
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="
              flex-1 py-3 px-6
              bg-primary text-primary-foreground
              font-sans text-sm font-medium text-center
              rounded-md
              hover:bg-primary-hover
              transition-colors
            "
          >
            Resolve your own time reference →
          </Link>
          <Link
            href="/tools/lookup"
            className="
              flex-1 py-3 px-6
              bg-transparent text-foreground
              font-sans text-sm font-medium text-center
              border border-border rounded-md
              hover:bg-surface hover:border-border-strong
              transition-colors
            "
          >
            Look up timezone abbreviations →
          </Link>
        </div>

        {/* Trust note */}
        <p className="mt-8 text-xs text-text-muted text-center">
          TimeMeaning is a free public utility. No account required. No data stored. This link does not expire.
        </p>
      </main>

      <Footer />
    </div>
  );
}
