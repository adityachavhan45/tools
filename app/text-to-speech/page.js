import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Speech Converter Online | Free, Fast & Realistic TTS Voice Generator",
  description:
    "Convert text to natural-sounding speech instantly with our free Text to Speech Converter online. Choose from multiple voices, control pitch and speed, and download lifelike audio. Ideal for creators, teachers, accessibility users, and productivity. 100% browser-based and secure.",
  slug: "/text-to-speech",
  keywords:
    "text to speech, tts, voice generator, text reader, text to voice, tts converter, speech generator, realistic text to speech, ai voice generator, free text to speech tool, convert text to speech, online tts tool, speech synthesis, audio from text, instant tts converter, natural voice generator, best free tts, text to speech online free, accessibility tts tool, text reader online"
});

export default function Page() {
  return <ClientPage />;
}
