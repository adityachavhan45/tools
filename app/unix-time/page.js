import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Unix Time Converter Online | Free, Fast & Accurate Epoch Timestamp Tool",
  description:
    "Convert Unix timestamp (epoch time) to human-readable date and vice versa instantly with our free Unix Time Converter online. Accurate, fast, and secure — ideal for developers, programmers, sysadmins, and blockchain applications. Works 100% in your browser.",
  slug: "/unix-time",
  keywords:
    "unix time, epoch converter, timestamp, unix timestamp converter, epoch to human date, human date to unix, timestamp converter, unix epoch converter, epoch time calculator, unix date converter, online unix time tool, free epoch converter, instant timestamp converter, unix format converter, developer timestamp converter, epoch converter online, unix to utc converter, timestamp to date, date to epoch, unix time tool"
});

export default function Page() {
  return <ClientPage />;
}
