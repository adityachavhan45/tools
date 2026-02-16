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
      plainSidebar
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
      <section className="mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-indigo-500 pb-3 inline-block">
          The Complete Guide to Morse Code Translation
        </h2>

        <div className="prose max-w-none" style={{ textAlign: 'justify' }}>
          <p className="text-gray-700 leading-relaxed mb-5">
            Morse code stands as one of humanitys most ingenious communication inventions, transforming how people transmitted information across vast distances long before the internet, smartphones, or even telephones became commonplace. Developed in the early eighteen hundreds by Samuel Morse and Alfred Vail for use with the telegraph system, this elegant encoding method represents letters, numbers, and punctuation using combinations of short signals called dots and long signals called dashes. What began as a revolutionary technology for sending messages through electrical pulses over wires evolved into a universal language of communication that transcended linguistic barriers and technological limitations, proving its worth in countless critical situations from maritime emergencies to military operations throughout the twentieth century.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Our free online Morse code translator brings this historic communication method into the digital age, providing instant bidirectional conversion between standard text and Morse code without requiring any downloads, installations, or technical expertise. Whether you are a student exploring the history of telecommunications, an amateur radio operator practicing for licensing exams, a puzzle enthusiast working on cryptographic challenges, or simply someone curious about this fascinating encoding system, our tool offers an accessible and reliable way to encode messages into Morse code or decode Morse transmissions back into readable text. The translator handles all standard alphanumeric characters plus common punctuation marks, ensuring comprehensive coverage for practical communication needs while maintaining the authentic Morse code standards used by radio operators worldwide.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            The Historical Significance of Morse Code
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            The invention of Morse code in the eighteen thirties marked a watershed moment in human communication history, enabling real-time long-distance messaging for the first time in civilization. Before Morses telegraph system, sending information over significant distances required physical transportation by horse, ship, or later by train, meaning messages could take days, weeks, or even months to reach their destinations. The telegraph, powered by Morse code, compressed this timeline to mere minutes, fundamentally transforming commerce, journalism, diplomacy, and personal communication. News of critical events could spread across continents within hours rather than weeks, stock prices could be coordinated between distant markets, and families separated by geography could maintain contact through telegram services that became ubiquitous in developed nations.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            The simplicity and reliability of Morse code made it particularly valuable in challenging environments where other communication methods failed. Maritime vessels adopted Morse code for ship-to-shore and ship-to-ship communication, with the famous SOS distress signal becoming internationally recognized after the nineteen twelve Titanic disaster highlighted the critical importance of reliable emergency communication systems. During both World Wars, Morse code served as a primary method for military communications, with skilled operators transmitting coded messages under extreme pressure and adverse conditions. Even in the space age, NASA astronauts relied on Morse code as a backup communication system, demonstrating its continued relevance when modern technology encountered unexpected limitations or failures.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Understanding How Morse Code Works
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            At its core, Morse code represents a binary communication system that predates computer binary code by more than a century. Each letter, number, and punctuation mark corresponds to a unique sequence of dots (short signals) and dashes (long signals), with standardized timing relationships between these elements creating a rhythm that experienced operators can recognize aurally without visual reference. By convention, a dash should last approximately three times as long as a dot, spaces between elements of the same character equal one dot length, spaces between characters equal three dot lengths, and spaces between words equal seven dot lengths. These timing standards ensure that Morse code remains intelligible whether transmitted through sound, light, electrical pulses, or even manual tapping.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            The genius of Morse code lies in its variable-length encoding design, where frequently used letters receive shorter codes while less common letters get longer sequences. For example, the letter E, the most common letter in English, is represented by a single dot, making it the shortest possible Morse code character. Similarly, T uses a single dash, while more rarely used letters like Q (dash dash dot dash) or X (dash dot dot dash) require longer sequences. This efficiency principle mirrors modern data compression techniques and demonstrates the sophisticated thinking behind Morses design. When learning Morse code, many people start by memorizing these fundamental patterns, often using mnemonic devices or rhythm patterns to internalize the sequences until recognition becomes automatic.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Modern Applications and Continued Relevance
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Despite living in an era dominated by digital communication technologies, Morse code maintains surprising relevance across multiple domains and continues finding new applications beyond its original telegraph context. Amateur radio operators, particularly those pursuing advanced licensing levels, must demonstrate Morse code proficiency because radio frequencies can carry Morse transmissions much farther than voice signals under certain atmospheric conditions, and Morse remains intelligible even when voice communication becomes impossible due to interference or weak signals. During natural disasters when modern communication infrastructure fails, ham radio operators using Morse code have repeatedly provided critical emergency communications, coordinating rescue efforts and relaying vital information when cellular networks, internet connections, and power grids collapsed.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            The accessibility of Morse code makes it valuable in survival and emergency situations where improvised communication becomes necessary. Unlike complex digital systems requiring intact infrastructure and electrical power, Morse code works with any signal generation method including flashlights, mirrors reflecting sunlight, knocking or tapping on surfaces, whistles, horns, or even blinking eyes. This universality has saved lives in dramatic circumstances, from prisoners of war tapping Morse code messages through cell walls to trapped miners signaling rescuers through pipe systems. Hikers, sailors, and outdoor enthusiasts often learn basic Morse code as part of emergency preparedness training, recognizing that SOS (dot dot dot dash dash dash dot dot dot) remains one of the most universally recognized distress signals regardless of language or location.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Educational Value and Cognitive Benefits
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Learning Morse code offers significant educational benefits that extend beyond mere historical curiosity or practical communication skills. The process of memorizing and decoding Morse patterns enhances memory capacity, pattern recognition abilities, and auditory processing skills in ways that complement traditional academic learning. Students studying Morse code develop improved concentration and attention to detail as they learn to distinguish subtle differences in timing and sequence that differentiate similar-looking codes. These cognitive skills transfer to other domains including music, mathematics, and language learning, making Morse code an effective tool for overall mental development and brain training exercises.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Educational institutions increasingly incorporate Morse code into STEM curricula as a hands-on method for teaching fundamental concepts in telecommunications, signal processing, and information theory. Building simple Morse code transmitters and receivers introduces students to basic electronics and circuit design principles while providing immediate tangible results that reinforce theoretical concepts. The historical context of Morse code creates opportunities for interdisciplinary learning connecting science, technology, history, and social studies, helping students understand how technological innovations shape society and how societies adapt to technological change. Group activities involving Morse code communication teach teamwork, problem-solving, and the importance of clear protocols in successful information exchange.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Morse Code in Popular Culture and Recreation
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Morse code has secured a permanent place in popular culture, appearing frequently in movies, television shows, video games, and literature as a plot device or atmospheric element. Spy thrillers often feature characters using Morse code for covert communication, puzzle games incorporate Morse code challenges that players must decode to progress, and escape rooms use Morse-based puzzles to create immersive historical or espionage-themed experiences. This cultural presence keeps Morse code in public consciousness despite its declining use in official telecommunications, introducing new generations to this historic communication method through entertainment media that makes learning feel like play rather than work.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Hobbyist communities dedicated to Morse code thrive both online and in physical gatherings, with enthusiasts competing in speed competitions, maintaining vintage telegraph equipment, and preserving the traditions of telegraph operators from previous eras. Geocaching activities sometimes incorporate Morse code coordinates that participants must decode to locate hidden caches, adding an additional layer of challenge and historical connection to treasure hunting adventures. Amateur radio contests often include Morse code categories where operators compete to make the most contacts within specified time periods, maintaining competitive traditions dating back decades while fostering international friendships through shared passion for this communication art form.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Technical Aspects of Our Morse Code Translator
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Our Morse code translator implements the International Morse Code standard, also known as Continental Morse, which represents the globally accepted version used for international telecommunications and amateur radio operations. This differs slightly from the original American Morse Code that Samuel Morse initially developed, which used different patterns for some letters and included spaces within character codes making it more complex to learn and prone to transmission errors. International Morse eliminated these complexities, creating a more robust system that could handle all Latin alphabet characters, Arabic numerals, and standard punctuation marks with unambiguous encoding and decoding processes.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            The translator operates bidirectionally, meaning you can convert regular text into Morse code (encoding) or convert Morse code back into text (decoding) with equal ease. When encoding text to Morse, the tool automatically converts all input to uppercase since Morse code traditionally does not distinguish between uppercase and lowercase letters, then maps each character to its corresponding Morse sequence separated by spaces for clarity in the output. When decoding Morse to text, the translator expects properly formatted input with spaces between individual character codes and forward slashes representing word boundaries, parsing this input to reconstruct the original message accurately. This bidirectional functionality proves particularly useful when practicing Morse code skills, allowing learners to encode messages, share them with practice partners, and decode received transmissions for verification.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Best Practices for Using the Translator
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            To achieve optimal results when encoding text to Morse code, write your message in clear, simple language avoiding unnecessary complexity or ambiguity. While the translator handles all standard alphanumeric characters and common punctuation marks, extremely specialized symbols or emoji characters lack Morse code equivalents and will be omitted from the translation. For messages intended for actual radio transmission or other practical communication purposes, brevity improves both transmission efficiency and reception clarity since shorter messages transmit faster and leave less room for errors or misunderstandings during reception under challenging signal conditions.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            When decoding Morse code to text, ensure proper spacing between character codes using single spaces to separate individual letters and multiple spaces or forward slashes to indicate word boundaries. Incorrect spacing represents the most common source of decoding errors since the translator cannot reliably determine where one character ends and another begins without clear delimiters. If your decoded output appears garbled or nonsensical, review the input Morse code for spacing errors before assuming problems with the message content itself. For learning purposes, try encoding simple words or phrases, then attempting to manually decode them before using the translator to check your work, building proficiency through repetitive practice and immediate feedback.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Common Morse Code Signals and Abbreviations
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Beyond basic letter and number encoding, Morse code includes numerous standardized abbreviations and procedural signals that experienced operators use to streamline communication and convey common concepts efficiently. These abbreviations, called prosigns or procedural signals, represent special character combinations transmitted as single units without spaces between their component letters. The most famous example is SOS, the international distress signal adopted in nineteen six and consisting of three dots, three dashes, and three dots transmitted continuously without breaks, chosen specifically because its distinctive pattern is difficult to misinterpret even under poor reception conditions.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Other common prosigns include CQ (calling any station) used by amateur radio operators to initiate general contact attempts, SK (end of contact) signaling the conclusion of a transmission, BT (break) indicating separation between message components, and AR (end of message) marking transmission completion. Morse code operators also developed extensive abbreviation systems called Q codes that use three-letter codes starting with Q to represent common questions and statements in international maritime and aviation communications. For example, QTH means location, QRM indicates interference, and QSL confirms message receipt. Learning these standard abbreviations allows fluent Morse code communication using fewer transmitted characters while maintaining clarity and universal understanding among operators worldwide.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Learning Morse Code: Tips and Strategies
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            For beginners interested in learning Morse code beyond simply using translation tools, systematic practice and proper learning methods make the difference between superficial familiarity and true operational proficiency. The most effective learning approach involves developing both visual recognition of Morse patterns and auditory recognition of the rhythmic sounds that experienced operators rely on during actual transmission and reception. Starting with the most common letters and gradually expanding your repertoire prevents overwhelming yourself with too much information simultaneously while ensuring you can practice with actual words and simple sentences early in the learning process rather than waiting until you have memorized the complete alphabet.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Many successful Morse code learners use mnemonic devices that associate each letter with a word or phrase matching the dot-dash patterns rhythm. For example, remembering A (dot dash) as "apart," B (dash dot dot dot) as "boot-to-the-head," or C (dash dot dash dot) as "co-ca co-la" creates memorable verbal hooks that aid pattern retention. Regular practice sessions of fifteen to thirty minutes daily produce better results than marathon cramming sessions, as consistent repetition strengthens neural pathways and builds automatic recognition reflexes. Mobile apps, online training programs, and practice recordings provide convenient ways to incorporate Morse code practice into daily routines during commutes, exercise sessions, or other downtime activities that otherwise might remain unproductive.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            Privacy and Security Considerations
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            Our Morse code translator operates entirely within your web browser using client-side JavaScript processing, meaning your messages never get transmitted to external servers or stored in databases beyond your local device. This local processing approach ensures complete privacy for sensitive communications, personal messages, or any content you prefer to keep confidential. Unlike some online tools that send data to servers for processing and potentially log or analyze user inputs, our translator performs all encoding and decoding operations locally, with the original text and translated results existing only in your browsers memory and local storage if you choose to save them.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            While Morse code itself provides no cryptographic security since anyone familiar with the code can read translated messages, the obscurity of the encoding offers a minimal barrier against casual observers unfamiliar with the system. For actual secure communication, Morse code should be combined with proper encryption methods if confidentiality is essential, though for most recreational and educational purposes the encoding alone suffices. The ability to download translated results enables offline storage and transmission through secure channels if needed, giving users complete control over their data and how it gets shared or distributed beyond the initial translation process.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
            The Future of Morse Code
          </h3>

          <p className="text-gray-700 leading-relaxed mb-5">
            While commercial and governmental telecommunications have largely abandoned Morse code in favor of digital protocols and voice communications, the enduring appeal and practical utility of this communication method suggest it will remain relevant for hobbyists, educators, and emergency communicators for the foreseeable future. New technologies sometimes create unexpected opportunities for Morse code applications, such as using smartphone flashlight apps to send Morse signals or incorporating Morse code input methods for accessibility purposes, allowing people with limited motor control to communicate by activating a single switch in Morse patterns rather than typing on conventional keyboards.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            The skills and concepts underlying Morse code continue influencing modern technology development, particularly in areas requiring robust communication under challenging conditions or with minimal bandwidth requirements. Space missions communicating with distant probes, underwater communications between submarines and surface vessels, and remote sensor networks operating on minimal power sometimes employ Morse-inspired encoding schemes that prioritize reliability and efficiency over transmission speed. By learning and using Morse code today, whether through tools like our translator or hands-on practice with actual transmission equipment, you connect with a rich historical legacy while developing skills and understanding that remain surprisingly applicable in our modern technological landscape.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t-2 border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions About Morse Code</h3>
          
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">Is Morse code still used today?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Yes, Morse code remains actively used by amateur radio operators, maritime vessels in emergency situations, aviation backup communications, and military applications where voice communication is impractical or unavailable. It is also popular among hobbyists and in educational settings teaching communication history and signal processing concepts.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">How long does it take to learn Morse code?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Basic proficiency recognizing common letters can be achieved in a few weeks with regular practice. Reaching conversational speed of about fifteen to twenty words per minute typically requires three to six months of consistent daily practice. Professional-level speeds above twenty-five words per minute may take a year or more to develop.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-900 mb-2">What does SOS mean in Morse code?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                SOS is the international distress signal represented as three dots, three dashes, three dots (· · · — — — · · ·). Contrary to popular belief, SOS does not stand for "Save Our Ship" or "Save Our Souls" but was chosen because its distinctive pattern is easy to recognize and difficult to confuse with other signals during emergencies.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-amber-500">
              <h4 className="font-semibold text-gray-900 mb-2">Can this translator handle numbers and punctuation?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Yes, our translator supports all letters A through Z, numbers zero through nine, and common punctuation marks including periods, commas, question marks, apostrophes, exclamation points, slashes, parentheses, ampersands, colons, semicolons, equals signs, plus signs, hyphens, underscores, quotation marks, dollar signs, and at symbols.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-5 border-l-4 border-red-500">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a difference between dots/dashes and dits/dahs?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Dots and dashes refer to the written symbols (· and —) while dits and dahs describe the sounds of short and long signals when transmitted. Experienced operators learn to recognize the audio rhythm of dits and dahs rather than visualizing dots and dashes, which allows faster reception and more reliable communication.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border-l-4 border-cyan-500">
              <h4 className="font-semibold text-gray-900 mb-2">Can I use Morse code for encrypted communication?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Morse code itself provides no encryption or security since anyone who knows the code can read translated messages. For secure communication, you would need to encrypt your message first using proper cryptographic methods, then optionally encode the encrypted text into Morse code for transmission. Morse code alone offers only obscurity, not true security.
              </p>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border-l-4 border-violet-500">
              <h4 className="font-semibold text-gray-900 mb-2">Is this Morse code translator free to use?</h4>
              <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                Yes, our Morse code translator is completely free with unlimited usage and no registration required. All processing happens in your browser ensuring privacy, and you can translate as many messages as needed without any restrictions, fees, or hidden costs. We provide this as a free educational and practical resource for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Final Conclusion */}
        <div className="mt-10 pt-8 border-t-2 border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Conclusion: Preserving Communication Heritage</h3>
          <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            Morse code represents far more than an obsolete technology from a bygone era—it embodies timeless principles of efficient communication, reliability under adverse conditions, and the human capacity for innovation in solving practical problems. Our free Morse code translator serves as a bridge connecting modern digital convenience with this rich historical legacy, enabling anyone to explore, learn, and use this remarkable encoding system regardless of their technical background or prior experience. Whether you approach Morse code as a practical skill for emergency preparedness, an intellectual challenge for mental development, a hobby connecting you with like-minded enthusiasts worldwide, or simply a fascinating glimpse into communication history, the translator provides instant access to bidirectional conversion supporting your goals. Start encoding and decoding messages today to discover why Morse code has captivated communicators for nearly two centuries and continues inspiring new generations of learners, operators, and innovators in our interconnected digital age.
          </p>
        </div>
      </section>
    </ToolSection>
  );
}