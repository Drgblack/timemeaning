import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Overlap Burnout Meter — TimeMeaning",
  description: "Who is doing the suffering so your meetings can happen? Map your team's cities and see the timezone fairness score.",
  openGraph: {
    title: "Global Overlap Burnout Meter — TimeMeaning",
    description: "Who is doing the suffering so your meetings can happen? Map your team's cities and see the timezone fairness score.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Overlap Burnout Meter — TimeMeaning",
    description: "Who is doing the suffering so your meetings can happen?",
  },
};

export default function OverlapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
