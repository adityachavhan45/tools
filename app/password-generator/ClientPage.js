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
          <h3 className="text-lg font-semibold mb-2">
            About Password Generator
          </h3>
          <p className="text-gray-700 mb-4">
            This free tool generates strong and secure random passwords directly
            in your browser. Passwords are never sent to a server, ensuring full
            privacy and security. You can customize length, character sets, and
            copy the generated password instantly.
          </p>

          <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Generate strong random passwords</li>
            <li>Customize length and character sets</li>
            <li>Entropy-based strength meter</li>
            <li>Copy password with one click</li>
            <li>Works offline in your browser</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Set the desired password length with the slider.</li>
            <li>Select the character sets you want to include.</li>
            <li>Click <strong>Generate</strong> to create a new password.</li>
            <li>Copy it to clipboard or reset to start fresh.</li>
          </ol>

          <h4 className="font-semibold mt-4 mb-1">📦 Practical Use Cases</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Create secure passwords for email and social media</li>
            <li>Protect online banking and financial accounts</li>
            <li>Generate unique API keys or tokens</li>
            <li>Use in password managers for extra safety</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
