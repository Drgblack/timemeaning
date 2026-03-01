import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timezone Abbreviation Lookup — TimeMeaning",
  description: "What does IST, CST, BST, or EST actually mean? Look up any timezone abbreviation and see every valid interpretation.",
  openGraph: {
    title: "Timezone Abbreviation Lookup — TimeMeaning",
    description: "What does IST, CST, BST, or EST actually mean? Look up any timezone abbreviation and see every valid interpretation.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timezone Abbreviation Lookup — TimeMeaning",
    description: "What does IST, CST, BST, or EST actually mean?",
  },
};

export default function LookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
