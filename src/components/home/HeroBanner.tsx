import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-neutral-900">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 80% 20%, var(--color-accent-500), transparent 45%)',
        }}
        aria-hidden="true"
      />
      <Container className="relative flex min-h-[420px] flex-col justify-center py-16 sm:min-h-[520px]">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">
          Áudio profissional &amp; instrumentos
        </p>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          O som certo para o seu palco, estúdio ou igreja
        </h1>
        <p className="mt-4 max-w-lg text-base text-neutral-300 sm:text-lg">
          Instrumentos, equipamentos de áudio profissional e projetos de instalação de som — com
          suporte técnico especializado em Pouso Alegre (MG).
        </p>
        <div className="mt-8">
          <Button size="lg" variant="accent">
            Ver coleção
          </Button>
        </div>
      </Container>
    </section>
  )
}
