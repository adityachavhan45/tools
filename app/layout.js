import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { siteConstants } from "../lib/seo";
import GoogleAnalytics from "./components/googleanalyatics";

export const metadata = (() => {
  const { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SUPPORTED_LANGUAGES } = siteConstants();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "free online tools",
      "PDF tools",
      "image tools", 
      "text tools",
      "SEO tools",
      "calculators",
      "converters",
      "generators",
      "no registration",
      "browser tools",
      "privacy focused",
      "fast tools",
      "mobile friendly"
    ],
    authors: [{ name: "Convertixy Team" }],
    creator: "Convertixy",
    publisher: "Convertixy",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@convertixy",
      creator: "@convertixy",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: SUPPORTED_LANGUAGES.reduce((acc, lang) => {
        acc[`${lang.code}-${lang.country}`] = SITE_URL;
        return acc;
      }, {}),
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
    },
    manifest: "/manifest.json",
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "Convertixy",
      "format-detection": "telephone=no",
      "msapplication-TileColor": "#1e293b",
      "msapplication-config": "/browserconfig.xml",
      "theme-color": "#1e293b",
      "color-scheme": "light dark",
    },
  };
})();

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <GoogleAnalytics />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4118570699223067"
     crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
