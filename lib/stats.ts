// Stats tracking for TimeMeaning usage
// All data stored in localStorage only — never sent to any server

export interface TMStats {
  totalResolutions: number;
  firstUsed: string;
  lastUsed: string;
  ambiguousCount: number;
  dstCases: number;
  ghostDates: number;
  abbreviations: Record<string, number>;
  formats: Record<string, number>;
}

const STATS_KEY = 'tm_stats';

export function getStats(): TMStats | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as TMStats;
  } catch {
    return null;
  }
}

export function trackResolution(options: {
  isAmbiguous: boolean;
  abbreviation?: string | null;
  isDSTActive: boolean;
  isGhostDate: boolean;
  formatType: 'natural' | 'iso' | 'unix' | 'zulu' | 'ambiguous_abbr';
}): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stats = getStats() || {
      totalResolutions: 0,
      firstUsed: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      ambiguousCount: 0,
      dstCases: 0,
      ghostDates: 0,
      abbreviations: {},
      formats: {},
    };
    
    stats.totalResolutions += 1;
    stats.lastUsed = new Date().toISOString();
    
    if (options.isAmbiguous) {
      stats.ambiguousCount += 1;
    }
    
    if (options.abbreviation) {
      stats.abbreviations[options.abbreviation] = (stats.abbreviations[options.abbreviation] || 0) + 1;
    }
    
    if (options.isDSTActive) {
      stats.dstCases += 1;
    }
    
    if (options.isGhostDate) {
      stats.ghostDates += 1;
    }
    
    stats.formats[options.formatType] = (stats.formats[options.formatType] || 0) + 1;
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function resetStats(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STATS_KEY);
  } catch {
    // Silently fail
  }
}

export function getMostCommonAbbreviation(stats: TMStats): { abbr: string; count: number } | null {
  const entries = Object.entries(stats.abbreviations);
  if (entries.length === 0) return null;
  
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  return { abbr: sorted[0][0], count: sorted[0][1] };
}

export function getFormatBreakdown(stats: TMStats): { type: string; count: number; percentage: number }[] {
  const entries = Object.entries(stats.formats);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  
  return entries.map(([type, count]) => ({
    type,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0,
  })).sort((a, b) => b.count - a.count);
}

/**
 * Detect format type from input string
 */
export function detectFormatType(input: string): 'natural' | 'iso' | 'unix' | 'zulu' | 'ambiguous_abbr' {
  const trimmed = input.trim();
  
  // Unix timestamp - pure numbers (10 or 13 digits)
  if (/^\d{10,13}$/.test(trimmed)) {
    return 'unix';
  }
  
  // ISO format - YYYY-MM-DD or variations
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    // Check for Zulu/UTC suffix
    if (/Z$|[+-]\d{2}:\d{2}$/.test(trimmed)) {
      return 'zulu';
    }
    return 'iso';
  }
  
  // Ambiguous abbreviation patterns
  const ambiguousAbbrs = ['CST', 'EST', 'PST', 'IST', 'BST', 'AST', 'MST', 'SST', 'WST'];
  const upperInput = trimmed.toUpperCase();
  for (const abbr of ambiguousAbbrs) {
    if (new RegExp(`\\b${abbr}\\b`).test(upperInput)) {
      return 'ambiguous_abbr';
    }
  }
  
  // Default to natural language
  return 'natural';
}

/**
 * Detect ambiguous timezone abbreviation from input
 */
export function detectAbbreviation(input: string): string | null {
  const ambiguousAbbrs = ['CST', 'EST', 'PST', 'IST', 'BST', 'AST', 'MST', 'SST', 'WST', 'CDT', 'EDT', 'PDT', 'MDT'];
  const upperInput = input.toUpperCase();
  
  for (const abbr of ambiguousAbbrs) {
    if (new RegExp(`\\b${abbr}\\b`).test(upperInput)) {
      return abbr;
    }
  }
  
  return null;
}

export function generateInsight(stats: TMStats): { text: string; link: string } | null {
  const ambiguityRatio = stats.ambiguousCount / stats.totalResolutions;
  const mostCommon = getMostCommonAbbreviation(stats);
  const formatBreakdown = getFormatBreakdown(stats);
  const topFormat = formatBreakdown[0];
  
  if (stats.ghostDates > 0) {
    return {
      text: `You've encountered ${stats.ghostDates} ghost date${stats.ghostDates > 1 ? 's' : ''} — moments that were legislated out of existence.`,
      link: '/learn/ghost-dates',
    };
  }
  
  if (ambiguityRatio > 0.5) {
    return {
      text: 'More than half your time references were ambiguous. Your team may benefit from the Ambiguity Audit.',
      link: '/tools/ambiguity-audit',
    };
  }
  
  if (topFormat?.type === 'unix') {
    return {
      text: 'You resolve a lot of Unix timestamps. You might be a developer.',
      link: '/learn/developer-log-timestamps',
    };
  }
  
  if (mostCommon?.abbr === 'IST') {
    return {
      text: 'IST is your most common abbreviation — and the most ambiguous. It has three meanings across three continents.',
      link: '/insights/ist-most-dangerous-abbreviation',
    };
  }
  
  if (mostCommon?.abbr === 'CST') {
    return {
      text: 'CST is your most common abbreviation. It could mean Central Standard Time or China Standard Time — 14 hours apart.',
      link: '/blog/cst-trap',
    };
  }
  
  return null;
}
