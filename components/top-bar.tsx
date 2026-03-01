// TopBar component - navigation header
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { SearchPanel } from "./search-panel";

const navLinks = [
  { href: "/learn", label: "LEARN" },
  { href: "/examples", label: "EXAMPLES" },
  { href: "/insights", label: "INSIGHTS" },
  { href: "/tools", label: "TOOLS" },
  { href: "/blog", label: "BLOG" },
];

// Detect if user is on Mac
function isMac(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

export function TopBar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMacOS, setIsMacOS] = useState(false);
useEffect(() => {
  // Remove any existing Google Translate script to prevent duplicates
  const existingScript = document.getElementById('google-translate-widget')
  if (existingScript) return // Already loaded

  // Define the callback
  ;(window as any).googleTranslateElementInit = function () {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'de,fr,es,zh-CN,zh-TW,ja,pt,nl,it,pl,ar',
        layout: 0, // SIMPLE layout
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }

  // Inject the script
  const script = document.createElement('script')
  script.id = 'google-translate-widget'
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
}, [])
  // Detect Mac on mount
  useEffect(() => {
    setIsMacOS(isMac());
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
      
      // Cmd/Ctrl+K - open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      
      // / - focus main resolver input on homepage
      if (e.key === '/' && pathname === '/') {
        e.preventDefault();
        const mainInput = document.querySelector('[data-resolver-input]') as HTMLInputElement;
        if (mainInput) {
          mainInput.focus();
        }
      }
      
      // Escape - close any open panel
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  const searchShortcutHint = isMacOS ? '⌘K' : 'Ctrl+K';

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-menu]') && !target.closest('[data-hamburger]')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Check if current path is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <SearchPanel isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <header className="w-full bg-[#1a1a1a] transition-colors duration-200 min-h-[52px]" style={{ borderBottom: '1px solid rgba(200,146,42,0.3)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-0 flex items-center h-[52px]">
          {/* Wordmark */}
          <Link 
            href="/" 
            className="font-display text-[18px] text-[#f5f0e8] tracking-tight hover:opacity-90 transition-opacity mr-6 sm:mr-10 shrink-0"
          >
            TimeMeaning
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center flex-1">
            <div className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[13px] font-medium tracking-[0.08em] transition-colors relative pb-[2px] ${
                    isActive(link.href)
                      ? "text-[#c8922a]"
                      : "text-[#e8e4de] hover:text-[#c8922a]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-[#c8922a]" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Search icon with tooltip */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9a9590] hover:text-[#c8922a] transition-colors group relative"
              aria-label={`Search TimeMeaning (${searchShortcutHint})`}
              style={{ marginLeft: '16px' }}
              title={`Search (${searchShortcutHint})`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              {/* Tooltip */}
              <span className="absolute top-full mt-2 px-2 py-1 bg-[#1a1a1a] text-[#e8e4de] text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-[#3a3530]">
                Search ({searchShortcutHint})
              </span>
            </button>

            <div className="mx-2 lg:mx-3"><div id="google_translate_element" /></div>
            
            {/* Divider */}
            <span className="hidden lg:block w-px h-4 bg-white/[0.12] mx-6" />
            
            {/* Theme toggle */}
            <div className="hidden lg:flex items-center">
              <ThemeToggle />
            </div>
            
            {/* Trust note */}
            <span className="font-sans text-[11px] text-[#5a5550] tracking-wide hidden xl:inline ml-4">
              · No account required
            </span>
          </nav>

          {/* Mobile: Search and Hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9a9590] hover:text-[#c8922a] transition-colors"
              aria-label="Search TimeMeaning"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            
            {/* Hamburger menu button */}
            <button
              data-hamburger
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#e8e4de] hover:text-[#c8922a] transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile slide-down menu */}
        {isMobileMenuOpen && (
          <div 
            data-mobile-menu
            className="md:hidden bg-[#1a1a1a] border-b-2 border-[#c8922a]"
            style={{
              animation: 'slideDown 200ms ease-out',
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            ` }} />
            
            {/* Navigation links */}
            <nav className="px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 min-h-[48px] flex items-center font-sans text-[15px] font-medium tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "text-[#c8922a] border-b border-[#c8922a]"
                      : "text-[#e8e4de] border-b border-[#3a3530]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Divider */}
            <div className="mx-4 border-t border-[#3a3530]" />
            
            {/* Theme toggle row */}
            <div className="px-4 py-3 min-h-[48px] flex items-center justify-between">
              <span className="text-[#9a9590] text-[14px]">Theme</span>
              <ThemeToggle />
            </div>

            
            
            {/* Trust note */}
            <div className="px-4 py-3 border-t border-[#3a3530]">
              <span className="text-[11px] text-[#5a5550]">
                No account required
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}


