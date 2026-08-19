import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

interface CheckoutConfirmationProps {
  orderNumber: string
  total: number
  deliveryMethod: 'retirada' | 'entrega'
  email: string
}

export function CheckoutConfirmation({ orderNumber, total, deliveryMethod, email }: CheckoutConfirmationProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-success-50 text-success-700">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </div>
      <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Pedido confirmado!</h1>
      <p className="text-sm text-neutral-500">
        Enviamos os detalhes para <strong className="text-neutral-700">{email}</strong>. Guarde o número do pedido abaixo.
      </p>

      <div className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <span className="text-sm text-neutral-500">Número do pedido</span>
          <span className="font-mono text-sm font-semibold text-neutral-900">{orderNumber}</span>
        </div>
        <div className="flex items-center justify-between border-b border-neutral-100 py-4">
          <span className="text-sm text-neutral-500">Total pago</span>
          <span className="font-display text-lg font-bold text-neutral-900">{currency.format(total)}</span>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-neutral-500">Entrega</span>
          <span className="text-sm font-medium text-neutral-900">
            {deliveryMethod === 'retirada' ? 'Retirada na loja — Pouso Alegre (MG)' : 'Entrega no endereço informado'}
          </span>
        </div>
      </div>

      <Link to="/produtos" className="mt-4">
        <Button size="lg">Voltar à loja</Button>
      </Link>
    </div>
  )
}
