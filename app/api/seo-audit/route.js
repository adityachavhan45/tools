import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { verifyFirebaseToken } from "../../../lib/firebaseAuth";
import { SEO_AUDIT_FREE_LIMIT, getSeoAuditPlan } from "../../../lib/seoAuditPlans";
import {
  SEO_AUDIT_PREMIUM_COOKIE,
  buildSeoAuditPremiumCookieHeader,
  verifySeoAuditPremiumCookieValue,
} from "../../../lib/seoAuditEntitlement";
import { db } from "../../../lib/firebase/firebaseConfig";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const USAGE_COOKIE = "seo_audit_usage";

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeUrl(input) {
  const raw = String(input || "").trim();
  if (!raw) return "";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const url = new URL(withProtocol);
  return url.toString();
}

function getTodayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Kolkata",
    year: "numeric",
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

function getCookieValue(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : "";
}

function getUsageFromCookie(request) {
  try {
    const value = decodeURIComponent(getCookieValue(request, USAGE_COOKIE) || "");
    const usage = JSON.parse(value);
    const today = getTodayKey();

    if (usage?.date === today && Number.isFinite(usage?.used)) {
      return { date: today, used: Math.max(0, usage.used) };
    }
  } catch {
    // ignore malformed cookie
  }

  return { date: getTodayKey(), used: 0 };
}

function createUsageCookie(usage) {
  const value = encodeURIComponent(JSON.stringify(usage));
  return `${USAGE_COOKIE}=${value}; Path=/; Max-Age=172800; SameSite=Lax; HttpOnly`;
}

function usagePayload(usage) {
  return {
    used: usage.used,
    limit: SEO_AUDIT_FREE_LIMIT,
    remaining: Math.max(SEO_AUDIT_FREE_LIMIT - usage.used, 0),
  };
}

function safeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function plainTextFromHtml(value) {
  return safeText(decodeHtmlEntities(String(value || "").replace(/<[^>]+>/g, " ")));
}

function extractMetaContent(html, metaName) {
  const escaped = metaName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `<meta[^>]+(?:name|property)=["']${escaped}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${escaped}["'][^>]*>`,
    "i"
  );
  const match = html.match(regex);
  return safeText(match?.[1] || match?.[2] || "");
}

function stripHtmlForText(html) {
  return safeText(
    html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

function wordCount(value) {
  if (!value.trim()) return 0;
  return value.trim().split(/\s+/).length;
}

function parseAnchorDetails(html, baseUrl) {
  const details = [];
  const regex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const seen = new Set();

  for (const match of html.matchAll(regex)) {
    const href = safeText(match[1]);
    const anchorText = plainTextFromHtml(match[2]);
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    try {
      const resolved = new URL(href, baseUrl).toString();
      const uniqueKey = `${resolved}::${anchorText.toLowerCase()}`;
      if (seen.has(uniqueKey)) continue;
      seen.add(uniqueKey);

      details.push({
        url: resolved,
        anchorText,
      });
    } catch {
      // ignore malformed URLs
    }
  }

  return details;
}

function parseImageStats(html) {
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((item) => item[0]);
  const missingAlt = images.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
  return {
    total: images.length,
    missingAlt,
  };
}

function extractHeadingTexts(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  return [...html.matchAll(regex)]
    .map((match) => plainTextFromHtml(match[1]))
    .filter(Boolean);
}

function normalizeKeywordToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "that", "this", "from", "your", "you", "are", "was", "were",
  "have", "has", "had", "will", "can", "not", "but", "all", "any", "our", "out", "about", "into",
  "how", "what", "when", "where", "why", "who", "a", "an", "to", "of", "in", "on", "at", "is",
  "it", "as", "by", "or", "be", "if", "no", "yes", "we", "they", "them", "their", "his", "her",
  "its", "than", "then", "also", "more", "most", "new", "best", "top", "get", "use", "using",
]);

function getTopKeywordIdeas(text, limit = 8) {
  const words = normalizeKeywordToken(text)
    .split(" ")
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

  const termCount = new Map();
  for (const word of words) {
    termCount.set(word, (termCount.get(word) || 0) + 1);
  }

  const phraseCount = new Map();
  for (let i = 0; i < words.length - 1; i += 1) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (!w1 || !w2) continue;
    const phrase = `${w1} ${w2}`;
    phraseCount.set(phrase, (phraseCount.get(phrase) || 0) + 1);
  }

  const topTerms = [...termCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term, count]) => ({ term, count }));

  const topPhrases = [...phraseCount.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([phrase, count]) => ({ phrase, count }));

  return { topTerms, topPhrases };
}

