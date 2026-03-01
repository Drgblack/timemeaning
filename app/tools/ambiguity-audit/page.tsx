"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import AdSlot from "@/components/AdSlot";

type Abbreviation = "CST" | "IST" | "EST" | "BST" | "AST" | "GMT" | "UTC" | "Other";

const abbreviationData: Record<Abbreviation, { 
  multiplier: number; 
  meanings: { name: string; offset: string }[]; 
  maxSpread: string;
  danger: string;
}> = {
  CST: {
    multiplier: 1.4,
    meanings: [
      { name: "Central Standard Time (US)", offset: "UTC-6" },
      { name: "China Standard Time", offset: "UTC+8" },
    ],
    maxSpread: "14 hours",
    danger: "CST introduces a potential 14-hour interpretation gap on every time reference.",
  },
  IST: {
    multiplier: 1.35,
    meanings: [
      { name: "India Standard Time", offset: "UTC+5:30" },
      { name: "Irish Standard Time", offset: "UTC+1" },
      { name: "Israel Standard Time", offset: "UTC+2" },
    ],
    maxSpread: "5.5 hours",
    danger: "IST is used by three countries with up to 5.5 hours between them.",
  },
  EST: {
    multiplier: 1.35,
    meanings: [
      { name: "Eastern Standard Time (US)", offset: "UTC-5" },
      { name: "Eastern Standard Time (Australia)", offset: "UTC+10" },
    ],
    maxSpread: "15 hours",
    danger: "EST has a 15-hour spread between US and Australian meanings.",
  },
  BST: {
    multiplier: 1.25,
    meanings: [
      { name: "British Summer Time", offset: "UTC+1" },
      { name: "Bangladesh Standard Time", offset: "UTC+6" },
    ],
    maxSpread: "5 hours",
    danger: "BST creates a 5-hour ambiguity between UK summer time and Bangladesh.",
  },
  AST: {
    multiplier: 1.3,
    meanings: [
      { name: "Atlantic Standard Time", offset: "UTC-4" },
      { name: "Arabia Standard Time", offset: "UTC+3" },
    ],
    maxSpread: "4 hours",
    danger: "AST spans the Atlantic and Arabia with a 4-hour offset difference.",
  },
  GMT: {
    multiplier: 1.0,
    meanings: [
      { name: "Greenwich Mean Time", offset: "UTC+0" },
    ],
    maxSpread: "0 hours",
    danger: "GMT is unambiguous. However, people often confuse it with UK local time, which shifts to BST in summer.",
  },
  UTC: {
    multiplier: 1.0,
    meanings: [
      { name: "Coordinated Universal Time", offset: "UTC+0" },
    ],
    maxSpread: "0 hours",
    danger: "UTC is unambiguous. This is the safest abbreviation for international communication.",
  },
  Other: {
    multiplier: 1.15,
    meanings: [],
    maxSpread: "Variable",
    danger: "Unknown abbreviations carry moderate risk. Always verify the UTC offset.",
  },
};

type RiskLevel = "low" | "moderate" | "high" | "timebomb";

function getRiskLevel(score: number): RiskLevel {
  if (score < 40) return "low";
  if (score < 66) return "moderate";
  if (score < 86) return "high";
  return "timebomb";
}

const riskContent: Record<RiskLevel, { 
  label: string; 
  color: string; 
  description: string;
}> = {
  low: { 
    label: "LOW RISK", 
    color: "#4ade80",
    description: "Your team is small and localised enough that timezone confusion is unlikely to cause serious damage. For now.",
  },
  moderate: { 
    label: "MODERATE RISK", 
    color: "#c8922a",
    description: "You're probably losing one meeting per month to timezone confusion and writing it off as a scheduling error. It's not.",
  },
  high: { 
    label: "HIGH RISK", 
    color: "#e07830",
    description: "Your team has the profile of organisations that regularly miss client deadlines, double-book calls, and blame 'communication'.",
  },
  timebomb: { 
    label: "TIMEZONE TIME BOMB", 
    color: "#ef4444",
    description: "At your team's scale and geographic spread, someone on your team right now has the wrong time in their calendar.",
  },
};

function RiskGauge({ score, level }: { score: number; level: RiskLevel }) {
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = riskContent[level].color;

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto max-w-[280px]">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="12"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="font-mono text-5xl font-bold transition-colors"
          style={{ color }}
        >
          {score}%
        </span>
        <span 
          className={`font-mono text-xs mt-2 transition-colors ${level === "timebomb" ? "animate-pulse" : ""}`}
          style={{ color }}
        >
          {riskContent[level].label}
        </span>
      </div>
    </div>
  );
}

