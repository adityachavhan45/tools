export const sections = [
  {
    key: "images",
    label: "Images",
    dropdownWidth: "w-[320px] md:w-[520px]",
    gridClass: "md:grid-cols-2",
    links: [
      { href: "/image-compressor", label: "Image Compressor", desc: "Reduce image size without losing quality." },
      { href: "/image-resizer", label: "Image Resizer", desc: "Resize images by width and height." },
      { href: "/png-to-jpg", label: "PNG to JPG", desc: "Convert PNG images to JPG format." },
      { href: "/jpg-to-webp", label: "JPG to WebP", desc: "Convert JPG images to WebP format." },
      { href: "/webp-to-png", label: "WebP to PNG", desc: "Convert WebP images to PNG format." },
      { href: "/svg-to-png", label: "SVG to PNG", desc: "Convert SVG vector to PNG bitmap." },
      { href: "/png-to-ico", label: "PNG to ICO", desc: "Create ICO icons from PNG images." },
      { href: "/images-to-pdf", label: "Images to PDF", desc: "Combine JPG/PNG images into a single PDF." },
    ],
  },
  {
    key: "pdf",
    label: "PDF",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/pdf-merge", label: "PDF Merge", desc: "Combine multiple PDFs into one file." },
      { href: "/pdf-split", label: "PDF Split", desc: "Split PDF pages into separate files." },
      { href: "/pdf-to-image", label: "PDF to Image", desc: "Convert PDF pages to images." },
    ],
  },
  {
    key: "text",
    label: "Text",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/word-counter", label: "Word Counter", desc: "Count words and characters in text." },
      { href: "/case-converter", label: "Case Converter", desc: "Uppercase, lowercase, title and sentence case." },
      { href: "/slug-generator", label: "Slug Generator", desc: "Generate URL-friendly slugs from text." },
      { href: "/json-formatter", label: "JSON Formatter", desc: "Format and validate JSON." },
      { href: "/base64", label: "Base64 Encode/Decode", desc: "Encode or decode Base64 text/files." },
    ],
  },
  {
    key: "seo",
    label: "SEO",
    dropdownWidth: "w-[300px]",
    links: [
      { href: "/meta-tag-generator", label: "Meta Tag Generator", desc: "Generate SEO, OG and Twitter meta tags." },
      { href: "/url-encoder", label: "URL Encoder/Decoder", desc: "Encode or decode URLs (percent-encoding)." },
      { href: "/uuid-generator", label: "UUID Generator", desc: "Generate UUID v4 identifiers." },
      { href: "/password-generator", label: "Password Generator", desc: "Generate strong random passwords." },
    ],
  },
  {
    key: "extras",
    label: "Extras",
    dropdownWidth: "w-[280px]",
    links: [
      { href: "/color-picker", label: "Color Picker", desc: "Pick colors and copy HEX, RGB, HSL." },
      { href: "/qr-code", label: "QR Code", desc: "Generate QR codes for text and links." },
      { href: "/unix-time", label: "Unix Time", desc: "Convert Unix timestamp and human date." },
    ],
  },
];

