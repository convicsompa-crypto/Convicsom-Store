import { Accordion, AccordionItem } from '../ui/Accordion'
import { Button } from '../ui/Button'
import {
  countActiveFilters,
  powerRangeLabels,
  priceRangeLabels,
  useCaseOptions,
  type FilterState,
  type PowerRange,
  type PriceRange,
} from './filters'
import type { UseCase } from '../../types/product'

interface FilterPanelProps {
  filters: FilterState
  onChange: (next: FilterState) => void
  brands: string[]
  numStringsOptions: number[]
  connectivityOptions: string[]
  onClear: () => void
  /** Omite o cabeçalho "Filtros" — usar quando o container pai (ex.: modal mobile) já exibe um título */
  hideHeading?: boolean
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2.5 py-1 text-sm text-neutral-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded accent-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      />
      {label}
    </label>
  )
}

export function FilterPanel({
  filters,
  onChange,
  brands,
  numStringsOptions,
  connectivityOptions,
  onClear,
  hideHeading = false,
}: FilterPanelProps) {
  const activeCount = countActiveFilters(filters)
  const hasAudioContext = filters.categories.length === 0 || filters.categories.includes('Áudio Profissional')
  const hasInstrumentContext = filters.categories.length === 0 || filters.categories.includes('Instrumentos')

  return (
    <div>
      {(!hideHeading || activeCount > 0) && (
        <div className="flex items-center justify-between px-1 pb-3">
          {!hideHeading && (
            <p className="text-sm font-semibold text-neutral-900">
              Filtros {activeCount > 0 && <span className="text-brand-600">({activeCount})</span>}
            </p>
          )}
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} className="ml-auto h-auto px-2 py-1 text-xs">
              Limpar tudo
            </Button>
          )}
        </div>
      )}

      <Accordion>
        <AccordionItem title="Categoria" defaultOpen>
          {(['Instrumentos', 'Áudio Profissional'] as const).map((c) => (
            <CheckboxRow
              key={c}
              label={c}
              checked={filters.categories.includes(c)}
              onChange={() => onChange({ ...filters, categories: toggleValue(filters.categories, c) })}
            />
          ))}
        </AccordionItem>

        <AccordionItem title="Marca" defaultOpen>
          {brands.map((b) => (
            <CheckboxRow
              key={b}
              label={b}
              checked={filters.brands.includes(b)}
              onChange={() => onChange({ ...filters, brands: toggleValue(filters.brands, b) })}
            />
          ))}
        </AccordionItem>

        <AccordionItem title="Faixa de preço" defaultOpen>
          <div className="flex flex-col gap-1">
            {(Object.keys(priceRangeLabels) as PriceRange[]).map((range) => (
              <label key={range} className="flex items-center gap-2.5 py-1 text-sm text-neutral-700">
                <input
                  type="radio"
                  name="price-range"
                  checked={filters.priceRange === range}
                  onChange={() => onChange({ ...filters, priceRange: range })}
                  className="size-4 accent-brand-600"
                />
                {priceRangeLabels[range]}
              </label>
            ))}
            {filters.priceRange && (
              <button
                type="button"
                onClick={() => onChange({ ...filters, priceRange: null })}
                className="mt-1 self-start text-xs font-medium text-brand-600 hover:underline"
              >
                Limpar faixa de preço
              </button>
            )}
          </div>
        </AccordionItem>

        {hasInstrumentContext && numStringsOptions.length > 0 && (
          <AccordionItem title="Nº de cordas">
            {numStringsOptions.map((n) => (
              <CheckboxRow
                key={n}
                label={`${n} cordas`}
                checked={filters.numStrings.includes(n)}
                onChange={() => onChange({ ...filters, numStrings: toggleValue(filters.numStrings, n) })}
              />
            ))}
          </AccordionItem>
        )}

        {hasAudioContext && (
          <AccordionItem title="Potência (W)">
            {(Object.keys(powerRangeLabels) as PowerRange[]).map((range) => (
              <CheckboxRow
                key={range}
                label={powerRangeLabels[range]}
                checked={filters.power.includes(range)}
                onChange={() => onChange({ ...filters, power: toggleValue(filters.power, range) })}
              />
            ))}
          </AccordionItem>
        )}

        {hasAudioContext && connectivityOptions.length > 0 && (
          <AccordionItem title="Conectividade">
            {connectivityOptions.map((c) => (
              <CheckboxRow
                key={c}
                label={c}
                checked={filters.connectivity.includes(c)}
                onChange={() => onChange({ ...filters, connectivity: toggleValue(filters.connectivity, c) })}
              />
            ))}
          </AccordionItem>
        )}

        <AccordionItem title="Uso">
          {useCaseOptions.map((u: UseCase) => (
            <CheckboxRow
              key={u}
              label={u}
              checked={filters.use.includes(u)}
              onChange={() => onChange({ ...filters, use: toggleValue(filters.use, u) })}
            />
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  )
}
