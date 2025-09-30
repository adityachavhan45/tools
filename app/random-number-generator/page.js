import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Random Number Generator Online — Free Tool to Generate Numbers Instantly",
  description:
    "Free Random Number Generator online. Instantly generate random numbers with custom range, quantity, and batch options. Perfect for statistics, math problems, gaming, lottery, testing, and simulations. Fast, secure, and works in your browser.",
  slug: "/random-number-generator",
  keywords:
    "random number generator, random numbers, number generator, randomizer, free random number generator, online number generator, random numbers for lottery, random number picker, generate random numbers, random number generator tool, secure randomizer, random number generator with range, instant random number generator, batch random numbers, randomizer for statistics, random number generator for games, random number generator for testing, random number generator for math, online randomizer, random number generator fast"
});

export default function Page() {
  return <ClientPage />;
}