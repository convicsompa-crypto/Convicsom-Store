import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShoppingBag, Store, User, X } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { SearchBar } from '../ui/SearchBar'
import { CartDrawer } from '../cart/CartDrawer'
import { useCart } from '../../context/CartContext'
import { cn } from '../../lib/cn'

const institutionalLinks = [
  { label: 'Nossa Loja', href: '#' },
  { label: 'Serviço de Instalação', href: '#' },
  { label: 'Fale Conosco', href: '#' },
]

const promoMessages = [
  '12x sem juros em todo o site',
  'Frete grátis para Pouso Alegre e região',
  'Retirada gratuita na loja física',
]

const categoryLinks = [
  { label: 'Instrumentos', to: '/produtos' },
  { label: 'Áudio Profissional', to: '/produtos' },
  { label: 'Marcas', to: '/produtos' },
  { label: 'Ofertas', to: '/produtos' },
]

export function Header() {
  const [promoIndex, setPromoIndex] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, openDrawer } = useCart()

  useEffect(() => {
    const id = setInterval(() => setPromoIndex((i) => (i + 1) % promoMessages.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
    <header className="sticky top-0 z-50">
      {/* Camada 1 — barra institucional escura */}
      <div className="hidden bg-brand-900 text-neutral-200 sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <nav aria-label="Institucional" className="flex items-center gap-5">
            {institutionalLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-accent-400">
                {l.label}
              </a>
            ))}
          </nav>
          <p aria-live="polite" className="font-semibold text-accent-500">
            {promoMessages[promoIndex]}
          </p>
        </Container>
      </div>

      {/* Camada 2 — header branco fixo */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="flex h-16 items-center gap-4 sm:gap-6">
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 sm:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>

          <Link to="/" className="shrink-0">
            <Logo crop className="h-6 sm:h-10" />
          </Link>

          <div className="hidden flex-1 sm:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:ml-0">
            <button
              type="button"
              aria-label="Encontrar loja física"
              className="hidden size-11 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 sm:flex"
            >
              <Store className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Minha conta"
              className="flex size-11 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              <User className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Carrinho de compras${itemCount > 0 ? `, ${itemCount} item(ns)` : ''}`}
              onClick={openDrawer}
              className="relative flex size-11 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </Container>

        {/* Busca sempre acessível no mobile, abaixo do header principal */}
        <div className="border-t border-neutral-100 px-4 pb-3 pt-2 sm:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Camada 3 — navegação principal (categorias) */}
      <nav
        aria-label="Categorias"
        className={cn(
          'border-b border-neutral-200 bg-white sm:block',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <Container className="flex flex-col gap-1 py-2 sm:h-12 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
            {categoryLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-neutral-700 hover:text-brand-700 sm:px-0 sm:py-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/#projetos"
            className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-100 sm:mt-0 sm:py-1.5"
          >
            Projetos para Igrejas e Empresas
          </Link>
        </Container>
      </nav>
    </header>
    <CartDrawer />
    </>
  )
}
