"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function BmiCalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [bmiValue, setBmiValue] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [hasResult, setHasResult] = useState(false);

  function calculateBMI() {
    if (!height.trim() || !weight.trim()) {
      setMessage("Please enter both height and weight.");
      return;
    }
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    if (isNaN(heightValue) || isNaN(weightValue)) {
      setMessage("Please enter valid numbers for height and weight.");
      return;
    }
    if (heightValue <= 0 || weightValue <= 0) {
      setMessage("Height and weight must be positive numbers.");
      return;
    }
    try {
      let heightInMeters = heightValue;
      let weightInKg = weightValue;
      if (unit === "imperial") {
        heightInMeters = heightValue * 0.0254;
        weightInKg = weightValue * 0.453592;
      }
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      let cat = "";
      let color = "";
      if (bmi < 18.5) {
        cat = "Underweight";
        color = "blue";
      } else if (bmi < 25) {
        cat = "Normal weight";
        color = "green";
      } else if (bmi < 30) {
        cat = "Overweight";
        color = "amber";
      } else {
        cat = "Obese";
        color = "red";
      }
      setBmiValue(bmi);
      setCategory(cat);
      setCategoryColor(color);
      setHasResult(true);
      setMessage("");
      setResult(`BMI Calculator Result\nGenerated: ${new Date().toLocaleString()}\n\nHeight: ${heightValue} ${unit === "metric" ? "cm" : "inches"}\nWeight: ${weightValue} ${unit === "metric" ? "kg" : "lbs"}\n\nBMI: ${bmi.toFixed(1)}\nCategory: ${cat}`);
    } catch {
      setMessage("Something went wrong. Please check your inputs and try again.");
    }
  }

  function copyResult() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setMessage("Result copied to clipboard.");
  }

  function reset() {
    setHeight("");
    setWeight("");
    setUnit("metric");
    setResult("");
    setMessage("");
    setBmiValue(0);
    setCategory("");
    setCategoryColor("");
    setHasResult(false);
  }

  const sidebar = (
    <div className="space-y-4 text-sm text-gray-700 text-justify">
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="font-semibold text-blue-900 mb-2">Formula</p>
        <p className="text-blue-800 text-justify">
          BMI = weight (kg) ÷ height (m)². Metric: use cm and kg. Imperial: use inches and lbs; the tool converts to metric for calculation.
        </p>
      </div>
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="font-semibold text-amber-900 mb-2">Tip</p>
        <p className="text-amber-800 text-justify">
          BMI is a screening tool only. It does not replace a doctor&apos;s advice. For a full health assessment, consult a healthcare provider.
        </p>
      </div>
    </div>
  );

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    red: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <ToolSection
      title="BMI Calculator"
      subtitle="Calculate your Body Mass Index from height and weight. Free tool with metric and imperial units. For general awareness only not a substitute for medical advice."
      plain
      plainSidebar
      whiteBackground
      sidebar={sidebar}
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "BMI Calculator",
          description: "Calculate Body Mass Index from height and weight (metric or imperial).",
          slug: "/bmi-calculator",
          category: "Utilities/Health",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "BMI Calculator", slug: "/bmi-calculator" },
        ])}
      />

      <div className="space-y-6">
        {message && (
          <div
            role="alert"
            className="px-4 py-3 text-sm rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-justify"
          >
            {message}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Enter your details</h2>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1.5">Unit system</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="metric">Metric (cm, kg)</option>
              <option value="imperial">Imperial (inches, lbs)</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1.5">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <input
                id="height"
                type="number"
                step={unit === "metric" ? "1" : "0.1"}
                min="1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 170" : "e.g. 67"}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1.5">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <input
                id="weight"
                type="number"
                step="0.1"
                min="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={calculateBMI}
              disabled={!height.trim() || !weight.trim()}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none transition-colors"
            >
              Calculate BMI
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {hasResult && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Your BMI result</h3>
              <p className="text-indigo-100 text-sm mt-0.5">Based on the height and weight you entered</p>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-3xl font-bold text-gray-900">{bmiValue.toFixed(1)}</p>
                <p className="text-sm text-gray-600 mt-1">BMI</p>
              </div>
              <div className={`text-center p-4 rounded-xl border ${colorClasses[categoryColor] || colorClasses.green}`}>
                <p className="text-xl font-bold">{category}</p>
                <p className="text-sm mt-1 opacity-90">Category</p>
              </div>
            </div>
            <div className="px-5 pb-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyResult}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Copy result
              </button>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">BMI categories</h4>
          <ul className="text-sm text-gray-700 space-y-1 text-justify">
            <li><strong>Underweight:</strong> BMI &lt; 18.5</li>
            <li><strong>Normal weight:</strong> BMI 18.5–24.9</li>
            <li><strong>Overweight:</strong> BMI 25–29.9</li>
            <li><strong>Obese:</strong> BMI ≥ 30</li>
          </ul>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify" aria-labelledby="about-bmi-heading">
        <h2 id="about-bmi-heading" className="text-xl font-semibold text-gray-900 mb-4">About the BMI Calculator</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This free BMI Calculator computes your Body Mass Index from your height and weight. You can use metric (centimetres and kilograms) or imperial (inches and pounds). The result is grouped into standard categories: underweight, normal weight, overweight, and obese. BMI is a simple screening tool and is not a substitute for medical advice. Use it for general awareness only; for health decisions, always consult a healthcare provider.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to use</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Select <strong>Metric</strong> (cm, kg) or <strong>Imperial</strong> (inches, lbs).</li>
          <li>Enter your height and weight in the fields above.</li>
          <li>Click <strong>Calculate BMI</strong> to see your BMI value and category.</li>
          <li>Use <strong>Copy result</strong> to save or share the summary.</li>
        </ol>

        <h2 id="bmi-guide" className="text-xl font-semibold text-gray-900 mt-10 mb-4">BMI and Health: A Complete Guide</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Body Mass Index (BMI) is a number derived from a person&apos;s weight and height. It is used worldwide as a quick way to classify whether someone is underweight, normal weight, overweight, or obese. BMI does not measure body fat or health directly, but it is widely used in public health, research, and clinical practice as a screening tool. Understanding what BMI means and its limitations helps you use this calculator sensibly and follow up with a doctor when needed.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">What is BMI and how is it calculated?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          BMI is weight in kilograms divided by the square of height in metres. In formula form: BMI = weight (kg) ÷ height (m)². For example, if you weigh 70 kg and are 1.75 m tall, your BMI is 70 ÷ (1.75 × 1.75) ≈ 22.9. If you use imperial units, the calculator converts inches to metres and pounds to kilograms before applying the same formula. The result is a single number that is then compared to standard ranges to assign a category. These ranges (under 18.5, 18.5–24.9, 25–29.9, and 30 or over) were established by health bodies such as the World Health Organization and are used for adults aged 18 and over. They are not applied to children or adolescents, who need age- and sex-specific charts.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Why BMI is used</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          BMI is used because it is simple to calculate, requires only height and weight, and has been studied in large populations. In groups, higher BMI is associated with higher risk of conditions such as type 2 diabetes, heart disease, and certain cancers. So at a population level, BMI is useful for tracking trends and planning health policies. For individuals, it can be a starting point for a conversation with a doctor about weight and lifestyle. Many employers, insurers, and wellness programmes use BMI as one of several metrics. Schools and sports organisations sometimes use it for screening, though for young people age- and sex-specific standards must be used instead of adult categories.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Limitations of BMI</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          BMI has important limitations. It does not distinguish between fat and muscle. A very muscular person may have a high BMI but low body fat and good health. Conversely, someone with a &quot;normal&quot; BMI might have high body fat and poor fitness. BMI also does not account for where fat is stored; abdominal fat is more strongly linked to health risks than fat in other areas. It does not consider age, sex, or ethnicity, although some guidelines suggest different cut-offs for certain ethnic groups. Older adults may have less muscle mass, so the same BMI might mean something different for them. For these reasons, BMI should never be used alone to diagnose obesity or to make treatment decisions. It is a screening tool that can prompt further assessment (e.g. waist circumference, body composition, blood tests) by a healthcare provider.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Underweight (BMI &lt; 18.5)</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          A BMI below 18.5 is classified as underweight. This can be due to low calorie intake, high activity, illness, or genetics. Being underweight may increase the risk of weakened bones, weakened immunity, and fatigue. It is not healthy to aim for an underweight BMI; if your result falls in this range, a doctor or dietitian can help you understand why and whether you need to gain weight safely. Do not use this calculator to encourage or maintain underweight status; that can be harmful.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Normal weight (BMI 18.5–24.9)</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          A BMI between 18.5 and 24.9 is generally considered the &quot;normal&quot; or &quot;healthy weight&quot; range for adults. This does not guarantee good health on its own; diet, activity, sleep, and mental health all matter. Many people in this range still benefit from improving diet and exercise. The range is broad, so two people with the same BMI can have different body compositions and health risks. Use this range as a rough guide, not as a target that guarantees wellness.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Overweight (BMI 25–29.9)</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          A BMI between 25 and 29.9 is classified as overweight. In population studies, this range is associated with a higher risk of conditions like diabetes and heart disease compared with the normal range. For an individual, the meaning depends on body composition, age, and other factors. Some people in this range are fit and healthy; others may benefit from lifestyle changes. A doctor can help you decide whether weight loss or other interventions are appropriate. Do not rely on BMI alone to judge your health; consider how you feel, your activity level, and any symptoms or family history.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Obese (BMI ≥ 30)</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          A BMI of 30 or higher is classified as obese. This category is associated with a higher risk of many health conditions, including type 2 diabetes, heart disease, stroke, and some cancers. Obesity is a complex condition influenced by genetics, environment, diet, activity, and other factors. Treatment may include lifestyle changes, counselling, or medical interventions, and should be guided by a healthcare provider. This calculator does not diagnose obesity; it only gives a number and category. A full assessment and plan should come from a doctor or specialist.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Who should not use adult BMI categories?</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          Adult BMI categories (under 18.5, 18.5–24.9, etc.) are intended for people aged 18 and over. Children and teenagers should not be classified using these ranges because their healthy weight varies with age and sex. Paediatricians use BMI-for-age percentile charts instead. Pregnant women should not use BMI to assess healthy weight during pregnancy; that is managed by prenatal care. If you are under 18, pregnant, or have a condition that affects weight or body composition, use this tool for general interest only and rely on your doctor for interpretation.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Metric vs imperial</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          This calculator supports both metric (height in centimetres, weight in kilograms) and imperial (height in inches, weight in pounds) units. The formula is the same; the tool converts imperial values to metric before calculating. Make sure you select the correct unit system and enter numbers in the right units to avoid errors. Double-check that you did not mix units (e.g. height in cm and weight in lbs) as that would give a wrong result.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Using your result</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          After you get your BMI and category, use the information as a starting point, not a final verdict. If you are concerned about your weight or health, book an appointment with a doctor or nurse. They can consider your age, sex, medical history, and other measures (e.g. waist size, blood pressure, blood sugar) and give you personalised advice. Do not start a strict diet or exercise programme based only on BMI; get guidance from a professional. If you are tracking your BMI over time (e.g. during a lifestyle change), remember that small fluctuations are normal and that other outcomes (energy, fitness, lab results) matter too.
        </p>

        <h4 className="font-semibold text-gray-900 mt-6 mb-2">Summary</h4>
        <p className="text-gray-700 leading-relaxed mb-4">
          The BMI Calculator gives you a quick way to see where your weight falls relative to standard adult categories. Enter your height and weight in metric or imperial, and get your BMI and category. Use the result for general awareness only. BMI does not replace a medical check-up or professional advice. For a full picture of your health, see a healthcare provider and use BMI as one of many tools.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Disclaimer</h3>
        <p className="text-gray-700 leading-relaxed">
          This tool is for general information only. It does not provide medical advice, diagnosis, or treatment. BMI is a screening measure with known limitations. Always consult a qualified healthcare provider for health-related decisions. Do not use this calculator for children, during pregnancy, or as the sole basis for diet or exercise changes.
        </p>
      </section>
    </ToolSection>
  );
}
