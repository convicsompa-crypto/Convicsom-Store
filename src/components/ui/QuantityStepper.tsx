import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/cn'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  label?: string
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md', label = 'Quantidade' }: QuantityStepperProps) {
  const btnSize = size === 'sm' ? 'size-8' : 'size-9'

  return (
    <div className="inline-flex items-center rounded-md border border-neutral-300">
      <button
        type="button"
        aria-label={`Diminuir ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(btnSize, 'flex items-center justify-center rounded-l-md text-neutral-600 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40')}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-neutral-900" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Aumentar ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(btnSize, 'flex items-center justify-center rounded-r-md text-neutral-600 hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40')}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}
