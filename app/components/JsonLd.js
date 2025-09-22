"use client";

import Script from "next/script";
import { useId } from "react";

export default function JsonLd({ data }) {
  const uid = useId();
  if (!data) return null;
  const id = `jsonld-${Array.isArray(data) ? "multi" : "one"}-${uid}`;
  return (
    <Script id={id} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}
