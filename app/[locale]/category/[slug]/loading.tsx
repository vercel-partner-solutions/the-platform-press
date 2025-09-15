export default function CategorySearchLoading() {
  return (
    <div className="space-y-6">
      {/* Search Bar Loading */}
      <div className="mb-8">
        <div className="h-12 bg-neutral-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Articles Grid Loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[16/9] bg-neutral-200 rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 rounded w-20"></div>
              <div className="h-5 bg-neutral-200 rounded w-full"></div>
              <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              <div className="space-y-1">
                <div className="h-3 bg-neutral-200 rounded w-24"></div>
                <div className="h-3 bg-neutral-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
