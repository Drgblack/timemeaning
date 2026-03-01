"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { 
  getStats, 
  resetStats, 
  getMostCommonAbbreviation, 
  getFormatBreakdown, 
  generateInsight,
  type TMStats 
} from "@/lib/stats";

export default function StatsPage() {
  const [stats, setStats] = useState<TMStats | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getStats());
  }, []);

  const handleReset = () => {
    resetStats();
    setStats(null);
    setShowResetConfirm(false);
  };

  if (!mounted) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <p className="text-text-secondary">Loading stats...</p>
        </div>
      </PageLayout>
    );
  }

  const mostCommon = stats ? getMostCommonAbbreviation(stats) : null;
  const formatBreakdown = stats ? getFormatBreakdown(stats) : [];
  const insight = stats ? generateInsight(stats) : null;
  
  const firstUsedDate = stats?.firstUsed 
    ? new Date(stats.firstUsed).toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    : '';

  const shareText = stats
    ? `I've resolved ${stats.totalResolutions} time references with TimeMeaning. ${stats.ambiguousCount} were ambiguous. ${mostCommon ? `My most common abbreviation was ${mostCommon.abbr}.` : ''} What's yours? timemeaning.com/stats`
    : '';

  const ogImageUrl = stats
    ? `https://timemeaning.com/og?type=stats&totalResolutions=${stats.totalResolutions}&ambiguousCount=${stats.ambiguousCount}&dstCases=${stats.dstCases}&mostSeenAbbr=${encodeURIComponent(mostCommon?.abbr || 'N/A')}&ghostDates=${stats.ghostDates}`
    : '';

  return (
    <PageLayout>
      {/* Header */}
      <header className="mb-8 text-center">
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          My TimeMeaning Stats
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight mt-2">
          Your Usage
        </h1>
      </header>

      {/* Empty state */}
      {!stats && (
        <div className="text-center py-20">
          <p className="text-xl text-text-secondary mb-4">
            No stats yet.
          </p>
          <p className="text-text-muted mb-8">
            Resolve your first time reference to start tracking.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-md font-sans font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(to bottom, #d4a040, #a87520)',
              boxShadow: '0 2px 8px rgba(168, 117, 32, 0.4)',
            }}
          >
            Try the resolver
          </Link>
        </div>
      )}

      {/* Stats card */}
      {stats && (
        <div className="max-w-[560px] mx-auto">
          <div
            className="rounded-lg p-8"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: '#c8922a' }}>
                My TimeMeaning Stats
              </span>
              <div className="font-serif mt-4" style={{ fontSize: 48, color: '#c8922a' }}>
                {stats.totalResolutions}
              </div>
              <p className="font-serif text-lg" style={{ color: '#f5f0e8' }}>
                time references resolved
              </p>
              <p className="text-sm mt-2" style={{ color: '#f5f0e8' }}>
                Since {firstUsedDate}
              </p>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="font-mono text-3xl" style={{ color: '#c8922a' }}>
                  {stats.ambiguousCount}
                </div>
                <p className="text-xs mt-1" style={{ color: '#6a6460' }}>
                  Ambiguous flags
                </p>
              </div>
              <div className="text-center">
                <div className="font-mono text-3xl" style={{ color: '#c8922a' }}>
                  {stats.dstCases}
                </div>
                <p className="text-xs mt-1" style={{ color: '#6a6460' }}>
                  DST cases
                </p>
              </div>
              <div className="text-center">
                <div className="font-mono text-3xl" style={{ color: '#c8922a' }}>
                  {mostCommon?.abbr || 'N/A'}
                </div>
                <p className="text-xs mt-1" style={{ color: '#6a6460' }}>
                  Most seen ({mostCommon?.count || 0}x)
                </p>
              </div>
              <div className="text-center">
                <div className="font-mono text-3xl" style={{ color: '#c8922a' }}>
                  {stats.ghostDates}
                </div>
                <p className="text-xs mt-1" style={{ color: '#6a6460' }}>
                  Ghost dates
                </p>
              </div>
            </div>
            
            {/* Format breakdown bar */}
            {formatBreakdown.length > 0 && (
              <div className="mb-8">
                <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: '#6a6460' }}>
                  What You Resolve
                </p>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: '#2a2520' }}>
                  {formatBreakdown.map((format, index) => (
                    <div
                      key={format.type}
                      className="h-full"
                      style={{
                        width: `${format.percentage}%`,
                        backgroundColor: `rgba(200, 146, 42, ${1 - index * 0.2})`,
                      }}
                      title={`${format.type}: ${format.count}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {formatBreakdown.map((format) => (
                    <span key={format.type} className="text-xs" style={{ color: '#6a6460' }}>
                      {format.type}: {format.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Insight */}
            {insight && (
              <div
                className="p-4 rounded-md mb-6"
                style={{ backgroundColor: '#2a2520', borderLeft: '3px solid #c8922a' }}
              >
                <p className="text-sm" style={{ color: '#f5f0e8' }}>
                  {insight.text}
                </p>
                <Link
                  href={insight.link}
                  className="text-sm mt-2 inline-block hover:underline"
                  style={{ color: '#c8922a' }}
                >
                  Learn more →
                </Link>
              </div>
            )}
          </div>
          
          {/* Share */}
          <div className="mt-8">
            <ShareButtons
              title="My TimeMeaning Stats"
              text={shareText}
              url="https://timemeaning.com/stats"
              imageUrl={ogImageUrl}
            />
          </div>
          
          {/* Privacy note and reset */}
          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-sm text-text-muted mb-4">
              All stats are stored in your browser only. Nothing is sent to any server. Clearing your browser data will reset your stats. TimeMeaning has no record of your usage.
            </p>
            
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-sm text-primary hover:underline"
              >
                Reset my stats
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-text-secondary">
                  This will permanently delete your local stats. Are you sure?
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 text-sm bg-surface border border-border rounded-md hover:bg-card transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
