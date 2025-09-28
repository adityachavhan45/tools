import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Time Zone Converter — Convert Time Zones Online",
  description:
    "Convert time zones online. Free time zone converter with world clock and time zone options for international communication and scheduling.",
  slug: "/time-zone-converter",
  keywords: ["time zone converter", "world clock", "time zone", "time converter"],
});

export default function Page() {
  return <ClientPage />;
}