# Convicsom — Design System (v1, aprovado)

Protótipo em **React + TypeScript (Vite) + Tailwind CSS v4**. Tokens declarados em
`src/index.css` via `@theme` (CSS-first, sem `tailwind.config.js`). Página de
exemplo em `src/pages/DesignSystemPage.tsx`, renderizada por `App.tsx`.

Rodar: `npm run dev`.

## 1. Paleta de cores — oficial, extraída da logo

A logo real da Convicsom (retângulo navy, texto/anel dourado, traços
vermelhos diagonais) define a paleta — substituiu as 3 opções genéricas
cogitadas inicialmente.

| Token | Cor | Hex (amostrado por pixel do PNG oficial) | Uso |
|---|---|---|---|
| `brand-800` | Convicsom Navy | `#182060` | Header, footer, seções escuras, texto/botão primário. |
| `accent-400` | Convicsom Yellow | `#FFF212` | Amarelo puro da logo. Preenchimento/fundo/ícone — nunca como texto sobre branco (reprova contraste AA). |
| `accent-800` | Convicsom Yellow (texto) | `#7A6D00` | Tom escurecido do mesmo amarelo, ~5.2:1 de contraste — usado onde o amarelo precisa ser texto legível sobre fundo claro (ex.: "12x sem juros" no card de produto). |
| `danger-500` | Vermelho da logo | `#F03038` | Mesmo tom dos traços diagonais da logo — reaproveita o token semântico de erro/urgência. **Uso pontual**: badge "Últimas unidades", estados de erro. Nunca em botão de CTA principal (decisão explícita sua, para não pesar para o lado "vermelho tipo Fender"). |

`brand-*` e `accent-*` têm escalas completas de 50 a 900 (ver `src/index.css`)
derivadas desses pontos de referência, amostrados diretamente dos pixels de
`src/assets/logo-convicsom.png` (não estimados visualmente). Neutros (cinza
morno) e as demais cores semânticas (sucesso, aviso, info, WhatsApp
`#25D366`) são independentes da marca.

A logo real já está integrada em `Logo.tsx`, usada no `Header` e no `Footer`
(nesse último, invertida em branco sobre o navy).

## 2. Tipografia

- **Sora** (600/700/800) — títulos e display. Geométrica, levemente técnica.
- **Inter** (400/500/600/700) — texto corrido, UI, formulários.
- **JetBrains Mono** (400/500) — tabelas de especificação técnica (potência,
  impedância, conectividade) — reforça a autoridade técnica em áudio
  profissional.

Escala (nome do token / tamanho–altura de linha / uso):

| Token | Tamanho/linha | Uso |
|---|---|---|
| `display-xl` | 64/1.05 | Hero da Home |
| `display-lg` | 48/1.1 | Banners de campanha |
| `heading-xl` (h1) | 40/1.15 | Título de página |
| `heading-lg` (h2) | 32/1.2 | Título de seção |
| `heading-md` (h3) | 24/1.25 | Título de card/bloco |
| `heading-sm` (h4) | 20/1.3 | Subtítulo |
| `body-lg` | 18/1.6 | Texto de destaque |
| `body-md` | 16/1.6 | Texto padrão (base) |
| `body-sm` | 14/1.5 | Texto secundário |
| `caption` | 12/1.4 | Metadados |

## 3. Grid, espaçamento e breakpoints

- Container máximo: **1280px**, `mx-auto`, gutter **24px** (`px-6`; `px-4` no
  mobile para não espremer o conteúdo em telas pequenas).
- Grid: **12 colunas** no desktop, **8** no tablet, **4** no mobile
  (`grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-6`).
- Espaçamento: múltiplos de 8px usando apenas os tokens pares da escala
  padrão do Tailwind (2=8px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px...).
- Breakpoints customizados (`--breakpoint-sm`/`--breakpoint-lg` em `@theme`):
  - **Mobile**: `<480px` (estilo padrão, mobile-first, sem prefixo)
  - **Tablet**: `480–1024px` (prefixo `sm:`)
  - **Desktop**: `>1024px` (prefixo `lg:`)

### Como cada padrão se adapta

- **Header**: duas camadas no desktop; no mobile vira menu hambúrguer, mas a
  busca continua acessível na barra principal (não escondida atrás do menu).
- **PLP**: toolbar de filtros vira modal/bottom sheet no mobile em vez de
  painel lateral fixo; grid de produtos 4→2 colunas.
- **PDP**: galeria em coluna rolável + painel de compra sticky no desktop vira
  carrossel com swipe + painel abaixo da galeria (não-sticky) no mobile.

## 4. Botões

Alturas: `sm` 36px, `md` 44px, `lg` 48px — todas ≥44px de área de toque
recomendada a partir de `md`. Variantes:

- `primary` — sólido, cor de marca. Ação principal de compra.
- `secondary` — outline. Ação secundária ("Ver detalhes", "Encontrar na loja").
- `ghost` — texto puro. Ações terciárias/cancelar.
- `whatsapp` — verde WhatsApp. Só aparece em produtos de maior complexidade
  técnica (áudio profissional).
- `quote` — **visualmente distinta de propósito**: preta, cantos retos (não
  arredondados como os outros botões). Usada exclusivamente para "Solicitar
  orçamento de instalação" — nunca deve parecer um botão de carrinho.
- `danger` — remoção/exclusão.

Estados: `hover`, `active`, `disabled` (opacidade reduzida + `cursor-not-allowed`),
`isLoading` (spinner substitui o ícone esquerdo, `aria-busy`).

