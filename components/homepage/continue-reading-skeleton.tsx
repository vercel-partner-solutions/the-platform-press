export default function ContinueReadingSkeleton() {
  return (
    <section aria-label="Loading continue reading section" className="mb-10">
      <div className="border-b-2 border-black pb-2 mb-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <article key={`skeleton-${index}`} className="group bg-white">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md mb-3 bg-gray-200 animate-pulse"></div>
            <div className="flex flex-col">
              <div className="mb-2">
                <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
              </div>
              <div className="mb-3">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