function titleCase(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function toMaxLength(value, maxLength) {
  const clean = safeText(value);
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength - 1).trimEnd() + "…";
}

function buildSeoSuggestions({
  requestedKeyword,
  title,
  metaDescription,
  h1Texts,
  keywordIdeas,
  urlPath,
}) {
  const titleBase =
    requestedKeyword ||
    h1Texts?.[0] ||
    keywordIdeas.topPhrases?.[0]?.phrase ||
    keywordIdeas.topTerms?.[0]?.term ||
    "Page Topic";
  const focusKeyword = normalizeKeywordToken(titleBase);
  const focusKeywordTitle = titleCase(focusKeyword);
  const cleanPath = urlPath.replace(/^\/+|\/+$/g, "").replace(/-/g, " ").trim();
  const context = cleanPath ? ` | ${titleCase(cleanPath)}` : "";

  let suggestedTitle = `${focusKeywordTitle} - Complete Guide${context}`;
  suggestedTitle = toMaxLength(suggestedTitle, 60);

  let suggestedDescription = `${focusKeywordTitle} with clear steps, practical tips, and actionable insights to help users solve this topic quickly.`;
  suggestedDescription = toMaxLength(suggestedDescription, 158);

  return {
    focusKeyword: focusKeyword || normalizeKeywordToken(requestedKeyword),
    suggestedTitle,
    suggestedDescription,
    currentTitleLength: title.length,
    currentDescriptionLength: metaDescription.length,
  };
}

function analyzeSchemaMarkup(html) {
  const schemaMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();
  let validBlocks = 0;
  let invalidBlocks = 0;

  function collectTypes(node) {
    if (!node || typeof node !== "object") return;
    const schemaType = node["@type"];

    if (Array.isArray(schemaType)) {
      schemaType.forEach((value) => types.add(String(value)));
    } else if (typeof schemaType === "string") {
      types.add(schemaType);
    }

    if (Array.isArray(node)) {
      node.forEach(collectTypes);
      return;
    }

    Object.values(node).forEach(collectTypes);
  }

  for (const match of schemaMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      collectTypes(parsed);
      validBlocks += 1;
    } catch {
      invalidBlocks += 1;
    }
  }

  const typeList = [...types];
  const recommended = ["WebPage", "Organization", "BreadcrumbList"];
  const missingRecommended = recommended.filter((type) => !types.has(type));

  return {
    totalBlocks: schemaMatches.length,
    validBlocks,
    invalidBlocks,
    types: typeList,
    missingRecommended,
    status:
      schemaMatches.length === 0
        ? "missing"
        : invalidBlocks > 0
          ? "needs-fix"
          : "good",
  };
}

