"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Set to true to enable the debug diagnostic in dev
const DEBUG_ENABLED = process.env.NODE_ENV === "development";

export function DebugDiagnostic() {
  const pathname = usePathname();
  const [scrollEnabled, setScrollEnabled] = useState<"checking" | "enabled" | "disabled">("checking");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check scroll status
    const checkScroll = () => {
      if (typeof window === "undefined") return;
      
      const html = document.documentElement;
      const body = document.body;
      
      const htmlOverflow = getComputedStyle(html).overflow;
      const bodyOverflow = getComputedStyle(body).overflow;
      
      const isBlocked = 
        htmlOverflow === "hidden" || 
        bodyOverflow === "hidden" ||
        html.style.overflow === "hidden" ||
        body.style.overflow === "hidden";
      
      setScrollEnabled(isBlocked ? "disabled" : "enabled");
    };
    
    checkScroll();
    
    // Re-check periodically in case modals change it
    const interval = setInterval(checkScroll, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!DEBUG_ENABLED || !mounted) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "16px",
        zIndex: 99999,
        padding: "8px 12px",
        backgroundColor: "#1a1a1a",
        border: "1px solid #3a3530",
        borderRadius: "6px",
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#f0ece6",
        opacity: 0.9,
        pointerEvents: "none",
      }}
    >
      <div style={{ marginBottom: "4px" }}>
        <span style={{ color: "#6a6460" }}>Scroll: </span>
        <span
          style={{
            color:
              scrollEnabled === "enabled"
                ? "#4ade80"
                : scrollEnabled === "disabled"
                ? "#ef4444"
                : "#c8922a",
          }}
        >
          {scrollEnabled}
        </span>
      </div>
      <div>
        <span style={{ color: "#6a6460" }}>Route: </span>
        <span style={{ color: "#c8922a" }}>{pathname}</span>
      </div>
    </div>
  );
}
