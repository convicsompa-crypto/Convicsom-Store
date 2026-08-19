import { useRef, useState } from 'react'
import { cn } from '../../lib/cn'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el || el.clientWidth === 0) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIndex(index)
  }

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={cn(
          'flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none]',
          'lg:flex-col lg:snap-none lg:overflow-visible',
        )}
      >
        {images.map((gradient, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square w-full shrink-0 snap-center rounded-xl bg-gradient-to-br',
              gradient,
            )}
            role="img"
            aria-label={`${productName} — foto ${i + 1} de ${images.length}`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === activeIndex}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === activeIndex ? 'w-6 bg-brand-600' : 'w-1.5 bg-neutral-300',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
