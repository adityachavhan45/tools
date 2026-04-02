import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Free Text to Speech Converter Online – Realistic AI Voices",
  description:
    "Convert any text to natural-sounding speech instantly. Choose from multiple AI voices, adjust speed & pitch, and download audio — 100% free & browser-based. No sign-up needed.",
  slug: "/text-to-speech",
  keywords:
    "text to speech converter online, free tts online, text to speech free, ai voice generator, realistic text to speech, convert text to audio, speech synthesis tool, browser based tts, online voice generator, text to speech no sign up"
});

export default function Page() {
  return <ClientPage />;
}
