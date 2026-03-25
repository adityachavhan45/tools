"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What SERP Snippet Preview Does and Why It Matters",
    paragraphs: [
      "SERP Snippet Preview helps users check how a page title, URL, and meta description may look before publishing. This is useful because metadata often looks fine in a CMS field but less clear in a search-style layout.",
      "A preview tool helps users refine wording early, which can improve clarity and click appeal over time.",
      "It also helps because snippet writing is often a small task that has a large effect. A page title and description are usually the first message a searcher sees. When that message is weak, unclear, or cut off, the page may lose clicks even if the actual content is good.",
    ],
  },
  {
    heading: "Who Should Use SERP Snippet Preview",
    paragraphs: [
      "This tool is useful for bloggers, SEOs, content writers, marketers, and agencies. It works especially well for pages where the title and description need to be reviewed before going live.",
      "It is also helpful for beginners because it turns abstract SEO fields into something visual and easier to understand.",
      "For experienced users, the value is speed. They may already know the basics of metadata, but a live preview still makes final adjustments faster and more practical than guessing by character count alone.",
    ],
  },
  {
    heading: "How to Use SERP Snippet Preview Step by Step",
    paragraphs: [
      "Enter your page title, URL, and meta description. The preview updates instantly so you can see how the snippet may look.",
      "After that, review title length, description quality, and overall readability. Small edits usually make a big difference.",
      "A good workflow is to first write a clear title that reflects the page purpose, then write a description that explains value in plain English. After seeing both inside the preview layout, users can make cleaner edits with more confidence.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is writing titles that are too long or descriptions that feel too generic. Another issue is repeating the same keyword too many times, which can make the snippet look unnatural.",
      "A better approach is to keep the language clear, helpful, and relevant to the page topic.",
      "Another common mistake is focusing only on rankings and forgetting the human click. Metadata should support search visibility, but it should also persuade a real user that the page is worth opening. Good snippet writing balances both goals.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "Search result snippets remain one of the first things users see before clicking. That makes snippet review an evergreen SEO task.",
      "Because websites keep publishing new pages, a preview tool stays useful again and again.",
      "This long-term usefulness is especially clear on content-heavy websites. Every blog post, landing page, category page, or service page can benefit from a metadata review, so the need continues as long as the site grows.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Write a clear title first, then use the description to explain value instead of repeating the title. Keep the URL path simple and readable too.",
      "Review the snippet from a user perspective. If it looks confusing or weak, improve it before publishing.",
      "It is also smart to avoid vague filler words when better wording is available. Simple, direct language usually performs better than overly broad or artificial marketing phrases that do not explain the page clearly.",
    ],
  },
];

const faq = [
  { question: "What is a SERP snippet preview tool?", answer: "It helps you preview how your title and meta description may look in search results. While no preview can guarantee the exact final snippet, it gives a strong visual reference for how the page message may appear to users before publishing." },
  { question: "Will Google always show the same snippet?", answer: "No, search engines can rewrite snippets, but strong metadata still helps. A well-written title and description increase the chance that search engines will use something close to your intended message, especially when it clearly matches the page content." },
  { question: "Why should I preview my snippet?", answer: "It helps you improve clarity, length, and click appeal before publishing. A preview makes it easier to spot awkward wording, excessive length, and descriptions that do not actually communicate the value of the page." },
  { question: "Can I check both title and description length?", answer: "Yes, this tool helps you review both. It is useful because many metadata problems come from poor balance between title readability and description quality, not just from raw character count alone." },
  { question: "Is this snippet preview free?", answer: "Yes, it is free to use online. Users can test many title and description variations quickly without needing any extra software or account setup." },
];

function isValidUrl(value) {
  if (!value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function SerpSnippetPreviewPage() {
  const [title, setTitle] = useState("Free SERP Snippet Preview Tool for Better SEO");
  const [url, setUrl] = useState("https://convertixy.com/serp-snippet-preview");
  const [description, setDescription] = useState("Preview your SEO title, URL, and meta description before publishing so you can improve clarity and click appeal.");

  const counts = useMemo(
    () => ({ title: title.length, description: description.length }),
    [description, title]
  );
  const titleStatus = counts.title > 60 ? "long" : counts.title < 30 ? "short" : "good";
  const descriptionStatus = counts.description > 160 ? "long" : counts.description < 70 ? "short" : "good";
  const normalizedUrl = isValidUrl(url) ? new URL(url).toString() : "";

  return (
    <ToolSection title="SERP Snippet Preview" subtitle="Preview your SEO title, URL, and meta description with length guidance before publishing.">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Meta Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Meta title" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Page URL</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="URL" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Meta Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-28 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Meta description" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>Title length: <span className="font-semibold">{counts.title}</span> <span className={`ml-2 font-medium ${titleStatus === "good" ? "text-green-700" : "text-amber-700"}`}>({titleStatus})</span></p>
            <p className="mt-1">Description length: <span className="font-semibold">{counts.description}</span> <span className={`ml-2 font-medium ${descriptionStatus === "good" ? "text-green-700" : "text-amber-700"}`}>({descriptionStatus})</span></p>
            {!normalizedUrl ? <p className="mt-1 text-red-600">Enter a valid full URL for a realistic snippet preview.</p> : null}
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <p>Tip: Keep the title clear and natural. Use the description to explain value, not just repeat keywords.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="line-clamp-2 text-2xl leading-8 text-blue-700">{title || "Your title will appear here"}</p>
          <p className="mt-1 break-all text-sm text-green-700">{normalizedUrl || "https://example.com/page"}</p>
          <p className="mt-2 text-sm leading-6 text-gray-700">{description || "Your description preview will appear here."}</p>
        </div>
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
