import { useId } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export function SearchBar({ className, placeholder = 'Buscar instrumentos, áudio profissional...' }: SearchBarProps) {
  const inputId = useId()

  return (
    <form
      role="search"
      className={cn(
        'flex w-full items-center gap-2 rounded-full border border-transparent bg-neutral-100 px-4',
        'transition-colors focus-within:border-neutral-800 focus-within:bg-white',
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-neutral-500" aria-hidden="true" />
      <label htmlFor={inputId} className="sr-only">
        Buscar produtos
      </label>
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        className="h-11 w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />
    </form>
  )
}
