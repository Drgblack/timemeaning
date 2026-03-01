"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ambiguousAbbreviations } from "@/lib/timezone-abbreviations";
import { generateHash } from "@/lib/easter-eggs";
import { storeResult } from "@/lib/result-store";
import { getOverflowMargin, getUnixEpochInfo, MAX_32BIT_SIGNED } from "@/lib/y2k38";

export interface TimeInterpretation {
  inputText: string;
  interpretedDate: string;
  interpretedTime: string;
  timezone: string;
  utcOffset: string;
  isDstActive: boolean;
  dateBoundaryChanges: string[];
  assumptions: string[];
  isoTimestamp: string;
  explanation: string;
  confidence: "high" | "medium" | "low";
}

interface TimeResultProps {
  result: TimeInterpretation | null;
  isVisible: boolean;
}

// Ambiguity explainer data for common abbreviations
const ambiguityExplainers: Record<string, { text: string; alternatives: string[] }> = {
  EST: {
    text: "EST is shared by Eastern Standard Time (UTC−5, used in the US and Canada) and Australian Eastern Standard Time (UTC+10). These are 15 hours apart. TimeMeaning resolved EST as the US interpretation because it appears more frequently in global business communication — but if your context is Australian, the time above is incorrect.",
    alternatives: ["Eastern Standard Time (US)", "Australian Eastern Standard Time"],
  },
  CST: {
    text: "CST can mean Central Standard Time (UTC−6, US), China Standard Time (UTC+8), or Cuba Standard Time (UTC−5). These interpretations span 14 hours. TimeMeaning defaulted to US Central time based on frequency analysis.",
    alternatives: ["Central Standard Time (US)", "China Standard Time", "Cuba Standard Time"],
  },
  PST: {
    text: "PST typically refers to Pacific Standard Time (UTC−8) in North America, but can also mean Philippine Standard Time (UTC+8) — a 16-hour difference.",
    alternatives: ["Pacific Standard Time (US)", "Philippine Standard Time"],
  },
  IST: {
    text: "IST is shared by Indian Standard Time (UTC+5:30), Irish Standard Time (UTC+1), and Israel Standard Time (UTC+2). TimeMeaning resolved this based on context frequency.",
    alternatives: ["Indian Standard Time", "Irish Standard Time", "Israel Standard Time"],
  },
  BST: {
    text: "BST can mean British Summer Time (UTC+1) or Bangladesh Standard Time (UTC+6). These are 5 hours apart.",
    alternatives: ["British Summer Time", "Bangladesh Standard Time"],
  },
  AST: {
    text: "AST can refer to Atlantic Standard Time (UTC−4), Arabia Standard Time (UTC+3), or Alaska Standard Time (UTC−9) — spanning 12 hours.",
    alternatives: ["Atlantic Standard Time", "Arabia Standard Time", "Alaska Standard Time"],
  },
};

