import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "BMI Calculator — Calculate BMI Online",
  description:
    "Calculate BMI online. Free BMI calculator with height and weight options for health assessment and fitness tracking.",
  slug: "/bmi-calculator",
  keywords: ["bmi calculator", "bmi", "body mass index", "health calculator"],
});

export default function Page() {
  return <ClientPage />;
}