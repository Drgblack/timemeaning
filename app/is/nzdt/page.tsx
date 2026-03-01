import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is New Zealand on NZDT? — TimeMeaning",
  description: "Live status: Is New Zealand currently on NZ Daylight Time (NZDT) or NZ Standard Time (NZST)?",
};

export default function NZDTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "nzdt",
        question: "Is New Zealand on NZDT?",
        location: "New Zealand",
        standardAbbr: "NZST",
        daylightAbbr: "NZDT",
        standardName: "New Zealand Standard Time",
        daylightName: "New Zealand Daylight Time",
        standardOffset: "UTC+12",
        daylightOffset: "UTC+13",
        timezone: "Pacific/Auckland",
        referenceCity: "Auckland",
        whyItMatters: "New Zealand is one of the first major economies to see each new day. During NZDT (UTC+13), it's 13 hours ahead of UTC — meaning when it's Monday morning in Auckland, it's still Sunday afternoon in London and Sunday morning in New York. This extreme offset means 'tomorrow' in NZ is often 'today' everywhere else.",
      }}
    />
  );
}
