import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — TimeMeaning",
  description: "How TimeMeaning handles your data. No time references stored. GDPR compliant. Cookie policy and advertising disclosure.",
  openGraph: {
    title: "Privacy Policy — TimeMeaning",
    description: "How TimeMeaning handles your data. No time references stored. GDPR compliant.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — TimeMeaning",
    description: "How TimeMeaning handles your data. No time references stored. GDPR compliant.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
