import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is Central Europe on CEST? — TimeMeaning",
  description: "Live status: Is Central Europe currently on Central European Summer Time (CEST) or Central European Time (CET)?",
};

export default function CESTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "cest",
        question: "Is Central Europe on CEST?",
        location: "Central Europe",
        standardAbbr: "CET",
        daylightAbbr: "CEST",
        standardName: "Central European Time",
        daylightName: "Central European Summer Time",
        standardOffset: "UTC+1",
        daylightOffset: "UTC+2",
        timezone: "Europe/Berlin",
        referenceCity: "Berlin",
        whyItMatters: "CET (UTC+1) and CEST (UTC+2) cover most of continental Europe including Germany, France, Italy, Spain, and many others. People often say 'CET' when they mean 'European time' — but in summer the offset is UTC+2, not UTC+1. This causes a one-hour error in half of all cross-timezone meetings.",
      }}
    />
  );
}
