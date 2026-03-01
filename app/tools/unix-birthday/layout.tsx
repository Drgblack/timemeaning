import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Birthday — TimeMeaning",
  description: "Find the Unix timestamp of any moment — including the second you were born. How many seconds into the digital age are you?",
  openGraph: {
    title: "Unix Birthday — TimeMeaning",
    description: "Find the Unix timestamp of any moment — including the second you were born.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Birthday — TimeMeaning",
    description: "Find the Unix timestamp of any moment.",
  },
};

export default function UnixBirthdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
