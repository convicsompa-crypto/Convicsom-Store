import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { Button } from '../ui/Button'
import { QuantityStepper } from '../ui/QuantityStepper'
import { cn } from '../../lib/cn'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function CartDrawer() {
  const { items, itemCount, subtotal, isOpen, closeDrawer, removeItem, updateQuantity } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeDrawer])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <p className="font-display text-lg font-bold text-neutral-900">
            Seu carrinho {itemCount > 0 && <span className="text-neutral-400">({itemCount})</span>}
          </p>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Fechar carrinho"
            className="flex size-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
              <ShoppingBag className="size-5" aria-hidden="true" />
            </div>
            <p className="font-display text-base font-semibold text-neutral-900">Seu carrinho está vazio</p>
            <p className="text-sm text-neutral-500">Adicione produtos para vê-los aqui.</p>
            <Button variant="secondary" size="sm" onClick={closeDrawer}>
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 border-b border-neutral-100 py-4 first:pt-0 last:border-0">
                  <div className={cn('size-20 shrink-0 rounded-lg bg-gradient-to-br', item.imageGradient)} aria-hidden="true" />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                        {item.variantLabel && <p className="text-xs text-neutral-500">{item.variantLabel}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remover ${item.name} do carrinho`}
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-danger-50 hover:text-danger-500"
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <QuantityStepper
                        size="sm"
                        value={item.quantity}
                        onChange={(q) => updateQuantity(item.key, q)}
                        label={`quantidade de ${item.name}`}
                      />
                      <p className="text-sm font-semibold text-neutral-900">{currency.format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-200 px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-neutral-600">Subtotal</p>
                <p className="font-display text-lg font-bold text-neutral-900">{currency.format(subtotal)}</p>
              </div>
              <p className="mb-4 text-xs text-neutral-400">Frete e parcelamento calculados no checkout.</p>
              <Link to="/checkout" onClick={closeDrawer}>
                <Button size="lg" fullWidth>
                  Finalizar compra
                </Button>
              </Link>
              <Button variant="ghost" size="sm" fullWidth onClick={closeDrawer} className="mt-2">
                Continuar comprando
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
