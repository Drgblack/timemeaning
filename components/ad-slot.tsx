"use client";

import { useConsent } from "@/components/cookie-consent";

type AdSlotType = "leaderboard" | "rectangle" | "rectangle-small" | "sticky-sidebar";

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
}

const AD_DIMENSIONS: Record<AdSlotType, { width: string; height: string; mobileHeight?: string; label: string }> = {
  leaderboard: {
    width: "100%",
    height: "90px",
    mobileHeight: "50px",
    label: "728×90 responsive",
  },
  rectangle: {
    width: "336px",
    height: "280px",
    label: "336×280",
  },
  "rectangle-small": {
    width: "300px",
    height: "250px",
    label: "300×250",
  },
  "sticky-sidebar": {
    width: "300px",
    height: "250px",
    label: "300×250",
  },
};

export function AdSlot({ type, className = "" }: AdSlotProps) {
  const { isAdsEnabled } = useConsent();
  const config = AD_DIMENSIONS[type];

  // Don't render anything if ads are not enabled
  if (!isAdsEnabled) {
    return null;
  }

  const isStickyType = type === "sticky-sidebar";
  const isLeaderboard = type === "leaderboard";

  return (
    <div
      className={`${className}`}
      style={{
        margin: "32px 0",
        ...(isStickyType && {
          position: "sticky" as const,
          top: "100px",
        }),
      }}
    >
      <div
        style={{
          width: isLeaderboard ? "100%" : config.width,
          height: config.height,
          maxWidth: isLeaderboard ? "100%" : config.width,
          margin: isLeaderboard ? "0" : "0 auto",
          backgroundColor: "#f5f0e8",
          border: "1px dashed #c8b090",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={isLeaderboard ? "md:h-[90px] h-[50px]" : ""}
      >
        <span
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "12px",
            fontStyle: "italic",
            color: "#8a7a60",
          }}
        >
          Ad · {config.label}
        </span>
      </div>
    </div>
  );
}

// Leaderboard ad for full-width placements
export function LeaderboardAd({ className = "" }: { className?: string }) {
  return <AdSlot type="leaderboard" className={className} />;
}

// Rectangle ad for tool pages
export function RectangleAd({ className = "" }: { className?: string }) {
  return <AdSlot type="rectangle" className={className} />;
}

// Sticky sidebar ad for articles
export function StickySidebarAd({ className = "" }: { className?: string }) {
  return <AdSlot type="sticky-sidebar" className={className} />;
}
