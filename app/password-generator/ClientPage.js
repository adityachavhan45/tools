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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🔐 Secure Password Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create strong, random passwords instantly with our free online tool. 
            Generate secure passwords that protect your accounts from hackers and cyber threats.
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
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-indigo-500 pb-3 inline-block">
            The Complete Guide to Password Security and Generation
          </h2>

          <div className="prose max-w-none" style={{ textAlign: 'justify' }}>
            <p className="text-gray-700 leading-relaxed mb-5">
              In the interconnected digital landscape of the twenty-first century, passwords serve as the primary gatekeepers protecting our most valuable digital assets from unauthorized access and malicious exploitation. From email accounts containing years of personal correspondence to banking applications managing our financial resources, from social media profiles representing our online identities to cloud storage systems housing irreplaceable photographs and documents, virtually every aspect of modern digital life depends on password authentication for security. Despite this critical importance, studies consistently reveal that the majority of internet users continue employing weak, easily guessable passwords, reusing the same credentials across multiple services, and falling victim to common security pitfalls that make their accounts vulnerable to compromise through various attack methods including brute force attempts, dictionary attacks, credential stuffing, and social engineering tactics.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Our free online password generator addresses these security challenges by providing instant access to cryptographically secure random password generation without requiring downloads, installations, or technical expertise. Utilizing your web browsers built-in cryptographic random number generator, the tool creates truly random character sequences that resist pattern-based attacks while offering complete customization over password length and character composition to meet diverse security requirements across different platforms and use cases. The entire generation process occurs locally within your browser using client-side JavaScript, ensuring that generated passwords never traverse network connections or touch external servers, maintaining absolute privacy and security for your sensitive credentials while providing the convenience and accessibility of a web-based tool available from any device with a modern browser.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Understanding Password Security: The Threat Landscape
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Password-based attacks represent one of the most prevalent and successful vectors for unauthorized access to digital systems, with cybersecurity researchers documenting billions of credential-based attacks annually across personal, corporate, and governmental targets worldwide. Brute force attacks systematically attempt every possible character combination until discovering the correct password, with modern computing power enabling attackers to test billions of combinations per second against poorly secured systems, making short or simple passwords vulnerable to compromise within minutes or hours rather than the years or centuries that properly secured credentials would require. Dictionary attacks leverage databases containing millions of commonly used passwords, word lists, and predictable patterns derived from previous data breaches, allowing attackers to efficiently test likely candidates before resorting to exhaustive brute force methods.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Credential stuffing attacks exploit the widespread practice of password reuse by testing username and password combinations stolen from one breached service against thousands of other platforms, successfully compromising accounts across multiple services when users employ identical credentials everywhere. This attack method has proven devastatingly effective, with major breaches at one service frequently triggering cascading compromises across numerous unrelated platforms as attackers systematically test stolen credentials against popular websites and applications. Social engineering attacks bypass technical security entirely by manipulating users into voluntarily revealing their passwords through phishing emails mimicking legitimate services, fake password reset requests, or pretexting scenarios where attackers impersonate authority figures requesting credential disclosure for purported security or administrative purposes.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              The Mathematics of Password Strength and Entropy
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Password strength fundamentally derives from the concept of entropy, a mathematical measure of unpredictability expressed in bits that quantifies how difficult a password is to guess through systematic attempts. Each character position in a password represents a choice from the available character set, with the total number of possible passwords equaling the character set size raised to the power of the password length, creating exponential growth in complexity as length increases. A password using only lowercase letters provides twenty-six options per character, while incorporating uppercase letters doubles the pool to fifty-two characters, adding digits increases it to sixty-two, and including special symbols can expand the pool beyond ninety characters depending on which symbols the system accepts.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Entropy calculations reveal why password length matters more than most users realize. An eight-character password using only lowercase letters provides approximately thirty-eight bits of entropy, while a sixteen-character password from the same character set doubles this to seventy-six bits—but the sixteen-character password contains sixty-five thousand times more possible combinations, making it exponentially more secure. Adding character diversity multiplies these security gains, with a sixteen-character password incorporating lowercase, uppercase, digits, and symbols providing over one hundred bits of entropy and representing more combinations than atoms in the observable universe, creating mathematical security that exceeds practical attack capabilities even with supercomputer resources and unlimited time. Our password generator calculates and displays entropy in real-time, helping users understand the security implications of their chosen settings and make informed decisions about appropriate password complexity for different use cases.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Optimal Password Length and Composition Guidelines
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Security experts and organizations including the National Institute of Standards and Technology recommend minimum password lengths of twelve to sixteen characters for general use, with longer passwords providing significantly enhanced security margins that resist both current attack methods and anticipate future increases in computational power that could make shorter passwords vulnerable. However, password length alone proves insufficient without proper randomness and character diversity, as predictable patterns like sequential characters, repeated elements, or dictionary words undermine security regardless of overall length. The ideal password combines substantial length with true randomness and diverse character types, creating credentials that resist both algorithmic attacks attempting systematic guessing and human-based attacks exploiting psychological predictability.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Different accounts and systems warrant different security levels based on their sensitivity and exposure to attack. High-value targets like primary email accounts, financial services, password manager master passwords, and administrative credentials for critical systems justify maximum security with passwords exceeding twenty characters incorporating all available character types to maximize entropy and provide security margins far beyond current attack capabilities. Medium-security applications like social media accounts, shopping sites, and general web services function adequately with twelve to sixteen character passwords using multiple character types, balancing security against usability considerations. Even low-security applications for non-sensitive purposes should maintain at least eight to twelve character passwords with mixed character types, as shorter or simpler credentials create unnecessary vulnerability to automated attacks that scan for easily compromised accounts.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Password Reuse: The Critical Vulnerability
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Password reuse represents perhaps the single most dangerous password security practice, transforming every individual service breach into a potential compromise of all accounts using the same credentials and creating cascading security failures that extend far beyond the initially breached service. When attackers obtain password databases through security breaches, they immediately begin testing those credentials against thousands of popular services through automated credential stuffing attacks, successfully accessing accounts on completely unrelated platforms when users employ identical login information across multiple sites. This attack vector has enabled some of the most damaging security incidents in recent years, with breaches at relatively minor services providing attackers with credentials that unlocked access to email accounts, social media profiles, financial services, and corporate systems belonging to users who reused passwords across their digital ecosystem.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              The mathematical implications of password reuse extend beyond simple one-to-one credential compromises to create exponential vulnerability growth as the number of services using shared credentials increases. A user employing the same password across ten services creates ten potential breach points, any of which could expose credentials valid across all ten accounts, effectively multiplying attack surface area while concentrating security failure into single points of compromise. Conversely, using unique passwords for each service contains security failures to individual accounts, preventing cascade effects and limiting damage from successful breaches to the specifically compromised service rather than enabling attackers to pivot across entire digital identities. Our password generator facilitates unique password creation by enabling instant generation of secure, distinct credentials for every new account registration or password update, eliminating the perceived convenience that drives reuse while maintaining strong security across all protected services.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Password Managers: Essential Tools for Modern Security
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              The fundamental challenge of modern password security lies in the contradiction between security best practices requiring long, random, unique passwords for dozens or hundreds of online accounts and the practical limitations of human memory that make remembering even a handful of complex passwords essentially impossible for most users. Password managers resolve this contradiction by providing encrypted digital vaults that securely store unlimited passwords protected by a single master password, enabling users to maintain strong, unique credentials across all services while only needing to remember one complex password that unlocks access to the entire collection. These applications typically include built-in password generators, automatic form filling capabilities, breach monitoring services that alert users when stored credentials appear in known data breaches, and secure sharing features enabling controlled credential access for family members, team members, or service providers requiring temporary access.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Leading password managers employ robust encryption standards including AES-256 encryption that protects stored credentials even if attackers gain access to the encrypted database, with zero-knowledge architecture ensuring that the service provider cannot access user passwords since only the master password can decrypt the vault and master passwords never leave user devices in unencrypted form. Browser-based password managers built into Chrome, Firefox, Safari, and Edge provide convenient basic functionality suitable for casual users, while dedicated applications like Bitwarden, 1Password, LastPass, and Dashlane offer enhanced features including cross-device synchronization, emergency access provisions, secure note storage, and advanced security auditing tools that identify weak, reused, or compromised passwords requiring updates. Our password generator complements password manager workflows by enabling users to generate secure credentials before storing them in their preferred management application, ensuring maximum security for newly created accounts.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Multi-Factor Authentication: Defense in Depth
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              While strong passwords provide essential foundational security, modern threat landscapes demand defense-in-depth approaches that layer multiple security mechanisms to protect against sophisticated attacks and account compromise scenarios. Multi-factor authentication enhances password-based security by requiring additional verification factors beyond knowledge of the password, typically involving possession of a physical device like a smartphone receiving one-time codes or biometric characteristics like fingerprints or facial recognition that attackers cannot easily replicate remotely. This additional authentication layer dramatically reduces successful account compromises even when passwords become exposed through phishing attacks, keyloggers, or data breaches, as attackers lacking access to the second factor cannot complete authentication despite possessing valid credentials.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Various multi-factor authentication methods offer different security and convenience tradeoffs suitable for different use cases and risk profiles. SMS-based codes provide basic multi-factor protection with minimal setup requirements but remain vulnerable to SIM-swapping attacks where attackers convince cellular providers to transfer phone numbers to attacker-controlled devices. Authenticator applications like Google Authenticator, Microsoft Authenticator, or Authy generate time-based one-time passwords directly on user devices without requiring network connectivity, providing stronger security against interception attacks. Hardware security keys implementing FIDO2 standards offer maximum security through cryptographic authentication that prevents phishing and man-in-the-middle attacks, though requiring users to carry physical tokens and limiting authentication to devices with appropriate connectivity. Organizations and individuals should enable multi-factor authentication on all services offering this protection, particularly for high-value accounts managing sensitive data or financial transactions where compromise could produce significant consequences.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Common Password Mistakes and Security Anti-Patterns
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Despite widespread awareness of password security principles, numerous common practices continue undermining password effectiveness across both personal and organizational contexts. Using personal information in passwords including names, birthdates, phone numbers, addresses, or pet names creates easily guessable credentials vulnerable to attacks leveraging publicly available information from social media profiles, public records, or data breaches exposing personal details. Simple substitutions like replacing letters with similar-looking numbers or symbols provide minimal security improvement since password cracking tools automatically test common substitution patterns, making P@ssw0rd barely more secure than Password despite superficially appearing more complex to human perception.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Writing passwords on physical notes attached to monitors, stored in desk drawers, or hidden under keyboards creates obvious security vulnerabilities enabling anyone with physical access to compromise accounts without technical expertise or attack tools. Saving passwords in unencrypted text files, spreadsheets, or email drafts exposes credentials to malware, unauthorized access, or accidental disclosure through file sharing or device theft. Sharing passwords via insecure channels like email, text messages, or instant messaging applications creates interception opportunities and permanent records of credentials in message histories accessible to attackers compromising those communication platforms. Failing to update passwords after security incidents, employee departures, or relationship changes with people who previously had legitimate access enables ongoing unauthorized access through credentials that should have been revoked or rotated.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Technical Implementation: How Our Generator Works
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Our password generator leverages the Web Cryptography APIs getRandomValues method to access cryptographically secure random number generation capabilities built into modern web browsers, providing randomness quality suitable for security-critical applications unlike older JavaScript random number generators that produced predictable pseudo-random sequences vulnerable to state prediction attacks. The getRandomValues method requests random data from the operating systems cryptographic random number generator, which typically derives randomness from hardware entropy sources including timing variations in processor operations, user input timing, network packet arrival times, and dedicated hardware random number generators in modern processors. This approach ensures that generated passwords exhibit true randomness rather than predictable patterns that could be exploited by sophisticated attackers with knowledge of the generation algorithm and its internal state.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              The generation process constructs a character pool based on user-selected options combining lowercase letters, uppercase letters, digits, and special symbols according to enabled character sets, then randomly selects characters from this pool to build passwords of specified length. Unlike some generators that construct passwords using word combinations or patterns, our implementation produces completely random character sequences that maximize entropy for given length and character set constraints. All password generation and entropy calculations occur entirely within the browsers JavaScript execution environment without any network communication, ensuring that generated passwords exist only in local browser memory and never transmit to external servers or get logged in remote systems. Users can verify this privacy guarantee by examining network traffic during password generation or testing functionality with network connectivity disabled, confirming that the tool operates completely offline once the initial page loads.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Password Rotation and Update Strategies
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Traditional security guidance advocating mandatory password changes every sixty or ninety days has fallen out of favor among modern security experts who recognize that forced rotation policies often produce counterproductive results including users making minimal incremental changes to existing passwords, writing down passwords they cannot remember due to frequent changes, or reusing patterns across multiple forced rotation cycles. Contemporary recommendations from NIST and other authoritative sources instead emphasize password changes only when specific indicators suggest potential compromise including notification of breaches affecting services where the password was used, unusual account activity suggesting unauthorized access, shared access scenarios where other users had legitimate password knowledge but relationships have changed, or password exposure through accidental disclosure, phishing attacks, or observation by unauthorized individuals.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              When password changes become necessary, users should generate completely new random passwords rather than incrementally modifying existing passwords through predictable transformations like adding numbers, changing single characters, or rotating through seasonal variations that maintain recognizable core patterns. Our password generator facilitates secure password rotation by enabling instant creation of entirely new credentials meeting appropriate security requirements without tempting users toward lazy incremental modifications or pattern-based variations. Organizations implementing password rotation policies should provide easy access to password generation tools, password manager solutions, and user education emphasizing the importance of true password replacement rather than superficial modification, while focusing rotation requirements on high-risk accounts and situations with specific compromise indicators rather than implementing blanket mandatory change policies that decrease rather than enhance actual security through predictable user behavior patterns.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Future Trends: Beyond Traditional Passwords
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              While passwords remain the dominant authentication method across most digital services, evolving security landscapes and technological capabilities are driving gradual transitions toward passwordless authentication approaches that eliminate or significantly reduce dependence on memorized secrets. Biometric authentication using fingerprints, facial recognition, iris scanning, or behavioral patterns provides convenient authentication based on inherent physical or behavioral characteristics rather than knowledge factors like passwords, though raising privacy concerns and creating challenges around revocation since users cannot change compromised biometric data the way they can replace exposed passwords. Hardware tokens and smart cards implementing cryptographic authentication protocols provide strong security through possession factors without requiring users to remember complex passwords, particularly effective in corporate environments where organizations can manage and distribute authentication devices to employees.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Emerging standards like WebAuthn and FIDO2 enable widespread passwordless authentication through public key cryptography where users authenticate using private keys stored securely on their devices rather than transmitting passwords to remote servers, fundamentally eliminating many traditional password attack vectors including phishing, credential stuffing, and server-side password database breaches. Despite these advancing alternatives, password-based authentication will likely persist for many years across legacy systems, services lacking resources for advanced authentication implementation, and scenarios where fallback authentication methods remain necessary when primary passwordless systems fail or become unavailable. Understanding proper password generation and management therefore remains essential even as authentication landscapes evolve, ensuring users can maintain security across the diverse authentication ecosystem characterizing modern digital environments spanning cutting-edge passwordless services and traditional password-dependent platforms.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions About Password Security</h3>
            
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">How long should my password be?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Security experts recommend passwords of at least twelve to sixteen characters for general use. Longer passwords are exponentially more secure—a sixteen-character password is vastly more secure than an eight-character one. For high-security accounts like email or banking, consider twenty or more characters.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">Is it safe to use an online password generator?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Our password generator is completely safe because it runs entirely in your browser using cryptographically secure random generation. Your passwords are never sent to any server or stored anywhere except locally in your browser. You can verify this by checking your network traffic or testing with internet disabled.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">Should I include special characters in my passwords?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Yes, including special characters significantly increases password strength by expanding the character pool from which your password is built. This increases entropy and makes brute-force attacks exponentially more difficult. However, ensure the special characters are truly random rather than predictable substitutions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-amber-500">
                <h4 className="font-semibold text-gray-900 mb-2">How often should I change my passwords?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Modern security guidance recommends changing passwords only when there is evidence of compromise, such as a data breach notification or suspicious account activity. Forced regular changes often lead to weaker passwords as users make predictable modifications. Focus on using strong, unique passwords with multi-factor authentication instead.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-5 border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-900 mb-2">Can I reuse passwords across different websites?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Never reuse passwords across different websites. If one service is breached, attackers will test those credentials on other popular sites through credential stuffing attacks. Use a password manager to maintain unique passwords for every account without having to memorize them all.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border-l-4 border-cyan-500">
                <h4 className="font-semibold text-gray-900 mb-2">What is password entropy and why does it matter?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Entropy measures password unpredictability in bits. Higher entropy means more possible combinations and stronger resistance to guessing attacks. A password with eighty bits of entropy would take billions of years to crack with current technology. Our generator displays entropy to help you understand your passwords true security level.
                </p>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border-l-4 border-violet-500">
                <h4 className="font-semibold text-gray-900 mb-2">Are password generators better than creating my own passwords?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Yes, password generators create truly random passwords that resist both algorithmic and human-based attacks. Human-created passwords inevitably contain patterns and predictable elements that sophisticated attacks can exploit. Random generation ensures maximum entropy and security for given length and character constraints.
                </p>
              </div>
            </div>
          </div>

          {/* Final Conclusion */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Conclusion: Taking Control of Your Digital Security</h3>
            <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
              Password security represents one of the most fundamental yet frequently overlooked aspects of personal cybersecurity, with strong passwords serving as the essential first line of defense protecting our digital lives from unauthorized access and malicious exploitation. Our free password generator empowers users to instantly create cryptographically secure, random passwords tailored to their specific security requirements without requiring technical expertise or compromising privacy through server-side processing. By combining strong password generation with password manager tools, multi-factor authentication, and security-conscious practices including unique passwords for every account and prompt updates following breach notifications, you can establish robust password security that protects against the vast majority of credential-based attacks threatening modern digital systems. Start generating secure passwords today to take control of your authentication security and build a stronger foundation for your overall cybersecurity posture in our increasingly connected world.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}