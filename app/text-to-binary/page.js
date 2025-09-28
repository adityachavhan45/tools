import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Binary Converter — Convert Text to Binary Code Online",
  description:
    "Convert text to Binary code and Binary to text online. Free text to Binary converter with formatting and validation support.",
  slug: "/text-to-binary",
  keywords: ["text to binary", "text to binary", "binary converter", "binary converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}