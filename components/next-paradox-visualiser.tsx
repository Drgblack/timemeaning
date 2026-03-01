"use client";

import { useState } from "react";

type ViewMode = "proximity" | "container";

export function NextParadoxVisualiser() {
  const [viewMode, setViewMode] = useState<ViewMode>("proximity");

  // March 2026 calendar data (Sunday start)
  // Week 1: Sun 1 - Sat 7
  // Week 2: Sun 8 - Sat 14
  const weeks = [
    [1, 2, 3, 4, 5, 6, 7],   // Week 1: March 1-7
    [8, 9, 10, 11, 12, 13, 14], // Week 2: March 8-14
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isToday = (day: number) => day === 1; // Sunday, 1 March is "today"
  const isFriday = (day: number) => day === 6 || day === 13;
  const isThisFriday = (day: number) => day === 6;
  const isNextFriday = (day: number) => day === 13;
  const isThisWeek = (day: number) => day >= 1 && day <= 7;

  const getDayLabel = (day: number): string | null => {
    if (viewMode === "proximity") {
      if (day === 6) return "This Friday";
      if (day === 13) return "Next Friday";
    } else {
      if (day === 6) return "Friday of This Week";
      if (day === 13) return "Next Friday";
    }
    return null;
  };

  const getDayStyles = (day: number) => {
    const base = "relative flex flex-col items-center justify-center p-2 sm:p-3 min-h-[60px] sm:min-h-[72px] rounded transition-all";
    
    if (isToday(day)) {
      return `${base} border-2 border-[#EAB308] bg-[#FEF9C3]`;
    }
    
    if (viewMode === "container" && isThisWeek(day) && !isToday(day)) {
      return `${base} bg-[#FEF3C7] border border-[#EAB308]/30`;
    }
    
    if (isFriday(day)) {
      return `${base} bg-[#c8922a]/10 border border-[#c8922a]/40`;
    }
    
    return `${base} bg-white border border-[#e8e0d0]`;
  };

  return (
    <div className="my-8 p-4 sm:p-6 rounded-lg border border-[#e8e0d0]" style={{ backgroundColor: '#FEFCE8' }}>
      {/* Title */}
      <h3 className="font-serif text-xl sm:text-2xl text-[#3a3530] mb-2">
        Visualising the &ldquo;Next&rdquo; Paradox
      </h3>
      <p className="font-sans text-sm text-[#6a6460] mb-6">
        Two valid interpretations of relative day references, shown side by side.
      </p>

      {/* Toggle buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
        <button
          onClick={() => setViewMode("proximity")}
          className={`px-4 py-2.5 rounded-md font-sans text-sm transition-all min-h-[44px] ${
            viewMode === "proximity"
              ? "bg-[#1a1a1a] text-[#c8922a] shadow-md"
              : "bg-white border border-[#d4cfc5] text-[#6a6460] hover:border-[#c8922a]"
          }`}
        >
          The Proximity View
        </button>
        <button
          onClick={() => setViewMode("container")}
          className={`px-4 py-2.5 rounded-md font-sans text-sm transition-all min-h-[44px] ${
            viewMode === "container"
              ? "bg-[#1a1a1a] text-[#c8922a] shadow-md"
              : "bg-white border border-[#d4cfc5] text-[#6a6460] hover:border-[#c8922a]"
          }`}
        >
          The Container View
        </button>
      </div>

      {/* View explanation */}
      <div className="mb-4 p-3 rounded bg-white/60 border border-[#e8e0d0]">
        {viewMode === "proximity" ? (
          <p className="font-sans text-sm text-[#5a5550]">
            <strong className="text-[#3a3530]">Proximity View:</strong> &ldquo;Next&rdquo; means the one after the nearest occurrence. 
            &ldquo;This Friday&rdquo; is the soonest Friday; &ldquo;Next Friday&rdquo; is the one after that.
          </p>
        ) : (
          <p className="font-sans text-sm text-[#5a5550]">
            <strong className="text-[#3a3530]">Container View:</strong> Weeks are containers. 
            &ldquo;This week&rdquo; contains &ldquo;this Friday&rdquo;; &ldquo;next week&rdquo; contains &ldquo;next Friday&rdquo;.
          </p>
        )}
      </div>

      {/* Week label for container view */}
      {viewMode === "container" && (
        <div className="flex mb-2">
          <div className="flex-1 text-center">
            <span className="inline-block px-2 py-1 rounded text-xs font-mono bg-[#EAB308]/20 text-[#92750a]">
              This Week
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="inline-block px-2 py-1 rounded text-xs font-mono bg-[#c8922a]/10 text-[#8a6a20]">
              Next Week
            </span>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="bg-white rounded-lg border border-[#e8e0d0] overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[#e8e0d0]">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-2 text-center font-sans text-xs sm:text-sm text-[#6a6460] bg-[#f5f0e8]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day) => {
              const label = getDayLabel(day);
              return (
                <div key={day} className={getDayStyles(day)}>
                  {/* Today marker */}
                  {isToday(day) && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-[#EAB308] text-white">
                      Today
                    </span>
                  )}
                  
                  {/* Date number */}
                  <span className={`font-sans text-base sm:text-lg ${isToday(day) ? 'text-[#92750a] font-medium' : 'text-[#3a3530]'}`}>
                    {day}
                  </span>
                  
                  {/* Month label for day 1 */}
                  {day === 1 && (
                    <span className="text-[9px] sm:text-[10px] font-sans text-[#8a8278]">Mar</span>
                  )}
                  
                  {/* Day label */}
                  {label && (
                    <span 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono"
                      style={{ 
                        backgroundColor: isThisFriday(day) ? '#c8922a' : '#1a1a1a',
                        color: isThisFriday(day) ? 'white' : '#c8922a',
                      }}
                    >
                      {label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pro-tip box */}
      <div 
        className="mt-6 p-4 rounded-md border-l-4"
        style={{ 
          backgroundColor: '#f5f0e8',
          borderLeftColor: '#c8922a',
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#c8922a] block mb-1">
          Pro-Tip
        </span>
        <p className="font-sans text-sm text-[#3a3530] leading-relaxed">
          To eliminate ambiguity, TimeMeaning suggests using absolute dates (e.g., &ldquo;13 March&rdquo;) 
          instead of relative terms like &ldquo;next Friday.&rdquo;
        </p>
      </div>

      {/* Conflict note */}
      <details className="mt-4">
        <summary className="cursor-pointer font-sans text-xs text-[#8a8278] hover:text-[#c8922a] transition-colors">
          Note on the &ldquo;Friday on a Friday&rdquo; conflict
        </summary>
        <p className="mt-2 font-sans text-xs text-[#6a6460] leading-relaxed pl-4 border-l-2 border-[#e8e0d0]">
          When the current day is Friday, the term &ldquo;next Friday&rdquo; becomes even more volatile. 
          Some users mean &ldquo;seven days from now,&rdquo; while others mean &ldquo;the Friday in the following week container&rdquo; 
          &mdash; which could be interpreted as either 7 or 14 days away depending on whether you consider the current week to end on Saturday or Sunday.
        </p>
      </details>
    </div>
  );
}
