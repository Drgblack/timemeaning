import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Hall of Confusion — TimeMeaning",
  description: "The most genuinely confusing time references we've encountered — resolved and explained. From CST disasters to ghost dates.",
  openGraph: {
    title: "The Hall of Confusion — TimeMeaning",
    description: "The most genuinely confusing time references — resolved and explained.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hall of Confusion — TimeMeaning",
    description: "The most genuinely confusing time references — resolved and explained.",
  },
};

export default function HallOfConfusionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
