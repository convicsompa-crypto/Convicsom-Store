import { useMemo, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Container } from '../components/ui/Container'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Button } from '../components/ui/Button'
import { ProductGallery } from '../components/pdp/ProductGallery'
import { PurchasePanel } from '../components/pdp/PurchasePanel'
import { SpecsTable } from '../components/pdp/SpecsTable'
import { HighlightsSection } from '../components/pdp/HighlightsSection'
import { DownloadsList } from '../components/pdp/DownloadsList'
import { CompareSection } from '../components/pdp/CompareSection'
import { RelatedProducts } from '../components/pdp/RelatedProducts'
import { allProducts } from '../data/products'

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-xl font-bold text-neutral-900 sm:text-2xl">{children}</h2>
}

export function PDPPage() {
  const { id } = useParams<{ id: string }>()
  const product = useMemo(() => allProducts.find((p) => p.id === id), [id])

  const related = useMemo(() => {
    if (!product) return []
    const sameSubcategory = allProducts.filter((p) => p.id !== product.id && p.subcategory === product.subcategory)
    if (sameSubcategory.length >= 4) return sameSubcategory.slice(0, 4)
    const sameCategory = allProducts.filter(
      (p) => p.id !== product.id && p.category === product.category && !sameSubcategory.includes(p),
    )
    return [...sameSubcategory, ...sameCategory].slice(0, 4)
  }, [product])

  const compareCandidates = useMemo(() => {
    if (!product) return []
    return allProducts.filter((p) => p.id !== product.id && p.category === product.category)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <Container className="flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-neutral-900">Produto não encontrado</h1>
          <p className="text-sm text-neutral-500">O produto que você está procurando não existe ou foi removido.</p>
          <Link to="/produtos">
            <Button>Ver todos os produtos</Button>
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
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: product.category, to: '/produtos' },
            { label: product.name },
          ]}
        />
      </Container>

      <Container>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2">
          <div>
            <ProductGallery images={product.images ?? [product.imageGradient]} productName={product.name} />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PurchasePanel product={product} />
          </div>
        </div>
      </Container>

      <Container className="mt-16 flex flex-col gap-16 pb-20">
        <section className="flex flex-col gap-10">
          <div>
            <SectionHeading>Resumo</SectionHeading>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">{product.summary}</p>
          </div>

          {product.characteristics && product.characteristics.length > 0 && (
            <div>
              <SectionHeading>Características</SectionHeading>
              <ul className="mt-3 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {product.characteristics.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-neutral-600">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div>
              <SectionHeading>Especificações técnicas</SectionHeading>
              <div className="mt-3 max-w-3xl">
                <SpecsTable specs={product.specs} />
              </div>
            </div>
          )}

          {product.highlights && product.highlights.length > 0 && (
            <div>
              <SectionHeading>Destaques</SectionHeading>
              <div className="mt-3">
                <HighlightsSection highlights={product.highlights} />
              </div>
            </div>
          )}

          {product.downloads && product.downloads.length > 0 && (
            <div>
              <SectionHeading>Downloads</SectionHeading>
              <div className="mt-3 max-w-md">
                <DownloadsList downloads={product.downloads} />
              </div>
            </div>
          )}
        </section>

        {compareCandidates.length > 0 && (
          <section>
            <SectionHeading>Compare com outro modelo</SectionHeading>
            <div className="mt-4">
              <CompareSection product={product} candidates={compareCandidates} />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <SectionHeading>Produtos relacionados</SectionHeading>
            <div className="mt-4">
              <RelatedProducts products={related} />
            </div>
          </section>
        )}
      </Container>

      <Footer />
    </div>
  )
}
