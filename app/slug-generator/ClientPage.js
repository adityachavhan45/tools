"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const slug = useMemo(() => slugify(text), [text]);

  function copySlug() {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setMessage("✅ Slug copied to clipboard successfully!");
    setTimeout(() => setMessage(""), 3000);
  }

  function resetAll() {
    setText("");
    setMessage("🧹 All fields cleared!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <JsonLd
        data={buildToolJsonLd({
          name: "Slug Generator - Free URL Slug Maker",
          description: "Generate clean, SEO-friendly URL slugs from any text instantly. Free online slug generator tool for bloggers, developers, and marketers.",
          slug: "/slug-generator",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Slug Generator", slug: "/slug-generator" },
        ])}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-10">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            URL Slug Generator
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Create clean, SEO-friendly, and professional URL slugs from any text instantly. Perfect for blogs, websites, and e-commerce platforms.
          </p>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200 mb-8">
          <div className="space-y-6">
            {/* Status Message */}
            {message && (
              <div className="px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow-sm">
                <p className="text-sm font-medium text-gray-800">{message}</p>
              </div>
            )}

            {/* Input Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter Your Text or Title
              </label>
              <input
                className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl shadow-sm 
                         focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 
                         outline-none text-base md:text-lg text-gray-800 placeholder-gray-400
                         transition-all duration-200"
                placeholder="e.g., How to Create Amazing Blog Posts in 2025"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500">
                Type any text, title, or phrase. The tool will automatically convert it to a URL-friendly slug.
              </p>
            </div>

            {/* Slug Output */}
            <div className="bg-gradient-to-br from-gray-50 to-cyan-50 border-2 border-cyan-200 rounded-xl p-5 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Generated Slug:</span>
                <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">
                  {slug ? `${slug.length} characters` : 'Empty'}
                </span>
              </div>
              <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="font-mono text-base md:text-lg break-all text-gray-900 font-semibold">
                  {slug || <span className="text-gray-400 italic">Your slug will appear here...</span>}
                </div>
              </div>
              {slug && (
                <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                  <p className="text-xs text-gray-600 mb-1 font-medium">Preview URL:</p>
                  <p className="text-sm text-cyan-700 break-all font-mono">
                    https://yourwebsite.com/<span className="font-bold">{slug}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={copySlug}
                disabled={!slug}
                className={`flex-1 px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg
                  ${!slug
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-700 to-blue-700 text-white hover:from-cyan-800 hover:to-blue-800 transform hover:scale-105"}`}
              >
                {slug ? "📋 Copy Slug to Clipboard" : "📋 Copy Slug"}
              </button>
              <button
                onClick={resetAll}
                disabled={!text}
                className={`px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg
                  ${!text
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105"}`}
              >
                🔄 Reset All
              </button>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-1">Instant Results</h4>
                <p className="text-xs text-gray-600">Real-time slug generation as you type</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 mb-1">100% Private</h4>
                <p className="text-xs text-gray-600">All processing happens in your browser</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-1">SEO Optimized</h4>
                <p className="text-xs text-gray-600">Creates search engine friendly URLs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Information Section */}
        <article className="prose prose-lg max-w-none">
  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why URL Slugs Matter for Modern Websites
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        URL slugs play a major role in website organization, search engine
        optimization, and user experience. A slug is the readable section of a
        webpage URL that appears after the domain name and helps describe what
        the page is about.
      </p>

      <p>
        Clean and descriptive URLs make websites look more professional while
        helping visitors understand page content instantly before clicking. For
        example, a URL like “yourwebsite.com/best-travel-tips” communicates
        meaning immediately, while random character-based URLs create confusion
        and reduce trust.
      </p>

      <p>
        Search engines also analyze URL structures to better understand page
        relevance. Well-optimized slugs containing meaningful keywords can
        improve visibility in search results and contribute to stronger overall
        SEO performance.
      </p>

      <p>
        Website owners optimizing SEO workflows may also use{" "}
        <a
          href="https://convertixy.com/meta-tag-generator"
          className="text-blue-600 font-medium hover:underline"
        >
          Meta Tag Generator
        </a>{" "}
        for improving page metadata alongside URL optimization.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Understanding the Structure of a Good Slug
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        A good slug should be short, readable, and directly related to page
        content. Most professional URLs use lowercase letters combined with
        hyphens between words because this format improves readability for both
        users and search engines.
      </p>

      <p>
        Unnecessary symbols, long random strings, and excessive stop words
        usually make URLs look cluttered and unprofessional. Clean structures
        help visitors remember URLs more easily while improving sharing across
        social media and messaging platforms.
      </p>

      <p>
        Shorter slugs also display more clearly in search engine result pages,
        especially on mobile devices where available screen space is limited.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      How Slug Generators Simplify SEO Workflows
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Manually formatting URLs for every webpage becomes difficult when
        managing large websites with blogs, landing pages, products, and dynamic
        content. Slug generators automate the process instantly while maintaining
        formatting consistency across the entire website.
      </p>

      <p>
        Instead of manually removing spaces, symbols, uppercase letters, and
        unsupported characters, the generator automatically transforms titles
        into clean URL-friendly structures within seconds.
      </p>

      <p>
        This saves time for bloggers, developers, SEO professionals, agencies,
        and businesses regularly publishing large amounts of content online.
      </p>

      <p>
        Content creators often combine URL optimization with{" "}
        <a
          href="https://convertixy.com/word-counter"
          className="text-blue-600 font-medium hover:underline"
        >
          Word Counter
        </a>{" "}
        tools to improve readability and maintain better content structure.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Consistency Is Important in URL Structures
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Consistent URL formatting improves website organization and creates a
        cleaner browsing experience. When websites follow structured URL
        conventions, users can navigate more confidently and search engines can
        understand content relationships more efficiently.
      </p>

      <p>
        For example, blogs may use category-based slugs while e-commerce stores
        may organize products using collection and product-name structures.
        Consistency reduces technical SEO issues and prevents duplicate URL
        variations.
      </p>

      <p>
        Large websites especially benefit from standardized slug generation
        because multiple content creators often publish pages simultaneously.
        Automated formatting ensures every URL follows the same professional
        structure regardless of who created the content.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      The Relationship Between Slugs and Search Rankings
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        URL slugs alone cannot guarantee high search rankings, but they still
        contribute important SEO signals. Search engines use URL structures to
        understand page topics and evaluate content relevance for search queries.
      </p>

      <p>
        Including meaningful keywords naturally inside slugs helps search engines
        categorize pages more effectively. However, keyword stuffing should
        always be avoided because unnatural URLs create poor user experiences and
        may appear spammy.
      </p>

      <p>
        The best approach is creating descriptive slugs that accurately summarize
        the page while remaining short and readable.
      </p>

      <p>
        SEO professionals managing optimized content strategies may also benefit
        from{" "}
        <a
          href="https://convertixy.com/keyword-density-checker"
          className="text-blue-600 font-medium hover:underline"
        >
          Keyword Density Checker
        </a>{" "}
        for balancing keyword usage across webpages naturally.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Common Mistakes People Make With URL Slugs
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        One of the most common mistakes is creating extremely long URLs filled
        with unnecessary words. Overly long slugs reduce readability and may
        appear messy in search results.
      </p>

      <p>
        Another mistake involves using dates inside evergreen content URLs. While
        dates may seem useful initially, they can make old content appear
        outdated even when the information remains accurate.
      </p>

      <p>
        Some users also include special characters, symbols, or uppercase letters
        that create technical issues or inconsistent formatting across platforms.
      </p>

      <p>
        Using underscores instead of hyphens is another common error because
        search engines interpret hyphens more effectively as word separators.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Browser-Based Slug Generation and Privacy Benefits
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Browser-based slug generators improve privacy because all text processing
        happens directly inside the browser instead of external servers. This
        means titles and content information remain on the user’s device during
        the entire formatting process.
      </p>

      <p>
        Local processing also improves speed because users receive instant slug
        generation without waiting for server communication or uploads.
      </p>

      <p>
        This privacy-focused approach is especially useful for businesses,
        agencies, and creators handling confidential projects or unpublished
        website content.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Practical Applications Across Different Industries
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Bloggers use slug generators to create SEO-friendly article URLs quickly.
        E-commerce stores optimize product page URLs for better discoverability.
        News websites maintain organized content archives through structured URL
        systems.
      </p>

      <p>
        Digital agencies use slug generators to maintain consistency across
        client projects, while developers integrate slug generation into content
        management workflows for automation and scalability.
      </p>

      <p>
        Educational institutions, portfolio websites, online tools, and SaaS
        platforms also depend on clean URL structures for better organization and
        improved navigation experiences.
      </p>

      <p>
        Developers managing website optimization workflows may additionally use{" "}
        <a
          href="https://convertixy.com/html-minifier"
          className="text-blue-600 font-medium hover:underline"
        >
          HTML Minifier
        </a>{" "}
        for cleaner frontend performance and improved loading efficiency.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6" style={{ textAlign: "justify" }}>
      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          What is a URL slug?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          A URL slug is the readable part of a webpage URL that appears after the
          domain name and describes page content.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Why are hyphens used in slugs?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Hyphens improve readability and help search engines recognize separate
          words more effectively compared to underscores or merged text.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Should slugs contain keywords?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes, but naturally. Relevant keywords help search engines understand
          page topics, but keyword stuffing should always be avoided.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is slug generation safe in browser-based tools?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Browser-based generators usually process text locally without
          sending content to external servers.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can long URLs affect SEO?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Extremely long URLs may reduce readability and appear cluttered in
          search results. Shorter descriptive slugs generally perform better.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50 rounded-r-xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Do slugs improve user experience?
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Yes. Clear URLs help users understand webpage content instantly and
          create stronger trust before clicking.
        </p>
      </div>
    </div>
  </section>

  <section className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-cyan-200 p-6 md:p-10 mt-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Final Thoughts
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        URL slug optimization is a small but highly important part of modern SEO
        and website management. Clean, descriptive URLs improve readability,
        strengthen trust, support search engine understanding, and create better
        navigation experiences for visitors.
      </p>

      <p>
        Slug generators simplify the entire process by automatically converting
        titles into properly formatted URLs without requiring manual editing or
        technical knowledge.
      </p>

      <p>
        Whether you manage a blog, e-commerce store, business website, SaaS
        platform, or educational portal, maintaining consistent URL structures
        contributes to stronger organization and better long-term SEO
        performance.
      </p>

      <p>
        Combining optimized slugs with high-quality content, strong internal
        linking, and technical SEO improvements creates a more professional and
        search-friendly website overall.
      </p>
    </div>
  </section>
</article>
      </div>
    </main>
  );
}
