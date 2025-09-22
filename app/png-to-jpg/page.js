import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "PNG to JPG — Convert PNG Images to JPG",
  description:
    "Convert PNG images to JPG online in your browser. Simple and fast.",
  slug: "/png-to-jpg",
  keywords: ["png to jpg", "convert png to jpg", "image converter"],
});

export default function Page() {
  return <ClientPage />;
}

