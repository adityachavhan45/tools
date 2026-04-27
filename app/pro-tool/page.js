import Link from "next/link";
import { Crown, FileSearch, SearchCheck, Sparkles, Wand2, Zap } from "lucide-react";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Best Premium AI Tools for blogger, creators, students, and professionals | Convertixy Pro Tool",
  description:
    "Explore Convertixy premium tools built for faster, higher-quality AI rewriting and professional workflows.",
  slug: "/pro-tool",
  keywords:
    "pro tool, premium tools, ai humanizer pro, premium ai tools, ai rewriting tools",
});

const premiumTools = [
  {
    name: "AI Humanizer Tool",
    description:
      "Convert AI-generated text into natural, human-like writing with premium rewriting options.",
    href: "/ai-humanizer",
    badge: "Premium AI",
    icon: Wand2,
    features: [
      "Human-like rewriting",
      "Higher word limits",
      "Faster response",
      "Better quality output",
    ],
  },
  {
    name: "ATS Resume Checker",
    description:
      "Check ATS score, keyword match, missing sections, and get resume optimization suggestions.",
    href: "/ats-resume-checker",
    badge: "Premium Career",
    icon: FileSearch,
    features: [
      "ATS score report",
      "JD keyword match",
      "Section gap detection",
      "Actionable fixes",
    ],
  },
  {
    name: "SEO Audit Checker",
    description:
      "Run advanced manual + AI SEO audits with technical issue detection, scoring, and actionable strategy.",
    href: "/seo-audit-checker",
    badge: "Premium SEO",
    icon: SearchCheck,
    features: [
      "Technical SEO diagnostics",
      "On-page and content scoring",
      "AI priority roadmap",
      "Executive-ready issue report",
    ],
  },
];

export default function Page() {
  return (
    <section className="min-h-screen bg-white px-4 py-12 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Crown className="h-4 w-4" />
            Premium Tools
          </div>

          {/* <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Pro Tool
          </h1> */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Powerful premium tools for creators, students, bloggers, and professionals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {premiumTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.name}
                className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-950">
                  {tool.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {tool.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm font-medium text-slate-700"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tool.href}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
                >
                  <Zap className="h-4 w-4" />
                  Open Tool
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
