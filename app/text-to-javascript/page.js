import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to JavaScript Converter — Convert Text to JS Code Online",
  description:
    "Convert text to JavaScript code and JavaScript to text online. Free text to JS converter with formatting and validation support.",
  slug: "/text-to-javascript",
  keywords: ["text to javascript", "text to js", "javascript converter", "js converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}