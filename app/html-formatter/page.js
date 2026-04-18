import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "HTML Formatter Online Free | Beautify and Clean HTML Code Instantly",
  description:
    "Format and beautify HTML code instantly. Clean structure, proper indentation, and improved readability with this free HTML formatter.",
  slug: "/html-formatter",
  focusKeyword: "html formatter online",
  keywords: [
    "html formatter",
    "html formatter online",
    "html beautifier",
    "format html code",
    "html code formatter",
    "html pretty print",
    "html cleaner",
    "html indentation tool",
    "online html formatter",
    "free html beautifier",
    "html formatting tool",
    "html tidy online",
    "html code beautify",
    "html structure formatter",
    "html parser tool",
    "developer html tool",
    "clean html code online",
    "format html instantly"
  ],
});

export default function Page() {
  return <ClientPage />;
}