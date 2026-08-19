import { Building2, CheckCircle2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

const bullets = [
  'Projeto acústico sob medida para o seu espaço',
  'Instalação completa por equipe técnica especializada',
  'Suporte e manutenção após a entrega',
]

export function InstitutionalSection() {
  return (
    <section id="projetos" className="bg-neutral-100 py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 rounded-2xl border border-neutral-200 bg-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Building2 className="size-3.5" aria-hidden="true" />
              Para igrejas e empresas
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Projetos de instalação de som para igrejas e empresas
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-neutral-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <Button variant="quote" size="lg">
              Solicitar orçamento
            </Button>
            <p className="text-xs text-neutral-500">Resposta em até 1 dia útil</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
