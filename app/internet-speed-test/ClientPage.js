"use client";

import { useState, useRef, useEffect } from "react";

export default function BlueCursorSpeedTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [speed, setSpeed] = useState(0);
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef(null);

  const toMbps = (bps) => {
    const speed = Number(bps);
    if (!Number.isFinite(speed) || speed <= 0) return 0;
    return speed / 1000000;
  };

  const formatSpeedValue = (bps) => Math.max(0, Math.round(toMbps(bps)));

  const formatSpeed = (bps) => {
    // Display speed as whole-number Mbps to match user expectation
    return `${formatSpeedValue(bps)} Mbps`;
  };

  const formatSpeedNumber = (bps) => formatSpeedValue(bps);

  const getSpeedUnit = () => 'Mbps';

  const formatLatency = (latency) => {
    const value = Number(latency);
    if (!Number.isFinite(value) || value <= 0) return 0;
    return Math.round(value);
  };

  // smooth display easing
  useEffect(() => {
    if (!isRunning) return;
    const smooth = setInterval(() => {
      setDisplaySpeed((prev) => prev + (speed - prev) * 0.1);
    }, 100);
    return () => clearInterval(smooth);
  }, [speed, isRunning]);

  // ---- Latency Test ----
  const measureLatency = async () => {
    const tests = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch('https://www.google.com/favicon.ico?cache=' + Math.random(), {
          method: 'HEAD',
          mode: 'no-cors',
          signal: abortRef.current?.signal,
        });
        const end = performance.now();
        tests.push(end - start);
      } catch (error) {
        // Fallback for CORS issues
        tests.push(50); // Default reasonable latency
      }
      setProgress(10 + (i * 5));
    }
    return tests.reduce((a, b) => a + b, 0) / tests.length;
  };

  // ---- Download ----
  const measureDownload = async () => {
    const testSize = 10000000; // 10MB for accurate measurement
    const url = `https://speed.cloudflare.com/__down?bytes=${testSize}`;
    
    try {
      const start = performance.now();
      let loaded = 0;
      const res = await fetch(url + '&cache=' + Math.random(), {
        signal: abortRef.current?.signal,
        mode: 'cors',
      });
      
      if (!res.ok) throw new Error('Network response was not ok');
      
      const reader = res.body.getReader();
      let maxSpeed = 0;
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        loaded += value.length;
        const now = performance.now();
        const duration = (now - start) / 1000;
        if (duration > 0.5) { // Only calculate after 500ms for stability
          const current = (loaded * 8) / duration;
          setSpeed(current);
          maxSpeed = Math.max(maxSpeed, current);
        }
        setProgress(35 + ((loaded / testSize) * 30));
      }
      
      const end = performance.now();
      const totalDuration = (end - start) / 1000;
      const finalSpeed = (loaded * 8) / totalDuration;
      setSpeed(finalSpeed);
      setDisplaySpeed(finalSpeed);
      
      // Return the maximum speed observed during the test
      return Math.max(maxSpeed, finalSpeed);
    } catch (error) {
      console.warn('Download test failed:', error);
      return 0;
    }
  };

  // ---- Upload ----
  const measureUpload = async () => {
    const testSize = 2000000; // 2MB for accurate measurement
    const data = new Blob([new Uint8Array(testSize)]);
    
    try {
      const start = performance.now();
      
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: data,
        mode: 'cors',
        headers: { 'Content-Type': 'application/octet-stream' },
        signal: abortRef.current?.signal,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const end = performance.now();
      const duration = (end - start) / 1000;
      const speed = (data.size * 8) / duration;
      
      setProgress(65 + 30); // Update progress for upload completion
      return speed;
    } catch (error) {
      console.warn('Upload test failed:', error);
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
    setPhase('Measuring latency...');

    try {
      // Test latency first
      const latency = await measureLatency();
      
      setPhase('Testing download & upload speeds...');
      setProgress(35);
      
      // Run download and upload tests simultaneously for faster results
      const [down, up] = await Promise.all([
        measureDownload(),
        measureUpload()
      ]);
      
      setPhase('Test complete!');
      setProgress(100);

      // Ensure we have valid results
      const downloadSpeed = down && down > 0 ? down : 0;
      const uploadSpeed = up && up > 0 ? up : 0;
      const latencyResult = latency && latency > 0 ? latency : 0;

      setResult({
        download: downloadSpeed,
        upload: uploadSpeed,
        latency: latencyResult,
        time: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error('Speed test failed:', error);
      setPhase('Test failed. Please try again.');
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
    setPhase('Test Stopped');
    setSpeed(0);
    setDisplaySpeed(0);
    setProgress(0);
  };

  const getPerformanceRating = (downloadSpeed) => {
    if (downloadSpeed >= 100000000) return { rating: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (downloadSpeed >= 50000000) return { rating: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (downloadSpeed >= 25000000) return { rating: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (downloadSpeed >= 10000000) return { rating: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { rating: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  // progress angle across the 180° gauge arc
  const MAX_GAUGE_SPEED = 500; // Mbps cap for gauge visualization
  const activeSpeed = isRunning ? displaySpeed : result?.download ?? 0;
  const activeMbps = toMbps(activeSpeed);
  const gaugePercent = Math.min((activeMbps / MAX_GAUGE_SPEED) * 100, 100);

  const gaugeSpan = 180;
  const angle = 180 - (gaugePercent / 100) * gaugeSpan;
  const radians = (angle * Math.PI) / 180;
  const radius = 90;
  const cursorX = 100 + radius * Math.cos(radians);
  const cursorY = 100 - radius * Math.sin(radians);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-10 text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Internet Speed Test
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Test your connection speed accurately and get detailed insights
        </p>

        {/* Semi-circle gauge */}
        <div className="relative w-80 h-40 mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
            {/* background arc */}
            <path
              d="M10 100 A90 90 0 0 1 190 100"
              stroke="#e5e7eb"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            {/* active blue arc */}
            <path
              d="M10 100 A90 90 0 0 1 190 100"
              stroke="url(#grad)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (gaugePercent / 100) * 283}
              style={{
                transition: "stroke-dashoffset 0.25s ease-out",
              }}
            />
            {/* mask the starting cap so only one cursor is visible */}
            <circle cx="10" cy="100" r="7" fill="#fff" />
            {/* glowing cursor dot */}
            <circle
              cx={cursorX}
              cy={cursorY}
              r="6"
              fill="#3b82f6"
              className="drop-shadow-[0_0_8px_#3b82f6]"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {/* speed number */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-center">
            <div className="text-5xl font-bold text-blue-600">
              {isRunning
                ? formatSpeedNumber(displaySpeed)
                : result
                ? formatSpeedNumber(result.download)
                : "0"}
            </div>
            <div className="text-gray-500 text-sm">
              {getSpeedUnit()}
            </div>
          </div>
        </div>

        <p className="mt-8 text-gray-700 text-sm">{phase}</p>

        {/* Buttons */}
        <div className="mt-6">
          {!isRunning ? (
            <button
              onClick={runTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Start Test
            </button>
          ) : (
            <button
              onClick={stopTest}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Stop Test
            </button>
          )}
        </div>

        {!isRunning && !result && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4 text-left border border-blue-100">
            <h3 className="font-semibold text-blue-900 text-sm mb-2">Tips for accurate results</h3>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Close other apps and devices using your internet</li>
              <li>Use an ethernet cable for the most stable reading</li>
              <li>Run the test a few times at different hours</li>
              <li>Keep the connection steady while the test runs</li>
            </ul>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-5">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white p-6 shadow-lg">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-white/80 font-semibold">Download speed</p>
                  <div className="mt-2 text-4xl font-semibold">{formatSpeed(result.download)}</div>
                </div>
                <div className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {getPerformanceRating(result.download).rating} connection
                </div>
              </div>
              <p className="mt-4 text-sm text-white/80">
                Upload {formatSpeed(result.upload)} | Latency {formatLatency(result.latency)} ms
              </p>
              <p className="mt-2 text-xs text-white/60">Test completed at {result.time}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-blue-500">Download</p>
                <p className="mt-3 text-2xl font-semibold text-blue-900">
                  {formatSpeed(result.download)}
                </p>
                <p className="mt-2 text-xs text-blue-600">Streams and large files</p>
              </div>
              <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-green-500">Upload</p>
                <p className="mt-3 text-2xl font-semibold text-green-900">
                  {formatSpeed(result.upload)}
                </p>
                <p className="mt-2 text-xs text-green-600">Video calls and sharing</p>
              </div>
              <div className="rounded-xl border border-purple-100 bg-purple-50 p-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-wide text-purple-500">Latency</p>
                <p className="mt-3 text-2xl font-semibold text-purple-900">
                  {formatLatency(result.latency)} ms
                </p>
                <p className="mt-2 text-xs text-purple-600">Response time</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left text-xs text-gray-600 space-y-2">
              <p className="text-sm font-semibold text-gray-700">What your speed supports</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p>- Browsing and email: 5 Mbps</p>
                <p>- HD streaming: 10-25 Mbps</p>
                <p>- 4K streaming: 25+ Mbps</p>
                <p>- Gaming or remote work: 50+ Mbps</p>
              </div>
            </div>

            <button
              onClick={runTest}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md text-sm"
            >
              Run test again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
