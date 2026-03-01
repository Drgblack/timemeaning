import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Does Perth observe DST? — TimeMeaning",
  description: "Live status: Is Western Australia (Perth) currently observing Daylight Saving Time? (Spoiler: No, and it never does.)",
};

export default function WSTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "wst",
        question: "Does Perth observe DST?",
        location: "Perth (Western Australia)",
        standardAbbr: "AWST",
        daylightAbbr: "AWDT",
        standardName: "Australian Western Standard Time",
        daylightName: "Australian Western Daylight Time",
        standardOffset: "UTC+8",
        daylightOffset: "UTC+9",
        timezone: "Australia/Perth",
        referenceCity: "Perth",
        neverObservesDST: true,
        whyItMatters: "Western Australia does not observe DST. Perth stays on AWST (UTC+8) year-round. This is often confusing because Sydney and Melbourne do observe DST — so the offset between Perth and Australia's east coast changes twice a year. When Sydney is on AEDT (UTC+11), it's 3 hours ahead of Perth. When Sydney is on AEST (UTC+10), it's only 2 hours ahead. Perth doesn't move; the east coast does.",
      }}
    />
  );
}
