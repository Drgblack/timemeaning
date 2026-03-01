"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { cities, findCity, formatOffset, getLocalHour, type CityData } from "@/lib/city-timezones";

// Get live UTC offset for a city using browser's Intl API
function getLiveOffset(timezone: string): number {
  const now = new Date();
  const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
  const local = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  return (local.getTime() - utc.getTime()) / 60000; // minutes
}

export default function OverlapPage() {
  const [selectedCities, setSelectedCities] = useState<CityData[]>([
    cities.find(c => c.name === "London")!,
    cities.find(c => c.name === "New York")!,
    cities.find(c => c.name === "Singapore")!,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [workStart, setWorkStart] = useState(9);
  const [workEnd, setWorkEnd] = useState(18);
  const [currentUtcHour, setCurrentUtcHour] = useState(new Date().getUTCHours());

  // Update current time indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUtcHour(new Date().getUTCHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return cities
      .filter(c => 
        c.name.toLowerCase().includes(query) && 
        !selectedCities.some(sc => sc.name === c.name)
      )
      .slice(0, 8);
  }, [searchQuery, selectedCities]);

  const addCity = (city: CityData) => {
    if (selectedCities.length < 8 && !selectedCities.some(c => c.name === city.name)) {
      setSelectedCities([...selectedCities, city]);
    }
    setSearchQuery("");
  };

  const removeCity = (cityName: string) => {
    setSelectedCities(selectedCities.filter(c => c.name !== cityName));
  };

  // Calculate overlap and burden
  const analysis = useMemo(() => {
    if (selectedCities.length < 2) return null;

    // Get live offsets for each city
    const cityOffsets = selectedCities.map(city => ({
      city,
      offset: getLiveOffset(city.timezone),
    }));

    // For each UTC hour, check if it's within working hours for each city
    const hourlyStatus: { 
      utcHour: number; 
      cities: { city: CityData; localHour: number; isWorking: boolean; isSacrifice: boolean }[];
      isOverlap: boolean;
    }[] = [];
    
    for (let utcHour = 0; utcHour < 24; utcHour++) {
      const cityStatuses = cityOffsets.map(({ city, offset }) => {
        const localHour = getLocalHour(utcHour, offset);
        const isWorking = localHour >= workStart && localHour < workEnd;
        const isSacrifice = localHour < workStart || localHour >= workEnd;
        return { city, localHour, isWorking, isSacrifice };
      });
      const isOverlap = cityStatuses.every(c => c.isWorking);
      hourlyStatus.push({ utcHour, cities: cityStatuses, isOverlap });
    }

    // Count overlap hours
    const overlapHours = hourlyStatus.filter(h => h.isOverlap).length;

    // Calculate burden for each city
    // Burden = percentage of overlap hours that fall outside typical 9-17 comfort zone
    const burdens: { city: CityData; offset: number; sacrificePercent: number; worstHour: number | null }[] = [];
    
    cityOffsets.forEach(({ city, offset }) => {
      let outsideComfortHours = 0;
      let worstHour: number | null = null;
      
      hourlyStatus.forEach(h => {
        if (h.isOverlap) {
          const cityStatus = h.cities.find(c => c.city.name === city.name);
          if (cityStatus) {
            // Outside comfort zone: before 9am or at/after 6pm
            if (cityStatus.localHour < 9 || cityStatus.localHour >= 18) {
              outsideComfortHours++;
              // Track worst hour (earliest morning or latest evening)
              if (worstHour === null) {
                worstHour = cityStatus.localHour;
              } else if (cityStatus.localHour < 6 || cityStatus.localHour >= 20) {
                worstHour = cityStatus.localHour;
              }
            }
          }
        }
      });

      const sacrificePercent = overlapHours > 0 
        ? Math.round((outsideComfortHours / overlapHours) * 100) 
        : 0;

      burdens.push({
        city,
        offset,
        sacrificePercent,
        worstHour,
      });
    });

    // Sort by burden (highest first)
    const sortedBurdens = [...burdens].sort((a, b) => b.sacrificePercent - a.sacrificePercent);
    const highestBurden = sortedBurdens[0];

    return {
      hourlyStatus,
      overlapHours,
      burdens,
      highestBurden,
    };
  }, [selectedCities, workStart, workEnd]);

  const formatHour = (h: number) => {
    if (h === 0 || h === 24) return "midnight";
    if (h === 12) return "noon";
    const hour = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "pm" : "am";
    return `${hour}${ampm}`;
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

        <h1 className="font-display text-4xl text-foreground tracking-tight mb-4">
          Global Overlap Burnout Meter
        </h1>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Which cities on your team are doing the most antisocial hours so meetings can happen?
        </p>

        {/* City selector */}
        <div className="mb-6">
          <label className="block text-sm font-sans text-text-muted mb-2">
            Add cities (up to 8)
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="w-full px-4 py-3 bg-input border border-input-border rounded-md font-sans text-foreground focus:outline-none focus:border-primary"
              disabled={selectedCities.length >= 8}
            />
            {filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredCities.map(city => (
                  <button
                    key={city.name}
                    onClick={() => addCity(city)}
                    className="w-full px-4 py-2 text-left text-sm font-sans text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {city.name} <span className="text-text-muted font-mono text-xs">{formatOffset(getLiveOffset(city.timezone))}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected cities */}
        {selectedCities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCities.map(city => (
              <span
                key={city.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-chip-bg border border-chip-border rounded-full text-sm font-sans text-chip-text"
              >
                {city.name}
                <button
                  onClick={() => removeCity(city.name)}
                  className="text-text-muted hover:text-foreground"
                  aria-label={`Remove ${city.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Working hours selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-sans text-text-muted mb-2">
              Work day starts
            </label>
            <select
              value={workStart}
              onChange={(e) => setWorkStart(Number(e.target.value))}
              className="w-full px-4 py-3 bg-input border border-input-border rounded-md font-mono text-foreground focus:outline-none focus:border-primary"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{formatHour(i)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-sans text-text-muted mb-2">
              Work day ends
            </label>
            <select
              value={workEnd}
              onChange={(e) => setWorkEnd(Number(e.target.value))}
              className="w-full px-4 py-3 bg-input border border-input-border rounded-md font-mono text-foreground focus:outline-none focus:border-primary"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{formatHour(i)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {analysis && (
          <div className="bg-card border border-border rounded-md p-6 mb-8">
            {/* Timeline visualization */}
            <div className="mb-6">
              <p className="text-sm font-sans text-text-muted mb-3">24-hour overlap view</p>
              <div className="space-y-3">
                {selectedCities.map(city => {
                  const offset = getLiveOffset(city.timezone);
                  return (
                    <div key={city.name} className="flex items-center gap-2 sm:gap-3">
                      {/* City name column - reduced on mobile, offset hidden on mobile (show on tap) */}
                      <div className="w-20 sm:w-28 shrink-0">
                        <span className="text-xs sm:text-sm font-sans text-foreground block truncate">{city.name}</span>
                        <span className="hidden sm:block text-xs font-mono text-primary">{formatOffset(offset)}</span>
                      </div>
                      <div className="flex-1 flex h-8 rounded overflow-hidden relative">
                        {analysis.hourlyStatus.map(h => {
                          const status = h.cities.find(c => c.city.name === city.name);
                          const isWorking = status?.isWorking ?? false;
                          const isOverlap = h.isOverlap;
                          const isSacrifice = !isWorking;
                          
                          return (
                            <div
                              key={h.utcHour}
                              className={`flex-1 border-r border-black/10 last:border-r-0 ${
                                isOverlap 
                                  ? "bg-primary" 
                                  : isWorking 
                                    ? "bg-primary/30" 
                                    : "bg-destructive/20"
                              }`}
                              title={`${h.utcHour}:00 UTC = ${Math.floor(status?.localHour ?? 0)}:00 local`}
                            />
                          );
                        })}
                        {/* Current time indicator */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-white/80"
                          style={{ left: `${(currentUtcHour / 24) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-primary rounded" /> All overlap
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-primary/30 rounded" /> Working
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-destructive/20 rounded" /> Outside hours
                </span>
              </div>
            </div>

            {/* Overlap summary */}
            <div className="mb-6 pb-6 border-b border-border">
              {analysis.overlapHours > 0 ? (
                <>
                  <p className="font-serif text-3xl text-primary">
                    {analysis.overlapHours} hour{analysis.overlapHours !== 1 ? 's' : ''} of overlap
                  </p>
                  <p className="text-sm text-text-muted mt-1">
                    {analysis.overlapHours} hour{analysis.overlapHours !== 1 ? 's' : ''} per day when everyone can meet during normal working hours.
                  </p>
                </>
              ) : (
                <div className="bg-primary/10 border border-primary/30 rounded p-4">
                  <p className="font-serif text-xl text-primary">
                    No working hour overlap
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    There are no hours when everyone is within their normal working window. Consider async coordination or rotating meeting times.
                  </p>
                </div>
              )}
            </div>

            {/* Team Fairness Score */}
            <div className="mb-6">
              <p className="font-mono text-xs text-primary uppercase tracking-wider mb-4">
                Team Fairness Score
              </p>
              <div className="space-y-3">
                {analysis.burdens.map(b => (
                  <div key={b.city.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-sans text-foreground">{b.city.name}</span>
                      <span className="text-sm font-mono text-text-muted">{b.sacrificePercent}%</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${b.sacrificePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highest burden callout */}
            {analysis.highestBurden && analysis.highestBurden.sacrificePercent > 30 && (
              <div className="bg-[#1a1a1a] border-l-4 border-l-primary rounded-r-md p-4 mb-6">
                <p className="text-sm text-[#d4d0c8] leading-relaxed">
                  <span className="font-medium text-primary">{analysis.highestBurden.city.name}</span> is carrying 
                  disproportionate timezone burden — {analysis.highestBurden.sacrificePercent}% of overlap meetings 
                  fall outside normal working hours.
                  {analysis.highestBurden.worstHour !== null && (
                    <> Meetings often land at {formatHour(Math.floor(analysis.highestBurden.worstHour))} {analysis.highestBurden.city.name} time.</>
                  )}
                </p>
              </div>
            )}

            {/* Share buttons */}
            <ShareButtons 
              label="SHARE THIS RESULT" 
              shareText={analysis.highestBurden ? `${analysis.highestBurden.city.name} is carrying ${analysis.highestBurden.sacrificePercent}% of the timezone burden in our team. See who's doing the suffering:` : "See who's doing the timezone suffering on your team:"}
            />
          </div>
        )}

        {selectedCities.length < 2 && (
          <div className="bg-card border border-border rounded-md p-8 text-center">
            <p className="text-text-muted">Add at least 2 cities to see overlap analysis</p>
          </div>
        )}

        <p className="mt-8 text-xs text-text-muted text-center">
          No data entered here is stored or transmitted. All calculations run in your browser.
        </p>
      </div>
    </PageLayout>
  );
}
