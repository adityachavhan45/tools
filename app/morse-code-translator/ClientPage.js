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
  const [playSound, setPlaySound] = useState(false);

  const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
    '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
    ' ': '/'
  };

  const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
  );

  function translateMorse() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text first.");
      setResult("");
      return;
    }

    try {
      let translated = "";
      
      if (mode === "encode") {
        // Text to Morse
        translated = text.toUpperCase().split('').map(char => {
          return morseCode[char] || '';
        }).filter(code => code !== '').join(' ');
      } else {
        // Morse to Text
        const codes = text.trim().split(/\s+/);
        translated = codes.map(code => {
          return reverseMorseCode[code] || '';
        }).join('');
      }

      setResult(translated);
      setMessage("✅ Translation completed successfully!");
    } catch (error) {
      setMessage("❌ Error during translation. Please check your input.");
      setResult("");
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setMessage("📋 Translation copied to clipboard!");
    }
  }

  function downloadResult() {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = mode === 'encode' ? 'morse-code.txt' : 'decoded-text.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage("📥 File downloaded successfully!");
    }
  }

  function reset() {
    setText("");
    setMode("encode");
    setResult("");
    setMessage("🧹 All fields cleared!");
  }

  function swapMode() {
    if (result) {
      setText(result);
      setResult("");
      setMode(mode === "encode" ? "decode" : "encode");
      setMessage("🔄 Mode swapped! Previous result moved to input.");
    }
  }

  return (
    <ToolSection
      title="Morse Code Translator"
      subtitle="Free online Morse Code translator for encoding text to Morse and decoding Morse to text. Perfect for learning, communication, and cryptography enthusiasts."
      plain
      hideSidebar
      centerHeader
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Morse Code Translator",
          description: "Free Morse Code translator with bidirectional conversion. Encode text to Morse code and decode Morse to text instantly.",
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

      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-blue-50 p-5 sm:p-6 shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700">
            Morse Code Translator Tool
          </h1>
          <p className="mt-2 text-center text-sm sm:text-base text-slate-600">
            Encode text to Morse and decode Morse to text instantly.
          </p>
        </div>

        {/* Status Messages */}
        {message && (
          <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg shadow-sm">
            <p className="text-blue-800 text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Mode Selection */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm">
          <label className="block text-base font-semibold text-gray-800 mb-3">
            🔄 Translation Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                mode === "encode"
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="mode"
                value="encode"
                checked={mode === "encode"}
                onChange={(e) => setMode(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">📝</div>
                <span className="font-semibold text-gray-800">Text to Morse Code</span>
                <p className="text-xs text-gray-600 mt-1">Convert plain text to dots and dashes</p>
              </div>
            </label>

            <label
              className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                mode === "decode"
                  ? 'border-indigo-500 bg-indigo-50 shadow-md'
                  : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="mode"
                value="decode"
                checked={mode === "decode"}
                onChange={(e) => setMode(e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">📡</div>
                <span className="font-semibold text-gray-800">Morse Code to Text</span>
                <p className="text-xs text-gray-600 mt-1">Decode dots and dashes to text</p>
              </div>
            </label>
          </div>
        </div>

        {/* Main Translation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-3">
            <label className="block text-base font-semibold text-gray-800">
              {mode === "encode" ? "📝 Enter Text" : "📡 Enter Morse Code"}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Type your message here...\nExample: HELLO WORLD"
                  : "Enter Morse code here...\nExample: .... . .-.. .-.. --- / .-- --- .-. .-.. -.."
              }
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-none shadow-sm transition-all duration-200 hover:border-gray-400"
              style={{ textAlign: 'left' }}
            />
            <p className="text-xs text-gray-500">
              {text.length} characters
            </p>
          </div>

          {/* Output */}
          <div className="space-y-3">
            <label className="block text-base font-semibold text-gray-800">
              {mode === "encode" ? "📡 Morse Code Output" : "📝 Decoded Text"}
            </label>
            <div className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 font-mono text-sm overflow-auto shadow-sm">
              {result ? (
                <div className="whitespace-pre-wrap break-words leading-relaxed">
                  {result}
                </div>
              ) : (
                <span className="text-gray-400 italic">
                  {mode === "encode" 
                    ? "Your Morse code will appear here..." 
                    : "Your decoded message will appear here..."}
                </span>
              )}
            </div>
            {result && (
              <p className="text-xs text-gray-500">
                {result.length} characters
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={translateMorse}
            disabled={!text.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg 
                       hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {mode === "encode" ? "📡 Encode to Morse" : "📝 Decode to Text"}
          </button>

          {result && (
            <>
              <button
                onClick={copyResult}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                           bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg 
                           hover:from-blue-700 hover:to-cyan-700
                           transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                📋 Copy Result
              </button>

              <button
                onClick={downloadResult}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                           bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg 
                           hover:from-green-700 hover:to-emerald-700
                           transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                📥 Download
              </button>

              <button
                onClick={swapMode}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                           bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-lg 
                           hover:from-amber-700 hover:to-orange-700
                           transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                🔄 Swap & Reverse
              </button>
            </>
          )}

          <button
            onClick={reset}
            disabled={!text.trim() && !result}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md
                       transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔄 Reset
          </button>
        </div>

        {/* Quick Reference */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
            📚 Morse Code Quick Reference
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
            {Object.entries(morseCode).slice(0, 26).map(([letter, code]) => (
              <div key={letter} className="flex justify-between items-center bg-white px-3 py-2 rounded border border-amber-300">
                <span className="font-bold text-amber-900">{letter}</span>
                <span className="text-amber-700 font-mono">{code}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-white rounded border border-amber-300">
            <p className="text-xs text-amber-800">
              <strong>Numbers:</strong> 1 = .---- | 2 = ..--- | 3 = ...-- | 4 = ....- | 5 = ..... | 6 = -.... | 7 = --... | 8 = ---.. | 9 = ----. | 0 = -----
            </p>
          </div>
          <div className="mt-2 p-3 bg-white rounded border border-amber-300">
            <p className="text-xs text-amber-800">
              <strong>Common Signals:</strong> SOS = ... --- ... | OK = --- -.- | Wait = .- ... | End = .-.-. | Error = ........ 
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <section className="mx-auto mt-12 sm:mt-14 w-full max-w-5xl p-5 sm:p-6 md:p-8 bg-white shadow-md rounded-2xl border border-slate-200">
  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 border-b border-slate-200 pb-3">
    Understanding Morse Code and Its Importance in Communication History
  </h2>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Long before smartphones, instant messaging, and internet based communication existed, people relied on slower methods to send information across long distances. Morse code changed this completely by introducing a faster and more reliable communication system that worked through simple signal patterns. This invention became one of the most important milestones in communication history and helped transform global information exchange.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Morse code uses combinations of short and long signals to represent letters, numbers, and punctuation marks. These signals are commonly represented visually using dots and dashes. Over time, Morse code became widely used in telegraph systems, military communication, maritime operations, emergency signalling, and amateur radio communication.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Even in the modern digital era, Morse code continues to remain relevant for education, emergency communication, hobbies, and historical learning. A Morse Code Translator helps users quickly convert regular text into Morse code or decode Morse sequences back into readable text instantly through a browser based interface.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    What Morse Code Actually Represents
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Morse code is a character encoding system where each alphabet letter, number, or symbol is represented through a unique sequence of dots and dashes. Short signals represent dots, while longer signals represent dashes.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    For example, the letter E is represented by a single dot, while the letter T uses a single dash. More complex characters combine multiple dots and dashes together in different patterns. These combinations allow complete words and sentences to be transmitted through sound, light, electrical pulses, or tapping signals.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The simplicity of the system made Morse code extremely practical during periods when advanced communication infrastructure did not yet exist.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Morse Code Became So Important Historically
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Before telegraph systems existed, delivering information across countries or continents could take days or even weeks. Morse code dramatically reduced communication delays by allowing messages to travel almost instantly through telegraph wires.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This improvement transformed journalism, business communication, transportation coordination, military operations, and emergency response systems. Important information could now move much faster between cities and nations.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Maritime communication especially benefited from Morse code because ships could send distress signals across long distances even during difficult conditions at sea.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    The Famous SOS Distress Signal
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    One of the most recognised Morse code signals worldwide is SOS, represented by three dots, three dashes, and three dots. This sequence became internationally recognised as an emergency distress signal because it was easy to transmit and identify quickly.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Contrary to popular belief, SOS does not officially stand for phrases like “Save Our Ship” or “Save Our Souls.” The sequence was mainly selected because its signal pattern remained highly distinctive and easy to recognise during emergencies.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Emergency communication remains one of the biggest reasons Morse code continues to be remembered and respected globally even today.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    How This Morse Code Translator Works
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This browser based Morse Code Translator allows users to convert regular text into Morse code instantly and also decode Morse sequences back into readable language. Users simply enter text or Morse patterns into the input field and the tool automatically generates the translated output.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    The translator supports standard letters, numbers, and common punctuation marks. During encoding, each character is converted into its corresponding Morse sequence. During decoding, Morse patterns are translated back into regular text automatically.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since everything runs locally inside the browser, the translation process remains fast, responsive, and beginner friendly across devices.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Why Morse Code Still Matters Today
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Even though modern communication technology has advanced significantly, Morse code still remains useful in several situations. Amateur radio operators continue using Morse transmissions because they can travel effectively across long distances even under weak signal conditions.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Emergency preparedness groups also teach Morse code because it can work using simple tools such as flashlights, whistles, mirrors, tapping sounds, or radio signals during survival situations.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Developers and students exploring communication systems sometimes additionally use the <a href="https://convertixy.com/text-to-binary" className="text-blue-600 hover:underline font-medium">Text to Binary Converter</a> while learning how different encoding systems represent information digitally.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Educational Benefits of Learning Morse Code
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Morse code learning can improve concentration, memory retention, listening accuracy, and pattern recognition skills. Because learners must identify signal sequences carefully, Morse practice helps strengthen attention to detail and cognitive processing abilities.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Educational institutions sometimes use Morse code activities to teach communication history, signal processing, and problem solving in interactive ways. Students often find practical encoding exercises more engaging than purely theoretical explanations.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Morse code projects can also introduce beginners to broader topics such as electronics, radio communication, and data transmission systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Popular Recreational Uses of Morse Code
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Morse code frequently appears in games, movies, treasure hunts, puzzles, escape rooms, and hobby communities. Puzzle enthusiasts often enjoy decoding hidden messages written in Morse sequences as part of challenges or interactive experiences.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Amateur radio communities continue organising Morse communication contests and practice events worldwide. Some users also create decorative Morse bracelets, personalised artwork, or hidden encoded messages using Morse patterns creatively.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    People interested in text transformation tools sometimes additionally use the <a href="https://convertixy.com/text-to-ascii" className="text-blue-600 hover:underline font-medium">Text to ASCII Converter</a> while exploring different forms of digital character representation and encoding systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Advantages of Browser Based Translation Tools
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Browser based tools simplify accessibility because users can instantly access them without installing software or creating accounts. This allows quick translation directly from desktop or mobile devices whenever needed.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This Morse Code Translator processes everything directly inside the browser itself, making the experience lightweight and responsive. Users can repeatedly test messages, decode sequences, and practice translations without delays.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Learners experimenting with encoded communication systems sometimes also use the <a href="https://convertixy.com/base64-encoder-decoder" className="text-blue-600 hover:underline font-medium">Base64 Encoder Decoder</a> while comparing different modern encoding formats and digital data conversion techniques.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Privacy Benefits of Local Browser Processing
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Many users prefer browser based utilities because they avoid unnecessary uploads or server side storage. Lightweight local processing improves both convenience and privacy during usage.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Since this translator works locally inside the browser, entered messages remain on the user device during translation. No text needs to be transmitted externally before generating Morse output or decoding sequences.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    This local processing approach also improves speed because translations happen instantly without depending on external servers or cloud processing systems.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Helpful Tips While Learning Morse Code
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Beginners should start with common letters and shorter words before attempting complex phrases. Practicing regularly in small sessions often produces better results than long irregular study sessions.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Listening to actual Morse audio can also improve recognition speed because experienced operators rely heavily on rhythm patterns instead of visually reading dots and dashes individually.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 text-justify">
    Users practicing text conversion workflows may additionally use the <a href="https://convertixy.com/text-to-hex" className="text-blue-600 hover:underline font-medium">Text to Hex Converter</a> while learning how different encoding standards transform regular characters into machine readable formats.
  </p>

  <h3 className="text-lg font-semibold text-slate-900 mt-6 mb-2">
    Final Thoughts on Using a Morse Code Translator
  </h3>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
    Morse code remains one of the most historically important communication systems ever created because it introduced faster long distance information exchange during a period when communication technology was extremely limited.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    This browser based Morse Code Translator provides a simple and beginner friendly way to encode text into Morse sequences or decode Morse signals instantly without complicated setup or technical knowledge.
  </p>

  <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mt-4">
    Whether you are learning communication history, practicing amateur radio skills, solving puzzles, studying encoding systems, or simply exploring historical technology, Morse code translation remains an engaging and educational experience even in the modern digital age.
  </p>
</section>
    </ToolSection>
  );
}
