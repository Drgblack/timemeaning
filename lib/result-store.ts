// Result storage for shareable URLs
// In production, this would be backed by a database
// For the v0 prototype, we use in-memory storage with a hardcoded example

import type { TimeInterpretation } from "@/components/time-result";
import type { EasterEggResult } from "@/lib/easter-eggs";

export interface StoredResult {
  hash: string;
  inputText: string;
  interpretation: TimeInterpretation | EasterEggResult;
  generatedAt: string; // ISO timestamp
}

// In-memory store for results (prototype only)
const resultStore = new Map<string, StoredResult>();

// Hardcoded example result
const exampleResult: StoredResult = {
  hash: "example",
  inputText: "Let's sync at 3pm EST on Friday",
  interpretation: {
    inputText: "Let's sync at 3pm EST on Friday",
    interpretedDate: "Friday, 14 March 2025",
    interpretedTime: "3:00 PM",
    timezone: "Eastern Standard Time",
    utcOffset: "UTC−5",
    isDstActive: false,
    dateBoundaryChanges: [],
    assumptions: [
      "\"Friday\" interpreted as the upcoming Friday — 14 March 2025",
      "EST interpreted as Eastern Standard Time (US), not Australian Eastern Standard Time"
    ],
    isoTimestamp: "2025-03-14T15:00:00-05:00",
    explanation: "This refers to 3:00 PM Eastern Standard Time on Friday, March 14th, 2025. At this time, DST is not yet in effect for the Eastern timezone (DST begins March 9th, 2025, but this meeting is scheduled in EST, not EDT).",
    confidence: "high" as const
  },
  generatedAt: new Date().toISOString()
};

// Initialize with the example
resultStore.set("example", exampleResult);

/**
 * Store a result and return its hash
 */
export function storeResult(
  hash: string,
  inputText: string,
  interpretation: TimeInterpretation | EasterEggResult
): StoredResult {
  const stored: StoredResult = {
    hash,
    inputText,
    interpretation,
    generatedAt: new Date().toISOString()
  };
  resultStore.set(hash, stored);
  return stored;
}

/**
 * Retrieve a result by hash
 */
export function getResult(hash: string): StoredResult | null {
  return resultStore.get(hash) || null;
}

/**
 * Check if a result exists
 */
export function hasResult(hash: string): boolean {
  return resultStore.has(hash);
}
