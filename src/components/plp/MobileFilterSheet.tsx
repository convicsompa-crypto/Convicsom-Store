import { X } from 'lucide-react'
import { Button } from '../ui/Button'
import { FilterPanel } from './FilterPanel'
import type { FilterState } from './filters'

interface MobileFilterSheetProps {
  filters: FilterState
  onChange: (next: FilterState) => void
  brands: string[]
  numStringsOptions: number[]
  connectivityOptions: string[]
  onClear: () => void
  onClose: () => void
  resultCount: number
}

export function MobileFilterSheet({ onClose, resultCount, ...filterPanelProps }: MobileFilterSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 lg:hidden" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white px-5 pb-5 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="font-display text-lg font-bold text-neutral-900">Filtros</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar filtros"
            className="flex size-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <FilterPanel {...filterPanelProps} hideHeading />

        <Button onClick={onClose} className="mt-4 w-full" size="lg">
          Ver {resultCount} produto{resultCount === 1 ? '' : 's'}
        </Button>
      </div>
    </div>
  )
}
