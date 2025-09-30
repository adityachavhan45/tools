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

  function make() {
    const pass = generatePassword(length, opts);
    setPwd(pass);
    showMessage("✅ Password generated!");
  }

  function copy() {
    if (pwd) {
      navigator.clipboard.writeText(pwd);
      showMessage("📋 Password copied!");
    }
  }

  function clearAll() {
    setPwd("");
    setLength(16);
    setOpts({ lower: true, upper: true, digits: true, symbols: true });
    showMessage("🧹 Reset!");
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2500);
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
    if (entropy < 40) return { label: "Weak", color: "bg-red-500" };
    if (entropy < 70) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-600" };
  }

  const strengthLabel = getStrengthLabel(strength);

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <JsonLd
        data={buildToolJsonLd({
          name: "Password Generator",
          description: "Generate strong random passwords with custom options.",
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

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold">Password Generator</h2>
        <p className="text-gray-600 mt-1">
          Create strong random passwords securely in your browser.
        </p>

        {message && (
          <div className="mt-3 px-4 py-2 bg-green-100 border rounded text-green-800 text-sm shadow-sm">
            {message}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {/* Length Slider */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Length: <span className="font-semibold">{length}</span>
            </label>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="accent-indigo-600 w-64"
            />
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-6">
            {[
              ["lower", "a-z (lowercase)"],
              ["upper", "A-Z (uppercase)"],
              ["digits", "0-9 (digits)"],
              ["symbols", "Symbols (!@#$)"],
            ].map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  className="accent-indigo-600"
                  checked={opts[k]}
                  onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
              onClick={make}
            >
              Generate
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gray-800 text-white shadow hover:bg-black disabled:opacity-50"
              onClick={copy}
              disabled={!pwd}
            >
              Copy
            </button>
            <button
              className="px-5 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
              onClick={clearAll}
            >
              Reset
            </button>
          </div>

          {/* Password Output */}
          <div
            className={`p-4 border rounded-lg font-mono text-sm shadow-inner ${
              pwd ? "bg-white text-gray-800" : "bg-gray-100 text-gray-400 italic"
            }`}
          >
            {pwd || "(Click Generate to create a password)"}
          </div>

          {/* Strength Meter */}
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 rounded bg-gray-200 overflow-hidden">
                <div
                  className={`h-2 ${strengthLabel.color}`}
                  style={{ width: `${Math.min(strength, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{strengthLabel.label}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Estimated entropy: {strength.toFixed(1)} bits
            </p>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-12 bg-white border rounded-lg p-6 shadow-sm">
  <h3 className="text-lg font-semibold mb-2">About Password Generator</h3>
  <p className="text-gray-700 mb-4">
    In today’s digital-first world, a password is often the only barrier 
    between your personal information and cybercriminals. From social media 
    accounts and email inboxes to online banking and cloud storage, everything 
    relies on strong authentication. Unfortunately, many people still rely on 
    weak, easy-to-guess passwords like “123456” or “password123.” This is where 
    a secure password generator becomes an essential tool. By creating random, 
    complex strings of characters, it helps you protect your data against 
    brute-force attacks, credential stuffing, and dictionary-based hacking attempts.
  </p>

  <p className="text-gray-700 mb-4">
    Unlike manual methods where you might struggle to come up with something 
    unique, this tool leverages randomness and cryptographic functions to 
    generate passwords instantly. Best of all, everything happens securely 
    within your browser—no data is sent to a server, ensuring maximum privacy. 
    Whether you’re a casual internet user, a developer generating API keys, 
    or a business professional managing sensitive data, this tool is designed 
    to keep your credentials safe and reliable.
  </p>

  <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Generate strong random passwords instantly using secure randomness.</li>
    <li>Fully customizable length (6 to 64 characters).</li>
    <li>Choose character sets: lowercase, uppercase, digits, and special symbols.</li>
    <li>Built-in strength meter with entropy calculation to gauge security level.</li>
    <li>One-click copy feature for convenience.</li>
    <li>Works completely offline in your browser for full privacy.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
  <ol className="list-decimal list-inside text-gray-700 space-y-1">
    <li>Use the slider to select your desired password length (longer is stronger).</li>
    <li>Pick the character sets you want included—letters, numbers, or symbols.</li>
    <li>Click the <strong>Generate</strong> button to create a secure random password.</li>
    <li>Copy it to your clipboard for immediate use, or click <strong>Reset</strong> to start fresh.</li>
    <li>Check the strength meter to ensure the entropy level matches your needs.</li>
  </ol>

  <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Email & Social Media:</strong> Prevent account takeovers by using unique passwords.</li>
    <li><strong>Online Banking:</strong> Safeguard sensitive transactions with strong credentials.</li>
    <li><strong>API Keys & Tokens:</strong> Developers can generate secure keys for projects.</li>
    <li><strong>Password Managers:</strong> Pair this tool with managers to store unique logins.</li>
    <li><strong>Work Accounts:</strong> Keep business data safe from breaches or leaks.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🔒 Why Strong Passwords Matter</h4>
  <p className="text-gray-700 mb-4">
    Weak passwords remain one of the top reasons for data breaches worldwide. 
    Hackers use techniques like brute-force attacks—trying every possible 
    combination—or dictionary attacks where they test common words, names, 
    and dates. If your password is short or predictable, it can be cracked in seconds. 
    In contrast, a long random password generated with a mix of characters 
    can take years or even centuries to break with current computing power. 
    This is why security experts recommend at least 12–16 characters for 
    personal accounts and even longer for high-value assets.
  </p>

  <h4 className="font-semibold mt-4 mb-1">⚡ Understanding Password Strength</h4>
  <p className="text-gray-700 mb-4">
    This tool uses entropy (measured in bits) to estimate strength. Entropy is 
    essentially a measure of unpredictability. A short password with only 
    lowercase letters might have 20–30 bits of entropy, while a 16-character 
    password with letters, digits, and symbols can exceed 100 bits. As a rule of thumb:
  </p>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Weak (below 40 bits):</strong> Easily guessable within hours or days.</li>
    <li><strong>Medium (40–70 bits):</strong> Safer but not ideal for critical accounts.</li>
    <li><strong>Strong (70+ bits):</strong> Extremely difficult to crack, suitable for long-term use.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🚫 Common Mistakes to Avoid</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Reusing the same password across multiple accounts.</li>
    <li>Using personal details like names, birthdays, or phone numbers.</li>
    <li>Relying on simple patterns like “abcd1234” or “qwerty.”</li>
    <li>Keeping passwords short (under 8 characters).</li>
    <li>Storing passwords in plain text documents without encryption.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">📖 Best Practices for Password Management</h4>
  <p className="text-gray-700 mb-4">
    While generating strong passwords is a great first step, managing them 
    securely is equally important. Since remembering dozens of random strings 
    is impossible for most people, experts recommend using a password manager. 
    These applications store your credentials in an encrypted vault, requiring 
    you to remember only one master password. Additionally, enabling two-factor 
    authentication (2FA) wherever possible adds another layer of protection, 
    even if your password gets exposed.
  </p>

  <h4 className="font-semibold mt-4 mb-1">🌍 Why Use an Offline Generator?</h4>
  <p className="text-gray-700 mb-4">
    Many online password generators send requests to remote servers, which 
    raises privacy concerns. This tool, however, runs entirely in your 
    browser using secure random values provided by your device. No password 
    is transmitted or stored anywhere, meaning you retain full control. 
    This makes it ideal for sensitive scenarios like creating bank logins, 
    work accounts, or even cryptographic keys for development projects.
  </p>

  <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
  <p className="text-gray-700">
    A strong password is the foundation of online security. With threats growing 
    every day, relying on guessable words or reused credentials is no longer safe. 
    By using this password generator, you can instantly create complex, random 
    strings tailored to your needs, test their strength, and keep your data 
    protected. Pair it with a password manager and 2FA, and you’ll have a 
    robust defense against most cyber threats. Remember—security begins with 
    the choices you make, and a strong password is one of the simplest yet 
    most powerful defenses at your disposal.
  </p>
</section>
      </div>
    </main>
  );
}
