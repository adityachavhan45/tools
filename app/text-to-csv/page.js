import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to CSV Converter Online | Free, Fast & Accurate CSV Conversion Tool",
  description:
    "Convert text to CSV and CSV to text instantly with our free online CSV Converter. Validate, format, and export data with ease. Ideal for developers, data analysts, students, and professionals working with spreadsheets or databases. 100% browser-based and secure.",
  slug: "/text-to-csv",
  keywords:
    "text to csv, csv to text, csv converter, convert text to csv, csv file converter, csv text tool, csv data converter, csv formatter, csv validator, free csv converter, online csv converter, generate csv from text, csv string converter, text file to csv, best csv converter, csv export tool, csv creator online, instant csv converter, text to spreadsheet, data to csv, csv conversion tool"
});

export default function Page() {
  return <ClientPage />;
}
