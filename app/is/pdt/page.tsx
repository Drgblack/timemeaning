import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is the US West Coast on PDT? — TimeMeaning",
  description: "Live status: Is California currently on Pacific Daylight Time (PDT) or Pacific Standard Time (PST)?",
};

export default function PDTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "pdt",
        question: "Is the US West Coast on PDT?",
        location: "California",
        standardAbbr: "PST",
        daylightAbbr: "PDT",
        standardName: "Pacific Standard Time",
        daylightName: "Pacific Daylight Time",
        standardOffset: "UTC-8",
        daylightOffset: "UTC-7",
        timezone: "America/Los_Angeles",
        referenceCity: "Los Angeles",
        whyItMatters: "The US West Coast (California, Washington, Oregon, Nevada) uses PST (UTC-8) in winter and PDT (UTC-7) in summer. 'PST' is often used colloquially to mean 'Pacific time' year-round, but this creates a one-hour error during DST months. Tech companies headquartered in California frequently cause confusion by scheduling events in 'PST' during summer.",
      }}
    />
  );
}
