import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Lorem Ipsum Generator — Generate Lorem Ipsum Text Online",
  description:
    "Generate Lorem Ipsum text online. Free Lorem Ipsum generator with paragraph options and text formatting for web design and content placeholder.",
  slug: "/lorem-ipsum-generator",
  keywords: ["lorem ipsum", "lorem ipsum generator", "placeholder text", "dummy text"],
});

export default function Page() {
  return <ClientPage />;
}