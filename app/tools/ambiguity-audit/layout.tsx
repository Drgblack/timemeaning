import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Ambiguity Audit — TimeMeaning",
  description: "How close is your team to a timezone disaster? Three inputs. One uncomfortable risk score.",
  openGraph: {
    title: "Team Ambiguity Audit — TimeMeaning",
    description: "How close is your team to a timezone disaster? Three inputs. One uncomfortable risk score.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Ambiguity Audit — TimeMeaning",
    description: "How close is your team to a timezone disaster?",
  },
};

export default function AmbiguityAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
