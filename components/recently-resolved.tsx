"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  getHistory, 
  deleteFromHistory, 
  clearHistory, 
  formatRelativeTime,
  type HistoryEntry 
} from "@/lib/history-store";

interface RecentlyResolvedProps {
  refreshKey?: number; // Increment to trigger refresh from parent
}

export function RecentlyResolved({ refreshKey }: RecentlyResolvedProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Load history from localStorage
  const loadHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  // Initial load
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Refresh when refreshKey changes (new result added)
  useEffect(() => {
    if (refreshKey !== undefined) {
      loadHistory();
    }
  }, [refreshKey, loadHistory]);

  // Handle clearing all history
  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
  };

  // Handle deleting a single entry
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteFromHistory(id);
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  // Truncate text with ellipsis
  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '…';
  };

  // Don't render if no history
  if (history.length === 0) return null;

  return (
    <div 
      style={{ 
        marginTop: '24px', 
        paddingTop: '20px',
        borderTop: '1px solid #e8e4de',
      }}
    >
      {/* Header row with label and clear button */}
      <div className="flex items-center justify-between mb-3">
        <span 
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: '#c8922a', letterSpacing: '0.08em' }}
        >
          Recently Resolved
        </span>
        <button
          onClick={handleClearAll}
          className="font-mono text-xs transition-colors"
          style={{ 
            color: 'rgba(200, 146, 42, 0.7)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200, 146, 42, 0.7)'}
        >
          Clear
        </button>
      </div>

      {/* History entries */}
      <div className="space-y-0">
        {history.map((entry) => (
          <Link
            key={entry.id}
            href={entry.url}
            className="group block relative"
            style={{
              padding: '12px 0',
              borderBottom: '1px solid rgba(232, 228, 222, 0.5)',
            }}
            onMouseEnter={() => setHoveredId(entry.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left side: input and resolved time */}
              <div className="flex-1 min-w-0">
                {/* Original input - truncated */}
                <p 
                  className="text-sm leading-snug"
                  style={{ 
                    color: '#f5f0e8',
                    // Override for light mode
                  }}
                >
                  <span className="text-[#3a3530] dark:text-[#f5f0e8]">
                    {truncate(entry.input, 40)}
                  </span>
                </p>
                
                {/* Resolved time in amber mono */}
                <p 
                  className="font-mono mt-1"
                  style={{ 
                    fontSize: '13px',
                    color: '#c8922a',
                  }}
                >
                  {entry.resolved}
                </p>
              </div>

              {/* Right side: relative time and actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Relative time */}
                <span 
                  className="text-xs whitespace-nowrap"
                  style={{ color: '#9a9590' }}
                >
                  {formatRelativeTime(entry.timestamp)}
                </span>

                {/* Arrow link indicator - always visible on mobile, hover on desktop */}
                <span 
                  className="text-xs sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  style={{ color: '#c8922a' }}
                >
                  →
                </span>

                {/* Delete button - hidden on mobile, visible on hover on desktop */}
                <button
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity p-1 -m-1"
                  style={{ 
                    color: '#9a9590',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c8922a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9a9590'}
                  aria-label={`Delete "${truncate(entry.input, 20)}" from history`}
                >
                  ×
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
