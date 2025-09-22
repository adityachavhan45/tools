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
      className={`min-h-[70vh] ${whiteBackground ? "bg-white text-slate-900" : ""}`}
    >
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            {plain ? (
              <div className="tool-content p-0 md:p-0">{children}</div>
            ) : (
              <div className="card-surface hover-float">
                <div className="tool-content p-4 md:p-6">{children}</div>
              </div>
            )}
          </div>
          <aside className="lg:col-span-4">
            {plainSidebar ? (
              <div className="tool-content p-4 md:p-6">
                {sidebar || (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Privacy:</strong> Processing happens in your browser.
                    </p>
                    <p>
                      <strong>Tip:</strong> Drag and drop files onto the input.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="card-surface p-4 md:p-6">
                {sidebar || (
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>Privacy:</strong> Processing happens in your browser.
                    </p>
                    <p>
                      <strong>Tip:</strong> Drag and drop files onto the input.
                    </p>
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


