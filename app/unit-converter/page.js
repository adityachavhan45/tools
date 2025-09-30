import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Unit Converter Online — Free Tool for Measurement & Unit Conversion",
  description:
    "Free Unit Converter online. Instantly convert units of length, weight, volume, area, temperature, speed, energy, and more. Perfect for students, engineers, scientists, travelers, and daily measurement needs. Fast, accurate, and works directly in your browser.",
  slug: "/unit-converter",
  keywords:
    "unit converter, unit conversion, measurement converter, unit calculator, length converter, weight converter, volume converter, area converter, temperature converter, speed converter, energy converter, unit conversion tool, metric to imperial converter, online measurement converter, free unit converter, scientific unit calculator, instant unit converter, best online unit converter, accurate unit conversion, convert units online"
});

export default function Page() {
  return <ClientPage />;
}
