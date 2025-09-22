import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JSON Formatter & Validator",
  description:
    "Format, minify, and validate JSON with error highlighting. Works in your browser.",
  slug: "/json-formatter",
  keywords: ["json formatter", "json validator", "beautify json"],
});

export default function Page() {
  return <ClientPage />;
}

