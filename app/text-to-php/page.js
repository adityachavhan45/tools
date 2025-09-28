import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to PHP Converter — Convert Text to PHP Code Online",
  description:
    "Convert text to PHP code and PHP to text online. Free text to PHP converter with formatting and validation support.",
  slug: "/text-to-php",
  keywords: ["text to php", "php converter", "php formatter", "text to php converter", "php validator"],
});

export default function Page() {
  return <ClientPage />;
}
