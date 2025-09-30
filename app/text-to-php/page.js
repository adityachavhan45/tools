import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to PHP Converter Online — Free Tool to Encode, Format & Validate PHP Code",
  description:
    "Free Text to PHP Converter online. Instantly convert text to PHP code and PHP back to text with formatting, validation, and copy options. Useful tool for students, PHP developers, backend programmers, and web projects.",
  slug: "/text-to-php",
  keywords:
    "text to php, php to text, php converter, php formatter, php validator, text to php converter, convert text to php code, php encoder, php decoder, php code generator, php string converter, free php converter, php converter online, instant php formatter, php parser, php code validator, text to php for developers, best php converter tool, secure php converter, online php encoder"
});

export default function Page() {
  return <ClientPage />;
}
