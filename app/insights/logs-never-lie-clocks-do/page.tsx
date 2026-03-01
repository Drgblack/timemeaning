import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Log Files Never Lie — But the Clocks That Generate Them Sometimes Do — TimeMeaning Insights",
  description: "The three clock failure modes that affect every production system, and why UTC logging is necessary but not sufficient.",
};

export default function LogsInsightPage() {
  return (
    <LearnArticle
      title="Log files never lie — but the clocks that generate them sometimes do"
      adSlotPrefix="insights"
      date="5 min read"
    >
      <p>
        The standard advice for system logging is correct: log everything in UTC, use ISO 8601 format, include the offset explicitly. A timestamp of 2026-03-10T14:30:00Z is unambiguous. A timestamp of 2026-03-10T14:30:00 — without the Z — is not.
      </p>

      <p>
        But even well-configured UTC logging has failure modes that produce genuinely ambiguous or incorrect timestamps. There are three common ones.
      </p>

      <p>
        The first is clock drift. System clocks drift relative to true UTC at rates between a few milliseconds and several seconds per day, depending on hardware and NTP synchronisation quality. A server that has been running for six months without NTP correction may have a clock that is 30-60 seconds wrong. In most contexts this is irrelevant. In incident investigation, where the sequence of events across multiple systems matters, a 30-second error can put log entries in the wrong causal order.
      </p>

      <p>
        The second is DST misconfiguration. Despite the advice to log in UTC, many application frameworks log in the system's local timezone by default. If a server's local timezone is set to a DST-observing zone — which is common on servers provisioned in a specific region — and the framework defaults to local time, log timestamps will shift by one hour twice per year. The resulting logs look correct for most of the year and produce a one-hour gap or duplicate hour twice annually. This gap is often not discovered until the next incident that happens to fall in the transition window.
      </p>

      <p>
        The third is timezone name without offset. A log entry timestamped 2026-03-10 14:30:00 EST is less unambiguous than it appears. EST can refer to Eastern Standard Time (UTC-5) or Australian Eastern Standard Time (UTC+10). A log aggregation system that parses this incorrectly will silently place the event 15 hours from its actual position. In a distributed system with components in different regions, this failure mode produces log timelines that are internally inconsistent in ways that are very difficult to diagnose.
      </p>

      <p>
        The solution to all three is the same: use full ISO 8601 with explicit UTC offset, synchronise all system clocks to the same NTP source, and validate log timestamp parsing as part of your observability stack setup rather than assuming it is correct.
      </p>
    </LearnArticle>
  );
}
