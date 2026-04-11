import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title: "JSON to CSV Converter Online | Free JSON to CSV Tool",
  description:
    "Convert JSON to CSV online for free. Paste JSON data, flatten records, and export clean CSV output instantly with this lightweight browser tool for developers, analysts, and spreadsheet users.",
  slug: "/json-to-csv",
  keywords: [
    "json to csv",
    "json to csv converter",
    "convert json to csv online",
    "json to csv converter online",
    "json csv tool",
    "free json to csv",
    "json array to csv",
    "json converter online",
    "json to csv tool",
    "convert api json to csv",
    "online json to csv converter",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "JSON to CSV Converter Online",
            description:
              "Free online JSON to CSV Converter to convert JSON arrays and objects into clean CSV output for spreadsheets and reports.",
            slug: "/json-to-csv",
            category: "Developer Tools",
          }),
          buildBreadcrumbJsonLd([
            { name: "Home", slug: "/" },
            { name: "JSON to CSV", slug: "/json-to-csv" },
          ]),
          buildHowToJsonLd({
            name: "How to Convert JSON to CSV Online",
            description:
              "Paste JSON data, convert it to CSV, then copy or download the result.",
            steps: [
              { name: "Paste JSON", text: "Enter a valid JSON array or object in the input area." },
              { name: "Convert the data", text: "The tool converts keys and records into CSV format." },
              { name: "Review the output", text: "Check the generated CSV text on the page." },
              { name: "Copy or download", text: "Copy the CSV or download it as a file." },
            ],
          }),
          buildFaqJsonLd([
            { question: "What kind of JSON works best?", answer: "JSON arrays of objects work best because each object can become a clean CSV row." },
            { question: "Can this tool handle nested values?", answer: "Yes, simple nested values are flattened into dotted column names for easier CSV output." },
            { question: "Can I download the CSV file?", answer: "Yes, this JSON to CSV tool supports CSV download after conversion." },
            { question: "Is this JSON to CSV converter free?", answer: "Yes, this JSON to CSV Converter is free to use online." },
            { question: "Is my JSON uploaded anywhere?", answer: "No, your JSON conversion is handled locally in the browser." },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}