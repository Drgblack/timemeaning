import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — TimeMeaning",
  description: "Interactive timezone tools including ambiguity audit, meeting cost calculator, DST overlap finder, Unix birthday calculator, and more.",
  openGraph: {
    title: "Tools — TimeMeaning",
    description: "Interactive timezone tools including ambiguity audit, meeting cost calculator, DST overlap finder, Unix birthday calculator, and more.",
    type: "website",
    siteName: "TimeMeaning",
  },
  alternates: {
    canonical: "https://timemeaning.com/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
