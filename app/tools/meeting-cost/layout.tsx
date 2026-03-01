import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of a Missed Meeting Calculator — TimeMeaning",
  description: "Calculate the financial cost of timezone confusion in your organisation. How much is your team losing to timezone errors?",
  openGraph: {
    title: "Cost of a Missed Meeting Calculator — TimeMeaning",
    description: "Calculate the financial cost of timezone confusion in your organisation.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost of a Missed Meeting Calculator — TimeMeaning",
    description: "Calculate the financial cost of timezone confusion in your organisation.",
  },
};

export default function MeetingCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
