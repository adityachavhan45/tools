import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Lorem Ipsum Generator Online — Free Dummy Text & Placeholder Tool",
  description:
    "Free Lorem Ipsum Generator online. Instantly generate dummy text, placeholder paragraphs, and filler content for web design, mockups, publishing, and content creation. Simple, fast, and customizable tool for developers, designers, and writers.",
  slug: "/lorem-ipsum-generator",
  keywords:
    "lorem ipsum, lorem ipsum generator, placeholder text, dummy text, filler text generator, generate lorem ipsum, random text generator, text placeholder tool, mockup text generator, lorem ipsum paragraphs, fake text generator, web design lorem ipsum, dummy text for websites, lorem ipsum for designers, lorem ipsum content generator, lorem text online, sample text generator, free lorem ipsum tool, lorem ipsum creator, generate dummy content, lorem ipsum online free, lorem ipsum text maker"
});

export default function Page() {
  return <ClientPage />;
}