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
    "Password Strength Checker Online - Free Secure Password Testing Tool",
  description:
    "Free Password Strength Checker online. Instantly test how strong and secure your password is with live analysis, score rating, and security tips. Perfect for personal data safety, developers, and online security experts.",
  slug: "/password-strength-checker",
  focusKeyword: "Password Strength Checker Online",
  keywords: [
    "password strength checker",
    "password security",
    "password checker",
    "password analysis",
    "password validation",
    "check password strength",
    "strong password checker",
    "secure password tool",
    "free password strength test",
    "online password analyzer",
    "password security checker",
    "best password strength tool",
    "password score checker",
    "password safety tool",
    "password quality checker",
    "validate password online",
    "password testing tool",
    "online security password checker",
    "password protection tool",
    "password strength meter",
    "password security test",
    "password audit tool",
    "check password security online",
    "password reliability tool",
    "cybersecurity password checker",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Password Strength Checker Online",
            description:
              "Free online tool to check password strength, analyze security, and get instant safety recommendations.",
            slug: "/password-strength-checker",
            category: "Security Tools",
          }),
          buildHowToJsonLd({
            name: "How to Check Your Password Strength Online",
            description:
              "Follow these steps to test your password strength and improve online security instantly.",
            steps: [
              {
                name: "Enter Your Password",
                text: "Type your password in the input box. The tool will analyze its length, complexity, and character variety.",
              },
              {
                name: "View Instant Analysis",
                text: "You’ll see real-time feedback including password strength score, risk level, and security hints.",
              },
              {
                name: "Follow Security Suggestions",
                text: "Use the suggestions provided to make your password stronger — add symbols, mix uppercase, or increase length.",
              },
              {
                name: "Test Again",
                text: "Try new combinations until you reach a strong or very strong rating.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this password strength checker safe to use?",
              answer:
                "Yes! 100% safe — all password testing happens in your browser. No passwords are sent, stored, or tracked on any server.",
            },
            {
              question: "How does the tool calculate password strength?",
              answer:
                "It analyzes your password length, character mix (uppercase, lowercase, numbers, symbols), and checks for common patterns or weak combinations.",
            },
            {
              question: "What makes a password strong?",
              answer:
                "A strong password has 12+ characters, includes symbols and numbers, and avoids common words or personal details like birthdays or names.",
            },
            {
              question: "Can I use this tool for multiple passwords?",
              answer:
                "Yes, it’s unlimited and completely free. You can check as many passwords as you want instantly.",
            },
            {
              question: "Does it store or share my passwords?",
              answer:
                "No. Your passwords never leave your device. Everything is processed locally in your browser for complete privacy.",
            },
            {
              question: "Can developers use this for security testing?",
              answer:
                "Absolutely! Developers, testers, and cybersecurity professionals can use it to ensure users create stronger passwords.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
