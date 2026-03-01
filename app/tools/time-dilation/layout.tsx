import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Dilation Calculator — TimeMeaning",
  description: "How much younger would you be after six months on the ISS? Real physics. Special and general relativity.",
  openGraph: {
    title: "Time Dilation Calculator — TimeMeaning",
    description: "How much younger would you be after six months on the ISS? Real physics. Special and general relativity.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Time Dilation Calculator — TimeMeaning",
    description: "How much younger would you be after six months on the ISS?",
  },
};

export default function TimeDilationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
