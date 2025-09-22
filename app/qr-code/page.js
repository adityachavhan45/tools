import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "QR Code Generator — Create QR Codes",
  description:
    "Generate QR codes for text, URLs, or contact info in your browser. Download as PNG.",
  slug: "/qr-code",
  keywords: ["qr code generator", "create qr", "qr code"],
});

export default function Page() {
  return <ClientPage />;
}

