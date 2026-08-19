import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, className, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={cn(hintId, errorId) || undefined}
        aria-invalid={!!error || undefined}
        className={cn(
          'h-11 rounded-md border bg-white px-3.5 text-sm text-neutral-900 placeholder:text-neutral-400',
          'transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
          error
            ? 'border-danger-500 focus-visible:outline-danger-500'
            : 'border-neutral-300 focus-visible:outline-brand-500 hover:border-neutral-400',
          'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-xs font-medium text-danger-700">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-neutral-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
