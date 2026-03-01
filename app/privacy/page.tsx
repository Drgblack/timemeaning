"use client";

import Link from "next/link";
import { PageLayout } from "@/components/page-layout";
import { useConsent } from "@/components/cookie-consent";

export default function PrivacyPage() {
  const { openPreferencesModal } = useConsent();

  return (
    <PageLayout>
      <article className="prose-like">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Effective date: March 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              What we collect
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                TimeMeaning is designed to collect as little as possible. We do not require 
                an account. We do not ask for your name, email address, or any personal 
                information to use the tool.
              </p>
              <p>
                When you paste text into the input box, that text is processed entirely to 
                produce your result. It is not stored on our servers, not logged, not analysed, 
                and not used for any purpose beyond producing the interpretation you requested. 
                Once your session ends, the text is gone.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Shareable links
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              When you generate a shareable link, the resolved interpretation associated with 
              that link is stored so that anyone who opens the link can see the same result. 
              This stored data contains only the resolved time interpretation — not the original 
              pasted text, not your IP address, and not any identifying information. Shareable 
              links can be deleted by the person who created them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Cookies
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                TimeMeaning uses the following categories of cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Essential cookies:</strong> Required for the site to function correctly. 
                  These cannot be disabled.
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Anonymous usage data collected to understand 
                  how visitors use the site. No personal identifiers are stored. These are enabled 
                  by default but can be disabled in cookie preferences.
                </li>
                <li>
                  <strong>Advertising cookies:</strong> Set by Google AdSense to enable personalised 
                  advertising. These are disabled by default and only activated with your explicit consent.
                </li>
              </ul>
              <p>
                You can manage your cookie preferences at any time using the cookie preferences panel, 
                accessible via the &apos;Manage preferences&apos; link in the consent banner or by clicking{" "}
                <button 
                  onClick={openPreferencesModal}
                  className="text-primary hover:underline"
                >
                  Cookie Preferences
                </button>
                {" "}here or in the footer.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Advertising
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                TimeMeaning displays advertisements served by Google AdSense, a third-party 
                advertising service operated by Google LLC. Google AdSense may use cookies and 
                similar technologies to serve ads based on your prior visits to this website 
                and other websites.
              </p>
              <p>
                With your consent, Google may use this data to personalise the advertisements 
                you see. Without your consent, Google may still serve non-personalised 
                advertisements using contextual signals only.
              </p>
              <p>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads 
                based on your visit to TimeMeaning and other sites on the internet. You can opt 
                out of personalised advertising by visiting{" "}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google&apos;s Ads Settings
                </a>.
              </p>
              <p>
                TimeMeaning implements Google Consent Mode v2. If you decline advertising cookies, 
                anonymised signals may still be sent to Google to support basic ad measurement 
                without identifying you personally.
              </p>
              <p>
                For more information on how Google uses data when you use our site, visit{" "}
                <a 
                  href="https://www.google.com/policies/privacy/partners/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  google.com/policies/privacy/partners
                </a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Analytics
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              We use privacy-respecting analytics to understand how the tool is used in 
              aggregate — for example, how many pages are viewed per day and which pages are 
              most visited. This data is anonymous and contains no personally identifying 
              information. We do not use cross-site tracking of any kind.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Local preferences
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Your language preference and theme preference (light or dark mode) are stored 
              in your browser&apos;s localStorage only. This data never leaves your device and 
              is not transmitted to any server. You can clear these preferences at any time 
              by clearing your browser&apos;s localStorage or using your browser&apos;s privacy 
              controls.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Third parties
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              We do not sell, share, or transfer your data to third parties except as described 
              in the Advertising section above. We do not use your pasted content to train 
              machine learning models. We do not share data with data brokers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Your rights
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              If you are located in the European Union or European Economic Area, you have 
              rights under the GDPR including the right to access, correct, and delete any 
              data we hold about you. Because we do not collect personal data in the course 
              of normal use, there is typically nothing to access or delete. If you have a 
              specific concern, contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Contact
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              Questions about this policy can be directed to:{" "}
              <a 
                href="mailto:privacy@timemeaning.com" 
                className="text-primary hover:underline"
              >
                privacy@timemeaning.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-medium text-foreground mb-3">
              Changes to this policy
            </h2>
            <p className="text-foreground/85 leading-relaxed">
              If this policy changes materially, we will update the effective date at the 
              top of this page. We will not notify users by email because we do not hold 
              email addresses.
            </p>
          </section>
        </div>
      </article>
    </PageLayout>
  );
}
