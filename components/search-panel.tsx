"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { searchIndex, popularSearches, quickNavigation, type SearchEntry } from "@/lib/search-index";

// Detect if user is on Mac
function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Highlight matching text in title
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || query.length < 2) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} style={{ color: '#c8922a', backgroundColor: 'transparent' }}>{part}</mark>
    ) : (
      part
    )
  );
}

// Search function with ranking
function searchContent(query: string): SearchEntry[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase();
  const results: Array<{ entry: SearchEntry; score: number }> = [];
  
  for (const entry of searchIndex) {
    let score = 0;
    const titleLower = entry.title.toLowerCase();
    const descLower = entry.description.toLowerCase();
    const keywordsLower = entry.keywords.map(k => k.toLowerCase());
    
    // Title match (highest priority)
    if (titleLower.includes(normalizedQuery)) {
      score += 100;
      // Bonus for exact word match
      if (titleLower.split(/\s+/).some(word => word.startsWith(normalizedQuery))) {
        score += 50;
      }
    }
    
    // Description match
    if (descLower.includes(normalizedQuery)) {
      score += 30;
    }
    
    // Keyword match
    if (keywordsLower.some(k => k.includes(normalizedQuery))) {
      score += 10;
    }
    
    if (score > 0) {
      results.push({ entry, score });
    }
  }
  
  // Sort by score descending, then by type (LEARN, TOOL, BLOG order)
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const typeOrder = { LEARN: 0, TOOL: 1, BLOG: 2 };
    return typeOrder[a.entry.type] - typeOrder[b.entry.type];
  });
  
  return results.slice(0, 8).map(r => r.entry);
}

// Group results by type for section dividers
function groupResultsByType(results: SearchEntry[]): Map<string, SearchEntry[]> {
  const groups = new Map<string, SearchEntry[]>();
  for (const result of results) {
    const existing = groups.get(result.type) || [];
    existing.push(result);
    groups.set(result.type, existing);
  }
  return groups;
}

const typeLabels: Record<string, string> = {
  LEARN: 'Learning Centre',
  BLOG: 'Blog',
  TOOL: 'Tools',
};

