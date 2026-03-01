import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "The Manager's Guide to Async Coordination Across Timezones — TimeMeaning",
  description: "Practical patterns for distributed teams: explicit timezones, UTC for internal deadlines, and proactive DST flagging.",
};

export default function ManagersGuideAsyncPage() {
  return (
    <LearnArticle
      title="The Manager's Guide to Async Coordination Across Timezones"
      date="February 2026"
    >
      <p>
        Asynchronous coordination — communicating across timezones without expecting real-time responses — is the default mode of distributed work. It works well when time references are unambiguous and breaks down when they are not. This guide covers the practical patterns that reduce friction.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">State the timezone explicitly in every time reference</h2>
      
      <p>
        This sounds obvious and is frequently ignored. "The deadline is Friday at 5pm" is ambiguous for a team with members in London, New York, and Singapore. "The deadline is Friday 13 March at 17:00 UTC" is not. The cost of writing "UTC" is one word. The cost of not writing it is a support message, a missed deadline, or a confused colleague.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Use UTC for internal deadlines, local time for external communication</h2>
      
      <p>
        Within a distributed team, UTC is the lingua franca of time. It does not shift with seasons, it is unambiguous, and every team member can convert it to their local time independently. Use UTC for sprint deadlines, deployment windows, incident timelines, and any time reference that will be read by people in multiple timezones.
      </p>
      
      <p>
        For external communication with clients or partners, include their local time alongside UTC. <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">"The call is at 10:00 EST (15:00 UTC)"</span> respects the recipient's context while preserving the unambiguous reference.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Share resolved links rather than raw times</h2>
      
      <p>
        When a time reference is particularly important — a client call, a launch window, a regulatory deadline — paste it into a time interpretation tool and share the canonical link rather than the raw time. The link shows the full interpretation with all assumptions stated, and the recipient can see immediately what timezone was assumed and whether DST is active. It takes thirty seconds and eliminates an entire category of follow-up messages.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Flag the March and October/November windows proactively</h2>
      
      <p>
        During the weeks when US and European DST transitions are misaligned, notify your team explicitly. A brief message at the start of the affected week — <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">"US clocks changed yesterday, European clocks change next weekend, so our usual 4pm London / 11am New York call is now at 4pm London / 12pm New York until the 29th"</span> — costs two minutes and prevents a missed meeting.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Build timezone awareness into your meeting templates</h2>
      
      <p>
        If your team uses a recurring meeting template or a standard calendar invite format, include the UTC time and offset in the title or description by default. <span className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded">"Weekly sync — Mondays 10:00 UTC (11:00 London / 06:00 New York / 19:00 Tokyo)"</span> as a standing calendar entry removes the need for anyone to recalculate.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
