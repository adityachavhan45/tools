import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PNG to ICO — Create ICO Icons from PNG",
  description:
    "Convert PNG images to ICO icon files suitable for favicons. Runs locally in your browser.",
  slug: "/png-to-ico",
  keywords: ["png to ico", "convert png to ico", "favicon"],
});

export default function Page() {
  return <ClientPage />;
}

