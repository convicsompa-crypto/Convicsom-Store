import { useMemo, useState } from 'react'
import { Select } from '../ui/Select'
import { PriceTag } from '../ui/PriceTag'
import type { Product, SpecGroup } from '../../types/product'

interface ComparisonRow {
  category: string
  label: string
  a?: string
  b?: string
}

function buildRows(a?: SpecGroup[], b?: SpecGroup[]): ComparisonRow[] {
  const rows: ComparisonRow[] = []
  const find = (category: string, label: string) => rows.find((r) => r.category === category && r.label === label)

  for (const group of a ?? []) {
    for (const item of group.items) {
      rows.push({ category: group.category, label: item.label, a: item.value })
    }
  }
  for (const group of b ?? []) {
    for (const item of group.items) {
      const existing = find(group.category, item.label)
      if (existing) {
        existing.b = item.value
      } else {
        rows.push({ category: group.category, label: item.label, b: item.value })
      }
    }
  }
  return rows
}

export function CompareSection({ product, candidates }: { product: Product; candidates: Product[] }) {
  const [compareId, setCompareId] = useState<string>(candidates[0]?.id ?? '')
  const compareProduct = candidates.find((p) => p.id === compareId)
  const rows = useMemo(() => buildRows(product.specs, compareProduct?.specs), [product, compareProduct])

  if (candidates.length === 0) return null

  return (
    <div>
      <div className="mb-4 max-w-xs">
        <Select
          label="Comparar com"
          options={candidates.map((c) => ({ value: c.id, label: c.name }))}
          value={compareId}
          onChange={(e) => setCompareId(e.target.value)}
        />
      </div>

      {compareProduct && (
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="w-1/3 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 sm:px-6">
                  Especificação
                </th>
                <th className="px-4 py-3 text-left sm:px-6">
                  <p className="font-display text-sm font-semibold text-neutral-900">{product.name}</p>
                  <div className="mt-1">
                    <PriceTag price={product.price} size="sm" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left sm:px-6">
                  <p className="font-display text-sm font-semibold text-neutral-900">{compareProduct.name}</p>
                  <div className="mt-1">
                    <PriceTag price={compareProduct.price} size="sm" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.map((row) => (
                <tr key={`${row.category}-${row.label}`}>
                  <td className="px-4 py-3 text-neutral-500 sm:px-6">
                    <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{row.category}</span>
                    {row.label}
                  </td>
                  <td className="px-4 py-3 font-mono text-neutral-900 sm:px-6">{row.a ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-neutral-900 sm:px-6">{row.b ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
