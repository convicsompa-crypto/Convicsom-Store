import { Container } from '../ui/Container'
import { EditorialCard } from '../ui/EditorialCard'

export function CategoryBento() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <EditorialCard
            to="/produtos?categoria=acessorios"
            imageGradient="from-amber-100 to-orange-200"
            alt="Acessórios para instrumentos e áudio profissional"
            title="Acessórios"
            tone="light"
            className="aspect-square lg:aspect-auto lg:row-span-2"
          />

          <EditorialCard
            to="/produtos?categoria=pedais"
            imageGradient="from-neutral-700 to-neutral-900"
            alt="Linha de pedais e efeitos"
            title="Linha de pedais"
            tone="dark"
            className="aspect-[510/292]"
          />

          <div className="grid grid-cols-2 gap-4">
            <EditorialCard
              to="/#luthieria"
              imageGradient="from-yellow-100 to-amber-200"
              alt="Serviço de luthieria"
              title="Luthieria"
              tone="light"
              className="aspect-[247/282]"
            />
            <EditorialCard
              to="/#assistencia-tecnica"
              imageGradient="from-slate-600 to-slate-800"
              alt="Assistência técnica especializada"
              title="Assistência Técnica"
              tone="dark"
              className="aspect-[247/282]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
