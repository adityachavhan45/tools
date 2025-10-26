import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "Internet Speed Test Online - Free & Accurate Network Speed Checker with Latency",
  description:
    "Use this free Internet Speed Test online to instantly check your download, upload, and latency performance. Fast, accurate, and secure network speed checker for WiFi, broadband, mobile (4G/5G), and ethernet connections.",
  slug: "/internet-speed-test",
  focusKeyword: "Internet Speed Test Online",
  keywords: [
    "internet speed test",
    "internet speed test online",
    "speed test",
    "network speed test",
    "bandwidth test",
    "download speed test",
    "upload speed test",
    "latency test",
    "ping test",
    "connection speed test",
    "broadband speed test",
    "wifi speed test",
    "internet speed checker",
    "network performance test",
    "speed test tool",
    "free speed test",
    "accurate speed test",
    "internet connection test",
    "network diagnostics",
    "internet speed analysis",
    "internet speed comparison",
    "mobile speed test",
    "4g speed test",
    "5g speed test",
    "fiber speed test",
    "dsl speed test",
    "cable speed test",
    "network speed monitor",
    "bandwidth checker",
    "connection speed optimization",
    "network troubleshooting",
    "internet performance test",
    "broadband test",
    "network analyzer",
    "speed test app online",
    "wifi analyzer",
    "internet speed improvement",
    "ping latency test",
    "real-time speed test",
    "instant network test",
    "speed test results",
    "upload and download test",
    "internet quality check",
    "internet speed meter",
    "web speed test",
    "speed checker online",
    "fast speed test",
    "network stability test",
    "internet diagnostics",
    "accurate connection test",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Internet Speed Test with Latency",
            description:
              "Free online tool to test your internet connection speed. Measure download speed, upload speed, and latency with accurate results, performance ratings, and detailed insights in seconds.",
            slug: "/internet-speed-test",
            category: "Network Tools",
          }),
          buildHowToJsonLd({
            name: "How to Test Your Internet Speed",
            description:
              "Step-by-step guide to accurately test your internet connection speed and understand the results.",
            steps: [
              {
                name: "Close Other Applications",
                text: "Close all applications and devices that might be using your internet connection for the most accurate results.",
              },
              {
                name: "Click Start Speed Test",
                text: "Click the 'Start Speed Test' button to begin measuring your internet connection speed.",
              },
              {
                name: "Wait for Test Completion",
                text: "The test will automatically measure latency first, then download speed, and finally upload speed. This usually takes 30-60 seconds.",
              },
              {
                name: "Review Your Results",
                text: "Check your download speed, upload speed, and latency results with performance ratings, detailed insights, and speed guidelines for different activities.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "How accurate is this internet speed test?",
              answer:
                "Our speed test is highly accurate and uses multiple test servers and file sizes to provide reliable results. It measures latency, download speed, and upload speed with performance ratings. For best accuracy, close other applications and connect via ethernet if possible.",
            },
            {
              question: "Is the internet speed test really free?",
              answer:
                "Yes, completely free forever! No registration required, no hidden fees, and no ads during testing. All testing happens securely in your browser for complete privacy.",
            },
            {
              question: "What internet speeds do I need for different activities?",
              answer:
                "Basic browsing: 1-5 Mbps, HD streaming: 5-25 Mbps, 4K streaming: 25-50 Mbps, and gaming or remote work: 50+ Mbps. Higher speeds support multiple devices efficiently.",
            },
            {
              question: "Why is my internet speed slower than advertised?",
              answer:
                "Speeds may vary due to network congestion, WiFi interference, device limits, or multiple devices using the same connection. Try testing at different times and use ethernet for best results.",
            },
            {
              question: "How often should I test my internet speed?",
              answer:
                "Test your speed monthly or whenever you notice slow connections, change plans, or troubleshoot performance. Multiple tests help identify consistency and average speeds.",
            },
            {
              question: "What's the difference between download and upload speed?",
              answer:
                "Download speed affects streaming, browsing, and file downloads. Upload speed affects video calls, file uploads, and cloud backups. Typically, download speeds are higher than upload speeds.",
            },
            {
              question: "What is latency and why does it matter?",
              answer:
                "Latency (ping) measures the time data takes to travel from your device to a server and back. Low latency (under 50ms) ensures smoother gaming, video calls, and real-time interactions.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
