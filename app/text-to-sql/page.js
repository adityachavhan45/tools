import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Text to SQL Converter Online | Free, Fast & Accurate SQL Query Generator Tool",
  description:
    "Convert text to SQL queries and SQL back to text instantly with our free online SQL Converter. Generate, format, and validate SQL code for MySQL, PostgreSQL, and SQLite with accuracy and ease. Perfect for developers, students, and data analysts. 100% browser-based and secure.",
  slug: "/text-to-sql",
  keywords:
    "text to sql, sql to text, sql converter, sql query generator, text to sql code, convert text to sql, sql formatter, sql validator, sql encoder, sql decoder, sql generator online, online sql tool, free sql converter, instant sql query builder, sql parser online, sql code converter, sql database converter, text to sql for developers, best sql converter tool, sql generator for mysql, sql generator for postgresql"
});

export default function Page() {
  return <ClientPage />;
}
