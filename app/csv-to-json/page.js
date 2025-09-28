import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "CSV to JSON — Convert CSV to JSON Online",
  description:
    "Convert CSV to JSON online. Free CSV to JSON converter with formatting options and data validation for data processing and API integration.",
  slug: "/csv-to-json",
  keywords: ["csv to json", "convert csv", "json converter", "data converter"],
});

export default function Page() {
  return <ClientPage />;
}