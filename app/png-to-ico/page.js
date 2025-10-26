import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "PNG to ICO Converter Online | Free Favicon & Icon Generator Tool",
  description:
    "Convert PNG to ICO instantly with our free online converter. Create high-quality icons and favicons for websites, apps, and software — fast, secure, and easy to use. Works directly in your browser with no uploads or sign-ups required.",
  slug: "/png-to-ico",
  keywords:
    "png to ico, convert png to ico, favicon, favicon generator, online icon converter, png to icon file, png to ico favicon, free png to ico converter, ico generator, png to ico for windows, website icon creator, favicon maker, png image to ico, create ico from png, convert png online, best png to ico converter, fast png to ico, secure png to ico converter, app icon generator, software icon converter"
});

export default function Page() {
  return <ClientPage />;
}
