import type { SpecGroup } from '../../types/product'

export function SpecsTable({ specs }: { specs: SpecGroup[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200">
      {specs.map((group, i) => (
        <div key={group.category} className={i > 0 ? 'border-t border-neutral-200' : undefined}>
          <p className="bg-neutral-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-6">
            {group.category}
          </p>
          <dl className="divide-y divide-neutral-100">
            {group.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
                <dt className="text-sm text-neutral-500">{item.label}</dt>
                <dd className="font-mono text-sm text-neutral-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
