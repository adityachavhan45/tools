import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Base64 Converter — Convert Text to Base64 Code Online",
  description:
    "Convert text to Base64 code and Base64 to text online. Free text to Base64 converter with formatting and validation support.",
  slug: "/text-to-base64",
  keywords: ["text to base64", "text to base64", "base64 converter", "base64 converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}