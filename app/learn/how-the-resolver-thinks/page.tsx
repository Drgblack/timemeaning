import { Metadata } from "next";
import { LearnArticle } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "How TimeMeaning Resolves a Time Reference: A Transparency Guide — TimeMeaning",
  description: "The five-step deterministic pipeline TimeMeaning uses to interpret a pasted time reference.",
};

export default function HowTheResolverThinksPage() {
  return (
    <LearnArticle
      title="How TimeMeaning Resolves a Time Reference: A Transparency Guide"
      date="February 2026"
    >
      <p>
        This article explains the logic TimeMeaning uses when it processes a pasted time reference. Transparency about interpretation logic is part of the product's core design — a tool that explains its reasoning is more trustworthy than one that simply produces an answer.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Step 1: Tokenisation</h2>
      
      <p>
        The pasted text is scanned for tokens that could represent time information: digits in time-like patterns, timezone abbreviations, day names, month names, relative phrases like "next" or "tomorrow," and standard format indicators like "am," "pm," "UTC," and "Z."
      </p>
      
      <div className="bg-muted p-4 rounded-md my-4">
        <p className="text-sm text-muted-foreground mb-2">Example input:</p>
        <p className="font-mono text-sm mb-3">"Let's connect at 10am CST next Wednesday — works for LA morning?"</p>
        <p className="text-sm text-muted-foreground mb-2">Detected tokens:</p>
        <p className="font-mono text-sm mb-0">10am, CST, next Wednesday, LA morning</p>
      </div>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Step 2: Structural parsing</h2>
      
      <p>
        Detected tokens are assembled into candidate time expressions. The parser identifies that <span className="font-mono text-sm">10am CST next Wednesday</span> is a single time reference with three components: a time of day (10:00), a timezone abbreviation (CST), and a relative date reference (next Wednesday).
      </p>
      
      <p>
        <span className="font-mono text-sm">LA morning</span> is identified as a second implicit time reference — a request to express the first time in the context of Los Angeles.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Step 3: Ambiguity detection</h2>
      
      <p>
        Each component is checked for ambiguity. <span className="font-mono text-sm">CST</span> is flagged as ambiguous — it maps to both Central Standard Time (<span className="font-mono text-sm">UTC−6</span>) and China Standard Time (<span className="font-mono text-sm">UTC+8</span>). <span className="font-mono text-sm">next Wednesday</span> is evaluated relative to the current date to produce a specific calendar date. <span className="font-mono text-sm">LA morning</span> is resolved to <span className="font-mono text-sm">America/Los_Angeles</span>.
      </p>
      
      <p>
        If the ambiguity cannot be resolved from context (for example, if there are no other signals indicating whether the sender is in the US or China), the tool flags the ambiguity explicitly and asks the user to clarify before proceeding.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Step 4: DST resolution</h2>
      
      <p>
        Once the timezone and specific date are known, the tool looks up whether DST is active for that timezone on that date. For the resolved Wednesday date, Central Standard Time in the US may or may not be active depending on whether the date falls before or after the March DST transition. The correct offset is applied to the resolved time.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">Step 5: Output generation</h2>
      
      <p>
        The resolved time is expressed in: the original timezone with offset, UTC, and the requested secondary timezone (Los Angeles). Each step of the reasoning is included in the output — which timezone was assumed, whether DST is active, and what the date is in each location. The ISO 8601 canonical form is produced for reference.
      </p>

      <h2 className="font-serif text-xl font-medium text-foreground mt-10 mb-4">What the tool does not do</h2>
      
      <p>
        TimeMeaning does not use a general-purpose large language model to produce its output. The interpretation pipeline is deterministic — the same input will always produce the same output. The tool does not learn from pasted text, does not retain input between sessions, and does not use statistical inference to guess at ambiguous inputs. When something is ambiguous, it is flagged, not guessed.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
