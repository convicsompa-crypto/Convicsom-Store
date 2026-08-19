import { GitCompareArrows, LayoutGrid, List, SlidersHorizontal } from 'lucide-react'
import { Select } from '../ui/Select'
import { cn } from '../../lib/cn'
import type { SortOption } from './filters'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome-az', label: 'Nome (A-Z)' },
]

interface PLPToolbarProps {
  resultCount: number
  filtersOpen: boolean
  onToggleFilters: () => void
  activeFilterCount: number
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  compareMode: boolean
  onToggleCompareMode: () => void
}

export function PLPToolbar({
  resultCount,
  filtersOpen,
  onToggleFilters,
  activeFilterCount,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  compareMode,
  onToggleCompareMode,
}: PLPToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-neutral-200 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleFilters}
          aria-pressed={filtersOpen}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition-colors',
            filtersOpen
              ? 'border-brand-500 bg-brand-50 text-brand-700'
              : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
          )}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filtros
          {activeFilterCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
        <p className="text-sm text-neutral-500">
          <span className="font-semibold text-neutral-900">{resultCount}</span> produto{resultCount === 1 ? '' : 's'}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          label="Ordenar por"
          hideLabel
          options={sortOptions}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-44"
        />

        <div className="flex items-center gap-1 rounded-md border border-neutral-300 p-1">
          <button
            type="button"
            aria-label="Ver em grade"
            aria-pressed={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'flex size-9 items-center justify-center rounded',
              viewMode === 'grid' ? 'bg-brand-50 text-brand-700' : 'text-neutral-500 hover:bg-neutral-100',
            )}
          >
            <LayoutGrid className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Ver em lista"
            aria-pressed={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
            className={cn(
              'flex size-9 items-center justify-center rounded',
              viewMode === 'list' ? 'bg-brand-50 text-brand-700' : 'text-neutral-500 hover:bg-neutral-100',
            )}
          >
            <List className="size-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleCompareMode}
          aria-pressed={compareMode}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition-colors',
            compareMode
              ? 'border-brand-500 bg-brand-50 text-brand-700'
              : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
          )}
        >
          <GitCompareArrows className="size-4" aria-hidden="true" />
          Comparar
        </button>
      </div>
    </div>
  )
}
