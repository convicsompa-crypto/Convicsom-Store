import { Container } from '../ui/Container'
import { ProductCard } from '../ui/ProductCard'
import { featuredProducts } from '../../data/products'

export function FeaturedProducts() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">Destaques</h2>
          <a href="#" className="text-sm font-semibold text-brand-700 hover:underline">
            Ver todos →
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              category={p.category}
              price={p.price}
              originalPrice={p.originalPrice}
              installments={p.installments}
              badges={p.badges}
              colors={p.colors}
              showWhatsapp={p.showWhatsapp}
              imageGradient={p.imageGradient}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
