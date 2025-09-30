import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to JSON Converter Online — Free Tool to Format, Encode & Decode JSON",
  description:
    "Free Text to JSON Converter online. Instantly convert text to JSON code and JSON back to text with formatting, validation, and copy options. Useful tool for developers, API testing, students, and data processing tasks.",
  slug: "/text-to-json",
  keywords:
    "text to json, json to text, json converter, text to json code, convert text to json, json encoder, json decoder, json formatter, json validator, json generator, text to json online, free json converter, json parser, secure json converter, json data converter, instant json converter, best json converter, json string converter, json conversion tool, json for developers"
});

export default function Page() {
  return <ClientPage />;
}
