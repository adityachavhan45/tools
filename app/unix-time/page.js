import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Unix Time Converter Online — Free Epoch & Timestamp to Human Date Tool",
  description:
    "Free Unix Time Converter online. Instantly convert Unix timestamp (epoch time) to human-readable date and human date back to Unix time. Accurate, fast, and useful for developers, programmers, sysadmins, and blockchain applications.",
  slug: "/unix-time",
  keywords:
    "unix time, epoch converter, timestamp, unix timestamp converter, epoch to human date, human date to unix, timestamp converter, unix epoch converter, online unix time tool, epoch time calculator, unix date converter, free epoch converter, instant timestamp converter, unix format converter, best unix time tool, developer timestamp converter, epoch converter online, unix to utc converter, timestamp to date, date to epoch"
});

export default function Page() {
  return <ClientPage />;
}
