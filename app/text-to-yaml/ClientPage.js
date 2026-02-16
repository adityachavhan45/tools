"use client";

import { useState } from "react";
import ToolSection from "../components/ToolSection";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";

export default function TextToYamlPage() {
  const [text, setText] = useState("");
  const [yaml, setYaml] = useState("");
  const [message, setMessage] = useState("");
  const [rootKey, setRootKey] = useState("data");
  const [arrayStyle, setArrayStyle] = useState("dash"); // dash or bracket

  function convertTextToYaml() {
    if (!text.trim()) {
      setMessage("⚠️ Please enter text to convert to YAML.");
      return;
    }

    try {
      const lines = text.split('\n').filter(line => line.trim());
      
      let yamlContent;
      if (arrayStyle === "dash") {
        yamlContent = lines.map((line) => {
          const escapedLine = line.replace(/"/g, '\\"');
          return `  - "${escapedLine}"`;
        }).join('\n');
      } else {
        const escapedLines = lines.map(line => `"${line.replace(/"/g, '\\"')}"`);
        yamlContent = `  [${escapedLines.join(', ')}]`;
      }

      const yamlString = `# Text to YAML Conversion
# Generated: ${new Date().toLocaleString()}
# Lines: ${lines.length}

${rootKey}:
  metadata:
    total_lines: ${lines.length}
    total_characters: ${text.length}
    total_words: ${text.trim().split(/\s+/).length}
    timestamp: "${new Date().toISOString()}"
  
  content:
${yamlContent}
  
  statistics:
    avg_line_length: ${(text.length / lines.length).toFixed(2)}
    max_line_length: ${Math.max(...lines.map(l => l.length))}
    min_line_length: ${Math.min(...lines.map(l => l.length))}`;

      setYaml(yamlString);
      setMessage("✅ Successfully converted text to YAML format!");
    } catch (error) {
      setMessage("❌ Error converting text to YAML. Please try again.");
    }
  }

  function convertYamlToText() {
    if (!yaml.trim()) {
      setMessage("⚠️ Please enter YAML code to convert to text.");
      return;
    }

    try {
      let extractedText = yaml;
      
      // Remove comments
      extractedText = extractedText.replace(/#.*$/gm, '');
      
      // Extract quoted strings
      const stringMatches = extractedText.match(/"([^"\\]*(\\.[^"\\]*)*)"/g);
      if (stringMatches) {
        const textLines = stringMatches
          .map(match => match.slice(1, -1).replace(/\\"/g, '"'))
          .filter(line => line && !line.match(/^\d{4}-\d{2}-\d{2}/)); // Filter timestamps
        extractedText = textLines.join('\n');
      } else {
        // Extract unquoted values
        const lines = extractedText.split('\n')
          .map(line => line.trim())
          .filter(line => line && !line.includes(':'))
          .map(line => line.replace(/^-\s*/, ''))
          .filter(line => line);
        extractedText = lines.join('\n');
      }

      setText(extractedText);
      setMessage("✅ Successfully extracted text from YAML!");
    } catch (error) {
      setMessage("❌ Error converting YAML to text. Please check your YAML syntax.");
    }
  }

  function copyToClipboard(content, type) {
    navigator.clipboard.writeText(content);
    setMessage(`📋 ${type} copied to clipboard!`);
  }

  function downloadYaml() {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rootKey}_${Date.now()}.yaml`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("📥 YAML file downloaded successfully!");
  }

  function reset() {
    setText("");
    setYaml("");
    setRootKey("data");
    setArrayStyle("dash");
    setMessage("🧹 All fields cleared!");
  }

  const stats = {
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').filter(l => l.trim()).length : 0,
    yamlSize: yaml.length,
    indentSpaces: yaml ? yaml.match(/^\s+/m)?.[0].length || 0 : 0
  };

  return (
    <ToolSection
      title="Text to YAML Converter - Free Online Tool"
      subtitle="Convert plain text to YAML format and extract text from YAML instantly. Perfect for DevOps, configuration files, and data serialization."
      plain
      plainSidebar
      whiteBackground
    >
      <JsonLd
        data={buildToolJsonLd({
          name: "Text to YAML Converter",
          description: "Free online tool to convert text to YAML code and YAML to text. Generate valid YAML documents instantly.",
          slug: "/text-to-yaml",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Text to YAML Converter", slug: "/text-to-yaml" },
        ])}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Status Message */}
        {message && (
          <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-yellow-800">{message}</p>
          </div>
        )}

        {/* Main Tool Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">YAML Converter Tool</h2>
            <p className="text-yellow-100 text-sm mt-1">Convert between text and YAML format effortlessly</p>
          </div>

          <div className="p-6 space-y-5">
            {/* YAML Configuration */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔑 Root Key Name
                </label>
                <input
                  type="text"
                  value={rootKey}
                  onChange={(e) => setRootKey(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                  placeholder="e.g., data, config, items"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1.5">Main root key for YAML structure</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📝 Array Style
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all flex-1">
                    <input
                      type="radio"
                      name="arrayStyle"
                      value="dash"
                      checked={arrayStyle === "dash"}
                      onChange={(e) => setArrayStyle(e.target.value)}
                      className="w-4 h-4 text-yellow-600"
                    />
                    <span className="text-sm font-medium">Dash Style</span>
                  </label>
                  <label className="flex items-center gap-2 px-4 py-2.5 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all flex-1">
                    <input
                      type="radio"
                      name="arrayStyle"
                      value="bracket"
                      checked={arrayStyle === "bracket"}
                      onChange={(e) => setArrayStyle(e.target.value)}
                      className="w-4 h-4 text-yellow-600"
                    />
                    <span className="text-sm font-medium">Bracket Style</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Your Text Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here...&#10;Each line will become a YAML array item.&#10;Example:&#10;Apple&#10;Banana&#10;Orange"
                className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm resize-none transition-all"
              />
              {text && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-yellow-600">{stats.chars}</div>
                      <div className="text-gray-600 text-xs">Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">{stats.words}</div>
                      <div className="text-gray-600 text-xs">Words</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-red-600">{stats.lines}</div>
                      <div className="text-gray-600 text-xs">Lines</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-purple-600">{stats.yamlSize}</div>
                      <div className="text-gray-600 text-xs">YAML Size</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-600">{stats.indentSpaces}</div>
                      <div className="text-gray-600 text-xs">Indent Spaces</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={convertTextToYaml}
                disabled={!text.trim()}
                className="flex-1 min-w-[200px] px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                📋 Convert to YAML
              </button>

              <button
                onClick={convertYamlToText}
                disabled={!yaml.trim()}
                className="flex-1 min-w-[200px] px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                📝 Extract Text
              </button>

              <button
                onClick={reset}
                disabled={!text.trim() && !yaml.trim()}
                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                🔄 Reset
              </button>
            </div>

            {/* YAML Output */}
            {yaml && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💾 Generated YAML Code
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-800 text-amber-400 rounded-lg font-mono text-sm whitespace-pre border-2 border-gray-700">
{yaml}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(yaml, "YAML code")}
                      className="px-3 py-1.5 bg-yellow-600 text-white text-xs rounded-md hover:bg-yellow-700 shadow transition-all"
                      title="Copy YAML"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={downloadYaml}
                      className="px-3 py-1.5 bg-orange-600 text-white text-xs rounded-md hover:bg-orange-700 shadow transition-all"
                      title="Download YAML"
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ Valid YAML with proper indentation and formatting
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-sm">
          <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">📘</span> YAML Syntax Examples
          </h3>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 1: Simple List (Dash Style)</div>
              <div className="text-gray-600 mb-1">Text: <code className="bg-gray-100 px-2 py-1 rounded">Apple, Banana, Orange</code></div>
              <div className="text-gray-600">YAML: <code className="bg-gray-100 px-2 py-1 rounded">- "Apple"&#10;- "Banana"&#10;- "Orange"</code></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 2: Bracket Style Array</div>
              <div className="text-gray-600 mb-1">Text: <code className="bg-gray-100 px-2 py-1 rounded">Red, Green, Blue</code></div>
              <div className="text-gray-600">YAML: <code className="bg-gray-100 px-2 py-1 rounded">["Red", "Green", "Blue"]</code></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700 mb-1">Example 3: Configuration Data</div>
              <div className="text-gray-600 mb-1">Use Case: Docker Compose, Kubernetes, CI/CD</div>
              <div className="text-gray-600">Output includes metadata, content, and statistics sections</div>
            </div>
          </div>
        </div>

        {/* Comprehensive Information Section */}
        <article className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Complete Guide to YAML and Text Conversion</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-600 to-orange-600 rounded"></div>
          </header>

          <div className="prose max-w-none space-y-6 text-gray-700" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Understanding YAML: The Human-Friendly Data Format</h3>
              <p className="leading-relaxed mb-4">
                YAML, which stands for "YAML Ain't Markup Language" (originally "Yet Another Markup Language"), represents a fundamental shift in how we think about configuration files and data serialization. Created in 2001 by Clark Evans, Ingy döt Net, and Oren Ben-Kiki, YAML was designed with a core philosophy that data should be easily readable and writable by humans while maintaining full compatibility with programming languages and data processing tools. This human-centric approach distinguishes YAML from alternatives like XML or JSON, making it the preferred choice for configuration management, infrastructure as code, and modern DevOps workflows.
              </p>
              <p className="leading-relaxed mb-4">
                The syntax of YAML relies on indentation and simple structural markers rather than complex tags or excessive punctuation. Where XML requires opening and closing tags that clutter documents with redundant information, and JSON demands brackets and commas that can become confusing in nested structures, YAML uses clean whitespace indentation to represent hierarchy. This minimalist approach dramatically improves readability and reduces the cognitive load when working with configuration files. A YAML file describing server configuration reads almost like a simple outline or checklist, making it accessible to non-programmers while remaining completely unambiguous for machine parsing.
              </p>
              <p className="leading-relaxed mb-4">
                YAML supports rich data types including scalars (strings, numbers, booleans), sequences (arrays or lists), and mappings (dictionaries or key-value pairs). It provides multiple ways to represent the same data structure, allowing developers to choose the most readable format for their specific use case. Lists can be written using dashes for clarity or brackets for compactness. Strings can be unquoted for simplicity, single-quoted to preserve literal content, or double-quoted to support escape sequences. Multi-line strings can span several lines using literal block scalars (|) that preserve newlines or folded scalars (&gt;) that wrap text into a single line. This flexibility makes YAML suitable for diverse applications from simple configuration files to complex data interchange formats.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">YAML in Modern DevOps and Cloud Infrastructure</h3>
              <p className="leading-relaxed mb-4">
                The explosion of containerization, cloud computing, and infrastructure as code has elevated YAML from a simple configuration format to an essential language for modern software development. Docker Compose, the most popular tool for defining multi-container Docker applications, uses YAML exclusively to describe services, networks, volumes, and dependencies. Developers can define entire application stacks with dozens of interconnected services in readable YAML files that serve both as executable configuration and self-documenting architecture diagrams. The clarity of YAML makes it easy for team members to understand complex deployments without extensive documentation or tribal knowledge.
              </p>
              <p className="leading-relaxed mb-4">
                Kubernetes, the dominant container orchestration platform that powers much of the modern cloud infrastructure, relies entirely on YAML for defining resources. Every deployment, service, pod, config map, secret, and ingress in Kubernetes is declared using YAML manifests that describe the desired state of the system. This declarative approach, where you specify what you want rather than how to achieve it, aligns perfectly with YAML's design philosophy. DevOps engineers can version control their entire infrastructure as YAML files, track changes over time, review modifications through pull requests, and automatically deploy changes using continuous integration pipelines. This "infrastructure as code" paradigm has revolutionized operations, making environments reproducible, auditable, and manageable at scale.
              </p>
              <p className="leading-relaxed mb-4">
                Continuous Integration and Continuous Deployment (CI/CD) systems have embraced YAML as their standard configuration language. GitHub Actions, GitLab CI, CircleCI, Travis CI, and virtually every modern CI/CD platform use YAML workflow files to define build pipelines, test suites, deployment procedures, and automation tasks. These YAML configurations describe complex workflows involving multiple steps, conditional logic, parallel execution, secret management, and integration with various services. The readability of YAML makes it easy for developers to understand and modify CI/CD pipelines without specialized knowledge, democratizing automation and empowering teams to take ownership of their deployment processes.
              </p>
              <p className="leading-relaxed mb-4">
                Configuration management tools like Ansible, Puppet, and SaltStack use YAML to describe system states, deployment procedures, and automation playbooks. Ansible playbooks, written entirely in YAML, allow system administrators to automate complex tasks across thousands of servers using simple, readable instructions. Unlike traditional shell scripts that are often fragile and difficult to understand, Ansible YAML playbooks are idempotent (can be run multiple times safely), self-documenting, and easily maintainable. This has transformed system administration from manual, error-prone processes to automated, reliable operations that scale effortlessly.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">YAML Syntax Rules and Best Practices</h3>
              <p className="leading-relaxed mb-4">
                Understanding YAML's syntax rules is crucial for creating valid, maintainable configuration files. Indentation in YAML is not merely cosmetic but structurally significant - it defines the hierarchy and nesting of data elements. YAML requires consistent indentation using spaces (not tabs), typically two or four spaces per level. Mixing tabs and spaces or using inconsistent indentation will cause parsing errors. This strict indentation rule, while occasionally frustrating for beginners, enforces clean, readable formatting and eliminates ambiguity in document structure.
              </p>
              <p className="leading-relaxed mb-4">
                Key-value pairs in YAML use a colon followed by a space to separate keys from values. The space after the colon is mandatory and often a source of errors for newcomers. Keys must be unique within their scope, though the same key can appear in different contexts. String values in YAML generally don't require quotes unless they contain special characters or could be misinterpreted as other data types. Numbers that look like version numbers (1.2.0) should be quoted to prevent interpretation as floating-point numbers. Boolean values can be represented as true/false, yes/no, or on/off, though true/false is recommended for clarity and consistency across different YAML parsers.
              </p>
              <p className="leading-relaxed mb-4">
                Lists in YAML can be represented in two ways: block style using dashes or flow style using brackets. Block style with dashes is more readable for long lists and nested structures, making it the preferred choice for configuration files. Flow style with brackets is more compact and suitable for short lists of simple values. Dictionaries (mappings) similarly support both block and flow styles. Mixing styles within a document is allowed but should be done judiciously to maintain readability. The golden rule is to prioritize human readability while ensuring the YAML remains valid and unambiguous for parsers.
              </p>
              <p className="leading-relaxed mb-4">
                Comments in YAML begin with a hash symbol (#) and extend to the end of the line. Unlike some languages, YAML does not support multi-line comment blocks, so each comment line must be prefixed with #. Good YAML files include comments explaining non-obvious configuration choices, documenting expected values, and providing examples. However, over-commenting obvious configurations adds clutter without value. The goal is self-documenting YAML where names and structure convey meaning, supplemented by comments only where necessary for clarity or context.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">How Our Text to YAML Converter Works</h3>
              <p className="leading-relaxed mb-4">
                Our Text to YAML Converter provides a streamlined interface for transforming plain text into properly structured YAML documents without requiring deep knowledge of YAML syntax or manual formatting. When you enter text into the converter, each line becomes an element in a YAML list, automatically handling quoting, escaping, and indentation according to YAML standards. The converter intelligently processes your input, ensuring that special characters are properly escaped, quotes within text are handled correctly, and the resulting YAML is both syntactically valid and semantically clear.
              </p>
              <p className="leading-relaxed mb-4">
                The tool offers customization options that give you control over the structure and style of the generated YAML. You can specify the root key name, which becomes the top-level identifier in your YAML document. This is particularly useful when generating configuration files that need to match specific schemas or naming conventions. For example, if you're creating Kubernetes manifests, you might use "metadata" or "spec" as root keys. If you're generating application configuration, you might choose "settings" or "config". This flexibility ensures the generated YAML integrates seamlessly into your existing projects.
              </p>
              <p className="leading-relaxed mb-4">
                The array style option allows you to choose between dash-style lists (using hyphens) and bracket-style arrays (using square brackets). Dash style produces YAML that looks more traditional and readable, making it ideal for configuration files that will be read and edited by humans. Bracket style creates more compact YAML similar to JSON arrays, useful when you need to minimize file size or prefer a format that's familiar to developers coming from JSON backgrounds. Both styles are valid YAML and can be chosen based on your preferences or requirements.
              </p>
              <p className="leading-relaxed mb-4">
                The converter automatically generates comprehensive metadata and statistics sections that provide valuable context about your data. The metadata section includes line count, character count, word count, and timestamp information, useful for version tracking and documentation. The statistics section calculates average line length, maximum line length, and minimum line length, offering insights into your data structure. These additional sections demonstrate best practices for YAML documentation while providing practical utility for data analysis and debugging.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-World Applications and Use Cases</h3>
              <p className="leading-relaxed mb-4">
                The Text to YAML Converter serves countless practical purposes across software development and operations. Application developers use it to quickly generate configuration files for microservices, defining environment variables, database connections, API endpoints, and feature flags. Instead of manually writing YAML with proper indentation and syntax, developers can list configuration values as text and convert them to valid YAML in seconds. This accelerates development workflows and reduces configuration errors that can cause application failures or security vulnerabilities.
              </p>
              <p className="leading-relaxed mb-4">
                Infrastructure teams leverage the converter when migrating from legacy configuration formats to modern YAML-based systems. When transitioning from proprietary configuration files, INI files, or environment variable lists to Docker Compose or Kubernetes, the converter provides a quick way to transform existing settings into YAML format. System administrators can extract current configurations as simple text lists, then convert them to YAML for import into new systems, significantly reducing migration effort and errors.
              </p>
              <p className="leading-relaxed mb-4">
                Data scientists and analysts use the converter when preparing datasets for machine learning pipelines or data processing workflows. Many modern ML frameworks and data tools accept configuration in YAML format. Researchers can maintain their experimental parameters, model hyperparameters, or data processing steps as simple text files, then convert them to YAML for use with tools like MLflow, Kubeflow, or custom training scripts. This separation between human-readable parameter lists and machine-consumable YAML configurations improves reproducibility and collaboration.
              </p>
              <p className="leading-relaxed mb-4">
                Educational institutions employ the converter as a teaching tool for introducing students to YAML and configuration management concepts. Students learning DevOps, cloud computing, or modern software development can experiment with YAML conversion, observing how text transforms into structured data. Instructors can demonstrate YAML principles interactively, showing the relationship between simple lists and complex configurations. This hands-on approach makes abstract concepts concrete and helps students develop intuition for working with configuration files in professional settings.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Common YAML Pitfalls and How to Avoid Them</h3>
              <p className="leading-relaxed mb-4">
                Indentation errors represent the most common source of YAML parsing failures. Because YAML uses whitespace to define structure, inconsistent indentation creates ambiguous documents that parsers cannot process. Always use spaces for indentation, never tabs, as different editors display tabs with different widths, breaking the visual alignment that YAML relies upon. Configure your text editor to insert spaces when you press the Tab key and to highlight whitespace characters so you can verify consistent indentation. Most modern code editors include YAML-specific plugins that automatically validate indentation and highlight structural errors.
              </p>
              <p className="leading-relaxed mb-4">
                Quoting issues frequently cause unexpected behavior in YAML documents. Unquoted strings that begin with special characters or look like numbers can be misinterpreted by parsers. Version numbers like "1.0" might be parsed as floating-point numbers instead of strings. Boolean-like values such as "yes", "no", "true", or "false" will be converted to boolean types unless quoted. To avoid ambiguity, quote string values that could be confused with other data types, contain special characters, or include leading/trailing whitespace that should be preserved. When in doubt, quoting is safer than not quoting.
              </p>
              <p className="leading-relaxed mb-4">
                Anchor and alias misuse can create confusing or invalid YAML documents. While anchors (&) and aliases (*) provide powerful mechanisms for reusing content and avoiding duplication, incorrect usage can lead to circular references or unexpected behavior. Use anchors and aliases judiciously, primarily for genuinely repeated content that should remain synchronized. For independent sections that happen to look similar, duplicate the content rather than using aliases, as this makes the YAML more maintainable and less error-prone when sections diverge during updates.
              </p>
              <p className="leading-relaxed mb-4">
                Multi-line string handling requires understanding the difference between literal (|) and folded (&gt;) block scalars. Literal blocks preserve newlines exactly as written, making them ideal for scripts, code snippets, or formatted text. Folded blocks collapse newlines into spaces (except for blank lines), useful for long text paragraphs that should wrap continuously. Choosing the wrong scalar style can result in text that displays incorrectly or scripts that fail to execute. Always test multi-line strings in your target application to ensure they behave as expected.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">YAML vs JSON vs XML: Choosing the Right Format</h3>
              <p className="leading-relaxed mb-4">
                YAML, JSON, and XML each excel in different scenarios, and understanding their trade-offs helps you choose the appropriate format for your needs. YAML prioritizes human readability and writability, making it ideal for configuration files that people will edit frequently. Its clean syntax reduces cognitive load and allows non-programmers to understand and modify settings confidently. However, YAML's flexibility and multiple representation styles can lead to inconsistencies if teams don't establish conventions. YAML parsers are generally slower than JSON parsers, though this performance difference is negligible for typical configuration files.
              </p>
              <p className="leading-relaxed mb-4">
                JSON offers simplicity, ubiquity, and excellent performance, making it the standard for web APIs and data interchange between applications. Nearly every programming language has robust JSON support, and JSON's strict syntax leaves no room for ambiguity or variation. However, JSON's requirement for quotes around all keys and string values, along with mandatory commas and brackets, makes it less pleasant for humans to write and read compared to YAML. JSON also lacks support for comments, making it difficult to document complex structures inline. For APIs and programmatic data exchange, JSON's strengths outweigh its readability limitations.
              </p>
              <p className="leading-relaxed mb-4">
                XML provides the most sophisticated features including namespaces, schemas for validation, and XSLT for transformation, making it ideal for complex document structures and enterprise integration scenarios. Industries with strict standards and compliance requirements often mandate XML for data exchange. However, XML's verbosity and complexity make it overkill for simple configurations and frustrating for everyday use. Modern development increasingly favors YAML for configuration and JSON for data exchange, reserving XML for legacy systems and specialized use cases where its advanced features are genuinely necessary.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Security and Privacy Considerations</h3>
              <p className="leading-relaxed mb-4">
                Our Text to YAML Converter operates entirely within your web browser using client-side JavaScript, ensuring absolute privacy and security of your data. No text you enter is transmitted to external servers, stored in databases, logged for analytics, or shared with any third parties. This local processing architecture makes the tool completely safe for converting sensitive configuration data, proprietary information, or confidential documents. You maintain full control over your data at all times, and you can verify this behavior by monitoring network traffic or using the tool in offline mode after initial page load.
              </p>
              <p className="leading-relaxed mb-4">
                However, remember that YAML itself provides no encryption or security features - it's a plain text format that anyone with file access can read. When working with sensitive data like passwords, API keys, or private credentials, never store them directly in YAML files committed to version control. Instead, use secret management tools like HashiCorp Vault, Kubernetes Secrets (which encrypts data at rest), AWS Secrets Manager, or Azure Key Vault. Reference secrets in YAML using placeholders or environment variables, keeping actual credentials in secure systems designed for secret storage.
              </p>
              <p className="leading-relaxed mb-4">
                YAML parsing can be vulnerable to certain attacks if you're processing YAML from untrusted sources. Some YAML parsers support advanced features like arbitrary code execution through Python object deserialization or custom constructors that attackers could exploit. When building applications that parse user-submitted YAML, use safe loading modes that disable dangerous features and limit what YAML can represent. Validate YAML against schemas before processing to ensure it contains only expected data types and structures. Our converter generates safe, simple YAML without advanced features that could pose security risks.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Can YAML be converted to JSON and vice versa?</p>
                  <p className="leading-relaxed">Yes, YAML and JSON are largely compatible since YAML 1.2 is a superset of JSON. Any valid JSON is also valid YAML, and most YAML documents can be converted to JSON (though some YAML features like comments and certain data types don't translate). Many tools and libraries provide YAML-JSON conversion in both directions.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Why does my YAML fail to parse even though it looks correct?</p>
                  <p className="leading-relaxed">The most common causes are inconsistent indentation (mixing spaces and tabs), missing spaces after colons, or special characters in unquoted strings. Use a YAML linter or validator to identify specific errors. Enable visible whitespace in your editor to catch indentation problems. Always use spaces for indentation, never tabs.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">What's the file extension for YAML files?</p>
                  <p className="leading-relaxed">YAML files typically use .yaml or .yml extensions. Both are acceptable and widely recognized. The .yaml extension is slightly more descriptive, while .yml is more concise and commonly used in Docker Compose and CI/CD configs. Choose one and use it consistently across your project.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Can YAML handle very large datasets?</p>
                  <p className="leading-relaxed">While YAML can technically represent large datasets, it's not optimized for this purpose. For large data volumes, consider binary formats, databases, or specialized data formats like Parquet or Avro. YAML is best suited for configuration files and small to medium-sized data structures where human readability is important.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Is the generated YAML compatible with all tools?</p>
                  <p className="leading-relaxed">Yes, our converter generates standard YAML 1.2 that's compatible with all major tools and parsers including Docker, Kubernetes, Ansible, GitHub Actions, and programming language YAML libraries. The output follows best practices and uses common, well-supported YAML features that work across all platforms.</p>
                </div>
              </div>
            </section>

            <section className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Conclusion: Simplify Your YAML Workflow</h3>
              <p className="leading-relaxed mb-4">
                The Text to YAML Converter empowers you to work more efficiently with one of the most important configuration formats in modern software development. By automating the conversion between plain text and properly formatted YAML, the tool eliminates syntax errors, saves time, and allows you to focus on content rather than formatting. Whether you're managing Kubernetes deployments, writing Docker Compose files, configuring CI/CD pipelines, or learning YAML fundamentals, this converter streamlines your workflow and improves productivity.
              </p>
              <p className="leading-relaxed">
                YAML's human-friendly design combined with our intuitive converter creates a powerful combination for anyone working with configuration management or data serialization. The tool's privacy-focused architecture, comprehensive features, and professional output make it an essential resource for developers, DevOps engineers, system administrators, and students. Start using the Text to YAML Converter today to transform how you create and manage YAML files, bringing simplicity and reliability to your configuration workflows.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 shadow-sm">
          <h3 className="text-lg font-bold text-green-900 mb-4">💡 YAML Pro Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ textAlign: 'justify' }}>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-green-700 mb-2">✓ Use Consistent Indentation</div>
              <p className="text-gray-700 leading-relaxed">Always use spaces (not tabs) and stick to 2 or 4 spaces per indentation level throughout your YAML files.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-green-700 mb-2">✓ Quote When Uncertain</div>
              <p className="text-gray-700 leading-relaxed">When in doubt, quote string values to avoid misinterpretation as numbers, booleans, or special values.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-green-700 mb-2">✓ Validate Before Deploy</div>
              <p className="text-gray-700 leading-relaxed">Use YAML validators and linters to catch errors before deploying configurations to production environments.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-green-700 mb-2">✓ Keep It Simple</div>
              <p className="text-gray-700 leading-relaxed">Avoid overusing advanced YAML features. Simple, readable YAML is easier to maintain and less error-prone.</p>
            </div>
          </div>
        </div>
      </div>
    </ToolSection>
  );
}