import { MapPin } from "lucide-react";

export default function LocalNewsLoading() {
  return (
    <section aria-labelledby="local-news-heading" className="mb-10">
      <div className="flex items-center mb-4 border-b border-neutral-200 pb-2">
        <MapPin size={24} className="mr-2 text-black" />
        <div className="flex items-center gap-2">
          <h2 id="local-news-heading" className="text-2xl font-bold text-black">
            Local News
          </h2>
          <div className="h-6 bg-neutral-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full aspect-[16/9] bg-neutral-200 rounded-md mb-3"></div>
            <div className="space-y-2">
              <div className="h-5 bg-neutral-200 rounded w-full"></div>
              <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              <div className="flex justify-between mt-3">
                <div className="h-3 bg-neutral-200 rounded w-16"></div>
                <div className="h-3 bg-neutral-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
