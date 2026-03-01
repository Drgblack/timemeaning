"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import AdSlot from "@/components/AdSlot";

// Constants - using exact values for precision
const SPEED_OF_LIGHT = 299792458; // m/s (exact SI definition)
const GM_EARTH = 3.986004418e14; // m³/s² (Earth's gravitational parameter)
const EARTH_RADIUS = 6371000; // m (mean Earth radius)

type Environment = "iss" | "gps" | "custom";
type DurationUnit = "days" | "weeks" | "months" | "years";

const PRESETS = {
  iss: { velocity: 7660, altitude: 408000, name: "the ISS" }, // 7,660 m/s at 408 km
  gps: { velocity: 3874, altitude: 20180000, name: "a GPS satellite" }, // ~3,874 m/s at 20,180 km
};

function formatTimeDifference(seconds: number): string {
  const absSeconds = Math.abs(seconds);
  
  if (absSeconds < 0.001) {
    // Under 1 millisecond: show in microseconds
    return `${(absSeconds * 1_000_000).toFixed(2)} microseconds`;
  } else if (absSeconds < 1) {
    // 1 millisecond to 1 second: show in milliseconds
    return `${(absSeconds * 1000).toFixed(3)} milliseconds`;
  } else if (absSeconds < 60) {
    // Over 1 second: show in seconds with millisecond precision
    return `${absSeconds.toFixed(3)} seconds`;
  } else if (absSeconds < 3600) {
    // Over 60 seconds: show in minutes and seconds
    const minutes = Math.floor(absSeconds / 60);
    const secs = (absSeconds % 60).toFixed(1);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${secs} seconds`;
  } else {
    // Over 1 hour: show in hours, minutes, seconds
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const secs = (absSeconds % 60).toFixed(0);
    return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""} ${secs} seconds`;
  }
}

function durationToSeconds(value: number, unit: DurationUnit): number {
  switch (unit) {
    case "days": return value * 86400;
    case "weeks": return value * 7 * 86400;
    case "months": return value * 30.44 * 86400; // Average month
    case "years": return value * 365.25 * 86400;
  }
}

function calculateDilation(velocityMs: number, altitudeM: number, durationSeconds: number) {
  // Using binomial approximation for numerical stability at low velocities
  // c is exact integer (SI definition) - no floating point error at definition
  const c = SPEED_OF_LIGHT; // 299792458 exactly
  const c2 = c * c;
  const GM = GM_EARTH; // 3.986004418e14 m³/s²
  
  // Special relativity (velocity time dilation) - binomial approximation
  // For v << c: Δt ≈ (v²/2c²) × t
  // This is the first-order Taylor expansion of (1 - 1/γ)
  // Positive = moving clock runs slow (traveler ages less)
  const v = velocityMs;
  const specialDilation = (v * v) / (2 * c2) * durationSeconds;
  
  // General relativity (gravitational time dilation) - binomial approximation
  // Time rate difference ≈ (GM/r₁ - GM/r₂) / c²
  // Clocks in weaker gravity (higher altitude, larger r) run faster
  const r_surface = EARTH_RADIUS;
  const r_orbit = EARTH_RADIUS + altitudeM;
  
  // gravitationalDilation = (GM/r_orbit - GM/r_surface) / c² × t
  // Since r_orbit > r_surface, GM/r_orbit < GM/r_surface
  // So gravitationalDilation is NEGATIVE (orbit clock runs faster than surface)
  const gravitationalDilation = (GM / r_orbit - GM / r_surface) / c2 * durationSeconds;
  
  // Net effect:
  // specialDilation is positive (traveler ages less due to velocity)
  // gravitationalDilation is negative (orbit clock runs faster, traveler ages more)
  // netDilation = gravitationalDilation - specialDilation
  // If net is negative, the traveler is younger (velocity effect dominates, like ISS)
  // If net is positive, the traveler's clock runs ahead (gravity dominates, like GPS)
  const netDilation = gravitationalDilation - specialDilation;
  
  return {
    specialDilation,
    gravitationalDilation: Math.abs(gravitationalDilation), // Display as positive for UI
    netDilation,
  };
}

