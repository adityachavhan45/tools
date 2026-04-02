import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to SQL Converter Free Online | Instant SQL Query Generator",
  description:
    "Convert plain English to SQL queries instantly. Free, no login required. Supports MySQL, PostgreSQL and SQLite. Try our AI-powered SQL query generator now. 100% browser-based and secure.",
  slug: "/text-to-sql",
  keywords:
    "text to sql, text to sql converter, sql query generator, convert text to sql, sql generator online, free sql converter, instant sql generator, sql query builder, natural language to sql, ai sql generator, mysql query generator, postgresql query generator, sqlite query generator, online sql tool, sql code generator, text to sql free, sql generator from text, sql query from text, best sql converter, sql generator no login"
});

export default function Page() {
  return <ClientPage />;
}
