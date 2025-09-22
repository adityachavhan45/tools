// Shared SEO utilities for Next.js Metadata API and JSON-LD

// Hardcoded site constants (no .env required)
const SITE_NAME = "FreeTools"; // Brand label in Header
const SITE_URL = "https://convertixy.com"; // Public site URL
const SITE_TWITTER = "@freetools"; // Change if you have a different handle
const DEFAULT_DESCRIPTION =
  "Free online tools for PDF, images, text, and SEO. Fast, private, and runs in your browser.";
const DEFAULT_OG_IMAGE = "/og-default.jpg"; // Place a file in public/ if desired

export function siteConstants() {
  return { SITE_NAME, SITE_URL, SITE_TWITTER, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE };
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  slug = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}) {
  const url = new URL(slug, SITE_URL).toString();
  const baseTitle = title || SITE_NAME;
  const fullTitle = `${baseTitle} | ${SITE_NAME}`;

  return {
    // Let layout title.template apply the suffix. Avoid double suffix.
    title: title ? title : SITE_NAME,
    description,
    keywords,
    alternates: {
      canonical: slug,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: baseTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD helpers
export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildToolJsonLd({ name, description, slug, category = "Utilities" }) {
  const url = new URL(slug, SITE_URL).toString();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory: category,
    operatingSystem: "Web",
    url,
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
  };
}

export function buildBreadcrumbJsonLd(items) {
  // items: [{ name: string, slug: string }]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.slug, SITE_URL).toString(),
    })),
  };
}

export function buildFaqJsonLd(qa) {
  // qa: [{ question: string, answer: string }]
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
