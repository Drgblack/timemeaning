import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is Israel on IDT? — TimeMeaning",
  description: "Live status: Is Israel currently on Israel Daylight Time (IDT) or Israel Standard Time (IST)?",
};

export default function ISTDSTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "ist-dst",
        question: "Is Israel on IDT?",
        location: "Israel",
        standardAbbr: "IST",
        daylightAbbr: "IDT",
        standardName: "Israel Standard Time",
        daylightName: "Israel Daylight Time",
        standardOffset: "UTC+2",
        daylightOffset: "UTC+3",
        timezone: "Asia/Jerusalem",
        referenceCity: "Tel Aviv",
        whyItMatters: "Israel's DST schedule has historically been irregular, sometimes determined by religious calendar considerations rather than fixed calendar dates. This makes it harder to predict than European or American DST. Additionally, 'IST' is ambiguous — it could mean Israel Standard Time (UTC+2), India Standard Time (UTC+5:30), or Irish Standard Time (UTC+1). When someone says 'IST', you need context to know which one.",
      }}
    />
  );
}
