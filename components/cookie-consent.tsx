"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Consent state type
type ConsentState = "full" | "essential" | "custom" | null;
type ConsentPreferences = {
  analytics: boolean;
  advertising: boolean;
};

// Context for managing consent state globally
interface ConsentContextType {
  consent: ConsentState;
  preferences: ConsentPreferences;
  openPreferencesModal: () => void;
  isAdsEnabled: boolean;
}

const ConsentContext = createContext<ConsentContextType>({
  consent: null,
  preferences: { analytics: true, advertising: false },
  openPreferencesModal: () => {},
  isAdsEnabled: false,
});

export const useConsent = () => useContext(ConsentContext);

// Fire Google Consent Mode events
function fireConsentUpdate(granted: boolean, analyticsOnly: boolean = false) {
  if (typeof window === "undefined") return;
  
  const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (!dataLayer) return;
  
  const gtag = (...args: unknown[]) => dataLayer.push(args);
  
  if (granted && !analyticsOnly) {
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  } else if (analyticsOnly) {
    gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
}

// Preferences Modal Component
function PreferencesModal({
  isOpen,
  onClose,
  initialPreferences,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPreferences: ConsentPreferences;
  onSave: (prefs: ConsentPreferences) => void;
}) {
  const [analytics, setAnalytics] = useState(initialPreferences.analytics);
  const [advertising, setAdvertising] = useState(initialPreferences.advertising);

  useEffect(() => {
    setAnalytics(initialPreferences.analytics);
    setAdvertising(initialPreferences.advertising);
  }, [initialPreferences, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ analytics, advertising });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="w-full max-w-md mx-4 rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: "#1a1a1a",
          border: "1px solid #3a3530",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Header */}
        <div className="px-6 py-4" style={{ borderBottom: "1px solid #3a3530" }}>
          <h2 className="font-serif text-lg" style={{ color: "#f5f0e8" }}>
            Cookie Preferences
          </h2>
        </div>

        {/* Toggle options */}
        <div className="px-6 py-4 space-y-5">
          {/* Essential - always on */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-medium" style={{ color: "#f5f0e8" }}>
                  Essential cookies
                </span>
                <span 
                  className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: "#2a2825", color: "#8a8278" }}
                >
                  Required
                </span>
              </div>
              <p className="font-sans text-xs mt-1" style={{ color: "#8a8278" }}>
                Required for the site to function. No personal data collected.
              </p>
            </div>
            <div 
              className="w-10 h-6 rounded-full relative cursor-not-allowed"
              style={{ backgroundColor: "#c8922a" }}
            >
              <div 
                className="absolute w-4 h-4 rounded-full top-1 right-1"
                style={{ backgroundColor: "#f5f0e8" }}
              />
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="font-sans text-sm font-medium" style={{ color: "#f5f0e8" }}>
                Analytics
              </span>
              <p className="font-sans text-xs mt-1" style={{ color: "#8a8278" }}>
                Anonymous usage data to understand which tools and articles are most useful. No personal identifiers.
              </p>
            </div>
            <button
              onClick={() => setAnalytics(!analytics)}
              className="w-10 h-6 rounded-full relative transition-colors"
              style={{ backgroundColor: analytics ? "#c8922a" : "#3a3530" }}
            >
              <div 
                className="absolute w-4 h-4 rounded-full top-1 transition-all"
                style={{ 
                  backgroundColor: "#f5f0e8",
                  left: analytics ? "auto" : "4px",
                  right: analytics ? "4px" : "auto",
                }}
              />
            </button>
          </div>

          {/* Advertising */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="font-sans text-sm font-medium" style={{ color: "#f5f0e8" }}>
                Advertising
              </span>
              <p className="font-sans text-xs mt-1" style={{ color: "#8a8278" }}>
                Enables personalised advertising via Google AdSense. Allows Google to show relevant ads based on your browsing.
              </p>
            </div>
            <button
              onClick={() => setAdvertising(!advertising)}
              className="w-10 h-6 rounded-full relative transition-colors"
              style={{ backgroundColor: advertising ? "#c8922a" : "#3a3530" }}
            >
              <div 
                className="absolute w-4 h-4 rounded-full top-1 transition-all"
                style={{ 
                  backgroundColor: "#f5f0e8",
                  left: advertising ? "auto" : "4px",
                  right: advertising ? "4px" : "auto",
                }}
              />
            </button>
          </div>
        </div>

        {/* Footer buttons */}
        <div 
          className="px-6 py-4 flex items-center justify-end gap-4"
          style={{ borderTop: "1px solid #3a3530" }}
        >
          <button
            onClick={onClose}
            className="font-sans text-sm transition-colors"
            style={{ color: "#8a8278" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#c8c0b0"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8a8278"}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="font-sans text-sm font-medium px-4 py-2 rounded-md transition-all"
            style={{
              background: "linear-gradient(to bottom, #d4a040, #a87520)",
              color: "white",
              boxShadow: "0 1px 0 rgba(212,160,64,0.4) inset, 0 2px 6px rgba(168,117,32,0.4)",
            }}
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Cookie Consent Banner
function CookieConsentBanner({
  onAcceptAll,
  onEssentialOnly,
  onManagePreferences,
}: {
  onAcceptAll: () => void;
  onEssentialOnly: () => void;
  onManagePreferences: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[10000]"
      style={{
        backgroundColor: "#1a1a1a",
        borderTop: "1px solid #3a3530",
        padding: "16px 32px",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Text */}
        <p 
          className="font-sans text-sm leading-relaxed max-w-[600px]"
          style={{ color: "#f5f0e8" }}
        >
          <span role="img" aria-label="cookie">🍪</span>{" "}
          TimeMeaning uses cookies for anonymous analytics and, with your consent, personalised advertising. We don&apos;t store your time references.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onAcceptAll}
            className="font-sans text-sm font-medium px-4 rounded-md transition-all h-9"
            style={{
              background: "linear-gradient(to bottom, #d4a040, #a87520)",
              color: "white",
              boxShadow: "0 1px 0 rgba(212,160,64,0.4) inset, 0 2px 6px rgba(168,117,32,0.4)",
            }}
          >
            Accept all
          </button>
          <button
            onClick={onEssentialOnly}
            className="font-sans text-sm px-4 rounded-md transition-colors h-9"
            style={{
              border: "1px solid #5a5550",
              color: "#f5f0e8",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#8a8278"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#5a5550"}
          >
            Essential only
          </button>
          <button
            onClick={onManagePreferences}
            className="font-sans text-sm px-4 h-9 transition-colors"
            style={{ color: "#c8922a", backgroundColor: "transparent", border: "none" }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
          >
            Manage preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// Provider Component
export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);
  const [preferences, setPreferences] = useState<ConsentPreferences>({ 
    analytics: true, 
    advertising: false 
  });
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("tm_consent");
    if (stored === "full" || stored === "essential" || stored === "custom") {
      setConsent(stored);
      // Load custom preferences if stored
      const storedPrefs = localStorage.getItem("tm_consent_prefs");
      if (storedPrefs) {
        try {
          setPreferences(JSON.parse(storedPrefs));
        } catch {
          // ignore
        }
      } else if (stored === "full") {
        setPreferences({ analytics: true, advertising: true });
      } else if (stored === "essential") {
        setPreferences({ analytics: true, advertising: false });
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Don't show banner on /developers pages
  const shouldHideBanner = pathname?.startsWith("/developers");

  const handleAcceptAll = useCallback(() => {
    localStorage.setItem("tm_consent", "full");
    document.cookie = "tm_consent=full; max-age=31536000; SameSite=Lax; path=/";
    setConsent("full");
    setPreferences({ analytics: true, advertising: true });
    setShowBanner(false);
    fireConsentUpdate(true);
  }, []);

  const handleEssentialOnly = useCallback(() => {
    localStorage.setItem("tm_consent", "essential");
    document.cookie = "tm_consent=essential; max-age=31536000; SameSite=Lax; path=/";
    setConsent("essential");
    setPreferences({ analytics: true, advertising: false });
    setShowBanner(false);
    fireConsentUpdate(false, true);
  }, []);

  const handleSavePreferences = useCallback((prefs: ConsentPreferences) => {
    localStorage.setItem("tm_consent", "custom");
    localStorage.setItem("tm_consent_prefs", JSON.stringify(prefs));
    document.cookie = `tm_consent=custom; max-age=31536000; SameSite=Lax; path=/`;
    setConsent("custom");
    setPreferences(prefs);
    setShowBanner(false);
    
    if (prefs.advertising) {
      fireConsentUpdate(true);
    } else if (prefs.analytics) {
      fireConsentUpdate(false, true);
    }
  }, []);

  const openPreferencesModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const isAdsEnabled = consent === "full" || (consent === "custom" && preferences.advertising);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConsentContext.Provider value={{ consent, preferences, openPreferencesModal, isAdsEnabled }}>
      {children}
      
      {/* Banner */}
      {showBanner && !shouldHideBanner && (
        <CookieConsentBanner
          onAcceptAll={handleAcceptAll}
          onEssentialOnly={handleEssentialOnly}
          onManagePreferences={() => setShowModal(true)}
        />
      )}

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialPreferences={preferences}
        onSave={handleSavePreferences}
      />
    </ConsentContext.Provider>
  );
}
