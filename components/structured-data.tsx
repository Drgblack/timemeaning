export function StructuredData() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TimeMeaning",
    "url": "https://timemeaning.com",
    "description": "A free utility for resolving ambiguous time references. Paste any time expression and get a plain-English interpretation with every assumption shown.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Timezone-aware time interpretation",
      "Daylight saving time detection",
      "Natural language time parsing",
      "ISO 8601 timestamp output",
      "Unix epoch conversion",
      "Shareable result links"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "TimeMeaning",
      "url": "https://timemeaning.com"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TimeMeaning",
    "url": "https://timemeaning.com",
    "logo": "https://timemeaning.com/og-default.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@timemeaning.com",
      "contactType": "customer support"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TimeMeaning — Understand What a Time Reference Actually Means",
    "description": "Interpret ambiguous time references from emails, messages, and calendars. Timezone-aware and daylight-saving accurate.",
    "url": "https://timemeaning.com",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "TimeMeaning",
      "applicationCategory": "UtilityApplication"
    },
    "about": {
      "@type": "Thing",
      "name": "Time zone conversion and interpretation"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Anyone working with time references across timezones"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
