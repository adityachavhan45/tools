import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Python Converter — Convert Text to Python Code Online",
  description:
    "Convert text to Python code and Python to text online. Free text to Python converter with formatting and validation support.",
  slug: "/text-to-python",
  keywords: ["text to python", "text to py", "python converter", "py converter", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}