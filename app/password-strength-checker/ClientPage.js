"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");

  function checkPasswordStrength() {
    if (!password.trim()) {
      setMessage("⚠️ Please enter a password to check.");
      return;
    }

    try {
      // Password strength analysis
      const length = password.length;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const hasSpaces = /\s/.test(password);

      let score = 0;
      let strengthLevel = "Very Weak";
      let color = "red";

      // Length scoring
      if (length >= 8) score += 1;
      if (length >= 12) score += 1;
      if (length >= 16) score += 1;

      // Character type scoring
      if (hasUpperCase) score += 1;
      if (hasLowerCase) score += 1;
      if (hasNumbers) score += 1;
      if (hasSpecialChars) score += 1;

      // Penalty for spaces
      if (hasSpaces) score -= 1;

      // Determine strength level
      if (score >= 6) {
        strengthLevel = "Very Strong";
        color = "green";
      } else if (score >= 4) {
        strengthLevel = "Strong";
        color = "blue";
      } else if (score >= 2) {
        strengthLevel = "Medium";
        color = "yellow";
      } else if (score >= 1) {
        strengthLevel = "Weak";
        color = "orange";
      } else {
        strengthLevel = "Very Weak";
        color = "red";
      }

      const strengthResult = `# Password Strength Analysis
# Generated on: ${new Date().toISOString()}

# Password Details
# Length: ${length} characters
# Has uppercase letters: ${hasUpperCase ? 'Yes' : 'No'}
# Has lowercase letters: ${hasLowerCase ? 'Yes' : 'No'}
# Has numbers: ${hasNumbers ? 'Yes' : 'No'}
# Has special characters: ${hasSpecialChars ? 'Yes' : 'No'}
# Has spaces: ${hasSpaces ? 'Yes' : 'No'}

# Strength Assessment
# Score: ${score}/8
# Level: ${strengthLevel}
# Color: ${color}

# Recommendations
${score < 4 ? '# - Use at least 8 characters' : ''}
${!hasUpperCase ? '# - Add uppercase letters' : ''}
${!hasLowerCase ? '# - Add lowercase letters' : ''}
${!hasNumbers ? '# - Add numbers' : ''}
${!hasSpecialChars ? '# - Add special characters' : ''}
${hasSpaces ? '# - Remove spaces' : ''}

# Security Tips
# - Use a unique password for each account
# - Consider using a password manager
# - Enable two-factor authentication when available
# - Regularly update your passwords
# - Avoid using personal information`;

      setStrength(strengthResult);
      setMessage("✅ Password strength analysis completed successfully!");
    } catch (error) {
      setMessage("❌ Error analyzing password strength.");
    }
  }

  function copyStrength() {
    navigator.clipboard.writeText(strength);
    setMessage("📋 Strength analysis copied to clipboard!");
  }

  function reset() {
    setPassword("");
    setStrength("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Password Strength Checker"
      subtitle="Check password strength and security online. Free password strength checker with analysis and recommendations support."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Password Strength Checker",
          description: "Check password strength and security online.",
          slug: "/password-strength-checker",
          category: "Utilities/Security",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Password Strength Checker", slug: "/password-strength-checker" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to check strength..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your password is not stored or transmitted
          </p>
        </div>

        {/* Strength Output */}
        {strength && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Strength Analysis
            </label>
            <textarea
              value={strength}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={checkPasswordStrength}
            disabled={!password.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🔍 Check Strength
          </button>

          {strength && (
            <button
              onClick={copyStrength}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Analysis
            </button>
          )}

          <button
            onClick={reset}
            disabled={!password.trim() && !strength.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Password Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">About Password Security</h4>
          <div className="text-sm space-y-1">
            <div>• Strong passwords protect your accounts</div>
            <div>• Use a mix of letters, numbers, and symbols</div>
            <div>• Avoid common words and personal information</div>
            <div>• Consider using a password manager</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Password Strength Checker</h3>
        <p className="text-gray-700 mb-4">
          Check password strength and security. This tool helps you analyze
          your password&#39;s security level and provides recommendations for
          improvement, useful for account protection and security.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Analyze password strength and security</li>
          <li>Check character types and length</li>
          <li>Score-based strength assessment</li>
          <li>Easy copy to clipboard</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Enter your password in the password field.</li>
          <li>Click <strong>Check Strength</strong> to analyze security.</li>
          <li>Use the copy button to save the analysis.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Account security and protection</li>
          <li>Password policy compliance</li>
          <li>Security awareness and education</li>
          <li>Password management and improvement</li>
        </ul>
      </section>
    </ToolSection>
  );
}