import { cn } from '../../lib/cn'

interface ColorOption {
  name: string
  hex: string
}

interface ColorSwatchGroupProps {
  options: ColorOption[]
  value: string
  onChange: (name: string) => void
}

export function ColorSwatchGroup({ options, value, onChange }: ColorSwatchGroupProps) {
  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Cor">
      {options.map((opt) => {
        const selected = opt.name === value
        return (
          <button
            key={opt.name}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.name}
            title={opt.name}
            onClick={() => onChange(opt.name)}
            className={cn(
              'size-8 rounded-full border-2 transition-shadow',
              selected
                ? 'border-brand-500 shadow-[0_0_0_2px_white_inset]'
                : 'border-transparent hover:border-neutral-300',
            )}
          >
            <span
              className="block size-full rounded-full border border-black/10"
              style={{ backgroundColor: opt.hex }}
            />
          </button>
        )
      })}
    </div>
  )
}
