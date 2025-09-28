import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to YAML Converter — Convert Text to YAML Code Online",
  description:
    "Convert text to YAML code and YAML to text online. Free text to YAML converter with formatting and validation support.",
  slug: "/text-to-yaml",
  keywords: ["text to yaml", "text to yaml", "yaml converter", "yaml converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}