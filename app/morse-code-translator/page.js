import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "Morse Code Translator Online - Free Text to Morse & Morse to Text Encoder/Decoder",
  description:
    "Free Morse Code Translator online. Instantly convert text to Morse code and Morse code to text with sound and light simulation. Perfect learning, communication, and cryptography tool for students, hobbyists, and developers.",
  slug: "/morse-code-translator",
  focusKeyword: "Morse Code Translator Online",
  keywords: [
    "morse code",
    "morse translator",
    "morse decoder",
    "morse encoder",
    "morse code translator",
    "text to morse",
    "morse to text",
    "morse code converter",
    "morse code generator",
    "online morse translator",
    "free morse code tool",
    "morse code learning tool",
    "morse code practice",
    "morse sound generator",
    "morse code flash",
    "encode morse",
    "decode morse",
    "morse communication tool",
    "morse code alphabet",
    "morse code for beginners",
    "morse code for developers",
    "morse code online translator",
    "morse encoder decoder",
    "morse text converter",
    "morse audio translator",
    "morse code practice app",
    "learn morse code online",
    "morse visualizer",
    "morse sound player",
    "morse code message encoder",
    "morse code decoding practice",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Morse Code Translator Online",
            description:
              "Free online tool to translate text to Morse code and Morse code to text instantly with sound and visual output.",
            slug: "/morse-code-translator",
            category: "Language Tools",
          }),
          buildHowToJsonLd({
            name: "How to Use the Morse Code Translator",
            description:
              "Step-by-step guide to encode and decode Morse code messages instantly online.",
            steps: [
              {
                name: "Enter Your Text or Morse Code",
                text: "Type regular text to encode or paste Morse code using dots (.) and dashes (-) to decode.",
              },
              {
                name: "Click 'Translate' Button",
                text: "Press 'Translate' to instantly convert text to Morse or Morse to readable text.",
              },
              {
                name: "Play Sound or Flash Light (Optional)",
                text: "Use sound or light playback options to learn and experience real Morse signaling.",
              },
              {
                name: "Copy or Share Results",
                text: "Copy your translated message or share it for fun, education, or communication purposes.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is Morse code?",
              answer:
                "Morse code is a communication system that uses dots and dashes to represent letters, numbers, and symbols. It was invented for telegraph systems and is still used for radio and emergency signals.",
            },
            {
              question: "Can this tool translate both ways?",
              answer:
                "Yes! You can convert text to Morse code or decode Morse code back to readable text instantly.",
            },
            {
              question: "Does it support sound or light output?",
              answer:
                "Yes, it includes sound and light playback options to help users learn and practice Morse code effectively.",
            },
            {
              question: "Is this Morse code translator free?",
              answer:
                "Absolutely. It’s 100% free, requires no registration, and works instantly in your browser with full privacy.",
            },
            {
              question: "Who can use this Morse code translator?",
              answer:
                "It’s perfect for students, teachers, developers, radio enthusiasts, cryptography learners, or anyone curious about Morse communication.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
