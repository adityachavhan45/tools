import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "JSON Formatter & Validator Online — Free Tool to Beautify, Minify & Check JSON",
  description:
    "Free JSON Formatter & Validator online. Instantly format, beautify, minify, and validate JSON code with error highlighting. Easy-to-use JSON tool for developers, API testing, data debugging, and web development projects.",
  slug: "/json-formatter",
  keywords:
    "json formatter, json validator, beautify json, json minifier, json editor, online json tool, free json formatter, validate json online, json viewer, format json code, json syntax checker, json beautifier tool, json parser online, json highlighter, json pretty print, best json formatter, json repair tool, json formatter for developers, json debugging tool, json linter online, check json errors, json tool for api testing, json online validator"
});

export default function Page() {
  return <ClientPage />;
}