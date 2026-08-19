import { ProductCard } from '../ui/ProductCard'
import type { Product } from '../../types/product'

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
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
  )
}
