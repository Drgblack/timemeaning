import { Metadata } from "next";
import { DSTStatusPage } from "@/components/dst-status-page";

export const metadata: Metadata = {
  title: "Is London on BST? — TimeMeaning",
  description: "Live status: Is the UK currently on British Summer Time (BST) or Greenwich Mean Time (GMT)?",
};

export default function BSTStatusPage() {
  return (
    <DSTStatusPage
      config={{
        slug: "bst",
        question: "Is London on BST?",
        location: "London",
        standardAbbr: "GMT",
        daylightAbbr: "BST",
        standardName: "Greenwich Mean Time",
        daylightName: "British Summer Time",
        standardOffset: "UTC+0",
        daylightOffset: "UTC+1",
        timezone: "Europe/London",
        referenceCity: "London",
        whyItMatters: "The UK operates on GMT (UTC+0) in winter and BST (UTC+1) in summer. The abbreviation 'GMT' is commonly used year-round by people referring to UK time, but this is technically incorrect during summer months. If someone says '3pm GMT' in July, they may mean 3pm BST — which is actually UTC+1, not UTC+0. TimeMeaning flags this ambiguity.",
      }}
    />
  );
}
