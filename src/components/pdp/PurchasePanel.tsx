import { useState } from 'react'
import { MessageCircle, Store } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { PriceTag } from '../ui/PriceTag'
import { ColorSwatchGroup } from '../ui/ColorSwatch'
import { Accordion, AccordionItem } from '../ui/Accordion'
import { VariationSelector } from './VariationSelector'
import type { Product } from '../../types/product'

export function PurchasePanel({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name ?? '')
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>(() =>
    Object.fromEntries((product.variations ?? []).map((v) => [v.name, v.options[0]])),
  )

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {(product.badges ?? []).map((b) => (
            <Badge key={b} variant={b} />
          ))}
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {product.brand} · {product.subcategory}
        </p>
        <h1 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">{product.name}</h1>
      </div>

      <PriceTag price={product.price} originalPrice={product.originalPrice} installments={product.installments} />

      {product.colors && product.colors.length > 0 && (
        <ColorSwatchGroup options={product.colors} value={selectedColor} onChange={setSelectedColor} />
      )}

      {product.variations?.map((variation) => (
        <VariationSelector
          key={variation.name}
          name={variation.name}
          options={variation.options}
          value={selectedVariations[variation.name] ?? variation.options[0]}
          onChange={(value) => setSelectedVariations((prev) => ({ ...prev, [variation.name]: value }))}
        />
      ))}

      <div className="flex flex-col gap-2.5">
        <Button size="lg">Adicionar ao carrinho</Button>
        {product.showWhatsapp && (
          <Button size="lg" variant="whatsapp" leftIcon={<MessageCircle className="size-4" aria-hidden="true" />}>
            Falar no WhatsApp
          </Button>
        )}
        <Button size="lg" variant="secondary" leftIcon={<Store className="size-4" aria-hidden="true" />}>
          Encontrar na loja
        </Button>
      </div>

      <Accordion>
        <AccordionItem title="Envio e devoluções" defaultOpen>
          <ul className="flex flex-col gap-1.5">
            <li>Frete calculado no carrinho, com opção de retirada gratuita em Pouso Alegre (MG).</li>
            <li>Troca ou devolução gratuita em até 30 dias após o recebimento.</li>
            <li>Garantia do fabricante inclusa — prazo detalhado no certificado de garantia.</li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
