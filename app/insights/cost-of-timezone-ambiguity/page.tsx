import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "The Measurable Cost of Timezone Ambiguity — TimeMeaning Insights",
  description: "A framework for calculating what your team actually loses to timezone confusion. The number is almost always larger than expected.",
};

export default function CostInsightPage() {
  return (
    <LearnArticle
      title="The measurable cost of timezone ambiguity in distributed teams"
      date="4 min read"
    >
      <p>
        Timezone confusion has a direct financial cost. It is rarely measured because it manifests as individually small incidents — a meeting that starts ten minutes late, a deadline that is missed by an hour, a deployment that is coordinated incorrectly — rather than as a single visible failure. But the aggregate is significant.
      </p>

      <p>
        Consider a distributed team of 20 people spanning four timezones. They run six standing meetings per week and send approximately 40 time-referenced messages per day across Slack, email, and project management tools. Research on distributed team communication suggests that approximately 8% of time references in cross-timezone communication contain ambiguity — abbreviations, relative expressions, or missing timezone information — that requires the recipient to either guess, ask for clarification, or double-check independently.
      </p>

      <p>
        At 40 messages per day, 8% ambiguity rate, 20 recipients, and an average of 3 minutes spent per ambiguous reference to resolve it: 40 x 0.08 x 20 x 3 minutes = 192 person-minutes per day. That is 3.2 person-hours per day — 16 person-hours per week — 832 person-hours per year — spent purely on resolving timezone ambiguity.
      </p>

      <p>
        At an average fully-loaded cost of £50 per person-hour, that is £41,600 per year in a 20-person team. For a 100-person team the number scales proportionally — roughly £200,000 per year.
      </p>

      <p>
        These are conservative estimates. They do not account for meetings that are missed entirely rather than merely delayed, for decisions made on incorrectly interpreted timestamps, or for the cognitive overhead of timezone anxiety — the low-level background stress of being uncertain whether you have the right time for an important call.
      </p>

      <p>
        The intervention cost is essentially zero. Requiring UTC offsets alongside timezone abbreviations in all written communication costs nothing and takes seconds to implement as a team norm. The return on that norm — even at half the estimated savings — is substantial.
      </p>
    </LearnArticle>
  );
}
