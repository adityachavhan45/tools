import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to PHP Converter Online | Free, Fast & Secure PHP Encode/Format Tool",
  description:
    "Convert text to PHP code and PHP back to text instantly with our free online PHP Converter. Encode, format, and validate PHP code with accuracy and copy options. Ideal for PHP developers, backend programmers, students, and web projects. 100% browser-based and secure.",
  slug: "/text-to-php",
  keywords:
    "text to php, php to text, php converter, php formatter, php validator, text to php converter, convert text to php code, php encoder, php decoder, php code generator, php string converter, php parser, free php converter, php converter online, instant php formatter, php code validator, secure php converter, php encoding tool, text to php for developers, online php converter, best php formatter tool"
});

export default function Page() {
  return <ClientPage />;
}
