"use client";
import { buildToolJsonLd, buildBreadcrumbJsonLd } from "../../lib/seo";
import JsonLd from "../components/JsonLd";
import { useMemo, useState } from "react";

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, "").length;
    const words = text.trim() ? (text.trim().match(/\S+/g) || []).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim().length > 0).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const readingTime = Math.ceil(words / 200) || 0; // avg 200 wpm
    const speakingTime = Math.ceil(words / 130) || 0; // avg 130 wpm
    const avgWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      avgWordLength
    };
  }, [text]);

  function reset() {
    setText("");
    setMessage("🔄 Text cleared successfully!");
    setTimeout(() => setMessage(""), 2000);
  }

  function copy() {
    if (!text) {
      setMessage("⚠️ No text to copy!");
      return;
    }
    navigator.clipboard.writeText(text);
    setMessage("📋 Text copied to clipboard!");
    setTimeout(() => setMessage(""), 2000);
  }

  function pasteText() {
    navigator.clipboard.readText().then((clipText) => {
      setText(clipText);
      setMessage("📋 Text pasted from clipboard!");
      setTimeout(() => setMessage(""), 2000);
    }).catch(() => {
      setMessage("⚠️ Unable to access clipboard. Please paste manually.");
      setTimeout(() => setMessage(""), 2000);
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-10">
      <JsonLd
        data={buildToolJsonLd({
          name: "Word Counter",
          description: "Free online word counter tool. Count words, characters, sentences, paragraphs, and estimate reading time instantly.",
          slug: "/word-counter",
          category: "Utilities/Text",
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", slug: "/" },
          { name: "Word Counter", slug: "/word-counter" },
        ])}
      />

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Status Message */}
        {message && (
          <div className="px-5 py-3.5 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-500 rounded-xl shadow-sm animate-fadeIn">
            <p className="text-sm font-semibold text-purple-800">{message}</p>
          </div>
        )}

        {/* Main Counter Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">Word & Character Counter</h1>
            <p className="text-purple-100 text-sm mt-2">Analyze text instantly with comprehensive statistics</p>
          </div>

          <div className="p-8">
            {/* Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-800 mb-3">
                ✍️ Enter or Paste Your Text
              </label>
              <textarea
                className="w-full min-h-[240px] px-5 py-4 text-base text-gray-900 placeholder-gray-500 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white resize-none leading-relaxed caret-black"
                placeholder="Start typing or paste your text here to see instant statistics..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={pasteText}
                className="flex-1 min-w-[140px] px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                📋 Paste
              </button>

              <button
                onClick={copy}
                disabled={!text}
                className="flex-1 min-w-[140px] px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                📄 Copy
              </button>

              <button
                onClick={reset}
                disabled={!text}
                className="flex-1 min-w-[140px] px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                🔄 Clear
              </button>
            </div>

            {/* Statistics Grid */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-200">
              <h3 className="text-lg font-bold text-violet-900 mb-5 flex items-center gap-2">
                📊 Text Statistics
              </h3>

              {/* Primary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-md text-center border border-violet-100">
                  <div className="text-3xl font-bold text-violet-600">{stats.words}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1">WORDS</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md text-center border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600">{stats.characters}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1">CHARACTERS</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md text-center border border-fuchsia-100">
                  <div className="text-3xl font-bold text-fuchsia-600">{stats.charactersNoSpaces}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1">NO SPACES</div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md text-center border border-pink-100">
                  <div className="text-3xl font-bold text-pink-600">{stats.sentences}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1">SENTENCES</div>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-200">
                  <div className="text-xl font-bold text-gray-700">{stats.paragraphs}</div>
                  <div className="text-xs text-gray-600 mt-1">Paragraphs</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-200">
                  <div className="text-xl font-bold text-gray-700">{stats.lines}</div>
                  <div className="text-xs text-gray-600 mt-1">Lines</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-200">
                  <div className="text-xl font-bold text-gray-700">{stats.readingTime}</div>
                  <div className="text-xs text-gray-600 mt-1">Min Read</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-200">
                  <div className="text-xl font-bold text-gray-700">{stats.speakingTime}</div>
                  <div className="text-xs text-gray-600 mt-1">Min Speak</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-200">
                  <div className="text-xl font-bold text-gray-700">{stats.avgWordLength}</div>
                  <div className="text-xs text-gray-600 mt-1">Avg Word</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-5 flex items-center gap-3">
            <span className="text-3xl">📏</span> Content Length Guidelines
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <div className="font-bold text-blue-800 mb-3 text-base">📝 Blog Posts</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span>Short post:</span>
                  <span className="font-semibold">300-600 words</span>
                </li>
                <li className="flex justify-between">
                  <span>Standard:</span>
                  <span className="font-semibold">1,000-1,500</span>
                </li>
                <li className="flex justify-between">
                  <span>Long-form:</span>
                  <span className="font-semibold">2,000-3,000</span>
                </li>
                <li className="flex justify-between">
                  <span>In-depth:</span>
                  <span className="font-semibold">3,000+</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <div className="font-bold text-blue-800 mb-3 text-base">📱 Social Media</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span>Twitter/X:</span>
                  <span className="font-semibold">280 chars</span>
                </li>
                <li className="flex justify-between">
                  <span>Facebook:</span>
                  <span className="font-semibold">40-80 chars</span>
                </li>
                <li className="flex justify-between">
                  <span>LinkedIn:</span>
                  <span className="font-semibold">150-300 chars</span>
                </li>
                <li className="flex justify-between">
                  <span>Instagram:</span>
                  <span className="font-semibold">2,200 chars</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
              <div className="font-bold text-blue-800 mb-3 text-base">🎓 Academic</div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span>Abstract:</span>
                  <span className="font-semibold">150-250 words</span>
                </li>
                <li className="flex justify-between">
                  <span>Essay:</span>
                  <span className="font-semibold">500-5,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Thesis:</span>
                  <span className="font-semibold">10,000-80,000</span>
                </li>
                <li className="flex justify-between">
                  <span>Dissertation:</span>
                  <span className="font-semibold">80,000+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Educational Content - 1000+ Words */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <header className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Complete Guide to Word Counting and Text Analysis</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full"></div>
          </header>

          <div className="prose max-w-none space-y-8 text-gray-700 leading-relaxed" style={{ textAlign: 'justify' }}>
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Word Count and Its Importance</h3>
              <p className="mb-4">
                Word counting represents far more than a simple numerical exercise—it fundamentally shapes how we communicate, create, and consume written content across digital and traditional media. The practice of counting words, characters, and other textual elements enables writers to meet specific requirements, maintain reader engagement, optimize content for search engines, and ensure messages fit within platform constraints. From academic papers requiring precise length specifications to social media posts limited by character counts, understanding and managing word count has become an essential skill for anyone working with written content in professional, educational, or creative contexts.
              </p>
              <p className="mb-4">
                The significance of word count extends beyond mere compliance with arbitrary limits. Research demonstrates clear correlations between content length and various performance metrics: search engines often favor comprehensive, longer-form content for informational queries while preferring concise answers for quick questions; readers show different engagement patterns with short versus long content depending on context and intent; academic institutions use word counts to ensure students demonstrate appropriate depth of analysis; and publishers rely on word counts for layout planning, pricing, and reader expectations management. Understanding these dynamics empowers content creators to make informed decisions about optimal length for specific purposes and audiences.
              </p>
              <p className="mb-4">
                Modern word counting tools have evolved far beyond simple tallies, offering comprehensive text analysis including character counts (with and without spaces), sentence and paragraph counts, reading time estimates, speaking duration calculations, and linguistic metrics like average word length. These statistics provide valuable insights into text characteristics, helping writers assess readability, identify potential improvements, and ensure content meets both technical requirements and audience needs. Our word counter delivers all these metrics instantly as you type or paste text, enabling real-time monitoring and adjustment throughout the writing process without requiring separate analysis steps or external tools.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Word Count in Academic and Professional Writing</h3>
              <p className="mb-4">
                Academic writing imposes strict word count requirements that serve multiple pedagogical and practical purposes. Professors assign specific lengths to ensure students engage deeply enough with topics without becoming overwhelmed by scope, demonstrate concise expression of complex ideas, practice prioritizing essential information, and develop editing skills through necessary content refinement. Undergraduate essays typically range from 500 to 3,000 words depending on course level and assignment complexity, while graduate theses and dissertations may span 10,000 to 100,000 words requiring sustained argument development and comprehensive literature review. Academic abstracts, limited to 150-300 words, demand exceptional concision while conveying study significance, methodology, findings, and implications.
              </p>
              <p className="mb-4">
                Professional writing contexts establish word count expectations based on format, audience, and purpose considerations. Business reports balance comprehensiveness with executive time constraints, typically ranging from 1,500 to 5,000 words with executive summaries condensed to 200-500 words. Technical documentation must provide sufficient detail for implementation while maintaining accessibility, often measured more by completeness than specific word counts. Marketing copy operates under extreme brevity constraints—advertising taglines compress brand messages into 3-7 words, email subject lines fight for attention within 40-50 characters, and landing page copy must convert visitors before attention spans expire, typically within 500-750 words.
              </p>
              <p className="mb-4">
                Journalism maintains traditional word count structures adapted from print space constraints despite digital publishings theoretically unlimited space. News articles follow inverted pyramid structures with core information concentrated in opening paragraphs, typically spanning 400-800 words for daily news, 800-1,500 for features, and 2,000+ for investigative pieces. This disciplined approach to length ensures journalists deliver complete stories efficiently while respecting reader time. Opinion pieces and columns typically run 600-900 words, forcing writers to develop arguments concisely while maintaining persuasive impact. Understanding these conventions helps writers match content length to editorial expectations and audience preferences across different publication contexts.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Length and SEO Optimization</h3>
              <p className="mb-4">
                Search engine optimization fundamentally involves matching content characteristics to user intent and search engine algorithms, with word count serving as a critical factor in this optimization. Comprehensive studies analyzing top-ranking content reveal consistent patterns: informational queries targeting broad topics often see longer content (1,500-3,000+ words) ranking higher as search engines interpret length as depth indicator; transactional queries favor concise content delivering quick answers without unnecessary elaboration; and local search results prioritize relevant business information over content length. However, length alone doesnt guarantee rankings—content quality, relevance, user engagement metrics, and technical optimization remain essential regardless of word count.
              </p>
              <p className="mb-4">
                The relationship between word count and keyword optimization requires careful balance. Longer content provides more opportunities to naturally incorporate target keywords, related terms, and semantic variations that help search engines understand topic relevance and comprehensiveness. However, keyword stuffing—artificially inflating word count through unnecessary keyword repetition—triggers search engine penalties while degrading user experience. Modern SEO best practices emphasize natural language that serves reader needs first while strategically incorporating keywords where they fit contextually. Word counters help writers monitor content length while ensuring keyword density remains within optimal ranges (typically 1-2% for primary keywords) without sacrificing readability or natural flow.
              </p>
              <p className="mb-4">
                Featured snippets and position zero results have complicated content length optimization by rewarding concise, direct answers for specific queries while requiring supporting detail for comprehensive coverage. Content creators increasingly employ strategic structuring: opening sections provide quick answers suitable for snippet extraction (40-60 words for paragraph snippets, structured formats for list and table snippets), while subsequent sections develop topics comprehensively for users seeking deeper information. This hybrid approach serves both quick-answer seekers and in-depth researchers, maximizing content utility across different user intents. Word counters enable writers to calibrate section lengths appropriately, ensuring snippet-optimized introductions dont sacrifice overall comprehensiveness required for authoritative topic coverage.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Media Character Limits and Constraints</h3>
              <p className="mb-4">
                Social media platforms impose character and word limits that fundamentally shape how users communicate, forcing concision that can enhance or constrain message effectiveness depending on context and skill. Twitters evolution from 140 to 280 character limits reflected recognition that brevity, while valuable for certain content types, unnecessarily restricted expression for others. The expansion doubled creative space while maintaining the platforms essential brevity compared to longer-form platforms. Successful Twitter users master the art of conveying complete thoughts, sharing valuable insights, or sparking engagement within character constraints through careful word choice, strategic abbreviations, and multimedia supplementation.
              </p>
              <p className="mb-4">
                LinkedIns professional context encourages more substantial posts than Twitter while still imposing practical limits that encourage focus and readability. Post character limits (3,000 for regular posts, 1,300 visible before truncation) accommodate meaningful professional insights, article summaries, or thought leadership content while preventing overwhelming walls of text that deter mobile readers. Effective LinkedIn content typically spans 150-300 characters for maximum engagement, balancing substance with scannability. However, article features support longer-form content (40,000+ characters), enabling professionals to publish comprehensive pieces directly on the platform for audience building and thought leadership positioning.
              </p>
              <p className="mb-4">
                Instagram, despite being image-centric, allows substantial caption space (2,200 characters) that influencers and brands leverage for storytelling, product descriptions, calls-to-action, and hashtag strategies. Effective Instagram captions balance multiple objectives: opening lines (125-150 characters) must hook attention before the more truncation, full captions provide context and narrative while maintaining readability through paragraph breaks and emoji spacing, and hashtag blocks (up to 30 hashtags) enhance discoverability without cluttering main content. Character counting helps Instagram creators optimize each caption component, ensuring maximum impact within platform presentation constraints while maintaining authentic voice that resonates with followers.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reading Time and Audience Engagement</h3>
              <p className="mb-4">
                Reading time estimates provide crucial insights into content accessibility and audience commitment requirements, enabling writers to calibrate length appropriately for context and reader expectations. Average reading speeds vary by content complexity and reader background—casual content allows 200-250 words per minute, while technical or academic material slows to 100-150 words per minute as readers process complex information. Most online readers skim rather than read completely, scanning for relevant sections rather than consuming content linearly, which complicates reading time calculations but underscores the importance of scannable formatting, descriptive headings, and front-loaded key information.
              </p>
              <p className="mb-4">
                Content length directly impacts bounce rates and engagement metrics that influence search rankings and conversion rates. Studies consistently show readers abandon longer content more frequently, particularly on mobile devices where scrolling fatigue and distraction opportunities increase with length. However, this general trend reverses for users actively seeking comprehensive information—researchers, professionals, or enthusiasts deliberately choosing in-depth content demonstrate higher engagement with longer pieces that thoroughly address their needs. Understanding audience intent and context helps writers optimize length: quick-answer queries demand concision (300-600 words), while comprehensive guides justify extensive length (2,000-5,000+ words) when users explicitly seek detailed information.
              </p>
              <p className="mb-4">
                Speaking time calculations serve specific use cases including speech preparation, video script development, podcast planning, and audio content creation. Average speaking speeds (130-150 words per minute for presentations, 150-160 for conversational speech) help presenters calibrate script length to time constraints while accounting for pauses, emphasis, audience interaction, and visual aid integration. TED talks famously enforce 18-minute maximum lengths, requiring speakers to distill ideas into approximately 2,400 words that convey key insights without overwhelming audiences. Podcast episodes vary widely in length preferences across genres, with successful shows establishing consistent length expectations that audiences can plan around, whether brief daily news summaries (500-750 words/5-7 minutes) or extended interview formats (10,000+ words/60-90 minutes).
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tools and Techniques for Managing Word Count</h3>
              <p className="mb-4">
                Modern word counting tools extend far beyond basic tallies, offering comprehensive text analysis that reveals linguistic patterns, readability metrics, and structural characteristics. Advanced features include density analysis showing keyword and phrase frequencies, readability scoring using established formulas (Flesch-Kincaid, Gunning Fog), grammar and style checking integrated with counting functions, and comparative analysis tracking changes across document versions. These capabilities transform word counters from simple measurement tools into writing aids that support revision, optimization, and quality improvement throughout the content creation process. Integration with writing platforms, content management systems, and productivity tools enables seamless monitoring without workflow disruption.
              </p>
              <p className="mb-4">
                Effective word count management requires strategic approaches beyond mere counting. Writers facing maximum limits must ruthlessly edit for concision: eliminating redundant phrases, choosing precise verbs that replace verbose constructions, converting clauses to phrases where possible without sacrificing clarity, and questioning whether each sentence truly serves the core message. Conversely, writers struggling to meet minimum requirements should resist the temptation to pad content with fluff, instead deepening analysis, incorporating additional examples, exploring counterarguments, or expanding scope to related aspects that genuinely enhance reader value. Quality writing meeting length targets serves readers better than arbitrary length manipulation.
              </p>
              <p className="mb-4">
                Different writing contexts demand different counting approaches. Academic writing often counts words excluding references, footnotes, or appendices, requiring clear understanding of institutional guidelines. Publishing contracts may specify word counts with defined inclusion or exclusion of front matter, back matter, or other elements. SEO content optimization tracks not just total word count but section lengths, heading hierarchy depth, and content distribution across page areas. Social media management requires character counting that accounts for URL shortening, image captions, alt text, and platform-specific formatting. Understanding these contextual variations ensures writers measure the right metrics for their specific situations, avoiding compliance issues or optimization mistakes that stem from inappropriate measurement approaches.
              </p>
            </section>

            <section className="bg-gradient-to-r from-violet-50 to-purple-50 p-8 rounded-xl border-2 border-violet-200 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion: Mastering Word Count for Effective Communication</h3>
              <p className="mb-4">
                Word count mastery represents a fundamental writing skill that spans academic, professional, creative, and digital contexts. Understanding how length affects reader engagement, search visibility, platform compatibility, and message effectiveness enables writers to make strategic decisions about content scope and structure. While specific word count targets vary across contexts—academic assignments, blog posts, social media updates, business documents, or creative writing—the underlying principle remains constant: optimal length serves the specific purpose, audience, and platform while delivering maximum value within relevant constraints.
              </p>
              <p>
                Our Word & Character Counter provides instant, comprehensive text analysis that supports effective writing across all contexts. With real-time statistics including word count, character count, sentence and paragraph counts, reading time estimates, and speaking duration calculations, this tool enables writers to monitor and optimize content as they create it. The browser-based interface ensures privacy, instant feedback, and zero workflow disruption, whether youre crafting academic papers, optimizing blog posts, preparing social media content, or developing professional documents. Start using our word counter today to enhance your writing precision, meet length requirements confidently, and ensure every word counts in your content.
              </p>
            </section>
          </div>
        </article>

        {/* Pro Tips Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 shadow-lg">
          <h3 className="text-xl font-bold text-orange-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">💡</span> Expert Writing Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Quality Over Quantity</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Never pad content just to meet word counts. Focus on delivering value, and length will follow naturally. Concise, valuable content always beats long, fluffy text.</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Know Your Platform</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Different platforms have different optimal lengths. Twitter needs brevity, blogs need depth, and emails need clarity. Adapt your word count to the medium.</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Monitor While Writing</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Check word count throughout the writing process, not just at the end. This helps you pace content properly and avoid major rewrites to meet requirements.</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="font-bold text-orange-800 mb-2.5 text-base">✓ Consider Reading Time</div>
              <p className="text-gray-700 text-sm leading-relaxed" style={{ textAlign: 'justify' }}>Respect your readers time. If content takes 15+ minutes to read, ensure it provides enough value to justify that investment or consider breaking it into parts.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}