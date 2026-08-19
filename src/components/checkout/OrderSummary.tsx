import type { CartItem } from '../../context/CartContext'
import { cn } from '../../lib/cn'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount?: number
  className?: string
}

export function OrderSummary({ items, subtotal, shipping, discount = 0, className }: OrderSummaryProps) {
  const total = subtotal + shipping - discount

  return (
    <div className={cn('rounded-xl border border-neutral-200 bg-white p-5', className)}>
      <p className="font-display text-lg font-bold text-neutral-900">Resumo do pedido</p>

      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.key} className="flex gap-3">
            <div className={cn('relative size-14 shrink-0 rounded-lg bg-gradient-to-br', item.imageGradient)} aria-hidden="true">
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <p className="text-sm font-medium text-neutral-900">{item.name}</p>
              {item.variantLabel && <p className="text-xs text-neutral-500">{item.variantLabel}</p>}
            </div>
            <p className="shrink-0 text-sm font-semibold text-neutral-900">{currency.format(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>{currency.format(subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Frete</span>
          <span>{shipping === 0 ? 'Grátis' : currency.format(shipping)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success-700">
            <span>Desconto PIX</span>
            <span>-{currency.format(discount)}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between border-t border-neutral-200 pt-3">
        <span className="text-sm font-semibold text-neutral-900">Total</span>
        <span className="font-display text-xl font-bold text-neutral-900">{currency.format(total)}</span>
      </div>
    </div>
  )
}
