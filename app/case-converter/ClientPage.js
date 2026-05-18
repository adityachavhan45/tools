"use client";

import { useState } from "react";

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
    .join(" ");
}

function toSentenceCase(text) {
  return text
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s*[a-z])/g, (char) => char.toUpperCase());
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <section className="min-h-[70vh] px-4 py-12 bg-white">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-black mb-6">Case Converter</h1>

        <label className="block text-sm font-medium mb-2 text-black">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-40 !bg-white !text-black"
          placeholder="Type or paste text"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          <button type="button" onClick={() => setOutput(input.toUpperCase())} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">UPPERCASE</button>
          <button type="button" onClick={() => setOutput(input.toLowerCase())} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">lowercase</button>
          <button type="button" onClick={() => setOutput(toTitleCase(input))} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">Title Case</button>
          <button type="button" onClick={() => setOutput(toSentenceCase(input))} className="!bg-black !text-white !py-2 !px-4 !rounded-lg !shadow-none">Sentence case</button>
          <button type="button" onClick={() => setOutput("")} className="!bg-gray-200 !text-black !py-2 !px-4 !rounded-lg !shadow-none">Clear Output</button>
        </div>

        <label className="block text-sm font-medium mb-2 mt-6 text-black">Output</label>
        <textarea
          value={output}
          readOnly
          className="w-full min-h-40 !bg-white !text-black"
          placeholder="Converted text"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-6">

  <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-2xl font-bold text-gray-900">
    About This Case Converter
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

    <p>
      The Case Converter helps users instantly change text formatting into uppercase,
      lowercase, title case, or sentence case without manually editing each word.
      Many people regularly work with messy text copied from documents, spreadsheets,
      PDFs, websites, emails, or social media posts where capitalization becomes
      inconsistent. This tool simplifies that process and saves time.
    </p>

    <p>
      Writers, bloggers, students, marketers, developers, business owners, and content
      creators often need properly formatted text for articles, presentations, landing
      pages, advertisements, product listings, and social media captions. Instead of
      correcting capitalization manually, users can instantly convert large amounts of
      text into clean readable formatting.
    </p>

    <p>
      Different formatting styles solve different writing problems. Uppercase text is
      commonly used for labels, headings, warnings, and short emphasis. Lowercase text
      helps normalize inconsistent formatting. Title case is useful for blog titles,
      headlines, and product names, while sentence case improves readability in longer
      paragraphs and written content.
    </p>

    <p>
      Users optimizing article headings and metadata often combine formatting tools with
      the{" "}
      <a
        href="/meta-tag-generator"
        className="text-blue-600 underline font-medium"
      >
        Meta Tag Generator
      </a>{" "}
      to create properly formatted SEO titles and descriptions for websites and blogs.
    </p>

  </div>
</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    Why Proper Text Formatting Matters
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

    <p>
      Proper capitalization improves readability, professionalism, and visual structure.
      Text written entirely in uppercase can feel aggressive or difficult to read in
      long paragraphs, while inconsistent capitalization may reduce clarity and create
      an unprofessional appearance.
    </p>

    <p>
      Structured formatting helps readers quickly understand headings, sections, labels,
      and important information. Businesses, educational websites, blogs, eCommerce
      stores, and marketing campaigns all rely heavily on properly formatted text for
      better communication.
    </p>

    <p>
      Writers preparing long-form articles often clean rough content using the{" "}
      <a
        href="/word-counter"
        className="text-blue-600 underline font-medium"
      >
        Word Counter
      </a>{" "}
      to track article length and improve readability before publishing.
    </p>

  </div>

</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    Common Use Cases
  </h2>

  <div className="mt-4 grid gap-4 sm:grid-cols-2">

    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="font-semibold text-gray-900">
        Blog Titles and Headlines
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Content creators often convert headings into title case before publishing blog
        posts, landing pages, YouTube titles, newsletters, and article sections.
      </p>
    </div>

    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="font-semibold text-gray-900">
        Spreadsheet and Database Cleanup
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Businesses frequently clean inconsistent text copied from spreadsheets, forms,
        databases, CRM systems, and exported reports before sharing information publicly.
      </p>
    </div>

    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="font-semibold text-gray-900">
        Social Media and Marketing
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Marketers often use title case and sentence case while preparing social captions,
        advertising headlines, and promotional banners for better readability.
      </p>
    </div>

    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="font-semibold text-gray-900">
        Coding and Development
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Developers sometimes standardize variable names, labels, API values, and
        formatted strings before using them inside applications or structured data.
      </p>
    </div>

  </div>

