import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to SQL Converter — Convert Text to SQL Code Online",
  description:
    "Convert text to SQL code and SQL to text online. Free text to SQL converter with formatting and validation support.",
  slug: "/text-to-sql",
  keywords: ["text to sql", "text to sql", "sql converter", "sql converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}