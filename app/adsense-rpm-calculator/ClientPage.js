"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";

export default function AdSenseRPMCalculatorPage() {
  const [pageRPM, setPageRPM] = useState("");
  const [monthlyTraffic, setMonthlyTraffic] = useState("");
  const [cpc, setCpc] = useState("");
  const [ctrPercent, setCtrPercent] = useState("");
  const [message, setMessage] = useState("");
  const [rpmEarnings, setRpmEarnings] = useState(0);
  const [cpcEarnings, setCpcEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [actualRPM, setActualRPM] = useState(0);
  const [estimatedClicks, setEstimatedClicks] = useState(0);
  const [result, setResult] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  function calculateRPM() {
    const rpmValue = parseFloat(pageRPM) || 0;
    const traffic = parseFloat(monthlyTraffic) || 0;
    const cpcValue = parseFloat(cpc) || 0;
    const ctr = parseFloat(ctrPercent) || 0;

    if (!rpmValue || rpmValue <= 0) {
      setMessage("Please enter a valid Page RPM (e.g. 2.50).");
      return;
    }
    if (!traffic || traffic <= 0) {
      setMessage("Please enter valid monthly pageviews (e.g. 50000).");
      return;
    }
    if (!cpcValue || cpcValue <= 0) {
      setMessage("Please enter a valid CPC in dollars (e.g. 0.25).");
      return;
    }
    if (!ctr || ctr <= 0 || ctr > 100) {
      setMessage("CTR must be between 0.01 and 100%.");
      return;
    }

    try {
      const rpmBasedEarnings = (traffic * rpmValue) / 1000;
      const clicks = (traffic * ctr) / 100;
      const cpcBasedEarnings = clicks * cpcValue;
      const combinedEarnings = rpmBasedEarnings + cpcBasedEarnings;
      const effectiveRPM = (combinedEarnings / traffic) * 1000;

      setRpmEarnings(rpmBasedEarnings);
      setCpcEarnings(cpcBasedEarnings);
      setTotalEarnings(combinedEarnings);
      setActualRPM(effectiveRPM);
      setEstimatedClicks(clicks);
      setHasCalculated(true);

      const report = `# AdSense RPM Calculator Report
Generated on: ${new Date().toLocaleString()}

Page RPM: $${rpmValue.toFixed(2)}
Monthly Traffic: ${traffic.toLocaleString()}
CPC: $${cpcValue.toFixed(2)}
CTR: ${ctr}%

RPM-based Earnings: $${rpmBasedEarnings.toFixed(2)}
CPC-based Earnings: $${cpcBasedEarnings.toFixed(2)}
Total Combined Earnings: $${combinedEarnings.toFixed(2)}

Effective RPM: $${effectiveRPM.toFixed(2)}
Estimated Monthly Clicks: ${clicks.toLocaleString()}
`;
      setResult(report);
      setMessage("");
    } catch {
      setMessage("Something went wrong. Please check your inputs and try again.");
    }
  }

  function exportCSV() {
    if (!result) {
      setMessage("Please run a calculation first, then export.");
      return;
    }
    const data = [
      ["Metric", "Value"],
      ["Page RPM", `$${pageRPM}`],
      ["Monthly Traffic", monthlyTraffic],
      ["CPC", `$${cpc}`],
      ["CTR (%)", `${ctrPercent}%`],
      ["RPM Earnings", `$${rpmEarnings.toFixed(2)}`],
      ["CPC Earnings", `$${cpcEarnings.toFixed(2)}`],
      ["Total Earnings", `$${totalEarnings.toFixed(2)}`],
      ["Effective RPM", `$${actualRPM.toFixed(2)}`],
      ["Estimated Clicks", Math.round(estimatedClicks).toString()],
    ];
    const csv = data.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `adsense-rpm-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Report exported successfully.");
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setMessage("Report copied to clipboard.");
  }

  function reset() {
    setPageRPM("");
    setMonthlyTraffic("");
    setCpc("");
    setCtrPercent("");
    setRpmEarnings(0);
    setCpcEarnings(0);
    setTotalEarnings(0);
    setActualRPM(0);
    setEstimatedClicks(0);
    setResult("");
    setMessage("");
    setHasCalculated(false);
  }

  return (
    <ToolSection
      title="AdSense RPM Calculator"
      subtitle="Estimate your Google AdSense revenue using Page RPM, monthly traffic, CPC, and CTR. Free, private, and accurate."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Enter your metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="page-rpm" className="block text-sm font-medium text-gray-700 mb-1.5">
                Page RPM ($ per 1,000 views)
              </label>
              <input
                id="page-rpm"
                type="number"
                step="0.01"
                min="0"
                value={pageRPM}
                onChange={(e) => setPageRPM(e.target.value)}
                placeholder="e.g. 2.50"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                aria-describedby="rpm-hint"
              />
              <p id="rpm-hint" className="mt-1 text-xs text-gray-500">Revenue per 1,000 pageviews from AdSense.</p>
            </div>
            <div>
              <label htmlFor="monthly-traffic" className="block text-sm font-medium text-gray-700 mb-1.5">
                Monthly traffic (pageviews)
              </label>
              <input
                id="monthly-traffic"
                type="number"
                step="1000"
                min="0"
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="cpc" className="block text-sm font-medium text-gray-700 mb-1.5">
                CPC – Cost per click ($)
              </label>
              <input
                id="cpc"
                type="number"
                step="0.01"
                min="0"
                value={cpc}
                onChange={(e) => setCpc(e.target.value)}
                placeholder="e.g. 0.25"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="ctr" className="block text-sm font-medium text-gray-700 mb-1.5">
                CTR – Click-through rate (%)
              </label>
              <input
                id="ctr"
                type="number"
                step="0.01"
                min="0.01"
                max="100"
                value={ctrPercent}
                onChange={(e) => setCtrPercent(e.target.value)}
                placeholder="e.g. 2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                aria-describedby="ctr-hint"
              />
              <p id="ctr-hint" className="mt-1 text-xs text-gray-500">Typically 0.5%–5% for content sites.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={calculateRPM}
              className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Calculate earnings
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Where to find these in AdSense</p>
            <ul className="space-y-1.5 text-blue-800 text-sm text-justify">
              <li><strong>Page RPM:</strong> AdSense → Reports → Page RPM (per page or site).</li>
              <li><strong>CPC:</strong> Reports → Page-level or site-level cost per click.</li>
              <li><strong>CTR:</strong> Reports → Click-through rate (%).</li>
              <li><strong>Traffic:</strong> Use Google Analytics pageviews or AdSense page views.</li>
            </ul>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              Use your last 30-day AdSense and Analytics data for realistic estimates.
            </p>
          </div>
        </div>

        {hasCalculated && totalEarnings >= 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-green-600 text-white">
              <h3 className="text-lg font-semibold">Your estimated AdSense revenue</h3>
              <p className="text-green-100 text-sm mt-0.5">Based on the metrics you entered</p>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-4 rounded-xl bg-green-50 border border-green-100">
                <p className="text-2xl font-bold text-green-700">${rpmEarnings.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">RPM-based earnings</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">${cpcEarnings.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">CPC-based earnings</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-900 text-white sm:col-span-2 lg:col-span-1">
                <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
                <p className="text-sm text-gray-300 mt-1">Total monthly earnings</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200 sm:col-span-2 lg:col-span-1">
                <p className="text-xl font-bold text-gray-800">${actualRPM.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-1">Effective RPM</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200 sm:col-span-2 lg:col-span-1">
                <p className="text-xl font-bold text-gray-800">{Math.round(estimatedClicks).toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Est. monthly clicks</p>
              </div>
            </div>
            <div className="px-5 pb-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportCSV}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Copy report
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">How the calculator works</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>RPM-based earnings</strong> = (Monthly traffic × Page RPM) ÷ 1,000</li>
            <li><strong>CPC-based earnings</strong> = (Traffic × CTR ÷ 100) × CPC</li>
            <li><strong>Total earnings</strong> = RPM-based + CPC-based</li>
            <li><strong>Effective RPM</strong> = (Total earnings ÷ Traffic) × 1,000</li>
          </ul>
        </div>
      </div>

     <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify">

  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    About the AdSense RPM Calculator
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    Most beginner bloggers start a website with the expectation that higher traffic automatically means higher earnings.
    After a few months, many of them become confused because even after getting thousands of visitors, their AdSense
    income still remains low. This usually happens because AdSense revenue depends on much more than pageviews alone.
    Factors like niche quality, visitor location, content depth, ad engagement, website speed, and search traffic
    quality all affect overall RPM and estimated earnings.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    The AdSense RPM Calculator helps publishers estimate potential monthly earnings using important metrics such as
    Page RPM, CPC, CTR, and total monthly pageviews. Instead of manually calculating advertising performance, users
    can instantly understand how different traffic scenarios may impact revenue. This makes the tool useful for
    bloggers, affiliate marketers, educational websites, SaaS publishers, niche website owners, and content creators
    trying to grow sustainable advertising income.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many website owners only focus on publishing more pages without improving content quality. In reality, one
    high-quality page with strong user engagement can sometimes generate more revenue than dozens of weak pages.
    Search engines and advertisers both prefer websites that provide clear information, better readability, faster
    loading speed, and genuine value for visitors.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Publishers struggling with low rankings or traffic drops often analyze technical SEO problems using the{" "}
    <a
      href="/meta-tag-generator"
      className="text-blue-600 underline font-medium"
    >
      Meta Tag Generator
    </a>{" "}
    while improving search appearance and page structure for better organic visibility.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Understanding How RPM Actually Works
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    RPM stands for Revenue Per Mille, which simply means estimated earnings per 1,000 pageviews. If a website has an
    RPM of $4 and receives 100,000 monthly pageviews, estimated earnings may reach around $400. However, RPM
    constantly changes depending on the type of audience visiting the website.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    A finance website targeting users from countries like the United States or the United Kingdom may generate
    significantly higher RPM than a general entertainment website targeting untargeted global traffic. Advertisers
    spend more money in industries where visitors are likely to purchase products or services, which increases both
    CPC and advertising competition.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Another important factor is CTR or Click Through Rate. Even websites with moderate traffic can improve revenue if
    users actively interact with advertisements. Ad placement, website structure, content readability, and mobile
    optimization all influence CTR performance.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Website Speed Affects AdSense Earnings
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Website speed directly affects user retention and advertising visibility. Slow-loading pages increase bounce rate
    because visitors often leave before content and advertisements fully load. Faster websites usually achieve better
    engagement, stronger session duration, and improved monetization performance.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many publishers regularly monitor loading performance while optimizing heavy files and improving overall website
    efficiency for better user experience and ad visibility.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Large image files are one of the biggest reasons websites become slow. Compressing heavy images with the{" "}
    <a
      href="/image-compressor"
      className="text-blue-600 underline font-medium"
    >
      Image Compressor
    </a>{" "}
    helps reduce loading time while maintaining visual quality across desktop and mobile devices.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many modern publishers also convert traditional image formats into lightweight WEBP images using the{" "}
    <a
      href="/jpg-to-webp"
      className="text-blue-600 underline font-medium"
    >
      JPG to WEBP Converter
    </a>{" "}
    because WEBP files generally improve loading speed and reduce bandwidth usage.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    High RPM Niches That Usually Perform Better
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Some niches naturally generate better advertising revenue because advertisers compete aggressively for user
    attention. Finance, insurance, software, cybersecurity, online business, and legal industries often achieve high
    CPC values due to strong purchase intent from users.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Technology and software websites also perform well because companies constantly advertise hosting services, AI
    tools, VPNs, SaaS platforms, productivity software, and development solutions. Developers working with APIs and
    code formatting often use utilities like the{" "}
    <a
      href="/json-formatter"
      className="text-blue-600 underline font-medium"
    >
      JSON Formatter
    </a>{" "}
    while debugging projects or cleaning structured data.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Advanced developers and programmers also validate regular expressions using the{" "}
    <a
      href="/regex-tester"
      className="text-blue-600 underline font-medium"
    >
      Regex Tester
    </a>{" "}
    before implementing pattern matching in applications, forms, automation systems, or backend logic.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Educational and career-related websites continue to grow because users actively search for interview preparation,
    certifications, coding tutorials, online learning resources, and job guidance. These users generally spend more
    time reading content, which increases engagement and ad visibility.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Organic Traffic Usually Generates Better Revenue
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Organic search traffic often performs better than random untargeted traffic because visitors arrive with specific
    intent. Users searching for solutions through Google usually spend more time reading detailed content compared to
    low-quality social traffic.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Publishers improving SEO structure often create optimized metadata using the{" "}
    <a
      href="/meta-tag-generator"
      className="text-blue-600 underline font-medium"
    >
      Meta Tag Generator
    </a>{" "}
    to generate proper SEO titles and descriptions that improve search engine visibility and click-through rate.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Structured data also helps search engines understand content better. Many website owners create structured schema
    markup using the{" "}
    <a
      href="/schema-markup-generator"
      className="text-blue-600 underline font-medium"
    >
      Schema Markup Generator
    </a>{" "}
    to improve rich result eligibility and search appearance.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Search engine crawl optimization is another important factor for indexing performance. Publishers often generate
    proper crawler instructions using the{" "}
    <a
      href="/robots-txt-generator"
      className="text-blue-600 underline font-medium"
    >
      Robots.txt Generator
    </a>{" "}
    to improve crawl management and indexing behavior.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Content quality also matters heavily for long-term SEO performance. Writers and publishers frequently analyze
    keyword balance while maintaining natural readability and avoiding over-optimization problems.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Content Quality Matters for AdSense Approval
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Google AdSense prefers websites that provide original, helpful, and user-focused content. Thin pages with
    repetitive wording, copied paragraphs, or low-value information often struggle during the approval process.
    Websites with useful explanations, better structure, faster loading speed, and strong readability usually create
    a better impression for both users and advertisers.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many website owners make the mistake of publishing hundreds of pages with nearly identical content structures.
    Search engines can easily recognize repetitive patterns. Instead of focusing only on quantity, publishers should
    prioritize depth, uniqueness, practical information, and real usefulness.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Internal linking also improves user experience because visitors can naturally discover related tools and
    resources. For example, users checking search appearance may preview metadata using the{" "}
    <a
      href="/serp-snippet-preview"
      className="text-blue-600 underline font-medium"
    >
      SERP Snippet Preview Tool
    </a>{" "}
    before publishing optimized pages.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Technical users and developers sometimes encode URLs properly using the{" "}
    <a
      href="/url-encoder"
      className="text-blue-600 underline font-medium"
    >
      URL Encoder
    </a>{" "}
    while working with APIs, tracking parameters, redirects, or encoded search queries.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Security-focused users also create stronger passwords using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify password strength through the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before using credentials across websites or applications.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    AdSense revenue depends on multiple factors including RPM, CPC, audience quality, niche selection, website speed,
    SEO structure, and overall user experience. This calculator helps publishers estimate potential earnings while
    understanding how different monetization metrics work together.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Instead of chasing shortcuts or publishing repetitive pages, website owners should focus on building genuinely
    useful content, improving technical quality, optimizing page speed, and creating better experiences for real
    users. Long-term consistency and quality improvements usually perform much better than temporary traffic spikes
    or mass-generated low-value pages.
  </p>

</section>
    </ToolSection>
  );
}