export function TimeResult({ result, isVisible }: TimeResultProps) {
  const [copied, setCopied] = useState(false);
  const [formatsExpanded, setFormatsExpanded] = useState(false);
  const [parseTraceExpanded, setParseTraceExpanded] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [expandedAmbiguity, setExpandedAmbiguity] = useState<number | null>(null);

  // Load expanded state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("timemeaning_formats_expanded");
      if (stored === "true") setFormatsExpanded(true);
    }
  }, []);

  // Save expanded state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timemeaning_formats_expanded", formatsExpanded.toString());
    }
  }, [formatsExpanded]);

  if (!result || !isVisible) return null;

  // Generate canonical formats from the ISO timestamp
  const generateFormats = () => {
    // Parse the ISO timestamp to get Unix timestamp
    const date = new Date(result.isoTimestamp);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    
    // ISO 8601 Local (use the original with offset)
    const isoLocal = result.isoTimestamp;
    
    // ISO 8601 UTC
    const isoUtc = date.toISOString().replace(/\.\d{3}Z$/, "Z");
    
    // RFC 3339 (same as ISO but explicitly with +00:00 for UTC)
    const rfc3339 = date.toISOString().replace(/\.\d{3}Z$/, "+00:00");
    
    return {
      isoLocal,
      isoUtc,
      unixTimestamp: unixTimestamp.toString(),
      rfc3339,
    };
  };

  const formats = generateFormats();
  
  // Y2K38 safety check
  const parsedDate = new Date(result.isoTimestamp);
  const unixTimestamp = Math.floor(parsedDate.getTime() / 1000);
  const isY2K38Unsafe = unixTimestamp > MAX_32BIT_SIGNED;
  const overflowMargin = isY2K38Unsafe ? getOverflowMargin(unixTimestamp) : null;
  const epochInfo = getUnixEpochInfo(unixTimestamp);
  
  // Check if input was a raw Unix timestamp
  const isRawUnixInput = /^\d{10,13}$/.test(result.inputText.trim());

  const handleCopyFormat = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedFormat(key);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  const handleCopyLink = async () => {
    const hash = generateHash(result.inputText + Date.now().toString());
    storeResult(hash, result.inputText, result);
    const url = `${window.location.origin}/r/${hash}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine contextual learning link
  const getContextualLink = () => {
    const input = result.inputText.toUpperCase();
    
    // Check for ambiguous abbreviations
    const foundAbbr = ambiguousAbbreviations.find(abbr => input.includes(abbr));
    if (foundAbbr) {
      return {
        href: "/learn/ambiguous-timezone-abbreviations",
        text: `Why timezone abbreviations like ${foundAbbr} have more than one meaning →`,
        lookupHref: `/tools/lookup?q=${foundAbbr}`,
        lookupText: `Or look up ${foundAbbr} directly →`,
      };
    }
    
    // Check for DST active or transition
    if (result.isDstActive) {
      return {
        href: "/learn/dst-shift-dates",
        text: "Understanding Daylight Saving shift dates and the dangerous gap weeks →",
      };
    }
    
    // Check for ISO 8601 pattern (T separator with Z or offset)
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(result.inputText)) {
      return {
        href: "/learn/iso-8601-for-humans",
        text: "Decoding ISO 8601 timestamps in plain English →",
      };
    }
    
    // Check for Unix epoch (10 or 13 digit number)
    if (/^\d{10,13}$/.test(result.inputText.trim())) {
      return {
        href: "/learn/developer-log-timestamps",
        text: "The developer's guide to log timestamp formats →",
      };
    }
    
    // Check for natural language patterns
    const naturalPatterns = /next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|week)|tomorrow|this\s+(morning|afternoon|evening)|tonight/i;
    if (naturalPatterns.test(result.inputText)) {
      return {
        href: "/learn/bulletproof-time",
        text: "How to write time references that cannot be misinterpreted →",
      };
    }
    
    // Default fallback
    return {
      href: "/learn/understanding-utc-offsets",
      text: "Why UTC offsets are more reliable than timezone names →",
    };
  };

  const contextualLink = getContextualLink();

  // Check if an assumption is about an ambiguous abbreviation
  const getAmbiguousAbbreviation = (assumption: string): string | null => {
    const upperAssumption = assumption.toUpperCase();
    for (const abbr of Object.keys(ambiguityExplainers)) {
      if (upperAssumption.includes(abbr) && (
        assumption.toLowerCase().includes("interpreted as") ||
        assumption.toLowerCase().includes("assumed") ||
        assumption.toLowerCase().includes("resolved")
      )) {
        return abbr;
      }
    }
    return null;
  };

  // Generate parse trace steps
  const generateParseTrace = () => {
    const input = result.inputText;
    const steps = [];
    
    steps.push({ num: "01", label: "INPUT", value: `"${input}"` });
    
    // Tokenize step - extract time-related tokens
    const tokens: string[] = [];
    const timeMatch = input.match(/\d{1,2}(?::\d{2})?\s*(?:am|pm)?/i);
    if (timeMatch) tokens.push(timeMatch[0]);
    const abbrMatch = input.match(/\b([A-Z]{2,4})\b/);
    if (abbrMatch) tokens.push(abbrMatch[1]);
    const dayMatch = input.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|tomorrow)\b/i);
    if (dayMatch) tokens.push(dayMatch[1]);
    const dateMatch = input.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}/i);
    if (dateMatch) tokens.push(dateMatch[0]);
    
    if (tokens.length > 0) {
      steps.push({ num: "02", label: "TOKENISED", value: `[${tokens.map(t => `"${t}"`).join(", ")}]` });
    }
    
    // Time extraction
    steps.push({ num: "03", label: "TIME", value: `${result.interpretedTime} (parsed from input)` });
    
    // Abbreviation resolution
    const foundAbbr = ambiguousAbbreviations.find(abbr => input.toUpperCase().includes(abbr));
    if (foundAbbr && ambiguityExplainers[foundAbbr]) {
      const explainer = ambiguityExplainers[foundAbbr];
      steps.push({ 
        num: "04", 
        label: "ABBREVIATION", 
        value: `${foundAbbr} → ${explainer.alternatives.map((a, i) => `candidate: ${a}`).join("\n                      ")}\n                      → resolved: ${result.timezone} (higher frequency match)` 
      });
    }
    
    // Date resolution
    if (dayMatch) {
      const today = new Date();
      steps.push({ 
        num: "05", 
        label: "RELATIVE DATE", 
        value: `"${dayMatch[1]}" → reference date: ${today.toISOString().split("T")[0]} (today)\n                           → target: ${result.interpretedDate}` 
      });
    }
    
    // DST check
    steps.push({ 
      num: String(steps.length + 1).padStart(2, "0"), 
      label: "DST CHECK", 
      value: `${result.interpretedDate}, ${result.timezone} → DST ${result.isDstActive ? "active" : "inactive"}` 
    });
    
    // Output
    steps.push({ 
      num: String(steps.length + 1).padStart(2, "0"), 
      label: "OUTPUT", 
      value: result.isoTimestamp 
    });
    
    return steps;
  };

  const parseTrace = generateParseTrace();

  return (
    <div
      className="mt-12 animate-in fade-in duration-300"
      style={{ marginTop: '48px' }}
      role="region"
      aria-label="Time interpretation result"
    >
      {/* Section header */}
      <h2 className="text-xs font-sans font-medium text-primary uppercase tracking-wider mb-4">
        {"INTERPRETATION"}
      </h2>

      {/* Main result card with left accent border */}
      <div className="bg-surface border-l-2 border-l-primary rounded-r-md overflow-hidden transition-colors duration-200">
        {/* Detected phrase */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-1">
            {"Detected phrase"}
          </span>
          <span className="font-mono text-foreground">
            &ldquo;{result.inputText}&rdquo;
          </span>
        </div>

        {/* Primary interpretation - hero section */}
        <div className="px-5 py-6 border-b border-border bg-result-highlight transition-colors duration-200">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-3">
            {"Interpreted as"}
          </span>
          <div className="flex items-start gap-3">
            <span className="text-primary text-2xl leading-none select-none">—</span>
            <span className="font-display text-[28px] sm:text-[32px] text-foreground leading-tight">
              {result.interpretedDate} at {result.interpretedTime}
            </span>
          </div>
        </div>

        {/* Timezone */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-1">
            {"Timezone"}
          </span>
          <span className="font-sans text-foreground">
            {result.timezone}{" "}
            <span className="text-text-secondary">
              ({result.utcOffset})
            </span>
          </span>
        </div>

        {/* DST Status */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-2">
            {"Daylight Saving"}
          </span>
          <span
            className={`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium
              ${
                result.isDstActive
                  ? "bg-dst-active/15 text-dst-active"
                  : "bg-dst-inactive/15 text-dst-inactive"
              }
            `}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${result.isDstActive ? "bg-dst-active" : "bg-dst-inactive"}`}
            />
            {result.isDstActive ? "Active" : "Not active"}
          </span>
        </div>

        {/* Date boundary changes */}
        {result.dateBoundaryChanges.length > 0 && (
          <div className="px-5 py-4 border-b border-border">
            <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-1">
              {"Day/Date note"}
            </span>
            <ul className="space-y-1">
              {result.dateBoundaryChanges.map((change, i) => (
                <li key={i} className="font-mono text-sm text-foreground">
                  {change}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ISO Timestamp - dark terminal style */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-2">
            {"ISO 8601 format"}
          </span>
          <code className="font-mono text-sm text-[#c8922a] bg-[#1a1a1a] px-3 py-2.5 rounded-[4px] inline-block">
            {result.isoTimestamp}
          </code>
        </div>

        {/* Y2K38 Safety Warning - shown when timestamp exceeds 32-bit limit */}
        {isY2K38Unsafe && overflowMargin && (
          <div 
            className="px-5 py-4 border-b border-border"
            style={{ 
              backgroundColor: '#2a1f00',
              borderLeft: '2px solid #c8922a',
            }}
          >
            <span 
              className="font-mono uppercase block mb-2"
              style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#c8922a' }}
            >
              Y2K38 Safety Note
            </span>
            <p 
              className="font-sans leading-relaxed mb-4"
              style={{ fontSize: '13px', color: '#e8e0d0' }}
            >
              This timestamp exceeds 2,147,483,647 seconds since the Unix epoch — the maximum value storable in a 32-bit signed integer. Legacy systems using 32-bit time_t (common in older C code, embedded systems, and some database fields) will overflow at 2038-01-19T03:14:07Z and may interpret this date incorrectly or wrap to a negative value representing 1901. If this timestamp will be stored or processed by any system built before approximately 2010, verify that it uses 64-bit time handling.
            </p>
            <div 
              className="font-mono space-y-1"
              style={{ fontSize: '12px', color: '#c8922a' }}
            >
              <div>Seconds from Unix epoch: {unixTimestamp.toLocaleString()}</div>
              <div>32-bit maximum: {MAX_32BIT_SIGNED.toLocaleString()}</div>
              <div>Overflow margin: {overflowMargin.formatted}</div>
            </div>
            <Link
              href="/learn/y2k38"
              className="inline-block mt-3 font-sans hover:underline"
              style={{ fontSize: '12px', color: '#c8922a' }}
            >
              Read about Y2K38 →
            </Link>
          </div>
        )}

        {/* Unix epoch offset - always shown for Unix timestamps */}
        {isRawUnixInput && (
          <div className="px-5 py-3 border-b border-border">
            <p className="font-mono" style={{ fontSize: '11px', color: '#8a8278' }}>
              Unix epoch offset: {epochInfo.formatted}
            </p>
          </div>
        )}

        {/* ADDITION 1: Canonical formats block (collapsible) */}
        <div className="px-5 py-3 border-b border-border">
          <button
            onClick={() => setFormatsExpanded(!formatsExpanded)}
            className="text-xs font-mono text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            style={{ fontSize: '12px' }}
          >
            <span>{formatsExpanded ? "−" : "+"}</span>
            <span>Other canonical formats</span>
          </button>
          
          {formatsExpanded && (
            <div 
              className="mt-3 rounded-[4px] overflow-hidden"
              style={{ backgroundColor: '#1a1a1a', padding: '12px' }}
            >
              {[
                { key: "isoLocal", label: "ISO 8601 LOCAL", value: formats.isoLocal },
                { key: "isoUtc", label: "ISO 8601 UTC", value: formats.isoUtc },
                { key: "unix", label: "UNIX TIMESTAMP", value: formats.unixTimestamp },
                { key: "rfc3339", label: "RFC 3339", value: formats.rfc3339 },
              ].map((format) => (
                <div 
                  key={format.key}
                  className="flex items-center justify-between py-1.5"
                  style={{ borderBottom: format.key !== "rfc3339" ? '1px solid #2a2825' : 'none' }}
                >
                  <span 
                    className="font-mono uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#c8922a' }}
                  >
                    {format.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono" style={{ fontSize: '13px', color: '#f5f0e8' }}>
                      {format.value}
                    </span>
                    <button
                      onClick={() => handleCopyFormat(format.value, format.key)}
                      className="p-1 transition-colors"
                      style={{ color: copiedFormat === format.key ? '#c8922a' : '#5a5550' }}
                      onMouseEnter={(e) => { if (copiedFormat !== format.key) e.currentTarget.style.color = '#c8922a'; }}
                      onMouseLeave={(e) => { if (copiedFormat !== format.key) e.currentTarget.style.color = '#5a5550'; }}
                      title="Copy to clipboard"
                    >
                      {copiedFormat === format.key ? (
                        <span style={{ fontSize: '12px' }}>✓</span>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <p className="mt-2 text-center" style={{ fontSize: '10px', color: '#5a5550' }}>
                All values represent the same moment in time.
              </p>
            </div>
          )}
        </div>

        {/* Plain English Explanation */}
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm text-foreground leading-relaxed font-sans">
            {result.explanation}
          </p>
          {result.confidence !== "high" && (
            <p className="mt-3 text-xs text-text-muted font-sans">
              Confidence:{" "}
              <span
                className={`font-medium ${result.confidence === "medium" ? "text-dst-warning" : "text-destructive"}`}
              >
                {result.confidence}
              </span>{" "}
              — Some ambiguity detected in the input.
            </p>
          )}
        </div>

        {/* Assumptions - indented with indicator, with ADDITION 4: Inline ambiguity explainer */}
        {result.assumptions.length > 0 && (
          <div className="px-5 py-4 bg-assumptions-bg transition-colors duration-200 border-b border-border">
            <span className="text-xs font-sans text-text-muted uppercase tracking-wider block mb-3">
              {"Assumptions made"}
            </span>
            <ul className="space-y-2 pl-4">
              {result.assumptions.map((assumption, i) => {
                const ambiguousAbbr = getAmbiguousAbbreviation(assumption);
                const isExpanded = expandedAmbiguity === i;
                
                return (
                  <li key={i} className="text-sm text-text-secondary font-sans">
                    <div className="flex items-start gap-2">
                      <span className="text-text-muted select-none">›</span>
                      <div className="flex-1">
                        <span>{assumption}</span>
                        {ambiguousAbbr && ambiguityExplainers[ambiguousAbbr] && (
                          <button
                            onClick={() => setExpandedAmbiguity(isExpanded ? null : i)}
                            className="ml-2 text-xs text-primary hover:underline"
                          >
                            {isExpanded ? "hide" : "why?"} →
                          </button>
                        )}
                        
                        {/* Expanded ambiguity explainer */}
                        {isExpanded && ambiguousAbbr && ambiguityExplainers[ambiguousAbbr] && (
                          <div 
                            className="mt-3 p-3 rounded-[4px]"
                            style={{ backgroundColor: '#f5f0e8', border: '1px solid #e8e4de' }}
                          >
                            <p className="text-sm text-text-secondary leading-relaxed mb-3">
                              {ambiguityExplainers[ambiguousAbbr].text}
                            </p>
                            <Link
                              href={`/tools/lookup?q=${ambiguousAbbr}`}
                              className="text-xs text-primary hover:underline"
                            >
                              Look up {ambiguousAbbr} in the abbreviation tool →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Learn More - contextual link */}
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-sans text-primary uppercase tracking-wider block mb-2">
            Learn more
          </span>
          <Link 
            href={contextualLink.href}
            className="text-sm text-primary hover:underline"
          >
            {contextualLink.text}
          </Link>
          {contextualLink.lookupHref && (
            <Link 
              href={contextualLink.lookupHref}
              className="block mt-1.5 text-sm text-primary hover:underline"
            >
              {contextualLink.lookupText}
            </Link>
          )}
        </div>

        {/* ADDITION 2: Parse trace (hidden technical view) */}
        <div className="px-5 py-3 border-b border-border">
          <button
            onClick={() => setParseTraceExpanded(!parseTraceExpanded)}
            className="transition-colors hover:text-text-secondary"
            style={{ fontSize: '11px', color: '#5a5550' }}
          >
            {parseTraceExpanded ? "Hide parse trace ↑" : "View parse trace →"}
          </button>
          
          {parseTraceExpanded && (
            <div 
              className="mt-3 rounded-[4px] overflow-hidden"
              style={{ backgroundColor: '#1a1a1a', padding: '12px' }}
            >
              <span 
                className="font-mono uppercase block mb-3"
                style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#c8922a' }}
              >
                PARSE TRACE
              </span>
              <div className="font-mono space-y-1" style={{ fontSize: '12px' }}>
                {parseTrace.map((step) => (
                  <div key={step.num} className="flex">
                    <span style={{ color: '#c8922a', marginRight: '8px' }}>{step.num}</span>
                    <span style={{ color: '#8a8278', width: '100px', flexShrink: 0 }}>{step.label}</span>
                    <span style={{ color: '#f5f0e8', whiteSpace: 'pre-wrap' }}>{step.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3" style={{ fontSize: '10px', color: '#5a5550' }}>
                This is the deterministic pipeline TimeMeaning uses. No machine learning. No guessing.
              </p>
            </div>
          )}
        </div>

        {/* Trust strip with ADDITION 3: IANA provenance */}
        <div className="px-5 py-4 bg-surface flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border transition-colors duration-200">
          <span className="text-xs text-text-muted font-sans">
            Timezone-aware · DST-accurate · Assumptions always shown · Shareable results · IANA timezone data
          </span>
          <button
            onClick={handleCopyLink}
            className="
              py-2 px-4
              font-sans text-xs text-text-secondary
              border border-border rounded-md
              bg-transparent
              hover:bg-background hover:border-border-strong hover:text-foreground hover:cursor-pointer
              active:bg-muted
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface
              shrink-0
            "
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}
