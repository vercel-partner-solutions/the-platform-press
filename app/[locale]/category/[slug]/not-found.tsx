import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <h1 className="text-2xl font-bold text-black mb-4">Category Not Found</h1>
      <p className="text-neutral-600 text-lg mb-6">
        The category you're looking for doesn't exist or may have been moved.
      </p>
    </div>
  );
}
