import type { ReactNode } from 'react'

interface StateBlockProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function StateBlock({ icon, title, description, action }: StateBlockProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-300 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="font-display text-base font-semibold text-neutral-900">{title}</p>
        <p className="max-w-sm text-sm text-neutral-500">{description}</p>
      </div>
      {action}
    </div>
  )
}
