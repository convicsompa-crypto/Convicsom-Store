import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'

export function BrandBanner() {
  return (
    <section className="w-full overflow-hidden bg-brand-800 py-[15px]">
      <Container className="py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-h-[115px] flex-1 flex-col justify-center gap-2 bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-6">
            <p className="text-sm font-semibold text-accent-400">Distribuição exclusiva Convicsom</p>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Caixas de Som Makpro</h2>
            <p className="max-w-md text-sm text-brand-100">
              Reforço sonoro profissional para igrejas, estúdios e eventos — só na Convicsom.
            </p>
          </div>
          <Link
            to="/produtos"
            className="inline-block shrink-0 rounded-full bg-white px-[50px] py-[17px] text-center text-base font-semibold text-neutral-950 hover:bg-neutral-100"
          >
            Conheça a linha Makpro
          </Link>
        </div>
      </Container>
    </section>
  )
}
