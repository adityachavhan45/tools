"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useEffect, useMemo, useState } from "react";

export default function UnixTimePage() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [showUTC, setShowUTC] = useState(true);
  const [message, setMessage] = useState("");

  const dateFromTs = useMemo(() => new Date(timestamp * 1000), [timestamp]);
  const tsFromDate = useMemo(
    () => Math.floor(new Date(dateStr).getTime() / 1000) || 0,
    [dateStr]
  );

  // Auto update every second
  useEffect(() => {
    if (!autoUpdate) return;
    const interval = setInterval(
      () => setTimestamp(Math.floor(Date.now() / 1000)),
      1000
    );
    return () => clearInterval(interval);
  }, [autoUpdate]);

  function copy(val) {
    navigator.clipboard.writeText(val.toString());
    setMessage(`✅ Copied: ${val}`);
    setTimeout(() => setMessage(""), 2000);
  }

  function resetAll() {
    setTimestamp(Math.floor(Date.now() / 1000));
    setDateStr(new Date().toISOString().slice(0, 19));
    setMessage("🧹 Reset done!");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "Unix Time Converter",
          description: "Convert Unix timestamp to human-readable date and vice versa.",
          slug: "/unix-time",
          category: "Utilities/Time",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Unix Time Converter", slug: "/unix-time" },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            Unix Timestamp Converter
          </h2>
          <p className="text-gray-600 mt-1">
            Convert between Unix time and human-readable date.
          </p>

          {message && (
            <div className="mt-3 px-4 py-2 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm shadow-sm">
              {message}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Timestamp to Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Unix Timestamp (seconds)
              </label>
              <input
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none text-gray-800"
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(parseInt(e.target.value || "0", 10))}
              />
              <div className="p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                {showUTC ? dateFromTs.toUTCString() : dateFromTs.toLocaleString()}
              </div>
              <button
                onClick={() => copy(timestamp)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm shadow hover:bg-slate-800 transition"
              >
                Copy Timestamp
              </button>
            </div>

            {/* Date to Timestamp */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Date (ISO yyyy-mm-ddThh:mm:ss)
              </label>
              <input
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-slate-900 outline-none text-gray-800"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
              <div className="p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                Timestamp: {tsFromDate}
              </div>
              <button
                onClick={() => copy(tsFromDate)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm shadow hover:bg-slate-800 transition"
              >
                Copy Timestamp
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="h-4 w-4 accent-slate-900"
              />
              <span className="text-sm text-gray-700">Auto-update current time</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showUTC}
                onChange={(e) => setShowUTC(e.target.checked)}
                className="h-4 w-4 accent-slate-900"
              />
              <span className="text-sm text-gray-700">Show in UTC</span>
            </label>

            <button
              onClick={resetAll}
              className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm shadow hover:bg-red-600 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            About Unix Time Converter
          </h3>
          <p className="text-gray-700 mb-4">
            Unix time (or Epoch time) is the number of seconds that have passed
            since January 1, 1970 (UTC). It is widely used in programming,
            databases, and systems to represent date and time in a universal format.
          </p>

          {/* Features */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-yellow-500 mr-2">✨</span> Features
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Convert Unix timestamp to readable date</li>
              <li>Convert ISO date to Unix timestamp</li>
              <li>Auto-update current time option</li>
              <li>Toggle between UTC and Local Time</li>
              <li>Copy results with one click</li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
              <span className="text-orange-500 mr-2">📦</span> Use Cases
            </h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Developers debugging APIs</li>
              <li>Database time conversions</li>
              <li>Log analysis and event tracking</li>
              <li>System administrators monitoring servers</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
