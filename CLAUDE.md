# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Visual prototype (mocked data, no backend) of an e-commerce for Convicsom, a musical instrument and professional audio retailer in Pouso Alegre, MG (Brazil), with three physical stores (Pouso Alegre, Itajubá, São Lourenço). B2C retail is the primary flow; B2B ("Projetos para Igrejas e Empresas" — installation projects for churches/companies) is a secondary, visually-distinct path, not a fork at the entry point. All UI copy is in Portuguese (pt-BR).

The full design decisions and rationale (color palette provenance, typography, spacing/grid, component inventory, accessibility notes) live in `DESIGN_SYSTEM.md` — read it before making visual/design-system changes.

## Commands

```
npm run dev       # Vite dev server
npm run build     # tsc -b (typecheck) && vite build — build fails on type errors
npm run lint      # oxlint
npm run preview   # preview the production build
```

There is no test suite configured. There is no `tsc --noEmit`-only script; use `npx tsc -b --noEmit` to typecheck without emitting/building.

## Stack notes

- **Vite + React 19 + TypeScript + React Router v7 (BrowserRouter).**
- **Tailwind CSS v4**, CSS-first config — there is no `tailwind.config.js`. All theme tokens (`@theme` block) and global styles live in `src/index.css`.
- **Custom breakpoints** (not Tailwind's defaults): `sm` = 480px (tablet start), `lg` = 1024px (desktop start). Mobile-first as usual; `md`/`xl`/`2xl` are unused.
- Tailwind v4 supports dynamic arbitrary spacing (e.g. `h-18`, `h-13`) directly — no need to extend the theme for one-off spacing values.

### `@layer` gotcha (already bit us once)

Any global CSS rule in `index.css` written **outside** an explicit `@layer` block has higher cascade priority than **anything** inside `@layer utilities` — including Tailwind utility classes like `focus:outline-none` — regardless of selector specificity. This previously caused a global `:focus-visible` outline rule to un-overridably win over component-level focus styling. Rule of thumb: always put custom global CSS inside `@layer base { ... }` (see `body` / `:focus-visible` in `src/index.css`) so components can still override it with ordinary utility classes.

## Architecture

### Design tokens are literally sampled from the brand logo

`src/assets/logo-convicsom.png` is the real Convicsom logo. The brand colors in `@theme` are not chosen aesthetically — they were extracted by pixel-sampling the actual PNG:
- `brand-800` (`#182060`, "Convicsom Navy") = the logo's navy background, sampled directly.
- `accent-400` (`#fff212`, "Convicsom Yellow") = the logo's yellow, sampled directly. `accent-400/500` are near-pure yellow — background/fill use only, never text on white (fails AA). `accent-700/800` are darkened mustard tones generated specifically to be legible as text on white.
- `danger-500` (`#f03038`) = the logo's red diagonal accent color, reused for the semantic "error/urgency" token. By deliberate decision, red is **never** a dominant UI/CTA color (badges like "Últimas unidades" and error states only) — this was an explicit choice to avoid the site reading as "Fender-red-coded."

`Logo.tsx` renders the full logo image by default. It has a `crop` prop (object-fit trick, aspect ratio `3069/415`) that isolates just the readable navy text bar — the source PNG is ~76% decorative ring/red-streak whitespace around that bar, so naive height-only scaling makes the logo illegible. `crop` is not currently used (a full-logo-at-moderate-size approach was chosen instead after the cropped version looked disproportionate/lost the ring) but is kept available for tight contexts.

The header's structural dimensions (container side padding, row heights, nav typography) were reverse-engineered by measuring `intl.fender.com` with Playwright — see git history / PR descriptions for the exact measurements if the header needs further reference-matching.

### Data layer

`src/data/products.json` is the single source of truth for the 12 mocked products (mixed Instrumentos/Áudio Profissional), typed by `src/types/product.ts` (`Product`, `SpecGroup`, `ProductHighlight`, `ProductVariation`, etc.). `src/data/products.ts` re-exports `allProducts` and a curated `featuredProducts` subset (by id) for the Home page. `src/data/stores.ts` holds the 3 real physical store locations/contacts used in checkout pickup selection.

Product `specs` are grouped by category, and which groups a product has is intentionally type-dependent (e.g. instruments get "Corpo/Captadores/Braço/Hardware", audio gear gets "Potência/Impedância/Conectividade/Dimensões") — the PLP's `FilterPanel` similarly shows/hides facets (nº de cordas, potência, conectividade) based on which products are in scope.

### Cart state

`src/context/CartContext.tsx` (`CartProvider`/`useCart`) is a plain React Context wrapping the whole app in `main.tsx`, in-memory only (no persistence — resets on reload, that's intentional for this prototype). `ProductCard`'s "Comprar" button and the PDP's `PurchasePanel` both call `addItem` directly (no prop drilling) and open the `CartDrawer` (rendered globally inside `Header.tsx`, not per-page).

### Routes (`src/App.tsx`)

- `/` — Home
- `/produtos` — PLP (filters, sort, grid/list toggle, compare mode)
- `/produtos/:id` — PDP (gallery, sticky purchase panel, specs, compare-with-another-model, related products)
- `/checkout` — cart review → delivery (entrega w/ ViaCEP autofill, or retirada at one of the 3 real stores) → payment (mock) → confirmation
- `/design-system` — living style guide page; keep it in sync when adding/changing shared `ui/` components

### Component organization

- `components/ui/` — the actual design system (atoms/molecules: `Button`, `Badge`, `Input`, `Select`, `Accordion`, `ProductCard`, etc.), reused across every page.
- `components/{home,plp,pdp,cart,checkout,layout}/` — feature-scoped organisms/composition, not meant for reuse outside their page.
- `ProductCard` supports `layout="grid"|"list"` and an optional compare-selection mode (checkbox overlay) used by the PLP.

### Checkout specifics

CEP lookup (`src/lib/cep.ts`) calls the public ViaCEP API (`viacep.com.br`) directly from the browser — this is real network I/O in an otherwise fully-mocked app, sourced from the actual Correios CEP database. Store pickup (`src/data/stores.ts`) lists 3 real addresses/phones, confirmed with the business owner, not fictional.

## Deployment

Deployed on Vercel (GitHub-integrated auto-deploy from `master`). `vercel.json` provides the SPA rewrite (`/(.*) → /index.html`) required for React Router client-side routes to work on direct navigation/refresh — without it, any route other than `/` 404s on Vercel.

## Git workflow

The user has asked for the full branch → commit → push → PR → merge cycle to be automated end-to-end via `gh` (no pause for merge approval), reporting what was merged afterward. `gh` is at `C:\Users\convi\bin\gh.exe` — on the Bash-tool PATH but **not** on the PowerShell PATH, use the full path from PowerShell.
