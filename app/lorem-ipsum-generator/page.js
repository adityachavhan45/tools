import ClientPage from "./ClientPage";
import {
  buildMetadata,
  buildToolJsonLd,
  buildHowToJsonLd,
  buildFaqJsonLd,
} from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export const metadata = buildMetadata({
  title:
    "Lorem Ipsum Generator Online - Free Dummy Text & Placeholder Tool for Designers",
  description:
    "Use this free Lorem Ipsum Generator online to instantly create dummy text, placeholder paragraphs, and filler content for web design, mockups, and creative projects. Simple, fast, and customizable for developers, designers, and writers.",
  slug: "/lorem-ipsum-generator",
  focusKeyword: "Lorem Ipsum Generator Online",
  keywords: [
    "lorem ipsum",
    "lorem ipsum generator",
    "lorem ipsum online",
    "placeholder text",
    "dummy text generator",
    "filler text generator",
    "generate lorem ipsum",
    "random text generator",
    "text placeholder tool",
    "mockup text generator",
    "lorem ipsum paragraphs",
    "fake text generator",
    "web design lorem ipsum",
    "dummy text for websites",
    "lorem ipsum for designers",
    "lorem ipsum content generator",
    "lorem text online",
    "sample text generator",
    "free lorem ipsum tool",
    "lorem ipsum creator",
    "generate dummy content",
    "lorem ipsum online free",
    "lorem ipsum text maker",
    "placeholder content generator",
    "ui design lorem ipsum",
    "html lorem ipsum generator",
    "lorem ipsum for figma",
    "lorem ipsum filler tool",
    "fast lorem ipsum generator",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildToolJsonLd({
            name: "Lorem Ipsum Generator Online",
            description:
              "Free Lorem Ipsum Generator to create dummy text and filler paragraphs instantly for design, content, and development use.",
            slug: "/lorem-ipsum-generator",
            category: "Content Tools",
          }),
          buildHowToJsonLd({
            name: "How to Generate Lorem Ipsum Text Online",
            description:
              "Step-by-step guide to generate dummy text or placeholder paragraphs for web design, mockups, and content writing.",
            steps: [
              {
                name: "Select Paragraph or Word Count",
                text: "Choose how many paragraphs, sentences, or words of Lorem Ipsum text you need.",
              },
              {
                name: "Click Generate Button",
                text: "Press the 'Generate' button to instantly create random Lorem Ipsum text online.",
              },
              {
                name: "Copy or Download Text",
                text: "Copy the generated text or download it for use in your design, content, or mockup projects.",
              },
            ],
          }),
          buildFaqJsonLd([
            {
              question: "What is Lorem Ipsum text?",
              answer:
                "Lorem Ipsum is dummy text used in publishing and web design to fill spaces and visualize layout before the final content is ready.",
            },
            {
              question: "Is this Lorem Ipsum Generator free?",
              answer:
                "Yes, it’s 100% free to use with no sign-up or watermark. You can generate unlimited dummy text instantly.",
            },
            {
              question: "Can I control how much text is generated?",
              answer:
                "Yes, you can select how many paragraphs, sentences, or words of placeholder text you want to generate.",
            },
            {
              question: "Who uses Lorem Ipsum text?",
              answer:
                "Designers, developers, content writers, and marketers use Lorem Ipsum text for mockups, demos, and templates before final content is available.",
            },
            {
              question: "Does the generated text affect SEO?",
              answer:
                "No. Lorem Ipsum text is meant for design and layout previews only. Replace it with original content before publishing to maintain SEO quality.",
            },
          ]),
        ]}
      />
      <ClientPage />
    </>
  );
}
