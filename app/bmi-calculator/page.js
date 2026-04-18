import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "BMI Calculator – Check Your Body Mass Index Instantly",
  description:
    "Use this free BMI calculator to check your Body Mass Index instantly. Enter your height and weight to find out if you are underweight, healthy, overweight, or obese.",
  slug: "/bmi-calculator",
  focusKeyword: "BMI Calculator",
  keywords: [
    "bmi calculator",
    "calculate bmi",
    "body mass index calculator",
    "bmi calculator online",
    "check bmi",
    "height and weight calculator",
    "ideal weight calculator",
    "bmi chart",
    "healthy weight calculator",
    "bmi for men",
    "bmi for women",
    "adult bmi calculator",
    "bmi range",
    "bmi formula",
    "fitness calculator",
    "health calculator",
    "weight status calculator",
    "bmi test",
    "bmi scale",
    "bmi calculation tool"
  ],
});

export default function Page() {
  return <ClientPage />;
}