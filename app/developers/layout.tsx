import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TimeMeaning API — Private Beta",
  description: "Programmatic access to the TimeMeaning time interpretation engine. Resolve ambiguous time references, detect ghost dates, and flag Y2K38 issues via REST API.",
  openGraph: {
    title: "TimeMeaning API — Private Beta",
    description: "Programmatic access to the TimeMeaning time interpretation engine. Resolve ambiguous time references, detect ghost dates, and flag Y2K38 issues via REST API.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeMeaning API — Private Beta",
    description: "Programmatic access to the TimeMeaning time interpretation engine.",
  },
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
