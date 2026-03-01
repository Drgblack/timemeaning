"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { MAX_32BIT_SIGNED, get32BitPercentage } from "@/lib/y2k38";
import AdSlot from "@/components/AdSlot";

// Historical events with Unix timestamps
const HISTORICAL_EVENTS: Record<number, string> = {
  0: "The Unix epoch. Computing's year zero.",
  1000000000: "9 September 2001, 01:46:40 UTC. The internet celebrated 'Billennium' — one billion seconds of Unix time.",
  1234567890: "13 February 2009, 23:31:30 UTC. Another internet celebration — the Unix timestamp 1,234,567,890.",
  2000000000: "18 May 2033. Two billion seconds of Unix time.",
  2147483647: "19 January 2038, 03:14:07 UTC. The last second of 32-bit Unix time. Y2K38.",
};

// Significant historical moments (within 30 days proximity)
const SIGNIFICANT_MOMENTS = [
  { timestamp: -14182940, name: "Moon landing", description: "Apollo 11 landed on the Moon (20 July 1969). This predates the Unix epoch." },
  { timestamp: 315532800, name: "First IBM PC", description: "IBM released the first PC (12 August 1981)." },
  { timestamp: 347155200, name: "Internet protocol switch", description: "ARPANET switched to TCP/IP, creating the modern Internet (1 January 1983)." },
  { timestamp: 626659200, name: "Fall of the Berlin Wall", description: "The Berlin Wall fell (9 November 1989)." },
  { timestamp: 683596800, name: "World Wide Web", description: "Tim Berners-Lee proposed the World Wide Web (12 March 1991)." },
  { timestamp: 820454400, name: "Dolly the sheep", description: "Dolly the sheep, the first cloned mammal, was born (5 July 1996)." },
  { timestamp: 946684800, name: "Y2K", description: "The Y2K moment — midnight on 1 January 2000 UTC." },
  { timestamp: 1000000000, name: "Unix Billennium", description: "One billion seconds of Unix time." },
  { timestamp: 1000166400, name: "September 11, 2001", description: "The September 11 attacks occurred." },
  { timestamp: 1099180800, name: "Facebook launched", description: "Facebook was founded (4 February 2004)." },
  { timestamp: 1168214400, name: "First iPhone", description: "Steve Jobs announced the iPhone (9 January 2007)." },
  { timestamp: 1234567890, name: "Unix 1234567890", description: "The Unix timestamp 1,234,567,890." },
  { timestamp: 1288483200, name: "Instagram launch", description: "Instagram launched (6 October 2010)." },
  { timestamp: 1325376000, name: "SOPA blackout", description: "Wikipedia and other sites went dark to protest SOPA (18 January 2012)." },
  { timestamp: 1420070400, name: "Pluto flyby", description: "New Horizons flew by Pluto (14 July 2015)." },
  { timestamp: 1500000000, name: "1.5 billion seconds", description: "Unix time reached 1.5 billion seconds." },
  { timestamp: 1584230400, name: "COVID-19 pandemic", description: "WHO declared COVID-19 a pandemic (11 March 2020)." },
  { timestamp: 1669766400, name: "ChatGPT launch", description: "OpenAI launched ChatGPT (30 November 2022)." },
];

function getHistoricalContext(timestamp: number): string | null {
  // Check exact matches first
  if (HISTORICAL_EVENTS[timestamp]) {
    return HISTORICAL_EVENTS[timestamp];
  }
  
  // Check proximity to significant moments (within 30 days = 2592000 seconds)
  const THIRTY_DAYS = 2592000;
  for (const moment of SIGNIFICANT_MOMENTS) {
    if (Math.abs(timestamp - moment.timestamp) <= THIRTY_DAYS) {
      const daysDiff = Math.floor(Math.abs(timestamp - moment.timestamp) / 86400);
      if (daysDiff === 0) {
        return `${moment.name}: ${moment.description}`;
      }
      const direction = timestamp > moment.timestamp ? "after" : "before";
      return `${daysDiff} days ${direction} ${moment.name.toLowerCase()}. ${moment.description}`;
    }
  }
  
  return null;
}

