export default function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-sm transition-colors bg-accent text-accent-foreground`}
    >
      {category}
    </span>
  )
}
