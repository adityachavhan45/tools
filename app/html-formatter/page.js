import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "HTML Formatter Online - Free HTML Beautifier & Code Prettifier Tool",
  description:
    "Use this free HTML Formatter online to instantly format, beautify, and clean your HTML code. Perfect for developers, web designers, and students. Improve code readability with proper indentation, clean structure, and syntax highlighting.",
  slug: "/html-formatter",
  focusKeyword: "HTML Formatter Online",
  keywords: [
    "html formatter",
    "html formatter online",
    "format html code",
    "html beautifier",
    "html prettifier",
    "html code beautifier",
    "html code formatter",
    "html cleaner",
    "html pretty print",
    "html indentation tool",
    "html beautify online free",
    "online html formatter",
    "free html beautifier",
    "best html formatter",
    "web development html tool",
    "html syntax highlighter",
    "html minify and format",
    "html editor online",
    "html structure formatter",
    "online html beautifier",
    "html formatting tool",
    "html parser online",
    "html code beautify and format",
    "html viewer and formatter",
    "html tidy online",
    "html cleaner and formatter",
    "html code indentation tool",
    "developer html formatter",
    "format html instantly",
    "html source code formatter"
  ],
});

export default function Page() {
  return <ClientPage />;
}
