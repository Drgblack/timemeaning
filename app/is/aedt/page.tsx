import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is Sydney on AEDT? — TimeMeaning",
  description: "Live status: Is Sydney currently on Australian Eastern Daylight Time (AEDT) or Australian Eastern Standard Time (AEST)?",
};

export default function AEDTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "aedt",
        question: "Is Sydney on AEDT?",
        location: "Sydney",
        standardAbbr: "AEST",
        daylightAbbr: "AEDT",
        standardName: "Australian Eastern Standard Time",
        daylightName: "Australian Eastern Daylight Time",
        standardOffset: "UTC+10",
        daylightOffset: "UTC+11",
        timezone: "Australia/Sydney",
        referenceCity: "Sydney",
        whyItMatters: "Australia's east coast (Sydney, Melbourne, Canberra) uses AEST (UTC+10) in winter and AEDT (UTC+11) in summer. Australian DST runs opposite to the Northern Hemisphere — their summer is December-February. This creates a period in March/April and October/November where the offset between Australia and Europe/US changes by 2 hours within a few weeks.",
      }}
    />
  );
}
