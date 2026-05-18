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
      whiteBackground
      hideSidebar
      centerHeader
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

        <div className="grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="font-semibold text-blue-900 mb-2">Formula</p>
            <p className="text-blue-800 text-sm text-justify">
              BMI = weight (kg) ÷ height (m)². Metric: use cm and kg. Imperial: use inches and lbs; the tool converts to metric for calculation.
            </p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <p className="font-semibold text-amber-900 mb-2">Tip</p>
            <p className="text-amber-800 text-sm text-justify">
              BMI is a screening tool only. It does not replace a doctor&apos;s advice. For a full health assessment, consult a healthcare provider.
            </p>
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

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-justify">

  <h2
    id="about-bmi-heading"
    className="text-2xl font-bold text-gray-900 mb-4"
  >
    About the BMI Calculator
  </h2>

  <p className="text-gray-700 leading-relaxed mb-4">
    The BMI Calculator helps users understand whether their body weight falls within a healthy range based on height
    and weight measurements. BMI stands for Body Mass Index, which is one of the most commonly used methods for
    estimating weight categories such as underweight, normal weight, overweight, and obesity.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many people use BMI calculators to track fitness goals, monitor weight changes, improve lifestyle habits, or gain
    general awareness about health conditions linked to body weight. The calculator works using a mathematical formula
    that compares weight with height to generate a BMI value.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Although BMI does not directly measure body fat, it is widely used across healthcare, fitness, wellness, and
    research industries because it provides a simple way to estimate whether body weight may create health risks.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    What BMI Actually Means
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    BMI or Body Mass Index is calculated by dividing body weight by the square of height. The resulting number helps
    classify body weight into standard categories used worldwide.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Healthcare professionals often use BMI as an initial screening method because it provides quick information without
    requiring advanced equipment or laboratory testing. While BMI alone cannot determine overall health, it helps
    identify whether additional medical evaluation may be necessary.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    People monitoring long-term fitness progress also calculate age-related health information using the{" "}
    <a
      href="/age-calculator"
      className="text-blue-600 underline font-medium"
    >
      Age Calculator
    </a>{" "}
    because metabolism, body composition, and calorie needs often change over time.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why BMI Is Used Worldwide
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    BMI became popular because it is simple, fast, and easy to calculate. Hospitals, schools, fitness centers,
    insurance companies, and public health organizations use BMI as a standard screening method to estimate weight
    categories across large populations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Since BMI only requires height and weight, it allows quick comparisons without expensive medical tools. Public
    health organizations use BMI data to study obesity trends, nutritional problems, and lifestyle-related diseases
    across different countries and age groups.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many users also track calorie intake, body weight changes, and fitness planning alongside the{" "}
    <a
      href="/percentage-calculator"
      className="text-blue-600 underline font-medium"
    >
      Percentage Calculator
    </a>{" "}
    while measuring weight-loss progress or calculating improvement percentages during fitness programs.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Understanding BMI Categories
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    BMI values are generally grouped into four major categories: underweight, normal weight, overweight, and obese.
    These categories help estimate whether body weight may increase health risks over time.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    A lower BMI may sometimes indicate nutritional deficiencies, weakened immunity, or health problems caused by low
    body weight. On the other hand, higher BMI values are often associated with increased risk of conditions such as
    diabetes, heart disease, high blood pressure, and joint problems.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    However, BMI should never be treated as a complete diagnosis. Muscle mass, genetics, lifestyle, age, and body
    composition also influence overall health.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Limitations of BMI
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Although BMI is useful for general screening, it has important limitations. The formula cannot distinguish between
    muscle and fat. Athletes or highly muscular individuals may have a high BMI despite having low body fat and good
    physical health.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Similarly, some individuals with normal BMI may still have poor fitness levels or unhealthy body fat distribution.
    This is why doctors often combine BMI with additional health indicators such as blood pressure, diet quality,
    physical activity, and medical history.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users tracking health records and lifestyle reports sometimes organize documents using the{" "}
    <a
      href="/pdf-merge"
      className="text-blue-600 underline font-medium"
    >
      PDF Merge Tool
    </a>{" "}
    while managing medical or fitness-related reports digitally.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    BMI and Fitness Goals
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many people use BMI calculators while starting fitness journeys, joining gyms, or planning healthier routines.
    Tracking BMI over time helps users observe weight changes and maintain awareness about progress.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    However, healthy progress should focus on long-term consistency instead of extreme dieting or rapid weight-loss
    trends. Sustainable improvements in nutrition, exercise, sleep, hydration, and mental wellness are generally more
    beneficial than temporary short-term changes.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users planning long-term wellness goals often estimate savings for gym memberships, healthcare expenses, or
    investments using the{" "}
    <a
      href="/sip-calculator"
      className="text-blue-600 underline font-medium"
    >
      SIP Calculator
    </a>{" "}
    and the{" "}
    <a
      href="/compound-interest-calculator"
      className="text-blue-600 underline font-medium"
    >
      Compound Interest Calculator
    </a>{" "}
    while preparing future financial plans.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    BMI in Healthcare and Medicine
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Doctors and healthcare providers frequently use BMI during routine health checkups because body weight strongly
    influences many medical conditions. Higher BMI values may increase the risk of cardiovascular disease, diabetes,
    sleep disorders, and mobility issues.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    At the same time, extremely low BMI values may indicate nutritional problems, eating disorders, or underlying
    health conditions requiring medical attention.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    BMI screening is especially useful during preventive healthcare because early awareness allows individuals to make
    healthier lifestyle choices before serious health complications develop.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Why Online BMI Calculators Save Time
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Manual BMI calculation requires formula conversion and unit adjustments, especially when users work with both
    metric and imperial measurements. Online calculators simplify this process by instantly generating accurate BMI
    values without requiring mathematical calculations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Browser-based tools improve convenience because users can quickly calculate BMI from any device without
    downloading software or creating accounts.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users converting fitness schedules, diet plans, or progress reports into shareable formats also use tools like the{" "}
    <a
      href="/images-to-pdf"
      className="text-blue-600 underline font-medium"
    >
      Images to PDF Tool
    </a>{" "}
    for easier record management.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Importance of Healthy Lifestyle Beyond BMI
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Good health depends on more than body weight alone. Diet quality, physical activity, hydration, sleep, stress
    management, and mental wellness all contribute to overall health and quality of life.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Many individuals focus only on appearance-based goals while ignoring long-term health habits. Sustainable
    improvements generally come from balanced routines rather than extreme restrictions or unrealistic expectations.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users organizing personal wellness plans, schedules, or health reminders sometimes create accessible sharing links
    using the{" "}
    <a
      href="/qr-code"
      className="text-blue-600 underline font-medium"
    >
      QR Code Generator
    </a>{" "}
    for easier access across mobile devices.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Privacy and User Safety
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    Privacy matters while using online health-related tools. This BMI Calculator performs calculations directly inside
    the browser without storing sensitive personal information or requiring account registration.
  </p>

  <p className="text-gray-700 leading-relaxed mb-4">
    Users who maintain personal health accounts or online medical records also improve account safety using the{" "}
    <a
      href="/password-generator"
      className="text-blue-600 underline font-medium"
    >
      Password Generator
    </a>{" "}
    and verify stronger credentials through the{" "}
    <a
      href="/password-strength-checker"
      className="text-blue-600 underline font-medium"
    >
      Password Strength Checker
    </a>{" "}
    before storing private information online.
  </p>

  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
    Final Thoughts
  </h3>

  <p className="text-gray-700 leading-relaxed mb-4">
    The BMI Calculator provides a quick and simple way to estimate whether body weight falls within a healthy range
    based on height and weight measurements. It is useful for general health awareness, fitness planning, weight
    monitoring, and wellness tracking.
  </p>

  <p className="text-gray-700 leading-relaxed">
    Although BMI has limitations, it remains one of the most widely used screening methods across healthcare and
    fitness industries. Users should treat BMI as a starting point for understanding health rather than a complete
    diagnosis, and combine it with healthy lifestyle habits and professional medical guidance whenever necessary.
  </p>

</section>
    </ToolSection>
  );
}
