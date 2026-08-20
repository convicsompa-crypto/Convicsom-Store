import logoConvicsom from '../../assets/logo-convicsom.png'
import { cn } from '../../lib/cn'

interface LogoProps {
  className?: string
  /**
   * O arquivo original tem bastante espaço decorativo (anel + traços
   * vermelhos) acima/abaixo da barra navy com o texto — só ~24% da altura
   * da imagem é a barra legível. `crop` usa object-fit para mostrar só essa
   * barra, essencial em contextos compactos como o header (sem isso, a
   * logo fica ilegível em qualquer altura razoável).
   */
  crop?: boolean
}

/** Proporção largura:altura da barra navy legível dentro do arquivo original. */
const LOGO_BAR_ASPECT_RATIO = '3069 / 415'

export function Logo({ className, crop = false }: LogoProps) {
  if (crop) {
    return (
      <span className={cn('block overflow-hidden', className)} style={{ aspectRatio: LOGO_BAR_ASPECT_RATIO }}>
        <img src={logoConvicsom} alt="Convicsom" className="h-full w-full object-cover object-center" />
      </span>
    )
  }

  return <img src={logoConvicsom} alt="Convicsom" className={cn('h-10 w-auto', className)} />
}
