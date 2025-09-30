import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "QR Code Generator Online — Free Tool to Create & Download QR Codes",
  description:
    "Free QR Code Generator online. Instantly create QR codes for text, URLs, WiFi, email, phone numbers, or contact info. Download QR codes as PNG or SVG for business, marketing, social media, and personal use. Fast, secure, and easy-to-use.",
  slug: "/qr-code",
  keywords:
    "qr code generator, create qr, qr code, qr code creator, free qr code generator, qr maker, qr generator online, qr code generator free, qr code for website, qr code for business, qr code for social media, qr code marketing, qr code download, qr code png, qr code svg, qr code tool, instant qr code generator, qr code online free, qr generator tool, generate qr code instantly"
});

export default function Page() {
  return <ClientPage />;
}