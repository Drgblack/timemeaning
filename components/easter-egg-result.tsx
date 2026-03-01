"use client";

import { useState } from "react";
import type { EasterEggResult } from "@/lib/easter-eggs";
import { generateHash } from "@/lib/easter-eggs";
import { storeResult } from "@/lib/result-store";

interface EasterEggResultCardProps {
  result: EasterEggResult;
  isVisible: boolean;
}

export function EasterEggResultCard({ result, isVisible }: EasterEggResultCardProps) {
  const [copied, setCopied] = useState(false);

  if (!result || !isVisible) return null;

  const handleCopyLink = async () => {
    const hash = generateHash(result.detectedPhrase + Date.now().toString());
    storeResult(hash, result.detectedPhrase, result);
    const url = `${window.location.origin}/r/${hash}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="mt-12 animate-in fade-in duration-300"
      role="region"
      aria-label="Easter Egg interpretation result"
    >
      {/* Section header */}
      <h2 className="text-xs font-sans font-medium text-[#c8922a] uppercase tracking-wider mb-4">
        Interpretation
      </h2>

      {/* Main result card - dark theme */}
      <div className="bg-[#1a1a1a] border-l-2 border-l-[#c8922a] rounded-r-md overflow-hidden relative">
        {/* Easter Egg badge */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[10px] text-[#c8922a] uppercase tracking-wider">
            Easter Egg Detected
          </span>
        </div>

        {/* Detected phrase */}
        <div className="px-5 py-4 border-b border-[#3a3730]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-1">
            Detected Phrase
          </span>
          <span className="font-mono text-[#f0ece6]">
            &ldquo;{result.detectedPhrase}&rdquo;
          </span>
        </div>

        {/* Primary interpretation - hero section */}
        <div className="px-5 py-6 border-b border-[#3a3730] bg-[#0f0f0e]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-3">
            Interpreted Time
          </span>
          <div className="flex items-start gap-3">
            <span className="text-[#c8922a] text-2xl leading-none select-none">—</span>
            <span className="font-display text-[28px] sm:text-[32px] text-[#f0ece6] leading-tight">
              {result.interpretedTime}
            </span>
          </div>
        </div>

        {/* Timezone */}
        <div className="px-5 py-4 border-b border-[#3a3730]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-1">
            Timezone
          </span>
          <span className="font-sans text-[#f0ece6]">
            {result.timezone}
          </span>
        </div>

        {/* DST Status */}
        <div className="px-5 py-4 border-b border-[#3a3730]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-2">
            Daylight Saving Status
          </span>
          <span className="text-sm text-[#a09890] leading-relaxed">
            {result.dstStatus}
          </span>
        </div>

        {/* ISO Format */}
        <div className="px-5 py-4 border-b border-[#3a3730]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-2">
            ISO 8601 Format
          </span>
          <code className="font-mono text-sm text-[#c8922a] bg-[#0f0f0e] px-3 py-2.5 rounded-[4px] inline-block">
            {result.isoFormat}
          </code>
        </div>

        {/* Plain English Explanation */}
        <div className="px-5 py-4 border-b border-[#3a3730]">
          <span className="text-xs font-sans text-[#c8922a] uppercase tracking-wider block mb-2">
            Plain English
          </span>
          <p className="text-sm text-[#a09890] leading-relaxed font-sans">
            {result.plainEnglish}
          </p>
        </div>

        {/* Assumptions */}
        {result.assumptions.length > 0 && (
          <div className="px-5 py-4 bg-[#0f0f0e] border-b border-[#3a3730]">
            <span className="text-xs font-sans text-[#6a6460] uppercase tracking-wider block mb-3">
              Assumptions Made
            </span>
            <ul className="space-y-2 pl-4">
              {result.assumptions.map((assumption, i) => (
                <li
                  key={i}
                  className="text-sm text-[#a09890] font-sans flex items-start gap-2"
                >
                  <span className="text-[#c8922a] select-none">›</span>
                  {assumption}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Copy link */}
        <div className="px-5 py-4 bg-[#1a1a1a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#3a3730]">
          <span className="text-xs text-[#6a6460] font-sans">
            Yes, you can share this.
          </span>
          <button
            onClick={handleCopyLink}
            className="
              py-2 px-4
              font-sans text-xs text-[#a09890]
              border border-[#3a3730] rounded-md
              bg-transparent
              hover:bg-[#252320] hover:border-[#4a4740] hover:text-[#f0ece6] hover:cursor-pointer
              active:bg-[#2a2725]
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-[#c8922a] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]
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
