const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

interface PriceTagProps {
  price: number
  originalPrice?: number
  installments?: { count: number; value: number }
  size?: 'sm' | 'lg'
}

export function PriceTag({ price, originalPrice, installments, size = 'lg' }: PriceTagProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-neutral-400 line-through">
          {currency.format(originalPrice)}
        </span>
      )}
      <span
        className={
          size === 'lg'
            ? 'font-display text-2xl font-bold text-neutral-900'
            : 'font-display text-lg font-bold text-neutral-900'
        }
      >
        {currency.format(price)}
      </span>
      {installments && (
        <span className="text-sm font-semibold text-accent-800">
          {installments.count}x de {currency.format(installments.value)} sem juros
        </span>
      )}
    </div>
  )
}
