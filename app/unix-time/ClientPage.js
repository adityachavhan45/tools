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
                onChange={(e) =>
                  setTimestamp(parseInt(e.target.value || "0", 10))
                }
              />
              <div className="p-3 border rounded-lg bg-gray-50 text-sm text-gray-700">
                {showUTC
                  ? dateFromTs.toUTCString()
                  : dateFromTs.toLocaleString()}
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
              <span className="text-sm text-gray-700">
                Auto-update current time
              </span>
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

        {/* Expanded Info Section */}
        <section className="mt-10 bg-white border rounded-2xl shadow p-6 prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-800">
          <h3 className="text-xl font-bold mb-4">About Unix Time Converter</h3>
          <p>
            Unix time, also known as Epoch time or POSIX time, is a way to
            represent a point in time as the number of seconds that have passed
            since <strong>January 1, 1970, 00:00:00 UTC</strong>. It has become
            the universal standard in computing for storing and comparing time.
            This tool allows you to convert Unix timestamps to
            human-readable dates and vice versa, making it useful for developers,
            system administrators, students, and anyone who deals with time data.
          </p>

          <h4 className="mt-6 font-semibold">✨ Key Features</h4>
          <ul>
            <li>Convert Unix timestamp to readable date instantly</li>
            <li>Convert ISO date to Unix timestamp</li>
            <li>Toggle between UTC and local time zones</li>
            <li>Enable auto-update for real-time clock</li>
            <li>Copy results with one click</li>
          </ul>

          <h4 className="mt-6 font-semibold">📖 Why January 1, 1970?</h4>
          <p>
            The choice of January 1, 1970, as the epoch start is historical. It
            was adopted during the development of Unix operating systems in the
            late 1960s. By using a fixed starting point, computers can represent
            time as a simple integer value, which is easy to store and compare.
          </p>

          <h4 className="mt-6 font-semibold">⏳ Seconds vs Milliseconds</h4>
          <p>
            By default, Unix time is measured in seconds. However, many modern
            systems and programming languages also represent time in{" "}
            <strong>milliseconds</strong>. For example:
          </p>
          <ul>
            <li>JavaScript’s <code>Date.now()</code> returns milliseconds</li>
            <li>Python’s <code>time.time()</code> returns seconds</li>
            <li>Java’s <code>System.currentTimeMillis()</code> returns milliseconds</li>
          </ul>

          <h4 className="mt-6 font-semibold">💻 Programming Examples</h4>
          <pre>
{`// JavaScript
console.log(Math.floor(Date.now() / 1000)); // Current Unix timestamp

# Python
import time
print(int(time.time()))

// PHP
echo time();`}
          </pre>

          <h4 className="mt-6 font-semibold">📦 Real-World Use Cases</h4>
          <ul>
            <li>API request logging and event tracking</li>
            <li>Database storage for date/time values</li>
            <li>Blockchain transaction timestamps</li>
            <li>IoT device synchronization</li>
            <li>Scheduling jobs and cron tasks</li>
          </ul>

          <h4 className="mt-6 font-semibold">🔧 How to Use This Tool</h4>
          <ol>
            <li>Enter a Unix timestamp to see its corresponding date</li>
            <li>Or input a date in ISO format to generate its timestamp</li>
            <li>Toggle between UTC and local time to suit your needs</li>
            <li>Use auto-update to keep track of current time</li>
            <li>Copy results instantly for development or reporting</li>
          </ol>

          <h4 className="mt-6 font-semibold">❓ Frequently Asked Questions</h4>
          <p><strong>Q1: What happens in 2038?</strong></p>
          <p>
            The Year 2038 Problem affects systems that store time as a 32-bit
            signed integer. On January 19, 2038, the value will overflow. Modern
            64-bit systems are safe from this issue.
          </p>
          <p><strong>Q2: Is Unix time always in UTC?</strong></p>
          <p>
            Yes, Unix time is always counted in UTC. You can convert it to local
            time depending on your region or system settings.
          </p>
          <p><strong>Q3: How accurate is Unix time?</strong></p>
          <p>
            Unix time is precise to the second by default, but extensions using
            milliseconds or nanoseconds are supported in many systems.
          </p>

          <h4 className="mt-6 font-semibold">🌍 Why Use an Online Converter?</h4>
          <p>
            While programming languages can convert Unix timestamps, online tools
            provide quick, no-code access. Developers debugging APIs, analysts
            parsing logs, and students learning about time representation can all
            benefit from an instant converter like this one.
          </p>

          <h4 className="mt-6 font-semibold">📌 Conclusion</h4>
          <p>
            Unix time is the backbone of modern computing when it comes to
            timestamps. From databases and APIs to everyday logging systems,
            it ensures universal synchronization. With this tool, you can
            effortlessly convert between Unix timestamps and readable dates,
            explore time zones, and understand how computers perceive time.
          </p>
        </section>
      </div>
    </main>
  );
}