## 5. Badges

`new` (Novo), `sale` (Oferta), `lastUnits` (Últimas unidades), `installment`
(12x sem juros — fundo escuro/texto dourado, para se destacar no card),
`b2b` (Institucional), `neutral` (tag genérica).

## 6. Cards

- **ProductCard**: imagem quadrada, badges no canto superior esquerdo,
  favoritar no canto superior direito, swatches de cor (quando aplicável),
  preço + parcelamento sempre visíveis, CTA "Comprar" e, condicionalmente,
  CTA "Falar no WhatsApp".
- **Card institucional (B2B)**: borda tracejada, fundo tonalizado com a cor de
  marca, sem preço, CTA `quote` — para nunca competir visualmente com os
  cards de produto do varejo.

## 7. Card editorial

`EditorialCard` (`src/components/ui/EditorialCard.tsx`) — foto full-bleed +
rótulo + título, card inteiro clicável (`Link`, sem botão interno). Distinto
do `ProductCard`: não tem preço nem CTA, é usado nas seções editoriais da
Home (banner de marca, lançamentos, categorias em bento). Sem
overlay/gradiente escuro sobre a imagem — a cor do texto (`tone`: `'light'`
ou `'dark'`) é decidida por card, conforme o contraste da própria foto, nunca
globalmente. Cantos sempre retos (`rounded-none`, nunca arredondado).
Reaproveitado em 3 proporções (1:1, 510:292, 247:282) nas seções 2 e 3 da
Home — ver `SPEChomesections.md`. Hoje usa `imageGradient` (mesmo placeholder
de gradiente do catálogo) em vez de foto real, já que nenhum asset de imagem
existe ainda no projeto além da logo.

## 8. Accordion

Um único componente (`Accordion` / `AccordionItem`) reaproveitado em dois
contextos: filtros da PLP e blocos de Envio/Devoluções + Especificações da
PDP. Implementado com `<details>/<summary>` nativo — acessível e navegável
por teclado sem JavaScript extra; ícone chevron gira via `group-open:`.

## 9. Estados visuais

`hover`/`active`/`disabled` em botões e inputs; `focus-visible` com anel de 2px
na cor de marca em todo elemento interativo; `Skeleton` (pulse) para loading;
`StateBlock` reaproveitado para vazio ("Nenhum resultado encontrado") e erro
("Não foi possível carregar"), cada um com ação de recuperação.

## 10. Navegação B2C / B2B

- Menu principal: item de destaque separado ("Projetos para Igrejas e
  Empresas"), visualmente diferenciado das categorias de produto — leva a
  página institucional própria (não implementada nesta etapa).
- CTA de orçamento (`quote`) nunca reutiliza o estilo de "Comprar"/"Adicionar
  ao carrinho".
- Card institucional na Home fica separado do grid de produtos (ver seção 6).

## 11. Inventário de componentes (atomic design)

**Construídos** (`src/components/ui/`, `src/components/layout/`, `src/components/home/`):

- Átomos: `Button` (+ variante `accent` para CTA sobre fundo escuro), `Badge`,
  `Input`, `Skeleton`, `Logo`
- Moléculas: `PriceTag`, `ColorSwatchGroup`, `Accordion`/`AccordionItem`,
  `StateBlock` (vazio/erro), `Container`, `SearchBar`, `EditorialCard`
- Organismos: `ProductCard`, `Header` (TopBar com aviso rotativo + MainHeader +
  Nav + menu hambúrguer mobile), `Footer` (selos de confiança + colunas +
  link "Sou empresa/igreja"), `HeroBanner`, `FeaturedProducts` (grid de 4),
  `CategoryBannerGrid` (grid de 3), `CampaignBanner` (full-width),
  `InstitutionalSection` (bloco B2B "Projetos para Igrejas e Empresas"),
  `BrandBanner` (Makpro, full-bleed), `LaunchGrid` (2 `EditorialCard`
  quadrados), `CategoryBento` (4 `EditorialCard` em grade assimétrica)
- Páginas: `HomePage` (rota `/`), `DesignSystemPage` (rota `/design-system`)
- Dados mockados: `src/data/products.ts`

**Planejados para as próximas etapas** (PLP, PDP, institucional B2B completa):

- Átomos: `IconButton`, `Select`, `Checkbox`, `Radio`, `Tooltip`, `Divider`
- Moléculas: `Breadcrumb`, `Pagination`, `QuantityStepper`, `FormField`
- Organismos: `FilterPanel` (accordion + modal/bottom sheet mobile),
  `ProductGallery` (coluna rolável / carrossel mobile), `PurchasePanel`
  (sticky), `SpecTable`, `CompareTable`, `TestimonialCard`, `PLPToolbar`
- Templates: `PLPLayout`, `PDPLayout`, `InstitutionalLayout`

## 12. Acessibilidade (WCAG AA)

- Contraste verificado nas combinações texto/fundo usadas (500–700 da marca
  para texto sobre branco; 50–100 para fundos com texto escuro).
- `:focus-visible` global com anel de 2px, aplicado a todo elemento
  interativo do design system.
- Área de toque mínima de 44px garantida nos tamanhos `md`/`lg` de `Button` e
  na altura de `Input`.
- Textos alternativos (`aria-label`) em botões apenas com ícone (favoritar,
  etc.); ícones decorativos com `aria-hidden`.

---

**Design system aprovado** (paleta navy + dourado da logo real, vermelho
como acento pontual). Falta só o arquivo da logo para integrar de verdade.
Próximo passo: Home completa.
