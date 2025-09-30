import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Password Remover Online — Free & Secure PDF Unlock Tool",
  description:
    "Free PDF Password Remover online. Instantly unlock secured PDF files and remove restrictions for printing, copying, and editing. Fast, secure, and easy-to-use PDF unlock tool with browser-based processing for safe document access and sharing.",
  slug: "/pdf-password-remover",
  keywords:
    "pdf password remover, remove pdf password, pdf unlock, unlock secured pdf, free pdf unlock tool, online pdf password remover, pdf restriction remover, unlock pdf file, pdf tools, secure pdf unlock, unlock pdf without password, best pdf unlocker, pdf decryption tool, remove restrictions from pdf, free pdf unlock online, pdf unlock service, pdf unlock without software, instant pdf password remover, pdf security remover, unlock pdf for editing, unlock pdf printing restriction"
});

export default function Page() {
  return <ClientPage />;
}