export default function UnixBirthdayPage() {
  const [activeTab, setActiveTab] = useState<"date-to-unix" | "unix-to-date">("date-to-unix");
  
  // Date to Unix state
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("00:00:00");
  const [timezoneInput, setTimezoneInput] = useState("UTC");
  const [isBirthday, setIsBirthday] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Unix to Date state
  const [unixInput, setUnixInput] = useState("");

  // Date to Unix calculation
  const dateToUnixResult = useMemo(() => {
    if (!dateInput) return null;
    
    try {
      const [year, month, day] = dateInput.split("-").map(Number);
      const [hours, minutes, seconds] = timeInput.split(":").map(Number);
      
      // Create date in UTC (simplified - in production would use timezone)
      const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
      const timestamp = Math.floor(date.getTime() / 1000);
      
      const daysSinceEpoch = Math.floor(timestamp / 86400);
      const yearsSinceEpoch = (timestamp / (365.25 * 86400)).toFixed(2);
      
      // Birthday-specific calculations
      let wwwAge = null;
      let percentUsed = null;
      if (isBirthday && timestamp > 0) {
        // WWW was proposed March 1989, launched August 1991
        const wwwTimestamp = 683596800; // March 1991
        wwwAge = timestamp > wwwTimestamp 
          ? ((timestamp - wwwTimestamp) / (365.25 * 86400)).toFixed(1)
          : null;
        percentUsed = ((timestamp / MAX_32BIT_SIGNED) * 100).toFixed(2);
      }
      
      const humanReadable = date.toUTCString();
      
      return {
        timestamp,
        humanReadable,
        daysSinceEpoch,
        yearsSinceEpoch,
        wwwAge,
        percentUsed,
        isNegative: timestamp < 0,
      };
    } catch {
      return null;
    }
  }, [dateInput, timeInput, timezoneInput, isBirthday]);

  // Unix to Date calculation
  const unixToDateResult = useMemo(() => {
    if (!unixInput) return null;
    
    try {
      let timestamp = parseInt(unixInput, 10);
      if (isNaN(timestamp)) return null;
      
      // Handle millisecond timestamps (13 digits)
      const isMilliseconds = unixInput.length === 13;
      if (isMilliseconds) {
        timestamp = Math.floor(timestamp / 1000);
      }
      
      const date = new Date(timestamp * 1000);
      const humanReadableUtc = date.toUTCString();
      const humanReadableLocal = date.toLocaleString();
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      
      const isY2K38Safe = timestamp <= MAX_32BIT_SIGNED;
      const percentThrough = get32BitPercentage(Math.max(0, timestamp)).toFixed(4);
      
      const epochDiff = timestamp;
      const epochDiffFormatted = timestamp >= 0 
        ? `${timestamp.toLocaleString()} seconds after the Unix epoch`
        : `${Math.abs(timestamp).toLocaleString()} seconds before the Unix epoch`;
      
      const historicalContext = getHistoricalContext(timestamp);
      
      return {
        timestamp,
        humanReadableUtc,
        humanReadableLocal,
        dayOfWeek,
        isY2K38Safe,
        percentThrough,
        epochDiff,
        epochDiffFormatted,
        historicalContext,
        isMilliseconds,
      };
    } catch {
      return null;
    }
  }, [unixInput]);

  const handleShare = async () => {
    if (!dateToUnixResult) return;
    const shareText = isBirthday 
      ? `I was born ${dateToUnixResult.timestamp.toLocaleString()} seconds into the digital age. Find your Unix timestamp at timemeaning.com/tools/unix-birthday`
      : `Unix timestamp ${dateToUnixResult.timestamp.toLocaleString()} — find any moment's Unix time at timemeaning.com/tools/unix-birthday`;
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout>
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight">
          What is your Unix timestamp?
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          Every moment since 1 January 1970 has a unique number. Find yours.
        </p>
      </header>

      <AdSlot slot="tool-mid" />

      {/* Explainer */}
      <div className="mb-8 p-5 bg-surface border border-border rounded-md">
        <p className="text-sm text-text-secondary leading-relaxed">
          Unix time counts the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970 — a moment called the Unix epoch. It does not count leap seconds. It is the basis of timekeeping in virtually every computer system, server, and smartphone on Earth. Your birth moment, if it occurred after 1970, has a Unix timestamp. So does every historical event in the digital age.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        <button
          onClick={() => setActiveTab("date-to-unix")}
          className={`px-4 py-3 text-sm font-sans transition-colors ${
            activeTab === "date-to-unix"
              ? "text-primary border-b-2 border-primary -mb-[1px]"
              : "text-text-secondary hover:text-foreground"
          }`}
        >
          Date → Unix
        </button>
        <button
          onClick={() => setActiveTab("unix-to-date")}
          className={`px-4 py-3 text-sm font-sans transition-colors ${
            activeTab === "unix-to-date"
              ? "text-primary border-b-2 border-primary -mb-[1px]"
              : "text-text-secondary hover:text-foreground"
          }`}
        >
          Unix → Date
        </button>
      </div>

      {/* Tab 1: Date to Unix */}
      {activeTab === "date-to-unix" && (
        <div>
          {/* Input grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">
                Date
              </label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">
                Time
              </label>
              <input
                type="time"
                step="1"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">
                Timezone
              </label>
              <input
                type="text"
                value={timezoneInput}
                onChange={(e) => setTimezoneInput(e.target.value)}
                placeholder="UTC"
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBirthday}
                  onChange={(e) => setIsBirthday(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">This is my birthday</span>
              </label>
            </div>
          </div>

          {/* Result */}
          {dateToUnixResult && (
            <div className="mt-8">
              {/* Large timestamp display */}
              <div 
                className="p-6 rounded-md text-center"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <span 
                  className="font-mono block"
                  style={{ fontSize: '32px', color: '#c8922a', letterSpacing: '0.02em' }}
                >
                  {dateToUnixResult.timestamp.toLocaleString()}
                </span>
                {dateToUnixResult.isNegative && (
                  <span className="text-xs text-red-400 mt-2 block">
                    (Negative — before the Unix epoch)
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-text-secondary">
                  <span className="text-text-muted">Human readable:</span>{" "}
                  {dateToUnixResult.humanReadable}
                </p>
                <p className="text-sm text-text-secondary">
                  <span className="text-text-muted">Days since Unix epoch:</span>{" "}
                  {dateToUnixResult.daysSinceEpoch.toLocaleString()}
                </p>
                <p className="text-sm text-text-secondary">
                  <span className="text-text-muted">Years since Unix epoch:</span>{" "}
                  {dateToUnixResult.yearsSinceEpoch}
                </p>
              </div>

              {/* Birthday-specific content */}
              {isBirthday && !dateToUnixResult.isNegative && (
                <div 
                  className="mt-6 p-5 rounded-md"
                  style={{ backgroundColor: '#2a1f00', borderLeft: '2px solid #c8922a' }}
                >
                  <h3 className="font-display text-lg text-[#f5f0e8] mb-3">
                    You were born {dateToUnixResult.timestamp.toLocaleString()} seconds into the digital age.
                  </h3>
                  {dateToUnixResult.wwwAge && (
                    <p className="text-sm text-[#c8c0b0] mb-2">
                      When you were born, the World Wide Web had existed for approximately {dateToUnixResult.wwwAge} years.
                    </p>
                  )}
                  <p className="text-sm text-[#c8c0b0]">
                    32-bit Unix time was {dateToUnixResult.percentUsed}% used up at the moment of your birth.
                  </p>
                </div>
              )}

              {/* Share */}
              <div className="mt-6">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary-hover transition-colors"
                >
                  {copied ? "Copied!" : "Share your timestamp"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Unix to Date */}
      {activeTab === "unix-to-date" && (
        <div>
          {/* Unix input */}
          <div className="mb-6">
            <label className="block text-xs font-mono text-primary uppercase tracking-wider mb-2">
              Unix Timestamp
            </label>
            <input
              type="text"
              value={unixInput}
              onChange={(e) => setUnixInput(e.target.value.replace(/[^0-9-]/g, ""))}
              placeholder="1234567890"
              className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#3a3530] rounded-md text-[#c8922a] font-mono text-xl text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-2 text-xs text-text-muted">
              Accepts 10-digit (seconds) or 13-digit (milliseconds) values
            </p>
          </div>

          {/* Result */}
          {unixToDateResult && (
            <div className="mt-8 space-y-4">
              <div className="p-5 bg-surface border border-border rounded-md">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">
                      UTC
                    </span>
                    <span className="text-foreground">{unixToDateResult.humanReadableUtc}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">
                      Your Local Time
                    </span>
                    <span className="text-foreground">{unixToDateResult.humanReadableLocal}</span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">
                      Day of Week
                    </span>
                    <span className="text-foreground">{unixToDateResult.dayOfWeek}</span>
                  </div>
                </div>
              </div>

              {/* Y2K38 status */}
              <div className="p-4 bg-surface border border-border rounded-md">
                <div className="flex items-center gap-2">
                  <span 
                    className={`w-2 h-2 rounded-full ${unixToDateResult.isY2K38Safe ? "bg-dst-active" : "bg-destructive"}`}
                  />
                  <span className="text-sm text-foreground">
                    {unixToDateResult.isY2K38Safe 
                      ? "Y2K38-safe — within 32-bit range"
                      : "Y2K38-unsafe — exceeds 32-bit limit"
                    }
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  {unixToDateResult.epochDiffFormatted}
                </p>
                <p className="text-xs text-text-muted">
                  {unixToDateResult.percentThrough}% through the 32-bit Unix time range
                </p>
              </div>

              {/* Historical context */}
              {unixToDateResult.historicalContext && (
                <div 
                  className="p-4 rounded-md"
                  style={{ backgroundColor: '#f5f0e8', border: '1px solid #e8e4de' }}
                >
                  <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-2">
                    Historical Context
                  </span>
                  <p className="text-sm text-text-secondary">
                    {unixToDateResult.historicalContext}
                  </p>
                </div>
              )}

              {unixToDateResult.isMilliseconds && (
                <p className="text-xs text-text-muted italic">
                  Detected as milliseconds timestamp — converted to seconds.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Share buttons */}
      <ShareButtons 
        label="SHARE THIS TOOL" 
        shareText="Find the Unix timestamp of any moment — including the second you were born:"
      />

      {/* Footer link */}
      <div className="mt-8 pt-6 border-t border-border">
        <Link 
          href="/learn/developer-log-timestamps"
          className="text-sm text-primary hover:underline"
        >
          Read about the Unix epoch and why 1970 was chosen →
        </Link>
      </div>
    </PageLayout>
  );
}
