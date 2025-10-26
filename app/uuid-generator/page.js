import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "UUID Generator Online | Free, Fast & Secure UUID v4 & GUID Generator Tool",
  description:
    "Generate UUID v4 and GUIDs instantly with our free online UUID Generator. Create unique, random, and secure identifiers for APIs, databases, and software projects. Perfect for developers, testers, and backend engineers. 100% browser-based and reliable.",
  slug: "/uuid-generator",
  keywords:
    "uuid generator, uuid v4, guid, uuid generator online, generate uuid, guid generator, uuid tool, create uuid v4, free uuid generator, instant uuid generator, secure uuid generator, random uuid generator, uuid string generator, uuid generator for developers, api uuid generator, database uuid tool, uuid maker, uuid code generator, uuid identifier tool, uuid generator tool"
});

export default function Page() {
  return <ClientPage />;
}
