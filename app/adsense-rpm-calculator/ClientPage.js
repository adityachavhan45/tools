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

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Where to find these in AdSense</p>
        <ul className="space-y-1.5 text-blue-800 text-justify">
          <li><strong>Page RPM:</strong> AdSense → Reports → Page RPM (per page or site).</li>
          <li><strong>CPC:</strong> Reports → Page-level or site-level cost per click.</li>
          <li><strong>CTR:</strong> Reports → Click-through rate (%).</li>
          <li><strong>Traffic:</strong> Use Google Analytics pageviews or AdSense page views.</li>
        </ul>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">Use your last 30-day AdSense and Analytics data for realistic estimates.</p>
      </div>
    </div>
  );

  return (
    <ToolSection
      title="AdSense RPM Calculator"
      subtitle="Estimate your Google AdSense revenue using Page RPM, monthly traffic, CPC, and CTR. Free, private, and accurate."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-xl font-semibold text-gray-900 mb-4">About the AdSense RPM Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free AdSense RPM Calculator helps website publishers and bloggers estimate potential Google AdSense
          revenue using four key metrics: <strong>Page RPM</strong> (revenue per 1,000 pageviews), <strong>monthly
          traffic</strong> (pageviews), <strong>CPC</strong> (cost per click), and <strong>CTR</strong> (click-through
          rate). You can find these values in your Google AdSense and Google Analytics reports. The tool combines
          RPM-based and click-based revenue to give you a single monthly earnings estimate and an effective RPM.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use this tool</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Open Google AdSense and note your average <strong>Page RPM</strong> (or use a typical value like $1–5 for US traffic).</li>
          <li>Enter your <strong>monthly pageviews</strong> from Analytics or AdSense.</li>
          <li>Enter your average <strong>CPC</strong> and <strong>CTR %</strong> from AdSense reports.</li>
          <li>Click <strong>Calculate earnings</strong> to see estimated monthly revenue, effective RPM, and estimated clicks.</li>
          <li>Use <strong>Export CSV</strong> or <strong>Copy report</strong> to save results.</li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">What affects AdSense RPM?</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          RPM varies by country (e.g. higher in US/UK, lower in India), niche (finance and tech often higher),
          traffic source (organic search usually performs better than social), ad placement, and content quality.
          The numbers from this calculator are estimates only; your actual AdSense earnings depend on these and
          other factors.
        </p>

        <h2 id="niche-rpm-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">AdSense RPM by Website Niche: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your website niche is one of the strongest drivers of Google AdSense RPM. Advertisers bid more for audiences
          that are likely to convert, so topics tied to high-intent searches and valuable products tend to earn more per
          thousand pageviews. Understanding how different niches perform helps you set realistic expectations in this
          RPM calculator and plan content or pivot into better-monetizing categories if that fits your goals.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">High-RPM Niches: Finance, Insurance, and Legal</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Finance (investing, loans, credit cards, banking, cryptocurrency) consistently ranks among the top AdSense
          niches. Users searching for financial products often have clear purchase intent, so advertisers pay premium
          CPMs and CPCs. Insurance and legal services follow a similar pattern: people looking for quotes or legal
          advice are high-value leads. Expect RPMs in developed markets to sit in the upper range compared to general
          content. Competition and compliance are steeper—financial content often needs accuracy disclaimers and
          adherence to local regulations, but the revenue potential justifies the effort for many publishers.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Technology, Software, and SaaS</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Technology and software niches attract advertisers selling tools, courses, and B2B services. Tutorials,
          comparisons, and how-to guides around software, hosting, cybersecurity, and productivity tools tend to get
          strong RPMs because the audience is often decision-makers or professionals. B2B ads typically have higher
          cost per click than B2C in many categories, which lifts both CPC and RPM. Content that targets commercial
          keywords (e.g. “best project management software,” “VPN comparison”) usually monetizes better than purely
          informational posts, though both can work with consistent traffic and good ad placement.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Health, Fitness, and Wellness</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Health and wellness content can achieve solid RPMs, especially when it aligns with commercial or
          research-heavy queries. Supplements, fitness equipment, medical information, and mental health resources
          attract advertisers willing to pay for qualified traffic. Google’s policies around health and YMYL (Your Money
          Your Life) content are strict: claims must be backed by expertise and sources. Sites that meet these
          standards and focus on clear, helpful content often see stable RPMs. Sub-niches like weight loss, nutrition,
          and chronic condition management can vary widely; always prioritise accuracy and user safety to keep
          AdSense compliance and long-term revenue healthy.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Home Improvement, Real Estate, and DIY</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Home improvement, real estate, and do-it-yourself projects attract advertisers in construction, appliances,
          and property services. Users planning renovations or purchases often spend time on multiple pages and
          return via search, which supports both RPM and repeat traffic. Seasonal spikes (e.g. spring and summer for
          outdoor projects) can create RPM swings, so using this calculator with different traffic and RPM assumptions
          helps you model best- and worst-case months. Localised content (e.g. “best HVAC contractors in [city]”) can
          attract geo-targeted ads and sometimes higher CPMs in competitive regions.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Education, Courses, and Career</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Education and career development niches benefit from advertisers promoting courses, certifications, and
          job-related services. Content around online learning, exam preparation, and career advancement often has
          strong intent and longer session duration. RPMs are usually above the content-site average but below
          finance or insurance. Combining evergreen guides with timely topics (e.g. exam dates, hiring trends) can
          balance traffic and monetisation. Affiliate links to courses or tools can complement AdSense and improve
          overall revenue per visitor.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Travel and Lifestyle</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Travel content can deliver moderate to good RPMs depending on geography and query type. Destination guides,
          booking comparisons, and travel gear reviews attract travel brands and affiliates. RPMs often improve when
          traffic comes from high-spend countries (e.g. US, UK, Australia) and when content targets commercial
          keywords rather than purely inspirational posts. Seasonal and event-driven traffic (holidays, festivals)
          creates RPM variability, so averaging your AdSense data over several months before plugging numbers into
          this calculator gives a more realistic baseline.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Entertainment, News, and General Content</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Entertainment and general-interest sites often see lower RPMs than the niches above because advertiser
          competition and intent are typically lower. That said, volume can compensate: a site with millions of
          pageviews at a modest RPM can still generate meaningful revenue. News and trending topics can spike RPM
          during major events when ad demand rises. Optimising ad formats, placement, and user experience helps
          maximise RPM within the niche. Using this calculator with conservative RPM and traffic figures helps set
          achievable targets and plan for scale.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Niche Overlap and Blended RPM</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Many sites cover multiple sub-niches, so your reported Page RPM in AdSense is already a blend of different
          pages and topics. High-RPM pages (e.g. a few finance or tech articles) can lift the site average, while
          a lot of low-RPM entertainment or news content can pull it down. When you enter your Page RPM into this
          calculator, use the value that best represents the traffic you are estimating for—whether that is site-wide
          average, a specific section, or a single high-performing page. Segmenting by section in AdSense or
          Analytics can give you more accurate inputs for scenario planning.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Geography and Niche Together</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          RPM is influenced by both niche and audience location. A finance blog with mostly US traffic will usually
          earn more per thousand views than the same niche with mostly traffic from regions with lower ad spend.
          When you use this AdSense RPM calculator, your existing RPM (from AdSense reports) already reflects your
          current mix of niches and geographies. If you are considering expanding into new countries or topics,
          expect RPM to shift and run the calculator with different RPM and traffic assumptions to see how revenue
          could change.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Content Quality and AdSense Policy</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Regardless of niche, AdSense policies require original, valuable content that provides a good user
          experience. Thin content, copied material, or policy violations can lead to limited ad serving or account
          issues, which directly affect RPM and long-term earnings. Investing in clear structure, factual accuracy,
          and helpful depth supports both approval and sustained RPM. Use the numbers from this calculator as
          planning benchmarks, and keep improving content and UX so your actual AdSense performance can meet or
          exceed those estimates over time.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Choosing and Testing Niches with Your RPM Data</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you are building a new site or adding a new content category, use your current AdSense reports to see
          which pages or sections earn the highest RPM. Compare that to the niche descriptions above to see where you
          fit. Then plug those RPM numbers into this calculator along with your traffic (current or projected) to
          estimate monthly revenue. For new niches, start with industry benchmarks: finance and insurance often
          report $3–15+ RPM in tier-one countries, technology $2–8, health and home $1.5–6, and entertainment or
          general content $0.50–3. Your real numbers will depend on your content quality, geography, and ad
          placement. Re-run the calculator every few months as your traffic and RPM change to keep your revenue
          expectations aligned with reality.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary: Niche and Your AdSense RPM Calculator Results</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          In short, niche choice has a major impact on how much you earn per thousand pageviews. High-intent
          verticals like finance, insurance, technology, and health usually support higher RPMs; entertainment and
          general content tend to be lower but can still work at scale. Your actual Page RPM in AdSense already
          reflects your mix of content and audience. Use that value in this free AdSense RPM calculator to get
          realistic monthly earnings estimates, and refer to this niche guide when planning new content or
          evaluating why your RPM might be higher or lower than others in your space.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for estimation and planning only. Actual AdSense earnings can differ due to seasonality,
          ad quality, policy compliance, and Google’s algorithms. We are not affiliated with Google. Use your
          official AdSense data for real earnings and consider diversifying income beyond AdSense.
        </p>
      </section>
    </ToolSection>
  );
}
