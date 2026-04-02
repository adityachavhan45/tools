import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "PNG to ICO Converter Online Convert PNG to Favicon and Icon File Instantly Free 2026",
  description:
    "Convert PNG to high quality ICO favicon and icon files instantly with our free online PNG to ICO Converter. Perfect for websites, apps and software. Fast, secure and works 100% in your browser. No signup needed!",
  slug: "/png-to-ico",
  focusKeyword: "PNG to ICO Converter Online Free",
  keywords:
    "png to ico, convert png to ico, favicon, favicon generator, online icon converter, png to icon file, png to ico favicon, free png to ico converter, ico generator, png to ico for windows, website icon creator, favicon maker, png image to ico, create ico from png, convert png online, best png to ico converter, fast png to ico, secure png to ico converter, app icon generator, software icon converter"
});

export default function Page() {
  return <ClientPage />;
}
