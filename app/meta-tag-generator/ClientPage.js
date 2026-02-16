"use client";

import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [siteName, setSiteName] = useState("");
  const [message, setMessage] = useState("");

  const html = useMemo(() => {
    const safe = (s) => s.replace(/["<>]/g, "");
    return `<!-- Primary Meta Tags -->
<title>${safe(title)}</title>
<meta name="title" content="${safe(title)}" />
<meta name="description" content="${safe(description)}" />
${keywords ? `<meta name="keywords" content="${safe(keywords)}" />` : ''}
${author ? `<meta name="author" content="${safe(author)}" />` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="index, follow" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${safe(url)}" />
<meta property="og:title" content="${safe(title)}" />
<meta property="og:description" content="${safe(description)}" />
${image ? `<meta property="og:image" content="${safe(image)}" />` : ''}
${siteName ? `<meta property="og:site_name" content="${safe(siteName)}" />` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${safe(url)}" />
<meta property="twitter:title" content="${safe(title)}" />
<meta property="twitter:description" content="${safe(description)}" />
${image ? `<meta property="twitter:image" content="${safe(image)}" />` : ''}`;
  }, [title, description, keywords, url, image, author, siteName]);

  function copy() {
    navigator.clipboard.writeText(html);
    showMessage("📋 Meta tags copied to clipboard!");
  }

  function download() {
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "meta-tags.html";
    a.click();
    URL.revokeObjectURL(a.href);
    showMessage("📥 Meta tags file downloaded successfully!");
  }

  function clearAll() {
    setTitle("");
    setDescription("");
    setKeywords("");
    setUrl("");
    setImage("");
    setAuthor("");
    setSiteName("");
    showMessage("🧹 All fields cleared!");
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <JsonLd
        data={buildToolJsonLd({
          name: "Meta Tag Generator",
          description:
            "Generate SEO meta tags, Open Graph, and Twitter cards with live preview. Free tool for optimizing website metadata.",
          slug: "/meta-tag-generator",
          category: "Utilities/SEO",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Meta Tag Generator", slug: "/meta-tag-generator" },
        ])}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Meta Tag Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create professional SEO meta tags, Open Graph tags, and Twitter Cards instantly. 
            Optimize your website for search engines and social media with our free online tool.
          </p>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mb-6 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg shadow-md">
            <p className="text-green-800 font-medium">{message}</p>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-2xl">✏️</span>
              Website Information
            </h3>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="Best Smartphones 2025 - Complete Guide"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {titleLength} characters
                  </p>
                  <p className={`text-xs font-medium ${
                    titleLength >= 50 && titleLength <= 60 
                      ? 'text-green-600' 
                      : titleLength > 60 
                      ? 'text-red-600' 
                      : 'text-amber-600'
                  }`}>
                    {titleLength >= 50 && titleLength <= 60 
                      ? '✓ Optimal' 
                      : titleLength > 60 
                      ? '⚠ Too long' 
                      : '⚠ Too short'}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Description *
                </label>
                <textarea
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm min-h-[100px]
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200 resize-none"
                  placeholder="Discover the top smartphones of 2025 with detailed reviews, pricing, features, and expert recommendations to help you choose the perfect device."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {descLength} characters
                  </p>
                  <p className={`text-xs font-medium ${
                    descLength >= 150 && descLength <= 160 
                      ? 'text-green-600' 
                      : descLength > 160 
                      ? 'text-red-600' 
                      : 'text-amber-600'
                  }`}>
                    {descLength >= 150 && descLength <= 160 
                      ? '✓ Optimal' 
                      : descLength > 160 
                      ? '⚠ Too long' 
                      : '⚠ Too short'}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="smartphones, mobile phones, tech reviews, 2025"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>

              {/* URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page URL *
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="https://example.com/best-smartphones-2025"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preview Image URL
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="https://example.com/images/smartphones-2025.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200×630px</p>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author (Optional)
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="John Doe"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              {/* Site Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Site Name (Optional)
                </label>
                <input
                  className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                           text-gray-800 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-all duration-200"
                  placeholder="Tech Review Blog"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t-2 border-gray-200">
              <button
                className="flex-1 min-w-[120px] px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700
                         transform transition-all duration-200 hover:scale-105 active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={copy}
                disabled={!title || !description || !url}
              >
                📋 Copy Code
              </button>
              <button
                className="flex-1 min-w-[120px] px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 
                         text-white font-semibold shadow-lg hover:from-green-700 hover:to-emerald-700
                         transform transition-all duration-200 hover:scale-105 active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={download}
                disabled={!title || !description || !url}
              >
                📥 Download
              </button>
              <button
                className="px-6 py-3 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 
                         font-semibold shadow-md transform transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={clearAll}
              >
                🔄 Clear All
              </button>
            </div>
          </div>

          {/* Right Side - Generated Code */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-2xl">💻</span>
              Generated Meta Tags
            </h3>
            <div className="h-[calc(100%-3rem)] flex flex-col">
              <pre
                className="flex-1 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 
                         font-mono text-xs text-gray-800 whitespace-pre-wrap overflow-auto 
                         leading-5 shadow-inner"
              >
                {html || '<!-- Your generated meta tags will appear here -->\n<!-- Fill in the form to get started -->'}
              </pre>
            </div>
          </div>
        </div>

        {/* Social Preview Card */}
        {(title || description || image) && (
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="text-2xl">👁️</span>
              Social Media Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook/OG Preview */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Facebook / LinkedIn</p>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4 bg-gray-50">
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      {url ? new URL(url).hostname : 'yourwebsite.com'}
                    </p>
                    <p className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                      {title || "Your Page Title"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {description || "Your page description will appear here."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Twitter / X</p>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4 bg-white">
                    <p className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
                      {title || "Your Page Title"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {description || "Your page description will appear here."}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      🔗 {url ? new URL(url).hostname : 'yourwebsite.com'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comprehensive Information Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-4 border-blue-500 pb-3 inline-block">
            The Complete Guide to Meta Tags and SEO Optimization
          </h2>

          <div className="prose max-w-none" style={{ textAlign: 'justify' }}>
            <p className="text-gray-700 leading-relaxed mb-5">
              In the competitive digital landscape of modern web development and online marketing, meta tags serve as critical foundational elements that directly influence how search engines understand, index, and display your website content. While invisible to regular website visitors, these small snippets of HTML code embedded within the head section of your web pages communicate essential information to search engine crawlers, social media platforms, and various web services. Understanding how to create, optimize, and implement effective meta tags can dramatically improve your website's visibility, click-through rates, and overall online presence across multiple platforms including Google, Bing, Facebook, Twitter, LinkedIn, and countless other web services.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Meta tags function as digital ambassadors for your web pages, providing concise summaries and context about your content before users even click through to your site. When someone searches for information on Google, the title tag and meta description you have carefully crafted appear in the search results, essentially serving as free advertisement space that can persuade potential visitors to choose your link over competing results. Similarly, when your content is shared on social media platforms through Open Graph and Twitter Card tags, the preview card that appears can significantly impact engagement rates and social traffic. Our free meta tag generator streamlines this entire process, allowing you to create professional, optimized meta tags in minutes without requiring extensive technical knowledge or coding experience.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Understanding Meta Tags: The Foundation of Web Metadata
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Meta tags originated in the early days of the internet as a standardized method for webpage authors to communicate information about their content to web browsers and search engines. The most fundamental meta tags include the title tag, which defines the clickable headline in search results and appears in browser tabs; the description tag, which provides a brief summary of page content; and the keywords tag, which historically helped search engines understand topic relevance. While search engine algorithms have evolved significantly since the 1990s, making some meta tags less influential for ranking purposes, these tags remain absolutely essential for user experience, social sharing, and professional web development practices.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Modern meta tag implementation extends far beyond simple search engine optimization. Open Graph protocol, developed by Facebook and now widely adopted across social platforms, enables rich content previews when links are shared on social media. Twitter Cards provide similar functionality specifically for the Twitter platform, allowing you to control exactly how your content appears in tweets. Additional meta tags control viewport settings for mobile responsiveness, specify canonical URLs to prevent duplicate content issues, define character encoding for international compatibility, and provide instructions to search engine robots about crawling and indexing behavior. Each of these elements contributes to a comprehensive metadata strategy that enhances your website's technical foundation and user-facing presentation.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              The Critical Importance of Title Tags for SEO Success
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              The title tag represents perhaps the single most important meta element for search engine optimization and user engagement. This tag determines the clickable headline that appears in search engine results pages, making it the first impression most potential visitors will have of your content. Search engines place significant weight on title tags when determining page relevance for specific queries, meaning that well-crafted titles incorporating target keywords can substantially improve your ranking potential. However, the importance of title tags extends beyond algorithmic considerations to encompass human psychology and click-through behavior. A compelling, accurately descriptive title that promises valuable information or solutions to user problems will naturally attract more clicks than generic or poorly written alternatives.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Optimal title tag length ranges between fifty and sixty characters, a limitation imposed by the physical space available in search result displays. Titles exceeding this length will be truncated with ellipses, potentially cutting off important keywords or calls to action. Conversely, extremely short titles may appear incomplete or fail to provide sufficient context about page content. The best title tags frontload the most important keywords while maintaining natural readability and incorporating your brand name when appropriate. For example, instead of a vague title like "Products," an e-commerce site should use something specific like "Organic Skincare Products - Natural Beauty Solutions | BrandName." This approach maximizes both search engine relevance and user appeal while staying within recommended character limits.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Crafting Compelling Meta Descriptions That Drive Clicks
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Meta descriptions serve as your opportunity to advertise your content directly within search results, functioning essentially as organic ad copy that can significantly influence click-through rates without directly affecting search rankings. When Google displays your page in search results, the meta description typically appears below the title tag, providing additional context about your content and giving users a preview of what they will find if they click through. While Google sometimes generates its own description based on page content and search query relevance, a well-written custom meta description appears frequently enough to justify the optimization effort. The ideal description length ranges from one hundred fifty to one hundred sixty characters, balancing the need for comprehensive information with display constraints across different devices and search platforms.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Effective meta descriptions incorporate relevant keywords naturally while focusing primarily on value proposition and user benefits. Rather than simply summarizing page content in neutral terms, persuasive descriptions highlight unique selling points, address user pain points, and include subtle calls to action that encourage clicking. For instance, a blog post about email marketing might use the description: "Discover seven proven email marketing strategies that increased our open rates by forty-three percent. Step-by-step guide with real examples and templates included." This description incorporates keywords, quantifies benefits with specific metrics, promises actionable content, and creates curiosity—all elements that contribute to higher click-through rates compared to generic descriptions.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Open Graph Tags: Optimizing for Social Media Sharing
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Open Graph protocol revolutionized social media sharing by establishing a standardized format for controlling how content appears when shared on platforms like Facebook, LinkedIn, Pinterest, and many others. Without Open Graph tags, social platforms attempt to automatically extract relevant information from your page, often with inconsistent or suboptimal results including missing images, incorrect titles, or irrelevant text snippets. Implementing proper Open Graph tags ensures that every time someone shares your content, it displays with exactly the image, title, and description you intended, creating professional, engaging previews that drive higher engagement rates and social traffic. The visual impact of a well-optimized social share cannot be overstated—posts with compelling images and descriptions receive significantly more clicks, likes, and shares than plain text links.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              The essential Open Graph tags include og:title for specifying the headline, og:description for the summary text, og:image for the preview image, og:url for the canonical page address, and og:type to indicate content category such as website, article, or video. Image optimization deserves particular attention, as Facebook and similar platforms recommend images with a minimum resolution of twelve hundred pixels by six hundred thirty pixels and an aspect ratio of approximately two to one. Images smaller than these dimensions may appear pixelated or be rejected entirely, while images with incorrect aspect ratios get awkwardly cropped. Testing your Open Graph implementation using Facebook's Sharing Debugger tool helps identify and resolve issues before your content goes live, ensuring optimal presentation across all social platforms that respect Open Graph standards.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Twitter Cards: Specialized Optimization for Twitter Platform
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              While Twitter respects Open Graph tags to some extent, implementing dedicated Twitter Card meta tags provides enhanced control over how your content appears specifically on the Twitter platform. Twitter Cards transform standard links into rich media experiences, displaying large preview images, formatted headlines, and descriptions that dramatically increase engagement compared to plain URLs. The two primary Twitter Card types are summary cards, which display a square image thumbnail alongside title and description, and summary large image cards, which feature a prominent rectangular image similar to Open Graph previews. Choosing the appropriate card type depends on your content and visual assets, with large image cards generally performing better for visually striking content while summary cards work well for text-focused material.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Implementing Twitter Cards requires adding meta tags with the twitter:card, twitter:title, twitter:description, and twitter:image properties, along with optional tags for specifying Twitter handles for attribution. After implementation, validating your Twitter Cards using Twitter's Card Validator tool ensures proper display and enables card support for your domain. One common mistake is forgetting to validate cards after initial implementation, which can delay activation and prevent cards from displaying for days or weeks. Twitter also provides analytics for card performance, showing impressions and engagement metrics that help you optimize your social media strategy. By combining effective Twitter Cards with compelling content and strategic posting times, you can significantly increase your reach and engagement on the platform.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Keywords Meta Tag: Historical Context and Current Relevance
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              The keywords meta tag represents one of the most misunderstood elements in modern SEO, largely because its role has changed dramatically since the early days of search engines. In the nineteen-nineties, search engines relied heavily on the keywords meta tag to understand page content and determine ranking relevance. However, widespread abuse through keyword stuffing and irrelevant keyword injection led major search engines, particularly Google, to completely disregard this tag for ranking purposes by the early two thousands. Google has officially stated that the keywords meta tag carries zero weight in their ranking algorithm, making it essentially useless for improving search visibility in Google results. Despite this, some webmasters continue including keyword tags based on outdated advice or misunderstanding of current SEO best practices.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              While the keywords meta tag no longer influences Google rankings, certain scenarios justify its continued use. Some smaller search engines and enterprise search solutions still reference keyword tags for content categorization and internal search functionality. Website owners using internal site search tools may find keywords helpful for improving internal search results. Additionally, including keywords causes no harm and takes minimal effort when using a meta tag generator tool, so many developers adopt a "why not" approach to implementation. However, it is crucial to understand that keyword tags should never be the focus of your SEO strategy, and time spent optimizing them would be better invested in creating quality content, earning backlinks, and optimizing title tags and meta descriptions that actually impact search performance.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Mobile Optimization and Viewport Meta Tags
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              In the mobile-first era of web browsing, where smartphones account for more than sixty percent of web traffic globally, proper mobile optimization through viewport meta tags has become absolutely essential rather than optional. The viewport meta tag controls how your website scales and displays on mobile devices, preventing the frustrating experience of desktop layouts being squeezed onto small screens with tiny, unreadable text. Without a properly configured viewport tag, mobile browsers default to rendering pages at desktop width and then scaling down, which creates poor user experiences characterized by excessive zooming and horizontal scrolling. A simple viewport tag with width=device-width and initial-scale=1.0 instructs mobile browsers to match screen width and maintain natural scaling, forming the foundation for responsive web design.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Google's mobile-first indexing approach means that the search engine primarily uses the mobile version of your site for ranking and indexing purposes, making mobile optimization directly impact SEO performance. Sites without proper viewport configuration and responsive design risk ranking penalties and reduced visibility in mobile search results. Beyond search engine considerations, mobile user experience directly affects bounce rates, conversion rates, and overall site success. Users encountering poorly optimized mobile sites typically leave within seconds, increasing bounce rates and signaling to search engines that your content may not satisfy user intent. By implementing proper viewport meta tags and responsive design principles, you create positive user experiences that support both immediate engagement metrics and long-term search engine performance.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Canonical Tags and Duplicate Content Management
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Canonical tags represent a specialized category of meta element designed to address one of the most persistent challenges in technical SEO: duplicate content. Many websites unintentionally create multiple URLs pointing to identical or substantially similar content through parameter-based filtering, printer-friendly versions, session IDs, tracking parameters, or content syndication. Search engines struggle to determine which version deserves ranking consideration when multiple URLs contain the same content, potentially splitting ranking signals across duplicates and diluting overall search performance. The canonical tag provides a clear signal to search engines indicating which URL represents the preferred, authoritative version of the content, consolidating ranking signals and preventing duplicate content penalties.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Implementing canonical tags requires careful consideration of your site structure and content strategy. The canonical URL should point to the version you want appearing in search results, typically your cleanest URL without unnecessary parameters. Common use cases include product pages accessible through multiple category paths, paginated content series, regional or language variations of similar content, and syndicated articles published on multiple domains. For syndicated content, using a canonical tag pointing back to the original publication helps preserve SEO value for the original publisher rather than inadvertently competing against your own content. While canonical tags are powerful tools for technical SEO, they should complement rather than replace efforts to minimize unnecessary duplication through proper site architecture and URL structure design.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Robots Meta Tags: Controlling Search Engine Behavior
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Robots meta tags provide granular control over how search engine crawlers interact with your individual web pages, offering page-level directives that complement site-wide instructions in robots.txt files. The most common robots tag values include "index" or "noindex" to control whether a page appears in search results, and "follow" or "nofollow" to determine whether search engines should follow links on the page for crawling purposes. Strategic use of robots tags allows you to keep certain pages out of search results, such as thank-you pages, internal search results, administrative sections, or duplicate content variations, while still maintaining their accessibility for users who reach them through legitimate navigation paths.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Advanced robots directives include "noarchive" to prevent search engines from storing cached versions of your pages, "nosnippet" to block the display of text snippets in search results, and "noimageindex" to prevent image indexing. These specialized directives serve specific use cases such as protecting time-sensitive content from appearing outdated through cached versions, maintaining content exclusivity by preventing snippet display, or protecting copyrighted images from search engine image indexing. However, robots tags should be used judiciously, as overly restrictive implementation can inadvertently harm SEO by blocking valuable content from search engines. Regular audits of robots tag implementation help ensure your directives align with current SEO strategy and business objectives.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Practical Implementation: Using Our Meta Tag Generator
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Our meta tag generator streamlines the entire process of creating professional, optimized meta tags through an intuitive interface that requires no coding knowledge or technical expertise. Simply enter your page title, description, keywords, URL, and optional image URL into the designated fields, and the tool instantly generates complete, properly formatted HTML code ready for immediate implementation. The generator automatically handles character escaping and formatting, ensuring your meta tags meet web standards and function correctly across all browsers and platforms. Real-time character counters help you optimize title and description length, while the live preview shows exactly how your content will appear in search results and social media shares before you publish.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              After generating your meta tags, implementation requires copying the generated code and pasting it into the head section of your HTML document, typically between the opening head tag and closing head tag. For content management systems like WordPress, Wix, Squarespace, or Shopify, specialized plugins or built-in SEO tools often provide interfaces for entering meta information without directly editing HTML code. However, having the complete generated code allows for manual implementation when needed and serves as a reference for understanding proper meta tag structure. The download feature enables saving generated tags as HTML files for documentation purposes or batch implementation across multiple pages, while the copy function provides instant clipboard access for immediate use.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Common Mistakes and How to Avoid Them
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Despite the apparent simplicity of meta tags, numerous common mistakes can undermine their effectiveness and harm your SEO efforts. Duplicate title tags across multiple pages represent one of the most frequent errors, as search engines struggle to differentiate between pages with identical titles, potentially causing ranking issues and poor user experience. Each page should have a unique, descriptive title reflecting its specific content and target keywords. Similarly, missing or duplicate meta descriptions create missed opportunities for persuasive ad copy in search results, potentially reducing click-through rates compared to properly optimized competitors. Generic descriptions like "Welcome to our website" provide no value and should be replaced with specific, benefit-focused copy.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Image-related mistakes frequently plague Open Graph and Twitter Card implementation, including using images with incorrect dimensions, broken image URLs, or images that require authentication to view. Search engines and social platforms cannot access password-protected images, causing preview failures even when URLs appear correct. Always verify that images are publicly accessible, properly sized, and use absolute URLs rather than relative paths. Another critical mistake involves implementing meta tags incorrectly in the HTML structure, such as placing them in the body section instead of the head section, or using improper syntax that prevents browsers from parsing them correctly. Regular validation using tools like Google's Rich Results Test and social platform debugging tools helps identify and correct implementation errors before they impact performance.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Measuring Success and Ongoing Optimization
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              Implementing meta tags represents just the beginning of an ongoing optimization process that requires continuous monitoring and refinement based on performance data. Google Search Console provides invaluable insights into how your pages perform in search results, including impressions, click-through rates, and average positions for specific queries. Pages with high impressions but low click-through rates often benefit from improved title tags and meta descriptions that better match user intent and include compelling calls to action. Conversely, pages with strong rankings but poor engagement may need content improvements rather than meta tag changes. A-B testing different title and description variations, when possible, helps identify the most effective messaging for your target audience.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Social media analytics tools track how shared content performs across various platforms, providing metrics on clicks, likes, shares, and overall engagement. This data informs decisions about image selection, headline writing, and description crafting for future content. Regularly reviewing and updating meta tags for older content keeps your search listings fresh and relevant, particularly for evergreen content that continues generating traffic over time. As your understanding of your audience deepens and you gather more performance data, iterative improvements to your meta tag strategy compound over time, contributing to steady growth in organic traffic, social engagement, and overall online visibility. The combination of solid foundational implementation through tools like our meta tag generator and data-driven ongoing optimization creates a sustainable approach to maximizing the value of your meta tags.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              Future Trends in Meta Tags and Structured Data
            </h3>

            <p className="text-gray-700 leading-relaxed mb-5">
              As search engines evolve toward increasingly sophisticated understanding of content through artificial intelligence and natural language processing, the role of traditional meta tags continues adapting alongside broader developments in structured data and semantic markup. Schema.org structured data, implemented through JSON-LD, microdata, or RDFa formats, represents the next evolution beyond basic meta tags, enabling rich results like review stars, recipe cards, event listings, and product information directly in search results. While structured data technically differs from traditional meta tags, both serve the fundamental purpose of providing machines with clear, standardized information about web content. Forward-thinking website owners increasingly combine traditional meta tag optimization with comprehensive structured data implementation to maximize visibility across all types of search features.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Looking ahead, we can expect continued refinement of how search engines and social platforms utilize metadata, with increasing emphasis on quality, relevance, and user experience over keyword density or manipulation tactics. Voice search optimization may drive new meta tag considerations as smart speakers and voice assistants become more prevalent in information retrieval. Mobile-first indexing will continue prioritizing mobile-optimized content and may introduce new mobile-specific meta tag requirements. Regardless of specific technical changes, the core principles underlying effective meta tag implementation remain constant: provide accurate, compelling information that helps both humans and machines understand and evaluate your content, focus on user value over algorithmic manipulation, and maintain consistency between your metadata and actual page content to build trust and authority over time.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions About Meta Tags</h3>
            
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">What are meta tags and why are they important?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Meta tags are HTML elements that provide structured information about your web page to search engines and social media platforms. They are crucial for SEO because they influence how your content appears in search results and when shared on social media, directly impacting click-through rates and organic traffic.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">How long should my title tag be?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  The optimal title tag length is between fifty and sixty characters. Titles longer than sixty characters may be truncated in search results with ellipses, potentially cutting off important keywords or information. Our tool provides real-time character counting to help you stay within the ideal range.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">Do keywords meta tags still matter for SEO?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Google officially does not use keywords meta tags for ranking purposes and hasn't since the early two thousands due to widespread abuse. However, they cause no harm and may still be used by some smaller search engines or internal site search systems, so including them takes minimal effort with our generator.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-l-4 border-amber-500">
                <h4 className="font-semibold text-gray-900 mb-2">What image size is best for Open Graph and Twitter Cards?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  The recommended image size for optimal social media previews is twelve hundred pixels by six hundred thirty pixels (1200×630px) with a two to one aspect ratio. This size works well across Facebook, LinkedIn, Twitter, and most other platforms that support rich previews.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-5 border-l-4 border-red-500">
                <h4 className="font-semibold text-gray-900 mb-2">Can I use different meta descriptions for search engines and social media?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Yes, Open Graph and Twitter Card tags allow you to specify different descriptions specifically for social sharing while maintaining a separate meta description for search engines. This enables you to optimize messaging for different contexts and audiences without conflicts.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border-l-4 border-cyan-500">
                <h4 className="font-semibold text-gray-900 mb-2">How often should I update my meta tags?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Review and update meta tags whenever page content significantly changes, when you notice poor click-through rates in Search Console, or during regular content audits. For evergreen content, annual reviews ensure tags remain relevant and competitive. Time-sensitive content may require more frequent updates.
                </p>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-5 border-l-4 border-violet-500">
                <h4 className="font-semibold text-gray-900 mb-2">Is this meta tag generator completely free to use?</h4>
                <p className="text-gray-700" style={{ textAlign: 'justify' }}>
                  Yes, our meta tag generator is completely free with no limitations on usage, features, or the number of meta tags you can create. There are no hidden fees, registration requirements, or premium tiers. You can generate unlimited meta tags for all your web pages without any restrictions.
                </p>
              </div>
            </div>
          </div>

          {/* Final Conclusion */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Conclusion: Mastering Meta Tags for Online Success</h3>
            <p className="text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
              Meta tags represent fundamental building blocks of effective SEO and social media marketing strategies, providing essential communication between your website and the broader digital ecosystem. While they may seem like minor technical details, properly optimized meta tags directly influence search rankings, click-through rates, social engagement, and ultimately your website's success in achieving business objectives. Our free meta tag generator eliminates the complexity and technical barriers associated with creating professional meta tags, empowering website owners, marketers, developers, and content creators to implement best practices regardless of their technical expertise. By combining the convenience of automated generation with the comprehensive knowledge provided in this guide, you can develop a sustainable meta tag strategy that drives continuous improvement in your online visibility and performance. Start optimizing your meta tags today and experience the measurable impact of this essential SEO practice on your website's growth and success.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}