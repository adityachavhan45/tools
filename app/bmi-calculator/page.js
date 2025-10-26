import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "BMI Calculator Online - Calculate Your Body Mass Index Instantly (Free Tool)",
  description:
    "Use this free BMI Calculator online to calculate your Body Mass Index instantly. Find out if you are underweight, healthy, overweight, or obese based on your height and weight. Accurate BMI tool for health, diet, and fitness tracking.",
  slug: "/bmi-calculator",
  focusKeyword: "BMI Calculator Online",
  keywords: [
    "bmi calculator",
    "bmi calculator online",
    "calculate bmi",
    "body mass index calculator",
    "height and weight calculator",
    "free bmi calculator",
    "online bmi calculator",
    "check bmi online",
    "bmi tool",
    "weight calculator",
    "healthy weight calculator",
    "bmi chart",
    "calculate body mass index",
    "bmi calculator free tool",
    "fitness calculator",
    "health calculator",
    "ideal weight calculator",
    "obesity calculator",
    "underweight calculator",
    "overweight calculator",
    "bmi for men",
    "bmi for women",
    "adult bmi calculator",
    "bmi test online",
    "body fat calculator",
    "bmi scale",
    "weight status calculator",
    "body health index",
    "diet calculator",
    "nutrition calculator",
    "bmi tracker",
    "bmi meaning",
    "bmi range chart",
    "bmi calculator for adults",
    "bmi health assessment"
  ],
});

export default function Page() {
  return <ClientPage />;
}
