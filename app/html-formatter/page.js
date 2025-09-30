import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "HTML Formatter Online — Free HTML Beautifier & Code Prettifier",
  description:
    "Free HTML Formatter online. Instantly format, beautify, and clean your HTML code with proper indentation and syntax highlighting. Easy-to-use tool for developers, web designers, and students to improve readability and maintain clean code.",
  slug: "/html-formatter",
  keywords:
    "html formatter, format html, html beautifier, html prettifier, online html formatter, html code formatter, free html beautifier, html cleaner, html pretty print, html indentation tool, html code beautifier, format html online free, best html formatter, web development html tool, html syntax highlighter, html code beautify online, html minify and format, html editor tool, html structure formatter, online html beautifier, html formatting tool, html parser online, html code beautify and format"
});

export default function Page() {
  return <ClientPage />;
}