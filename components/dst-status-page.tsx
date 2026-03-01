"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { ShareButtons } from "@/components/share-buttons";

interface DSTStatusConfig {
  slug: string;
  question: string;
  location: string;
  standardAbbr: string;
  daylightAbbr: string;
  standardName: string;
  daylightName: string;
  standardOffset: string;
  daylightOffset: string;
  timezone: string;
  referenceCity: string;
  neverObservesDST?: boolean;
  whyItMatters: string;
}

function getTimezoneInfo(timezone: string) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const localTime = formatter.format(now);
  
  // Get timezone offset
  const offsetFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  });
  const parts = offsetFormatter.formatToParts(now);
  const offsetPart = parts.find(p => p.type === 'timeZoneName');
  const offset = offsetPart?.value || '';
  
  // Check if DST is active by comparing offsets
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  
  const janOffset = new Date(jan.toLocaleString('en-US', { timeZone: timezone })).getTime() - jan.getTime();
  const julOffset = new Date(jul.toLocaleString('en-US', { timeZone: timezone })).getTime() - jul.getTime();
  const nowOffset = new Date(now.toLocaleString('en-US', { timeZone: timezone })).getTime() - now.getTime();
  
  const isDST = nowOffset === Math.max(janOffset, julOffset) && janOffset !== julOffset;
  
  return { localTime, offset, isDST };
}

function getUTCTime() {
  const now = new Date();
  return now.toISOString().slice(11, 19);
}

function getNextTransition(timezone: string, isDST: boolean): { date: string; daysUntil: number } | null {
  const now = new Date();
  const year = now.getFullYear();
  
  // Check each day for the next year to find transition
  for (let i = 1; i < 400; i++) {
    const checkDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const prevDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    
    const checkOffset = new Date(checkDate.toLocaleString('en-US', { timeZone: timezone })).getTime() - checkDate.getTime();
    const prevOffset = new Date(prevDate.toLocaleString('en-US', { timeZone: timezone })).getTime() - prevDate.getTime();
    
    if (checkOffset !== prevOffset) {
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: timezone,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return {
        date: formatter.format(checkDate),
        daysUntil: i,
      };
    }
  }
  
  return null;
}

export function DSTStatusPage({ config }: { config: DSTStatusConfig }) {
  const [currentTime, setCurrentTime] = useState<{ local: string; utc: string; isDST: boolean } | null>(null);
  const [nextTransition, setNextTransition] = useState<{ date: string; daysUntil: number } | null>(null);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const info = getTimezoneInfo(config.timezone);
      setCurrentTime({
        local: info.localTime,
        utc: getUTCTime(),
        isDST: config.neverObservesDST ? false : info.isDST,
      });
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // Get next transition
    if (!config.neverObservesDST) {
      const transition = getNextTransition(config.timezone, currentTime?.isDST || false);
      setNextTransition(transition);
    }
    
    return () => clearInterval(interval);
  }, [config.timezone, config.neverObservesDST]);

  useEffect(() => {
    if (!nextTransition) return;
    
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(now.getTime() + nextTransition.daysUntil * 24 * 60 * 60 * 1000);
      target.setHours(2, 0, 0, 0); // Approximate transition time
      
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextTransition]);

  const isDST = currentTime?.isDST ?? false;
  const currentAbbr = isDST ? config.daylightAbbr : config.standardAbbr;
  const currentName = isDST ? config.daylightName : config.standardName;
  const currentOffset = isDST ? config.daylightOffset : config.standardOffset;
  
  const shareText = config.neverObservesDST
    ? `Is ${config.location} on ${config.daylightAbbr}? NO — AND NEVER. Checked at timemeaning.com/is/${config.slug}`
    : isDST
    ? `Is ${config.location} on ${config.daylightAbbr} right now? YES — checked at timemeaning.com/is/${config.slug}`
    : `Is ${config.location} on ${config.daylightAbbr} right now? NO — it's ${config.standardAbbr} until ${nextTransition?.date || 'the next transition'}. Checked at timemeaning.com/is/${config.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      
      {/* Hero answer block */}
      <div
        className="py-20 px-4 transition-colors"
        style={{
          backgroundColor: config.neverObservesDST ? '#1a1a2a' : isDST ? '#0a2a0a' : '#1a1a2a',
        }}
      >
        <div className="max-w-[560px] mx-auto text-center">
          {/* Large answer */}
          <div
            className="font-mono font-bold tracking-tight"
            style={{
              fontSize: 96,
              color: config.neverObservesDST ? '#c8922a' : isDST ? '#4ade80' : '#c8922a',
            }}
          >
            {config.neverObservesDST ? 'NO — AND NEVER' : isDST ? 'YES' : 'NO'}
          </div>
          
          {/* Full answer sentence */}
          <p className="font-serif text-[#f5f0e8] mt-6" style={{ fontSize: 32, lineHeight: 1.3 }}>
            {config.neverObservesDST
              ? `${config.location} does not observe Daylight Saving Time.`
              : `${config.location} is currently on ${currentName} (${currentAbbr} · ${currentOffset}).`}
          </p>
          
          {/* Current times */}
          {currentTime && (
            <div className="font-mono text-[#c8922a] mt-8" style={{ fontSize: 16 }}>
              UTC: {currentTime.utc} · {config.referenceCity}: {currentTime.local}
            </div>
          )}
        </div>
      </div>
      
      {/* Content area */}
      <main className="flex-1 bg-background">
        <div className="max-w-[560px] mx-auto px-4 py-12">
          {/* Transition info card */}
          {!config.neverObservesDST && nextTransition && (
            <div
              className="p-6 rounded-md mb-8"
              style={{ backgroundColor: '#faf8f4', borderLeft: '3px solid #c8922a' }}
            >
              <p className="text-foreground leading-relaxed">
                {isDST
                  ? `DST ends on ${nextTransition.date}. After that, ${config.location} will revert to ${config.standardName} (${config.standardOffset}).`
                  : `DST begins on ${nextTransition.date}. After that, ${config.location} will move to ${config.daylightName} (${config.daylightOffset}).`}
              </p>
              
              {countdown && (
                <div className="font-mono text-primary mt-4" style={{ fontSize: 20 }}>
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s until transition
                </div>
              )}
            </div>
          )}
          
          {/* Perth special case */}
          {config.neverObservesDST && config.slug === 'wst' && (
            <div
              className="p-6 rounded-md mb-8"
              style={{ backgroundColor: '#faf8f4', borderLeft: '3px solid #c8922a' }}
            >
              <p className="text-foreground leading-relaxed mb-4">
                Western Australia (Perth) does not observe Daylight Saving Time and has not done so since a referendum in 2009. The offset between Perth and the east coast of Australia changes by one hour twice per year — not because Perth moves, but because Sydney and Melbourne do.
              </p>
              <p className="text-text-muted text-sm italic">
                Western Australia has held four referendums on DST since 1975. All four voted against it.
              </p>
            </div>
          )}
          
          {/* Why this matters */}
          <section className="mb-8">
            <h2 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">
              Why This Matters
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {config.whyItMatters}
            </p>
          </section>
          
          {/* Share */}
          <div className="pt-8 border-t border-border">
            <ShareButtons
              title={`Is ${config.location} on ${config.daylightAbbr}?`}
              text={shareText}
              url={`https://timemeaning.com/is/${config.slug}`}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
