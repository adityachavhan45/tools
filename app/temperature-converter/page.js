import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Temperature Converter — Convert Temperature Online",
  description:
    "Convert temperature online. Free temperature converter with Celsius, Fahrenheit, and Kelvin options for scientific calculations and weather.",
  slug: "/temperature-converter",
  keywords: ["temperature converter", "celsius fahrenheit", "kelvin converter", "temperature calculator"],
});

export default function Page() {
  return <ClientPage />;
}