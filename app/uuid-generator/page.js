import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "UUID Generator Online — Free Tool to Generate UUID v4 & GUIDs",
  description:
    "Free UUID Generator online. Instantly generate UUID v4 identifiers (GUIDs) in your browser with one click. Fast, secure, and reliable tool for developers, database administrators, API testing, and software projects.",
  slug: "/uuid-generator",
  keywords:
    "uuid generator, uuid v4, guid, uuid generator online, generate uuid, uuid tool, create uuid v4, guid generator, free uuid generator, instant uuid generator, secure uuid generator, uuid string generator, uuid generator for developers, api uuid generator, database uuid tool, random uuid generator, uuid v4 generator online, uuid maker, uuid code generator, uuid identifier tool"
});

export default function Page() {
  return <ClientPage />;
}
