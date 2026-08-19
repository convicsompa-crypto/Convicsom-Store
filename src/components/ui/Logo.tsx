import logoConvicsom from '../../assets/logo-convicsom.png'
import { cn } from '../../lib/cn'

export function Logo({ className }: { className?: string }) {
  return <img src={logoConvicsom} alt="Convicsom" className={cn('h-10 w-auto', className)} />
}
