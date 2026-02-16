import { buildMetadata } from "../../lib/seo";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Convertixy. Contact form and support details.",
  slug: "/contact",
  keywords: ["contact", "support", "help"],
});

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Let Connect
          </h1>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Have a question, feedback, or partnership idea? We love to hear from you.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact Form */}
          <ContactForm />

          {/* Support Info */}
          <aside className="border rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Support Details
            </h2>

            <ul className="text-sm text-gray-700 space-y-3">
              <li>⏳ Response time: within 48 hours (business days)</li>
              <li>
                To Collaborate or Paid Promotion with Banner Ads, please contact us through
              </li>
            </ul>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-indigo-700 text-sm">
               Thanks For Visit us Contact page for any query or support. We are here to help you.
            </div>
          </aside>

        </div>

      </section>
    </div>
  );
}
