"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useConsent } from "@/components/cookie-consent";

/**
 * AdSenseLoader - Loads Google AdSense script only after consent is granted
 * 
 * This component should be placed in the root layout. It will:
 * 1. Check if advertising consent is granted
 * 2. Check if a publisher ID is configured
 * 3. Load the AdSense script only if both conditions are met
 */
export function AdSenseLoader() {
  const { isAdsEnabled } = useConsent();
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  
  useEffect(() => {
    // Only load AdSense if:
    // 1. Advertising consent is granted
    // 2. Publisher ID is configured
    if (isAdsEnabled && publisherId) {
      setShouldLoad(true);
    }
  }, [isAdsEnabled, publisherId]);
  
  // Don't render anything if conditions aren't met
  if (!shouldLoad || !publisherId) {
    return null;
  }
  
  return (
    <Script
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={() => {
        console.log("[TimeMeaning] AdSense script loaded");
      }}
      onError={(e) => {
        console.error("[TimeMeaning] AdSense script failed to load:", e);
      }}
    />
  );
}
