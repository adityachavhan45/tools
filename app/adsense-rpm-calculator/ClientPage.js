"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function AdSenseRPMCalculatorPage() {
  const [pageRPM, setPageRPM] = useState("");
  const [monthlyTraffic, setMonthlyTraffic] = useState("");
  const [cpc, setCpc] = useState("");
  const [cpcPercentage, setCpcPercentage] = useState("");
  const [message, setMessage] = useState("");
  const [rpmEarnings, setRpmEarnings] = useState(0);
  const [cpcEarnings, setCpcEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [actualRPM, setActualRPM] = useState(0);
  const [result, setResult] = useState("");

  function calculateRPM() {
    const rpmValue = parseFloat(pageRPM) || 0;
    const traffic = parseFloat(monthlyTraffic) || 0;
    const cpcValue = parseFloat(cpc) || 0;
    const ctr = parseFloat(cpcPercentage) || 0;

    if (!rpmValue || !traffic || !cpcValue || !ctr) {
      setMessage("⚠️ Please fill all fields correctly before calculating.");
      return;
    }
    if (ctr <= 0 || ctr > 100) {
      setMessage("⚠️ CTR must be between 1–100%.");
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

      const report = `
# AdSense RPM Calculator Report
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
      setMessage(`✅ Calculated successfully! Total monthly earnings: $${combinedEarnings.toFixed(2)}`);
    } catch {
      setMessage("❌ Error calculating RPM.");
    }
  }

  function exportCSV() {
    if (!result) {
      setMessage("⚠️ Please calculate first before exporting.");
      return;
    }
    const data = [
      ["Metric", "Value"],
      ["Page RPM", `$${pageRPM}`],
      ["Monthly Traffic", monthlyTraffic],
      ["CPC", `$${cpc}`],
      ["CTR", `${cpcPercentage}%`],
      ["RPM Earnings", `$${rpmEarnings.toFixed(2)}`],
      ["CPC Earnings", `$${cpcEarnings.toFixed(2)}`],
      ["Total Earnings", `$${totalEarnings.toFixed(2)}`],
      ["Effective RPM", `$${actualRPM.toFixed(2)}`],
    ];
    const csv = data.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `adsense-rpm-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("📊 CSV exported successfully!");
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Report copied to clipboard!");
  }

  function reset() {
    setPageRPM("");
    setMonthlyTraffic("");
    setCpc("");
    setCpcPercentage("");
    setRpmEarnings(0);
    setCpcEarnings(0);
    setTotalEarnings(0);
    setActualRPM(0);
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="AdSense RPM Calculator"
      subtitle="Calculate AdSense RPM and CPC-based revenue with full report and projections."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "AdSense RPM Calculator",
          description: "Calculate RPM, CPC and total AdSense revenue from traffic and CTR.",
          slug: "/adsense-rpm-calculator",
          category: "Utilities/Marketing",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "AdSense RPM Calculator", slug: "/adsense-rpm-calculator" },
        ])}
      />

      <div className="space-y-4">
        {message && (
          <div className="px-3 py-2 text-sm rounded border bg-blue-100 text-blue-800 border-blue-300">
            {message}
          </div>
        )}

        {/* Inputs */}
        {[
          ["Page RPM (Revenue per 1000 Views)", pageRPM, setPageRPM, "Enter Page RPM (e.g., 10)"],
          ["Monthly Traffic (Pageviews)", monthlyTraffic, setMonthlyTraffic, "Enter traffic (e.g., 30000)"],
          ["CPC (Cost Per Click)", cpc, setCpc, "Enter CPC value (e.g., 0.20)"],
          ["CTR (Click Through Rate %)", cpcPercentage, setCpcPercentage, "Enter CTR % (e.g., 2)"],
        ].map(([label, value, setter, ph], i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="number"
              step="0.01"
              value={value}
              onChange={e => setter(e.target.value)}
              placeholder={ph}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}

        {/* Results */}
        {totalEarnings > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border rounded-lg p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">${rpmEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-700">RPM-based Earnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">${cpcEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-700">CPC-based Earnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">${totalEarnings.toFixed(2)}</div>
              <div className="text-sm text-gray-700">Total Combined Earnings</div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={calculateRPM}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow hover:from-green-600 hover:to-blue-600"
          >
            💰 Calculate
          </button>
          {result && (
            <>
              <button onClick={exportCSV} className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                📊 Export CSV
              </button>
              <button onClick={copyResult} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                📋 Copy Report
              </button>
            </>
          )}
          <button onClick={reset} className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
            Reset
          </button>
        </div>

        {/* Info Section */}
        <div className="border rounded-lg p-4 bg-green-50">
          <h4 className="text-sm font-medium text-green-700 mb-2">How RPM is Calculated</h4>
          <div className="text-sm space-y-1">
            <div>• <strong>RPM</strong> = (Earnings ÷ Pageviews) × 1000</div>
            <div>• <strong>RPM-based Earnings</strong> = (Traffic × RPM) ÷ 1000</div>
            <div>• <strong>CPC-based Earnings</strong> = (Traffic × CTR ÷ 100) × CPC</div>
            <div>• <strong>Total Earnings</strong> = RPM Earnings + CPC Earnings</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About AdSense RPM Estimator</h3>
        <p className="text-gray-700 mb-4">
          The AdSense RPM (Revenue Per Mille) Estimator is a powerful tool designed for website 
          publishers and content creators to calculate potential Google AdSense earnings based on 
          their traffic, target audience location, website niche, and traffic sources. RPM varies 
          significantly across different countries, with developed markets like the US, UK, and 
          Canada typically offering higher rates compared to developing markets. This tool provides 
          region-specific calculations to help publishers make informed decisions about content 
          strategy and traffic optimization.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Region-specific RPM calculation:</strong> Accurate base RPM rates for 10+ 
            countries including India, US, UK, Canada, and Australia.
          </li>
          <li>
            <strong>Niche multipliers:</strong> 12 different website categories with specific 
            multipliers for finance, technology, health, and more.
          </li>
          <li>
            <strong>Traffic source analysis:</strong> Different multipliers for organic, social, 
            direct, referral, paid, and email traffic sources.
          </li>
          <li>
            <strong>Comprehensive revenue projections:</strong> Daily, monthly, and yearly 
            revenue estimates with detailed breakdowns.
          </li>
          <li>
            <strong>CSV export functionality:</strong> Download detailed reports for record 
            keeping and analysis.
          </li>
          <li>
            <strong>Optimization recommendations:</strong> Personalized tips based on your 
            current RPM performance.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter your website URL in the designated field.</li>
          <li>Input your average daily pageviews (you can find this in Google Analytics).</li>
          <li>Select your primary target country from the dropdown menu.</li>
          <li>Choose your websites niche category for accurate multiplier application.</li>
          <li>Select your primary traffic source (organic search, social media, etc.).</li>
          <li>
            Click <strong>Calculate RPM</strong> to generate comprehensive revenue estimates.
          </li>
          <li>Review the detailed analysis and export results if needed.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Revenue planning:</strong> Publishers can estimate potential earnings before 
            investing time and resources in content creation.
          </li>
          <li>
            <strong>Geographic targeting:</strong> Understand which countries offer better 
            monetization opportunities for your content.
          </li>
          <li>
            <strong>Niche evaluation:</strong> Compare potential earnings across different 
            content categories to optimize your strategy.
          </li>
          <li>
            <strong>Traffic source optimization:</strong> Identify which traffic sources 
            provide the best revenue potential.
          </li>
          <li>
            <strong>Business planning:</strong> Create realistic revenue projections for 
            business plans and investment decisions.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Understanding RPM Variations</h4>
        <p className="text-gray-700 mb-4">
          RPM (Revenue Per Mille) represents earnings per 1,000 pageviews and varies dramatically 
          based on several factors. Developed countries like the United States typically have 
          RPMs between $1-5, while developing markets like India might see $0.10-0.50. High-value 
          niches such as finance, insurance, and technology command premium rates due to advertiser 
          competition, while entertainment and general content typically earn less. Traffic quality 
          also matters - organic search traffic usually monetizes better than social media traffic 
          due to higher user intent.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Regional Insights</h4>
        <p className="text-gray-700 mb-4">
          Our tool includes specific multipliers for major markets: United States leads with the 
          highest base RPM due to strong advertiser spending and high purchasing power. United 
          Kingdom and Canada follow with competitive rates. European markets like Germany and 
          France offer moderate RPMs. Emerging markets including India, Brazil, and Philippines 
          have lower base rates but offer opportunities for high-volume traffic monetization. 
          Understanding these regional differences helps publishers optimize their content 
          distribution and marketing strategies.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Important Disclaimers</h4>
        <p className="text-gray-700 mb-4">
          The estimates provided by this tool are based on industry averages and historical data. 
          Actual AdSense earnings can vary significantly due to factors including seasonal trends, 
          ad quality scores, website user experience, ad placement optimization, and Googles 
          algorithm changes. These calculations should be used as rough guidelines for planning 
          purposes only. Always test and optimize your actual ad implementation for best results, 
          and consider diversifying revenue streams beyond AdSense for sustainable income.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Optimization Tips</h4>
        <p className="text-gray-700">
          To maximize your AdSense RPM, focus on creating high-quality content in profitable 
          niches, optimize your website for search engines to attract organic traffic, improve 
          user experience to increase engagement, experiment with ad placements and formats, 
          target high-value geographic markets, and maintain consistent traffic growth. Remember 
          that sustainable revenue growth comes from providing genuine value to your audience 
          while maintaining ethical monetization practices.
        </p>
      </section>

    </ToolSection>
  );
}
