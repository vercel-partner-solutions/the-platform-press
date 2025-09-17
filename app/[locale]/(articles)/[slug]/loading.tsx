export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse py-6 sm:py-8">
      <div className="">
        <div className="h-6 bg-neutral-200 rounded w-1/4 mb-3"></div>
        <div className="h-10 bg-neutral-300 rounded w-3/4 mb-3"></div>
        <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-x-4 gap-y-2 mb-6">
          <div className="h-4 bg-neutral-200 rounded w-24"></div>
          <div className="h-4 bg-neutral-200 rounded w-32"></div>
          <div className="h-4 bg-neutral-200 rounded w-20"></div>
        </div>
        <div className="w-full aspect-[16/9] bg-neutral-200 rounded-lg mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 rounded"></div>
          <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
          <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
