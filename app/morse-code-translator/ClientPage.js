"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function MorseCodeTranslatorPage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );

  function translateMorse() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text first.");
      return;
    }

    try {
      let translated = "";
      
      if (mode === "encode") {
        // Text to Morse
        translated = text.toUpperCase().split('').map(char => {
          if (morseCode[char]) {
            return morseCode[char];
          } else if (char === ' ') {
            return '/';
          } else {
            return '?';
          }
        }).join(' ');
      } else {
        // Morse to Text
        translated = text.split(' ').map(code => {
          if (reverseMorseCode[code]) {
            return reverseMorseCode[code];
          } else if (code === '/') {
            return ' ';
          } else {
            return '?';
          }
        }).join('');
      }

      const resultText = `# Morse Code Translation
# Generated on: ${new Date().toISOString()}

# Translation Settings
# Mode: ${mode === "encode" ? "Text to Morse" : "Morse to Text"}
# Input: ${text.length} characters
# Quality: High
# Format: Standard

# Translation Information
# - Mode: ${mode === "encode" ? "Text to Morse" : "Morse to Text"}
# - Input Length: ${text.length} characters
# - Output Length: ${translated.length} characters
# - Quality: High

# Translated Output
${translated}

# Translation Analysis
# - Mode: ${mode === "encode" ? "Text to Morse" : "Morse to Text"}
# - Input: ${text.length} characters
# - Output: ${translated.length} characters
# - Quality: High

# Usage Instructions
# 1. Enter or paste text
# 2. Select translation mode
# 3. Click "Translate Morse" to process
# 4. Copy the translated output

# Quality Notes
# - Accurate Morse code translation
# - Standard Morse code format
# - High-quality translation
# - Optimized for communication`;

      setResult(resultText);
      setMessage("✅ Morse code translated successfully!");
    } catch (error) {
      setMessage("❌ Error translating Morse code.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Translation copied to clipboard!");
  }

  function reset() {
    setText("");
    setMode("encode");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Morse Code Translator"
      subtitle="Translate Morse code online. Free Morse code translator with encoding and decoding options for communication and cryptography."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Morse Code Translator",
          description: "Translate Morse code online.",
          slug: "/morse-code-translator",
          category: "Utilities/Communication",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Morse Code Translator", slug: "/morse-code-translator" },
        ])}
      />

      <div className="space-y-4">
        {/* Status Messages */}
        {message && (
          <div className="px-3 py-2 bg-blue-100 border rounded text-blue-800 text-sm">
            {message}
          </div>
        )}

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste text here..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Translation Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="encode">Text to Morse</option>
            <option value="decode">Morse to Text</option>
          </select>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translation Result
            </label>
            <textarea
              value={result}
              readOnly
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={translateMorse}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            📡 Translate Morse
          </button>

          {result && (
            <button
              onClick={copyResult}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                         bg-blue-600 text-white shadow 
                         hover:bg-blue-700"
            >
              📋 Copy Result
            </button>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !result.trim()}
            className="px-5 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* Translation Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Translation Modes</h4>
          <div className="text-sm space-y-1">
            <div>• Text to Morse: Convert text to Morse code</div>
            <div>• Morse to Text: Convert Morse code to text</div>
            <div>• Standard Morse code format</div>
            <div>• High-quality translation</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
  <h3 className="text-lg font-semibold mb-2">About Morse Code Translation</h3>
  <p className="text-gray-700 mb-4">
    Morse code is one of the oldest and most fascinating methods of communication. 
    It was invented in the 1830s and 1840s by Samuel Morse and Alfred Vail, primarily 
    for use in telegraphy. Instead of letters, Morse code represents each character 
    with a unique series of short and long signals, traditionally known as &quot;dots&quot; and &quot;dashes.&quot; 

    For decades, it was the backbone of long-distance communication, enabling people to 
    send messages across continents and oceans in just seconds. Even today, Morse code 
    holds an important place in history, education, cryptography, and hobbyist communities.
    This online Morse Code Translator helps you bridge the gap between modern digital 
    text and the traditional Morse system. Whether you want to encode a secret message 
    into dots and dashes, or decode a string of Morse signals back into readable text, 
    this tool provides a simple and reliable way to do it. With just a few clicks, 
    you can practice, learn, or even use Morse in practical scenarios such as 
    ham radio communication, puzzle solving, or teaching students about the 
    history of communication.
  </p>

  <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Bidirectional Translation:</strong> Encode text into Morse or decode Morse back to text instantly.</li>
    <li><strong>Standard Format:</strong> Uses internationally recognized Morse code standards for accuracy.</li>
    <li><strong>Ease of Use:</strong> Just type or paste your content, select the mode, and click translate.</li>
    <li><strong>Copy to Clipboard:</strong> Instantly copy results for sharing or storing.</li>
    <li><strong>Learning Tool:</strong> Perfect for students and hobbyists exploring the world of Morse code.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
  <ol className="list-decimal list-inside text-gray-700 space-y-1">
    <li>Enter or paste your text into the input box.</li>
    <li>Select your preferred translation mode: <em>Text to Morse</em> or <em>Morse to Text</em>.</li>
    <li>Click the <strong>Translate Morse</strong> button to process your input.</li>
    <li>View the result instantly in the output box and copy it if needed.</li>
  </ol>

  <p className="text-gray-700 mt-3">
    The tool supports letters A–Z, digits 0–9, and spaces. Unsupported characters 
    are flagged with a question mark (?) to help you spot issues quickly.
  </p>

  <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Communication:</strong> Amateur radio operators (HAM) still use Morse for signaling worldwide.</li>
    <li><strong>Cryptography:</strong> Encode secret messages in puzzles, escape rooms, or spy games.</li>
    <li><strong>Education:</strong> Teachers use Morse to explain binary communication, history, and problem-solving.</li>
    <li><strong>Emergency:</strong> In situations with limited technology, Morse can be signaled with light, sound, or tapping.</li>
    <li><strong>Cultural and Historical:</strong> Explore how early telegraph systems revolutionized communication.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">📖 History of Morse Code</h4>
  <p className="text-gray-700 mb-4">
    Originally developed for use with the telegraph, Morse code was 
    a breakthrough technology. By sending electrical pulses over wires, 
    operators could transmit coded messages over vast distances. During 
    wars, especially World War II, Morse became a crucial tool for 
    naval, aviation, and intelligence communications. Even astronauts 
    once relied on Morse code during emergencies. Its simplicity—using 
    just two signal types—made it universally accessible, regardless 
    of language barriers or technology limitations.
  </p>

  <h4 className="font-semibold mt-4 mb-1">🌍 Relevance Today</h4>
  <p className="text-gray-700 mb-4">
    While digital communication methods like email and instant messaging 
    dominate today, Morse code remains surprisingly relevant. It is still 
    taught to amateur radio enthusiasts, used in military training, and 
    enjoyed by hobbyists around the world. Morse also finds its way into 
    pop culture, puzzles, movies, and survival training courses. For example, 
    tapping out “SOS” (... --- ...) on a surface or with a flashlight 
    is universally recognized as a distress signal.
  </p>

  <h4 className="font-semibold mt-4 mb-1">💡 Why Learn Morse Code?</h4>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li><strong>Practical Skill:</strong> Knowing Morse can be useful in emergencies where voice or digital communication fails.</li>
    <li><strong>Mental Exercise:</strong> Decoding Morse sharpens memory, focus, and pattern recognition.</li>
    <li><strong>Connection to History:</strong> It provides a hands-on understanding of how people communicated before modern tech.</li>
    <li><strong>Fun Challenge:</strong> Learning Morse can be turned into a game or puzzle activity with friends.</li>
  </ul>

  <h4 className="font-semibold mt-4 mb-1">🚀 Tips for Beginners</h4>
  <p className="text-gray-700 mb-4">
    If you’re just starting, focus on the most common letters first (like E, T, A, O, N, I). 
    Practice encoding short words, then move on to longer messages. Many learners use flashcards 
    or apps that play audio beeps of dots and dashes to build listening skills. Regular 
    practice—even just 5 minutes a day—can help you become fluent in reading and writing 
    Morse over time.
  </p>

  <h4 className="font-semibold mt-4 mb-1">⚡ Conclusion</h4>
  <p className="text-gray-700">
    Morse code may have been born in the 19th century, but it continues to fascinate 
    learners, communicators, and problem-solvers even in the 21st century. This translator 
    is more than just a tool—it’s a gateway to exploring history, enhancing your skills, 
    and even preparing for unexpected situations. Whether you’re a student, a radio operator, 
    or simply curious, using Morse code is a way of connecting the past with the present, 
    proving that some inventions truly stand the test of time.
  </p>
</section>
    </ToolSection>
  );
}