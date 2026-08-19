import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function CampaignBanner() {
  return (
    <section className="bg-neutral-900 py-14 sm:py-16">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">Semana do Áudio Profissional</p>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-bold text-white sm:text-3xl">
            Até 15% off em mesas de som e caixas ativas selecionadas
          </h2>
        </div>
        <Button size="lg" variant="accent">
          Ver ofertas
        </Button>
      </Container>
    </section>
  )
}
