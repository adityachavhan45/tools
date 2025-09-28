import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to ASCII Converter — Convert Text to ASCII Code Online",
  description:
    "Convert text to ASCII code and ASCII to text online. Free text to ASCII converter with formatting and validation support.",
  slug: "/text-to-ascii",
  keywords: ["text to ascii", "text to ascii", "ascii converter", "ascii converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}