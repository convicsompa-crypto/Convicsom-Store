import type { ProductHighlight } from '../../types/product'

export function HighlightsSection({ highlights }: { highlights: ProductHighlight[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {highlights.map((h) => (
        <div key={h.title} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className={`aspect-[16/9] bg-gradient-to-br ${h.imageGradient}`} aria-hidden="true" />
          <div className="p-4">
            <p className="font-display text-base font-semibold text-neutral-900">{h.title}</p>
            <p className="mt-1 text-sm text-neutral-600">{h.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
