import { X } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Product } from '../../types/product'

interface CompareBarProps {
  selected: Product[]
  max: number
  onRemove: (id: string) => void
  onClear: () => void
}

export function CompareBar({ selected, max, onRemove, onClear }: CompareBarProps) {
  if (selected.length === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-neutral-600">
            {selected.length}/{max} selecionados para comparar
          </p>
          {selected.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 py-1 pl-3 pr-1.5 text-xs font-medium text-neutral-700"
            >
              {p.name}
              <button
                type="button"
                onClick={() => onRemove(p.id)}
                aria-label={`Remover ${p.name} da comparação`}
                className="flex size-5 items-center justify-center rounded-full hover:bg-neutral-200"
              >
                <X className="size-3" aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onClear} className="text-sm font-medium text-neutral-500 hover:text-neutral-700">
            Limpar
          </button>
          <Button size="sm" disabled={selected.length < 2} title={selected.length < 2 ? 'Selecione 2 produtos para comparar' : undefined}>
            Comparar ({selected.length}/{max})
          </Button>
        </div>
      </div>
    </div>
  )
}
