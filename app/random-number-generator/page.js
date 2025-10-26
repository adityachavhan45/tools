import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title:
    "Random Number Generator Online | Free, Fast & Secure Number Randomizer Tool",
  description:
    "Generate random numbers online instantly with our free Random Number Generator. Choose custom range, quantity, or batch mode for games, math, testing, or lotteries. Simple, secure, and 100% browser-based — no downloads or sign-ups needed.",
  slug: "/random-number-generator",
  keywords:
    "random number generator, random numbers, number generator, randomizer, online number generator, free random number generator, random number picker, random number generator tool, random number generator with range, secure randomizer, instant random number generator, batch random numbers, random number generator for games, random number generator for testing, random number generator for math, randomizer for statistics, random numbers for lottery, online randomizer, fast random number generator"
});

export default function Page() {
  return <ClientPage />;
}
