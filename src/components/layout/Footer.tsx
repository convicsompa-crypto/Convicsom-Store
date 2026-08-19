import { CreditCard, Headset, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const trustBadges = [
  { icon: CreditCard, title: '12x sem juros', description: 'No cartão, em todo o site' },
  { icon: ShieldCheck, title: 'Garantia estendida', description: 'Em instrumentos e equipamentos selecionados' },
  { icon: MapPin, title: 'Retirada em loja', description: 'Pouso Alegre (MG), sem custo' },
  { icon: Headset, title: 'Suporte especializado', description: 'Time técnico em áudio profissional' },
]

const columns = [
  {
    title: 'Institucional',
    links: ['Nossa loja', 'Serviço de instalação', 'Fale conosco', 'Trabalhe conosco'],
  },
  {
    title: 'Categorias',
    links: ['Instrumentos', 'Áudio Profissional', 'Marcas', 'Ofertas'],
  },
  {
    title: 'Ajuda',
    links: ['Trocas e devoluções', 'Formas de pagamento', 'Prazo de entrega', 'Perguntas frequentes'],
  },
]

export function Footer() {
  return (
    <footer className="bg-brand-900 text-neutral-300">
      <div className="border-b border-white/10">
        <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {trustBadges.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-6 shrink-0 text-accent-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-neutral-400">{description}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Logo className="h-9 brightness-0 invert" />
          <p className="mt-4 text-sm text-neutral-400">
            Instrumentos musicais e áudio profissional em Pouso Alegre (MG).
          </p>
          <Link to="/#projetos" className="mt-4 inline-block text-sm font-semibold text-accent-500 hover:underline">
            Sou empresa/igreja →
          </Link>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-white">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) =>
                col.title === 'Categorias' ? (
                  <li key={link}>
                    <Link to="/produtos" className="text-sm text-neutral-400 hover:text-white">
                      {link}
                    </Link>
                  </li>
                ) : (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10 py-4">
        <Container>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Convicsom — Pouso Alegre, MG. Protótipo visual, sem CNPJ vinculado a esta build.
          </p>
        </Container>
      </div>
    </footer>
  )
}
