import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Why Aviation Adopted Zulu Time — and Why Civilian Teams Should Too — TimeMeaning Insights",
  description: "Aviation solved the timezone problem in 1944. The solution is available to everyone. Almost no one uses it.",
};

export default function ZuluInsightPage() {
  return (
    <LearnArticle
      title="Why aviation adopted Zulu time — and why civilian teams should too"
      date="3 min read"
    >
      <p>
        The International Civil Aviation Organisation standardised Zulu time — UTC, expressed with a Z suffix — as the single reference for all aviation communication in the 1944 Chicago Convention. The reasoning was straightforward: an aircraft moves through multiple timezones during a single flight. Any communication system that relies on local time introduces ambiguity at every timezone boundary. A single universal reference eliminates that ambiguity entirely.
      </p>

      <p>
        The standard has held for over 80 years. A controller in London and a crew in Tokyo are working from the same timestamp. A METAR issued at 1200Z in Singapore means the same thing to a dispatcher in Frankfurt as it does to a pilot in Sao Paulo. No conversion is required because the reference is shared.
      </p>

      <p>
        Civilian distributed teams face the same fundamental problem aviation faced in 1944. A team member in New York and a team member in Berlin are separated by five or six hours depending on DST status. Any time reference expressed in local time requires the recipient to know the sender's timezone, know the current DST status of that timezone, and perform the mental arithmetic to convert. Each of these steps is an opportunity for error.
      </p>

      <p>
        The aviation solution — express all times as UTC with the Z suffix — is available to any team. It requires no software, no tools, no process beyond a team norm. "Let's sync at 14:00Z" is unambiguous to anyone who knows that Z means UTC, which takes approximately thirty seconds to learn.
      </p>

      <p>
        The reason civilian teams don't use it is cultural rather than technical. Local time feels natural. UTC feels foreign. But this is a solvable problem — the same way aviation crews learned to think in Zulu time, distributed teams can learn to default to UTC for internal coordination and use local time only for external-facing communication where the recipient's context is known.
      </p>

      <p>
        TimeMeaning accepts Zulu timestamps directly. 1200Z resolves without ambiguity. 3pm EST requires assumptions. The difference is not arbitrary.
      </p>
    </LearnArticle>
  );
}
