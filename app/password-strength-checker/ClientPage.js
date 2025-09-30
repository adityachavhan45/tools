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
          Passwords are the first line of defense for almost every digital account
          we use today — from banking and shopping to email, cloud storage, and
          social media. A weak or predictable password can make it easy for hackers
          to gain access, which is why checking and improving password strength is
          so important. This free Password Strength Checker helps you analyze your
          password in real time, giving you instant feedback on whether it is strong
          enough to protect your accounts.
        </p>

        <p className="text-gray-700 mb-4">
          The tool runs entirely in your browser, which means your password is
          never sent to a server or stored anywhere. It evaluates your password
          based on length, character variety, and overall complexity. The analysis
          provides a score and clear recommendations so you can improve security.
          Whether you are creating a new password or testing an existing one, this
          tool is designed to guide you toward stronger, safer choices.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Instant analysis of password strength</li>
          <li>Checks for uppercase, lowercase, numbers, and symbols</li>
          <li>Score-based assessment with clear levels (Weak, Medium, Strong)</li>
          <li>Recommendations to improve weak passwords</li>
          <li>Runs locally in the browser — no data sent or stored</li>
          <li>Copy results easily for documentation or training</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Type your password into the input field.</li>
          <li>Click <strong>Check Strength</strong> to run the analysis.</li>
          <li>Review the score, color indicator, and strength level.</li>
          <li>Read the recommendations provided to improve security.</li>
          <li>Use the copy button to save or share the analysis if needed.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Personal Accounts:</strong> Check passwords for email, banking, and shopping sites.</li>
          <li><strong>Workplace Security:</strong> Ensure employees follow password policies.</li>
          <li><strong>Education:</strong> Teach students about strong password practices.</li>
          <li><strong>IT and Admins:</strong> Verify password compliance across teams.</li>
          <li><strong>Freelancers:</strong> Protect client accounts and project tools.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔒 Why Password Strength Matters</h4>
        <p className="text-gray-700 mb-4">
          Many cyberattacks start with stolen or weak passwords. Hackers often
          use techniques like brute force, dictionary attacks, or credential
          stuffing (reusing leaked passwords from one site to access another).
          A strong, unique password makes these attacks much harder. By mixing
          different character types and increasing length, you exponentially
          increase the number of possible combinations, making it nearly
          impossible for attackers to guess.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Tips for Creating Strong Passwords</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Use at least 12–16 characters.</li>
          <li>Mix uppercase, lowercase, numbers, and special symbols.</li>
          <li>Avoid dictionary words, birthdays, or personal info.</li>
          <li>Use passphrases — random but memorable words strung together.</li>
          <li>Never reuse passwords across multiple accounts.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">📖 Best Practices</h4>
        <p className="text-gray-700 mb-4">
          Strong passwords are essential, but they are not the only part of
          online safety. Use a reliable password manager to store complex
          passwords securely. Enable two-factor authentication (2FA) wherever
          possible, so even if your password is compromised, attackers cannot
          access your account. Regularly update passwords for critical accounts
          like email and banking. Finally, always be cautious of phishing
          attempts — even the strongest password will not protect you if you
          give it away to a fake site.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🌍 Who Can Benefit</h4>
        <p className="text-gray-700 mb-4">
          Anyone who uses the internet can benefit from this tool. Students can
          learn about cybersecurity basics, professionals can secure work
          accounts, businesses can enforce password policies, and everyday
          users can make sure their social media and financial accounts stay
          safe. As cyber threats continue to rise, using a password strength
          checker is one of the easiest steps you can take toward better
          security.
        </p>

        <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
        <p className="text-gray-700 leading-relaxed">
          Weak passwords are one of the most common reasons for data breaches.
          By using this Password Strength Checker, you can instantly test your
          password and get actionable advice for improvement. The tool is
          private, simple, and effective — giving you confidence that your
          digital accounts are better protected. Combine strong passwords with
          two-factor authentication and good online habits, and you will
          dramatically reduce your risk of hacking or unauthorized access.
        </p>
      </section>
    </ToolSection>
  );
}