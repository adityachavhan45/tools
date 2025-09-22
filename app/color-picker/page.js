import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Color Picker — HEX, RGB, HSL",
  description:
    "Pick colors and copy HEX, RGB, and HSL values. Great for designers and developers.",
  slug: "/color-picker",
  keywords: ["color picker", "hex", "rgb", "hsl"],
});

export default function Page() {
  return <ClientPage />;
}

