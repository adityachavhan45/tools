import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "QR Code Generator Online | Free, Fast & Secure QR Creator Tool",
  description:
    "Create QR codes online instantly with our free QR Code Generator. Make custom QR codes for text, links, WiFi, emails, phone numbers, and contact info — download in PNG or SVG format. Perfect for business, marketing, and personal use. 100% browser-based and secure.",
  slug: "/qr-code",
  keywords:
    "qr code generator, create qr, qr code, qr code creator, free qr code generator, qr maker, qr generator online, qr code generator free, qr code for website, qr code for business, qr code for social media, qr code marketing, qr code download, qr code png, qr code svg, qr code tool, instant qr code generator, qr code online free, qr generator tool, generate qr code instantly, qr code creator online"
});

export default function Page() {
  return <ClientPage />;
}
