import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Convertixy</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 leading-relaxed">
              65+ free online tools for PDF manipulation, image processing, text editing, SEO optimization, calculators, and more. All tools work directly in your browser with complete privacy.
            </p>
            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-500">
              <span>✓ 100% Free</span>
              <span>✓ No Registration</span>
              <span>✓ Privacy First</span>
              <span>✓ Mobile Friendly</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/pdf-merge" className="text-gray-400 hover:text-white transition-colors duration-200">PDF Merge</Link></li>
              <li><Link href="/image-compressor" className="text-gray-400 hover:text-white transition-colors duration-200">Image Compressor</Link></li>
              <li><Link href="/word-counter" className="text-gray-400 hover:text-white transition-colors duration-200">Word Counter</Link></li>
              <li><Link href="/qr-code" className="text-gray-400 hover:text-white transition-colors duration-200">QR Code Generator</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="/#tools" className="text-gray-400 hover:text-white transition-colors duration-200">PDF Tools</Link></li>
              <li><Link href="/#tools" className="text-gray-400 hover:text-white transition-colors duration-200">Image Tools</Link></li>
              <li><Link href="/#tools" className="text-gray-400 hover:text-white transition-colors duration-200">Text Tools</Link></li>
              <li><Link href="/#tools" className="text-gray-400 hover:text-white transition-colors duration-200">SEO Tools</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Convertixy. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colors duration-200">Terms of Service</Link>
              <Link href="/contact" className="text-gray-500 hover:text-white transition-colors duration-200">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

