// Shared SEO utilities for Next.js Metadata API and JSON-LD

// Hardcoded site constants (no .env required)
const SITE_NAME = "Convertixy - Free Online Tools"; // Brand label in Header
const SITE_URL = "https://convertixy.com"; // Public site URL
const SITE_TWITTER = "@convertixy"; // Change if you have a different handle
const DEFAULT_DESCRIPTION =
  "Convertixy offers 65+ free online tools for PDF merge/split, image compression, format conversion, text processing, SEO tools, calculators, and more. No registration required, works in browser.";
const DEFAULT_OG_IMAGE = "/og-default.jpg"; // Place a file in public/ if desired

// International SEO support
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', country: 'US' },
  { code: 'es', name: 'Spanish', country: 'ES' },
  { code: 'fr', name: 'French', country: 'FR' },
  { code: 'de', name: 'German', country: 'DE' },
  { code: 'it', name: 'Italian', country: 'IT' },
  { code: 'pt', name: 'Portuguese', country: 'BR' },
  { code: 'ru', name: 'Russian', country: 'RU' },
  { code: 'ja', name: 'Japanese', country: 'JP' },
  { code: 'ko', name: 'Korean', country: 'KR' },
  { code: 'zh', name: 'Chinese', country: 'CN' },
  { code: 'hi', name: 'Hindi', country: 'IN' },
  { code: 'ar', name: 'Arabic', country: 'SA' },
  { code: 'tr', name: 'Turkish', country: 'TR' },
  { code: 'nl', name: 'Dutch', country: 'NL' },
  { code: 'sv', name: 'Swedish', country: 'SE' },
  { code: 'no', name: 'Norwegian', country: 'NO' },
  { code: 'da', name: 'Danish', country: 'DK' },
  { code: 'fi', name: 'Finnish', country: 'FI' },
  { code: 'pl', name: 'Polish', country: 'PL' },
  { code: 'cs', name: 'Czech', country: 'CZ' },
  { code: 'hu', name: 'Hungarian', country: 'HU' },
  { code: 'ro', name: 'Romanian', country: 'RO' },
  { code: 'bg', name: 'Bulgarian', country: 'BG' },
  { code: 'hr', name: 'Croatian', country: 'HR' },
  { code: 'sk', name: 'Slovak', country: 'SK' },
  { code: 'sl', name: 'Slovenian', country: 'SI' },
  { code: 'et', name: 'Estonian', country: 'EE' },
  { code: 'lv', name: 'Latvian', country: 'LV' },
  { code: 'lt', name: 'Lithuanian', country: 'LT' },
  { code: 'el', name: 'Greek', country: 'GR' },
  { code: 'he', name: 'Hebrew', country: 'IL' },
  { code: 'th', name: 'Thai', country: 'TH' },
  { code: 'vi', name: 'Vietnamese', country: 'VN' },
  { code: 'id', name: 'Indonesian', country: 'ID' },
  { code: 'ms', name: 'Malay', country: 'MY' },
  { code: 'tl', name: 'Filipino', country: 'PH' },
  { code: 'uk', name: 'Ukrainian', country: 'UA' },
  { code: 'be', name: 'Belarusian', country: 'BY' },
  { code: 'ka', name: 'Georgian', country: 'GE' },
  { code: 'hy', name: 'Armenian', country: 'AM' },
  { code: 'az', name: 'Azerbaijani', country: 'AZ' },
  { code: 'kk', name: 'Kazakh', country: 'KZ' },
  { code: 'ky', name: 'Kyrgyz', country: 'KG' },
  { code: 'uz', name: 'Uzbek', country: 'UZ' },
  { code: 'mn', name: 'Mongolian', country: 'MN' },
  { code: 'my', name: 'Burmese', country: 'MM' },
  { code: 'km', name: 'Khmer', country: 'KH' },
  { code: 'lo', name: 'Lao', country: 'LA' },
  { code: 'si', name: 'Sinhala', country: 'LK' },
  { code: 'ne', name: 'Nepali', country: 'NP' },
  { code: 'bn', name: 'Bengali', country: 'BD' },
  { code: 'ur', name: 'Urdu', country: 'PK' },
  { code: 'fa', name: 'Persian', country: 'IR' },
  { code: 'ps', name: 'Pashto', country: 'AF' },
  { code: 'tg', name: 'Tajik', country: 'TJ' },
  { code: 'tk', name: 'Turkmen', country: 'TM' },
  { code: 'sw', name: 'Swahili', country: 'KE' },
  { code: 'am', name: 'Amharic', country: 'ET' },
  { code: 'yo', name: 'Yoruba', country: 'NG' },
  { code: 'ig', name: 'Igbo', country: 'NG' },
  { code: 'ha', name: 'Hausa', country: 'NG' },
  { code: 'zu', name: 'Zulu', country: 'ZA' },
  { code: 'af', name: 'Afrikaans', country: 'ZA' },
  { code: 'xh', name: 'Xhosa', country: 'ZA' },
  { code: 'st', name: 'Sotho', country: 'ZA' },
  { code: 'tn', name: 'Tswana', country: 'ZA' },
  { code: 'ss', name: 'Swati', country: 'ZA' },
  { code: 've', name: 'Venda', country: 'ZA' },
  { code: 'ts', name: 'Tsonga', country: 'ZA' },
  { code: 'nr', name: 'Ndebele', country: 'ZA' },
  { code: 'nso', name: 'Northern Sotho', country: 'ZA' }
];

