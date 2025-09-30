import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PNG to ICO Converter Online — Free Tool to Create Icons & Favicons",
  description:
    "Free PNG to ICO Converter online. Instantly convert PNG images into ICO icon files for websites, favicons, apps, and software. Fast, secure, and easy-to-use tool that runs directly in your browser without uploads.",
  slug: "/png-to-ico",
  keywords:
    "png to ico, convert png to ico, favicon, online icon converter, png to icon file, png to ico favicon, free png to ico tool, ico generator, png to ico for windows, favicon maker, favicon generator, website icon creator, png image to ico, create ico from png, convert png online, best png to ico converter, png to ico fast, secure png to ico converter, app icon generator, software icon converter"
});

export default function Page() {
  return <ClientPage />;
}