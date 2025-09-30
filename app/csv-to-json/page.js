import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "CSV to JSON Converter Online — Free & Instant Data Conversion",
  description:
    "Free CSV to JSON Converter online. Instantly convert CSV files into JSON format with proper formatting and validation. Simple, fast, and reliable tool for developers, data analysts, students, and API integration.",
  slug: "/csv-to-json",
  keywords:
    "csv to json, convert csv to json, csv converter online, json converter, csv parser, csv to json tool, free csv to json converter, online data converter, csv to json format, csv to json code, csv to json api, csv file converter, data processing tool, csv to json with formatting, csv to json validator, csv to json array, csv data to json object, csv to json online free, csv to json converter tool, csv to json for developers, csv to json for api integration, convert csv data online, csv to json for students, csv to json simple tool, csv to json instant converter, csv file to json online, csv to json script generator, csv to json utility, csv to json converter with options"
});

export default function Page() {
  return <ClientPage />;
}