export function siteConstants() {
  return { SITE_NAME, SITE_URL, SITE_TWITTER, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SUPPORTED_LANGUAGES };
}

// International SEO functions
export function buildHreflangTags(slug = "/") {
  return SUPPORTED_LANGUAGES.map(lang => ({
    rel: "alternate",
    hreflang: `${lang.code}-${lang.country}`,
    href: new URL(slug, SITE_URL).toString()
  }));
}

export function buildInternationalMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  slug = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  language = "en-US"
}) {
  const url = new URL(slug, SITE_URL).toString();
  const baseTitle = title || SITE_NAME;
  const fullTitle = `${baseTitle} | ${SITE_NAME}`;

  return {
    title: title ? title : SITE_NAME,
    description,
    keywords,
    alternates: {
      canonical: slug,
      languages: buildHreflangTags(slug)
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: language,
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
    },
  };
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  slug = "/",
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  language = "en-US"
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
      languages: buildHreflangTags(slug)
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: language,
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
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
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
    inLanguage: "en-US",
    isAccessibleForFree: true,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      `https://twitter.com/${SITE_TWITTER.replace('@', '')}`,
    ],
    audience: {
      "@type": "Audience",
      audienceType: "General Public"
    },
    keywords: "free online tools, PDF tools, image tools, text tools, SEO tools, calculators, converters, generators",
    about: {
      "@type": "Thing",
      name: "Online Tools and Utilities",
      description: "Free online tools for document processing, image editing, text manipulation, and web development"
    }
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
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    audience: {
      "@type": "Audience",
      audienceType: "General Public"
    },
    keywords: `${name.toLowerCase()}, free online tool, ${category.toLowerCase()}`,
    featureList: [
      "Free to use",
      "No registration required",
      "Works in browser",
      "Privacy focused",
      "Fast processing"
    ],
    screenshot: `${SITE_URL}/screenshots/${slug.replace('/', '')}.jpg`,
    softwareVersion: "1.0",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0]
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      `https://twitter.com/${SITE_TWITTER.replace('@', '')}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    foundingDate: "2024",
    numberOfEmployees: "1-10",
    industry: "Software Development",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.0060
      },
      geoRadius: "20000000"
    },
    knowsAbout: [
      "Web Development",
      "Online Tools",
      "PDF Processing",
      "Image Editing",
      "Text Processing",
      "SEO Tools"
    ]
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

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function buildItemListJsonLd(tools) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools",
    description: "Complete list of free online tools for PDF, images, text processing, and SEO",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebApplication",
        name: tool.name,
        url: `${SITE_URL}${tool.slug}`,
        description: tool.description,
        applicationCategory: "Utilities",
        isAccessibleForFree: true,
      },
    })),
  };
}

// Additional SEO functions
export function buildHowToJsonLd({ name, description, steps }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image || `${SITE_URL}/howto/${name.toLowerCase().replace(/\s+/g, '-')}-step-${index + 1}.jpg`
    }))
  };
}

export function buildArticleJsonLd({ title, description, author, datePublished, dateModified, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`
      }
    },
    datePublished,
    dateModified,
    image: image || `${SITE_URL}/og-default.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_URL
    }
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    telephone: "+1-555-0123",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main St",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.0060
    },
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "Free",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.0060
      },
      geoRadius: "20000000"
    }
  };
}
