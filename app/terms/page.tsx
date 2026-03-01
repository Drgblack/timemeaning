import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = {
  title: "Terms of Use — TimeMeaning",
  description: "Terms governing use of TimeMeaning.com and its tools.",
  openGraph: {
    title: "Terms of Use — TimeMeaning",
    description: "Terms governing use of TimeMeaning.com and its tools.",
    type: "website",
    siteName: "TimeMeaning",
  },
  twitter: {
    card: "summary",
    title: "Terms of Use — TimeMeaning",
    description: "Terms governing use of TimeMeaning.com and its tools.",
  },
};

export default function TermsPage() {
  return (
    <PageLayout>
      <article className="prose-like max-w-[680px]">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">
          Terms of Use
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Last updated: March 2026
        </p>

        <p className="text-foreground/85 leading-relaxed mb-8">
          These Terms of Use govern your use of TimeMeaning.com (&quot;the Site&quot;). 
          By using the Site, you agree to these terms.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              1. Nature of the service
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                TimeMeaning is a free public utility that provides interpretations of time 
                references. It is not a certified time service, a legal authority on timezone 
                rules, or a substitute for professional advice in time-sensitive contexts.
              </p>
              <p>
                All interpretations are provided for informational purposes only. TimeMeaning 
                makes no warranty that interpretations are correct, complete, or suitable for 
                any particular purpose.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              2. Accuracy and limitations
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                TimeMeaning uses the IANA Time Zone Database and deterministic parsing rules 
                to resolve time references. While we aim for accuracy, timezone rules change, 
                governments alter DST schedules, and edge cases exist that may produce incorrect 
                results.
              </p>
              <p>
                Do not use TimeMeaning as the sole basis for time-critical decisions in aviation, 
                maritime, medical, legal, financial, or emergency contexts. Always verify with 
                authoritative sources.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              3. No data storage
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              TimeMeaning does not store the time references you enter. Input data is processed 
              in your browser and is not transmitted to or retained by TimeMeaning&apos;s servers. 
              See our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              4. Advertising
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              The Site displays advertisements served by Google AdSense. TimeMeaning does not 
              control the content of advertisements and is not responsible for products or 
              services advertised. Advertising is managed in accordance with our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and Google&apos;s advertising policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              5. Intellectual property
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              The TimeMeaning name, design, learning centre content, and tool implementations 
              are the property of their respective owners. You may link to TimeMeaning freely. 
              You may not reproduce, scrape, or republish TimeMeaning content without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              6. API terms
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Access to the TimeMeaning API (when available) is subject to separate API Terms 
              of Service provided at the time of API key issuance. These general Terms of Use 
              apply to API users in addition to the API-specific terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              7. Limitation of liability
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              TimeMeaning is provided &quot;as is&quot; without warranty of any kind. To the maximum 
              extent permitted by applicable law, TimeMeaning and its operators shall not be 
              liable for any damages arising from use of the Site or reliance on its interpretations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              8. Changes to these terms
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              These terms may be updated from time to time. Continued use of the Site after 
              changes constitutes acceptance of the revised terms. The &quot;last updated&quot; date 
              at the top of this page reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              9. Contact
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Questions about these terms can be directed to the contact form at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                timemeaning.com/contact
              </Link>.
            </p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
