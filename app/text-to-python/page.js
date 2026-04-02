import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Python Converter Online Convert Text to Python Code and Format Instantly Free 2026",
  description:
    "Convert text to Python code and decode Python back to text instantly with our free online Text to Python Converter. Encode, format and validate Python scripts with accuracy and copy options. Perfect for developers, students and data science learners. Fast, secure and no signup needed!",
  slug: "/text-to-python",
  focusKeyword: "Text to Python Converter Online Free",
  keywords:
    "text to python, python to text, text to py, python converter, py converter, text to python code, convert text to python, python encoder, python decoder, python code generator, python string converter, python formatter, free python converter, instant python encoder, python parser online, python validator, secure python converter, text to python for developers, python encoding tool, online python converter, best python formatter tool"
});

export default function Page() {
  return <ClientPage />;
}
