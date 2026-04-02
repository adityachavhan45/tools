import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to YAML Converter Free Online | Instant YAML Formatter and Validator",
  description:
    "Convert plain text to YAML and YAML to text instantly. Free, no login required. Format, encode, and validate YAML configuration files with accuracy and copy support. Perfect for developers, DevOps engineers and API testers. 100% browser-based and secure.",
  slug: "/text-to-yaml",
  keywords:
    "text to yaml, text to yaml converter, yaml converter online, convert text to yaml, yaml formatter online, yaml validator online, yaml encoder, yaml decoder, yaml parser online, free yaml converter, instant yaml converter, yaml generator online, yaml string converter, yaml config converter, yaml encoding tool, yaml data converter, yaml formatter free, yaml converter no login, best yaml converter, yaml tool for developers"
});

export default function Page() {
  return <ClientPage />;
}
