import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "HTML Formatter — Format HTML Code Online",
  description:
    "Format HTML code online. Free HTML formatter with indentation options and syntax highlighting for web development and code formatting.",
  slug: "/html-formatter",
  keywords: ["html formatter", "format html", "html beautifier", "html prettifier"],
});

export default function Page() {
  return <ClientPage />;
}