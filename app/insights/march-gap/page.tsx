import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Three Weeks in March When Transatlantic Meetings Silently Shift — TimeMeaning Insights",
  description: "The US and Europe don't change their clocks on the same day. For three weeks every spring, every standing meeting is one hour wrong.",
};

export default function MarchGapInsightPage() {
  return (
    <LearnArticle
      title="Three weeks in March when transatlantic meetings silently shift"
      adSlotPrefix="insights"
      date="3 min read"
    >
      <p>
        In 2026, the United States moves its clocks forward on 8 March. The European Union moves its clocks forward on 29 March. Between these two dates — a period of 21 days — the offset between any US timezone and any European timezone is one hour different from its normal value.
      </p>

      <p>
        A standing weekly call scheduled as "3pm ET / 8pm London" is correct for most of the year. For the three weeks between 8 March and 29 March, it becomes "3pm ET / 7pm London" — because the US has sprung forward but the UK has not. No calendar system automatically adjusts for this. The meeting invite does not update. The person who set up the recurring event almost certainly did not account for it.
      </p>

      <p>
        This is not a rare edge case. It happens every year, in both directions — a spring gap when the US moves first, and an autumn gap when the US falls back before Europe. The exact dates shift slightly year to year, but the gap is always present.
      </p>

      <p>
        The financial cost is measurable. Teams that run standing transatlantic calls are affected for approximately six weeks per year — three weeks in spring, three weeks in autumn. For a team of ten people running two standing calls per week, that is 120 meeting-hours per year where at least some participants are arriving at the wrong time.
      </p>

      <p>
        The fix is to schedule transatlantic recurring meetings in UTC and convert to local time, rather than scheduling in local time and assuming the offset is stable. UTC does not observe DST. A meeting at 20:00 UTC is always at 20:00 UTC, regardless of what either timezone has done with its clocks.
      </p>
    </LearnArticle>
  );
}
