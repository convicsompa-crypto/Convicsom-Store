# Spec — Seções editoriais da Home

> Proporções e espaçamentos medidos no CSS computado de `intl.fender.com`
> (mesma metodologia já usada para o header). Referência visual renderizada:
> `mockup-home.html` — **usar só para conferir proporção e distribuição**.
> As cores e breakpoints do mockup são do site de origem e **não** valem aqui;
> os valores válidos são os deste documento.

Três seções novas na Home, abaixo do que já existe. Padrão de card editorial
(foto full-bleed + rótulo + título, card inteiro clicável) — distinto do
`ProductCard`, que continua sendo o card de produto com preço/CTA de compra.

---

## Decisões já tomadas (não reabrir)

**1. O card editorial é um componente de design system, não de página.**
Ele aparece 6 vezes entre as seções 2 e 3, em 3 proporções diferentes. Vai em
`src/components/ui/EditorialCard.tsx`, e portanto **precisa ser adicionado à
página `/design-system`** conforme a convenção do repositório.

**2. Fundo da seção 1 é `brand-800` (#182060), não o quase-preto do original.**
O `CLAUDE.md` registra a decisão explícita de o site não ler como
"Fender-red-coded"; usar o preto #121212 da referência traria o mesmo problema
por outro caminho. Navy da marca resolve e mantém o contraste que o layout pede.

**3. Sem overlay/gradiente escuro sobre as fotos.** No original a legibilidade
vem da própria imagem, e a cor do texto é decidida **por card** (`"light"` ou
`"dark"`), não globalmente. Manter isso — é o que dá o ar editorial em vez de
"banner de e-commerce".

**4. Sem border-radius nos cards.** Cantos retos, `rounded-none`.

---

## Componente: `ui/EditorialCard.tsx`

```ts
type EditorialCardProps = {
  to: string;                    // rota React Router (Link, não <a>)
  image: string;                 // import do asset
  alt: string;
  eyebrow?: string;              // "Lançamento", "Novo" — opcional
  title: string;
  tone: 'light' | 'dark';        // cor do texto, conforme contraste da foto
  className?: string;            // para o consumidor controlar aspect-ratio/span
  eager?: boolean;               // desliga o lazy-load (só o card acima da dobra)
};
```

Estrutura interna e utilitários Tailwind v4:

```
Link          relative block overflow-hidden rounded-none
  img         absolute inset-0 h-full w-full object-cover
              loading={eager ? 'eager' : 'lazy'}
  span        absolute top-6 left-6 text-sm font-semibold      ← eyebrow
  span        absolute bottom-6 left-6 right-6
              text-2xl font-medium leading-[1.15]              ← title
```

Mapeamento das medidas do original para o token equivalente:

| Medido | Tailwind | Observação |
|---|---|---|
| padding 24px do texto | `top-6 left-6` / `bottom-6 left-6 right-6` | |
| eyebrow 14px / 600 | `text-sm font-semibold` | sem uppercase, sem tracking |
| título 24px / 500 | `text-2xl font-medium` | |
| line-height 1.15 | `leading-[1.15]` | `leading-tight` (1.25) fica frouxo demais |
| gap 16px entre cards | `gap-4` | vale em H e V, nas duas seções |
| radius 0 | `rounded-none` | |

`tone`: `'light'` → `text-neutral-950` (foto clara) · `'dark'` → `text-white`.
Usar o token neutro do `@theme`, não `#000` literal.

O card **não** tem botão interno. O `Link` envolve tudo.

---

## Seção 1 — `components/home/BrandBanner.tsx`

**Conteúdo:** caixas de som **Makpro** — distribuição exclusiva Convicsom.

```
section    w-full bg-brand-800 py-[15px] overflow-hidden
  div      px-<gutter do container> py-20
    div    flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between
      div  arte/foto (esquerda), min-h-[115px], flex-1
      Link CTA pílula (direita)
```

CTA — valores exatos medidos no original:

```
inline-block shrink-0 rounded-full bg-white px-[50px] py-[17px]
text-base font-semibold text-neutral-950
```

Notas:
- Seção é full-bleed; o conteúdo interno respeita o gutter do container
  (mesmo do header — reaproveitar, não redefinir).
- No original a arte da esquerda é uma imagem única com o texto promocional
  **embutido no arquivo**. Aqui fazer o oposto: título/subtítulo em HTML sobre
  a foto. Ganha SEO, permite trocar a campanha sem refazer arte, e evita texto
  ilegível no mobile.
- Abaixo de `lg` a linha empilha e o CTA vai para baixo.

---

## Seção 2 — `components/home/LaunchGrid.tsx`

**Conteúdo:** dois `EditorialCard` quadrados.

| Card | eyebrow | title | tone |
|---|---|---|---|
| 1 | Lançamento | Contrabaixo Waldman | light |
| 2 | Novo | Mesa Behringer WING | dark |

```
div    grid grid-cols-1 gap-4 sm:grid-cols-2
  EditorialCard className="aspect-square"
  EditorialCard className="aspect-square"
```

Ambos quadrados, largura igual. Em desktop de ~1136px úteis cada card fica
com ~510×510px, que é a medida do original.

`to`: apontar para a PDP se o produto existir em `products.json`; senão, para
`/produtos` com o filtro correspondente. Se for preciso criar os dois produtos
no mock para os links fecharem, criar — mas manter os 12 existentes intactos e
respeitar os grupos de `specs` type-dependentes (baixo → Corpo/Captadores/
Braço/Hardware; mesa → Potência/Conectividade/Dimensões).

---

## Seção 3 — `components/home/CategoryBento.tsx`

**Conteúdo:** quatro `EditorialCard`, sem eyebrow.

| Card | title | destino sugerido |
|---|---|---|
| grande (esquerda) | Acessórios | `/produtos?categoria=acessorios` |
| largo (topo dir.) | Linha de pedais | `/produtos?categoria=pedais` |
| pequeno | Luthieria | página/âncora de serviço |
| pequeno | Assistência Técnica | página/âncora de serviço |

> ⚠️ **O erro mais provável aqui: implementar como grade uniforme de 4
> quadrados. Não é.** É assimétrica.

Proporções reais medidas (em ~1036px de largura útil):

| Card | Medida real | Posição |
|---|---|---|
| Acessórios | 510 × 590 | coluna 1, ocupa as **2 linhas** |
| Linha de pedais | 510 × 292 | coluna 2, linha 1 |
| Luthieria | 247 × 282 | coluna 2, linha 2, metade esquerda |
| Assistência Técnica | 247 × 282 | coluna 2, linha 2, metade direita |

```
div      grid grid-cols-1 gap-4 lg:grid-cols-2
  EditorialCard  aspect-square lg:row-span-2 lg:aspect-auto     ← Acessórios
  EditorialCard  aspect-[510/292]                               ← Pedais
  div            grid grid-cols-2 gap-4
    EditorialCard  aspect-[247/282]                             ← Luthieria
    EditorialCard  aspect-[247/282]                             ← Assistência
```

O card de Acessórios **não pode ficar com `aspect-square` no desktop** — a
altura dele vem do `row-span-2` casando com a soma das duas linhas da direita.
Daí o `lg:aspect-auto` sobrescrevendo o `aspect-square` que ele usa no mobile.

---

## Breakpoints

Usar só os do projeto: `sm` = 480px, `lg` = 1024px. Mobile-first.
O `mockup-home.html` quebra em 720/860px — ignorar, é de outra origem.

- **< sm** — tudo em 1 coluna, cards quadrados.
- **sm → lg** — seção 2 já em 2 colunas; seção 3 ainda empilhada (o bento em
  2 colunas num tablet deixaria os cards pequenos com ~180px, ilegíveis).
- **≥ lg** — seção 2 em 2 colunas, seção 3 no bento completo, seção 1 em linha.

---

## Assets

Nenhuma foto existe ainda. Implementar com placeholder e deixar o import
isolado para troca posterior. Exportar em 2x, `.webp`, **sem texto embutido**.

| Uso | Proporção | Export |
|---|---|---|
| Banner Makpro | ~16:5 | 2400 × 750 |
| Cards de lançamento | 1:1 | 1200 × 1200 |
| Acessórios | ~1:1.16 | 1100 × 1280 |
| Linha de pedais | ~16:9 | 1200 × 690 |
| Luthieria / Assistência | ~1:1.14 | 640 × 730 |

`alt` descritivo em pt-BR. `loading="lazy"` em tudo, exceto o banner da seção 1.

---

## Checklist de aceite

- [ ] `npm run build` passa (o `tsc -b` quebra em erro de tipo)
- [ ] `npm run lint` limpo
- [ ] `EditorialCard` adicionado à página `/design-system` com as 3 proporções
- [ ] `DESIGN_SYSTEM.md` atualizado com o novo componente
- [ ] `gap-4` consistente em todas as junções das seções 2 e 3
- [ ] Nenhum card com border-radius
- [ ] Nenhum overlay/gradiente sobre as fotos
- [ ] Card inteiro é `Link`, sem botão interno
- [ ] Seção 3 assimétrica, Acessórios ocupando 2 linhas no `lg`
- [ ] `tone` definido por card, não global
- [ ] Nenhum breakpoint fora de `sm`/`lg`
- [ ] Nenhuma cor nova fora do `@theme` de `src/index.css`
