"use client";

import { useState } from "react";
import Link from "next/link";
import type { GhostDate } from "@/lib/ghost-dates";

interface GhostDateResultProps {
  ghostDate: GhostDate;
  inputText: string;
  dstFallBackNote?: string | null;
  isVisible: boolean;
}

export function GhostDateResult({ ghostDate, inputText, dstFallBackNote, isVisible }: GhostDateResultProps) {
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleShare = async () => {
    const shareText = `I tried to resolve "${inputText}" and discovered it never existed. TimeMeaning flagged it as a ghost date: timemeaning.com`;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="mt-12 animate-in fade-in duration-300"
      style={{ marginTop: '48px' }}
      role="region"
      aria-label="Ghost date detected"
    >
      {/* Ghost Date Card - dark background like Easter Eggs but serious tone */}
      <div 
        className="rounded-md overflow-hidden"
        style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2825',
        }}
      >
        {/* Header with label */}
        <div 
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid #2a2825' }}
        >
          <span 
            className="font-mono uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#c8922a' }}
          >
            Ghost Date Detected
          </span>
          <span 
            className="font-mono"
            style={{ fontSize: '10px', color: '#5a5550' }}
          >
            {ghostDate.type === "dst_skip" ? "DST SKIP" : 
             ghostDate.type === "dst_ambiguous" ? "DST AMBIGUITY" :
             ghostDate.type === "skipped" ? "DATE SKIPPED" : "DATE DELETED"}
          </span>
        </div>

        {/* Input phrase */}
        <div 
          className="px-5 py-4"
          style={{ borderBottom: '1px solid #2a2825' }}
        >
          <span 
            className="font-mono"
            style={{ fontSize: '10px', letterSpacing: '0.05em', color: '#c8922a', display: 'block', marginBottom: '4px' }}
          >
            INPUT
          </span>
          <span 
            className="font-mono"
            style={{ fontSize: '14px', color: '#f5f0e8' }}
          >
            &ldquo;{inputText}&rdquo;
          </span>
        </div>

        {/* Main heading */}
        <div 
          className="px-5 py-6"
          style={{ borderBottom: '1px solid #2a2825' }}
        >
          <h2 
            className="font-display"
            style={{ fontSize: '24px', color: '#f5f0e8', lineHeight: '1.3' }}
          >
            {ghostDate.heading}
          </h2>
        </div>

        {/* Body text */}
        <div 
          className="px-5 py-5"
          style={{ borderBottom: '1px solid #2a2825' }}
        >
          <p 
            className="font-sans leading-relaxed"
            style={{ fontSize: '14px', color: '#c8c0b0', lineHeight: '1.7' }}
          >
            {ghostDate.body}
          </p>
          
          {/* DST fall-back ambiguity note */}
          {dstFallBackNote && (
            <p 
              className="mt-4 font-sans leading-relaxed"
              style={{ 
                fontSize: '13px', 
                color: '#9a9590',
                paddingTop: '12px',
                borderTop: '1px solid #2a2825',
              }}
            >
              {dstFallBackNote}
            </p>
          )}
        </div>

        {/* ISO Note */}
        <div 
          className="px-5 py-4"
          style={{ 
            backgroundColor: '#141414',
            borderBottom: '1px solid #2a2825',
          }}
        >
          <span 
            className="font-mono"
            style={{ fontSize: '10px', letterSpacing: '0.05em', color: '#c8922a', display: 'block', marginBottom: '8px' }}
          >
            ISO NOTE
          </span>
          <code 
            className="font-mono"
            style={{ fontSize: '12px', color: '#8a8278' }}
          >
            {ghostDate.isoNote}
          </code>
        </div>

        {/* Learn more link */}
        <div 
          className="px-5 py-4"
          style={{ borderBottom: '1px solid #2a2825' }}
        >
          <Link
            href="/learn/ghost-dates"
            className="font-sans hover:underline"
            style={{ fontSize: '13px', color: '#c8922a' }}
          >
            Read more about calendar reforms and ghost dates →
          </Link>
        </div>

        {/* Share button */}
        <div className="px-5 py-4">
          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-[4px] font-sans transition-colors"
            style={{ 
              fontSize: '13px',
              backgroundColor: '#2a2825',
              color: '#f5f0e8',
              border: '1px solid #3a3530',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c8922a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3a3530';
            }}
          >
            {copied ? "Copied!" : "Share this discovery"}
          </button>
        </div>
      </div>
    </div>
  );
}
