import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "IST is the Most Dangerous Timezone Abbreviation — TimeMeaning Insights",
  description: "Three letters. Three meanings. 5.5 hours of potential error. Why IST causes more missed meetings than any other abbreviation.",
};

export default function ISTInsightPage() {
  return (
    <LearnArticle
      title="IST is the most dangerous timezone abbreviation in global business"
      adSlotPrefix="insights"
      date="4 min read"
    >
      <p>
        IST is used by India Standard Time (UTC+5:30), Irish Standard Time (UTC+1 in summer, UTC+0 in winter), and Israel Standard Time (UTC+2 standard, UTC+3 during DST). The maximum spread between these interpretations is 5 hours 30 minutes. In practical terms: a meeting scheduled for "10am IST" could be interpreted as 04:30, 09:00, or 10:00 UTC depending on which IST the sender meant.
      </p>

      <p>
        The danger is compounded by frequency. India has the world's largest English-speaking professional workforce outside the United States. Ireland is a major European hub for US technology companies. Israel has a significant and growing technology sector with extensive US and European partnerships. These are not obscure edge cases — they are three of the most commercially active English-speaking regions in the world, all sharing the same three-letter abbreviation.
      </p>

      <p>
        A sample of timezone-related scheduling failures in distributed teams consistently shows IST as the most common abbreviation involved in errors. The pattern is predictable: a sender in Mumbai writes "10am IST," a recipient in Dublin interprets it as Irish Standard Time, and the meeting is scheduled 4.5 hours late. Neither party is careless — they are both reading a genuinely ambiguous signal.
      </p>

      <p>
        The correct fix is not to memorise which IST means what. The correct fix is to stop using IST entirely in written communication. India Standard Time has no ambiguity when written as UTC+5:30. Irish Standard Time has no ambiguity when written as UTC+1. Israel Standard Time has no ambiguity when written as UTC+2. The three letters IST have no unambiguous meaning at all.
      </p>

      <p>
        TimeMeaning flags IST as ambiguous on every resolution and surfaces all three candidate interpretations. The assumption it makes — defaulting to India Standard Time based on global frequency — is documented explicitly, so any recipient who knows the context was Irish or Israeli can immediately identify the error.
      </p>
    </LearnArticle>
  );
}
