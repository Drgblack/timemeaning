import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is New York on EDT? — TimeMeaning",
  description: "Live status: Is the US East Coast currently on Eastern Daylight Time (EDT) or Eastern Standard Time (EST)?",
};

export default function EDTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "edt",
        question: "Is New York on EDT?",
        location: "New York",
        standardAbbr: "EST",
        daylightAbbr: "EDT",
        standardName: "Eastern Standard Time",
        daylightName: "Eastern Daylight Time",
        standardOffset: "UTC-5",
        daylightOffset: "UTC-4",
        timezone: "America/New_York",
        referenceCity: "New York",
        whyItMatters: "The US East Coast uses EST (UTC-5) in winter and EDT (UTC-4) in summer. Many people use 'EST' year-round when they mean 'US Eastern time' — but in summer, the correct abbreviation is EDT. This one-hour difference causes frequent scheduling errors in cross-timezone communication.",
      }}
    />
  );
}
