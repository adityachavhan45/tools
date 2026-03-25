"use client";

import { useMemo, useState } from "react";
import ToolSection from "../components/ToolSection";

const sections = [
  {
    heading: "What Schema Markup Generator Does and Why It Matters",
    paragraphs: [
      "Schema Markup Generator helps people create structured data without writing JSON-LD by hand. A user can choose a schema type, fill in a few fields, and instantly get ready-to-use markup. This matters because structured data is useful, but writing valid schema manually is slow and easy to get wrong. A simple browser tool removes that friction and gives users a cleaner workflow.",
      "This tool is useful because website owners, SEOs, and developers often want rich result eligibility and better content understanding in search engines. They usually do not want to search documentation for every property each time. A focused generator saves time, reduces mistakes, and makes implementation easier.",
      "Another reason this matters is consistency. When teams create schema manually, small formatting differences and missing fields can build up over time. A generator creates a more reliable starting point for repeated work across many pages. That reliability is helpful for publishers, agencies, and business sites that want a practical workflow instead of technical guesswork every time they publish a page.",
    ],
  },
  {
    heading: "Who Should Use Schema Markup Generator",
    paragraphs: [
      "This tool works well for bloggers, SEO professionals, agencies, developers, local businesses, and store owners. Some users need article schema, some need FAQ schema, and others need product or organization markup. Instead of using separate workflows, they can generate common types from one page.",
      "It also helps beginners because it replaces code complexity with clear form inputs. The user does not need deep technical knowledge to create a valid starting point.",
      "It is also useful for experienced users who understand schema already but do not want to waste time repeating boilerplate code. Even when someone knows JSON-LD well, it is still faster to fill a focused form and copy the result than to type every property from scratch for routine pages.",
    ],
  },
  {
    heading: "How to Use Schema Markup Generator Step by Step",
    paragraphs: [
      "First, select the schema type that matches your page. Then enter the important values like name, description, URL, and any extra fields needed for that type. The page generates JSON-LD immediately, so you can review it before copying.",
      "After that, copy the output and place it on your page. It is still smart to validate the markup after implementation because structured data should match the actual visible page content.",
      "A practical way to use the tool is to gather the page details before opening it. If the user already has the headline, description, image URL, dates, business details, or product details ready, the process becomes very quick. That makes the tool helpful not just for one-off generation, but also for regular publishing workflows.",
    ],
  },
  {
    heading: "Common Mistakes and How to Avoid Them",
    paragraphs: [
      "A common mistake is choosing the wrong schema type or filling fields with incomplete values. Another issue is adding markup that does not actually represent the page. Search engines prefer accurate structured data, so misleading schema should be avoided.",
      "It is also important to keep URLs, dates, and other details correct. Small mismatches can make the output less useful or create validation issues.",
      "Another mistake is thinking schema markup alone will create rankings or rich results automatically. Structured data helps explain the page better, but the page still needs strong content, a clear purpose, and good technical health. Users get the best results when they treat schema as one helpful part of a broader SEO process rather than a magic trick.",
    ],
  },
  {
    heading: "Why This Tool Has Long-Term Value",
    paragraphs: [
      "Structured data remains a useful technical SEO topic because search engines still benefit from better page context. That makes schema generation an evergreen need rather than a short trend.",
      "A good schema tool can keep getting traffic because users repeatedly need article, FAQ, product, and business markup across many pages and projects.",
      "This page also has long-term value because schema use cases continue across many types of websites. A blog may need FAQ schema today and article schema tomorrow. An e-commerce page may need product schema. A company page may need organization schema. That repeating demand is exactly what makes a practical generator useful over time.",
    ],
  },
  {
    heading: "Best Practices for Better Results",
    paragraphs: [
      "Use the schema type that really matches the page. Enter accurate details, keep URLs correct, and make sure the markup supports visible content instead of hidden claims.",
      "After generating the code, validate it and review the page one more time before publishing. Fast generation is useful, but correct implementation matters most.",
      "It is also a good habit to keep schema simple when possible. Users do not always need every optional property. Clean, correct, relevant schema is usually better than overly complex markup filled with low-quality or unnecessary values. Practical accuracy matters more than stuffing every possible field.",
    ],
  },
];

