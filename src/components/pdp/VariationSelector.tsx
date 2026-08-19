import { cn } from '../../lib/cn'

interface VariationSelectorProps {
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function VariationSelector({ name, options, value, onChange }: VariationSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-neutral-800">
        {name}: <span className="font-semibold text-neutral-900">{value}</span>
      </p>
      <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt === value
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt)}
              className={cn(
                'h-10 min-w-11 rounded-md border px-3.5 text-sm font-medium transition-colors',
                selected
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
