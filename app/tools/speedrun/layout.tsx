import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speedrun Challenge — TimeMeaning Tools",
  description: "How fast can you interpret a messy time reference? Compete against the tool. 10 questions, millisecond timing.",
  openGraph: {
    title: "Speedrun Challenge — TimeMeaning Tools",
    description: "How fast can you interpret a messy time reference? Compete against the tool.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedrun Challenge — TimeMeaning Tools",
    description: "How fast can you interpret a messy time reference? Compete against the tool.",
  },
};

export default function SpeedrunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
