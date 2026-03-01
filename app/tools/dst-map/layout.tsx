import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DST Danger Map — TimeMeaning",
  description: "Which regions are switching Daylight Saving Time in the next 14 days? Check before your standing meetings break.",
  openGraph: {
    title: "DST Danger Map — TimeMeaning",
    description: "Which regions are switching Daylight Saving Time in the next 14 days? Check before your standing meetings break.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "DST Danger Map — TimeMeaning",
    description: "Which regions are switching DST in the next 14 days?",
  },
};

export default function DSTMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
