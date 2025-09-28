import ClientPage from "./ClientPage";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Age Calculator — Calculate Age Online",
  description:
    "Calculate age online. Free age calculator with birth date options for age calculation and date tracking.",
  slug: "/age-calculator",
  keywords: ["age calculator", "age", "birth date", "age calculation"],
});

export default function Page() {
  return <ClientPage />;
}