import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Temperature Converter Online | Free, Fast & Accurate Celsius, Fahrenheit & Kelvin Tool",
  description:
    "Convert temperature units instantly with our free Temperature Converter online. Switch easily between Celsius, Fahrenheit, and Kelvin with precise, accurate results. Ideal for students, teachers, scientists, and travelers. 100% browser-based — no sign-up or downloads required.",
  slug: "/temperature-converter",
  keywords:
    "temperature converter, convert temperature online, celsius fahrenheit kelvin, temperature calculator, celsius to fahrenheit, fahrenheit to celsius, celsius to kelvin, kelvin to celsius, fahrenheit to kelvin, free temperature converter, online temperature converter, scientific temperature calculator, accurate temperature conversion, instant temperature converter, quick temperature tool, convert degrees online, weather temperature converter, temperature converter for students, temperature converter for scientists"
});

export default function Page() {
  return <ClientPage />;
}
