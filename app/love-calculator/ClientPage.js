"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function LoveCalculatorPage() {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourBirthDate, setYourBirthDate] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [lovePercentage, setLovePercentage] = useState(0);
  const [loveStatus, setLoveStatus] = useState("");

  function calculateLove() {
    if (!yourName.trim() || !partnerName.trim()) {
      setMessage("⚠️ Please enter both names.");
      return;
    }

    if (!yourBirthDate || !partnerBirthDate) {
      setMessage("⚠️ Please enter both birth dates.");
      return;
    }

    try {
      // Love calculation algorithm based on names and birth dates
      const name1 = yourName.toLowerCase().replace(/\s/g, '');
      const name2 = partnerName.toLowerCase().replace(/\s/g, '');
      
      // Calculate name compatibility
      let nameScore = 0;
      const combinedNames = name1 + name2;
      for (let i = 0; i < combinedNames.length; i++) {
        nameScore += combinedNames.charCodeAt(i);
      }
      
      // Calculate birth date compatibility
      const date1 = new Date(yourBirthDate);
      const date2 = new Date(partnerBirthDate);
      const dayDiff = Math.abs(date1.getDate() - date2.getDate());
      const monthDiff = Math.abs(date1.getMonth() - date2.getMonth());
      const yearDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
      
      // Create a love percentage based on various factors
      let loveScore = (nameScore % 100);
      
      // Adjust based on birth date compatibility
      if (dayDiff === 0) loveScore += 10; // Same day bonus
      if (monthDiff === 0) loveScore += 15; // Same month bonus
      if (yearDiff <= 3) loveScore += 5; // Close age bonus
      
      // Add some randomness based on name lengths
      const lengthFactor = (name1.length + name2.length) % 20;
      loveScore += lengthFactor;
      
      // Ensure percentage is between 1-100
      const percentage = Math.max(1, Math.min(100, loveScore));
      
      // Determine love status
      let status = "";
      let statusColor = "";
      let emoji = "";
      
      if (percentage >= 90) {
        status = "Perfect Match! Soulmates Forever! 💕";
        statusColor = "text-pink-600";
        emoji = "💖";
      } else if (percentage >= 80) {
        status = "Excellent Compatibility! True Love! ❤️";
        statusColor = "text-red-500";
        emoji = "❤️";
      } else if (percentage >= 70) {
        status = "Great Match! Strong Connection! 💗";
        statusColor = "text-pink-500";
        emoji = "💗";
      } else if (percentage >= 60) {
        status = "Good Compatibility! Sweet Love! 💓";
        statusColor = "text-rose-500";
        emoji = "💓";
      } else if (percentage >= 50) {
        status = "Moderate Match! Growing Love! 💕";
        statusColor = "text-purple-500";
        emoji = "💕";
      } else if (percentage >= 40) {
        status = "Fair Compatibility! Friendship First! 💜";
        statusColor = "text-indigo-500";
        emoji = "💜";
      } else if (percentage >= 30) {
        status = "Low Match! Work on It! 💙";
        statusColor = "text-blue-500";
        emoji = "💙";
      } else {
        status = "Challenging Match! Opposites Attract! 💚";
        statusColor = "text-green-500";
        emoji = "💚";
      }

      const resultText = `# Love Calculator Result
# Generated on: ${new Date().toISOString()}

# Couple Information
# Your Name: ${yourName}
# Partner Name: ${partnerName}
# Your Birth Date: ${yourBirthDate}
# Partner Birth Date: ${partnerBirthDate}

# Love Analysis
# Love Percentage: ${percentage}%
# Love Status: ${status}
# Compatibility Level: ${percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Challenging'}

# Detailed Analysis
# Name Compatibility: ${nameScore % 100}%
# Birth Date Harmony: ${dayDiff === 0 ? 'Perfect Day Match' : monthDiff === 0 ? 'Same Month' : 'Different Dates'}
# Age Compatibility: ${yearDiff <= 3 ? 'Close Age Range' : 'Age Gap Present'}

# Love Prediction
# ${percentage >= 90 ? 'You two are destined to be together! Your souls are perfectly aligned.' :
  percentage >= 80 ? 'Amazing chemistry! You complement each other beautifully.' :
  percentage >= 70 ? 'Strong connection with great potential for lasting love.' :
  percentage >= 60 ? 'Good foundation for a loving relationship with effort.' :
  percentage >= 50 ? 'Moderate compatibility - communication is key.' :
  percentage >= 40 ? 'Friendship can bloom into something special over time.' :
  percentage >= 30 ? 'Challenges exist but love can overcome obstacles.' :
  'Very different personalities - opposites can attract!'}

# Love Tips
# ${percentage >= 80 ? '• Keep nurturing your amazing connection\n• Plan romantic surprises together\n• Celebrate your compatibility' :
  percentage >= 60 ? '• Communicate openly and honestly\n• Spend quality time together\n• Appreciate each other\'s differences' :
  percentage >= 40 ? '• Build friendship first\n• Find common interests\n• Be patient with each other' :
  '• Focus on understanding each other\n• Work on communication\n• Give love time to grow'}

# Remember: Love is not just about compatibility percentages!
# True love grows through understanding, respect, and commitment.`;

      setResult(resultText);
      setLovePercentage(percentage);
      setLoveStatus(status);
      setMessage(`✅ Love calculated successfully! ${emoji} ${percentage}% compatibility!`);
    } catch (error) {
      setMessage("❌ Error calculating love compatibility.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Love result copied to clipboard!");
  }

  function reset() {
    setYourName("");
    setPartnerName("");
    setYourBirthDate("");
    setPartnerBirthDate("");
    setResult("");
    setLovePercentage(0);
    setLoveStatus("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Love Calculator"
      subtitle="Calculate love compatibility online. Free love calculator with names and birth dates for relationship compatibility analysis and love percentage."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Love Calculator",
          description: "Calculate love compatibility online with names and birth dates.",
          slug: "/love-calculator",
          category: "Utilities/Entertainment",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Love Calculator", slug: "/love-calculator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Your Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Partner Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partner's Name
          </label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your partner's name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Your Birth Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Birth Date
          </label>
          <input
            type="date"
            value={yourBirthDate}
            onChange={(e) => setYourBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Partner Birth Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Partner's Birth Date
          </label>
          <input
            type="date"
            value={partnerBirthDate}
            onChange={(e) => setPartnerBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Love Percentage Display */}
        {lovePercentage > 0 && (
          <div className="bg-gradient-to-r from-pink-100 to-red-100 border border-pink-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {lovePercentage}%
              </div>
              <div className={`text-lg font-medium ${lovePercentage >= 80 ? 'text-red-500' : lovePercentage >= 60 ? 'text-pink-500' : lovePercentage >= 40 ? 'text-purple-500' : 'text-blue-500'}`}>
                {loveStatus}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    lovePercentage >= 80 ? 'bg-gradient-to-r from-red-400 to-pink-500' :
                    lovePercentage >= 60 ? 'bg-gradient-to-r from-pink-400 to-purple-500' :
                    lovePercentage >= 40 ? 'bg-gradient-to-r from-purple-400 to-blue-500' :
                    'bg-gradient-to-r from-blue-400 to-green-500'
                  }`}
                  style={{ width: `${lovePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Love Analysis
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={calculateLove}
            disabled={!yourName.trim() || !partnerName.trim() || !yourBirthDate || !partnerBirthDate}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-gradient-to-r from-pink-500 to-red-500 text-white shadow 
                       hover:from-pink-600 hover:to-red-600 disabled:opacity-60"
          >
            💕 Calculate Love
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!yourName.trim() && !partnerName.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Love Info */}
        <div className="border rounded-lg p-4 bg-pink-50">
          <h4 className="text-sm font-medium text-pink-700 mb-2">Love Compatibility Scale</h4>
          <div className="text-sm space-y-1">
            <div>💖 90-100%: Perfect Match - Soulmates</div>
            <div>❤️ 80-89%: Excellent - True Love</div>
            <div>💗 70-79%: Great - Strong Connection</div>
            <div>💓 60-69%: Good - Sweet Love</div>
            <div>💕 50-59%: Moderate - Growing Love</div>
            <div>💜 40-49%: Fair - Friendship First</div>
            <div>💙 30-39%: Low - Work on It</div>
            <div>💚 0-29%: Challenging - Opposites Attract</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Love Calculator</h3>
        <p className="text-gray-700 mb-4">
          The Love Calculator is a fun and entertaining tool that analyzes the romantic compatibility 
          between two people based on their names and birth dates. Using a unique algorithm that 
          considers name numerology, birth date harmony, and various compatibility factors, this 
          calculator provides a love percentage and detailed relationship analysis. While this tool 
          is designed for entertainment purposes, it can spark interesting conversations about 
          relationships and compatibility factors that matter in real love.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Name compatibility analysis:</strong> Uses advanced name numerology to calculate 
            compatibility based on the letters in both names.
          </li>
          <li>
            <strong>Birth date harmony:</strong> Analyzes birth dates to find patterns and 
            compatibility factors between partners.
          </li>
          <li>
            <strong>Love percentage:</strong> Provides a clear percentage score from 1-100% 
            representing relationship compatibility.
          </li>
          <li>
            <strong>Detailed analysis:</strong> Offers comprehensive insights including love status, 
            compatibility level, and relationship predictions.
          </li>
          <li>
            <strong>Love tips:</strong> Provides personalized advice based on the compatibility 
            score to help improve relationships.
          </li>
          <li>
            <strong>Beautiful visualization:</strong> Features colorful progress bars and romantic 
            design elements to enhance the experience.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Enter your full name in the "Your Name" field.</li>
          <li>Enter your partner's full name in the "Partner's Name" field.</li>
          <li>Select your birth date using the date picker.</li>
          <li>Select your partner's birth date using the date picker.</li>
          <li>
            Click the <strong>Calculate Love</strong> button to generate your compatibility analysis.
          </li>
          <li>
            Review your love percentage, status, and detailed analysis results.
          </li>
          <li>
            Use the copy button to save or share your love compatibility results.
          </li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Entertainment:</strong> Fun activity for couples, friends, and social gatherings 
            to explore relationship compatibility.
          </li>
          <li>
            <strong>Ice breaker:</strong> Great conversation starter for new relationships or 
            dating scenarios.
          </li>
          <li>
            <strong>Social media:</strong> Share love compatibility results on social platforms 
            for fun engagement with friends.
          </li>
          <li>
            <strong>Relationship games:</strong> Use in party games, relationship quizzes, or 
            romantic activities with your partner.
          </li>
          <li>
            <strong>Curiosity:</strong> Satisfy curiosity about name numerology and birth date 
            compatibility in relationships.
          </li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Understanding Love Compatibility</h4>
        <p className="text-gray-700 mb-4">
          Love compatibility is calculated using multiple factors including name numerology, 
          birth date analysis, and relationship harmony indicators. The algorithm considers 
          the numerical values of letters in names, birth date patterns, age compatibility, 
          and various romantic factors to generate a comprehensive love score. Higher percentages 
          indicate stronger compatibility factors, while lower scores suggest areas where 
          couples might need to work harder to build understanding and connection.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Fun and Entertainment</h4>
        <p className="text-gray-700 mb-4">
          The Love Calculator is designed primarily for entertainment and should be enjoyed as 
          a fun activity rather than a serious relationship assessment tool. Real love and 
          compatibility depend on many factors including communication, shared values, mutual 
          respect, trust, and emotional connection that cannot be measured by names and birth 
          dates alone. Use this tool to have fun, start conversations, and add some romance 
          to your day, but remember that true love is built through understanding and commitment.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚠️ Important Note</h4>
        <p className="text-gray-700 mb-4">
          While the Love Calculator uses interesting algorithms and provides entertaining results, 
          it should not be used as a basis for making serious relationship decisions. Real 
          relationship compatibility involves complex emotional, psychological, and social factors 
          that require genuine interaction and time to understand. The results are meant for 
          entertainment purposes only and should be enjoyed as a fun way to explore the concept 
          of romantic compatibility.
        </p>

        <h4 className="font-semibold mt-4 mb-1">💡 Final Thoughts</h4>
        <p className="text-gray-700">
          The Love Calculator offers a delightful way to explore romantic compatibility through 
          the lens of names and birth dates. Whether you're curious about your relationship, 
          looking for a fun activity with friends, or simply want to add some romance to your 
          day, this tool provides entertaining insights and beautiful visualizations. Remember 
          that the most important ingredients for lasting love are communication, respect, trust, 
          and genuine care for each other. Use this calculator to have fun, but build your 
          relationships on the solid foundation of real connection and understanding.
        </p>
      </section>

    </ToolSection>
  );
}
