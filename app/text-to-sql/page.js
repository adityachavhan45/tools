import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Text to SQL Converter Online — Free Tool to Generate & Format SQL Queries",
  description:
    "Free Text to SQL Converter online. Instantly convert plain text into SQL queries and SQL back to text with validation, formatting, and copy options. Useful for students, developers, database administrators, and data analysts working with MySQL, PostgreSQL, or SQLite.",
  slug: "/text-to-sql",
  keywords:
    "text to sql, sql to text, sql converter, sql query generator, text to sql code, convert text to sql, sql encoder, sql decoder, sql formatter, sql validator, online sql tool, sql string converter, sql generator online, free sql converter, sql code converter, instant sql query builder, best sql converter tool, sql parser online, sql database converter, text to sql for developers, text to sql for students"
});

export default function Page() {
  return <ClientPage />;
}
