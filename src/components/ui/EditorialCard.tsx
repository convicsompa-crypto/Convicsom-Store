import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

export interface EditorialCardProps {
  to: string
  /** Placeholder de imagem — gradiente Tailwind, mesmo padrão de `imageGradient` do catálogo (nenhuma foto real existe ainda). */
  imageGradient: string
  alt: string
  eyebrow?: string
  title: string
  /** Cor do texto sobre a foto, decidida por card conforme o contraste da imagem — nunca global. */
  tone: 'light' | 'dark'
  className?: string
  eager?: boolean
}

// `eager` é mantido na API para o dia em que `imageGradient` virar uma foto
// real (troca isolada, ver SPEChomesections.md) — hoje o placeholder é CSS
// puro, então não há nada de fato para carregar sob demanda.
export function EditorialCard({ to, imageGradient, alt, eyebrow, title, tone, className, eager: _eager = false }: EditorialCardProps) {
  return (
    <Link
      to={to}
      aria-label={alt}
      className={cn('group relative block overflow-hidden rounded-none bg-gradient-to-br', imageGradient, className)}
    >
      {eyebrow && (
        <span
          className={cn(
            'absolute left-6 top-6 text-sm font-semibold',
            tone === 'light' ? 'text-neutral-950' : 'text-white',
          )}
        >
          {eyebrow}
        </span>
      )}
      <span
        className={cn(
          'absolute bottom-6 left-6 right-6 text-2xl font-medium leading-[1.15]',
          tone === 'light' ? 'text-neutral-950' : 'text-white',
        )}
      >
        {title}
      </span>
    </Link>
  )
}
