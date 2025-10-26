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
    "Password Generator Online - Free Strong & Secure Random Password Tool",
  description:
    "Use this free Password Generator online to instantly create strong, secure, and random passwords with custom length, symbols, and numbers. Perfect for securing online accounts, data protection, and developer use.",
  slug: "/password-generator",
  focusKeyword: "Password Generator Online",
  keywords: [
    "password generator",
    "password generator online",
    "strong passwords",
    "random password",
    "secure password generator",
    "free password generator",
    "online password tool",
    "generate random password",
    "strong random password generator",
    "best password generator",
    "custom password generator",
    "password creator",
    "random password tool",
    "complex password generator",
    "secure online password",
    "instant password generator",
    "password generator with symbols",
    "long password generator",
    "password security tool",
    "create random password",
    "generate safe password",
    "hacker proof password generator",
    "strong password generator online",
    "random secure password generator",
    "password tool for developers",
    "password protection tool",
    "generate unique passwords",
    "password strength generator",
    "cybersecurity password tool",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Password Generator Online",
            description:
              "Free Password Generator to create strong, secure, and random passwords instantly with custom symbols, numbers, and lengths.",
            slug: "/password-generator",
            category: "Security Tools",
          }),
          buildHowToJsonLd({
            name: "How to Generate a Strong Password Online",
            description:
              "Step-by-step guide to create secure and random passwords using the free online password generator tool.",
            steps: [
              {
                name: "Choose Password Length",
                text: "Select the number of characters you want for your password — typically 12–20 for strong security.",
              },
              {
                name: "Select Characters and Options",
                text: "Enable or disable uppercase, lowercase, numbers, and symbols to customize your password complexity.",
              },
              {
                name: "Click 'Generate Password'",
                text: "Press the generate button to instantly create a random, secure password in your browser.",
              },
              {
                name: "Copy and Save Your Password",
                text: "Copy your generated password securely or use the copy icon to save it for immediate use.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "Is this password generator safe?",
              answer:
                "Yes! All password generation happens locally in your browser — nothing is sent to or stored on any server. It’s 100% private and secure.",
            },
            {
              question: "What makes a password strong?",
              answer:
                "A strong password includes at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols. Avoid dictionary words and personal info.",
            },
            {
              question: "Can I customize the password length?",
              answer:
                "Yes! You can select any length from 6 to 64 characters depending on your security needs or site requirements.",
            },
            {
              question: "Is this password generator really free?",
              answer:
                "Yes, completely free to use. No sign-up, no ads, and no hidden fees — generate unlimited passwords instantly.",
            },
            {
              question: "Who can use this tool?",
              answer:
                "Anyone who values online security — from individuals protecting their accounts to developers, cybersecurity experts, and IT admins.",
            },
            {
              question: "Can I use these passwords for any website?",
              answer:
                "Absolutely! Generated passwords are compatible with all major websites, apps, and password managers.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
