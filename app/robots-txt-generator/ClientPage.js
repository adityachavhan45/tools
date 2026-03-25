"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Robots.txt Generator Does and Why It Matters",
    paragraphs: [
      "Robots.txt Generator helps users create crawl instructions without manually writing the file from scratch. A user can add crawler rules, include a sitemap URL, and copy a ready robots.txt output quickly.",
      "This matters because a small formatting mistake in robots.txt can cause confusion or even block important pages. A simple tool reduces that risk and makes setup easier.",
      "It also matters because many site owners understand the idea of robots.txt but are not fully confident about the syntax. A generator gives them a structured way to create rules with less guesswork. That can save time and reduce fear around technical SEO files that affect crawling behavior.",
    ],
  },
  {
    heading: "Who Should Use Robots.txt Generator",
    paragraphs: [
      "This tool is useful for bloggers, developers, agencies, SEO beginners, and website owners who want a clear starting point for crawl control.",
      "It is especially helpful for people who know what they want to block or allow but do not want to remember exact robots.txt syntax every time.",
      "It is also useful for people launching a new website or redesigning an old one. During those moments, basic crawl rules often need to be reviewed again, and a simple page like this can help users move faster without introducing unnecessary complexity.",
    ],
  },
  {
    heading: "How to Use Robots.txt Generator Step by Step",
    paragraphs: [
      "Enter the user agent, add allow and disallow paths, then include optional settings like crawl delay and sitemap. The file updates immediately so you can review it before copying.",
      "Once the content looks correct, copy the result and upload it to the website root. That keeps the workflow simple and fast.",
      "A smart workflow is to decide first what absolutely should stay open to search engines and what should stay out of crawler attention. When those choices are clear, the tool becomes easier to use because the user is only translating real site rules into a clean file instead of guessing while typing.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is blocking too much, especially by using broad disallow rules without reviewing the effect. Another common issue is confusing crawl control with index control.",
      "It is also important to keep path formatting clean and to double-check the sitemap URL before publishing the file.",
      "Another mistake is copying random robots.txt examples from the internet without checking whether they fit the actual site structure. A rule that works for one website may be harmful on another. That is why it is better to generate and review a file based on real paths and real needs.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "Every website still needs basic crawl guidance, especially when private sections, admin areas, or duplicate paths exist. That makes robots.txt generation an evergreen need.",
      "Because this task repeats across many sites and projects, a quick browser tool remains valuable for a long time.",
      "This kind of page also keeps its value because robots.txt is often revisited during site migrations, CMS changes, environment setup, and technical audits. Even users who do not touch it daily usually need it again at important website moments.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Only block what truly should not be crawled. Add the correct sitemap URL and review every path carefully before using the file.",
      "It is also smart to test the final rules after deployment so you do not accidentally limit access to important public pages.",
      "A good habit is to keep the file simple. Many websites do not need an overly complex robots.txt. Clean rules are easier to understand, easier to maintain, and less likely to create accidental SEO problems later.",
    ],
  },
];

const faq = [
  { question: "What is robots.txt?", answer: "robots.txt is a text file that tells search engine bots which paths they can or should not crawl. It lives at the root of a website and acts like a basic instruction file for crawlers. It does not create rankings by itself, but it can influence how search bots spend crawl effort on the site." },
  { question: "Does robots.txt block indexing?", answer: "Not always. It mainly controls crawling, not guaranteed indexing. In some cases, a blocked URL can still appear in search if search engines discover it elsewhere. That is why users should understand the difference between crawl rules and page-level indexing signals." },
  { question: "Where should I upload robots.txt?", answer: "It should be placed in the root of your website, such as example.com/robots.txt. If the file is stored somewhere else, crawlers may not use it as expected, so the location matters." },
  { question: "Should I add a sitemap URL in robots.txt?", answer: "Yes, adding your sitemap is a common and useful practice because it gives search engines an extra discovery signal for your important public URLs. It is not mandatory in every case, but it is usually a smart addition." },
  { question: "Is this robots.txt generator free?", answer: "Yes, it is free and browser based. Users can build a file quickly, copy the result, and deploy it without creating an account or installing software." },
];

function normalizeRulePath(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "/") return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function isValidUrl(value) {
  if (!value.trim()) return true;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function RobotsTxtGeneratorPage() {
  const [userAgent, setUserAgent] = useState("*");
  const [allowPaths, setAllowPaths] = useState("");
  const [disallowPaths, setDisallowPaths] = useState("/admin/\n/login");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml");
  const [message, setMessage] = useState("");

  const output = useMemo(() => {
    const allowLines = allowPaths
      .split("\n")
      .map(normalizeRulePath)
      .filter(Boolean)
      .map((item) => `Allow: ${item}`);

    const disallowLines = disallowPaths
      .split("\n")
      .map(normalizeRulePath)
      .filter(Boolean)
      .map((item) => `Disallow: ${item}`);

    const parts = [`User-agent: ${userAgent.trim() || "*"}`];
    parts.push(...allowLines);
    parts.push(...disallowLines);
    if (crawlDelay.trim()) parts.push(`Crawl-delay: ${crawlDelay.trim()}`);
    if (sitemapUrl.trim()) parts.push(`Sitemap: ${sitemapUrl.trim()}`);
    return parts.join("\n");
  }, [allowPaths, crawlDelay, disallowPaths, sitemapUrl, userAgent]);

  const validationError = useMemo(() => {
    if (!userAgent.trim()) return "User-agent cannot be empty.";
    if (crawlDelay.trim() && (!/^\d+(\.\d+)?$/.test(crawlDelay.trim()) || Number(crawlDelay) < 0)) {
      return "Crawl delay should be a positive number.";
    }
    if (!isValidUrl(sitemapUrl)) return "Enter a valid sitemap URL.";
    return "";
  }, [crawlDelay, sitemapUrl, userAgent]);

  const copyOutput = async () => {
    if (validationError) {
      setMessage(validationError);
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    await navigator.clipboard.writeText(output);
    setMessage("robots.txt copied.");
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <ToolSection title="Robots.txt Generator" subtitle="Build a simple and valid robots.txt file for your website with sitemap and crawler rules.">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">User Agent</label>
            <input value={userAgent} onChange={(e) => setUserAgent(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="*" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Sitemap URL</label>
            <input value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="https://example.com/sitemap.xml" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Allow Paths</label>
            <textarea value={allowPaths} onChange={(e) => setAllowPaths(e.target.value)} className="min-h-28 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="/\n/blog/" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Disallow Paths</label>
            <textarea value={disallowPaths} onChange={(e) => setDisallowPaths(e.target.value)} className="min-h-28 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="/admin/\n/login" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Crawl Delay</label>
          <input value={crawlDelay} onChange={(e) => setCrawlDelay(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Crawl delay (optional)" />
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={copyOutput} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Copy robots.txt</button>
          {message ? <p className={`self-center text-sm ${validationError ? "text-red-600" : "text-green-700"}`}>{message}</p> : null}
        </div>
        {validationError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {validationError}
          </div>
        ) : null}
        <pre className="overflow-auto rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800">{output}</pre>
      </div>
      <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Tool</h2>
          <div className="mt-6 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold text-gray-900">{section.heading}</h3>
                <div className="mt-3 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-justify">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </ToolSection>
  );
}
