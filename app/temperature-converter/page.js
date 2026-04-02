import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Temperature Converter Online Convert Celsius Fahrenheit and Kelvin Instantly Free 2026",
  description:
    "Convert temperature units between Celsius, Fahrenheit and Kelvin instantly with our free online Temperature Converter. Precise and accurate results for students, teachers, scientists and travelers. 100% browser based and no signup needed!",
  slug: "/temperature-converter",
  focusKeyword: "Temperature Converter Online Free",
  keywords:
    "temperature converter, convert temperature online, celsius fahrenheit kelvin, temperature calculator, celsius to fahrenheit, fahrenheit to celsius, celsius to kelvin, kelvin to celsius, fahrenheit to kelvin, free temperature converter, online temperature converter, scientific temperature calculator, accurate temperature conversion, instant temperature converter, quick temperature tool, convert degrees online, weather temperature converter, temperature converter for students, temperature converter for scientists"
});

export default function Page() {
  return <ClientPage />;
}
