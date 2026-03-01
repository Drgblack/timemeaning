"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { searchAbbreviations, isAmbiguous, type AbbreviationData } from "@/lib/timezone-abbreviations";
import AdSlot from "@/components/AdSlot";

// Calculate max spread between meanings
function calculateMaxSpread(data: AbbreviationData): { hours: number; formatted: string } | null {
  if (data.meanings.length < 2) return null;
  
  // Parse offsets to minutes
  const offsetsInMinutes: number[] = [];
  
  data.meanings.forEach(m => {
    // Extract primary offset (before any comma or "summer/winter")
    const offsetMatch = m.offset.match(/UTC([+−-])(\d+)(?::(\d+))?/);
    if (offsetMatch) {
      const sign = offsetMatch[1] === '+' ? 1 : -1;
      const hours = parseInt(offsetMatch[2], 10);
      const minutes = parseInt(offsetMatch[3] || '0', 10);
      offsetsInMinutes.push(sign * (hours * 60 + minutes));
    }
  });
  
  if (offsetsInMinutes.length < 2) return null;
  
  const minOffset = Math.min(...offsetsInMinutes);
  const maxOffset = Math.max(...offsetsInMinutes);
  const spreadMinutes = maxOffset - minOffset;
  const spreadHours = spreadMinutes / 60;
  
  const hours = Math.floor(spreadHours);
  const minutes = Math.round((spreadHours - hours) * 60);
  
  return {
    hours: spreadHours,
    formatted: minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`
  };
}

// Get risk level based on spread
function getRiskLevel(spreadHours: number): { label: string; color: string } {
  if (spreadHours >= 10) return { label: "CRITICAL", color: "#ef4444" };
  if (spreadHours >= 5) return { label: "HIGH", color: "#e07830" };
  if (spreadHours >= 3) return { label: "MODERATE", color: "#c8922a" };
  return { label: "LOW", color: "#4ade80" };
}

// Render offset position on a scale
function OffsetScale({ offset }: { offset: string }) {
  // Parse offset to minutes
  const match = offset.match(/UTC([+−-])(\d+)(?::(\d+))?/);
  if (!match) return null;
  
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3] || '0', 10);
  const totalMinutes = sign * (hours * 60 + minutes);
  
  // Scale: -12 hours to +14 hours = -720 to +840 minutes
  // Position: 0% = -720, 100% = +840
  const position = ((totalMinutes + 720) / 1560) * 100;
  
  return (
    <div className="relative h-2 bg-[#1a1a1a] rounded-full mt-3">
      {/* Zero marker */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-text-muted/30"
        style={{ left: `${(720 / 1560) * 100}%` }}
      />
      {/* Position marker */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
        style={{ left: `${Math.max(0, Math.min(100, position))}%`, marginLeft: '-6px' }}
      />
    </div>
  );
}

function LookupContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<AbbreviationData[]>([]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setResults(searchAbbreviations(initialQuery));
    }
  }, [initialQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setResults(searchAbbreviations(value));
  };

  return (
    <>
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight">
          Abbreviation Lookup
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-lg mx-auto">
          What does IST, CST, BST, or EST actually mean? Every interpretation, every UTC offset.
        </p>
      </header>

      <AdSlot slot="tool-mid" />

      {/* Input - full width, large 56px height on mobile */}
      <div className="max-w-md mx-auto mb-10 px-4 sm:px-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="IST, CST, BST..."
            className="
              w-full h-14 pl-12 pr-4
              font-mono text-lg sm:text-xl text-center text-foreground
              bg-input border-2 border-input-border rounded-md
              placeholder:text-input-placeholder placeholder:text-sm
              focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(200,146,42,0.15)]
              transition-all duration-150
            "
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {results.map((data) => {
            const ambiguous = isAmbiguous(data);
            const spread = calculateMaxSpread(data);
            const risk = spread ? getRiskLevel(spread.hours) : null;
            
            return (
              <div 
                key={data.abbreviation}
                className="bg-surface border border-border rounded-md overflow-hidden"
              >
                {/* Abbreviation header */}
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <span className="font-mono text-3xl text-primary">
                    {data.abbreviation}
                  </span>
                  {ambiguous ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/15 text-primary">
                      AMBIGUOUS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-dst-active/15 text-dst-active">
                      UNAMBIGUOUS
                    </span>
                  )}
                </div>

                {/* Meanings */}
                <div className="divide-y divide-border">
                  {data.meanings.map((meaning, i) => (
                    <div key={i} className="px-5 py-4">
                      <h3 className="font-sans font-medium text-foreground text-lg mb-3">
                        {meaning.name}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <span className="text-text-muted w-20 shrink-0">Offset:</span>
                          <code className="font-mono text-primary bg-[#1a1a1a] px-3 py-1 rounded text-sm">
                            {meaning.offset}
                          </code>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-text-muted w-20 shrink-0">DST:</span>
                          <span className={`text-text-secondary ${
                            meaning.dst === "observes" ? "text-dst-active" : 
                            meaning.dst === "seasonal" ? "text-primary" : ""
                          }`}>
                            {meaning.dst === "observes" && "Observes DST"}
                            {meaning.dst === "does not observe" && "No DST observed"}
                            {meaning.dst === "seasonal" && "Seasonal (summer only)"}
                          </span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-text-muted w-20 shrink-0">Used in:</span>
                          <span className="text-text-secondary">{meaning.regions}</span>
                        </p>
                        {meaning.note && (
                          <p className="mt-2 text-xs text-text-muted italic">
                            {meaning.note}
                          </p>
                        )}
                        
                        {/* Offset scale - hidden on mobile, text only */}
                        <div className="hidden sm:block">
                          <OffsetScale offset={meaning.offset} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spread summary for ambiguous */}
                {ambiguous && spread && risk && (
                  <div className="px-5 py-4 bg-[#0f0f0d] border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                        Maximum Spread
                      </span>
                      <span 
                        className="font-mono text-sm px-2 py-0.5 rounded"
                        style={{ backgroundColor: `${risk.color}20`, color: risk.color }}
                      >
                        {risk.label} RISK
                      </span>
                    </div>
                    <p className="font-mono text-lg text-primary mb-3">{spread.formatted}</p>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Using {data.abbreviation} without specifying which {data.abbreviation} can result in a {spread.formatted.replace('hours', 'hour').replace('minutes', 'minute')} error. Always use UTC offset or full timezone name.
                    </p>
                  </div>
                )}

                {/* Safe note for unambiguous */}
                {!ambiguous && (
                  <div className="px-5 py-4 bg-dst-active/5 border-t border-dst-active/20">
                    <p className="text-xs text-dst-active leading-relaxed">
                      {data.abbreviation} is one of the few major timezone abbreviations with only one valid interpretation. It is safe to use in written communication.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">
            No matching abbreviation found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-text-muted mt-2">
            Try common abbreviations like IST, CST, BST, EST, PST, or GMT
          </p>
        </div>
      )}

      {/* Initial state */}
      {!query && (
        <div className="text-center py-12">
          <p className="text-text-muted">
            Type a timezone abbreviation above to see all possible meanings
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
            {["IST", "CST", "BST", "EST", "PST", "GMT"].map(abbr => (
              <button
                key={abbr}
                onClick={() => {
                  setQuery(abbr);
                  setResults(searchAbbreviations(abbr));
                }}
                className="px-4 py-2 min-h-[44px] font-mono text-sm bg-card border border-border rounded hover:border-primary transition-colors"
              >
                {abbr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="max-w-md mx-auto mt-10">
        <ShareButtons 
          label="SHARE THIS TOOL" 
          shareText="What does that timezone abbreviation actually mean? Most have multiple conflicting meanings. Look them up here:"
        />
      </div>

      {/* Footer links */}
      <div className="mt-10 pt-8 border-t border-border text-center space-y-3">
        <p>
          <Link 
            href="/learn/ambiguous-timezone-abbreviations" 
            className="text-sm text-primary hover:underline"
          >
            Read the full ambiguity glossary →
          </Link>
        </p>
        <p className="text-sm text-text-muted">
          Not finding your abbreviation?{" "}
          <Link href="/" className="text-primary hover:underline">
            Paste the full time reference into the main tool →
          </Link>
        </p>
      </div>

      {/* Privacy note */}
      <p className="mt-8 text-xs text-text-muted text-center">
        All lookups run in your browser. No data is sent to any server.
      </p>
    </>
  );
}

export default function LookupPage() {
  return (
    <PageLayout>
      <Link 
        href="/tools" 
        className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
      >
        ← Back to Tools
      </Link>
      <Suspense fallback={
        <div className="text-center py-12">
          <p className="text-text-muted">Loading...</p>
        </div>
      }>
        <LookupContent />
      </Suspense>
    </PageLayout>
  );
}
