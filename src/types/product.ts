import type { BadgeVariant } from '../components/ui/Badge'

export type ProductCategory = 'Instrumentos' | 'Áudio Profissional'

export type UseCase = 'Igreja' | 'Estúdio' | 'Palco' | 'Casa'

export interface SpecGroup {
  category: string
  items: { label: string; value: string }[]
}

export interface ProductHighlight {
  title: string
  description: string
  imageGradient: string
}

export interface ProductVariation {
  name: string
  options: string[]
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  subcategory: string
  brand: string
  price: number
  originalPrice?: number
  installments?: { count: number; value: number }
  badges?: BadgeVariant[]
  colors?: { name: string; hex: string }[]
  showWhatsapp?: boolean
  imageGradient: string
  /** Só se aplica a instrumentos de corda */
  numStrings?: number
  /** Só se aplica a equipamentos de áudio profissional */
  powerWatts?: number
  connectivity?: string[]
  use?: UseCase[]

  /** Campos usados na página de produto (PDP) */
  images?: string[]
  summary?: string
  characteristics?: string[]
  specs?: SpecGroup[]
  highlights?: ProductHighlight[]
  downloads?: { label: string }[]
  variations?: ProductVariation[]
}
