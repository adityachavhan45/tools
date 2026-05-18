"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

function generatePassword(length, opts) {
  const sets = [];
  if (opts.lower) sets.push("abcdefghijklmnopqrstuvwxyz");
  if (opts.upper) sets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (opts.digits) sets.push("0123456789");
  if (opts.symbols) sets.push("!@#$%^&*()-_=+[]{};:,.<>/?");
  if (sets.length === 0) return "";
  const all = sets.join("");
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => all[n % all.length]).join("");
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
  });
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [history, setHistory] = useState([]);

  function make() {
    const pass = generatePassword(length, opts);
    setPwd(pass);
    setHistory(prev => [pass, ...prev].slice(0, 5));
    showMessage("✅ Password generated successfully!");
  }

  function copy() {
    if (pwd) {
      navigator.clipboard.writeText(pwd);
      showMessage("📋 Password copied to clipboard!");
    }
  }

  function downloadPassword() {
    if (pwd) {
      const blob = new Blob([`Generated Password: ${pwd}\n\nSettings:\nLength: ${length}\nLowercase: ${opts.lower}\nUppercase: ${opts.upper}\nDigits: ${opts.digits}\nSymbols: ${opts.symbols}\n\nGenerated on: ${new Date().toLocaleString()}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'password.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showMessage("📥 Password file downloaded!");
    }
  }

  function clearAll() {
    setPwd("");
    setLength(16);
    setOpts({ lower: true, upper: true, digits: true, symbols: true });
    setHistory([]);
    showMessage("🧹 All settings reset!");
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }

  const strength = useMemo(() => {
    const pool =
      (opts.lower ? 26 : 0) +
      (opts.upper ? 26 : 0) +
      (opts.digits ? 10 : 0) +
      (opts.symbols ? 30 : 0);
    const entropy = Math.log2(Math.max(1, pool)) * length;
    return entropy;
  }, [length, opts]);

  function getStrengthLabel(entropy) {
    if (entropy < 40) return { label: "Weak", color: "bg-red-500", textColor: "text-red-700", percentage: 25 };
    if (entropy < 60) return { label: "Fair", color: "bg-orange-500", textColor: "text-orange-700", percentage: 50 };
    if (entropy < 80) return { label: "Good", color: "bg-yellow-500", textColor: "text-yellow-700", percentage: 75 };
    return { label: "Strong", color: "bg-green-600", textColor: "text-green-700", percentage: 100 };
  }

  const strengthInfo = getStrengthLabel(strength);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "Password Generator",
          description: "Generate strong, secure random passwords with customizable options. Free online password generator for ultimate security.",
          slug: "/password-generator",
          category: "Utilities/Security",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Password Generator", slug: "/password-generator" },
        ])}
      />

      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Password Generator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600 max-w-3xl mx-auto">
            Create strong random passwords instantly with custom length and character options.
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mb-6 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg shadow-md animate-fade-in">
            <p className="text-green-800 font-medium">{message}</p>
          </div>
        )}

        {/* Main Password Generator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          {/* Password Display */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              🔑 Generated Password
            </label>
            <div className="relative">
              <div className={`p-5 border-2 rounded-xl font-mono text-lg tracking-wide shadow-inner transition-all duration-200 ${
                pwd ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-300 text-gray-900" : "bg-gray-100 border-gray-300 text-gray-400 italic"
              }`}>
                {pwd ? (
                  showPassword ? pwd : '•'.repeat(pwd.length)
                ) : (
                  "Click 'Generate Password' to create a secure password"
                )}
              </div>
              {pwd && (
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              )}
            </div>
            {pwd && (
              <p className="text-xs text-gray-600 mt-2">
                Password length: {pwd.length} characters
              </p>
            )}
          </div>

          {/* Length Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-gray-800">
                📏 Password Length
              </label>
              <span className="text-2xl font-bold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-lg">
                {length}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((length - 6) / 58) * 100}%, #e5e7eb ${((length - 6) / 58) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6</span>
              <span>Recommended: 12-16</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Options */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-800 mb-3">
              ⚙️ Character Options
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: "lower", label: "Lowercase Letters", example: "(a-z)", icon: "🔤" },
                { key: "upper", label: "Uppercase Letters", example: "(A-Z)", icon: "🔠" },
                { key: "digits", label: "Numbers", example: "(0-9)", icon: "🔢" },
                { key: "symbols", label: "Special Symbols", example: "(!@#$%)", icon: "⚡" },
              ].map(({ key, label, example, icon }) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    opts[key]
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                    checked={opts[key]}
                    onChange={(e) => setOpts({ ...opts, [key]: e.target.checked })}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <span className="font-semibold text-gray-800">{label}</span>
                    </div>
                    <span className="text-xs text-gray-600">{example}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Strength Meter */}
          <div className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-semibold text-gray-800">
                💪 Password Strength
              </label>
              <span className={`font-bold text-sm px-3 py-1 rounded-full ${
                strengthInfo.label === "Weak" ? "bg-red-100 text-red-700" :
                strengthInfo.label === "Fair" ? "bg-orange-100 text-orange-700" :
                strengthInfo.label === "Good" ? "bg-yellow-100 text-yellow-700" :
                "bg-green-100 text-green-700"
              }`}>
                {strengthInfo.label}
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
              <div
                className={`h-3 ${strengthInfo.color} transition-all duration-500 ease-out`}
                style={{ width: `${strengthInfo.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
              <span>Entropy: {strength.toFixed(1)} bits</span>
              <span>
                {strength < 40 ? "⚠️ Very easy to crack" :
                 strength < 60 ? "⚠️ Could be cracked" :
                 strength < 80 ? "✓ Reasonably secure" :
                 "✓ Extremely secure"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              className="flex-1 min-w-[160px] px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={make}
            >
              🔄 Generate Password
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 
                       text-white font-semibold shadow-lg hover:from-blue-700 hover:to-cyan-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={copy}
              disabled={!pwd}
            >
              📋 Copy
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                       text-white font-semibold shadow-lg hover:from-green-700 hover:to-emerald-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={downloadPassword}
              disabled={!pwd}
            >
              📥 Download
            </button>
            <button
              className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 
                       font-semibold shadow-md transform transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={clearAll}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Password History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              Recent Passwords
            </h3>
            <div className="space-y-2">
              {history.map((pass, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <code className="font-mono text-sm text-gray-800 flex-1 truncate">{pass}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pass);
                      showMessage("📋 Password copied!");
                    }}
                    className="ml-3 px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-bold text-gray-900 mb-2">Dos</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use 12+ characters</li>
              <li>• Mix character types</li>
              <li>• Unique per account</li>
              <li>• Use password manager</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-red-500">
            <div className="text-3xl mb-2">❌</div>
            <h4 className="font-bold text-gray-900 mb-2">Donts</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use personal info</li>
              <li>• Reuse passwords</li>
              <li>• Use dictionary words</li>
              <li>• Share passwords</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
            <div className="text-3xl mb-2">🛡️</div>
            <h4 className="font-bold text-gray-900 mb-2">Extra Security</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Enable 2FA/MFA</li>
              <li>• Regular updates</li>
              <li>• Encrypted storage</li>
              <li>• Monitor breaches</li>
            </ul>
          </div>
        </div>

        {/* Comprehensive Information Section */}
       <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Why Strong Password Security Has Become More Important Than Ever
  </h2>

  <div className="space-y-4 text-sm sm:text-base leading-7 text-slate-700">
    <p className="text-justify">
      Almost every digital activity today depends on passwords. From email accounts and banking applications to social media platforms and cloud storage services, passwords act as the first layer of protection for personal and professional information. As internet usage continues growing worldwide, cyber threats targeting weak credentials have also increased significantly.
    </p>

    <p className="text-justify">
      Many users still rely on simple passwords, repeated login credentials, or predictable combinations that can be guessed easily through automated attacks. This creates serious security risks because a compromised password can expose sensitive personal information, financial accounts, work systems, and online identities.
    </p>

    <p className="text-justify">
      A Password Generator helps users create strong and random passwords instantly without needing advanced technical knowledge. Instead of manually inventing passwords that may contain predictable patterns, users can generate highly secure combinations designed to resist common attack methods more effectively.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Understanding Why Weak Passwords Create Security Risks
    </h3>

    <p className="text-justify">
      Weak passwords are one of the most common reasons online accounts get compromised. Attackers use automated tools capable of testing millions of password combinations within very short periods. Simple passwords such as common words, birthdays, names, or repeated patterns are usually discovered quickly through brute force or dictionary attacks.
    </p>

    <p className="text-justify">
      Password reuse creates another major vulnerability. When users use the same password across multiple websites, a breach on one platform can expose accounts on many others. Attackers frequently test leaked credentials across different websites using automated credential stuffing techniques.
    </p>

    <p className="text-justify">
      Strong passwords help reduce these risks by increasing unpredictability and making automated attacks much more difficult and time consuming.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      How This Password Generator Works
    </h3>

    <p className="text-justify">
      This browser based Password Generator creates random passwords using selected settings such as password length and character combinations. Users can include uppercase letters, lowercase letters, numbers, and special symbols depending on their security requirements.
    </p>

    <p className="text-justify">
      Once the settings are selected, the generator instantly creates random password combinations that are significantly more secure than manually created passwords. Since the generation process happens directly inside the browser, users can quickly generate multiple secure passwords without relying on external processing systems.
    </p>

    <p className="text-justify">
      The simplicity of browser based generation makes the tool accessible for beginners while still remaining useful for advanced users who require stronger authentication security.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Password Length Matters So Much
    </h3>

    <p className="text-justify">
      Password length plays one of the biggest roles in overall account security. Longer passwords create exponentially larger possible combinations, making them significantly harder to crack through brute force attacks.
    </p>

    <p className="text-justify">
      Even a small increase in password length can dramatically improve resistance against automated guessing attempts. Security experts generally recommend using passwords with at least twelve to sixteen characters for most online accounts.
    </p>

    <p className="text-justify">
      High value accounts such as primary email addresses, banking services, cloud storage systems, and password managers often benefit from even longer passwords combined with additional security measures.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Character Diversity Improves Password Strength
    </h3>

    <p className="text-justify">
      Strong passwords usually combine multiple character types including uppercase letters, lowercase letters, numbers, and symbols. Using diverse characters increases the total number of possible combinations, making passwords much harder to predict.
    </p>

    <p className="text-justify">
      Attackers commonly test predictable password structures first. Passwords using only simple lowercase words remain far more vulnerable than randomly generated combinations containing varied character patterns.
    </p>

    <p className="text-justify">
      Users exploring secure text generation workflows sometimes additionally use the <a href="https://convertixy.com/random-string-generator" className="text-blue-600 hover:underline font-medium">Random String Generator</a> while creating secure identifiers, tokens, and unpredictable character sequences for development or authentication purposes.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Password Reuse Is Extremely Dangerous
    </h3>

    <p className="text-justify">
      Reusing passwords across different platforms is one of the biggest security mistakes users make online. If one website experiences a data breach, attackers may attempt the same username and password combination across banking platforms, email services, social media accounts, and shopping websites.
    </p>

    <p className="text-justify">
      This means a single compromised website can create a chain reaction affecting multiple accounts simultaneously. Using unique passwords for every service helps isolate risks and prevents large scale account compromise from a single breach incident.
    </p>

    <p className="text-justify">
      Password managers often help users handle this challenge more effectively by storing unique passwords securely across multiple devices.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      The Growing Importance of Multi Factor Authentication
    </h3>

    <p className="text-justify">
      Passwords alone are no longer enough for maximum security protection. Many platforms now support multi factor authentication, which adds another verification layer beyond the password itself.
    </p>

    <p className="text-justify">
      Multi factor authentication may involve verification codes, authenticator applications, biometric scans, or hardware security keys. Even if attackers obtain the password, they usually cannot access the account without the second verification factor.
    </p>

    <p className="text-justify">
      Combining strong passwords with multi factor authentication creates significantly stronger protection against modern cyber threats and credential based attacks.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Common Password Habits That Reduce Security
    </h3>

    <p className="text-justify">
      Many users unintentionally weaken security through predictable habits. Using personal information such as birthdays, names, favourite sports teams, or phone numbers creates passwords that attackers can often guess through publicly available information.
    </p>

    <p className="text-justify">
      Writing passwords on paper notes, saving them in unsecured files, or sharing them through messaging applications can also expose accounts to unnecessary risks. Another common mistake involves making only small modifications to old passwords instead of generating completely new combinations.
    </p>

    <p className="text-justify">
      Users should focus on randomness, uniqueness, and proper password management rather than relying on memorable but predictable patterns.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Browser Based Password Generators Feel More Convenient
    </h3>

    <p className="text-justify">
      Browser based tools simplify accessibility because users can instantly generate secure passwords without downloading software or creating accounts. This allows fast password generation directly from desktop or mobile devices whenever required.
    </p>

    <p className="text-justify">
      This Password Generator works locally inside the browser itself, making the process lightweight and responsive. Users can repeatedly generate secure combinations until they find password structures that match their preferred security requirements.
    </p>

    <p className="text-justify">
      Developers and security focused users sometimes also use the <a href="https://convertixy.com/base64-encoder-decoder" className="text-blue-600 hover:underline font-medium">Base64 Encoder Decoder</a> while working with encoded credentials, secure tokens, or authentication related workflows across development projects.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Privacy Benefits of Local Password Generation
    </h3>

    <p className="text-justify">
      Password generation involves highly sensitive information, which is why many users prefer tools that avoid external data transmission. Browser based local processing improves privacy because generated passwords remain on the user device itself.
    </p>

    <p className="text-justify">
      Since this generator operates entirely inside the browser, passwords never need to be uploaded externally before generation occurs. This reduces exposure risks and provides a more secure user experience.
    </p>

    <p className="text-justify">
      Local generation also improves speed because password creation happens instantly without depending on server communication or cloud processing systems.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Why Password Managers Have Become Essential
    </h3>

    <p className="text-justify">
      Remembering dozens of long and unique passwords manually becomes difficult for most users. Password managers solve this problem by securely storing credentials inside encrypted vaults protected by a master password.
    </p>

    <p className="text-justify">
      This allows users to maintain unique passwords across different websites without needing to memorise every individual credential. Many password managers also include breach monitoring, password health analysis, and automatic login support.
    </p>

    <p className="text-justify">
      Users handling secure text transformation workflows sometimes additionally use the <a href="https://convertixy.com/text-to-hash" className="text-blue-600 hover:underline font-medium">Text to Hash Generator</a> while learning about hashing systems, encryption concepts, and secure data representation methods.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Helpful Password Security Practices for Everyday Use
    </h3>

    <p className="text-justify">
      Users should create unique passwords for every important account, especially email, banking, and cloud storage services. Multi factor authentication should always be enabled whenever available because it adds critical additional protection.
    </p>

    <p className="text-justify">
      Passwords should also be updated immediately after security breach notifications or suspicious login activity. Avoid sharing credentials through insecure communication channels, and never rely on simple predictable patterns for important accounts.
    </p>

    <p className="text-justify">
      Regularly reviewing account security settings and strengthening weak passwords can significantly reduce long term cybersecurity risks.
    </p>

    <h3 className="text-lg font-semibold text-slate-900 mt-6">
      Final Thoughts on Using a Password Generator
    </h3>

    <p className="text-justify">
      Password security continues to remain one of the most important parts of protecting digital accounts and online identities. Weak passwords, reused credentials, and predictable patterns still cause millions of account compromises globally every year.
    </p>

    <p className="text-justify">
      This browser based Password Generator provides a fast and beginner friendly way to create strong, random, and highly secure passwords without complicated setup or technical expertise. Users can instantly generate passwords that offer significantly stronger protection against common attack methods.
    </p>

    <p className="text-justify">
      Whether you are securing email accounts, financial platforms, business systems, social media profiles, or development environments, using properly generated passwords combined with strong security practices can help create a much safer digital experience over the long term.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}
