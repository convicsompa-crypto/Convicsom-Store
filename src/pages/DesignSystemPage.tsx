import {
  AlertTriangle,
  Search,
  SearchX,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Badge, type BadgeVariant } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Skeleton } from '../components/ui/Skeleton'
import { Accordion, AccordionItem } from '../components/ui/Accordion'
import { ProductCard } from '../components/ui/ProductCard'
import { StateBlock } from '../components/ui/EmptyState'
import { PriceTag } from '../components/ui/PriceTag'
import { Link } from 'react-router-dom'
import logoConvicsom from '../assets/logo-convicsom.png'

const brandSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

function ColorRamp({ prefix, label }: { prefix: 'brand' | 'accent' | 'neutral'; label: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <div className="flex overflow-hidden rounded-lg border border-neutral-200">
        {brandSteps.map((step) => (
          <div key={step} className="flex-1">
            <div className="h-14" style={{ backgroundColor: `var(--color-${prefix}-${step})` }} />
            <p className="py-1 text-center text-[10px] text-neutral-500">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SwatchCard({ name, hex, textClass }: { name: string; hex: string; textClass: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-3">
      <div className="mb-2 h-16 rounded-md" style={{ backgroundColor: hex }} />
      <p className={`text-sm font-semibold ${textClass}`}>{name}</p>
      <p className="text-xs text-neutral-500">{hex}</p>
    </div>
  )
}

const typeScale = [
  { token: 'display-xl', className: 'font-display text-6xl font-bold', size: '64 / 1.05', use: 'Hero da home' },
  { token: 'display-lg', className: 'font-display text-5xl font-bold', size: '48 / 1.1', use: 'Banners de campanha' },
  { token: 'heading-xl (h1)', className: 'font-display text-4xl font-bold', size: '40 / 1.15', use: 'Título de página' },
  { token: 'heading-lg (h2)', className: 'font-display text-3xl font-bold', size: '32 / 1.2', use: 'Título de seção' },
  { token: 'heading-md (h3)', className: 'font-display text-2xl font-semibold', size: '24 / 1.25', use: 'Título de card / bloco' },
  { token: 'heading-sm (h4)', className: 'font-display text-xl font-semibold', size: '20 / 1.3', use: 'Subtítulo' },
  { token: 'body-lg', className: 'font-sans text-lg', size: '18 / 1.6', use: 'Texto de destaque' },
  { token: 'body-md (base)', className: 'font-sans text-base', size: '16 / 1.6', use: 'Texto padrão' },
  { token: 'body-sm', className: 'font-sans text-sm', size: '14 / 1.5', use: 'Texto secundário, legendas' },
  { token: 'caption', className: 'font-sans text-xs', size: '12 / 1.4', use: 'Metadados, rodapés de card' },
]

const spacingScale = [8, 16, 24, 32, 48, 64, 96]

const productBadges: BadgeVariant[] = ['new']

export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Cabeçalho da página de estilo (não é o header do site) */}
      <div className="border-b border-neutral-200 bg-white">
        <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={logoConvicsom} alt="Convicsom" className="h-14 w-auto" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Convicsom</p>
              <h1 className="font-display text-3xl font-bold text-neutral-900">Design System</h1>
              <Link to="/" className="mt-1 inline-block text-sm font-semibold text-brand-700 hover:underline">
                ← Ver a Home
              </Link>
            </div>
          </div>
          <p className="max-w-sm text-sm text-neutral-500">
            Protótipo visual — React + TypeScript + Tailwind CSS. Paleta oficial extraída por amostragem de pixel da logo:
            navy <code className="font-mono text-xs">#182060</code>, amarelo <code className="font-mono text-xs">#FFF212</code>,
            vermelho <code className="font-mono text-xs">#F03038</code> (uso pontual).
          </p>
        </Container>
      </div>

      <Container className="mt-12 flex flex-col gap-16">
        {/* CORES */}
        <section id="cores">
          <h2 className="font-display text-2xl font-bold text-neutral-900">1. Cores</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Marca (brand) e destaque (accent) foram extraídos por amostragem de pixel direto do arquivo oficial da logo:
            navy <code className="font-mono text-xs">#182060</code> e amarelo <code className="font-mono text-xs">#FFF212</code>.
            O vermelho da logo (<code className="font-mono text-xs">#F03038</code>, traços diagonais) reaproveita o token
            semântico de erro/urgência — aparece só em contextos pontuais (badge de "Últimas unidades", estado de erro),
            nunca como cor de botão principal.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            <ColorRamp prefix="brand" label="Marca — Convicsom Navy" />
            <ColorRamp prefix="accent" label="Destaque — Convicsom Yellow" />
            <ColorRamp prefix="neutral" label="Neutros" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <SwatchCard name="Sucesso" hex="#2E9E5B" textClass="text-success-700" />
            <SwatchCard name="Aviso" hex="#D98C15" textClass="text-warning-700" />
            <SwatchCard name="Erro / vermelho da logo" hex="#F03038" textClass="text-danger-700" />
            <SwatchCard name="Info" hex="#2C6FB3" textClass="text-info-700" />
            <SwatchCard name="WhatsApp" hex="#25D366" textClass="text-whatsapp-700" />
          </div>
        </section>

        {/* TIPOGRAFIA */}
        <section id="tipografia">
          <h2 className="font-display text-2xl font-bold text-neutral-900">2. Tipografia</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            <span className="font-display font-semibold">Sora</span> para títulos (geométrica, técnica — combina com áudio
            profissional), <span className="font-sans font-semibold">Inter</span> para texto corrido (legibilidade em
            ecommerce) e <span className="font-mono">JetBrains Mono</span> para tabelas de especificação técnica.
          </p>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
            <p className="font-mono text-sm text-neutral-500">
              Especificações: Potência 250W RMS · Impedância 8Ω · Conectividade XLR/TRS/Bluetooth
            </p>
          </div>

          <div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {typeScale.map((t) => (
              <div key={t.token} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <div className="flex shrink-0 gap-3 sm:w-56">
                  <span className="text-xs font-semibold text-neutral-400">{t.token}</span>
                  <span className="text-xs text-neutral-300">{t.size}</span>
                </div>
                <p className={`${t.className} text-neutral-900`}>Amplificador Valvulado 30W</p>
              </div>
            ))}
          </div>
        </section>

        {/* GRID & ESPAÇAMENTO */}
        <section id="grid">
          <h2 className="font-display text-2xl font-bold text-neutral-900">3. Grid &amp; Espaçamento</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Container máximo de 1280px, 12 colunas no desktop, gutter de 24px. Escala de espaçamento em múltiplos de 8px
            (usar apenas os tokens pares do Tailwind: 2, 4, 6, 8, 10, 12, 16...).
          </p>

          <div className="mt-6 grid grid-cols-4 gap-6 sm:grid-cols-8 lg:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-12 rounded-md bg-brand-100 ${i >= 8 ? 'hidden lg:block' : i >= 4 ? 'hidden sm:block' : ''}`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-400">4 colunas no mobile · 8 no tablet · 12 no desktop</p>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            {spacingScale.map((s) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div className="rounded bg-accent-300" style={{ width: s, height: s }} />
                <span className="text-xs text-neutral-400">{s}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* BOTÕES */}
        <section id="botoes">
          <h2 className="font-display text-2xl font-bold text-neutral-900">4. Botões</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Área de toque mínima de 44px de altura. O CTA de <strong>orçamento de instalação</strong> (variante{' '}
            <code className="font-mono text-xs">quote</code>) é deliberadamente distinto dos CTAs de compra — cantos retos,
            tom neutro escuro — para nunca ser confundido com "adicionar ao carrinho".
          </p>

          <div className="mt-6 flex flex-col gap-6 rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Comprar agora</Button>
              <Button variant="secondary">Ver detalhes</Button>
              <Button variant="ghost">Cancelar</Button>
              <Button variant="whatsapp" leftIcon={<span aria-hidden>💬</span>}>Falar no WhatsApp</Button>
              <Button variant="quote">Solicitar orçamento</Button>
              <Button variant="danger">Remover</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Pequeno</Button>
              <Button size="md">Médio</Button>
              <Button size="lg">Grande</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Desabilitado</Button>
              <Button isLoading>Carregando</Button>
              <Button fullWidth className="max-w-xs">Largura total</Button>
            </div>
          </div>
        </section>

        {/* BADGES */}
        <section id="badges">
          <h2 className="font-display text-2xl font-bold text-neutral-900">5. Badges</h2>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-white p-6">
            <Badge variant="new" />
            <Badge variant="sale" />
            <Badge variant="lastUnits" />
            <Badge variant="installment" />
            <Badge variant="b2b" />
            <Badge variant="neutral">Frete grátis</Badge>
          </div>
        </section>

        {/* CARDS */}
        <section id="cards">
          <h2 className="font-display text-2xl font-bold text-neutral-900">6. Cards de produto</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Parcelamento sempre visível no card. Produtos de áudio profissional ganham CTA extra de WhatsApp. O card de
            "Projetos para Igrejas e Empresas" usa linguagem visual própria, sem preço nem botão de compra.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              name="Guitarra Stratocaster HSS"
              category="Cordas"
              price={4299}
              originalPrice={4799}
              installments={{ count: 12, value: 358.25 }}
              badges={productBadges}
              colors={[
                { name: 'Sunburst', hex: '#8a4b1f' },
                { name: 'Preto', hex: '#1a1a1a' },
                { name: 'Branco', hex: '#f5f5f0' },
              ]}
              imageGradient="from-amber-100 to-amber-200"
            />
            <ProductCard
              name="Mesa de Som Digital 16 Canais"
              category="Áudio Profissional"
              price={6890}
              installments={{ count: 12, value: 574.16 }}
              badges={['sale']}
              showWhatsapp
              imageGradient="from-slate-200 to-slate-300"
            />
            <ProductCard
              name="Caixa Ativa 15&quot; 400W"
              category="Áudio Profissional"
              price={2350}
              installments={{ count: 10, value: 235 }}
              badges={['lastUnits']}
              showWhatsapp
              imageGradient="from-neutral-300 to-neutral-400"
            />

            {/* Card institucional B2B — deliberadamente distinto */}
            <article className="flex flex-col justify-between rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 p-5">
              <div>
                <Badge variant="b2b" />
                <h3 className="mt-3 font-display text-base font-semibold text-brand-800">
                  Projetos para Igrejas e Empresas
                </h3>
                <p className="mt-1 text-sm text-brand-700">
                  Projeto acústico e instalação de sistema de som completo, com suporte técnico especializado.
                </p>
              </div>
              <Button variant="quote" className="mt-4 w-full">
                Solicitar orçamento
              </Button>
            </article>
          </div>
        </section>

        {/* ACCORDION */}
        <section id="accordion">
          <h2 className="font-display text-2xl font-bold text-neutral-900">7. Accordion</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Mesmo componente para os filtros da listagem (PLP) e para os blocos de Envio/Devoluções e Especificações da
            página de produto (PDP). Baseado em <code className="font-mono text-xs">&lt;details&gt;</code> — acessível e
            navegável por teclado sem JS extra.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-2">
              <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Filtros (PLP)
              </p>
              <Accordion>
                <AccordionItem title="Marca" defaultOpen>
                  <div className="flex flex-col gap-2 text-sm">
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Fender</label>
                    <label className="flex items-center gap-2"><input type="checkbox" /> Yamaha</label>
                    <label className="flex items-center gap-2"><input type="checkbox" /> JBL</label>
                  </div>
                </AccordionItem>
                <AccordionItem title="Faixa de preço">
                  <p>Filtro de intervalo de preço.</p>
                </AccordionItem>
                <AccordionItem title="Uso">
                  <p>Igreja · Estúdio · Palco · Casa</p>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-2">
              <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Detalhes do produto (PDP)
              </p>
              <Accordion>
                <AccordionItem title="Envio e devoluções" defaultOpen>
                  <p>Frete calculado no carrinho. Troca gratuita em até 30 dias.</p>
                </AccordionItem>
                <AccordionItem title="Especificações técnicas">
                  <p className="font-mono text-xs text-neutral-500">Potência: 250W RMS · Impedância: 8Ω</p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* FORM & ESTADOS */}
        <section id="estados">
          <h2 className="font-display text-2xl font-bold text-neutral-900">8. Formulário &amp; estados</h2>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6">
              <Input label="Busca" placeholder="Buscar produtos..." />
              <Input label="E-mail" defaultValue="cliente@email.com" error="Informe um e-mail válido" />
              <Input label="Nome da igreja/empresa" placeholder="Opcional" disabled />
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">Loading (skeleton)</p>
                <div className="flex gap-4">
                  <Skeleton className="h-24 w-24" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>

              <StateBlock
                icon={<SearchX className="size-5" aria-hidden="true" />}
                title="Nenhum resultado encontrado"
                description="Tente ajustar os filtros ou buscar por outro termo."
                action={<Button size="sm" variant="secondary">Limpar filtros</Button>}
              />

              <StateBlock
                icon={<AlertTriangle className="size-5 text-danger-500" aria-hidden="true" />}
                title="Não foi possível carregar"
                description="Ocorreu um erro ao buscar os produtos. Tente novamente."
                action={<Button size="sm">Tentar novamente</Button>}
              />
            </div>
          </div>
        </section>

        {/* PREVIEW HEADER MINI */}
        <section id="header-preview">
          <h2 className="font-display text-2xl font-bold text-neutral-900">9. Prévia de header (aplicação real)</h2>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Amostra dos tokens aplicados em um componente real de duas camadas — validação antes de construirmos a Home.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between bg-brand-900 px-4 py-2 text-xs text-neutral-200">
              <div className="flex gap-4">
                <span>Nossa Loja</span>
                <span>Serviço de Instalação</span>
                <span>Fale Conosco</span>
              </div>
              <span className="font-semibold text-accent-500">12x sem juros em todo o site</span>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 py-3">
              <img src={logoConvicsom} alt="Convicsom" className="h-9 w-auto" />
              <div className="flex flex-1 items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-neutral-400">
                <Search className="size-4" aria-hidden="true" />
                <span className="text-sm">Buscar instrumentos, áudio profissional...</span>
              </div>
              <Store className="size-5 text-neutral-600" aria-hidden="true" />
              <User className="size-5 text-neutral-600" aria-hidden="true" />
              <ShoppingBag className="size-5 text-neutral-600" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-6">
            <PriceTag price={4299} originalPrice={4799} installments={{ count: 12, value: 358.25 }} />
            <div className="flex gap-2">
              <Button variant="secondary">Encontrar na loja</Button>
              <Button variant="primary">Adicionar ao carrinho</Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
