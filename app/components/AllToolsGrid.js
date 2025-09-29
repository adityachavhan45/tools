"use client";

import { useState } from "react";

export default function AllToolsGrid({ tools }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const visible = tools.slice(0, visibleCount);
  const hasMore = visibleCount < tools.length;

  function loadMore() {
    setVisibleCount((c) => Math.min(c + 20, tools.length));
  }

  return (
    <section
      id="all-tools"
      className="max-w-7xl mx-auto py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
        Complete List of Free Online Tools
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {visible.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="block p-4 sm:p-5 md:p-6 bg-white border rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight">
              {tool.label}
            </h3>
            {tool.desc && (
              <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
                {tool.desc}
              </p>
            )}
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-slate-900 text-white shadow hover:bg-black transition"
            aria-label="Load more tools"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
