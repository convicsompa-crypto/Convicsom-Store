import { Container } from '../ui/Container'
import { EditorialCard } from '../ui/EditorialCard'

export function LaunchGrid() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <EditorialCard
            to="/produtos/contrabaixo-waldman-pj"
            imageGradient="from-red-100 to-red-200"
            alt="Contrabaixo Waldman PJ 4 cordas"
            eyebrow="Lançamento"
            title="Contrabaixo Waldman"
            tone="light"
            className="aspect-square"
          />
          <EditorialCard
            to="/produtos/mesa-behringer-wing"
            imageGradient="from-slate-700 to-slate-900"
            alt="Mesa digital Behringer WING"
            eyebrow="Novo"
            title="Mesa Behringer WING"
            tone="dark"
            className="aspect-square"
          />
        </div>
      </Container>
    </section>
  )
}
