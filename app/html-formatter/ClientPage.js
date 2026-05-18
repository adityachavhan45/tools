"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function HtmlFormatterPage() {
  const [html, setHtml] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  function formatHtml() {
    if (!html.trim()) {
      setMessage("⚠️ Please enter HTML code to format.");
      return;
    }

    try {
      // Simple HTML formatting logic (in production, use proper parser)
      let formatted = html.trim();
      const indent = ' '.repeat(parseInt(indentSize));
      let level = 0;
      let output = '';
      
      // Basic tag processing
      const tags = formatted.split(/(<[^>]+>)/g).filter(Boolean);
      
      tags.forEach(tag => {
        if (tag.match(/^<\//)) {
          level = Math.max(0, level - 1);
          output += indent.repeat(level) + tag + '\n';
        } else if (tag.match(/^<[^/>]+>$/)) {
          output += indent.repeat(level) + tag + '\n';
          level++;
        } else if (tag.match(/^<.+\/>$/)) {
          output += indent.repeat(level) + tag + '\n';
        } else if (tag.trim()) {
          output += indent.repeat(level) + tag.trim() + '\n';
        }
      });

      setResult(output.trim());
      setMessage("✅ HTML formatted successfully! Copy the code below.");
    } catch (error) {
      setMessage("❌ Error formatting HTML. Please check your code.");
      console.error(error);
    }
  }

  function copyResult() {
    if (result) {
      navigator.clipboard.writeText(result);
      setMessage("📋 Formatted HTML copied to clipboard!");
    }
  }

  function reset() {
    setHtml("");
    setIndentSize("2");
    setResult("");
    setMessage("");
  }

  return (
    <ToolSection
      title="HTML Formatter - Beautify & Format HTML Code Online"
      subtitle="Professional HTML code formatter and beautifier. Clean, format, and prettify your HTML code instantly with customizable indentation - free online tool for web developers."
      plain
      whiteBackground
      hideSidebar
      centerHeader
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "HTML Formatter",
          description: "Format and beautify HTML code online with customizable indentation. Free professional HTML formatter for web developers.",
          slug: "/html-formatter",
          category: "Utilities/Code",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "HTML Formatter", slug: "/html-formatter" },
        ])}
      />

      <div className="space-y-6 mb-6 sm:mb-8">
        
        {/* Header Section */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-orange-100 text-orange-800 border border-orange-300 mb-3">
              🎨 Professional Code Formatting
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              HTML Code Formatter & Beautifier
            </h1>
            <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto" style={{textAlign: 'justify'}}>
              Transform messy, minified, or unformatted HTML code into clean, readable, and properly indented markup. Perfect for developers, students, and content creators who need professional code formatting.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-orange-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-orange-600">Instant</div>
              <div className="text-xs text-gray-600">Formatting</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-red-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-red-600">4 Styles</div>
              <div className="text-xs text-gray-600">Indentation</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-purple-600">100%</div>
              <div className="text-xs text-gray-600">Browser Based</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-green-100 text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">Free</div>
              <div className="text-xs text-gray-600">Forever</div>
            </div>
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 md:p-8 shadow-sm">
          
          {/* Status Messages */}
          {message && (
            <div className={`px-4 py-3 rounded-xl border text-sm sm:text-base font-medium mb-4 ${
              message.includes('✅') ? 'bg-green-50 border-green-300 text-green-800' :
              message.includes('⚠️') ? 'bg-yellow-50 border-yellow-300 text-yellow-800' :
              message.includes('❌') ? 'bg-red-50 border-red-300 text-red-800' :
              'bg-blue-50 border-blue-300 text-blue-800'
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-5">
            
            {/* HTML Input */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                📝 Enter HTML Code
              </label>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="Paste your HTML code here... (minified, messy, or unformatted)"
                className="w-full h-48 sm:h-56 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-xs sm:text-sm transition-all duration-200 resize-y"
              />
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                Characters: {html.length} | Lines: {html.split('\n').length}
              </div>
            </div>

            {/* Indent Size Options */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                🔧 Indentation Style
              </label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base font-medium transition-all duration-200"
              >
                <option value="2">2 Spaces (Standard - Recommended)</option>
                <option value="4">4 Spaces (Common in Many Projects)</option>
                <option value="1">1 Space (Minimal Indentation)</option>
                <option value="8">8 Spaces (Wide Indentation)</option>
              </select>
              
              <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-xs sm:text-sm text-blue-800">
                  💡 <strong>Tip:</strong> 2-space indentation is the industry standard for HTML and is recommended by Googles style guide.
                </p>
              </div>
            </div>

            {/* Result Output - No Scroll */}
            {result && (
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  ✨ Formatted HTML Code
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 border border-green-300 rounded-xl bg-gray-50">
                    <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap break-words overflow-x-auto">
                      <code>{result}</code>
                    </pre>
                  </div>
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Formatted
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  Lines: {result.split('\n').length}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={formatHtml}
                disabled={!html.trim()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold shadow-sm hover:bg-orange-700 disabled:bg-gray-400 transition-colors disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Format HTML
              </button>

              {result && (
                <button
                  onClick={copyResult}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-sm hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </button>
              )}

              <button
                onClick={reset}
                disabled={!html.trim() && !result.trim()}
                className="px-6 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 
                           font-semibold text-gray-700 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Formatting Options Info */}
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🎯 Indentation Style Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-white rounded-lg border-2 border-orange-200 shadow-sm">
              <h4 className="font-bold text-orange-800 mb-2 text-sm sm:text-base">✅ 2 Spaces (Recommended)</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2" style={{textAlign: 'justify'}}>
                Industry standard used by Google, Airbnb, and major tech companies. Saves horizontal space while maintaining excellent readability.
              </p>
              <div className="bg-orange-50 p-2 rounded font-mono text-xs">
                &lt;div&gt;<br/>
                ··&lt;p&gt;Text&lt;/p&gt;<br/>
                &lt;/div&gt;
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
              <h4 className="font-bold text-blue-800 mb-2 text-sm sm:text-base">📐 4 Spaces (Common)</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2" style={{textAlign: 'justify'}}>
                Popular in many coding environments and preferred by developers who want more visual separation between nesting levels.
              </p>
              <div className="bg-blue-50 p-2 rounded font-mono text-xs">
                &lt;div&gt;<br/>
                ····&lt;p&gt;Text&lt;/p&gt;<br/>
                &lt;/div&gt;
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
              <h4 className="font-bold text-purple-800 mb-2 text-sm sm:text-base">⚡ 1 Space (Minimal)</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2" style={{textAlign: 'justify'}}>
                Ultra-compact formatting that maximizes screen real estate. Best for developers with limited horizontal space or large monitors.
              </p>
              <div className="bg-purple-50 p-2 rounded font-mono text-xs">
                &lt;div&gt;<br/>
                ·&lt;p&gt;Text&lt;/p&gt;<br/>
                &lt;/div&gt;
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
              <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">📏 8 Spaces (Wide)</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2" style={{textAlign: 'justify'}}>
                Extra-wide indentation for maximum visual clarity. Useful for teaching, presentations, or deeply nested HTML structures.
              </p>
              <div className="bg-green-50 p-2 rounded font-mono text-xs">
                &lt;div&gt;<br/>
                ········&lt;p&gt;Text&lt;/p&gt;<br/>
                &lt;/div&gt;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Information Section */}
      <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 sm:p-6 md:p-8 lg:p-10">

  <div className="prose prose-sm sm:prose-base max-w-none">

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5">
      Understanding HTML Code Formatting and Beautification
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      HTML formatting transforms messy, minified, or poorly structured markup into clean,
      readable code that follows consistent indentation and styling patterns. Properly
      formatted HTML improves readability, debugging speed, collaboration, and long-term
      maintainability for developers working on websites and web applications.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Minified or compressed HTML is useful for production performance but extremely
      difficult for humans to read. Without formatting, developers spend more time
      understanding nesting relationships, locating elements, and debugging layout issues.
      An HTML Formatter automatically restructures code with proper indentation, spacing,
      and line breaks for easier editing and analysis.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Frontend developers often combine formatting workflows with the{" "}
      <a
        href="/html-formatter"
        className="text-blue-600 underline font-medium"
      >
        HTML Formatter
      </a>{" "}
      while improving code readability and debugging frontend layouts.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Why HTML Formatting Matters
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Readable code improves development efficiency significantly. When HTML follows clear
      indentation patterns, developers can quickly understand element hierarchies and
      nesting relationships without manually tracing opening and closing tags.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      This becomes especially important in large applications containing complex layouts,
      reusable components, responsive structures, and dynamically generated content.
      Proper formatting reduces confusion and helps developers make modifications more
      confidently.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers optimizing frontend structure and styling often use the{" "}
      <a
        href="/meta-tag-generator"
        className="text-blue-600 underline font-medium"
      >
        Meta Tag Generator
      </a>{" "}
      while preparing structured and SEO-friendly website pages.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Key Benefits of HTML Beautification
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Beautified HTML improves readability immediately by creating consistent spacing,
      indentation, and structure. Developers can visually scan layouts and identify parent
      and child relationships much faster compared to compressed one-line code.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Debugging also becomes easier because improperly nested elements, missing tags, and
      structural problems become easier to identify visually. Browser developer tools
      already display formatted HTML, so maintaining readable source code improves
      consistency between development and debugging workflows.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Teams collaborating on shared codebases benefit from consistent formatting standards
      because pull requests become easier to review and merge conflicts caused by styling
      inconsistencies decrease significantly.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers converting structured content into reusable frontend code often use the{" "}
      <a
        href="/markdown-to-html"
        className="text-blue-600 underline font-medium"
      >
        Markdown to HTML Converter
      </a>{" "}
      while preparing clean website content and documentation layouts.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Common HTML Formatting Scenarios
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      One of the most common use cases involves formatting minified HTML copied from live
      websites or production systems. Minified code removes unnecessary whitespace and line
      breaks to reduce file size, but it becomes almost unreadable for manual editing.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers also frequently format HTML generated by CMS platforms, template engines,
      page builders, and backend frameworks. Generated markup often prioritizes
      functionality over readability, making beautification useful before debugging or
      customization.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Legacy projects represent another major scenario where formatting becomes essential.
      Older websites sometimes contain inconsistent indentation and years of quick fixes,
      making the code difficult to maintain without restructuring the formatting first.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers comparing updated code structures often use the{" "}
      <a
        href="/text-diff-checker"
        className="text-blue-600 underline font-medium"
      >
        Text Difference Checker
      </a>{" "}
      to identify formatting changes and structural differences between versions.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Indentation Strategies and Best Practices
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Two-space indentation has become one of the most widely used formatting standards in
      modern frontend development. Many technology companies and open-source projects use
      two spaces because it balances readability and efficient horizontal spacing.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Some organizations still prefer four-space indentation because it creates stronger
      visual separation between nesting levels. The most important factor is consistency
      across the project rather than the exact indentation size.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Modern development workflows usually automate formatting rules through linters,
      formatter plugins, and editor configuration files so every team member follows the
      same structure automatically.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers maintaining organized frontend workflows also use the{" "}
      <a
        href="/slug-generator"
        className="text-blue-600 underline font-medium"
      >
        Slug Generator
      </a>{" "}
      while creating cleaner and more structured URLs for web pages.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      HTML Formatting in Modern Development Workflows
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Modern teams increasingly automate formatting inside development pipelines instead of
      handling it manually. Editors like VS Code automatically format HTML on save,
      ensuring consistency without requiring additional developer effort.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Continuous integration systems and pre-commit hooks also validate formatting before
      code enters shared repositories. This reduces unnecessary formatting discussions
      during pull request reviews and allows teams to focus on logic and functionality.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Developers preparing structured SEO pages often combine formatted markup with the{" "}
      <a
        href="/schema-markup-generator"
        className="text-blue-600 underline font-medium"
      >
        Schema Markup Generator
      </a>{" "}
      for cleaner search engine optimization workflows.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Educational Benefits of Proper Formatting
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Beginners learning HTML benefit greatly from readable formatting because indentation
      visually demonstrates nesting and document structure. Proper formatting makes it
      easier to understand containers, sections, lists, forms, and layout hierarchy.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Tutorials, documentation, and educational examples rely heavily on clean formatting
      because poorly structured examples increase confusion for learners.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Students learning frontend development also experiment with structured styling using
      the{" "}
      <a
        href="/color-picker"
        className="text-blue-600 underline font-medium"
      >
        Color Picker
      </a>{" "}
      and the{" "}
      <a
        href="/color-palette-generator"
        className="text-blue-600 underline font-medium"
      >
        Color Palette Generator
      </a>{" "}
      while building visually styled website layouts.
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-5 mt-6 sm:mt-8">
      Performance and Production Optimization
    </h2>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Although formatted HTML improves readability, production websites often use minified
      markup for better loading performance. Removing whitespace and unnecessary line
      breaks reduces file size and improves transfer efficiency.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4"
      style={{ textAlign: "justify" }}
    >
      Modern build systems automatically maintain separate development and production
      versions of HTML so developers can work with readable code while visitors receive
      optimized output.
    </p>

    <p
      className="text-sm sm:text-base text-gray-800 leading-relaxed"
      style={{ textAlign: "justify" }}
    >
      Browser parsing speed differences between formatted and minified HTML are generally
      negligible on modern systems. The biggest advantage of minification comes from
      reduced file transfer size rather than rendering performance itself.
    </p>

  </div>

</article>

    </ToolSection>
  );
}