const faq = [
  { question: "What is schema markup?", answer: "Schema markup is structured data that helps search engines understand webpage content better. Instead of forcing crawlers to infer every detail from raw HTML, schema provides clearer labels for important information such as articles, organizations, products, and questions. That can improve how a page is interpreted and may support rich result eligibility in some cases." },
  { question: "Which schema format is best?", answer: "JSON-LD is widely used and commonly recommended for many SEO use cases because it is cleaner to manage and easier to place on a page without mixing too deeply into visible HTML markup. It is also easier for many site owners and developers to generate, review, and update over time." },
  { question: "Can this tool generate FAQ schema?", answer: "Yes, the tool supports FAQ schema along with several other common schema types. That makes it useful for content pages, blog posts, business pages, product pages, and other practical publishing needs where users want a fast JSON-LD starting point." },
  { question: "Is this schema generator free?", answer: "Yes, it is free to use online. The page is designed for quick browser-based generation, so users can build and copy schema without creating an account or installing anything." },
  { question: "Do I need coding knowledge to use it?", answer: "No, you only need to fill in the form and copy the output. Some users may still choose to validate or edit the code later, but the basic workflow is built to be simple enough for non-developers as well." },
];

const initialValues = {
  name: "",
  headline: "",
  description: "",
  url: "",
  image: "",
  author: "",
  datePublished: "",
  dateModified: "",
  question: "",
  answer: "",
  price: "",
  currency: "USD",
  brand: "",
  phone: "",
  address: "",
};

function buildSchema(schemaType, values) {
  const base = {
    "@context": "https://schema.org",
  };

  if (schemaType === "Article") {
    return {
      ...base,
      "@type": "Article",
      headline: values.headline || values.name,
      description: values.description,
      author: values.author ? { "@type": "Person", name: values.author } : undefined,
      image: values.image || undefined,
      datePublished: values.datePublished || undefined,
      dateModified: values.dateModified || values.datePublished || undefined,
      mainEntityOfPage: values.url || undefined,
    };
  }

  if (schemaType === "FAQPage") {
    return {
      ...base,
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: values.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: values.answer,
          },
        },
      ],
    };
  }

  if (schemaType === "Product") {
    return {
      ...base,
      "@type": "Product",
      name: values.name,
      description: values.description,
      image: values.image || undefined,
      brand: values.brand ? { "@type": "Brand", name: values.brand } : undefined,
      offers: {
        "@type": "Offer",
        priceCurrency: values.currency || "USD",
        price: values.price || undefined,
        availability: "https://schema.org/InStock",
        url: values.url || undefined,
      },
    };
  }

  if (schemaType === "Organization") {
    return {
      ...base,
      "@type": "Organization",
      name: values.name,
      description: values.description,
      url: values.url || undefined,
      logo: values.image || undefined,
      telephone: values.phone || undefined,
    };
  }

  if (schemaType === "Website") {
    return {
      ...base,
      "@type": "WebSite",
      name: values.name,
      description: values.description,
      url: values.url || undefined,
    };
  }

  return {
    ...base,
    "@type": "LocalBusiness",
    name: values.name,
    description: values.description,
    url: values.url || undefined,
    image: values.image || undefined,
    telephone: values.phone || undefined,
    address: values.address
      ? {
          "@type": "PostalAddress",
          streetAddress: values.address,
        }
      : undefined,
  };
}

function cleanObject(value) {
  if (Array.isArray(value)) {
    return value.map(cleanObject).filter(Boolean);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, nested]) => [key, cleanObject(nested)])
        .filter(([, nested]) => nested !== undefined && nested !== "" && nested !== null)
    );
  }

  return value;
}

