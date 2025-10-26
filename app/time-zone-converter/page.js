import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Time Zone Converter Online | Free, Fast & Accurate World Clock & Time Difference Tool",
  description:
    "Convert time zones instantly with our free Time Zone Converter online. Compare multiple cities, check world clocks, and calculate time differences with accuracy. Ideal for travelers, students, remote workers, and professionals scheduling international meetings. 100% browser-based and secure.",
  slug: "/time-zone-converter",
  keywords:
    "time zone converter, world clock, time difference calculator, convert time zones, online time converter, city time zones, meeting scheduler, international time converter, world time zones, global clock, time converter tool, best time zone converter, free time zone converter, instant time zone calculator, time conversion online, time zones for meetings, remote work time converter, convert utc to local time, world time difference, time zone planner"
});

export default function Page() {
  return <ClientPage />;
}
