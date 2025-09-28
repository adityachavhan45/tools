export default function ToolSection({
  title,
  subtitle,
  children,
  sidebar,
  plain = false,
  plainSidebar = false,
  whiteBackground = false,
}) {
  return (
    <section
      className={`min-h-[70vh] ${whiteBackground ? "bg-white text-slate-900" : "bg-gradient-to-b from-gray-50 to-gray-100"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          <div className="xl:col-span-8">
            {plain ? (
              <div className="tool-content p-0">{children}</div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="tool-content p-4 sm:p-6 md:p-8">{children}</div>
              </div>
            )}
          </div>
          <aside className="xl:col-span-4">
            {plainSidebar ? (
              <div className="tool-content p-4 sm:p-6">
                {sidebar || (
                  <div className="text-sm sm:text-base text-gray-600 space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">🔒 Privacy First</p>
                      <p>All processing happens in your browser. Your files never leave your device.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900 mb-2">💡 Pro Tip</p>
                      <p>Drag and drop files directly onto the input area for faster uploads.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
                {sidebar || (
                  <div className="text-sm sm:text-base text-gray-600 space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-2">🔒 Privacy First</p>
                      <p>All processing happens in your browser. Your files never leave your device.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900 mb-2">💡 Pro Tip</p>
                      <p>Drag and drop files directly onto the input area for faster uploads.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-900 mb-2">⚡ Fast & Free</p>
                      <p>No registration required. All tools work instantly in your browser.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}


