import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Morse Code Translator Online — Free Encoder & Decoder Tool",
  description:
    "Free Morse Code Translator online. Instantly translate text to Morse code and Morse code to text with sound and light options. Easy-to-use encoder and decoder tool for learning, communication, education, and cryptography practice.",
  slug: "/morse-code-translator",
  keywords:
    "morse code, morse translator, morse decoder, morse encoder, morse code translator, text to morse, morse to text, morse code converter, morse code generator, online morse translator, free morse code tool, morse code learning tool, morse code practice, morse sound generator, morse code flash, encode morse, decode morse, morse communication tool, morse code alphabet, morse code for beginners"
});

export default function Page() {
  return <ClientPage />;
}