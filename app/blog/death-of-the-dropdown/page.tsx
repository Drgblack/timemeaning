import { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";

export const metadata: Metadata = {
  title: "The Death of the Dropdown: Why \"Select Your City\" Is a UX Failure — TimeMeaning",
  description: "The standard timezone dropdown was designed for settings panels, not for resolving ambiguous input from human-written text.",
};

export default function DeathOfDropdownPage() {
  return (
    <BlogArticle
      title={'The Death of the Dropdown: Why "Select Your City" Is a UX Failure'}
      description="The standard timezone dropdown was designed for settings panels, not for resolving ambiguous input from human-written text."
      slug="death-of-the-dropdown"
      date="November 2025"
      datePublished="2025-11-01"
      readTime="5 min"
    >
      <p>
        The standard interface for timezone input has not changed meaningfully in twenty years. It is a dropdown — usually labelled "Select your timezone" or "Select your city" — containing a scrollable list of several hundred options organised either alphabetically or by UTC offset.
      </p>
      <p>
        This interface was designed for a world where people set their timezone once, in a settings panel, and the software used that preference consistently across all time-sensitive operations. It works well for that use case. It works badly for every other use case.
      </p>
      <p>
        The specific use case it fails is the one that is most common in practice: a person receives a time reference written by someone else, in natural language, and needs to understand what it means. The dropdown cannot help here. It requires the user to already know the correct timezone to select, which is precisely the information they do not have when the abbreviation is ambiguous.
      </p>
      <p>
        "Let's connect at 10am CST" cannot be resolved by a dropdown. The user would need to select either "America/Chicago" or "Asia/Shanghai" — but to make that selection they must first know which one the sender meant, which is the original problem.
      </p>
      <p>
        Natural language input is not a luxury feature. It is the correct model for a tool whose primary input is human-written text. People do not write in IANA timezone identifiers. They write in the abbreviations and phrases they encounter in their own context. A tool that requires them to translate their input into a structured format before it can be processed has placed the burden of interpretation on the wrong party.
      </p>
      <p>
        The dropdown is not wrong. It is misapplied. It is the right interface for the settings panel and the wrong interface for the resolution workflow. The replacement is not a better dropdown — it is a text field that accepts what people actually write and interprets it correctly.
      </p>
    </BlogArticle>
  );
}
