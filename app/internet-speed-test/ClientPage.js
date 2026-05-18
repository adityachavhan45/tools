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
      whiteBackground
      hideSidebar
      centerHeader
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-white to-cyan-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-700">
            Internet Speed Test Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Measure download, upload, and ping with real-time speed gauge.
          </p>
        </div>

        {/* Gauge card */}
        <div className="bg-white border border-violet-200 rounded-2xl shadow-sm p-6 sm:p-8 text-center">
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
                fill="#2563eb"
                className="drop-shadow-[0_0_8px_#2563eb]"
              />
              <defs>
                <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 text-center">
              <span className="text-4xl sm:text-5xl font-bold text-blue-700">
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
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-left">
            <p className="font-semibold text-amber-900 text-sm mb-2">Tips for accurate results</p>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
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
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-blue-700">Download</p>
                <p className="mt-2 text-2xl font-semibold text-blue-900">{formatSpeed(result.download)}</p>
                <p className="mt-1 text-xs text-slate-600">Streaming, browsing, downloads</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-emerald-700">Upload</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-900">{formatSpeed(result.upload)}</p>
                <p className="mt-1 text-xs text-slate-600">Video calls, file sharing</p>
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-rose-700">Latency</p>
                <p className="mt-2 text-2xl font-semibold text-rose-900">{formatLatency(result.latency)} ms</p>
                <p className="mt-1 text-xs text-slate-600">Response time (ping)</p>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800">
              <p className="font-semibold text-indigo-900 mb-2">Rough guide by activity</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-justify">
                <li>Browsing and email: about 5 Mbps</li>
                <li>HD video streaming: 10–25 Mbps</li>
                <li>4K streaming: 25+ Mbps</li>
                <li>Gaming or remote work: 50+ Mbps</li>
              </ul>
            </div>

            <button
              onClick={runTest}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Run test again
            </button>
          </div>
        )}
      </div>

      {/* Info section – 1000+ words, unique, text-justify */}
     <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Check Real Internet Performance for Streaming, Gaming, and Daily Browsing
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Internet speed has become one of the most important parts of modern digital life. From online classes and office meetings to streaming movies and competitive gaming, almost every online activity depends on connection quality. People often purchase high-speed internet plans expecting smooth performance everywhere, but real-world internet speed can vary depending on many different factors. That is why internet speed testing tools have become extremely useful for everyday users.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This online internet speed test helps users measure how fast their connection performs in real time. Instead of relying only on the speed promised by the internet provider, users can instantly check actual download speed, upload speed, and network responsiveness directly from their browser. The tool works without software installation and can be used on desktops, laptops, tablets, and smartphones.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Internet Speed Matters More Than Ever
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Modern websites and applications consume significantly more internet bandwidth compared to earlier years. High-definition video streaming, cloud storage, online gaming, remote work tools, and social media platforms continuously transfer large amounts of data between users and servers. Slow internet connections can create buffering issues, video call interruptions, delayed uploads, and frustrating browsing experiences.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Faster internet connections help improve overall digital productivity. Websites load quickly, downloads finish faster, streaming quality improves, and multiplayer games become more responsive. However, internet performance depends not only on raw speed but also on network stability and latency.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many users also optimize heavy media files using{" "}
    <a
      href="https://convertixy.com/image-compressor"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Compressor
    </a>{" "}
    before uploading them online because smaller files upload much faster on slower internet connections.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Understanding Download Speed
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Download speed measures how quickly data travels from the internet to your device. This affects activities like opening websites, watching videos, downloading files, loading apps, and streaming music. A higher download speed generally creates a smoother online experience, especially when multiple devices are connected simultaneously.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users who regularly stream HD or 4K videos usually require stronger download speeds compared to people who mainly browse websites or check emails. Families with multiple connected devices also benefit from faster internet plans because bandwidth gets shared across phones, laptops, smart TVs, and gaming consoles.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Upload Speed Is Important
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Upload speed measures how quickly data moves from your device to the internet. This becomes important during activities like video conferencing, uploading files, sending emails with attachments, cloud backups, online streaming, and social media posting.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Content creators, freelancers, remote workers, and students often depend heavily on upload speed. Slow uploads can interrupt meetings, delay cloud synchronization, and increase waiting time while transferring large files. Many users reduce upload time by resizing or optimizing media before sharing online.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    For example, website owners often resize large visuals using{" "}
    <a
      href="https://convertixy.com/image-resizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Image Resizer
    </a>{" "}
    before uploading them to servers or content management systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    What Ping or Latency Actually Means
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Internet speed is not only about Mbps numbers. Latency, often called ping, measures how quickly your device communicates with online servers. Lower latency creates faster response times during online interactions. This becomes extremely important for competitive gaming, live streaming, video calls, and real-time applications.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    High latency can create delays, lag, audio interruptions, and poor responsiveness even when download speed looks strong. Gamers especially prefer low ping because every millisecond matters during multiplayer gameplay.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Common Reasons Internet Speed Becomes Slow
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Too many connected devices sharing the same network</li>
    <li>Weak WiFi signal due to distance or walls</li>
    <li>Background downloads and automatic updates</li>
    <li>Network congestion during peak hours</li>
    <li>Outdated routers or hardware limitations</li>
    <li>Internet provider service issues</li>
    <li>VPN usage reducing connection speed</li>
    <li>Heavy file uploads or cloud synchronization tasks</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Identifying these issues helps users improve network performance and reduce unnecessary slowdowns during important online activities.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How Browser-Based Speed Testing Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This internet speed test works directly through the browser using modern web technologies. The tool temporarily exchanges small amounts of data with test servers to calculate download speed, upload speed, and latency. Results are then displayed instantly in an easy-to-understand format.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since the process works inside the browser, users do not need to install applications or register accounts. The test can be performed quickly from almost any device connected to the internet.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Tips for Getting More Accurate Speed Test Results
  </h3>

  <ul className="list-disc pl-5 text-slate-700 text-sm sm:text-base leading-relaxed mb-4 space-y-2">
    <li>Close unnecessary apps and browser tabs before testing</li>
    <li>Pause large downloads and streaming activities</li>
    <li>Stay closer to the WiFi router for better signal strength</li>
    <li>Use ethernet connection whenever possible</li>
    <li>Run the test multiple times at different hours</li>
    <li>Disconnect unused devices from the network</li>
    <li>Restart the router if speeds remain unusually low</li>
  </ul>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    These practices help reduce temporary interference and provide more realistic internet performance measurements.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Internet Speed Needs for Different Activities
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Different online activities require different levels of internet performance. Basic browsing and email usage generally work fine with slower connections. HD streaming, online meetings, and cloud-based work need stronger bandwidth. Competitive gaming depends heavily on low latency and stable connectivity.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Households with multiple users often require higher internet plans because several devices may stream, download, upload, and browse simultaneously. As online services continue growing, internet quality becomes increasingly important for both personal and professional productivity.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Internet Speed Can Differ From Advertised Plans
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Internet providers usually advertise maximum possible speeds under ideal conditions. Real-world performance can vary due to network traffic, router quality, signal strength, connected devices, server location, and local infrastructure limitations.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Wireless connections are especially sensitive to environmental interference. Walls, floors, nearby networks, and electronic devices can all affect WiFi quality. Ethernet connections usually provide more stable and consistent performance compared to wireless networks.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Website owners and bloggers who depend heavily on online performance sometimes optimize visuals using{" "}
    <a
      href="https://convertixy.com/google-discover-image-optimizer"
      className="text-blue-600 hover:underline font-medium"
    >
      Google Discover Image Optimizer
    </a>{" "}
    to reduce loading delays and improve user experience across mobile devices.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy and Data Handling During Speed Tests
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This browser-based speed test does not require personal accounts or manual file uploads. The testing process only exchanges temporary test data required to calculate network performance. Personal images, documents, browsing history, and local device files are not transferred during the test.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since the results are generated directly inside the browser, users can quickly check connection quality without complicated setup processes or software installations.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Internet speed testing has become an essential part of modern digital troubleshooting and performance monitoring. Whether you are attending online classes, working remotely, streaming movies, uploading content, gaming competitively, or simply browsing websites, understanding your connection quality helps improve the overall online experience.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-4 text-justify">
    This free internet speed test provides a simple and accessible way to measure download speed, upload speed, and latency directly from your browser. With quick testing, device compatibility, easy usability, and real-time results, the tool helps users understand actual internet performance without requiring complicated software or technical knowledge.
  </p>
</section>
    </ToolSection>
  );
}
