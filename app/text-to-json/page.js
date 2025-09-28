import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to JSON Converter — Convert Text to JSON Code Online",
  description:
    "Convert text to JSON code and JSON to text online. Free text to JSON converter with formatting and validation support.",
  slug: "/text-to-json",
  keywords: ["text to json", "text to json", "json converter", "json converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}