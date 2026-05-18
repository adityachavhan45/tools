"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What JSON to CSV Converter Does and Why It Matters",
    paragraphs: [
      "JSON to CSV Converter helps users turn structured JSON data into a flat CSV format that works well in spreadsheets and reports. This matters because many APIs return JSON, but non-technical workflows often need CSV.",
      "Instead of manually copying values into columns, a converter saves time and reduces mistakes.",
      "This is especially useful in day-to-day work where the same kind of conversion happens again and again. Developers, analysts, and operations teams often receive JSON from tools, exports, or APIs, but the next person in the workflow may only want a clean spreadsheet-ready file.",
    ],
  },
  {
    heading: "Who Should Use JSON to CSV Converter",
    paragraphs: [
      "This tool is useful for developers, analysts, QA testers, students, and spreadsheet users. Anyone who works with API responses or exported JSON data can benefit from quick CSV conversion.",
      "It is also useful for teams who need to share data with people who prefer spreadsheet tools over raw JSON.",
      "The tool also helps when users are exploring data quickly rather than building a full script or pipeline. For one-off reports and fast reviews, an online converter is often more practical than writing code for a simple transformation.",
    ],
  },
  {
    heading: "How to Use JSON to CSV Converter Step by Step",
    paragraphs: [
      "Paste valid JSON into the input field. The tool parses the data and generates CSV output on the page.",
      "Then review the result, copy it, or download it as a file. That makes it easy to move from development data to reporting format in one step.",
      "A good habit is to check the shape of the JSON before conversion. If records are mostly consistent, the final CSV will usually be cleaner and easier to work with in Excel, Sheets, or any other spreadsheet tool.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is pasting invalid JSON or mixing record structures too much. Deep nesting can also create output that needs extra review.",
      "It helps to validate the JSON first and keep records as consistent as possible before conversion.",
      "Another issue is assuming every nested structure will become a perfect table without any review. Flattening helps a lot, but some complex data still needs human checking before it is ready for a final report or upload somewhere else.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "JSON and CSV are both common formats, and converting between them is a repeat need in development, analytics, and operations work.",
      "That makes a JSON to CSV tool a practical evergreen utility rather than a temporary feature.",
      "This page also keeps its value because both formats are deeply embedded in digital workflows. As long as APIs, exports, dashboards, and spreadsheets exist together, users will continue needing simple conversion tools like this one.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Use clean JSON, review the generated column headers, and test the CSV in the spreadsheet or app where it will be used.",
      "For complex nested structures, it is smart to inspect the flattened output before sharing it widely.",
      "Users should also review how arrays are represented in the output. In some workflows, a joined array value is acceptable, while in others it may need extra cleanup depending on how the CSV will be used later.",
    ],
  },
];

const faq = [
  { question: "What kind of JSON works best?", answer: "JSON arrays of objects usually work best because each object becomes a row. That structure maps naturally into CSV with headers and records, which makes the output easier to review and use in spreadsheet tools." },
  { question: "Can this tool handle nested values?", answer: "Yes, simple nested values are flattened into dotted column names. This helps preserve useful structure while still producing a CSV format that can be opened and reviewed in common spreadsheet software." },
  { question: "Can I download the CSV file?", answer: "Yes, the tool supports CSV download. That makes it easier to move from browser conversion into Excel, Google Sheets, reports, imports, or team sharing workflows." },
  { question: "Is this JSON to CSV converter free?", answer: "Yes, it is free and works in your browser. Users can convert data quickly without installing software or signing up for an account." },
  { question: "Is my JSON uploaded anywhere?", answer: "No, the conversion is handled locally in the browser. That is helpful for users who want a faster workflow and better privacy for routine data transformations." },
];

function flattenObject(input, prefix = "", result = {}) {
  Object.entries(input || {}).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      result[nextKey] = value.join(" | ");
    } else if (value && typeof value === "object") {
      flattenObject(value, nextKey, result);
    } else {
      result[nextKey] = value ?? "";
    }
  });
  return result;
}

function toCsv(data) {
  if (data === null || data === undefined) {
    throw new Error("JSON cannot be empty.");
  }

  if (typeof data !== "object") {
    throw new Error("JSON must be an object or an array of objects.");
  }

  const records = Array.isArray(data) ? data : [data];
  if (!records.length) {
    throw new Error("Add at least one JSON record to convert.");
  }

  if (records.some((item) => !item || typeof item !== "object" || Array.isArray(item))) {
    throw new Error("Use a JSON object or an array of JSON objects.");
  }

  const flattened = records.map((item) => flattenObject(item));
  const headers = Array.from(new Set(flattened.flatMap((item) => Object.keys(item))));
  if (!headers.length) {
    throw new Error("Could not find any fields to convert into CSV columns.");
  }

  const rows = flattened.map((item) =>
    headers
      .map((header) => `"${String(item[header] ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export default function JsonToCsvPage() {
  const [jsonInput, setJsonInput] = useState('[{"name":"Ava","city":"Delhi"},{"name":"Liam","city":"Mumbai"}]');
  const [message, setMessage] = useState("");

  const conversion = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      return {
        error: "",
        output: toCsv(parsed),
      };
    } catch (error) {
      return {
        error: error.message || "Please enter valid JSON before converting.",
        output: "",
      };
    }
  }, [jsonInput]);

  const copyOutput = async () => {
    if (!conversion.output) return;
    await navigator.clipboard.writeText(conversion.output);
    setMessage("CSV copied to clipboard.");
    setTimeout(() => setMessage(""), 2500);
  };

  const downloadCsv = () => {
    if (!conversion.output) return;
    const blob = new Blob([conversion.output], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = "converted.csv";
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <ToolSection
      title="JSON to CSV Converter"
      subtitle="Convert JSON arrays and objects into clean CSV output that you can copy or download in seconds."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            JSON to CSV Converter Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Convert JSON arrays and objects into spreadsheet-ready CSV output in seconds.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">JSON Input</label>
            <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} className="min-h-72 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">CSV Output</label>
            <textarea value={conversion.output} readOnly className="min-h-72 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <button onClick={copyOutput} className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-md hover:bg-teal-700 transition">Copy CSV</button>
          <button onClick={downloadCsv} className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition">Download CSV</button>
          {message ? <p className="self-center text-sm text-emerald-700">{message}</p> : null}
          {conversion.error ? <p className="self-center text-sm text-rose-600">{conversion.error}</p> : null}
        </div>

        <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">About This Tool</h2>
          <div className="mt-6 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold text-slate-900">{section.heading}</h3>
                <div className="mt-3 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-justify">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        </div>
      </div>
    </ToolSection>
  );
}
