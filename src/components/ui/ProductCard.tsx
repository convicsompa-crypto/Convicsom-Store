import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { Badge, type BadgeVariant } from './Badge'
import { PriceTag } from './PriceTag'
import { ColorSwatchGroup } from './ColorSwatch'
import { Button } from './Button'
import { cn } from '../../lib/cn'

interface ProductCardProps {
  name: string
  category: string
  price: number
  originalPrice?: number
  installments?: { count: number; value: number }
  badges?: BadgeVariant[]
  colors?: { name: string; hex: string }[]
  showWhatsapp?: boolean
  imageGradient?: string
  className?: string
}

export function ProductCard({
  name,
  category,
  price,
  originalPrice,
  installments,
  badges = [],
  colors,
  showWhatsapp = false,
  imageGradient = 'from-neutral-200 to-neutral-300',
  className,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name ?? '')
  const [saved, setSaved] = useState(false)

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white',
        'transition-shadow hover:shadow-lg',
        className,
      )}
    >
      <div className={cn('relative aspect-square bg-gradient-to-br', imageGradient)}>
        {badges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {badges.map((b) => (
              <Badge key={b} variant={b} />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm hover:bg-white"
        >
          <Heart className={cn('size-4', saved && 'fill-danger-500 text-danger-500')} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{category}</p>
          <h3 className="font-display text-base font-semibold text-neutral-900">{name}</h3>
        </div>

        {colors && colors.length > 0 && (
          <ColorSwatchGroup options={colors} value={selectedColor} onChange={setSelectedColor} />
        )}

        <PriceTag price={price} originalPrice={originalPrice} installments={installments} size="sm" />

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <Button size="sm" className="w-full">
            Comprar
          </Button>
          {showWhatsapp && (
            <Button size="sm" variant="whatsapp" leftIcon={<MessageCircle className="size-4" aria-hidden="true" />} className="w-full">
              Falar no WhatsApp
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
