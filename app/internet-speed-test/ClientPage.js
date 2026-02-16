"use client";

import { useState, useRef, useEffect } from "react";
import ToolSection from "../components/ToolSection";

export default function InternetSpeedTestPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [speed, setSpeed] = useState(0);
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(null);

  const toMbps = (bps) => {
    const s = Number(bps);
    if (!Number.isFinite(s) || s <= 0) return 0;
    return s / 1000000;
  };

  const formatSpeedValue = (bps) => Math.max(0, Math.round(toMbps(bps)));
  const formatSpeed = (bps) => `${formatSpeedValue(bps)} Mbps`;
  const formatLatency = (latency) => {
    const v = Number(latency);
    if (!Number.isFinite(v) || v <= 0) return 0;
    return Math.round(v);
  };

  useEffect(() => {
    if (!isRunning) return;
    const t = setInterval(() => {
      setDisplaySpeed((prev) => prev + (speed - prev) * 0.1);
    }, 100);
    return () => clearInterval(t);
  }, [speed, isRunning]);

  const measureLatency = async () => {
    const tests = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch("https://www.google.com/favicon.ico?cache=" + Math.random(), {
          method: "HEAD",
          mode: "no-cors",
          signal: abortRef.current?.signal,
        });
        tests.push(performance.now() - start);
      } catch {
        tests.push(50);
      }
      setProgress(10 + i * 5);
    }
    return tests.reduce((a, b) => a + b, 0) / tests.length;
  };

  const measureDownload = async () => {
    const testSize = 10000000;
    const url = `https://speed.cloudflare.com/__down?bytes=${testSize}`;
    try {
      const start = performance.now();
      let loaded = 0;
      const res = await fetch(url + "&cache=" + Math.random(), {
        signal: abortRef.current?.signal,
        mode: "cors",
      });
      if (!res.ok) throw new Error("Network error");
      const reader = res.body.getReader();
      let maxSpeed = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        loaded += value.length;
        const now = performance.now();
        const duration = (now - start) / 1000;
        if (duration > 0.5) {
          const current = (loaded * 8) / duration;
          setSpeed(current);
          maxSpeed = Math.max(maxSpeed, current);
        }
        setProgress(35 + (loaded / testSize) * 30);
      }
      const end = performance.now();
      const totalDuration = (end - start) / 1000;
      const finalSpeed = (loaded * 8) / totalDuration;
      setSpeed(finalSpeed);
      setDisplaySpeed(finalSpeed);
      return Math.max(maxSpeed, finalSpeed);
    } catch {
      return 0;
    }
  };

  const measureUpload = async () => {
    const testSize = 2000000;
    const data = new Blob([new Uint8Array(testSize)]);
    try {
      const start = performance.now();
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: data,
        mode: "cors",
        headers: { "Content-Type": "application/octet-stream" },
        signal: abortRef.current?.signal,
      });
      if (!response.ok) throw new Error("Upload failed");
      const duration = (performance.now() - start) / 1000;
      setProgress(95);
      return (data.size * 8) / duration;
    } catch {
      return 0;
    }
  };

  const runTest = async () => {
    abortRef.current = new AbortController();
    setIsRunning(true);
    setResult(null);
    setSpeed(0);
    setDisplaySpeed(0);
    setProgress(0);
    setPhase("Measuring latency…");
    try {
      const latency = await measureLatency();
      setPhase("Testing download and upload…");
      setProgress(35);
      const [down, up] = await Promise.all([measureDownload(), measureUpload()]);
      setPhase("Complete.");
      setProgress(100);
      setResult({
        download: down && down > 0 ? down : 0,
        upload: up && up > 0 ? up : 0,
        latency: latency && latency > 0 ? latency : 0,
        time: new Date().toLocaleTimeString(),
      });
    } catch {
      setPhase("Test failed. Please try again.");
    } finally {
      setIsRunning(false);
      setTimeout(() => {
        setProgress(0);
        setSpeed(0);
        setDisplaySpeed(0);
      }, 2000);
    }
  };

  const stopTest = () => {
    abortRef.current?.abort();
    setIsRunning(false);
    setPhase("Stopped.");
    setSpeed(0);
    setDisplaySpeed(0);
    setProgress(0);
  };

  const getRating = (downloadBps) => {
    const mbps = toMbps(downloadBps);
    if (mbps >= 100) return { rating: "Excellent", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (mbps >= 50) return { rating: "Very good", color: "text-teal-600", bg: "bg-teal-100" };
    if (mbps >= 25) return { rating: "Good", color: "text-sky-600", bg: "bg-sky-100" };
    if (mbps >= 10) return { rating: "Fair", color: "text-amber-600", bg: "bg-amber-100" };
    return { rating: "Below average", color: "text-slate-600", bg: "bg-slate-100" };
  };

  const MAX_GAUGE_MBPS = 500;
  const activeSpeed = isRunning ? displaySpeed : result?.download ?? 0;
  const activeMbps = toMbps(activeSpeed);
  const gaugePercent = Math.min((activeMbps / MAX_GAUGE_MBPS) * 100, 100);
  const gaugeSpan = 180;
  const angle = 180 - (gaugePercent / 100) * gaugeSpan;
  const radians = (angle * Math.PI) / 180;
  const radius = 90;
  const cursorX = 100 + radius * Math.cos(radians);
  const cursorY = 100 - radius * Math.sin(radians);

  return (
    <ToolSection
      title="Free Internet Speed Test"
      subtitle="Check download speed, upload speed, and latency in your browser. No app required works on Wi‑Fi, ethernet, and mobile."
      plain
      plainSidebar
      whiteBackground
    >
      <div className="space-y-6">
        {/* Gauge card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 text-center">
          <div className="relative w-64 h-32 sm:w-80 sm:h-40 mx-auto">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
              <path
                d="M10 100 A90 90 0 0 1 190 100"
                stroke="#e2e8f0"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M10 100 A90 90 0 0 1 190 100"
                stroke="url(#speedGrad)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (gaugePercent / 100) * 283}
                style={{ transition: "stroke-dashoffset 0.25s ease-out" }}
              />
              <circle cx="10" cy="100" r="7" fill="#fff" />
              <circle
                cx={cursorX}
                cy={cursorY}
                r="6"
                fill="#0d9488"
                className="drop-shadow-[0_0_8px_#0d9488]"
              />
              <defs>
                <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5eead4" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 text-center">
              <span className="text-4xl sm:text-5xl font-bold text-teal-700">
                {isRunning
                  ? formatSpeedValue(displaySpeed)
                  : result
                    ? formatSpeedValue(result.download)
                    : "0"}
              </span>
              <span className="text-slate-500 text-sm ml-1">Mbps</span>
            </div>
          </div>

          <p className="mt-10 text-slate-600 text-sm">{phase}</p>

          <div className="mt-6">
            {!isRunning ? (
              <button
                onClick={runTest}
                className="px-8 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition"
              >
                Start speed test
              </button>
            ) : (
              <button
                onClick={stopTest}
                className="px-8 py-3 rounded-xl bg-rose-500 text-white font-medium shadow-md hover:bg-rose-600 transition"
              >
                Stop test
              </button>
            )}
          </div>
        </div>

        {!isRunning && !result && (
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 text-left">
            <p className="font-semibold text-teal-900 text-sm mb-2">Tips for accurate results</p>
            <ul className="text-sm text-teal-800 space-y-1 list-disc list-inside">
              <li>Close other apps and devices using the same connection</li>
              <li>Use an ethernet cable when possible for a stable reading</li>
              <li>Run the test a few times at different times of day</li>
              <li>Keep the connection steady until the test finishes</li>
            </ul>
          </div>
        )}

        {result && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-wider text-white/80 font-medium">Download</p>
                  <p className="mt-1 text-3xl font-bold">{formatSpeed(result.download)}</p>
                </div>
                <span className="rounded-full border border-white/40 bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  {getRating(result.download).rating}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/80">
                Upload {formatSpeed(result.upload)} · Latency {formatLatency(result.latency)} ms
              </p>
              <p className="mt-2 text-xs text-white/60">Completed at {result.time}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Download</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatSpeed(result.download)}</p>
                <p className="mt-1 text-xs text-slate-600">Streaming, browsing, downloads</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Upload</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatSpeed(result.upload)}</p>
                <p className="mt-1 text-xs text-slate-600">Video calls, file sharing</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Latency</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatLatency(result.latency)} ms</p>
                <p className="mt-1 text-xs text-slate-600">Response time (ping)</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-800 mb-2">Rough guide by activity</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-justify">
                <li>Browsing and email: about 5 Mbps</li>
                <li>HD video streaming: 10–25 Mbps</li>
                <li>4K streaming: 25+ Mbps</li>
                <li>Gaming or remote work: 50+ Mbps</li>
              </ul>
            </div>

            <button
              onClick={runTest}
              className="w-full py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition"
            >
              Run test again
            </button>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
      <section className="mt-12 sm:mt-14 p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
          About This Internet Speed Test
        </h2>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          An internet speed test is a tool that measures how fast data travels between your device and the internet. It typically reports download speed (how quickly you receive data), upload speed (how quickly you send data), and latency or ping (the delay between your device and a server). This speed test runs in your browser: you click start, and the tool downloads and uploads a small amount of data to measure your connection. No app or account is required, and the test works over Wi‑Fi, ethernet, or mobile data. Results are shown in megabits per second (Mbps), which is the standard unit used by internet providers and streaming services. Understanding your actual speed helps you see if your connection matches what you pay for and whether it is enough for video calls, streaming, or gaming.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Download and Upload Speed Mean</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Download speed is the rate at which data is delivered to your device from the internet. It affects loading web pages, streaming video, downloading files, and using most apps. Upload speed is the rate at which data is sent from your device to the internet. It matters for video calls, posting photos or videos, cloud backups, and sending large emails. Many home connections have a higher download speed than upload speed; for example a plan might offer 100 Mbps down and 20 Mbps up. This speed test measures both. The results are in Mbps (megabits per second). A higher number means a faster connection. Keep in mind that one device or application can use only a portion of the total bandwidth, so when several people or devices use the connection at once, each may see lower effective speeds.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Latency (Ping) Means</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Latency, often called ping, is the time in milliseconds (ms) for a small packet of data to go from your device to a server and back. It reflects how responsive your connection feels rather than how much data it can carry. Low latency is important for real-time activities: online gaming, video calls, and live streaming all benefit from a low ping. High latency can cause lag, delays in conversation, or buffering. This test measures latency by sending several quick requests and averaging the round-trip time. A result under about 50 ms is generally good for most uses; under 20 ms is very good for gaming or video calls. Latency can vary with distance to the server, network congestion, and the type of connection (fibre and cable often have lower latency than some wireless or mobile links).
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">How This Speed Test Works</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          When you start the test, the tool first measures latency by sending several lightweight requests to a server and recording how long each round trip takes. Then it runs the download and upload tests. For download, it requests a chunk of data from a test server and measures how many bits per second are received over a short period. For upload, it sends a chunk of data to a server and measures how many bits per second are transmitted. The speeds are calculated from the amount of data and the time taken, and the results are shown in Mbps. The test runs in your browser using standard web APIs; no software is installed and no data is stored on our side. Your results depend on your connection, the path to the test servers, and what else is using your network at that moment. Running the test a few times at different times of day can give you a better idea of your typical performance.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Getting Accurate Results</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          For the most accurate reading, close other applications and tabs that use the internet, and avoid starting large downloads or streams during the test. If you are on Wi‑Fi, being close to the router helps; for the most stable result, use an ethernet cable if you can. Run the test when fewer people or devices are using the same connection. Some routers or security software can limit or prioritise traffic, so results can vary. Running the test multiple times and at different times (for example morning and evening) helps you see whether your speed is consistent or affected by peak usage. Remember that the test measures the speed between your device and the test server; actual speeds to other sites or services may differ because they use different routes and servers.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Why Your Speed Might Differ From Your Plan</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Internet providers often advertise speeds as “up to” a certain number, meaning the maximum possible under ideal conditions. Real-world speed can be lower because of network congestion, the quality of your wiring or Wi‑Fi, the number of devices sharing the connection, and the servers or sites you are connecting to. Wi‑Fi is shared and can be affected by walls, distance, and other networks nearby. Ethernet usually gives a more stable and often higher speed. If you consistently see much lower speeds than your plan, it is worth checking with your provider, restarting your router, or testing with a wired connection to rule out Wi‑Fi issues. This speed test gives you a snapshot of performance at the time you run it; it is a useful tool for troubleshooting and for checking whether your connection is in the right ballpark for your needs.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">What Speed You Need for Common Activities</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          Basic web browsing and email usually need only a few Mbps. Standard-definition video streaming might use around 3–5 Mbps; HD streaming often needs 5–25 Mbps depending on the service and quality. 4K streaming typically needs 25 Mbps or more. Video calls can use about 2–5 Mbps for standard quality and more for HD or group calls. Online gaming often depends more on low latency than on raw speed, but having at least 10–25 Mbps download and a stable connection helps. Working from home with video calls, cloud apps, and file sync often works well with 25–50 Mbps or more, especially if several people use the connection. These are rough guidelines; actual requirements vary by service and number of simultaneous users. This tool’s result page includes a short guide so you can compare your speed to typical needs.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Use Cases for a Speed Test</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          People run speed tests when they sign up for a new plan to check that they are getting what they pay for, or when they notice slow browsing, buffering, or lag. It is useful after changing router or modem settings, moving to a new place, or upgrading to a higher tier. Support staff often ask for speed test results when troubleshooting connection issues. Small businesses and home workers use it to confirm that their connection is adequate for video meetings and cloud tools. Gamers and streamers use it to see if their latency and bandwidth are sufficient. Running a test before and after using a VPN can show how much the VPN affects speed. Because this test runs in the browser, you can use it on a phone, tablet, or computer without installing anything, which makes it easy to compare speeds across devices or locations.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Privacy and How the Test Uses the Network</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          This speed test sends and receives data to and from test servers to measure your connection. The data used for the test is generic (for example random bytes for upload and download); no personal files or browsing history are sent. The test does not require an account or login, and results are not stored on our servers; they are only shown in your browser. Your internet provider can see that your device is transferring data, as with any other website or app, but the test itself does not collect or share your personal information. If you use a VPN or proxy, the test will measure the speed through that connection, which may be slower than your direct connection. For a reading that reflects your normal connection to the internet, run the test without a VPN unless you are specifically checking VPN performance.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Limitations of Browser-Based Speed Tests</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
          A browser speed test is a practical way to get a quick idea of your connection, but it has limits. Results depend on the test server’s location and load; a server that is far away or busy may show lower speeds. The test runs over a short period, so it captures a snapshot rather than your average speed over hours or days. Very fast connections (for example gigabit fibre) may not reach their full potential in a short browser test because of browser and system limits. Mobile browsers and background processes can also affect results. For formal verification of your plan (for example when disputing a bill), your provider may require their own test or a specific tool. For most users, this test is enough to see whether their speed is in the right range for everyday use and to spot obvious problems.
        </p>

        <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">Conclusion</h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
          An internet speed test helps you understand how fast your connection is for downloading, uploading, and responding. This free tool runs in your browser and reports download speed, upload speed, and latency in a few seconds. Use it to check that your connection meets your needs, to troubleshoot slowdowns, or to compare before and after changes to your network. For better accuracy, close other apps, use ethernet when possible, and run the test a few times. Your results are not stored; they are only displayed in your browser. Whether you are on Wi‑Fi, ethernet, or mobile data, this speed test gives you a clear snapshot of your current performance.
        </p>
      </section>
    </ToolSection>
  );
}
