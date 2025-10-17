import ClientPage from "./ClientPage";
import { buildMetadata, buildToolJsonLd, buildHowToJsonLd, buildFaqJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title: "Internet Speed Test - Free Online Network Speed Checker with Latency",
  description:
    "Test your internet speed for free! Measure download speed, upload speed, and latency with our accurate online speed test tool. Get instant results with performance ratings and detailed insights.",
  slug: "/internet-speed-test",
  keywords:
    "internet speed test, speed test, network speed test, bandwidth test, download speed test, upload speed test, latency test, ping test, connection speed, broadband speed test, wifi speed test, internet speed checker, network performance test, speed test online, free speed test, fast speed test, accurate speed test, internet connection test, network speed checker, bandwidth checker, internet speed meter, speed test tool, connection speed test, network diagnostics, internet performance test, speed measurement, broadband test, fiber speed test, dsl speed test, cable speed test, mobile speed test, 4g speed test, 5g speed test, wifi analyzer, network analyzer, internet speed monitor, speed test app, online speed test, web speed test, speed test website, internet speed tester, network speed tester, connection tester, bandwidth tester, speed checker online, internet speed analysis, network performance checker, speed test results, internet speed comparison, speed test history, network speed optimization, internet speed improvement, connection speed optimization, bandwidth optimization, network troubleshooting, internet diagnostics, speed test accuracy, reliable speed test, professional speed test"
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Internet Speed Test with Latency",
            description: "Free online tool to test your internet connection speed. Measure download speed, upload speed, and latency with accurate results, performance ratings, and detailed insights in seconds.",
            slug: "/internet-speed-test",
            category: "Network Tools"
          }),
          buildHowToJsonLd({
            name: "How to Test Your Internet Speed",
            description: "Step-by-step guide to accurately test your internet connection speed and understand the results",
            steps: [
              {
                name: "Close Other Applications",
                text: "Close all applications and devices that might be using your internet connection for the most accurate results."
              },
              {
                name: "Click Start Speed Test",
                text: "Click the 'Start Speed Test' button to begin measuring your internet connection speed."
              },
              {
                name: "Wait for Test Completion",
                text: "The test will automatically measure latency first, then download speed, and finally upload speed. This usually takes 30-60 seconds."
              },
              {
                name: "Review Your Results",
                text: "Check your download speed, upload speed, and latency results with performance ratings, detailed insights, and speed guidelines for different activities."
              }
            ]
          }),
          buildFaqJsonLd([
            {
              question: "How accurate is this internet speed test?",
              answer: "Our speed test is highly accurate and uses multiple test servers and file sizes to provide reliable results. It measures latency, download speed, and upload speed with performance ratings. For best accuracy, close other applications and connect via ethernet if possible."
            },
            {
              question: "Is the internet speed test really free?",
              answer: "Yes, completely free forever! No registration required, no hidden fees, no ads during testing. All testing happens in your browser for complete privacy."
            },
            {
              question: "What internet speeds do I need for different activities?",
              answer: "Basic browsing: 1-5 Mbps, HD video streaming: 5-25 Mbps, 4K video streaming: 25-50 Mbps, Gaming and remote work: 50+ Mbps. Higher speeds provide better performance for multiple devices."
            },
            {
              question: "Why is my internet speed slower than advertised?",
              answer: "Internet speeds can vary due to network congestion, WiFi interference, device limitations, or multiple devices using the connection. Test at different times and consider using ethernet for best results."
            },
            {
              question: "How often should I test my internet speed?",
              answer: "Test your speed monthly to monitor performance, when experiencing slow connections, after changing internet plans, or when troubleshooting network issues. Multiple tests provide better insights."
            },
            {
              question: "What's the difference between download and upload speed?",
              answer: "Download speed affects streaming, browsing, and downloading files. Upload speed affects video calls, file uploads, and cloud backups. Most activities require higher download speeds than upload speeds."
            },
            {
              question: "What is latency and why does it matter?",
              answer: "Latency (ping) is the time it takes for data to travel from your device to a server and back, measured in milliseconds. Lower latency is crucial for gaming, video calls, and real-time applications. Good latency is under 50ms, acceptable is 50-100ms."
            }
          ])
        ]}
      />
      <ClientPage />
    </>
  );
}
