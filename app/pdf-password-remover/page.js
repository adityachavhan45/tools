import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PDF Password Remover — Remove PDF Passwords Online",
  description:
    "Remove PDF passwords online. Free PDF password remover with security options and batch processing for document access and sharing.",
  slug: "/pdf-password-remover",
  keywords: ["pdf password", "remove pdf password", "pdf unlock", "pdf security", "pdf tools"],
});

export default function Page() {
  return <ClientPage />;
}