import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "BMI Calculator Online — Calculate Body Mass Index Instantly",
  description:
    "Free BMI Calculator online. Instantly calculate your Body Mass Index using height and weight. Check if you are underweight, healthy, overweight, or obese. Simple, accurate BMI tool for fitness, diet, and health tracking.",
  slug: "/bmi-calculator",
  keywords:
    "bmi calculator, body mass index, calculate bmi, free bmi calculator, online bmi calculator, bmi tool, check bmi, weight calculator, height weight bmi calculator, healthy weight calculator, bmi chart, calculate body mass index, bmi calculator online free, bmi test, fitness calculator, health calculator, ideal weight calculator, obesity calculator, underweight calculator, overweight calculator, bmi for men, bmi for women, adult bmi calculator, bmi check online, body fat calculator, bmi scale, weight status calculator, body health index, diet calculator, nutrition calculator, bmi tracker"
});

export default function Page() {
  return <ClientPage />;
}