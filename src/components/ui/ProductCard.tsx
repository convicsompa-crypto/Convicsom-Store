import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle } from 'lucide-react'
import { Badge, type BadgeVariant } from './Badge'
import { PriceTag } from './PriceTag'
import { ColorSwatchGroup } from './ColorSwatch'
import { Button } from './Button'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/cn'

interface ProductCardProps {
  id: string
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
  /** 'grid' (padrão, coluna) ou 'list' (linha, imagem à esquerda) */
  layout?: 'grid' | 'list'
  /** Quando true, mostra checkbox de seleção para comparação no lugar do favoritar */
  compareMode?: boolean
  compareSelected?: boolean
  onToggleCompare?: () => void
  compareDisabled?: boolean
}

export function ProductCard({
  id,
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
  layout = 'grid',
  compareMode = false,
  compareSelected = false,
  onToggleCompare,
  compareDisabled = false,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0]?.name ?? '')
  const [saved, setSaved] = useState(false)
  const isList = layout === 'list'
  const href = `/produtos/${id}`
  const { addItem, openDrawer } = useCart()

  const handleAddToCart = () => {
    addItem({
      productId: id,
      name,
      price,
      imageGradient,
      variantLabel: selectedColor || undefined,
    })
    openDrawer()
  }

  return (
    <article
      className={cn(
        'group flex overflow-hidden rounded-xl border border-neutral-200 bg-white',
        'transition-shadow hover:shadow-lg',
        isList ? 'flex-row' : 'flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'relative shrink-0 bg-gradient-to-br',
          isList ? 'aspect-square w-32 sm:w-48' : 'aspect-square w-full',
          imageGradient,
        )}
      >
        <Link to={href} aria-label={name} className="absolute inset-0" />

        {badges.length > 0 && (
          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
            {badges.map((b) => (
              <Badge key={b} variant={b} />
            ))}
          </div>
        )}
        {compareMode ? (
          <label
            className={cn(
              'absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm',
              compareDisabled && !compareSelected && 'opacity-50',
            )}
          >
            <span className="sr-only">Selecionar "{name}" para comparar</span>
            <input
              type="checkbox"
              checked={compareSelected}
              disabled={compareDisabled && !compareSelected}
              onChange={onToggleCompare}
              className="size-4 accent-brand-600"
            />
          </label>
        ) : (
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label={saved ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm hover:bg-white"
          >
            <Heart className={cn('size-4', saved && 'fill-danger-500 text-danger-500')} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className={cn('flex flex-1 flex-col gap-3 p-4', isList && 'sm:flex-row sm:items-center sm:justify-between')}>
        <div className={cn('flex flex-1 flex-col gap-3', isList && 'sm:pr-4')}>
          <Link to={href} className="block">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{category}</p>
            <h3 className="font-display text-base font-semibold text-neutral-900">{name}</h3>
          </Link>

          {colors && colors.length > 0 && (
            <ColorSwatchGroup options={colors} value={selectedColor} onChange={setSelectedColor} />
          )}

          {!isList && <PriceTag price={price} originalPrice={originalPrice} installments={installments} size="sm" />}
        </div>

        {isList && (
          <div className="shrink-0">
            <PriceTag price={price} originalPrice={originalPrice} installments={installments} size="sm" />
          </div>
        )}

        <div className={cn('mt-auto flex flex-col gap-2 pt-1', isList && 'mt-0 w-full shrink-0 pt-3 sm:w-44 sm:pt-0')}>
          <Button size="sm" className="w-full" onClick={handleAddToCart}>
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
