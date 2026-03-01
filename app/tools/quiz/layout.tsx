import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidently Wrong — Timezone Quiz — TimeMeaning",
  description: "A 60-second quiz testing your timezone knowledge. How many ambiguous time references can you spot?",
  openGraph: {
    title: "Confidently Wrong — Timezone Quiz — TimeMeaning",
    description: "A 60-second quiz testing your timezone knowledge. How many ambiguous time references can you spot?",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confidently Wrong — Timezone Quiz — TimeMeaning",
    description: "A 60-second quiz testing your timezone knowledge.",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
