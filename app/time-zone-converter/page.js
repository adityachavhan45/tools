import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Time Zone Converter Free Online | World Clock and Time Difference Calculator",
  description:
    "Convert time zones instantly. Free, no login required. Compare multiple cities, check world clocks and calculate time differences with accuracy. Perfect for travelers, remote workers and professionals scheduling international meetings. 100% browser-based and secure.",
  slug: "/time-zone-converter",
  keywords:
    "time zone converter, time zone converter online, convert time zones, world clock, time difference calculator, international time converter, free time zone converter, instant time zone converter, time conversion online, city time zones, utc to local time, local time to utc, meeting time zone converter, remote work time converter, time zone planner, world time zones, global time converter, time zone calculator free, best time zone converter, time zone converter no login"
});

export default function Page() {
  return <ClientPage />;
}
