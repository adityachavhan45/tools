import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to CSV Converter Online — Free Tool to Convert Text & CSV Files",
  description:
    "Free Text to CSV Converter online. Instantly convert text to CSV format and CSV back to text with validation, formatting, and export options. Useful tool for students, developers, data analysts, and professionals working with spreadsheets or databases.",
  slug: "/text-to-csv",
  keywords:
    "text to csv, csv to text, csv converter, text to csv code, convert text to csv, csv file converter, text to csv online, free csv converter, csv text tool, csv formatter, generate csv from text, csv data converter, csv string converter, text file to csv, best csv converter, csv export tool, csv validator, csv creator online, instant csv converter, text to spreadsheet"
});

export default function Page() {
  return <ClientPage />;
}
