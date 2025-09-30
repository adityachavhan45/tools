import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to YAML Converter Online — Free Tool to Format, Encode & Validate YAML",
  description:
    "Free Text to YAML Converter online. Instantly convert plain text to YAML code and YAML back to text with formatting, validation, and copy options. Useful tool for students, developers, DevOps engineers, and API testers working with configuration files and structured data.",
  slug: "/text-to-yaml",
  keywords:
    "text to yaml, yaml to text, yaml converter, convert text to yaml, yaml encoder, yaml decoder, yaml formatter, yaml validator, yaml parser online, yaml string converter, yaml generator, free yaml converter, yaml converter online, instant yaml tool, secure yaml converter, yaml config converter, text to yaml for developers, best yaml converter, yaml data converter, yaml encoding tool"
});

export default function Page() {
  return <ClientPage />;
}
