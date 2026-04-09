import { buildMetadata } from "../../lib/seo";
import ClientPage from "./ClientPage";

export const metadata = buildMetadata({
  title: "WebP to PNG Converter Free Online | Instant Batch Image Converter",
  description:
    "Convert WebP images to PNG instantly. Free, no login required. Supports batch conversion, preserves transparency and works 100% in your browser. No uploads, no server. Perfect for designers, developers and content creators.",
  slug: "/webp-to-png",
  keywords:
    "webp to png, webp to png converter, convert webp to png, webp to png online, free webp to png converter, instant webp converter, batch webp to png, webp image converter, webp to png no upload, webp to png browser based, webp converter online, png converter free, convert webp images, webp to png tool, best webp to png converter, webp to png no login, transparent webp to png, webp to png for designers, webp to png download, image format converter",
});

export default function Page() {
  return <ClientPage />;
}
