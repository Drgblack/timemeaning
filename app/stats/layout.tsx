import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Timezone Wrapped — TimeMeaning",
  description: "See your personal timezone resolution statistics. Total resolutions, ambiguous abbreviations encountered, DST-relevant lookups, and more.",
  openGraph: {
    title: "Your Timezone Wrapped — TimeMeaning",
    description: "See your personal timezone resolution statistics. Total resolutions, ambiguous abbreviations encountered, DST-relevant lookups, and more.",
    type: "website",
    siteName: "TimeMeaning",
  },
  alternates: {
    canonical: "https://timemeaning.com/stats",
  },
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
