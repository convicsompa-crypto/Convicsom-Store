import { Container } from '../ui/Container'

interface CategoryBanner {
  title: string
  description: string
  gradient: string
}

const categories: CategoryBanner[] = [
  {
    title: 'Instrumentos',
    description: 'Cordas, sopros, teclas e percussão',
    gradient: 'from-amber-100 to-amber-300',
  },
  {
    title: 'Áudio Profissional',
    description: 'Mesas de som, caixas ativas, microfones',
    gradient: 'from-slate-200 to-slate-400',
  },
  {
    title: 'Marcas',
    description: 'As principais marcas do mercado',
    gradient: 'from-brand-100 to-brand-300',
  },
]

export function CategoryBannerGrid() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Compre por categoria</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((c) => (
            <a
              key={c.title}
              href="#"
              className={`group relative flex h-56 flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br p-6 ${c.gradient}`}
            >
              <h3 className="font-display text-xl font-bold text-neutral-900">{c.title}</h3>
              <p className="mt-1 text-sm text-neutral-700">{c.description}</p>
              <span className="mt-3 text-sm font-semibold text-brand-800 underline-offset-2 group-hover:underline">
                Ver produtos →
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
