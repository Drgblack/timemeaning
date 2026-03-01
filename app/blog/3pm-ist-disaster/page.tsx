import { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";

export const metadata: Metadata = {
  title: "The 3pm IST Disaster: A Story About a Missed Pitch — TimeMeaning",
  description: "A composite fiction about two professionals who read 'IST' and understood it differently — with real-world consequences.",
};

export default function ISTDisasterPage() {
  return (
    <BlogArticle
      title="The 3pm IST Disaster: A Story About a Missed Pitch"
      description="A composite fiction about two professionals who read 'IST' and understood it differently — with real-world consequences."
      slug="3pm-ist-disaster"
      date="February 2026"
      datePublished="2026-02-15"
      readTime="8 min"
    >
      <p>
        The following is a composite fiction. The specific names and company are invented. The underlying mistake is real and happens regularly.
      </p>
      <hr />
      <p>
        Aoife was the lead on a proposal her agency had been working on for six weeks. The client was a logistics firm based in Mumbai. The pitch had been rescheduled twice already. On the third attempt, a time was agreed by email: 3pm IST, Thursday.
      </p>
      <p>
        Aoife was in Dublin. She put 3pm in her calendar, set an alarm for 2:45, and spent the morning reviewing the deck.
      </p>
      <p>
        At 3pm Dublin time, she opened the video call. No one joined. She waited fifteen minutes, sent a message, and received an apology: the client had been waiting since 7:30am their time. They had assumed IST meant India Standard Time, which is UTC+5:30. Aoife had assumed IST meant Irish Standard Time, which in March is UTC+0. The gap between those two assumptions was five and a half hours.
      </p>
      <p>
        The client had moved on to another agency by the following week.
      </p>
      <hr />
      <p>
        The failure in this story is not carelessness. Both parties read "3pm IST" and understood it correctly within their own context. The failure is in the abbreviation itself, which carries two valid meanings depending on where you are.
      </p>
      <p>
        The fix is not to ask people to be more careful. People are already careful. The fix is to use a format that is unambiguous — UTC offset, city name, or a verified shareable link — any time a time reference crosses a regional boundary.
      </p>
      <p>
        Five and a half hours is a large gap. It produced a visible failure. The more common version of this mistake produces gaps of one or two hours, which are small enough to cause confusion but large enough to matter. Those are harder to catch and more common than the dramatic cases.
      </p>
      <p>
        When a time reference contains an abbreviation that could mean more than one thing, the right response is to resolve it before acting on it.
      </p>
    </BlogArticle>
  );
}
