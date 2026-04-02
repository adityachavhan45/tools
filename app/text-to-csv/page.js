import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to CSV Converter Online Convert Text to CSV and Export Data Instantly Free 2026",
  description:
    "Convert text to CSV and CSV to text instantly with our free online Text to CSV Converter. Validate, format and export data with ease. Perfect for developers, data analysts, students and professionals working with spreadsheets. Fast, secure and no signup needed!",
  slug: "/text-to-csv",
  focusKeyword: "Text to CSV Converter Online Free",
  keywords:
    "text to csv, csv to text, csv converter, convert text to csv, csv file converter, csv text tool, csv data converter, csv formatter, csv validator, free csv converter, online csv converter, generate csv from text, csv string converter, text file to csv, best csv converter, csv export tool, csv creator online, instant csv converter, text to spreadsheet, data to csv, csv conversion tool"
});

export default function Page() {
  return <ClientPage />;
}
