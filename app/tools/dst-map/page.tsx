"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { getTransitionsInRange, getStableRegions, type DSTTransition, type RegionDST } from "@/lib/dst-data";
import AdSlot from "@/components/AdSlot";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", { 
    weekday: "short", 
    day: "numeric", 
    month: "short",
    year: "numeric"
  });
}

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getDaysSince(dateStr: string): number {
  return -getDaysUntil(dateStr);
}

function formatCurrentUTC(): string {
  const now = new Date();
  return now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
}

export default function DSTMapPage() {
  const [showStable, setShowStable] = useState(false);
  const [currentUTC, setCurrentUTC] = useState(formatCurrentUTC());

  // Update current UTC time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUTC(formatCurrentUTC());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date();

  const categorizedTransitions = useMemo(() => {
    const pastWeek = new Date(today);
    pastWeek.setDate(pastWeek.getDate() - 7);
    const nextTwoWeeks = new Date(today);
    nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14);
    
    const allRecent = getTransitionsInRange(pastWeek, nextTwoWeeks);
    
    const switchingThisWeek: DSTTransition[] = [];
    const switchingNextWeek: DSTTransition[] = [];
    const recentlySwitched: DSTTransition[] = [];
    
    allRecent.forEach(t => {
      const daysUntil = getDaysUntil(t.date);
      if (daysUntil >= 0 && daysUntil <= 7) {
        switchingThisWeek.push(t);
      } else if (daysUntil > 7 && daysUntil <= 14) {
        switchingNextWeek.push(t);
      } else if (daysUntil < 0 && daysUntil >= -7) {
        recentlySwitched.push(t);
      }
    });

    return { switchingThisWeek, switchingNextWeek, recentlySwitched };
  }, [today]);

  const stableRegions = useMemo(() => getStableRegions(), []);

  // Generate chaos forecast
  const chaosForecast = useMemo(() => {
    const { switchingThisWeek, switchingNextWeek, recentlySwitched } = categorizedTransitions;
    
    // Check for US/Europe misalignment in recent or upcoming transitions
    const usRecent = recentlySwitched.find(t => t.region === "United States");
    const euRecent = recentlySwitched.find(t => t.region === "European Union");
    const ukRecent = recentlySwitched.find(t => t.region === "United Kingdom");
    
    const usUpcoming = switchingThisWeek.find(t => t.region === "United States") || 
                       switchingNextWeek.find(t => t.region === "United States");
    const euUpcoming = switchingThisWeek.find(t => t.region === "European Union") ||
                       switchingNextWeek.find(t => t.region === "European Union");

    // If US switched but EU hasn't yet (or vice versa)
    if (usRecent && !euRecent && !ukRecent && euUpcoming) {
      const daysBetween = getDaysUntil(euUpcoming.date) + getDaysSince(usRecent.date);
      return {
        type: "chaos" as const,
        message: `The US moved its clocks on ${formatDate(usRecent.date)}. Europe moves on ${formatDate(euUpcoming.date)}. For the next ${daysBetween} days, transatlantic offsets are one hour different from their normal values. Every standing transatlantic meeting is affected.`
      };
    }

    const totalSwitching = switchingThisWeek.length + switchingNextWeek.length;
    if (totalSwitching === 0 && recentlySwitched.length === 0) {
      return {
        type: "stable" as const,
        message: "No major DST transitions in the next 14 days. Your standing meetings should be stable."
      };
    }

    if (totalSwitching > 0) {
      return {
        type: "warning" as const,
        message: `${totalSwitching} region${totalSwitching > 1 ? "s are" : " is"} transitioning in the next 14 days. Review any recurring meetings with participants in affected regions.`
      };
    }

    return null;
  }, [categorizedTransitions]);

  const TransitionCard = ({ transition, type }: { transition: DSTTransition; type: "this-week" | "next-week" | "recent" }) => {
    const daysUntil = getDaysUntil(transition.date);
    const daysSince = getDaysSince(transition.date);
    
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className={`
        p-4 rounded-md border
        ${type === "this-week" 
          ? "bg-primary/10 border-primary/30" 
          : type === "next-week" 
            ? "bg-primary/5 border-primary/20" 
            : "bg-dst-active/10 border-dst-active/30"}
      `}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-sans font-medium text-foreground text-[15px]">{transition.region}</h3>
          <span className={`
            text-xs px-2 py-0.5 rounded shrink-0
            ${type === "this-week" ? "bg-primary/20 text-primary" : 
              type === "next-week" ? "bg-primary/10 text-primary" : 
              "bg-dst-active/20 text-dst-active"}
          `}>
            {type === "recent" 
              ? `${daysSince} days ago` 
              : daysUntil === 0 
                ? "Today" 
                : `In ${daysUntil} days`}
          </span>
        </div>
        
        <p className="font-mono text-sm text-primary mb-1">
          {transition.fromOffset} → {transition.toOffset}
        </p>
        
        <p className="text-xs text-text-muted mb-2">
          {formatDate(transition.date)} at {transition.time}
        </p>
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:underline"
        >
          {expanded ? "Hide details" : "What does this mean for me?"}
        </button>
        
        {expanded && (
          <p className="text-xs text-text-secondary mt-2 leading-relaxed border-t border-border/50 pt-2">
            {transition.direction === "spring-forward" 
              ? `Clocks in ${transition.region} move forward by one hour. If you have a standing meeting with someone in this region, it will appear one hour earlier in your calendar until the next transition.`
              : `Clocks in ${transition.region} move backward by one hour. If you have a standing meeting with someone in this region, it will appear one hour later in your calendar until the next transition.`
            }
          </p>
        )}
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/tools" 
          className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
        >
          ← Back to Tools
        </Link>

        <h1 className="font-display text-4xl text-foreground tracking-tight mb-2">
          DST Transition Status
        </h1>
        <p className="text-lg text-text-secondary mb-4 leading-relaxed">
          Which regions are changing their clocks in the next 14 days — and what that means for your standing meetings.
        </p>

        <AdSlot slot="tool-mid" />
        
        {/* Live UTC display */}
        <p className="font-mono text-sm text-primary mb-8">
          Current UTC: {currentUTC}
        </p>

        {/* Chaos forecast */}
        {chaosForecast && (
          <div className={`
            rounded-md p-4 mb-8
            ${chaosForecast.type === "chaos" 
              ? "bg-primary/15 border border-primary/40" 
              : chaosForecast.type === "warning"
                ? "bg-primary/10 border border-primary/30"
                : "bg-dst-active/10 border border-dst-active/30"}
          `}>
            <p className="font-mono text-xs uppercase tracking-wider mb-2"
               style={{ color: chaosForecast.type === "chaos" ? "#e07830" : chaosForecast.type === "warning" ? "#c8922a" : "#4ade80" }}>
              Chaos Forecast
            </p>
            <p className={`text-sm leading-relaxed ${
              chaosForecast.type === "chaos" ? "text-foreground" : "text-text-secondary"
            }`}>
              {chaosForecast.message}
            </p>
          </div>
        )}

        {/* Four columns */}
        <div className="space-y-8 mb-8">
          {/* Switching this week */}
          <section>
            <h2 className="text-sm font-mono text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Switching This Week
            </h2>
            {categorizedTransitions.switchingThisWeek.length > 0 ? (
              <div className="space-y-3">
                {categorizedTransitions.switchingThisWeek.map((t, i) => (
                  <TransitionCard key={`${t.region}-${i}`} transition={t} type="this-week" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted italic">No transitions this week</p>
            )}
          </section>

          {/* Switching next week */}
          <section>
            <h2 className="text-sm font-mono text-primary/70 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary/50 rounded-full" />
              Switching Next Week
            </h2>
            {categorizedTransitions.switchingNextWeek.length > 0 ? (
              <div className="space-y-3">
                {categorizedTransitions.switchingNextWeek.map((t, i) => (
                  <TransitionCard key={`${t.region}-${i}`} transition={t} type="next-week" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted italic">No transitions next week</p>
            )}
          </section>

          {/* Recently switched */}
          <section>
            <h2 className="text-sm font-mono text-dst-active uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-dst-active rounded-full" />
              Recently Switched
            </h2>
            {categorizedTransitions.recentlySwitched.length > 0 ? (
              <div className="space-y-3">
                {categorizedTransitions.recentlySwitched.map((t, i) => (
                  <TransitionCard key={`${t.region}-${i}`} transition={t} type="recent" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-muted italic">No recent transitions</p>
            )}
          </section>

          {/* Stable regions */}
          <section>
            <button 
              onClick={() => setShowStable(!showStable)}
              className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <span className="w-2 h-2 bg-text-muted rounded-full" />
              Stable Regions ({stableRegions.length})
              <span className="text-xs ml-1">{showStable ? "▼" : "▶"}</span>
            </button>
            {showStable && (
              <div className="space-y-2">
                {stableRegions.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-card border border-border rounded-md">
                    <div>
                      <span className="text-sm font-sans text-foreground">{r.region}</span>
                      {r.note && (
                        <p className="text-xs text-text-muted mt-0.5">{r.note}</p>
                      )}
                    </div>
                    <span className="text-xs text-dst-active bg-dst-active/10 px-2 py-0.5 rounded shrink-0">
                      Stable
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Share buttons */}
        <ShareButtons 
          label="SHARE THIS TOOL" 
          shareText="Heads up — clocks are changing in some regions soon. Check which ones are affected before scheduling your next cross-timezone meeting:"
        />

        {/* Cross-link */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link 
            href="/is/bst" 
            className="text-sm text-primary hover:underline font-sans"
          >
            → Check if your timezone is currently on DST
          </Link>
        </div>

        <p className="mt-8 text-xs text-text-muted text-center">
          No data entered here is stored or transmitted. All calculations run in your browser.
        </p>
      </div>
    </PageLayout>
  );
}
