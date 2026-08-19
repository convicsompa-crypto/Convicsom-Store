import { useMemo, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Container } from '../components/ui/Container'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Button } from '../components/ui/Button'
import { ProductCard } from '../components/ui/ProductCard'
import { StateBlock } from '../components/ui/EmptyState'
import { PLPToolbar } from '../components/plp/PLPToolbar'
import { FilterPanel } from '../components/plp/FilterPanel'
import { MobileFilterSheet } from '../components/plp/MobileFilterSheet'
import { CompareBar } from '../components/plp/CompareBar'
import { applyFilters, emptyFilters, sortProducts, countActiveFilters, type FilterState, type SortOption } from '../components/plp/filters'
import { allProducts } from '../data/products'
import { SearchX } from 'lucide-react'
import { cn } from '../lib/cn'

const COMPARE_MAX = 2

export function PLPPage() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [sort, setSort] = useState<SortOption>('relevancia')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [compareIds, setCompareIds] = useState<string[]>([])

  const brands = useMemo(() => [...new Set(allProducts.map((p) => p.brand))].sort(), [])
  const numStringsOptions = useMemo(
    () => [...new Set(allProducts.map((p) => p.numStrings).filter((n): n is number => n !== undefined))].sort((a, b) => a - b),
    [],
  )
  const connectivityOptions = useMemo(
    () => [...new Set(allProducts.flatMap((p) => p.connectivity ?? []))].sort(),
    [],
  )

  const filtered = useMemo(() => applyFilters(allProducts, filters), [filters])
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])
  const compareSelected = useMemo(() => allProducts.filter((p) => compareIds.includes(p.id)), [compareIds])

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id].slice(-COMPARE_MAX)))
  }

  const filterPanelSharedProps = {
    filters,
    onChange: setFilters,
    brands,
    numStringsOptions,
    connectivityOptions,
    onClear: () => setFilters(emptyFilters),
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <Container className="py-4">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Todos os produtos' }]} />
      </Container>

      <Container>
        <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Todos os produtos</h1>

        <PLPToolbar
          resultCount={sorted.length}
          filtersOpen={filtersOpen}
          onToggleFilters={() => {
            // Desktop (lg+): alterna a sidebar inline. Abaixo de lg, a sidebar
            // nunca é exibida — o clique sempre abre o bottom sheet, que tem
            // seu próprio fechamento (X, backdrop ou "Ver produtos").
            setFiltersOpen((o) => !o)
            setMobileFiltersOpen(true)
          }}
          activeFilterCount={countActiveFilters(filters)}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          compareMode={compareMode}
          onToggleCompareMode={() => setCompareMode((c) => !c)}
        />

        <div className="flex gap-8 py-6">
          {filtersOpen && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <FilterPanel {...filterPanelSharedProps} />
            </aside>
          )}

          <div className="min-w-0 flex-1">
            {sorted.length === 0 ? (
              <StateBlock
                icon={<SearchX className="size-5" aria-hidden="true" />}
                title="Nenhum produto encontrado"
                description="Tente ajustar ou limpar os filtros selecionados."
                action={
                  <Button size="sm" variant="secondary" onClick={() => setFilters(emptyFilters)}>
                    Limpar filtros
                  </Button>
                }
              />
            ) : (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'list' ? 'grid-cols-1' : cn('grid-cols-2 sm:grid-cols-3', filtersOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'),
                )}
              >
                {sorted.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    layout={viewMode}
                    name={p.name}
                    category={p.category}
                    price={p.price}
                    originalPrice={p.originalPrice}
                    installments={p.installments}
                    badges={p.badges}
                    colors={p.colors}
                    showWhatsapp={p.showWhatsapp}
                    imageGradient={p.imageGradient}
                    compareMode={compareMode}
                    compareSelected={compareIds.includes(p.id)}
                    compareDisabled={compareIds.length >= COMPARE_MAX}
                    onToggleCompare={() => toggleCompare(p.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      {mobileFiltersOpen && (
        <MobileFilterSheet
          {...filterPanelSharedProps}
          resultCount={sorted.length}
          onClose={() => setMobileFiltersOpen(false)}
        />
      )}

      {compareMode && (
        <CompareBar
          selected={compareSelected}
          max={COMPARE_MAX}
          onRemove={(id) => setCompareIds((prev) => prev.filter((i) => i !== id))}
          onClear={() => setCompareIds([])}
        />
      )}

      <Footer />
    </div>
  )
}
