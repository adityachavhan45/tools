import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Unix Timestamp Converter Free Online | Epoch to Date and Date to Epoch",
  description:
    "Convert Unix timestamp to human-readable date and date to epoch instantly. Free, no login required. Fast, accurate and secure. Ideal for developers, sysadmins and blockchain applications. Works 100% in your browser.",
  slug: "/unix-time",
  keywords:
    "unix timestamp converter, epoch converter, unix time converter, epoch to date, date to epoch, timestamp converter online, unix epoch converter, epoch time calculator, unix date converter, free epoch converter, instant timestamp converter, epoch converter online, unix to utc converter, timestamp to date converter, date to unix timestamp, unix time tool, epoch timestamp tool, developer timestamp converter, unix timestamp calculator, best epoch converter"
});

export default function Page() {
  return <ClientPage />;
}
