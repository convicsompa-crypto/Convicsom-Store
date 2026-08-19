import type { BadgeVariant } from '../components/ui/Badge'

export type ProductCategory = 'Instrumentos' | 'Áudio Profissional'

export type UseCase = 'Igreja' | 'Estúdio' | 'Palco' | 'Casa'

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
}
