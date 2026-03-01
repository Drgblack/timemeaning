import { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";

export const metadata: Metadata = {
  title: "Why Search Engines Lie to You About Time — TimeMeaning",
  description: "Google resolves ambiguous timezone abbreviations silently, based on your IP address, without telling you which interpretation it assumed.",
};

export default function SearchEnginesLiePage() {
  return (
    <BlogArticle
      title="Why Search Engines Lie to You About Time"
      description="Google resolves ambiguous timezone abbreviations silently, based on your IP address, without telling you which interpretation it assumed."
      slug="search-engines-lie"
      date="February 2026"
      datePublished="2026-02-10"
      readTime="5 min"
    >
      <p>
        If you type "what time is 3pm IST in New York" into Google, you will receive a fast, confident, visually prominent answer. Google will convert the time and display it in a clean format at the top of the results page. It will not tell you which IST it assumed.
      </p>
      <p>
        This is a failure of honesty in the name of helpfulness.
      </p>
      <p>
        IST is ambiguous. It refers to India Standard Time (UTC+5:30), Irish Standard Time (UTC+1 in summer, UTC+0 in winter), and Israel Standard Time (UTC+2). Google resolves this ambiguity silently, based on signals like your IP address location, your account settings, and the statistical likelihood of which IST you meant. In most cases it guesses correctly. In the cases where it guesses wrong — when a developer in Dublin is looking up a timestamp from a colleague in Delhi, or when a support engineer in Tel Aviv is parsing a log file — the wrong answer arrives with exactly the same confidence as the right one.
      </p>
      <p>
        The problem is not the algorithm. The problem is the interface. A search engine that says "I assumed you meant India Standard Time — here is the result, and here is what it would be if you meant Irish Standard Time instead" is strictly more useful than one that gives a single confident answer. The disambiguation is not hard. The decision not to show it is a product choice.
      </p>
      <p>
        AI assistants exhibit the same pattern, often more severely. Large language models are trained to produce fluent, confident-sounding responses. Flagging uncertainty is harder to do well than projecting confidence, and it scores worse on the short-term satisfaction metrics that drive model training. The result is assistants that will tell you what 3pm IST is in New York without mentioning that they have made an assumption that could be wrong by several hours.
      </p>
      <p>
        For time-critical decisions — meeting coordination, deployment windows, support SLAs — a tool that explains its assumptions is worth more than a tool that answers faster. Speed is not the bottleneck. Accuracy is.
      </p>
    </BlogArticle>
  );
}
