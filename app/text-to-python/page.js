import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to Python Converter Online | Free, Fast & Secure Python Encode/Format Tool",
  description:
    "Convert text to Python code and Python back to text instantly with our free online Python Converter. Encode, format, and validate Python scripts with accuracy and copy options. Ideal for developers, students, Python programmers, and data science learners. 100% browser-based and secure.",
  slug: "/text-to-python",
  keywords:
    "text to python, python to text, text to py, python converter, py converter, text to python code, convert text to python, python encoder, python decoder, python code generator, python string converter, python formatter, free python converter, instant python encoder, python parser online, python validator, secure python converter, text to python for developers, python encoding tool, online python converter, best python formatter tool"
});

export default function Page() {
  return <ClientPage />;
}
