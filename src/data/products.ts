import type { BadgeVariant } from '../components/ui/Badge'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  installments?: { count: number; value: number }
  badges?: BadgeVariant[]
  colors?: { name: string; hex: string }[]
  showWhatsapp?: boolean
  imageGradient: string
}

export const featuredProducts: Product[] = [
  {
    id: 'guitarra-stratocaster-hss',
    name: 'Guitarra Stratocaster HSS',
    category: 'Cordas',
    price: 4299,
    originalPrice: 4799,
    installments: { count: 12, value: 358.25 },
    badges: ['new'],
    colors: [
      { name: 'Sunburst', hex: '#8a4b1f' },
      { name: 'Preto', hex: '#1a1a1a' },
      { name: 'Branco', hex: '#f5f5f0' },
    ],
    imageGradient: 'from-amber-100 to-amber-200',
  },
  {
    id: 'mesa-de-som-digital-16-canais',
    name: 'Mesa de Som Digital 16 Canais',
    category: 'Áudio Profissional',
    price: 6890,
    installments: { count: 12, value: 574.16 },
    badges: ['sale'],
    showWhatsapp: true,
    imageGradient: 'from-slate-200 to-slate-300',
  },
  {
    id: 'caixa-ativa-15-400w',
    name: 'Caixa Ativa 15" 400W',
    category: 'Áudio Profissional',
    price: 2350,
    installments: { count: 10, value: 235 },
    badges: ['lastUnits'],
    showWhatsapp: true,
    imageGradient: 'from-neutral-300 to-neutral-400',
  },
  {
    id: 'cajon-acustico',
    name: 'Cajón Acústico Premium',
    category: 'Percussão',
    price: 890,
    installments: { count: 8, value: 111.25 },
    imageGradient: 'from-orange-100 to-orange-200',
  },
]