export function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMacOS, setIsMacOS] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Detect Mac on mount
  useEffect(() => {
    setIsMacOS(isMac());
  }, []);
  
  const cmdKey = isMacOS ? '⌘' : 'Ctrl+';
  
  // Debounce query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);
  
  // Search results
  const results = useMemo(() => searchContent(debouncedQuery), [debouncedQuery]);
  const groupedResults = useMemo(() => groupResultsByType(results), [results]);
  
  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
      setDebouncedQuery("");
      setSelectedIndex(-1);
    }
  }, [isOpen]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    
    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      router.push(results[selectedIndex].url);
      onClose();
    }
  }, [results, selectedIndex, router, onClose]);
  
  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);
  
  // Navigate to result
  const handleResultClick = useCallback((url: string) => {
    router.push(url);
    onClose();
  }, [router, onClose]);
  
  // Populate search with popular term
  const handlePopularClick = useCallback((term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
    setSelectedIndex(-1);
  }, []);
  
  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedEl = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);
  
  if (!isOpen) return null;
  
  const selectedUrl = selectedIndex >= 0 && results[selectedIndex] ? results[selectedIndex].url : null;
  
  // Flatten results for index tracking
  let flatIndex = -1;
  
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center sm:items-start"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        animation: 'fadeIn 150ms ease-out',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-label="Search TimeMeaning"
      aria-modal="true"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      {/* Mobile: full screen from top. Desktop: floating card */}
      <div
        className="w-full h-full sm:h-auto sm:max-w-[620px] sm:mt-[15vh] sm:mx-4 sm:rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          border: 'none',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          animation: 'slideDown 200ms ease-out',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Desktop border */}
        <div className="hidden sm:block absolute inset-0 rounded-xl border border-[#3a3530] pointer-events-none" />
        
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            height: '56px',
            backgroundColor: '#252320',
            gap: '12px',
          }}
          className="sm:rounded-t-xl"
        >
          {/* Magnifying glass icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c8922a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            placeholder="Search articles, tools, and guides..."
            role="combobox"
            aria-label="Search articles, tools, and guides"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={selectedIndex >= 0 ? `result-${selectedIndex}` : undefined}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f0ece6',
              fontSize: '17px',
              fontFamily: 'inherit',
            }}
          />
          
          {/* Clear / close button */}
          <button
            onClick={() => query ? setQuery("") : onClose()}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#6a6460',
              cursor: 'pointer',
            }}
            aria-label={query ? "Clear search" : "Close search"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Results area */}
        <div
          ref={resultsRef}
          id="search-results"
          role="listbox"
          aria-label={results.length > 0 ? `${results.length} results for ${debouncedQuery}` : undefined}
          className="sm:rounded-b-xl"
          style={{
            backgroundColor: '#1e1c19',
            maxHeight: 'calc(100vh - 56px)',
            overflowY: 'auto',
          }}
        >
          {/* Zero state - nothing typed yet */}
          {query.length === 0 && (
            <div style={{ padding: '20px' }}>
              {/* Popular searches - chips wrap to multiple rows */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  display: 'block',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: '#c8922a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}>
                  Popular Searches
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularClick(term)}
                      className="min-h-[44px]"
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#2a2825',
                        border: '1px solid #3a3530',
                        borderRadius: '4px',
                        color: '#f0ece6',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'border-color 100ms',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#c8922a'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#3a3530'}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quick navigation */}
              <div>
                <span style={{
                  display: 'block',
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: '#c8922a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '12px',
                }}>
                  Jump To
                </span>
                {quickNavigation.map((nav) => (
                  <button
                    key={nav.url}
                    onClick={() => handleResultClick(nav.url)}
                    className="min-h-[48px]"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#f0ece6',
                      fontSize: '15px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 100ms',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2825'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {nav.label}
                    <span style={{ color: '#6a6460' }}>→</span>
                  </button>
                ))}
              </div>
              
              {/* Keyboard shortcuts hint */}
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #2a2825',
                textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#6a6460',
                  letterSpacing: '0.02em',
                }}>
                  <span style={{ color: '#8a8480' }}>{cmdKey}K</span> to open · <span style={{ color: '#8a8480' }}>/</span> to focus resolver · <span style={{ color: '#8a8480' }}>Escape</span> to close
                </span>
              </div>
            </div>
          )}
          
          {/* Typing but less than 2 chars */}
          {query.length > 0 && query.length < 2 && (
            <div style={{
              padding: '48px 20px',
              textAlign: 'center',
              color: '#6a6460',
              fontSize: '14px',
            }}>
              Start typing to search...
            </div>
          )}
          
          {/* No results */}
          {query.length >= 2 && results.length === 0 && (
            <div style={{
              padding: '48px 20px',
              textAlign: 'center',
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6a6460"
                strokeWidth="1.5"
                style={{ margin: '0 auto 16px' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p style={{ color: '#f0ece6', fontSize: '15px', marginBottom: '8px' }}>
                No results for &ldquo;{debouncedQuery}&rdquo;
              </p>
              <p style={{ color: '#6a6460', fontSize: '13px', marginBottom: '20px' }}>
                Try a timezone abbreviation, a country name, or a concept like &ldquo;DST&rdquo; or &ldquo;UTC offset&rdquo;.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleResultClick('/learn')}
                  className="min-h-[44px]"
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#c8922a',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Browse Learning Centre →
                </button>
                <span style={{ color: '#3a3530' }}>·</span>
                <button
                  onClick={() => handleResultClick('/blog')}
                  className="min-h-[44px]"
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#c8922a',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Browse Blog →
                </button>
                <span style={{ color: '#3a3530' }}>·</span>
                <button
                  onClick={() => handleResultClick('/tools')}
                  className="min-h-[44px]"
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#c8922a',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Browse Tools →
                </button>
              </div>
            </div>
          )}
          
          {/* Results list */}
          {results.length > 0 && (
            <div>
              {Array.from(groupedResults.entries()).map(([type, entries], groupIdx) => (
                <div key={type}>
                  {/* Section divider with label */}
                  {groupIdx > 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      gap: '12px',
                    }}>
                      <span style={{
                        fontSize: '10px',
                        color: '#6a6460',
                        whiteSpace: 'nowrap',
                      }}>
                        {typeLabels[type]}
                      </span>
                      <div style={{
                        flex: 1,
                        height: '1px',
                        backgroundColor: '#2a2825',
                      }} />
                    </div>
                  )}
                  
                  {entries.map((entry) => {
                    flatIndex++;
                    const currentIndex = flatIndex;
                    const isSelected = selectedIndex === currentIndex;
                    
                    return (
                      <button
                        key={entry.id}
                        id={`result-${currentIndex}`}
                        data-index={currentIndex}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleResultClick(entry.url)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className="min-h-[64px]"
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '12px 16px',
                          backgroundColor: isSelected ? '#2a2825' : 'transparent',
                          border: 'none',
                          borderLeft: isSelected ? '2px solid #c8922a' : '2px solid transparent',
                          cursor: 'pointer',
                          transition: 'background-color 100ms',
                        }}
                      >
                        {/* Mobile: Category pill and title on first line, description on second */}
                        <div className="flex items-center gap-2 mb-1 sm:mb-0">
                          <span style={{
                            display: 'inline-block',
                            padding: '2px 6px',
                            backgroundColor: '#2a2825',
                            border: '1px solid #3a3530',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontFamily: 'monospace',
                            color: '#c8922a',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}>
                            {entry.type}
                          </span>
                          
                          {/* Title with highlighted match */}
                          <div style={{
                            color: '#f0ece6',
                            fontSize: '15px',
                            fontWeight: 500,
                            lineHeight: 1.3,
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {highlightMatch(entry.title, debouncedQuery)}
                          </div>
                        </div>
                        
                        {/* Description - read time hidden on mobile */}
                        <div style={{
                          color: '#8a8480',
                          fontSize: '13px',
                          lineHeight: 1.4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {entry.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* URL preview bar at bottom - desktop only */}
        {selectedUrl && (
          <div 
            className="hidden sm:block"
            style={{
              padding: '8px 16px',
              backgroundColor: '#1a1a1a',
              borderTop: '1px solid #2a2825',
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#6a6460',
            }}
          >
            timemeaning.com{selectedUrl}
          </div>
        )}
      </div>
    </div>
  );
}
