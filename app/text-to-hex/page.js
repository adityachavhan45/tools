import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Hex Converter — Convert Text to Hex Code Online",
  description:
    "Convert text to Hex code and Hex to text online. Free text to Hex converter with formatting and validation support.",
  slug: "/text-to-hex",
  keywords: ["text to hex", "text to hex", "hex converter", "hex converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}