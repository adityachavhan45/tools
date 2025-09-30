import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to Python Converter Online — Free Tool to Encode, Format & Validate Python Code",
  description:
    "Free Text to Python Converter online. Instantly convert text to Python (Py) code and Python back to text with formatting, validation, and copy support. Useful tool for students, developers, Python programmers, data science learners, and web projects.",
  slug: "/text-to-python",
  keywords:
    "text to python, python to text, text to py, python converter, py converter, text to python code, convert text to python, python encoder, python decoder, python code generator, python string converter, python formatter, free python converter, instant python encoder, python parser online, python validator, secure python converter, text to python for developers, python encoding tool, best python converter online"
});

export default function Page() {
  return <ClientPage />;
}
