import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'whatsapp'
  | 'quote'
  | 'danger'
  | 'accent'

export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ' +
  'disabled:pointer-events-none'

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-md min-w-11',
  md: 'h-11 px-5 text-sm rounded-md min-w-11',
  lg: 'h-12 px-6 text-base rounded-lg min-w-11',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 ' +
    'disabled:bg-neutral-300',
  secondary:
    'bg-transparent text-brand-600 border border-brand-500 hover:bg-brand-50 ' +
    'active:bg-brand-100 disabled:border-neutral-300 disabled:text-neutral-400',
  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 ' +
    'disabled:text-neutral-400',
  whatsapp:
    'bg-whatsapp-500 text-white hover:bg-whatsapp-700 active:bg-whatsapp-700',
  quote:
    'bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 ' +
    'active:bg-neutral-700 rounded-sm',
  danger: 'bg-danger-500 text-white hover:bg-danger-700 active:bg-danger-700',
  accent:
    'bg-accent-500 text-brand-900 hover:bg-accent-400 active:bg-accent-600',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
}
