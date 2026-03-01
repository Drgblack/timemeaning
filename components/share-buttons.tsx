"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  label?: string;
  shareText?: string;
  url?: string;
  pageTitle?: string;
  // Backward compatibility for older call sites.
  title?: string;
  text?: string;
  imageUrl?: string;
}

export function ShareButtons({ 
  label = "SHARE THIS PAGE", 
  shareText,
  url,
  pageTitle,
  title,
  text
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    return url || window.location.href;
  };

  const getShareText = () => {
    const explicitText = shareText ?? text;
    if (explicitText !== undefined) return explicitText;

    const explicitTitle = pageTitle ?? title;
    if (explicitTitle !== undefined) {
      return `"${explicitTitle}" — from the TimeMeaning learning centre. timemeaning.com`;
    }

    return "Check out this page on TimeMeaning";
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const shareUrl = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-10">
      {/* Label */}
      <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-3">
        {label}
      </span>

      {/* Button row - full width on mobile */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
        {/* Copy link button */}
        <button
          onClick={handleCopyLink}
          className="h-11 px-4 bg-[#1a1a1a] text-white text-sm font-sans rounded-full flex items-center gap-2 hover:bg-[#2a2a2a] transition-colors flex-1 sm:flex-none justify-center sm:justify-start"
        >
          {/* Chain link icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span className={copied ? "text-[#c8922a]" : ""}>
            {copied ? "Copied" : "Copy link"}
          </span>
        </button>

        {/* Twitter/X button */}
        <button
          onClick={handleTwitterShare}
          className="h-11 w-11 sm:h-9 sm:w-auto sm:px-4 bg-black text-white text-sm font-sans rounded-full flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
          aria-label="Share on X"
        >
          {/* X logo */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn button */}
        <button
          onClick={handleLinkedInShare}
          className="h-11 w-11 sm:h-9 sm:w-auto sm:px-4 bg-[#0077b5] text-white text-sm font-sans rounded-full flex items-center justify-center hover:bg-[#006699] transition-colors"
          aria-label="Share on LinkedIn"
        >
          {/* LinkedIn logo */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Mobile sticky share bar for articles - appears after scrolling 30% down
export function MobileShareBar({ shareText, pageTitle }: { shareText?: string; pageTitle?: string }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll-based visibility: show after 30% scroll, hide near footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercent = scrollY / (documentHeight - viewportHeight);
      
      // Show after 30%, hide when near footer (last 10%)
      const shouldShow = scrollPercent > 0.3 && scrollPercent < 0.9;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const getShareText = () => {
    if (shareText) return shareText;
    if (pageTitle) return `"${pageTitle}" — from the TimeMeaning learning centre. timemeaning.com`;
    return "Check out this page on TimeMeaning";
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const text = getShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const shareUrl = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 h-[52px] bg-[#1a1a1a] 
        flex items-center justify-center gap-6 md:hidden z-50
        transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
      style={{
        borderTop: '1px solid #3a3530',
        boxShadow: '0 0 0 2px #c8922a inset, 0 -4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Amber top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
      
      {/* Copy link */}
      <button
        onClick={handleCopyLink}
        className="h-11 w-11 bg-[#2a2a2a] rounded-full flex items-center justify-center hover:bg-[#3a3a3a] transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      {/* Twitter/X */}
      <button
        onClick={handleTwitterShare}
        className="h-11 w-11 bg-black border border-white/20 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
        aria-label="Share on X"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleLinkedInShare}
        className="h-11 w-11 bg-[#0077b5] rounded-full flex items-center justify-center hover:bg-[#006699] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
    </div>
  );
}
