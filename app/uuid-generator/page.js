import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "UUID Generator Free Online | Instant UUID v4 and GUID Generator",
  description:
    "Generate UUID v4 and GUIDs instantly. Free, no login required. Create unique, random and secure identifiers for APIs, databases and software projects. Perfect for developers, testers and backend engineers. 100% browser-based and reliable.",
  slug: "/uuid-generator",
  keywords:
    "uuid generator, uuid generator online, generate uuid, uuid v4 generator, guid generator, random uuid generator, free uuid generator, instant uuid generator, secure uuid generator, uuid maker online, uuid string generator, uuid for developers, api uuid generator, database uuid generator, bulk uuid generator, uuid code generator, uuid identifier generator, best uuid generator, uuid generator no login, uuid v4 online"
});

export default function Page() {
  return <ClientPage />;
}
