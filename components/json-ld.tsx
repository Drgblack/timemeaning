/**
 * JSON-LD Structured Data Component
 * Renders schema.org structured data for SEO and rich snippets
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema generators for different page types

export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TimeMeaning",
    "url": "https://timemeaning.com",
    "description": "A free utility for resolving ambiguous time references. Paste any time expression and get a plain-English interpretation with every assumption shown.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TimeMeaning",
      "url": "https://timemeaning.com"
    }
  };
}

export function generateOrganizationSchema() {
  return {
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
}

export function generateArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  section = "blog"
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  section?: "blog" | "learn";
}) {
  const url = `https://timemeaning.com/${section}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": section === "learn" ? "TechArticle" : "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": "TimeMeaning"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TimeMeaning",
      "logo": {
        "@type": "ImageObject",
        "url": "https://timemeaning.com/og-default.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

export function generateSoftwareApplicationSchema({
  name,
  description,
  slug
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": `https://timemeaning.com/tools/${slug}`,
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
