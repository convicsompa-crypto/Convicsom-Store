import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export function SearchBar({ className, placeholder = 'Buscar instrumentos, áudio profissional...' }: SearchBarProps) {
  return (
    <form
      role="search"
      className={cn(
        'flex w-full items-center gap-2 rounded-md border border-neutral-300 bg-white px-3.5',
        'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-500',
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-neutral-400" aria-hidden="true" />
      <label htmlFor="site-search" className="sr-only">
        Buscar produtos
      </label>
      <input
        id="site-search"
        type="search"
        placeholder={placeholder}
        className="h-11 w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
      />
    </form>
  )
}
