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
    "JSON Formatter & Validator Online - Free Tool to Beautify, Minify & Check JSON",
  description:
    "Use this free JSON Formatter & Validator online to instantly format, beautify, minify, and validate JSON code. Detect syntax errors, highlight structure, and debug APIs easily — perfect for developers, testers, and data analysts.",
  slug: "/json-formatter",
  focusKeyword: "JSON Formatter & Validator Online",
  keywords: [
    "json formatter",
    "json validator",
    "json formatter online",
    "beautify json",
    "json minifier",
    "json editor",
    "online json tool",
    "free json formatter",
    "validate json online",
    "json viewer",
    "format json code",
    "json syntax checker",
    "json beautifier tool",
    "json parser online",
    "json pretty print",
    "best json formatter",
    "json repair tool",
    "json formatter for developers",
    "json debugging tool",
    "json linter online",
    "check json errors",
    "json tool for api testing",
    "json online validator",
    "json formatter and beautifier",
    "json validator with error highlight",
    "json analyzer online",
    "json structure viewer",
    "json fixer tool",
    "json code formatter",
    "json minify and beautify",
    "json checker online",
    "json validation tool",
    "json formatter for api response",
    "developer json formatter",
    "json debugging online"
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "JSON Formatter & Validator Online",
            description:
              "Free JSON Formatter & Validator tool to format, beautify, minify, and validate JSON code instantly. Highlight errors, debug APIs, and view JSON structure in an easy-to-read format.",
            slug: "/json-formatter",
            category: "Developer Tools",
          }),
          buildHowToJsonLd({
            name: "How to Format and Validate JSON Online",
            description:
              "Step-by-step guide to format, beautify, and validate JSON data accurately using this free online tool.",
            steps: [
              {
                name: "Paste or Upload JSON Data",
                text: "Paste your JSON code directly or upload a .json file to start formatting and validation.",
              },
              {
                name: "Click 'Format & Validate' Button",
                text: "Press the 'Format & Validate' button to automatically format your JSON code and highlight any syntax errors.",
              },
              {
                name: "View Formatted JSON Output",
                text: "Your beautified JSON will appear with proper indentation, structure, and color highlighting for easy readability.",
              },
              {
                name: "Fix Any Errors if Highlighted",
                text: "If the validator detects syntax errors, the tool will highlight them instantly for correction.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What does a JSON formatter do?",
              answer:
                "A JSON formatter automatically organizes and beautifies JSON data by adding indentation and structure, making it easier to read and debug.",
            },
            {
              question: "Can I use this tool to validate my JSON?",
              answer:
                "Yes, this tool checks your JSON for syntax errors and highlights invalid parts so you can fix them immediately.",
            },
            {
              question: "Is this JSON formatter free to use?",
              answer:
                "Yes! It’s completely free, with no sign-up, ads, or watermarks. Everything runs securely in your browser.",
            },
            {
              question: "Can I minify my JSON code using this tool?",
              answer:
                "Yes. You can compress or minify your JSON data to remove extra spaces and line breaks for faster processing and API responses.",
            },
            {
              question: "Is my JSON data safe here?",
              answer:
                "Absolutely. All processing happens locally in your browser — no data is uploaded or stored on any server.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
