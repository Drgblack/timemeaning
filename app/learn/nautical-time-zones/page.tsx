import { Metadata } from "next";
import Link from "next/link";
import { LearnArticle } from "@/components/learn-article";

export const metadata: Metadata = {
  title: "Nautical Time Zones: Why the High Seas Run on Different Rules — TimeMeaning",
  description: "On land, timezone boundaries are political. On the high seas, beyond the jurisdiction of any coast, timezone boundaries are geometric — and the geometry is strict.",
};

export default function NauticalTimeZonesPage() {
  return (
    <LearnArticle
      title="Nautical Time Zones: Why the High Seas Run on Different Rules"
      date="March 2026"
    >
      <p>
        On land, timezone boundaries are political. They follow country borders, state lines, and occasionally the preferences of individual territories that decided to be 30 or 45 minutes offset from their neighbours. On the high seas, beyond the jurisdiction of any coast, timezone boundaries are geometric — and the geometry is strict.
      </p>

      <h2>The nautical zone system</h2>

      <p>
        The high seas are divided into 25 nautical time zones, each spanning exactly 15 degrees of longitude. Since the Earth rotates 360 degrees in 24 hours, each 15-degree zone represents exactly one hour of solar time. The zones are lettered A through M (skipping J) for zones east of the prime meridian and N through Y for zones west, with Z designating the zero meridian zone (UTC).
      </p>

      <p>
        A vessel&apos;s nautical zone is determined solely by its longitude. A ship at 47°W is in zone D (UTC−3, covering 37.5°W to 52.5°W). A ship at 130°E is in zone I (UTC+9, covering 127.5°E to 142.5°E). There is no political authority to consult, no DST to observe, no exception for national preference. The geometry decides.
      </p>

      <h2>Zone time versus ship&apos;s time</h2>

      <p>
        In practice, most merchant vessels keep what is called &quot;ship&apos;s time&quot; — a time set by the Master (captain) that may differ from the vessel&apos;s correct nautical zone time. Ship&apos;s time is typically adjusted to match the destination port&apos;s local time as the vessel approaches, to simplify crew scheduling and port coordination. On a long Pacific crossing, a vessel may adjust its clocks every few days as it crosses zone boundaries, or it may keep a constant ship&apos;s time and make one large adjustment on arrival.
      </p>

      <p>
        The IMO (International Maritime Organization) recommends that zone changes be made at midnight or at the change of watch — typically 00:00, 04:00, 08:00, 12:00, 16:00, or 20:00 ship&apos;s time. A one-hour change forward or backward at 02:00 is the maritime equivalent of a DST transition and has the same consequence: one watch is either 60 minutes longer or 60 minutes shorter than normal.
      </p>

      <h2>The Date Line at sea</h2>

      <p>
        The nautical Date Line corresponds to the zone boundary between zone M (UTC+12, covering 172.5°E to 180°) and zone Y (UTC−12, covering 172.5°W to 180°). Unlike the civil International Date Line which deviates around island nations, the nautical Date Line runs straight along the 180th meridian.
      </p>

      <p>
        A vessel crossing the nautical Date Line eastward (from M time to Y time) gains a calendar day — the ship&apos;s log records two entries for the same date. Westward, a day is lost. The Master records the zone change in the deck log, and crew pay and rest calculations must account for the gained or lost 24-hour period.
      </p>

      <h2>Log timestamps and UTC</h2>

      <p>
        All official maritime logs — the deck log, the engine room log, the radio log — record events in both ship&apos;s time and UTC. The UTC timestamp is the legally authoritative reference in any subsequent incident investigation. Ship&apos;s time is kept for operational convenience; UTC is kept for record and regulatory purposes.
      </p>

      <p>
        This dual-timestamp practice means that a log entry reading <code>0847 ship&apos;s time / 2347 UTC</code> is unambiguous even though the ship&apos;s time and UTC differ by 11 hours and span two calendar dates. When reading maritime logs, always use the UTC timestamp as the reference and treat ship&apos;s time as a contextual annotation. For more on reading UTC timestamps, see{" "}
        <Link href="/learn/iso-8601-for-humans" className="text-primary hover:underline">
          Decoding ISO 8601 for Humans
        </Link>.
      </p>

      <h2>Applying this to TimeMeaning</h2>

      <p>
        Maritime professionals pasting log timestamps, ETA references, or zone-time expressions into TimeMeaning should note that the resolver treats nautical zone letters (e.g. <code>1200Z</code>, <code>0830A</code>) as UTC and UTC+1 respectively, consistent with the NATO phonetic letter assignments. For vessels on non-standard ship&apos;s time, the fastest approach is to note the offset explicitly — &quot;ship&apos;s time is UTC−4:30&quot; — so the resolver can apply the correct conversion.
      </p>

      <p>
        The International Date Line flag in TimeMeaning will trigger when a time reference implies a date crossing — for example, &quot;ETA Tuesday 22:00 ship&apos;s time, departed Wednesday 09:00 ship&apos;s time&quot; — and explain whether the discrepancy is expected given the vessel&apos;s longitude.
      </p>
    </LearnArticle>
  );
}
