import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Random Number Generator — Generate Random Numbers Online",
  description:
    "Generate random numbers online. Free random number generator with range options and batch generation for statistics and testing.",
  slug: "/random-number-generator",
  keywords: ["random number generator", "random numbers", "number generator", "randomizer"],
});

export default function Page() {
  return <ClientPage />;
}