import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Random Number Generator Online Generate Numbers with Custom Range and Batch Mode Free 2026",
  description:
    "Generate random numbers instantly with custom range and batch mode using our free online Random Number Generator. Perfect for games, math, testing and lotteries. Simple, secure and 100% browser based. No signup needed!",
  slug: "/random-number-generator",
  focusKeyword: "Random Number Generator Online Free",
  keywords:
    "random number generator, random numbers, number generator, randomizer, online number generator, free random number generator, random number picker, random number generator tool, random number generator with range, secure randomizer, instant random number generator, batch random numbers, random number generator for games, random number generator for testing, random number generator for math, randomizer for statistics, random numbers for lottery, online randomizer, fast random number generator"
});

export default function Page() {
  return <ClientPage />;
}
