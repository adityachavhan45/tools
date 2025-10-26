import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to YAML Converter Online | Free, Fast & Secure YAML Formatter & Validator",
  description:
    "Convert text to YAML and YAML to text instantly with our free online YAML Converter. Format, encode, and validate YAML data or configuration files with accuracy and copy support. Perfect for developers, DevOps engineers, students, and API testers. 100% browser-based and secure.",
  slug: "/text-to-yaml",
  keywords:
    "text to yaml, yaml to text, yaml converter, convert text to yaml, yaml encoder, yaml decoder, yaml formatter, yaml validator, yaml parser online, yaml string converter, yaml generator, free yaml converter, yaml converter online, instant yaml tool, secure yaml converter, yaml config converter, text to yaml for developers, yaml encoding tool, yaml data converter, yaml format validator"
});

export default function Page() {
  return <ClientPage />;
}