function analyzeMobileFriendliness(html, viewport) {
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const responsiveImages = imageTags.filter(
    (tag) =>
      /\bsrcset=/i.test(tag) ||
      /\bsizes=/i.test(tag) ||
      /max-width\s*:\s*100%/i.test(tag)
  ).length;
  const hasMediaQueries = /@media\s*\(/i.test(html);
  const hasResponsiveClassHints = /class=["'][^"']*(sm:|md:|lg:|xl:|container|grid)/i.test(html);

  let score = 35;
  if (viewport) score += 35;
  if (responsiveImages > 0) score += 15;
  if (hasMediaQueries || hasResponsiveClassHints) score += 15;
  score = clampScore(score);

  const checks = [];
  if (!viewport) checks.push("Viewport meta tag missing");
  if (responsiveImages === 0 && imageTags.length > 0) {
    checks.push("Responsive image hints (srcset/sizes) not detected");
  }
  if (!hasMediaQueries && !hasResponsiveClassHints) {
    checks.push("No obvious responsive layout hints detected");
  }

  return {
    score,
    status: score >= 70 ? "likely-mobile-friendly" : "needs-improvement",
    viewportPresent: Boolean(viewport),
    responsiveImages,
    hasMediaQueries,
    hasResponsiveClassHints,
    checks,
  };
}

function buildInternalLinkingSuggestions(anchorDetails, origin) {
  const genericAnchors = new Set(["click here", "read more", "learn more", "here", "more", "link"]);
  const internal = anchorDetails.filter((item) => {
    try {
      return new URL(item.url).origin === origin;
    } catch {
      return false;
    }
  });

  const genericAnchorItems = internal.filter((item) =>
    genericAnchors.has(item.anchorText.toLowerCase())
  );
  const missingAnchorTextItems = internal.filter((item) => !item.anchorText || item.anchorText.length < 3);

  const suggestions = [];
  if (internal.length < 4) {
    suggestions.push("Add more contextual internal links to key related pages.");
  }
  if (genericAnchorItems.length > 0) {
    suggestions.push("Replace generic anchors with descriptive anchor text containing topic intent.");
  }
  if (missingAnchorTextItems.length > 0) {
    suggestions.push("Ensure every internal link has meaningful anchor text.");
  }

  return {
    totalInternalLinks: internal.length,
    genericAnchorCount: genericAnchorItems.length,
    missingAnchorTextCount: missingAnchorTextItems.length,
    anchorTextSamples: internal.slice(0, 8).map((item) => ({
      anchorText: item.anchorText || "(empty)",
      url: item.url,
    })),
    suggestions,
  };
}

function detectMissingContent(html, bodyWords, h2Count, internalLinks, externalLinks) {
  const missing = [];
  const hasFaqPattern = /faq|frequently asked questions|\?/i.test(html);
  const listCount = [...html.matchAll(/<(ul|ol)\b/gi)].length;
  const hasCta = /(contact us|get started|try now|book|sign up|download|buy now)/i.test(html);

  if (bodyWords < 500) {
    missing.push({
      area: "Content depth",
      recommendation: "Expand topical depth with practical steps, examples, and FAQs.",
    });
  }
  if (h2Count < 3) {
    missing.push({
      area: "Section hierarchy",
      recommendation: "Add more H2 sections to cover subtopics and improve scannability.",
    });
  }
  if (!hasFaqPattern) {
    missing.push({
      area: "FAQ section",
      recommendation: "Add an FAQ block targeting long-tail queries and objections.",
    });
  }
  if (listCount === 0) {
    missing.push({
      area: "List formatting",
      recommendation: "Use bullet/numbered lists for readability and featured-snippet potential.",
    });
  }
  if (!hasCta) {
    missing.push({
      area: "Call to action",
      recommendation: "Add a clear CTA aligned with page intent (signup, contact, demo, etc.).",
    });
  }
  if (internalLinks < 4) {
    missing.push({
      area: "Internal link coverage",
      recommendation: "Add links to supporting pages to improve crawl paths and authority flow.",
    });
  }
  if (externalLinks === 0) {
    missing.push({
      area: "External references",
      recommendation: "Add relevant citations to improve trust and topical credibility.",
    });
  }

  return missing;
}

function createIssueList(snapshot) {
  const issues = [];
  const passedChecks = [];

  function addIssue({ category, severity, title, details, fix, impact = 0 }) {
    issues.push({
      id: `${category}-${issues.length + 1}`,
      category,
      severity,
      title,
      details,
      fix,
      impact,
    });
  }

  function pass(label) {
    passedChecks.push(label);
  }

  const {
    fetchStatus,
    finalUrl,
    responseTime,
    htmlSizeKb,
    title,
    metaDescription,
    canonical,
    h1Count,
    h2Count,
    lang,
    robotsMeta,
    viewport,
    internalLinks,
    externalLinks,
    brokenLinks,
    images,
    bodyWords,
    openGraphTitle,
    openGraphDescription,
    twitterCard,
    robotsTxtOk,
    sitemapOk,
    schemaCount,
  } = snapshot;

  if (fetchStatus >= 400) {
    addIssue({
      category: "technical",
      severity: "critical",
      title: `Page returned HTTP ${fetchStatus}`,
      details: "Search engines may stop crawling or indexing this URL.",
      fix: "Fix server/client errors and ensure the page returns 200 status.",
      impact: 18,
    });
  } else {
    pass("Page responds with crawlable status code.");
  }

  if (!finalUrl.startsWith("https://")) {
    addIssue({
      category: "technical",
      severity: "high",
      title: "HTTPS is not enforced",
      details: "Non-HTTPS pages weaken trust and can dilute ranking signals.",
      fix: "Force HTTPS redirect for all URLs and update canonical links.",
      impact: 10,
    });
  } else {
    pass("HTTPS is enabled.");
  }

  if (!robotsTxtOk) {
    addIssue({
      category: "technical",
      severity: "medium",
      title: "robots.txt is missing or inaccessible",
      details: "Crawlers use robots.txt to understand crawl rules.",
      fix: "Publish a valid robots.txt at /robots.txt with sitemap location.",
      impact: 7,
    });
  } else {
    pass("robots.txt is accessible.");
  }

  if (!sitemapOk) {
    addIssue({
      category: "technical",
      severity: "medium",
      title: "sitemap.xml is missing or inaccessible",
      details: "Without a sitemap, indexing important pages can be slower.",
      fix: "Publish sitemap.xml and submit it in Google Search Console.",
      impact: 6,
    });
  } else {
    pass("sitemap.xml is accessible.");
  }

  if (responseTime > 1800) {
    addIssue({
      category: "performance",
      severity: "high",
      title: "Slow server response",
      details: `The page responded in about ${responseTime}ms which is slow for user experience and crawl budget.`,
      fix: "Optimize backend response time, caching, and hosting configuration.",
      impact: 10,
    });
  } else if (responseTime > 1200) {
    addIssue({
      category: "performance",
      severity: "medium",
      title: "Moderate server latency",
      details: `The page responded in about ${responseTime}ms; there is room to improve speed.`,
      fix: "Enable caching, compress payloads, and optimize heavy queries.",
      impact: 6,
    });
  } else {
    pass("Server response time looks healthy.");
  }

  if (htmlSizeKb > 350) {
    addIssue({
      category: "performance",
      severity: "medium",
      title: "Large HTML payload",
      details: `HTML size is about ${htmlSizeKb}KB which can slow rendering and crawling.`,
      fix: "Reduce unused markup, defer non-critical scripts, and minify output.",
      impact: 5,
    });
  } else {
    pass("HTML payload size is within a healthy range.");
  }

  if (!title) {
    addIssue({
      category: "onpage",
      severity: "critical",
      title: "Title tag is missing",
      details: "Title is one of the strongest on-page ranking signals.",
      fix: "Add a unique title (around 50-60 characters) for this page.",
      impact: 14,
    });
  } else if (title.length < 30 || title.length > 60) {
    addIssue({
      category: "onpage",
      severity: "medium",
      title: "Title length is not optimal",
      details: `Current title length is ${title.length} characters.`,
      fix: "Keep title between 30 and 60 characters and front-load target intent.",
      impact: 6,
    });
  } else {
    pass("Title length is in recommended range.");
  }

  if (!metaDescription) {
    addIssue({
      category: "onpage",
      severity: "high",
      title: "Meta description is missing",
      details: "Missing meta description can reduce click-through rate from SERP.",
      fix: "Add a compelling meta description between 120 and 160 characters.",
      impact: 8,
    });
  } else if (metaDescription.length < 70 || metaDescription.length > 160) {
    addIssue({
      category: "onpage",
      severity: "low",
      title: "Meta description length is not optimal",
      details: `Current meta description length is ${metaDescription.length} characters.`,
      fix: "Adjust description length to 120-160 characters for better SERP display.",
      impact: 3,
    });
  } else {
    pass("Meta description length is in recommended range.");
  }

  if (!canonical) {
    addIssue({
      category: "technical",
      severity: "medium",
      title: "Canonical tag is missing",
      details: "Canonical tags prevent duplicate URL variants from competing.",
      fix: "Add a self-referencing canonical URL for this page.",
      impact: 7,
    });
  } else {
    pass("Canonical tag is present.");
  }

  if (!viewport) {
    addIssue({
      category: "onpage",
      severity: "medium",
      title: "Viewport meta tag is missing",
      details: "Missing viewport can hurt mobile usability.",
      fix: "Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />`.",
      impact: 5,
    });
  } else {
    pass("Viewport meta tag is present.");
  }

  if (!lang) {
    addIssue({
      category: "onpage",
      severity: "low",
      title: "HTML language attribute missing",
      details: "Language hints help search engines and assistive technologies.",
      fix: "Set `<html lang=\"en\">` (or your page language).",
      impact: 2,
    });
  } else {
    pass("HTML language attribute is set.");
  }

  if (h1Count === 0) {
    addIssue({
      category: "onpage",
      severity: "high",
      title: "No H1 heading found",
      details: "H1 helps search engines understand primary page topic.",
      fix: "Add one descriptive H1 aligned with page intent.",
      impact: 9,
    });
  } else if (h1Count > 1) {
    addIssue({
      category: "onpage",
      severity: "low",
      title: "Multiple H1 tags detected",
      details: `Detected ${h1Count} H1 tags. This can dilute hierarchy clarity.`,
      fix: "Use one clear H1 and organize supporting headings under H2/H3.",
      impact: 3,
    });
  } else {
    pass("Single H1 heading found.");
  }

  if (h2Count === 0) {
    addIssue({
      category: "content",
      severity: "low",
      title: "No H2 structure detected",
      details: "Subheadings improve scannability and topical depth.",
      fix: "Add meaningful H2 sections for key subtopics.",
      impact: 2,
    });
  } else {
    pass("Content has H2 structure.");
  }

  if (images.total > 0 && images.missingAlt > 0) {
    addIssue({
      category: "onpage",
      severity: "medium",
      title: "Images missing alt text",
      details: `${images.missingAlt} out of ${images.total} image tags are missing alt attributes.`,
      fix: "Add descriptive, concise alt text for all meaningful images.",
      impact: 6,
    });
  } else if (images.total > 0) {
    pass("Image alt attributes look complete.");
  }

  if (internalLinks < 3) {
    addIssue({
      category: "content",
      severity: "medium",
      title: "Low internal linking",
      details: `Only ${internalLinks} internal links detected on this page.`,
      fix: "Add contextual links to related pages to improve crawl depth and authority flow.",
      impact: 5,
    });
  } else {
    pass("Internal linking coverage looks healthy.");
  }

  if (brokenLinks > 0) {
    addIssue({
      category: "technical",
      severity: "high",
      title: "Broken internal links detected",
      details: `${brokenLinks} tested internal links returned errors.`,
      fix: "Update or remove broken links and fix redirect chains.",
      impact: 8,
    });
  } else {
    pass("No broken internal links in sampled check.");
  }

  if (bodyWords < 250) {
    addIssue({
      category: "content",
      severity: "high",
      title: "Thin content risk",
      details: `Body content has roughly ${bodyWords} words.`,
      fix: "Expand content with useful depth, intent alignment, and examples.",
      impact: 8,
    });
  } else if (bodyWords < 450) {
    addIssue({
      category: "content",
      severity: "medium",
      title: "Content depth can improve",
      details: `Body content has roughly ${bodyWords} words.`,
      fix: "Add supporting details, FAQs, and semantically related entities.",
      impact: 5,
    });
  } else {
    pass("Content depth appears solid.");
  }

  if (!openGraphTitle || !openGraphDescription) {
    addIssue({
      category: "onpage",
      severity: "low",
      title: "Open Graph tags incomplete",
      details: "Social sharing snippets may be less attractive without OG tags.",
      fix: "Add `og:title`, `og:description`, and optionally `og:image`.",
      impact: 2,
    });
  } else {
    pass("Open Graph core tags are present.");
  }

  if (!twitterCard) {
    addIssue({
      category: "onpage",
      severity: "low",
      title: "Twitter Card meta missing",
      details: "Twitter/X shares can lose rich preview formatting.",
      fix: "Add `<meta name=\"twitter:card\" content=\"summary_large_image\" />`.",
      impact: 1,
    });
  } else {
    pass("Twitter card metadata is present.");
  }

  if (robotsMeta.toLowerCase().includes("noindex")) {
    addIssue({
      category: "technical",
      severity: "critical",
      title: "Page has noindex directive",
      details: "This URL may be blocked from search indexing.",
      fix: "Remove noindex directive if this page should rank.",
      impact: 16,
    });
  }

  if (schemaCount === 0) {
    addIssue({
      category: "content",
      severity: "low",
      title: "Structured data not detected",
      details: "Schema markup can improve rich result eligibility.",
      fix: "Add relevant JSON-LD schema (Article, FAQ, Product, etc.).",
      impact: 2,
    });
  } else {
    pass("Structured data is present.");
  }

  if (externalLinks === 0) {
    addIssue({
      category: "content",
      severity: "low",
      title: "No outbound references",
      details: "Authoritative outbound references can improve topical trust in some contexts.",
      fix: "Add relevant external citations where useful for readers.",
      impact: 1,
    });
  }

  return { issues, passedChecks };
}

function computeCategoryScores(issues) {
  const categories = {
    technical: 100,
    onpage: 100,
    performance: 100,
    content: 100,
  };

  for (const issue of issues) {
    const current = categories[issue.category] ?? 100;
    categories[issue.category] = clampScore(current - (issue.impact || 0));
  }

  return categories;
}

async function fetchUrlWithTimeout(url, options = {}, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ConvertixySEOAuditBot/1.0; +https://convertixy.com)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        ...options.headers,
      },
      cache: "no-store",
      redirect: "follow",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function checkResourceStatus(url) {
  try {
    const response = await fetchUrlWithTimeout(url, { method: "GET" }, 6000);
    return response.ok;
  } catch {
    return false;
  }
}

async function detectBrokenInternalLinks(links, origin) {
  const internal = links.filter((link) => {
    try {
      return new URL(link).origin === origin;
    } catch {
      return false;
    }
  });

  const sample = internal.slice(0, 8);
  if (sample.length === 0) return { brokenCount: 0, checkedCount: 0 };

  const statuses = await Promise.all(
    sample.map(async (link) => {
      try {
        let response = await fetchUrlWithTimeout(link, { method: "HEAD" }, 5000);

        if (response.status === 405 || response.status === 501) {
          response = await fetchUrlWithTimeout(link, { method: "GET" }, 5000);
        }

        return response.status >= 400;
      } catch {
        return true;
      }
    })
  );

  return {
    brokenCount: statuses.filter(Boolean).length,
    checkedCount: sample.length,
  };
}

async function buildAiInsights(summary, issues, targetKeyword) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  const compactIssues = issues.slice(0, 12).map((issue) => ({
    severity: issue.severity,
    category: issue.category,
    title: issue.title,
    details: issue.details,
    fix: issue.fix,
  }));

  const prompt = `You are a senior technical SEO consultant.
Create concise, practical recommendations from this audit snapshot.
Return strictly valid JSON with this shape:
{
  "summary": "...",
  "priorities": [{"title":"...","why":"...","steps":["...","..."]}],
  "quickWins": ["...","..."],
  "aiRecommendations": [{"title":"...","why":"...","steps":["...","..."]}]
}
Rules:
- priorities length: 3 exactly
- quickWins length: 4 exactly
- aiRecommendations length: 3 exactly
- Keep every field short and actionable.
- Mention target keyword only if provided.

Target keyword: ${targetKeyword || "not provided"}
Audit snapshot:
${JSON.stringify(summary, null, 2)}
Issues:
${JSON.stringify(compactIssues, null, 2)}`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      parsed = JSON.parse(jsonMatch[0]);
    }
  }

  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  return {
    summary: safeText(parsed.summary || ""),
    priorities: Array.isArray(parsed.priorities) ? parsed.priorities.slice(0, 3) : [],
    quickWins: Array.isArray(parsed.quickWins) ? parsed.quickWins.slice(0, 4) : [],
    aiRecommendations: Array.isArray(parsed.aiRecommendations)
      ? parsed.aiRecommendations.slice(0, 3)
      : [],
  };
}

