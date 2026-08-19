import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeVariant =
  | 'new'
  | 'sale'
  | 'lastUnits'
  | 'installment'
  | 'b2b'
  | 'neutral'

const variants: Record<BadgeVariant, string> = {
  new: 'bg-info-50 text-info-700',
  sale: 'bg-accent-100 text-accent-800',
  lastUnits: 'bg-danger-50 text-danger-700',
  installment: 'bg-brand-900 text-accent-300',
  b2b: 'bg-brand-100 text-brand-700',
  neutral: 'bg-neutral-100 text-neutral-700',
}

const labels: Record<BadgeVariant, string> = {
  new: 'Novo',
  sale: 'Oferta',
  lastUnits: 'Últimas unidades',
  installment: '12x sem juros',
  b2b: 'Institucional',
  neutral: 'Tag',
}

interface BadgeProps {
  variant?: BadgeVariant
  children?: ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none whitespace-nowrap',
        variants[variant],
        className,
      )}
    >
      {children ?? labels[variant]}
    </span>
  )
}
