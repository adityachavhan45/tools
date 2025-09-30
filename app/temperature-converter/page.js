import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Temperature Converter Online — Free Tool for Celsius, Fahrenheit & Kelvin",
  description:
    "Free Temperature Converter online. Instantly convert between Celsius, Fahrenheit, and Kelvin with accurate results. Perfect tool for students, scientists, teachers, travelers, and weather use. Fast, secure, and works directly in your browser.",
  slug: "/temperature-converter",
  keywords:
    "temperature converter, celsius fahrenheit, kelvin converter, temperature calculator, convert temperature online, celsius to fahrenheit, fahrenheit to celsius, celsius to kelvin, kelvin to celsius, fahrenheit to kelvin, temperature conversion tool, online temperature calculator, free temperature converter, scientific calculator temperature, quick temperature converter, accurate temperature conversion, instant temperature tool, convert degrees online, temperature converter for students, weather temperature converter"
});

export default function Page() {
  return <ClientPage />;
}