import { Metadata } from "next";
import Link from "next/link";
import { LearnArticle, DirectAnswer } from "@/components/learn-article";
import ArticleChatPrompt from "@/components/ArticleChatPrompt";

export const metadata: Metadata = {
  title: "The Glossary of Ambiguity: Every Timezone Abbreviation With More Than One Meaning — TimeMeaning",
  description: "A reference list of timezone abbreviations that map to multiple meanings, with their UTC offsets and maximum spreads.",
  alternates: {
    canonical: "https://timemeaning.com/learn/ambiguous-timezone-abbreviations",
  },
};

export default function AmbiguousTimezoneAbbreviationsPage() {
  return (
    <LearnArticle
      title="The Glossary of Ambiguity: Every Timezone Abbreviation With More Than One Meaning"
      description="A reference list of timezone abbreviations that map to multiple meanings, with their UTC offsets and maximum spreads."
      slug="ambiguous-timezone-abbreviations"
      section="Foundations"
      readTime="8 min"
      verifiedDate="February 2026"
      datePublished="2026-01-15"
    >
      <DirectAnswer>
        IST, CST, BST, EST, and AST each have two or more valid interpretations spanning between 4 and 15 hours. Using these abbreviations in written communication without additional context makes the time reference unresolvable. The only unambiguous alternatives are explicit UTC offsets (UTC+5:30) or full IANA timezone identifiers (Asia/Kolkata).
      </DirectAnswer>

      <p className="mb-6 p-4 bg-surface border border-border rounded-md">
        <span className="text-text-muted">For quick lookups, use the interactive </span>
        <Link href="/tools/lookup" className="text-primary hover:underline">Abbreviation Lookup tool →</Link>
      </p>

      <p>
        The following abbreviations each refer to more than one timezone. This list is the primary reason why timezone abbreviations should never be used as the sole identifier in a time reference that crosses regional boundaries.
      </p>
      <p>
        For each abbreviation, the conflicting meanings are listed with their UTC offsets. Where DST applies, the offset shown is the standard (non-DST) value unless otherwise noted.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">IST</span> — three meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>India Standard Time:</strong> <span className="font-mono text-sm">UTC+5:30</span>. Used across all of India. India does not observe DST. The half-hour offset is a frequent source of confusion in UTC arithmetic.
        </p>
        <p className="mb-0">
          <strong>Irish Standard Time:</strong> <span className="font-mono text-sm">UTC+1</span>. Used in the Republic of Ireland during summer (last Sunday in March to last Sunday in October). Outside summer, Ireland observes GMT (<span className="font-mono text-sm">UTC+0</span>), which is not abbreviated IST. The switch means that "IST" in an Irish context is a seasonal abbreviation.
        </p>
        <p className="mb-0">
          <strong>Israel Standard Time:</strong> <span className="font-mono text-sm">UTC+2</span>. Used in Israel during standard time. Israel observes DST (IDT, <span className="font-mono text-sm">UTC+3</span>) from late March to late October, though the exact dates are set annually by government decree and vary year to year.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread between IST interpretations: <strong>3 hours 30 minutes</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">CST</span> — two primary meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Central Standard Time:</strong> <span className="font-mono text-sm">UTC−6</span>. Used across the central United States and Canada during standard time. Transitions to CDT (<span className="font-mono text-sm">UTC−5</span>) during daylight saving.
        </p>
        <p className="mb-0">
          <strong>China Standard Time:</strong> <span className="font-mono text-sm">UTC+8</span>. Used across all of China year-round. China does not observe DST.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread between CST interpretations: <strong>14 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">AST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Atlantic Standard Time:</strong> <span className="font-mono text-sm">UTC−4</span>. Used in Atlantic Canada (Nova Scotia, New Brunswick, Prince Edward Island) and parts of the Caribbean during standard time.
        </p>
        <p className="mb-0">
          <strong>Arabia Standard Time:</strong> <span className="font-mono text-sm">UTC+3</span>. Used in Saudi Arabia, Qatar, Kuwait, Bahrain, and Yemen. These countries do not observe DST.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread between AST interpretations: <strong>7 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">BST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>British Summer Time:</strong> <span className="font-mono text-sm">UTC+1</span>. Used in the United Kingdom during DST (last Sunday in March to last Sunday in October). Outside this period, the UK uses GMT (<span className="font-mono text-sm">UTC+0</span>).
        </p>
        <p className="mb-0">
          <strong>Bangladesh Standard Time:</strong> <span className="font-mono text-sm">UTC+6</span>. Used in Bangladesh year-round. Bangladesh does not observe DST.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread between BST interpretations: <strong>5 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">EST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Eastern Standard Time:</strong> <span className="font-mono text-sm">UTC−5</span>. Used in the eastern United States and Canada during standard time. Transitions to EDT (<span className="font-mono text-sm">UTC−4</span>) during daylight saving.
        </p>
        <p className="mb-0">
          <strong>Eastern Standard Time (Australia):</strong> <span className="font-mono text-sm">UTC+10</span>. Used in Queensland year-round, and in New South Wales, Victoria, Tasmania, and the ACT during standard time (when those states are not observing AEDT).
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread between EST interpretations: <strong>15 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">CDT</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Central Daylight Time:</strong> <span className="font-mono text-sm">UTC−5</span>. Used in the central United States and Canada during daylight saving.
        </p>
        <p className="mb-0">
          <strong>Cuba Daylight Time:</strong> <span className="font-mono text-sm">UTC−4</span>. Used in Cuba during daylight saving.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread: <strong>1 hour</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">SST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Samoa Standard Time:</strong> <span className="font-mono text-sm">UTC−11</span>. Used in American Samoa and Jarvis Island.
        </p>
        <p className="mb-0">
          <strong>Singapore Standard Time:</strong> <span className="font-mono text-sm">UTC+8</span>. Used in Singapore year-round.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread: <strong>19 hours</strong>. The largest spread of any shared abbreviation.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">GST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Gulf Standard Time:</strong> <span className="font-mono text-sm">UTC+4</span>. Used in the UAE and Oman. No DST.
        </p>
        <p className="mb-0">
          <strong>South Georgia Time:</strong> <span className="font-mono text-sm">UTC−2</span>. Used in South Georgia and the South Sandwich Islands.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread: <strong>6 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">
        <span className="font-mono text-primary">WST</span> — two meanings
      </h2>
      <div className="pl-4 border-l-2 border-border space-y-3 mb-6">
        <p className="mb-0">
          <strong>Western Standard Time (Australia):</strong> <span className="font-mono text-sm">UTC+8</span>. Used in Western Australia year-round.
        </p>
        <p className="mb-0">
          <strong>West Samoa Time:</strong> <span className="font-mono text-sm">UTC+13</span>. Used in Samoa (note: distinct from American Samoa).
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Maximum spread: <strong>5 hours</strong>.
      </p>

      <hr />

      <h2 className="font-serif text-xl font-medium text-foreground mt-8 mb-4">A note on usage</h2>
      <p>
        This list is not exhaustive. New abbreviation collisions emerge when countries adopt or change their timezone designations. The IANA timezone database (the authoritative source used by most operating systems and programming languages) uses region/city identifiers — such as <span className="font-mono text-sm">America/Chicago</span> or <span className="font-mono text-sm">Asia/Kolkata</span> — precisely because abbreviations are not unique. When precision is required, use an IANA identifier or a UTC offset rather than an abbreviation.
      </p>

      <ArticleChatPrompt />
    </LearnArticle>
  );
}
