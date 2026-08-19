import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Loader2, MapPin, QrCode, ShoppingBag, Store, Truck } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Container } from '../components/ui/Container'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { OrderSummary } from '../components/checkout/OrderSummary'
import { CheckoutConfirmation } from '../components/checkout/CheckoutConfirmation'
import { useCart } from '../context/CartContext'
import { lookupCep, formatCep } from '../lib/cep'
import { stores } from '../data/stores'
import { cn } from '../lib/cn'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

const installmentOptions = [1, 2, 3, 6, 10, 12]

type DeliveryMethod = 'entrega' | 'retirada'
type PaymentMethod = 'cartao' | 'pix'

function OptionCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean
  onClick: () => void
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex flex-1 items-start gap-3 rounded-lg border p-4 text-left transition-colors',
        selected ? 'border-brand-500 bg-brand-50' : 'border-neutral-300 hover:border-neutral-400',
      )}
    >
      <span className={cn('mt-0.5 shrink-0', selected ? 'text-brand-600' : 'text-neutral-400')}>{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-neutral-900">{title}</span>
        <span className="block text-xs text-neutral-500">{description}</span>
      </span>
    </button>
  )
}

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart()

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('entrega')
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cartao')
  const [installments, setInstallments] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState<{
    orderNumber: string
    total: number
    email: string
    storeCity?: string
  } | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cep, setCep] = useState('')
  const [cepStatus, setCepStatus] = useState<'idle' | 'loading' | 'success' | 'not-found' | 'error'>('idle')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const selectedStore = stores.find((s) => s.id === selectedStoreId) ?? stores[0]

  useEffect(() => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setCepStatus('idle')
      return
    }

    let cancelled = false
    setCepStatus('loading')

    const timeoutId = window.setTimeout(async () => {
      try {
        const address = await lookupCep(digits)
        if (cancelled) return
        if (!address) {
          setCepStatus('not-found')
          return
        }
        setStreet(address.street)
        setNeighborhood(address.neighborhood)
        setCity(address.city)
        setState(address.state)
        setCepStatus('success')
      } catch {
        if (!cancelled) setCepStatus('error')
      }
    }, 400)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [cep])

  const shipping = deliveryMethod === 'retirada' ? 0 : subtotal >= 500 ? 0 : 29.9
  const discount = paymentMethod === 'pix' ? subtotal * 0.05 : 0
  const total = subtotal + shipping - discount

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => {
      const orderNumber = `CV-${Math.floor(100000 + Math.random() * 900000)}`
      setConfirmation({
        orderNumber,
        total,
        email,
        storeCity: deliveryMethod === 'retirada' ? selectedStore.city : undefined,
      })
      clear()
      setIsSubmitting(false)
    }, 700)
  }

  if (confirmation) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <Container>
          <CheckoutConfirmation
            orderNumber={confirmation.orderNumber}
            total={confirmation.total}
            email={confirmation.email}
            deliveryMethod={deliveryMethod}
            storeCity={confirmation.storeCity}
          />
        </Container>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <Container className="flex flex-col items-center gap-4 py-24 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
            <ShoppingBag className="size-5" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Seu carrinho está vazio</h1>
          <p className="text-sm text-neutral-500">Adicione produtos ao carrinho antes de finalizar a compra.</p>
          <Link to="/produtos">
            <Button>Ver produtos</Button>
          </Link>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <Container className="py-4">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Carrinho', to: '/produtos' }, { label: 'Checkout' }]} />
      </Container>

      <Container className="pb-20">
        <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900">Entrega</h2>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <OptionCard
                  selected={deliveryMethod === 'entrega'}
                  onClick={() => setDeliveryMethod('entrega')}
                  icon={<Truck className="size-5" aria-hidden="true" />}
                  title="Entrega"
                  description={subtotal >= 500 ? 'Frete grátis nesta compra' : 'Frete a partir de R$ 29,90'}
                />
                <OptionCard
                  selected={deliveryMethod === 'retirada'}
                  onClick={() => setDeliveryMethod('retirada')}
                  icon={<Store className="size-5" aria-hidden="true" />}
                  title="Retirar na loja"
                  description="Grátis — 3 unidades no Sul de Minas"
                />
              </div>

              {deliveryMethod === 'entrega' ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="relative col-span-2 sm:col-span-1">
                    <Input
                      label="CEP"
                      value={cep}
                      onChange={(e) => setCep(formatCep(e.target.value))}
                      placeholder="00000-000"
                      inputMode="numeric"
                      required
                      error={cepStatus === 'not-found' ? 'CEP não encontrado' : cepStatus === 'error' ? 'Não foi possível buscar o CEP' : undefined}
                      hint={cepStatus === 'loading' ? 'Buscando endereço...' : cepStatus === 'success' ? 'Endereço encontrado' : undefined}
                    />
                    {cepStatus === 'loading' && (
                      <Loader2 className="absolute right-3 top-10 size-4 animate-spin text-neutral-400" aria-hidden="true" />
                    )}
                  </div>
                  <Input label="Endereço" value={street} onChange={(e) => setStreet(e.target.value)} required className="col-span-2 sm:col-span-2" />
                  <Input label="Número" value={number} onChange={(e) => setNumber(e.target.value)} required />
                  <Input label="Bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required className="col-span-2 sm:col-span-2" />
                  <Input label="Cidade" value={city} onChange={(e) => setCity(e.target.value)} required />
                  <Input label="UF" value={state} onChange={(e) => setState(e.target.value)} required maxLength={2} />
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2" role="radiogroup" aria-label="Loja para retirada">
                  {stores.map((s) => {
                    const selected = s.id === selectedStoreId
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setSelectedStoreId(s.id)}
                        className={cn(
                          'flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
                          selected ? 'border-brand-500 bg-brand-50' : 'border-neutral-300 hover:border-neutral-400',
                        )}
                      >
                        <MapPin className={cn('mt-0.5 size-5 shrink-0', selected ? 'text-brand-600' : 'text-neutral-400')} aria-hidden="true" />
                        <span>
                          <span className="block text-sm font-semibold text-neutral-900">{s.city}</span>
                          <span className="block text-xs text-neutral-500">{s.address}</span>
                        </span>
                      </button>
                    )
                  })}
                  <p className="mt-1 text-xs text-neutral-400">
                    Retirada gratuita. Avisaremos por e-mail quando o pedido estiver pronto.
                  </p>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900">Seus dados</h2>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} required className="sm:col-span-2" />
                <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label="Telefone/WhatsApp" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-neutral-900">Pagamento</h2>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <OptionCard
                  selected={paymentMethod === 'cartao'}
                  onClick={() => setPaymentMethod('cartao')}
                  icon={<CreditCard className="size-5" aria-hidden="true" />}
                  title="Cartão de crédito"
                  description="Em até 12x sem juros"
                />
                <OptionCard
                  selected={paymentMethod === 'pix'}
                  onClick={() => setPaymentMethod('pix')}
                  icon={<QrCode className="size-5" aria-hidden="true" />}
                  title="PIX"
                  description="5% de desconto à vista"
                />
              </div>

              {paymentMethod === 'cartao' && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input label="Número do cartão" placeholder="0000 0000 0000 0000" required />
                  <Input label="Nome no cartão" required />
                  <Input label="Validade" placeholder="MM/AA" required />
                  <Input label="CVV" placeholder="123" required />
                  <Select
                    label="Parcelamento"
                    className="sm:col-span-2"
                    value={String(installments)}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    options={installmentOptions.map((n) => ({
                      value: String(n),
                      label: n === 1 ? `1x de ${currency.format(total)} (à vista)` : `${n}x de ${currency.format(total / n)} sem juros`,
                    }))}
                  />
                </div>
              )}

              {paymentMethod === 'pix' && (
                <p className="mt-4 rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
                  O QR Code do PIX será exibido após a confirmação do pedido (fluxo simplificado — protótipo).
                </p>
              )}
            </section>
          </div>

          <div className="flex flex-col gap-4">
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} discount={discount} className="lg:sticky lg:top-24" />
            <Button type="submit" size="lg" isLoading={isSubmitting} className="lg:sticky lg:top-[27rem]">
              Finalizar pedido
            </Button>
          </div>
        </form>
      </Container>

      <Footer />
    </div>
  )
}
