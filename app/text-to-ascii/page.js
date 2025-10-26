import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to ASCII Converter Online | Free, Fast & Accurate ASCII Code Tool",
  description:
    "Convert text to ASCII code and ASCII to text instantly with our free online ASCII Converter. Perfect for students, developers, and programmers. Includes formatting, validation, and copy options. 100% browser-based, fast, and secure.",
  slug: "/text-to-ascii",
  keywords:
    "text to ascii, ascii to text, ascii converter, text to ascii code, ascii encoder, ascii decoder, convert text to ascii, online ascii tool, ascii code generator, ascii character converter, ascii text converter, ascii table converter, ascii value converter, ascii code online, free text to ascii tool, instant ascii converter, text to ascii for developers, text encoding tool, ascii converter online, best ascii code tool"
});

export default function Page() {
  return <ClientPage />;
}
