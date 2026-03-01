import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — TimeMeaning",
  description: "Get in touch with the TimeMeaning team. Questions, corrections, feedback, and API enquiries.",
  openGraph: {
    title: "Contact — TimeMeaning",
    description: "Get in touch with the TimeMeaning team. Questions, corrections, feedback, and API enquiries.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary",
    title: "Contact — TimeMeaning",
    description: "Get in touch with the TimeMeaning team.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
