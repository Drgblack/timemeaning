"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/page-layout";
import { ShareButtons } from "@/components/share-buttons";
import { JsonLd, generateBreadcrumbSchema } from "@/components/json-ld";

function LiveStatusChip({ slug, label, timezone, neverDST }: { slug: string; label: string; timezone: string; neverDST?: boolean }) {
  const [isDST, setIsDST] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (neverDST) {
      setIsDST(false);
      return;
    }
    
    const now = new Date();
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    
    const janOffset = new Date(jan.toLocaleString('en-US', { timeZone: timezone })).getTime() - jan.getTime();
    const julOffset = new Date(jul.toLocaleString('en-US', { timeZone: timezone })).getTime() - jul.getTime();
    const nowOffset = new Date(now.toLocaleString('en-US', { timeZone: timezone })).getTime() - now.getTime();
    
    setIsDST(nowOffset === Math.max(janOffset, julOffset) && janOffset !== julOffset);
  }, [timezone, neverDST]);
  
  return (
    <Link
      href={`/is/${slug}`}
      className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] bg-card border border-border rounded-md hover:border-primary transition-colors"
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: isDST === null ? '#6a6460' : isDST ? '#4ade80' : '#c8922a' }}
      />
      <span className="font-mono text-sm text-foreground">{label}</span>
    </Link>
  );
}

interface ToolCard {
  slug: string;
  category: string;
  name: string;
  description: string;
  time: string;
}

const teamTools: ToolCard[] = [
  {
    slug: "quiz",
    category: "QUIZ",
    name: "Confidently Wrong",
    description: "Ten questions. How many ambiguous time references can you correctly identify?",
    time: "60 seconds",
  },
  {
    slug: "meeting-cost",
    category: "CALCULATOR",
    name: "Cost of a Missed Meeting",
    description: "How much is timezone confusion costing your organisation each year?",
    time: "2 minutes",
  },
  {
    slug: "ambiguity-audit",
    category: "AUDIT",
    name: "Team Ambiguity Audit",
    description: "Three inputs. One risk score. How close is your team to a timezone disaster?",
    time: "90 seconds",
  },
  {
    slug: "overlap",
    category: "VISUALISER",
    name: "Global Overlap Burnout Meter",
    description: "Which cities on your team are doing the most antisocial hours so meetings can happen?",
    time: "3 minutes",
  },
];

const devTools: ToolCard[] = [
  {
    slug: "dst-map",
    category: "LIVE MAP",
    name: "DST Danger Map",
    description: "Which regions are changing their clocks in the next 14 days?",
    time: "Live",
  },
  {
    slug: "lookup",
    category: "LOOKUP",
    name: "Abbreviation Lookup",
    description: "What does IST, CST, BST, or EST actually mean? Every interpretation, every UTC offset.",
    time: "Instant",
  },
  {
    slug: "time-dilation",
    category: "PHYSICS",
    name: "Time Dilation Calculator",
    description: "How much younger would you be after six months on the ISS? Real relativity physics.",
    time: "2 minutes",
  },
  {
    slug: "unix-birthday",
    category: "HISTORY",
    name: "Unix Birthday",
    description: "Find the Unix timestamp of any moment — including the second you were born.",
    time: "2 minutes",
  },
];

const comingSoonTools = [
  {
    name: "Cultural Time",
    description: "Swahili time, Ethiopian time, and other non-standard day-start conventions. Coming soon.",
  },
  {
    name: "Golden Hour",
    description: "Resolve a photo's EXIF timestamp to sun position and civil twilight status. Coming soon.",
  },
];

function ToolCardComponent({ tool }: { tool: ToolCard }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block p-4 sm:p-5 bg-card border border-border rounded-md hover:border-primary transition-colors min-h-[44px]"
    >
      <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
        {tool.category}
      </span>
      <h3 className="mt-2 font-serif text-xl text-foreground group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {tool.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
          {tool.time}
        </span>
        <span className="text-sm text-primary font-sans">
          Open tool →
        </span>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "TimeMeaning", url: "https://timemeaning.com" },
    { name: "Tools", url: "https://timemeaning.com/tools" }
  ]);

  return (
    <PageLayout>
      <JsonLd data={breadcrumbSchema} />
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight">
          Timezone Risk Suite
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          Eight tools for diagnosing, measuring, and understanding timezone risk in your team and systems.
        </p>
        <div className="mt-6 h-px w-24" style={{ backgroundColor: 'rgba(200, 146, 42, 0.5)' }} />
      </header>

      {/* Section 1: For Teams */}
      <section className="mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          For Teams
        </span>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamTools.map((tool) => (
            <ToolCardComponent key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Section 2: For Developers & Specialists */}
      <section className="mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          For Developers & Specialists
        </span>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {devTools.map((tool) => (
            <ToolCardComponent key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Section 3: Live Status */}
      <section className="mb-12">
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          Live Status
        </span>
        <p className="mt-2 text-sm text-text-secondary italic mb-4">
          Bookmarkable status pages for the timezones people argue about most.
        </p>
        <div className="flex flex-wrap gap-3">
          <LiveStatusChip slug="bst" label="BST" timezone="Europe/London" />
          <LiveStatusChip slug="edt" label="EDT" timezone="America/New_York" />
          <LiveStatusChip slug="cest" label="CEST" timezone="Europe/Berlin" />
          <LiveStatusChip slug="aedt" label="AEDT" timezone="Australia/Sydney" />
          <LiveStatusChip slug="nzdt" label="NZDT" timezone="Pacific/Auckland" />
          <LiveStatusChip slug="pdt" label="PDT" timezone="America/Los_Angeles" />
          <LiveStatusChip slug="ist-dst" label="IDT" timezone="Asia/Jerusalem" />
          <LiveStatusChip slug="wst" label="WST" timezone="Australia/Perth" neverDST />
        </div>
      </section>

      {/* Section 4: Coming Soon */}
      <section className="mb-12">
        <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
          Coming Soon
        </span>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {comingSoonTools.map((tool) => (
            <div
              key={tool.name}
              className="p-5 bg-card/50 border border-dashed border-border/50 rounded-md"
              style={{ opacity: 0.55 }}
            >
              <h3 className="font-serif text-xl text-foreground/70">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Share buttons */}
      <ShareButtons 
        label="SHARE TIMEMEANING TOOLS" 
        shareText="Eight tools for diagnosing how badly timezones are hurting your team:"
      />

      {/* Footer CTA */}
      <aside className="mt-10 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Try TimeMeaning
          </Link>{" "}
          with your own time reference.
        </p>
      </aside>
    </PageLayout>
  );
}
