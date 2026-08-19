import type { Product } from '../types/product'
import raw from './products.json'

export const allProducts = raw as Product[]

const featuredIds = [
  'guitarra-stratocaster-hss',
  'mesa-de-som-digital-16-canais',
  'caixa-ativa-15-400w',
  'cajon-acustico-premium',
]

export const featuredProducts = featuredIds
  .map((id) => allProducts.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p))