function isValidUrl(value) {
  if (!value.trim()) return true;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidDate(value) {
  if (!value.trim()) return true;
  return !Number.isNaN(Date.parse(value.trim()));
}

function getValidationErrors(schemaType, values) {
  const errors = [];

  if (schemaType === "Article" && !values.headline.trim() && !values.name.trim()) {
    errors.push("Add a headline or title to generate useful article schema.");
  }

  if (schemaType === "FAQPage") {
    if (!values.question.trim()) errors.push("Add at least one FAQ question.");
    if (!values.answer.trim()) errors.push("Add an answer for the FAQ item.");
  }

  if (["Product", "Organization", "Website", "LocalBusiness"].includes(schemaType) && !values.name.trim()) {
    errors.push("Name is required for this schema type.");
  }

  if (schemaType === "Product") {
    if (values.price.trim() && Number(values.price) < 0) {
      errors.push("Price cannot be negative.");
    }

    if (values.currency.trim() && !/^[A-Za-z]{3}$/.test(values.currency.trim())) {
      errors.push("Currency should use a 3-letter code like USD or INR.");
    }
  }

  if (!isValidUrl(values.url)) errors.push("Enter a valid page URL.");
  if (!isValidUrl(values.image)) errors.push("Enter a valid image URL.");
  if (!isValidDate(values.datePublished)) errors.push("Use a valid published date.");
  if (!isValidDate(values.dateModified)) errors.push("Use a valid modified date.");

  return errors;
}

export default function SchemaMarkupGeneratorPage() {
  const [schemaType, setSchemaType] = useState("Article");
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState("");
  const validationErrors = useMemo(() => getValidationErrors(schemaType, values), [schemaType, values]);

  const output = useMemo(() => {
    const schema = cleanObject(buildSchema(schemaType, values));
    return JSON.stringify(schema, null, 2);
  }, [schemaType, values]);

  const setValue = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const copyOutput = async () => {
    if (validationErrors.length) {
      setMessage("Please fix the highlighted validation issues before copying.");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    await navigator.clipboard.writeText(output);
    setMessage("Schema copied to clipboard.");
    setTimeout(() => setMessage(""), 2500);
  };

  const clearAll = () => {
    setValues(initialValues);
    setMessage("");
  };

  return (
    <ToolSection
      title="Schema Markup Generator"
      subtitle="Create clean JSON-LD schema markup for common SEO use cases and copy it instantly."
      sidebar={
        <div className="space-y-4 text-sm text-gray-700">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">Best practice</p>
            <p className="mt-2">Use the schema type that truly matches the page. Do not add misleading markup only to chase rich results.</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-900">Privacy note</p>
            <p className="mt-2">Everything is generated in your browser. No schema data is uploaded anywhere.</p>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Schema Type</label>
            <select
              value={schemaType}
              onChange={(e) => setSchemaType(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
            >
              {["Article", "FAQPage", "Product", "Organization", "Website", "LocalBusiness"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Name or Title</label>
            <input
              value={values.name}
              onChange={(e) => setValue("name", e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400"
              placeholder="Enter name"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">URL</label>
            <input
              value={values.url}
              onChange={(e) => setValue("url", e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400"
              placeholder="https://example.com/page"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Image URL</label>
            <input
              value={values.image}
              onChange={(e) => setValue("image", e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={values.description}
            onChange={(e) => setValue("description", e.target.value)}
            className="min-h-28 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400"
            placeholder="Enter a short description"
          />
        </div>

        {schemaType === "Article" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <input value={values.headline} onChange={(e) => setValue("headline", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Headline" />
            <input value={values.author} onChange={(e) => setValue("author", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Author" />
            <input value={values.datePublished} onChange={(e) => setValue("datePublished", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="2026-03-25" />
            <input value={values.dateModified} onChange={(e) => setValue("dateModified", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="2026-03-25" />
          </div>
        ) : null}

        {schemaType === "FAQPage" ? (
          <div className="grid gap-4">
            <input value={values.question} onChange={(e) => setValue("question", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Question" />
            <textarea value={values.answer} onChange={(e) => setValue("answer", e.target.value)} className="min-h-24 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Answer" />
          </div>
        ) : null}

        {schemaType === "Product" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <input value={values.brand} onChange={(e) => setValue("brand", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Brand" />
            <input value={values.price} onChange={(e) => setValue("price", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Price" />
            <input value={values.currency} onChange={(e) => setValue("currency", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Currency" />
          </div>
        ) : null}

        {schemaType === "Organization" || schemaType === "LocalBusiness" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <input value={values.phone} onChange={(e) => setValue("phone", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Phone" />
            <input value={values.address} onChange={(e) => setValue("address", e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400" placeholder="Address" />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button onClick={copyOutput} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
            Copy Schema
          </button>
          <button onClick={clearAll} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700">
            Clear
          </button>
          {message ? <p className="self-center text-sm text-green-700">{message}</p> : null}
        </div>

        {validationErrors.length ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold text-red-900">Please review these fields before using the schema:</p>
            <ul className="mt-2 space-y-1">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">Generated JSON-LD</label>
          <pre className="overflow-auto rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800">
            {output}
          </pre>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About This Tool</h2>
          <div className="mt-6 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold text-gray-900">{section.heading}</h3>
                <div className="mt-3 space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-justify">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </ToolSection>
  );
}
