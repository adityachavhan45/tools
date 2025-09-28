import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to URL Encoder — Convert Text to URL Code Online",
  description:
    "Convert text to URL code and URL to text online. Free text to URL encoder with formatting and validation support.",
  slug: "/text-to-url-encoder",
  keywords: ["text to url", "text to url", "url encoder", "url encoder", "text to code"],
});

export default function Page() {
  return <ClientPage />;
}