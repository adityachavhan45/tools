"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [allowDuplicates, setAllowDuplicates] = useState(true);

  function generateNumbers() {
    const minNum = parseInt(min) || 1;
    const maxNum = parseInt(max) || 100;
    const countNum = parseInt(count) || 1;

    if (minNum >= maxNum) {
      setMessage("⚠️ Minimum value must be less than maximum value.");
      setResult("");
      return;
    }

    if (countNum < 1 || countNum > 1000) {
      setMessage("⚠️ Count must be between 1 and 1000.");
      setResult("");
      return;
    }

    if (!allowDuplicates && countNum > (maxNum - minNum + 1)) {
      setMessage("⚠️ Cannot generate more unique numbers than available in range.");
      setResult("");
      return;
    }

    try {
      let numbers = [];
      
      if (allowDuplicates) {
        for (let i = 0; i < countNum; i++) {
          numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
        }
      } else {
        const available = [];
        for (let i = minNum; i <= maxNum; i++) {
          available.push(i);
        }
        for (let i = 0; i < countNum; i++) {
          const randomIndex = Math.floor(Math.random() * available.length);
          numbers.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
      }

      const minimal = countNum === 1
        ? String(numbers[0])
        : numbers.map((n, i) => `${i + 1}. ${n}`).join('\n');
      setResult(minimal);
      setMessage("✅ Random numbers generated successfully!");
    } catch (error) {
      setMessage("❌ Error generating random numbers.");
      setResult("");
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setMessage("📋 Generated numbers copied to clipboard!");
    }
  }

  function reset() {
    setMin("1");
    setMax("100");
    setCount("1");
    setResult("");
    setMessage("");
    setAllowDuplicates(true);
  }

  return (
    <ToolSection
      title="Random Number Generator - Free Online Tool"
      subtitle="Generate random numbers instantly with our free online random number generator. Perfect for statistics, gaming, research, education, and decision-making with customizable range options."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Random Number Generator",
          description: "Generate random numbers online with customizable range and batch generation options.",
          slug: "/random-number-generator",
          category: "Utilities/Math",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Random Number Generator", slug: "/random-number-generator" },
        ])}
      />

      <div className="max-w-5xl mx-auto mb-8">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm mb-8">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Random Number Generator
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Generate random numbers instantly with custom range, count, and duplicate control.
          </p>
        </div>

      {/* Main Tool Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="space-y-6">
          {/* Status Messages */}
          {message && (
            <div className="px-4 py-3 bg-cyan-50 border border-cyan-200 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-800">{message}</p>
            </div>
          )}

          {/* Range Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Minimum Value
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-all text-lg"
                placeholder="Enter minimum"
              />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Maximum Value
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-all text-lg"
                placeholder="Enter maximum"
              />
            </div>
          </div>

          {/* Count Input */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How Many Numbers to Generate? (1-1000)
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 transition-all text-lg"
              placeholder="Enter count"
            />
          </div>

          {/* Duplicates Toggle */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="w-5 h-5 text-cyan-700 rounded focus:ring-2 focus:ring-cyan-600"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Allow duplicate numbers
              </span>
            </label>
          </div>

          {/* Result Output */}
          {result && (
            <div className="bg-white rounded-xl p-6 shadow-md border border-cyan-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎲 Your Generated Numbers
              </label>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words font-mono text-base text-gray-800 leading-relaxed">
                  {result}
                </pre>
              </div>
            </div>
          )}

          {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={generateNumbers}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-700 to-blue-700 text-white font-semibold shadow-lg hover:from-cyan-800 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-xl">🎲</span>
              Generate Random Numbers
            </button>

            {result && (
              <button
                onClick={copyResult}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
              >
                <span className="text-xl">📋</span>
                Copy to Clipboard
              </button>
            )}

            <button
              onClick={reset}
              className="px-6 py-4 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              🔄 Reset All
            </button>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-5 border border-blue-200">
            <h4 className="text-base font-bold text-indigo-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              Quick Generator Info
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Range:</strong> Custom min and max values</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Batch:</strong> Generate up to 1000 numbers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Type:</strong> Integer numbers only</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Privacy:</strong> 100% browser-based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Comprehensive Information Section */}
      <article className="prose prose-lg max-w-5xl mx-auto">
  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Complete Guide to Online Random Number Generation
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Random number generation has become an important part of modern digital
        workflows. From educational activities and scientific research to gaming,
        software testing, and business operations, random numbers help create
        fair, unbiased, and unpredictable outcomes. Instead of relying on manual
        guessing or human choices, digital generators provide mathematically
        randomized values instantly.
      </p>

      <p>
        Humans naturally struggle to create true randomness. Most people
        unintentionally repeat patterns, avoid specific numbers, or follow hidden
        habits while making selections. Computer-based random number generators
        solve this problem by using algorithms that produce statistically random
        results suitable for practical applications.
      </p>

      <p>
        Whether someone needs a single lucky number, hundreds of randomized
        entries, or data for simulations and analysis, an online random number
        generator makes the process fast, accurate, and reliable without
        requiring technical expertise.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Randomness Matters in Real-World Situations
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Randomness is essential whenever fairness and unpredictability are
        important. Schools use random selection for classroom participation and
        project assignments. Businesses use randomization during surveys, quality
        testing, and prize draws. Developers use random values for testing
        software systems under different conditions.
      </p>

      <p>
        Gaming platforms depend heavily on random number generation to create
        balanced and engaging experiences. Dice simulations, card shuffling,
        loot systems, and event triggers all rely on randomized outcomes to keep
        gameplay unpredictable and enjoyable.
      </p>

      <p>
        Scientific and statistical research also relies on random sampling to
        avoid biased results. Proper randomization helps researchers produce more
        accurate studies and reliable conclusions.
      </p>

      <p>
        Users working with statistical or educational calculations may also find{" "}
        <a
          href="https://convertixy.com/percentage-calculator"
          className="text-blue-600 font-medium hover:underline"
        >
          Percentage Calculator
        </a>{" "}
        useful when analyzing generated datasets and probability outcomes.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Important Features of a Good Random Number Generator
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        A high-quality random number generator should provide flexibility,
        simplicity, and fast performance. Users need the ability to define their
        own minimum and maximum values depending on the type of task they are
        performing.
      </p>

      <p>
        Batch generation is another extremely useful feature because it allows
        users to create multiple random numbers simultaneously instead of
        repeating the process manually over and over again.
      </p>

      <p>
        Duplicate control is equally important. Some situations require repeated
        values, while others need unique selections without repetition. A good
        generator should support both scenarios efficiently.
      </p>

      <p>
        Instant copy functionality also improves productivity by allowing users
        to transfer generated results quickly into spreadsheets, research
        documents, programming projects, or reports.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      How Browser-Based Random Number Generation Works
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Modern browser-based generators use built-in JavaScript algorithms to
        create pseudo-random values instantly inside the browser itself. This
        means all calculations happen locally on the device without requiring
        external processing servers.
      </p>

      <p>
        Local browser processing improves both speed and privacy because data
        does not need to be uploaded online during generation. Users can produce
        random results instantly while maintaining full control over their
        information.
      </p>

      <p>
        Browser-based systems also work across different operating systems and
        devices including Windows, Linux, Mac, Android, and iOS, making them
        highly accessible for students, professionals, and developers.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Practical Educational Applications
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Teachers frequently use random number generators to create fair classroom
        participation systems and unbiased group assignments. Instead of choosing
        students manually, random selection ensures equal opportunities for
        everyone.
      </p>

      <p>
        Mathematics and statistics teachers also use random values for creating
        practice problems, probability exercises, and data analysis activities.
        Students gain a better understanding of randomness and statistical
        behavior through real examples.
      </p>

      <p>
        Educational institutions often rely on randomization for competitions,
        quiz systems, and project topic allocation because it removes favoritism
        and improves transparency.
      </p>

      <p>
        Students working with large numeric datasets may additionally use{" "}
        <a
          href="https://convertixy.com/average-calculator"
          className="text-blue-600 font-medium hover:underline"
        >
          Average Calculator
        </a>{" "}
        to evaluate generated values and perform faster data analysis.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Business and Professional Use Cases
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Businesses use random number generation for surveys, customer giveaways,
        employee recognition systems, testing processes, and market research.
        Random sampling helps organizations gather more balanced and unbiased
        information.
      </p>

      <p>
        Quality assurance teams often select random products for inspection
        during manufacturing processes. This improves reliability and helps
        identify issues without introducing selection bias.
      </p>

      <p>
        Marketing campaigns also use random selection systems for contests,
        promotional rewards, and audience engagement activities where fairness is
        important.
      </p>

      <p>
        Companies handling analytical reports may also combine random data
        workflows with{" "}
        <a
          href="https://convertixy.com/number-to-words-converter"
          className="text-blue-600 font-medium hover:underline"
        >
          Number to Words Converter
        </a>{" "}
        for documentation and reporting purposes.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Understanding Pseudo-Random Algorithms
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Most online generators use pseudo-random algorithms instead of true
        physical randomness. These algorithms rely on mathematical formulas that
        produce sequences appearing random for practical use cases.
      </p>

      <p>
        While technically deterministic at a mathematical level, modern
        pseudo-random systems pass advanced statistical tests and behave
        unpredictably enough for education, gaming, simulations, and general
        applications.
      </p>

      <p>
        True randomness is mainly required for specialized cryptographic and
        high-security systems. For everyday digital tasks, browser-based
        pseudo-random generators provide more than sufficient reliability and
        accuracy.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Why Privacy Matters in Online Tools
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Privacy has become increasingly important in modern online tools. Many
        users prefer browser-based applications because they avoid unnecessary
        server uploads and third-party data storage.
      </p>

      <p>
        A locally processed random number generator ensures that generated values
        remain private and are not transmitted externally. This creates safer
        workflows for educational institutions, businesses, and individuals
        handling confidential projects.
      </p>

      <p>
        Browser-based systems also improve accessibility because they usually
        require no installations, registrations, or subscriptions to start
        generating numbers immediately.
      </p>
    </div>
  </section>

  <section className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Frequently Asked Questions
    </h2>

    <div
      className="space-y-6 text-gray-700"
      style={{ textAlign: "justify" }}
    >
      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Are the generated numbers truly random?
        </h3>

        <p className="leading-relaxed">
          Most browser-based tools use pseudo-random algorithms that are
          statistically random for practical applications like gaming,
          education, simulations, and data analysis.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can I generate multiple numbers at once?
        </h3>

        <p className="leading-relaxed">
          Yes. Batch generation allows users to create many random values
          simultaneously for faster workflows and large datasets.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Does the generator support unique values only?
        </h3>

        <p className="leading-relaxed">
          Most advanced generators provide duplicate control options so users can
          choose between repeated values or unique selections.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Is browser-based generation safe?
        </h3>

        <p className="leading-relaxed">
          Yes. Since calculations happen locally inside the browser, generated
          numbers usually remain private and are not uploaded externally.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Can random number generators be used for research?
        </h3>

        <p className="leading-relaxed">
          Yes. Researchers commonly use randomization for sampling, experiments,
          surveys, and statistical analysis to reduce bias.
        </p>
      </div>

      <div className="border-l-4 border-indigo-500 pl-6 py-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Do I need software installation to use the tool?
        </h3>

        <p className="leading-relaxed">
          No. Modern browser-based generators work directly online without
          requiring software installation or technical setup.
        </p>
      </div>
    </div>
  </section>

  <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-md p-6 md:p-10">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
      Final Thoughts
    </h2>

    <div
      className="text-gray-700 leading-relaxed space-y-5"
      style={{ textAlign: "justify" }}
    >
      <p>
        Random number generators are valuable tools for education, gaming,
        business operations, scientific research, and everyday decision-making.
        They remove human bias while creating fast and reliable randomized
        outcomes for countless practical applications.
      </p>

      <p>
        Browser-based generators provide additional benefits including privacy,
        accessibility, and instant performance without requiring software
        installation or server-side processing.
      </p>

      <p>
        Whether you need random values for classroom activities, professional
        analysis, simulations, contests, or personal projects, a reliable random
        number generator simplifies the process while maintaining fairness,
        speed, and usability across all devices and platforms.
      </p>

      <p>
        Users working with analytical or educational workflows may also benefit
        from{" "}
        <a
          href="https://convertixy.com/scientific-calculator"
          className="text-blue-600 font-medium hover:underline"
        >
          Scientific Calculator
        </a>{" "}
        for advanced mathematical calculations and statistical operations.
      </p>
    </div>
  </section>
</article>
    </ToolSection>
  );
}
