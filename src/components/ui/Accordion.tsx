import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  return (
    <details
      open={defaultOpen}
      className={cn('group border-b border-neutral-200', className)}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-4 py-4 px-1',
          'text-sm font-semibold text-neutral-900 marker:content-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
        )}
      >
        {title}
        <ChevronDown
          className="size-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-1 pb-4 text-sm text-neutral-600">{children}</div>
    </details>
  )
}

export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('border-t border-neutral-200', className)}>{children}</div>
}