export default function AmbiguityAuditPage() {
  const [teamSize, setTeamSize] = useState(12);
  const [countries, setCountries] = useState(3);
  const [abbreviation, setAbbreviation] = useState<Abbreviation>("CST");

  const result = useMemo(() => {
    let score = 20;
    score += Math.max(0, teamSize - 5) * 1.5;
    score += Math.max(0, countries - 1) * 10;
    score *= abbreviationData[abbreviation].multiplier;
    score = Math.min(97, Math.round(score));

    return {
      score,
      level: getRiskLevel(score),
    };
  }, [teamSize, countries, abbreviation]);

  const abbrevData = abbreviationData[abbreviation];

  return (
    <PageLayout>
      <div className="max-w-xl mx-auto">
        <Link 
          href="/tools" 
          className="text-sm text-primary hover:underline font-sans mb-8 inline-block"
        >
          ← Back to Tools
        </Link>

        <h1 className="font-display text-4xl text-foreground tracking-tight mb-4">
          Team Ambiguity Audit
        </h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Three inputs. One risk score. How close is your team to a timezone disaster?
        </p>

        <AdSlot slot="tool-mid" />

        {/* Inputs */}
        <div className="space-y-8 mb-10">
          {/* Team size - label and value on same line */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label id="team-size-label" className="text-sm font-sans text-text-muted">Team size</label>
              <span className="font-mono text-lg text-foreground">{teamSize}</span>
            </div>
            <input
              type="range"
              min={2}
              max={200}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Team size"
              aria-labelledby="team-size-label"
              aria-valuemin={2}
              aria-valuemax={200}
              aria-valuenow={teamSize}
            />
          </div>

          {/* Countries - label and value on same line */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label id="countries-label" className="text-sm font-sans text-text-muted">Countries represented</label>
              <span className="font-mono text-lg text-foreground">{countries}</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={countries}
              onChange={(e) => setCountries(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Countries represented"
              aria-labelledby="countries-label"
              aria-valuemin={1}
              aria-valuemax={30}
              aria-valuenow={countries}
            />
          </div>

          {/* Abbreviation */}
          <div>
            <label className="block text-sm font-sans text-text-muted mb-3">
              Most common timezone abbreviation used internally
            </label>
            <select
              value={abbreviation}
              onChange={(e) => setAbbreviation(e.target.value as Abbreviation)}
              className="w-full px-4 py-3 bg-input border border-input-border rounded-md font-mono text-foreground focus:outline-none focus:border-primary"
            >
              <option value="CST">CST (Central/China — 14hr spread)</option>
              <option value="IST">IST (India/Ireland/Israel — 5.5hr spread)</option>
              <option value="EST">EST (Eastern US/Australia — 15hr spread)</option>
              <option value="BST">BST (British/Bangladesh — 5hr spread)</option>
              <option value="AST">AST (Atlantic/Arabia — 4hr spread)</option>
              <option value="GMT">GMT (unambiguous)</option>
              <option value="UTC">UTC (unambiguous)</option>
              <option value="Other">Other abbreviation</option>
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-card border border-border rounded-md p-8 mb-8">
          {/* Gauge */}
          <RiskGauge score={result.score} level={result.level} />

          {/* Risk description */}
          <p className="text-sm text-text-secondary leading-relaxed text-center mt-6">
            {riskContent[result.level].description}
          </p>
        </div>

        {/* Abbreviation danger card */}
        {abbreviation !== "GMT" && abbreviation !== "UTC" && (
          <div className="bg-[#1a1a1a] border-l-4 border-l-primary rounded-r-md p-5 mb-8">
            <p className="font-mono text-xs text-primary uppercase tracking-wider mb-2">
              Abbreviation Danger: {abbreviation}
            </p>
            <p className="text-sm text-[#d4d0c8] leading-relaxed mb-4">
              Your team&apos;s use of {abbreviation} {abbrevData.danger}
            </p>
            {abbrevData.meanings.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-[#3a3530]">
                {abbrevData.meanings.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-[#9a958f]">{m.name}</span>
                    <code className="text-primary bg-[#0f0f0d] px-2 py-0.5 rounded">{m.offset}</code>
                  </div>
                ))}
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#e07830] font-medium">Maximum spread</span>
                  <span className="text-[#e07830] font-medium">{abbrevData.maxSpread}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Share buttons */}
        <ShareButtons 
          label="SHARE THIS RESULT" 
          shareText={`Our team scored ${result.score}% on the TimeMeaning Ambiguity Audit. ${riskContent[result.level].label}. Find out your team's timezone risk:`}
        />

        {/* Cross-link */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link 
            href="/tools/meeting-cost" 
            className="text-sm text-primary hover:underline font-sans"
          >
            → Calculate the financial cost
          </Link>
        </div>

        <p className="mt-8 text-xs text-text-muted text-center">
          No data entered here is stored or transmitted. All calculations run in your browser.
        </p>
      </div>
    </PageLayout>
  );
}
