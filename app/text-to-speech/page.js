import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Speech — Convert Text to Speech Online",
  description:
    "Convert text to speech online. Free text to speech tool with voice options and audio generation for accessibility and content creation.",
  slug: "/text-to-speech",
  keywords: ["text to speech", "tts", "voice generator", "speech synthesis"],
});

export default function Page() {
  return <ClientPage />;
}