</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    How Case Conversion Helps Writers
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

    <p>
      Writers often paste content from multiple sources, which creates inconsistent
      capitalization patterns. Editing every sentence manually becomes time-consuming,
      especially when working with large documents or article drafts.
    </p>

    <p>
      Case conversion tools improve workflow efficiency by instantly restructuring text
      into cleaner readable formatting. This is particularly useful while editing blogs,
      newsletters, eBooks, research documents, and product descriptions.
    </p>

    <p>
      Content creators optimizing article structure sometimes use the{" "}
      <a
        href="/slug-generator"
        className="text-blue-600 underline font-medium"
      >
        Slug Generator
      </a>{" "}
      to generate cleaner URL slugs from formatted titles before publishing pages online.
    </p>

    <p>
      Users comparing edited drafts and formatting changes also rely on the{" "}
      <a
        href="/text-diff-checker"
        className="text-blue-600 underline font-medium"
      >
        Text Difference Checker
      </a>{" "}
      to identify modifications between different versions of content.
    </p>

  </div>

</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    Why Online Formatting Tools Save Time
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

    <p>
      Manual text editing becomes inefficient when handling large amounts of content.
      Online formatting tools simplify repetitive tasks and improve productivity by
      instantly converting text into the required format.
    </p>

    <p>
      Browser-based tools are especially convenient because users can access them from
      any device without installing software. This improves accessibility for students,
      remote workers, writers, and business teams.
    </p>

    <p>
      Users preparing structured content and encoded text sometimes combine formatting
      utilities with tools like the{" "}
      <a
        href="/text-to-html-encoder"
        className="text-blue-600 underline font-medium"
      >
        Text to HTML Encoder
      </a>{" "}
      while preparing data for websites and online platforms.
    </p>

  </div>

</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    Privacy and Browser-Based Processing
  </h2>

  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

    <p>
      Privacy matters when working with personal notes, business drafts, or sensitive
      text. This Case Converter processes text directly inside the browser without
      requiring account creation or unnecessary uploads.
    </p>

    <p>
      Users managing online accounts and sensitive data also improve account security
      using the{" "}
      <a
        href="/password-generator"
        className="text-blue-600 underline font-medium"
      >
        Password Generator
      </a>{" "}
      and verify stronger credentials through the{" "}
      <a
        href="/password-strength-checker"
        className="text-blue-600 underline font-medium"
      >
        Password Strength Checker
      </a>{" "}
      before storing information online.
    </p>

  </div>

</section>

<section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

  <h2 className="text-2xl font-bold text-gray-900">
    Frequently Asked Questions
  </h2>

  <div className="mt-4 space-y-3">

    <details className="rounded-lg bg-gray-50 px-4 py-3">
      <summary className="cursor-pointer font-semibold text-gray-900">
        Is this Case Converter free to use?
      </summary>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Yes, the tool is completely free and works directly in the browser without
        requiring registration.
      </p>
    </details>

    <details className="rounded-lg bg-gray-50 px-4 py-3">
      <summary className="cursor-pointer font-semibold text-gray-900">
        Does the tool store my text?
      </summary>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        The conversion runs inside the browser, and no account is required. Avoid
        entering highly sensitive information into any online tool unless you understand
        the associated risks.
      </p>
    </details>

    <details className="rounded-lg bg-gray-50 px-4 py-3">
      <summary className="cursor-pointer font-semibold text-gray-900">
        What is the difference between title case and sentence case?
      </summary>

      <p className="mt-2 text-sm leading-6 text-gray-700">
        Title case capitalizes important words in headings and titles, while sentence
        case mainly capitalizes the beginning of sentences for natural paragraph-style
        writing.
      </p>
    </details>

  </div>

</section>

      </div>
    </section>
  );
}
