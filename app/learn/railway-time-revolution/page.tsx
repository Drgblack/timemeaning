import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "The Railway Time Revolution — TimeMeaning Learning Centre",
  description: "How the train changed how we tell time. The history of standardised timezones.",
};

export default function RailwayTimeRevolutionPage() {
  return (
    <LearnArticle
      title="The Railway Time Revolution"
      description="How the train changed how we tell time."
      section="For Specialists"
      readTime="5 min"
      verifiedDate="January 2026"
      keyFacts={[
        "Before railways, every town set its own local time",
        "Great Western Railway adopted London time in 1840",
        "UK standardised on GMT in 1880",
        "International time zones established in 1884",
      ]}
      relatedArticles={[
        { slug: "aviation-zulu-time", title: "Aviation Time: Zulu, UTC, and Why Pilots Never Use Local Time", readTime: "7 min", type: "learn" },
        { slug: "nautical-time-zones", title: "Nautical Time Zones", readTime: "7 min", type: "learn" },
      ]}
    >
      <p>
        Before the railway, time was local. Every town set its clocks by the sun. When it was noon in London, it was 12:11 PM in Bristol. This was not a problem — nobody needed to coordinate across distances with minute precision.
      </p>
      
      <p>
        Then came the train.
      </p>
      
      <h2>The Problem of Local Time</h2>
      
      <p>
        Railways created a coordination crisis. A train leaving Bristol at 10:00 AM local time and arriving in London at 12:00 PM local time had not taken two hours. It had taken approximately one hour and forty-nine minutes, because London time was eleven minutes ahead.
      </p>
      
      <p>
        Timetables became unreadable. Passengers missed connections. Accidents occurred when trains expected to be on different sections of track were not where they were supposed to be.
      </p>
      
      <h2>Railway Time</h2>
      
      <p>
        In 1840, the Great Western Railway made a radical decision: all stations on their network would use London time, regardless of local solar time. This &ldquo;railway time&rdquo; spread quickly to other rail companies.
      </p>
      
      <p>
        By the 1850s, most railways in Britain operated on London time. But towns themselves still used local time. A station clock might show 10:00 (railway time) while the town church showed 9:49 (local solar time).
      </p>
      
      <p>
        This confusion persisted until 1880, when the Statutes (Definition of Time) Act legally established Greenwich Mean Time as the standard time throughout Great Britain.
      </p>
      
      <h2>The International Conference</h2>
      
      <p>
        In 1884, the International Meridian Conference in Washington, D.C. established the global system of time zones still in use today. The prime meridian was fixed at Greenwich, and the world was divided into 24 zones, each one hour apart.
      </p>
      
      <p>
        This was not universally accepted. France did not adopt Greenwich as the prime meridian until 1911 — and even then called it &ldquo;Paris Mean Time, retarded by 9 minutes 21 seconds.&rdquo;
      </p>
      
      <h2>The Legacy</h2>
      
      <blockquote>
        The railways did not just move people and goods. They moved time itself — from a local phenomenon to a coordinated system spanning continents.
      </blockquote>
      
      <p>
        Every time you check a flight departure, schedule an international call, or coordinate a global release, you are benefiting from a system invented to prevent Victorian train crashes.
      </p>
      
      <p>
        The irony is that today&apos;s timezone confusion — DST transitions, ambiguous abbreviations, regional variations — is a direct consequence of the political compromises made to implement that system. We solved one coordination problem and created many others.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
