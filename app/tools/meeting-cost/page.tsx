"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import AdSlot from "@/components/AdSlot";

type Currency = "GBP" | "EUR" | "USD";

const currencySymbols: Record<Currency, string> = {
  GBP: "£",
  EUR: "€",
  USD: "$",
};

export default function MeetingCostPage() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [attendees, setAttendees] = useState(8);
  const [meetingsPerWeek, setMeetingsPerWeek] = useState(3);
  const [currency, setCurrency] = useState<Currency>("GBP");

  const wastedMinutesPerMeeting = 12;
  const symbol = currencySymbols[currency];

  const costs = useMemo(() => {
    const wastedHoursPerMeeting = wastedMinutesPerMeeting / 60;
    const costPerMeeting = hourlyRate * attendees * wastedHoursPerMeeting;
    const weekly = costPerMeeting * meetingsPerWeek;
    const monthly = weekly * 4.33;
    const annual = weekly * 52;
    const decade = annual * 10;
    
    return { weekly, monthly, annual, decade };
  }, [hourlyRate, attendees, meetingsPerWeek]);

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-GB", { maximumFractionDigits: 0 });
  };

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
          Cost of a Missed Meeting
        </h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          How much is timezone confusion costing your organisation each year?
        </p>

        <AdSlot slot="tool-mid" />

        {/* Inputs */}
        <div className="space-y-8 mb-10">
          {/* Hourly rate with currency */}
          <div>
            <label className="block text-sm font-sans text-text-muted mb-3">
              Average hourly rate per person
            </label>
            <div className="flex gap-2">
              <div className="flex border border-input-border rounded-md overflow-hidden">
                {(["GBP", "EUR", "USD"] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`
                      px-4 py-3 font-mono text-sm transition-colors
                      ${currency === c 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-input text-text-muted hover:bg-secondary"}
                    `}
                  >
                    {currencySymbols[c]}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value) || 1))}
                className="flex-1 px-4 py-3 bg-input border border-input-border rounded-md font-mono text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Number of people - label and value on same line */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label id="attendees-label" className="text-sm font-sans text-text-muted">
                Number of people in affected meetings
              </label>
              <span className="font-mono text-lg text-foreground">{attendees}</span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Number of people in affected meetings"
              aria-labelledby="attendees-label"
              aria-valuemin={2}
              aria-valuemax={50}
              aria-valuenow={attendees}
            />
          </div>

          {/* Meetings per week - label and value on same line */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label id="meetings-label" className="text-sm font-sans text-text-muted">
                Timezone-crossing meetings per week
              </label>
              <span className="font-mono text-lg text-foreground">{meetingsPerWeek}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={meetingsPerWeek}
              onChange={(e) => setMeetingsPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              aria-label="Timezone-crossing meetings per week"
              aria-labelledby="meetings-label"
              aria-valuemin={1}
              aria-valuemax={20}
              aria-valuenow={meetingsPerWeek}
            />
          </div>
        </div>

        {/* Results card */}
        <div className="bg-card border-l-4 border-l-primary border-t border-r border-b border-border rounded-r-md p-6 mb-8">
          {/* Main stat */}
          <div className="text-center mb-6">
            <div className="font-serif text-5xl text-primary">
              {symbol}{formatNumber(costs.annual)}
            </div>
            <div className="font-sans text-sm text-text-muted mt-2">per year</div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary/50 rounded p-3 text-center">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Per Week</div>
              <div className="font-mono text-lg text-foreground">{symbol}{formatNumber(costs.weekly)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-3 text-center">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Per Month</div>
              <div className="font-mono text-lg text-foreground">{symbol}{formatNumber(costs.monthly)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-3 text-center">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Per Year</div>
              <div className="font-mono text-lg text-foreground">{symbol}{formatNumber(costs.annual)}</div>
            </div>
            <div className="bg-secondary/50 rounded p-3 text-center">
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">Per Decade</div>
              <div className="font-mono text-lg text-foreground">{symbol}{formatNumber(costs.decade)}</div>
            </div>
          </div>

          {/* Plain English summary */}
          <p className="text-sm text-text-secondary leading-relaxed border-t border-border pt-4">
            A team of <span className="text-foreground font-medium">{attendees} people</span>, 
            each billing at <span className="text-foreground font-medium">{symbol}{hourlyRate}/hour</span>, 
            running <span className="text-foreground font-medium">{meetingsPerWeek} timezone-crossing meeting{meetingsPerWeek > 1 ? 's' : ''}</span> per week, 
            wastes approximately <span className="text-foreground font-medium">{symbol}{formatNumber(costs.weekly)}</span> every week 
            — <span className="text-foreground font-medium">{symbol}{formatNumber(costs.annual)}</span> per year 
            — purely in timezone confusion overhead. 
            Over a decade this compounds to <span className="text-foreground font-medium">{symbol}{formatNumber(costs.decade)}</span>.
          </p>
        </div>

        {/* Assumption note */}
        <p className="text-xs text-text-muted italic mb-8 leading-relaxed">
          Based on an assumed 12 minutes of confusion overhead per timezone-crossing meeting. 
          Adjust inputs to reflect your team's actual experience.
        </p>

        {/* Share buttons */}
        <ShareButtons 
          label="SHARE THIS RESULT" 
          shareText={`Our team wastes ${symbol}${formatNumber(costs.annual)} per year in timezone confusion. Calculate yours:`}
        />

        {/* Cross-link */}
        <div className="mt-8 pt-6 border-t border-border">
          <Link 
            href="/tools/ambiguity-audit" 
            className="text-sm text-primary hover:underline font-sans"
          >
            → Take the Team Ambiguity Audit
          </Link>
        </div>

        <p className="mt-8 text-xs text-text-muted text-center">
          No data entered here is stored or transmitted. All calculations run in your browser.
        </p>
      </div>
    </PageLayout>
  );
}
