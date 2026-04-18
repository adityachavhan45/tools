import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "CSV to JSON Converter | Convert CSV Data to JSON Instantly",
  description:
    "Free CSV to JSON Converter to transform CSV data into structured JSON instantly. Fast, accurate and easy tool for developers, data analysts and students.",
  slug: "/csv-to-json",
  focusKeyword: "CSV to JSON Converter",
  keywords: [
    "csv to json converter",
    "convert csv to json",
    "csv to json tool",
    "csv to json online",
    "json converter",
    "csv parser",
    "csv file to json",
    "csv to json format",
    "csv to json array",
    "data converter tool",
    "csv to json for developers",
    "csv to json api",
    "csv data to json",
    "csv transformation tool",
    "csv to json validator",
    "online csv to json parser",
    "csv to json utility",
    "convert csv data to json",
    "csv json converter free",
    "csv to json instant converter"
  ],
});

export default function Page() {
  return <ClientPage />;
}