async function getPremiumAccess(request, user) {
  if (!user?.uid) {
    return null;
  }

  const cookieValue = getCookieValue(request, SEO_AUDIT_PREMIUM_COOKIE);
  const payload = verifySeoAuditPremiumCookieValue(
    cookieValue,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (payload && payload.uid === user.uid) {
    return { ...payload, source: "cookie" };
  }

  try {
    const subscriptionsQuery = query(
      collection(db, "seo_audit_subscriptions"),
      where("uid", "==", user.uid)
    );
    const snapshot = await getDocs(subscriptionsQuery);
    const now = Math.floor(Date.now() / 1000);

    let latestActiveSubscription = null;
    for (const subscriptionDoc of snapshot.docs) {
      const data = subscriptionDoc.data();
      const expiresAt = Number(data?.expiresAt || 0);

      if (!Number.isFinite(expiresAt) || expiresAt <= now) {
        continue;
      }

      if (!latestActiveSubscription || expiresAt > latestActiveSubscription.expiresAt) {
        latestActiveSubscription = {
          expiresAt,
          orderId: data?.orderId || "",
          paymentId: data?.paymentId || subscriptionDoc.id,
          planId: data?.planId,
          planName: data?.subscriptionName || data?.planName || "SEO Audit Premium",
          uid: user.uid,
        };
      }
    }

    if (!latestActiveSubscription) {
      return null;
    }

    return {
      uid: latestActiveSubscription.uid,
      planId: latestActiveSubscription.planId,
      planName: latestActiveSubscription.planName,
      paymentId: latestActiveSubscription.paymentId,
      orderId: latestActiveSubscription.orderId,
      exp: latestActiveSubscription.expiresAt,
      source: "db",
    };
  } catch (subscriptionLookupError) {
    console.error("SEO audit premium lookup failed:", subscriptionLookupError);
    return null;
  }
}

export async function POST(request) {
  try {
    const user = await verifyFirebaseToken(request);

    if (!user) {
      return Response.json(
        { error: "Please login to run SEO audits." },
        { status: 401 }
      );
    }

    const { url, keyword: requestedKeyword = "", includeAi = true } = await request.json();
    const normalizedUrl = normalizeUrl(url);

    if (!normalizedUrl) {
      return Response.json({ error: "Please enter a valid website URL." }, { status: 400 });
    }

    const usage = getUsageFromCookie(request);
    const premiumAccess = await getPremiumAccess(request, user);
    const premiumPlan = premiumAccess ? getSeoAuditPlan(premiumAccess.planId) : null;
    const hasPremiumAccess = Boolean(premiumAccess && premiumPlan);

    if (!hasPremiumAccess && usage.used >= SEO_AUDIT_FREE_LIMIT) {
      return Response.json(
        {
          message:
            "Free audit limit reached. Upgrade to SEO Audit Premium for unlimited manual + AI audits.",
          usage: usagePayload(usage),
        },
        { status: 429 }
      );
    }

    const startedAt = Date.now();
    const pageResponse = await fetchUrlWithTimeout(normalizedUrl, { method: "GET" }, 12000);
    const responseTime = Date.now() - startedAt;

    const contentType = pageResponse.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/html")) {
      return Response.json(
        {
          error:
            "The target URL did not return an HTML page. Please provide a crawlable webpage URL.",
        },
        { status: 400 }
      );
    }

    const htmlRaw = await pageResponse.text();
    const html = htmlRaw.slice(0, 900000);
    const finalUrl = pageResponse.url || normalizedUrl;
    const origin = new URL(finalUrl).origin;
    const bodyText = stripHtmlForText(html);

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = safeText(titleMatch?.[1] || "");
    const metaDescription = extractMetaContent(html, "description");
    const canonicalMatch = html.match(
      /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>|<link[^>]+href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i
    );
    const canonical = safeText(canonicalMatch?.[1] || canonicalMatch?.[2] || "");
    const robotsMeta = extractMetaContent(html, "robots");
    const viewport = extractMetaContent(html, "viewport");
    const openGraphTitle = extractMetaContent(html, "og:title");
    const openGraphDescription = extractMetaContent(html, "og:description");
    const twitterCard = extractMetaContent(html, "twitter:card");
    const langMatch = html.match(/<html[^>]*\blang=["']([^"']+)["'][^>]*>/i);
    const lang = safeText(langMatch?.[1] || "");

    const h1Texts = extractHeadingTexts(html, "h1");
    const h2Texts = extractHeadingTexts(html, "h2");
    const h1Count = h1Texts.length;
    const h2Count = h2Texts.length;
    const schemaCount = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi)]
      .length;

    const anchorDetails = parseAnchorDetails(html, finalUrl);
    const links = anchorDetails.map((item) => item.url);
    const internalLinks = links.filter((link) => link.startsWith(origin)).length;
    const externalLinks = Math.max(links.length - internalLinks, 0);
    const images = parseImageStats(html);
    const bodyWords = wordCount(bodyText);
    const htmlSizeKb = Math.round((Buffer.byteLength(html, "utf8") / 1024) * 10) / 10;
    const keywordIdeas = getTopKeywordIdeas(bodyText);
    const schemaCheck = analyzeSchemaMarkup(html);
    const mobileCheck = analyzeMobileFriendliness(html, viewport);
    const internalLinking = buildInternalLinkingSuggestions(anchorDetails, origin);
    const missingContent = detectMissingContent(
      html,
      bodyWords,
      h2Count,
      internalLinks,
      externalLinks
    );

    const [robotsTxtOk, sitemapOk, brokenLinkStats] = await Promise.all([
      checkResourceStatus(`${origin}/robots.txt`),
      checkResourceStatus(`${origin}/sitemap.xml`),
      detectBrokenInternalLinks(links, origin),
    ]);

    const snapshot = {
      fetchStatus: pageResponse.status,
      finalUrl,
      responseTime,
      htmlSizeKb,
      title,
      metaDescription,
      canonical,
      h1Count,
      h2Count,
      lang,
      robotsMeta,
      viewport,
      internalLinks,
      externalLinks,
      brokenLinks: brokenLinkStats.brokenCount,
      images,
      bodyWords,
      openGraphTitle,
      openGraphDescription,
      twitterCard,
      robotsTxtOk,
      sitemapOk,
      schemaCount,
    };

    const { issues, passedChecks } = createIssueList(snapshot);
    const categoryScores = computeCategoryScores(issues);
    const finalScore = clampScore(
      Math.round(
        (categoryScores.technical +
          categoryScores.onpage +
          categoryScores.performance +
          categoryScores.content) /
          4
      )
    );

    const keyword = safeText(String(requestedKeyword || ""));
    const loweredText = bodyText.toLowerCase();
    const loweredKeyword = keyword.toLowerCase();
    const keywordFrequency = loweredKeyword
      ? (loweredText.match(new RegExp(loweredKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
          .length
      : 0;
    const keywordDensity = keyword
      ? Math.round((keywordFrequency / Math.max(bodyWords, 1)) * 10000) / 100
      : 0;
    const seoSuggestions = buildSeoSuggestions({
      requestedKeyword: keyword,
      title,
      metaDescription,
      h1Texts,
      keywordIdeas,
      urlPath: new URL(finalUrl).pathname,
    });

    const summaryForAI = {
      url: finalUrl,
      score: finalScore,
      categoryScores,
      responseTime,
      titleLength: title.length,
      descriptionLength: metaDescription.length,
      bodyWords,
      h1Count,
      h2Count,
      internalLinks,
      externalLinks,
      imagesWithoutAlt: images.missingAlt,
      robotsTxtOk,
      sitemapOk,
      schemaCount,
      keyword,
      keywordFrequency,
      keywordDensity,
      internalLinkingQuality: internalLinking.totalInternalLinks,
      mobileScore: mobileCheck.score,
    };

    let aiInsights = null;
    if (includeAi && hasPremiumAccess) {
      try {
        aiInsights = await buildAiInsights(summaryForAI, issues, keyword);
      } catch (aiError) {
        console.error("SEO audit AI generation failed:", aiError);
      }
    }

    const updatedUsage = {
      ...usage,
      used: hasPremiumAccess ? usage.used : usage.used + 1,
    };

    const response = Response.json({
      audit: {
        url: normalizedUrl,
        finalUrl,
        generatedAt: new Date().toISOString(),
        score: finalScore,
        categoryScores,
        metrics: {
          fetchStatus: pageResponse.status,
          responseTime,
          htmlSizeKb,
          bodyWords,
          internalLinks,
          externalLinks,
          brokenInternalLinks: brokenLinkStats.brokenCount,
          checkedInternalLinks: brokenLinkStats.checkedCount,
          images: images.total,
          imagesMissingAlt: images.missingAlt,
          h1Count,
          h2Count,
          schemaCount,
          titleLength: title.length,
          metaDescriptionLength: metaDescription.length,
          keyword,
          keywordFrequency,
          keywordDensity,
          mobileScore: mobileCheck.score,
          schemaValidBlocks: schemaCheck.validBlocks,
          schemaInvalidBlocks: schemaCheck.invalidBlocks,
        },
        snapshot: {
          title,
          metaDescription,
          canonical,
          robotsMeta,
          lang,
          viewport,
          openGraphTitle,
          openGraphDescription,
          twitterCard,
          robotsTxtOk,
          sitemapOk,
          h1Texts,
          h2Texts: h2Texts.slice(0, 12),
        },
        issues,
        passedChecks,
        enhancements: {
          seoSuggestions,
          keywordSuggestions: {
            topTerms: keywordIdeas.topTerms,
            topPhrases: keywordIdeas.topPhrases,
          },
          internalLinking,
          missingContent,
          schemaCheck,
          mobileCheck,
        },
      },
      ai: aiInsights,
      premium: hasPremiumAccess
        ? {
            planId: premiumAccess.planId,
            name: premiumPlan?.name || "SEO Audit Premium",
          }
        : null,
      usage: usagePayload(updatedUsage),
    });

    if (!hasPremiumAccess) {
      response.headers.set("Set-Cookie", createUsageCookie(updatedUsage));
    } else if (premiumAccess.source === "db" && process.env.RAZORPAY_KEY_SECRET) {
      response.headers.append(
        "Set-Cookie",
        buildSeoAuditPremiumCookieHeader(premiumAccess, process.env.RAZORPAY_KEY_SECRET)
      );
    }

    return response;
  } catch (error) {
    if (error?.name === "AbortError") {
      return Response.json(
        { error: "The target website took too long to respond." },
        { status: 504 }
      );
    }

    console.error("SEO audit API error:", error);
    return Response.json(
      { error: "Unable to complete SEO audit right now. Please try again." },
      { status: 500 }
    );
  }
}
