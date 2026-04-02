import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Unit Converter Free Online | Instant Length, Weight, Temperature and More",
  description:
    "Convert units instantly. Free, no login required. Calculate length, weight, volume, area, temperature, speed, energy and more with precision. Ideal for students, engineers, scientists and travelers. 100% browser-based and secure.",
  slug: "/unit-converter",
  keywords:
    "unit converter, unit converter online, convert units online, unit conversion calculator, length converter, weight converter, temperature converter, volume converter, area converter, speed converter, energy converter, metric to imperial converter, imperial to metric converter, free unit converter, instant unit converter, best unit converter, unit calculator online, measurement converter online, unit converter no login, scientific unit converter"
});

export default function Page() {
  return <ClientPage />;
}
