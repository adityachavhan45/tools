import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to PHP Converter Online Convert Text to PHP Code and Format Instantly Free 2026",
  description:
    "Convert text to PHP code and decode PHP back to text instantly with our free online Text to PHP Converter. Encode, format and validate PHP code with accuracy and copy options. Perfect for PHP developers, backend programmers and students. Fast, secure and no signup needed!",
  slug: "/text-to-php",
  focusKeyword: "Text to PHP Converter Online Free",
  keywords:
    "text to php, php to text, php converter, php formatter, php validator, text to php converter, convert text to php code, php encoder, php decoder, php code generator, php string converter, php parser, free php converter, php converter online, instant php formatter, php code validator, secure php converter, php encoding tool, text to php for developers, online php converter, best php formatter tool"
});

export default function Page() {
  return <ClientPage />;
}
