"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [customTip, setCustomTip] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const tipPresets = [
    { value: "10", label: "10% - Fair" },
    { value: "15", label: "15% - Good" },
    { value: "18", label: "18% - Great" },
    { value: "20", label: "20% - Excellent" },
    { value: "25", label: "25% - Outstanding" }
  ];

  function calculateTip() {
    if (!billAmount.trim()) {
      setMessage("⚠️ Please enter the bill amount.");
      return;
    }

    try {
      const bill = parseFloat(billAmount);
      const people = parseInt(numberOfPeople) || 1;
      const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercentage);

      if (isNaN(bill) || bill <= 0) {
        setMessage("❌ Please enter a valid bill amount.");
        return;
      }

      if (isNaN(tip) || tip < 0) {
        setMessage("❌ Please enter a valid tip percentage.");
        return;
      }

      const tipAmount = (bill * tip) / 100;
      const totalAmount = bill + tipAmount;
      const amountPerPerson = totalAmount / people;
      const tipPerPerson = tipAmount / people;

      setResult({
        bill: bill,
        tipPercent: tip,
        tipAmount: tipAmount,
        totalAmount: totalAmount,
        people: people,
        amountPerPerson: amountPerPerson,
        tipPerPerson: tipPerPerson
      });

      setMessage("✅ Tip calculated successfully!");
    } catch (error) {
      setMessage("❌ Error calculating tip. Please check your input.");
    }
  }

  function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text);
    setMessage(`📋 ${type} copied to clipboard!`);
  }

  function reset() {
    setBillAmount("");
    setTipPercentage("15");
    setCustomTip("");
    setNumberOfPeople("1");
    setResult(null);
    setMessage("🧹 All fields cleared!");
  }

  return (
    <ToolSection
      title="Tip Calculator - Free Gratuity & Bill Split Tool"
      subtitle="Calculate tips and split bills instantly. Perfect for restaurants, deliveries, and service providers with customizable tip percentages."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Tip Calculator",
          description: "Free online tip calculator to calculate gratuity and split bills. Supports custom tip percentages and multiple people.",
          slug: "/tip-calculator",
          category: "Utilities/Finance",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Tip Calculator", slug: "/tip-calculator" },
        ])}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Status Message */}
        {message && (
          <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
        )}

        {/* Main Calculator Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Tip & Bill Calculator</h2>
            <p className="text-green-100 text-sm mt-1">Calculate tips and split bills with ease</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Bill Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                💵 Bill Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
            </div>

            {/* Tip Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                ⭐ Select Tip Percentage
              </label>
              <div className="grid grid-cols-5 gap-2">
                {tipPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => {
                      setTipPercentage(preset.value);
                      setCustomTip("");
                    }}
                    className={`px-3 py-3 rounded-lg font-semibold text-sm transition-all ${
                      tipPercentage === preset.value && !customTip
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {preset.value}%
                  </button>
                ))}
              </div>
              
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Or enter custom tip %
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={customTip}
                  onChange={(e) => setCustomTip(e.target.value)}
                  placeholder="Custom %"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                👥 Number of People
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
                <div className="flex gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setNumberOfPeople(num.toString())}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        numberOfPeople === num.toString()
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={calculateTip}
                disabled={!billAmount.trim()}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                🧮 Calculate Tip
              </button>

              <button
                onClick={reset}
                disabled={!billAmount.trim() && !result}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                🔄 Reset
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4">Calculation Summary</h3>
                
                {/* Main Results */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xs font-medium text-gray-500 mb-1">TIP AMOUNT</div>
                    <div className="text-2xl font-bold text-green-600">${result.tipAmount.toFixed(2)}</div>
                    <div className="text-xs text-gray-600 mt-1">{result.tipPercent}% tip</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xs font-medium text-gray-500 mb-1">TOTAL AMOUNT</div>
                    <div className="text-2xl font-bold text-emerald-600">${result.totalAmount.toFixed(2)}</div>
                    <div className="text-xs text-gray-600 mt-1">Bill + Tip</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-xs font-medium text-gray-500 mb-1">PER PERSON</div>
                    <div className="text-2xl font-bold text-blue-600">${result.amountPerPerson.toFixed(2)}</div>
                    <div className="text-xs text-gray-600 mt-1">{result.people} {result.people === 1 ? 'person' : 'people'}</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Detailed Breakdown</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Bill:</span>
                      <span className="font-semibold">${result.bill.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tip ({result.tipPercent}%):</span>
                      <span className="font-semibold text-green-600">+${result.tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold text-gray-700">Total:</span>
                      <span className="font-bold text-lg">${result.totalAmount.toFixed(2)}</span>
                    </div>
                    {result.people > 1 && (
                      <>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bill per person:</span>
                            <span className="font-medium">${(result.bill / result.people).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-600">Tip per person:</span>
                            <span className="font-medium text-green-600">${result.tipPerPerson.toFixed(2)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Copy Button */}
                <div className="mt-4">
                  <button
                    onClick={() => copyToClipboard(
                      `Bill: $${result.bill.toFixed(2)}\nTip (${result.tipPercent}%): $${result.tipAmount.toFixed(2)}\nTotal: $${result.totalAmount.toFixed(2)}\nPer Person: $${result.amountPerPerson.toFixed(2)} (${result.people} people)`,
                      "Summary"
                    )}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition-all text-sm font-medium"
                  >
                    📋 Copy Summary
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tip Guide */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">📊</span> Quick Tipping Guide
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-blue-700 mb-2">🍽️ Restaurants</div>
              <ul className="space-y-1 text-gray-700">
                <li>• 15-20% for standard service</li>
                <li>• 20-25% for exceptional service</li>
                <li>• 10% for poor service</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-blue-700 mb-2">🚗 Delivery & Taxi</div>
              <ul className="space-y-1 text-gray-700">
                <li>• 10-15% for food delivery</li>
                <li>• 15-20% for taxi/rideshare</li>
                <li>• $5 minimum for delivery</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-blue-700 mb-2">🏨 Hotels</div>
              <ul className="space-y-1 text-gray-700">
                <li>• $2-5 per bag for bellhop</li>
                <li>• $2-5 per night for housekeeping</li>
                <li>• 15-20% for room service</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-blue-700 mb-2">💇 Personal Services</div>
              <ul className="space-y-1 text-gray-700">
                <li>• 15-20% for hair stylists</li>
                <li>• 15-20% for spa services</li>
                <li>• 10-15% for nail salons</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Information Section */}
        <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Complete Guide to Tipping and Gratuity Calculation</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded"></div>
          </header>

          <div className="prose max-w-none space-y-6 text-gray-700" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Understanding Tipping Culture and Its Importance</h3>
              <p className="leading-relaxed mb-4">
                Tipping, also known as gratuity, represents a voluntary payment made to service workers in appreciation for their service quality. While the practice varies dramatically across cultures and countries, it has become an integral part of the service industry economy in many nations, particularly in the United States where tips often constitute a significant portion of service workers' income. Understanding tipping customs and calculating appropriate tip amounts correctly demonstrates respect for service workers, acknowledges their efforts, and helps maintain the social contract that enables many service businesses to operate sustainably.
              </p>
              <p className="leading-relaxed mb-4">
                The history of tipping traces back to 17th-century England, where patrons of coffeehouses would leave coins in a box marked "To Insure Promptness" (possibly the origin of the acronym TIP, though this etymology is disputed). The practice evolved and spread globally, taking different forms in various cultures. In the United States, tipping became widespread in the post-Civil War era and has since become deeply embedded in the service economy. Today, millions of restaurant servers, bartenders, delivery drivers, hairstylists, and other service workers depend on tips as their primary income source, often earning base wages well below the standard minimum wage with the expectation that tips will bring their earnings to acceptable levels.
              </p>
              <p className="leading-relaxed mb-4">
                The economics of tipping create complex dynamics that affect both workers and customers. For workers, tip-based compensation can be unstable and unpredictable, varying with business volumes, customer generosity, and factors often beyond their control. However, skilled service workers in high-end establishments can earn significantly more through tips than they might with fixed wages. For customers, tipping introduces discretion into service transactions, theoretically incentivizing better service quality while also creating uncertainty about total costs and potential social awkwardness. These dynamics have sparked ongoing debates about whether tipping should be replaced with service charges or higher base wages, but the practice remains deeply entrenched in many service sectors.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">How to Calculate Tips Correctly</h3>
              <p className="leading-relaxed mb-4">
                Calculating tips accurately requires understanding the base amount to which the tip percentage applies and performing the correct mathematical operation. The fundamental calculation involves multiplying the bill amount by the tip percentage (expressed as a decimal). For a fifteen percent tip on a fifty-dollar bill, you multiply fifty by 0.15 to get seven dollars and fifty cents. While this calculation is straightforward, confusion often arises around whether to calculate tips on the pre-tax or post-tax amount. Standard etiquette suggests calculating tips based on the pre-tax subtotal, though many people find it simpler to use the final total, which typically results in slightly higher tips that many service workers appreciate.
              </p>
              <p className="leading-relaxed mb-4">
                Our tip calculator simplifies this process by automating the mathematical computation and providing instant results. You simply enter your bill amount, select your desired tip percentage from preset options or input a custom percentage, and optionally specify how many people are sharing the bill. The calculator immediately displays the tip amount, total bill including tip, and if splitting the bill, the amount each person owes. This eliminates mental arithmetic errors, saves time at the table or checkout, and ensures everyone pays their fair share when dining in groups.
              </p>
              <p className="leading-relaxed mb-4">
                When splitting bills among multiple people, the calculation becomes more complex, particularly when some diners consumed more expensive items than others. The simplest approach divides the total bill (including tip) equally among all diners, which our calculator handles automatically. However, in situations where consumption varies significantly, a more equitable approach might involve each person calculating their portion of the subtotal, then applying the agreed-upon tip percentage to their share. Some groups prefer to split the food and drinks proportionally while dividing the tip equally, recognizing that service quality doesn't vary based on what each person ordered. Clear communication about splitting methodology before the bill arrives prevents awkward moments and ensures everyone feels the arrangement is fair.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Standard Tipping Percentages for Different Services</h3>
              <p className="leading-relaxed mb-4">
                Restaurant tipping in the United States typically follows well-established norms that have evolved over decades. For standard table service with satisfactory quality, fifteen to twenty percent represents the accepted range, with eighteen percent often considered the standard baseline for good service. Exceptional service that goes above and beyond ordinary expectations warrants twenty to twenty-five percent or more, while service falling short of reasonable standards might justify ten to fifteen percent, though many etiquette experts recommend speaking with management about serious service issues rather than using low tips as the primary feedback mechanism.
              </p>
              <p className="leading-relaxed mb-4">
                Food delivery services have their own tipping conventions that account for the convenience of home delivery and the challenges drivers face. A minimum tip of three to five dollars is generally appropriate even for small orders, with ten to fifteen percent of the order value being standard for larger orders. Factors that might warrant higher tips include poor weather conditions, long distances, stairs or difficult building access, large or heavy orders, and exceptional timeliness or service quality. Delivery apps sometimes suggest tip amounts, but these suggestions don't always align with the effort involved, so customers should consider the specific circumstances when deciding tip amounts.
              </p>
              <p className="leading-relaxed mb-4">
                Personal service providers such as hairstylists, barbers, nail technicians, and spa therapists typically receive tips in the fifteen to twenty percent range, with regulars often tipping at the higher end or even beyond to maintain good relationships with their preferred service providers. Hotel staff operate under different conventions: bellhops and porters typically receive two to five dollars per bag, housekeeping staff earn two to five dollars per night (left daily rather than at checkout, as different staff members may service your room), and concierges might receive ten to twenty dollars for significant assistance like securing difficult reservations. These amounts recognize the labor-intensive nature of these services and help ensure quality service throughout your stay.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">International Tipping Practices and Cultural Differences</h3>
              <p className="leading-relaxed mb-4">
                Tipping customs vary dramatically across countries and cultures, making international travel potentially confusing for those accustomed to American tipping norms. In many European countries, service charges are typically included in restaurant bills (often listed as "service compris" in French-speaking areas or similar phrases elsewhere), making additional tipping optional rather than expected. However, rounding up the bill or leaving small change (five to ten percent) is considered polite in many European nations. In the United Kingdom, ten to fifteen percent is customary when service charges aren't included, though this practice has been evolving in recent years.
              </p>
              <p className="leading-relaxed mb-4">
                Asian countries present particularly diverse tipping landscapes. Japan maintains a strong cultural aversion to tipping in most situations, with the practice sometimes considered insulting as it might imply the service provider's salary is insufficient or that exceptional service isn't the standard expectation. However, high-end establishments frequented by international tourists may accept tips discreetly. China has historically discouraged tipping, though attitudes have been shifting in major tourist areas and upscale establishments. South Korea similarly didn't have strong tipping traditions, though the practice has become more common in tourist-heavy areas and for certain services.
              </p>
              <p className="leading-relaxed mb-4">
                Understanding local tipping customs before traveling helps avoid social faux pas and ensures appropriate compensation for service workers. Researching tipping expectations for your destination, carrying appropriate local currency for tips, and observing what locals do can guide your behavior. When in doubt, hotel concierges or tour guides can provide reliable information about local customs. Some travelers prefer erring on the side of generosity, while others aim to respect local customs even when this means tipping less than they might at home. Both approaches have merit, though understanding the cultural context makes the choice more informed.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Factors That Should Influence Tip Amounts</h3>
              <p className="leading-relaxed mb-4">
                Service quality naturally represents the primary factor in determining appropriate tip amounts. Servers who are attentive without being intrusive, knowledgeable about menu items, quick to address issues, and generally pleasant warrant higher tips than those providing minimal or poor service. However, diners should distinguish between issues within the server's control (inattentiveness, wrong orders, poor attitude) and those that aren't (kitchen delays, food quality problems, restaurant policies). When service issues arise from kitchen or management failures rather than server performance, consider tipping based on the server's effort rather than the overall dining experience, and provide feedback to management separately.
              </p>
              <p className="leading-relaxed mb-4">
                Restaurant complexity and dining duration also merit consideration when calculating tips. A server handling a large party over several hours works significantly harder than one serving a quick lunch to a solo diner, even if the bill amounts are similar. Large group service often involves coordinating multiple orders, managing varied timing preferences, splitting checks, and navigating complex logistics that warrant recognition through higher tip percentages or amounts. Similarly, restaurants automatically adding gratuity for large parties (typically six or more) acknowledge this additional complexity, though diners providing exceptional service might receive additional tips beyond the automatic charge.
              </p>
              <p className="leading-relaxed mb-4">
                Economic considerations and personal circumstances influence tipping behavior, though navigating these factors ethically requires thoughtfulness. If budgetary constraints make standard tipping difficult, considering less expensive dining options or reducing dining-out frequency might be preferable to consistently under-tipping, as service workers depend on tips for their livelihood. However, treating oneself occasionally while tipping modestly but fairly is perfectly acceptable. During economic downturns or personal financial difficulties, many people reduce their dining frequency while maintaining appropriate tip percentages on the occasions they do dine out, respecting both their budget constraints and workers' needs.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Digital Payment and Modern Tipping Challenges</h3>
              <p className="leading-relaxed mb-4">
                The transition from cash to digital payments has transformed tipping mechanics and introduced new considerations. Credit card tips are convenient and create paper trails for tax purposes, but they may mean servers wait longer to receive their tips compared to immediate cash gratuities. Some establishments have been accused of withholding or delaying credit card tips, though this practice is illegal in most jurisdictions. Digital payment apps and point-of-sale systems increasingly include preset tip options, which can be helpful but sometimes suggest amounts higher than traditional standards or calculate tips on post-tax totals, potentially inflating expected tips.
              </p>
              <p className="leading-relaxed mb-4">
                Contactless payment and service apps have created new tipping scenarios that didn't exist in traditional cash economies. Food delivery apps present tip prompts before service is rendered, forcing customers to guess about service quality they haven't experienced. Some apps allow tip adjustments after delivery, while others lock in the pre-service tip amount. This pre-tipping system has generated controversy, with some customers feeling pressured to tip generously to ensure good service, while others argue that tips should reflect actual service quality. The apps themselves take varying approaches to how tips are displayed to workers and whether tips influence order assignment, adding complexity to an already nuanced practice.
              </p>
              <p className="leading-relaxed mb-4">
                Subscription services, membership programs, and service bundles have created ambiguity around tipping expectations. When services are pre-paid or included in memberships, customers often wonder whether additional tips are expected or appropriate. Generally, even when service is included in a flat rate or subscription, tipping for exceptional individual service remains appreciated. However, the frequency and amounts might differ from traditional service scenarios. For instance, members of gym or golf clubs might tip instructors or caddies per session at lower rates than non-members paying full service fees, or they might provide generous tips during holidays rather than after each interaction.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tipping Etiquette and Social Considerations</h3>
              <p className="leading-relaxed mb-4">
                Group dining introduces social dynamics that can make tipping awkward if not handled thoughtfully. When dining with friends, family, or colleagues, discussing bill-splitting and tip calculations before the check arrives prevents confusion and ensures everyone contributes fairly. Some groups designate one person to collect cash or Venmo payments and handle the transaction, while others prefer each person to pay their portion directly. Being prepared to discuss these logistics comfortably, knowing your expected contribution, and being gracious about minor discrepancies in splitting calculations helps maintain group harmony and ensures servers receive appropriate compensation.
              </p>
              <p className="leading-relaxed mb-4">
                Business dining adds another layer of etiquette considerations, particularly around who pays and how tips are handled. When entertaining clients or dining with superiors, higher tip percentages (twenty percent or more) demonstrate professionalism and generosity. The person who initiated the meal or is treating typically handles the bill and tip calculation. In Dutch-treat business situations, discussing tip amounts discretely before the server returns prevents awkward negotiations that reflect poorly on all participants. Some business travelers submit expense reports that include tips, making it important to tip appropriately and document amounts accurately for reimbursement purposes.
              </p>
              <p className="leading-relaxed mb-4">
                Special occasions like holidays, birthdays, or when service providers go extraordinarily far above normal expectations warrant consideration for enhanced tipping. Many people provide generous holiday tips to regular service providers like hairstylists, doormen, housekeepers, or favorite restaurant servers, sometimes giving cash bonuses equivalent to the cost of one or more typical services. These gestures acknowledge ongoing relationships and show appreciation for consistent quality service throughout the year. Similarly, when servers help make special occasions memorable through excellent service, extra-generous tips appropriately recognize their contribution to important life moments.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Should I tip on the pre-tax or post-tax amount?</p>
                  <p className="leading-relaxed">Traditional etiquette suggests calculating tips on the pre-tax subtotal, as you're tipping for service rather than government fees. However, many people find it simpler to tip on the final total, which results in slightly higher tips that most servers appreciate. Either approach is acceptable; choose what feels comfortable and be consistent.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">What should I do if service was genuinely poor?</p>
                  <p className="leading-relaxed">While reducing the tip percentage is sometimes appropriate for poor service, consider first whether issues were within the server's control. Kitchen delays, food quality, or restaurant policy problems shouldn't reduce tips if the server handled these situations professionally. For genuinely poor service from the server, ten percent might be appropriate, but also speak with management to provide constructive feedback that could improve future service.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Do I need to tip when there's an automatic service charge?</p>
                  <p className="leading-relaxed">Automatic service charges (often applied to large parties) typically take the place of tips and go to service staff. Additional tipping isn't required but is appreciated for exceptional service. Always verify that automatic charges actually go to servers rather than being retained by the restaurant. If you're uncertain, ask your server directly—they'll appreciate your consideration and can clarify.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">How should I tip for takeout or counter service?</p>
                  <p className="leading-relaxed">Takeout situations are less standardized than table service. Ten to fifteen percent is generous for takeout, though some people tip less or only leave a few dollars, as the service level is lower than dine-in. Counter service like coffee shops increasingly present tip options, though these are truly optional. If you're a regular or the staff went out of their way, tipping a dollar or two is a kind gesture.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Is it appropriate to tip with gift cards or gifts instead of cash?</p>
                  <p className="leading-relaxed">While cash tips are always appreciated for their immediate usefulness and flexibility, thoughtful gifts can supplement (but shouldn't replace) regular tipping for service providers you see frequently. Holiday gifts or cards for regular hairstylists, doormen, or other consistent service providers are wonderful gestures of appreciation, ideally in addition to normal tipping throughout the year. Verify your provider's employer allows them to accept gifts, as some workplaces have restrictions.</p>
                </div>
              </div>
            </section>

            <section className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Conclusion: Making Tipping Simple and Fair</h3>
              <p className="leading-relaxed mb-4">
                Tipping doesn't have to be complicated or stressful. By understanding standard practices, using helpful tools like our tip calculator, and approaching gratuity with consideration for both service workers and your own circumstances, you can navigate tipping situations with confidence. Whether you're dining out, ordering delivery, traveling, or using personal services, appropriate tipping shows respect for workers, acknowledges quality service, and contributes to positive service experiences for everyone.
              </p>
              <p className="leading-relaxed">
                Our Tip Calculator takes the guesswork and mental math out of gratuity calculations, providing instant, accurate results whether you're dining alone or splitting bills with groups. The tool's flexibility accommodates various tipping percentages, handles bill splitting seamlessly, and presents clear breakdowns of all amounts. By using this calculator, you ensure fair compensation for service workers, avoid awkward calculation moments, and can focus on enjoying your experiences rather than worrying about numbers. Start using our Tip Calculator today to make every tipping situation simple, fair, and stress-free.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 shadow-sm">
          <h3 className="text-lg font-bold text-orange-900 mb-4">💡 Pro Tipping Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ textAlign: 'justify' }}>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-orange-700 mb-2">✓ Tip on Pre-Tax Amount</div>
              <p className="text-gray-700 leading-relaxed">Calculate your tip based on the subtotal before taxes to follow traditional etiquette and keep amounts reasonable.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-orange-700 mb-2">✓ Carry Small Bills</div>
              <p className="text-gray-700 leading-relaxed">Keep small bills for cash tips at hotels, valet services, and other situations where digital payment isn't convenient.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-orange-700 mb-2">✓ Tip in Local Currency</div>
              <p className="text-gray-700 leading-relaxed">When traveling internationally, tip in the local currency to make it easier for service workers to use their earnings.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-orange-700 mb-2">✓ Be Generous for Great Service</div>
              <p className="text-gray-700 leading-relaxed">When service truly exceeds expectations, don't hesitate to tip 25% or more—it makes a real difference to workers.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolSection>
  );
}