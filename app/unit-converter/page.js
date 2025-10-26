import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Unit Converter Online | Free, Fast & Accurate Measurement Conversion Tool",
  description:
    "Convert units instantly with our free Unit Converter online. Calculate length, weight, volume, area, temperature, speed, energy, and more with precision. Ideal for students, engineers, scientists, travelers, and everyday measurement needs. 100% browser-based and secure.",
  slug: "/unit-converter",
  keywords:
    "unit converter, unit conversion, measurement converter, convert units online, unit calculator, length converter, weight converter, volume converter, area converter, temperature converter, speed converter, energy converter, metric to imperial converter, online measurement converter, free unit converter, instant unit converter, accurate unit conversion, best online unit converter, scientific unit calculator, fast unit converter"
});

export default function Page() {
  return <ClientPage />;
}
