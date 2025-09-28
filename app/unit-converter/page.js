import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Unit Converter — Convert Units Online",
  description:
    "Convert units online. Free unit converter with length, weight, volume, and area options for scientific calculations and measurements.",
  slug: "/unit-converter",
  keywords: ["unit converter", "unit conversion", "measurement converter", "unit calculator"],
});

export default function Page() {
  return <ClientPage />;
}