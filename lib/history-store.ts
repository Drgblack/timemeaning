// Recently Resolved History - localStorage-based client-side storage

export interface HistoryEntry {
  id: string;
  input: string;
  resolved: string;       // e.g., "3:00 PM EST, Friday 14 March 2025"
  timezone: string;
  timestamp: number;      // when it was resolved (Date.now())
  url: string;            // the /r/[hash] shareable URL
}

const STORAGE_KEY = 'tm_history';
const MAX_ENTRIES = 10;

/**
 * Get all history entries from localStorage
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as HistoryEntry[];
  } catch {
    return [];
  }
}

/**
 * Save a new entry to history (most recent first, max 10)
 */
export function saveToHistory(entry: HistoryEntry): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  
  // Remove any existing entry with the same input (to avoid duplicates)
  const filtered = history.filter(h => h.input !== entry.input);
  
  // Add new entry at the beginning, limit to MAX_ENTRIES
  const updated = [entry, ...filtered].slice(0, MAX_ENTRIES);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage might be full or disabled - silently fail
  }
}

/**
 * Delete a single entry from history by its ID
 */
export function deleteFromHistory(id: string): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const updated = history.filter(h => h.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

/**
 * Format a timestamp as relative time
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return 'Just now';
  }
  
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  
  if (days === 1) {
    return 'Yesterday';
  }
  
  if (days < 7) {
    return `${days} days ago`;
  }
  
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  
  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}
