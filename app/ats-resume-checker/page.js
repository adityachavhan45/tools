import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Free ATS Resume Checker | AI Resume Checking",

  description:
    "AI-powered ATS resume checker trained on millions of resumes. Get accurate ATS score, keyword analysis, and expert suggestions to improve your resume in minutes.",

  slug: "/ats-resume-checker",

  keywords:
    "ats resume checker free, ats score checker online, resume ats score tool, resume keyword checker, ats friendly resume checker, improve resume score, resume optimization tool",
});

export default function Page() {
  return <ClientPage />;
}