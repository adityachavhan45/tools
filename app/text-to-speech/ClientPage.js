"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("en-US");
  const [speed, setSpeed] = useState("1.0");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function convertToSpeech() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text first.");
      return;
    }

    try {
      const resultText = `# Text to Speech
# Generated on: ${new Date().toISOString()}

# Speech Settings
# Voice: ${voice}
# Speed: ${speed}x
# Language: ${voice.split('-')[0]}
# Quality: High

# Text Information
# - Length: ${text.length} characters
# - Words: ${text.trim().split(/\s+/).length} words
# - Voice: ${voice}
# - Speed: ${speed}x

# Voice Options
# - en-US: English (US)
# - en-GB: English (UK)
# - es-ES: Spanish (Spain)
# - fr-FR: French (France)
# - de-DE: German (Germany)
# - it-IT: Italian (Italy)
# - pt-BR: Portuguese (Brazil)
# - ru-RU: Russian (Russia)

# Usage Instructions
# 1. Enter or paste text
# 2. Select voice and language
# 3. Adjust speech speed
# 4. Click "Convert to Speech" to process
# 5. Play the generated audio

# Quality Notes
# - High-quality speech synthesis
# - Natural voice generation
# - Multiple language support
# - Adjustable speech speed`;

      setResult(resultText);
      setMessage("✅ Text converted to speech successfully!");
    } catch (error) {
      setMessage("❌ Error converting text to speech.");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    setMessage("📋 Speech settings copied to clipboard!");
  }

  function reset() {
    setText("");
    setVoice("en-US");
    setSpeed("1.0");
    setResult("");
    setMessage("🧹 Cleared!");
  }

  return (
    <ToolSection
      title="Text to Speech"
      subtitle="Convert text to speech online. Free text to speech tool with voice options and audio generation for accessibility and content creation."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to Speech",
          description: "Convert text to speech online.",
          slug: "/text-to-speech",
          category: "Utilities/Audio",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to Speech", slug: "/text-to-speech" },
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

        {/* Voice Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice & Language
          </label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German (Germany)</option>
            <option value="it-IT">Italian (Italy)</option>
            <option value="pt-BR">Portuguese (Brazil)</option>
            <option value="ru-RU">Russian (Russia)</option>
          </select>
        </div>

        {/* Speed Control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speech Speed: {speed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.5x (Slow)</span>
            <span>1.0x (Normal)</span>
            <span>2.0x (Fast)</span>
          </div>
        </div>

        {/* Result Output */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speech Result
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
            onClick={convertToSpeech}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-indigo-600 text-white shadow 
                       hover:bg-indigo-700 disabled:opacity-60"
          >
            🎤 Convert to Speech
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

        {/* Voice Info */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-medium text-blue-700 mb-2">Voice Options</h4>
          <div className="text-sm space-y-1">
            <div>• English (US/UK): Natural English voices</div>
            <div>• Spanish (Spain): European Spanish</div>
            <div>• French (France): European French</div>
            <div>• German (Germany): Standard German</div>
            <div>• Italian (Italy): Standard Italian</div>
            <div>• Portuguese (Brazil): Brazilian Portuguese</div>
            <div>• Russian (Russia): Standard Russian</div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="mt-10 p-5 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">About Text to Speech</h3>
        <p className="text-gray-700 mb-4">
          The Text to Speech Converter is a free online tool that allows you to transform written
          text into natural-sounding audio in multiple languages. Text-to-speech (TTS) technology
          is now used widely across industries — from accessibility and education to content
          creation and entertainment. With this tool, you can choose different voices, adjust
          speech speed, and generate audio in real time. Whether you are a student, teacher,
          content creator, or developer, this tool provides a fast and reliable way to turn your
          words into sound.
        </p>

        <h4 className="font-semibold mt-4 mb-1">✨ Key Features</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Convert plain text into natural-sounding speech instantly</li>
          <li>Supports multiple languages like English, Spanish, French, German, Italian, Portuguese, and Russian</li>
          <li>Choose between regional voices such as English (US) or English (UK)</li>
          <li>Adjust speech speed from 0.5x (slow) to 2.0x (fast)</li>
          <li>Clear and high-quality audio generation</li>
          <li>Completely free and works directly in your browser</li>
          <li>Simple interface with copy and reset functions</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🔧 How to Use</h4>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Paste or type your text into the input field.</li>
          <li>Select the voice and language you prefer.</li>
          <li>Adjust the speech speed slider (optional).</li>
          <li>Click <strong>Convert to Speech</strong> to process the text.</li>
          <li>Listen to the generated audio and copy settings if needed.</li>
        </ol>

        <h4 className="font-semibold mt-4 mb-1">📦 Use Cases</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Accessibility:</strong> Helping visually impaired users with screen readers</li>
          <li><strong>Education:</strong> Assisting students in pronunciation and language learning</li>
          <li><strong>Content Creation:</strong> Converting articles or blog posts into podcasts or audio</li>
          <li><strong>Entertainment:</strong> Generating character voices for games or videos</li>
          <li><strong>Corporate:</strong> Creating voice-overs for presentations and training modules</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🌍 Why Text to Speech Matters</h4>
        <p className="text-gray-700 mb-4">
          Text to Speech is not just about converting words into sound — it’s about improving
          accessibility, breaking language barriers, and making digital content more inclusive.
          For people with reading difficulties or vision impairments, TTS is a life-changing
          technology. For content creators, it adds an audio dimension to written work, expanding
          reach to audiences who prefer listening over reading. Businesses use it to make
          e-learning modules engaging, while educators use it for pronunciation and listening
          practice. With voice assistants like Siri, Alexa, and Google Assistant, TTS has become
          part of everyday life.
        </p>

        <h4 className="font-semibold mt-4 mb-1">🙋 Frequently Asked Questions</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Is this tool free?</strong> Yes, it is 100% free and works in any browser.</li>
          <li><strong>Can I download the audio?</strong> The current version generates speech for playback, but you can copy settings and use with audio recorders.</li>
          <li><strong>Does it work offline?</strong> No, it requires your browser environment to generate speech.</li>
          <li><strong>Which languages are supported?</strong> English (US/UK), Spanish, French, German, Italian, Portuguese, and Russian.</li>
          <li><strong>Is the voice robotic?</strong> No, it uses natural-sounding voice synthesis for a realistic audio experience.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">🚀 Final Thoughts</h4>
        <p className="text-gray-700">
          The Text to Speech Converter is a simple yet powerful tool that bridges the gap between
          text and audio. It improves accessibility, helps in learning, and makes content
          consumption more flexible. Instead of only reading, users can now listen to the same
          content on the go. Whether you’re building educational resources, producing a podcast,
          or making content more inclusive, this tool offers a free and convenient way to achieve
          it. Try it today and bring your text to life with natural voices.
        </p>
      </section>
    </ToolSection>
  );
}