import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Speech Converter Online — Free TTS Voice Generator Tool",
  description:
    "Free Text to Speech Converter online. Instantly convert text into natural-sounding speech with multiple voice options, pitch, and speed controls. Perfect tool for accessibility, content creation, e-learning, and productivity. Works directly in your browser.",
  slug: "/text-to-speech",
  keywords:
    "text to speech, tts, voice generator, speech synthesis, text reader, online tts tool, convert text to speech, free voice generator, realistic text to speech, tts converter, text to voice, speech generator, audio from text, ai voice generator, instant tts tool, best free tts, natural speech converter, text to speech online free, accessibility tts tool, text reader online"
});

export default function Page() {
  return <ClientPage />;
}
