import type { Product, UseCase } from '../../types/product'

export type PriceRange = 'under-500' | '500-1500' | '1500-4000' | 'over-4000'
export type PowerRange = 'under-200' | '200-400' | 'over-400'
export type SortOption = 'relevancia' | 'menor-preco' | 'maior-preco' | 'nome-az'

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: PriceRange | null
  numStrings: number[]
  power: PowerRange[]
  connectivity: string[]
  use: UseCase[]
}

export const emptyFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: null,
  numStrings: [],
  power: [],
  connectivity: [],
  use: [],
}

export const priceRangeLabels: Record<PriceRange, string> = {
  'under-500': 'Até R$ 500',
  '500-1500': 'R$ 500 a R$ 1.500',
  '1500-4000': 'R$ 1.500 a R$ 4.000',
  'over-4000': 'Acima de R$ 4.000',
}

export const powerRangeLabels: Record<PowerRange, string> = {
  'under-200': 'Até 200W',
  '200-400': '200W a 400W',
  'over-400': 'Acima de 400W',
}

export const useCaseOptions: UseCase[] = ['Igreja', 'Estúdio', 'Palco', 'Casa']

function matchesPriceRange(price: number, range: PriceRange) {
  switch (range) {
    case 'under-500':
      return price < 500
    case '500-1500':
      return price >= 500 && price < 1500
    case '1500-4000':
      return price >= 1500 && price < 4000
    case 'over-4000':
      return price >= 4000
  }
}

function matchesPowerRange(watts: number, range: PowerRange) {
  switch (range) {
    case 'under-200':
      return watts < 200
    case '200-400':
      return watts >= 200 && watts <= 400
    case 'over-400':
      return watts > 400
  }
}

export function applyFilters(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category)) return false
    if (filters.brands.length && !filters.brands.includes(p.brand)) return false
    if (filters.priceRange && !matchesPriceRange(p.price, filters.priceRange)) return false
    if (filters.numStrings.length && !(p.numStrings && filters.numStrings.includes(p.numStrings))) return false
    if (filters.power.length && !(p.powerWatts !== undefined && filters.power.some((r) => matchesPowerRange(p.powerWatts!, r))))
      return false
    if (filters.connectivity.length && !(p.connectivity && filters.connectivity.some((c) => p.connectivity!.includes(c))))
      return false
    if (filters.use.length && !(p.use && filters.use.some((u) => p.use!.includes(u)))) return false
    return true
  })
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const arr = [...products]
  switch (sort) {
    case 'menor-preco':
      return arr.sort((a, b) => a.price - b.price)
    case 'maior-preco':
      return arr.sort((a, b) => b.price - a.price)
    case 'nome-az':
      return arr.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    default:
      return arr
  }
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.categories.length +
    filters.brands.length +
    (filters.priceRange ? 1 : 0) +
    filters.numStrings.length +
    filters.power.length +
    filters.connectivity.length +
    filters.use.length
  )
}