export default function TimeDilationPage() {
  const [environment, setEnvironment] = useState<Environment>("iss");
  const [velocity, setVelocity] = useState(7660);
  const [altitude, setAltitude] = useState(408);
  const [durationValue, setDurationValue] = useState(6);
  const [durationUnit, setDurationUnit] = useState<DurationUnit>("months");

  const effectiveVelocity = environment === "custom" ? velocity : PRESETS[environment].velocity;
  const effectiveAltitude = environment === "custom" ? altitude * 1000 : PRESETS[environment].altitude;
  const durationSeconds = durationToSeconds(durationValue, durationUnit);

  const result = useMemo(() => {
    return calculateDilation(effectiveVelocity, effectiveAltitude, durationSeconds);
  }, [effectiveVelocity, effectiveAltitude, durationSeconds]);

  const environmentName = environment === "custom" 
    ? `${(effectiveAltitude / 1000).toLocaleString()} km altitude at ${effectiveVelocity.toLocaleString()} m/s`
    : PRESETS[environment].name;

  const durationLabel = `${durationValue} ${durationUnit}`;

  const shareText = result.netDilation < 0
    ? `After ${durationLabel} on the ISS, I would be ${formatTimeDifference(Math.abs(result.netDilation))} younger than my twin on Earth. This is real physics, not science fiction. Calculated at timemeaning.com/tools/time-dilation`
    : `After ${durationLabel} at this altitude, my clock would run ${formatTimeDifference(result.netDilation)} fast relative to Earth. Calculated at timemeaning.com/tools/time-dilation`;

  const handleCopyShare = async () => {
    await navigator.clipboard.writeText(shareText);
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://timemeaning.com/tools/time-dilation")}`, "_blank");
  };

  return (
    <PageLayout>
      {/* Back link */}
      <Link 
        href="/tools" 
        className="inline-block text-sm text-text-secondary font-sans hover:text-foreground transition-colors mb-8"
      >
        ← Back to Tools
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight leading-tight mb-4">
          How much younger are you after a year in space?
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Time passes at a different rate depending on your velocity and altitude. This is not science fiction — it is what GPS satellites have to correct for every day.
        </p>
      </header>

      <AdSlot slot="tool-mid" />

      {/* Explainer */}
      <div className="prose-tm font-sans mb-10">
        <p>
          Einstein&apos;s theory of relativity predicts two effects that alter the rate at which time passes. Special relativity says that moving clocks run slow — the faster you travel, the more time dilates. General relativity says that clocks in weaker gravitational fields run fast — the higher your altitude, the faster your clock ticks relative to someone on the ground. On the International Space Station, both effects apply simultaneously: the ISS moves at <code>7,660 m/s</code> (slowing time) but orbits at <code>408 km</code> altitude (speeding time). The velocity effect is stronger, so ISS crew members age approximately <code>7 milliseconds</code> less per year than their counterparts on Earth.
        </p>
      </div>

      {/* Input Section */}
      <section className="mb-10">
        {/* Environment chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setEnvironment("iss")}
            className={`px-5 py-3 rounded-md font-sans text-sm transition-colors ${
              environment === "iss"
                ? "bg-primary text-primary-foreground"
                : "bg-surface border-2 border-border hover:border-primary text-foreground"
            }`}
          >
            ISS Crew Member
          </button>
          <button
            onClick={() => setEnvironment("gps")}
            className={`px-5 py-3 rounded-md font-sans text-sm transition-colors ${
              environment === "gps"
                ? "bg-primary text-primary-foreground"
                : "bg-surface border-2 border-border hover:border-primary text-foreground"
            }`}
          >
            GPS Satellite
          </button>
          <button
            onClick={() => setEnvironment("custom")}
            className={`px-5 py-3 rounded-md font-sans text-sm transition-colors ${
              environment === "custom"
                ? "bg-primary text-primary-foreground"
                : "bg-surface border-2 border-border hover:border-primary text-foreground"
            }`}
          >
            Custom
          </button>
        </div>

        {/* Duration input */}
        <div className="mb-6">
          <label className="block text-sm text-text-secondary font-sans mb-2">
            How long in this environment?
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={durationValue}
              onChange={(e) => setDurationValue(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-24 px-3 py-2 bg-input border-2 border-input-border rounded-md font-mono text-foreground focus:border-primary focus:outline-none"
              min="0"
              step="1"
            />
            <select
              value={durationUnit}
              onChange={(e) => setDurationUnit(e.target.value as DurationUnit)}
              className="px-3 py-2 bg-input border-2 border-input-border rounded-md font-sans text-foreground focus:border-primary focus:outline-none"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Custom fields */}
        {environment === "custom" && (
          <div className="space-y-4 p-4 bg-surface border border-border rounded-md">
            <div>
              <label className="block text-sm text-text-secondary font-sans mb-1">
                Orbital velocity (m/s)
              </label>
              <input
                type="number"
                value={velocity}
                onChange={(e) => setVelocity(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-input border-2 border-input-border rounded-md font-mono text-foreground focus:border-primary focus:outline-none"
                min="0"
                step="100"
              />
              <p className="mt-1 text-xs text-text-muted">
                Typical low Earth orbit: 7,800 m/s. Speed of sound: 343 m/s.
              </p>
            </div>
            <div>
              <label className="block text-sm text-text-secondary font-sans mb-1">
                Altitude above Earth&apos;s surface (km)
              </label>
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-input border-2 border-input-border rounded-md font-mono text-foreground focus:border-primary focus:outline-none"
                min="0"
                step="100"
              />
              <p className="mt-1 text-xs text-text-muted">
                ISS: 408 km. GPS satellites: 20,200 km. Commercial aircraft: ~10 km.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="mb-10">
        {/* Primary result */}
        <div className="p-6 bg-result-highlight border border-border rounded-md mb-6">
          <p className="font-display text-xl sm:text-2xl text-foreground leading-relaxed">
            {result.netDilation < 0 ? (
              <>
                After <span className="text-primary">{durationLabel}</span> on {environmentName}, you would be{" "}
                <span className="text-primary font-semibold">{formatTimeDifference(Math.abs(result.netDilation))}</span>{" "}
                younger than your twin on Earth.
              </>
            ) : (
              <>
                After <span className="text-primary">{durationLabel}</span> on {environmentName}, your clock would run{" "}
                <span className="text-primary font-semibold">{formatTimeDifference(result.netDilation)}</span>{" "}
                faster than on Earth&apos;s surface.
              </>
            )}
          </p>
        </div>

        {/* Secondary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-surface border border-border rounded-md">
            <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
              Special Relativity Effect
            </p>
            <p className="font-mono text-lg text-foreground">
              {formatTimeDifference(result.specialDilation)}
            </p>
            <p className="text-xs text-text-muted mt-1">Moving clocks run slow</p>
          </div>
          <div className="p-4 bg-surface border border-border rounded-md">
            <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
              General Relativity Effect
            </p>
            <p className="font-mono text-lg text-foreground">
              {formatTimeDifference(result.gravitationalDilation)}
            </p>
            <p className="text-xs text-text-muted mt-1">Higher clocks run fast</p>
          </div>
          <div className="p-4 bg-surface border border-border rounded-md">
            <p className="text-xs text-text-muted font-sans uppercase tracking-wider mb-1">
              Net Effect
            </p>
            <p className="font-mono text-lg text-foreground">
              {formatTimeDifference(Math.abs(result.netDilation))}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {Math.abs(result.specialDilation) > Math.abs(result.gravitationalDilation)
                ? "Velocity dominates"
                : "Gravity dominates"}
            </p>
          </div>
        </div>

        {/* Plain English explanation */}
        <div className="p-5 bg-surface border border-border rounded-md">
          {environment === "iss" && (
            <p className="text-sm text-text-secondary leading-relaxed">
              The ISS travels at 7,660 m/s — fast enough that special relativity slows your clock measurably. But the reduced gravity at 408 km altitude means your clock also ticks slightly faster than on the surface. The velocity effect wins: ISS crew members return to Earth fractionally younger than they would have been. Over a six-month mission this amounts to approximately{" "}
              <span className="font-mono">3.5 milliseconds</span>.{" "}
              NASA and ESA account for this in long-duration mission health planning.
            </p>
          )}
          {environment === "gps" && (
            <p className="text-sm text-text-secondary leading-relaxed">
              GPS satellites orbit at 20,200 km — high enough that gravitational time dilation dominates over velocity effects. Their clocks run approximately <span className="font-mono">38.4 microseconds</span> fast per day relative to Earth-based receivers. If GPS systems did not correct for this, positioning errors would accumulate at roughly 10 kilometres per day. Every GPS fix you receive has been adjusted for Einstein&apos;s relativity.
            </p>
          )}
          {environment === "custom" && (
            <p className="text-sm text-text-secondary leading-relaxed">
              At {(effectiveAltitude / 1000).toLocaleString()} km altitude travelling at {effectiveVelocity.toLocaleString()} m/s,{" "}
              {Math.abs(result.specialDilation) > Math.abs(result.gravitationalDilation) 
                ? "the velocity effect dominates — your clock runs slower than on Earth's surface due to special relativistic time dilation."
                : "the gravitational effect dominates — your clock runs faster than on Earth's surface because you're in a weaker gravitational field."}
              {" "}Over {durationLabel}, this produces a net difference of{" "}
              <span className="font-mono">{formatTimeDifference(Math.abs(result.netDilation))}</span>.
            </p>
          )}
        </div>
      </section>

      {/* Share buttons */}
      <ShareButtons 
        label="SHARE THIS RESULT" 
        shareText={shareText}
      />

      {/* Footer note */}
      <footer className="pt-6 border-t border-border">
        <p className="text-xs text-text-muted leading-relaxed">
          Calculations use the binomial approximation of the Schwarzschild metric for gravitational time dilation and the first-order Taylor expansion of the Lorentz factor for velocity time dilation. These approximations are accurate to within 0.01% for Earth-orbit velocities and altitudes. Calculations assume circular orbits and constant velocity. TimeMeaning is not responsible for any relativistic ageing that occurs during actual spaceflight.
        </p>
      </footer>
    </PageLayout>
  );
}
