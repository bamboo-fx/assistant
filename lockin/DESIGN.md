# Whistle Design System

Reference for the visual language, color palette, typography, components, and patterns used across the Whistle webapp.

---

## Color Palette

### Accent

The signature color is **purple**:

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--accent` | `270 62% 65%` | `#A46EDB` | Focus rings, active states, loading animations, sparkles, LED indicators |
| `--ring` | `270 62% 65%` | `#A46EDB` | Input focus rings, sidebar ring |

Purple is constant across light and dark modes.

### Neutrals (Light Mode)

| Token | HSL | Approx Hex | Usage |
|-------|-----|------------|-------|
| `--background` | `0 0% 100%` | `#FFFFFF` | Page background |
| `--foreground` | `0 0% 7%` | `#121212` | Primary text |
| `--card` | `0 0% 98%` | `#FAFAFA` | Card surfaces |
| `--secondary` | `0 0% 96%` | `#F5F5F5` | Secondary backgrounds |
| `--muted` | `0 0% 96%` | `#F5F5F5` | Disabled / subtle fills |
| `--muted-foreground` | `0 0% 40%` | `#666666` | Secondary text |
| `--border` | `0 0% 90%` | `#E5E5E5` | Borders, dividers |
| `--primary` | `0 0% 7%` | `#121212` | Buttons, bold UI |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Text on primary |
| `--destructive` | `0 72% 51%` | `#DE3B3B` | Error / danger states |

### Neutrals (Dark Mode)

| Token | HSL | Approx Hex |
|-------|-----|------------|
| `--background` | `0 0% 4%` | `#0A0A0A` |
| `--foreground` | `0 0% 95%` | `#F2F2F2` |
| `--card` | `0 0% 7%` | `#121212` |
| `--secondary` | `0 0% 12%` | `#1F1F1F` |
| `--muted-foreground` | `0 0% 55%` | `#8C8C8C` |
| `--border` | `0 0% 15%` | `#262626` |
| `--primary` | `0 0% 95%` | `#F2F2F2` |
| `--primary-foreground` | `0 0% 7%` | `#121212` |

### Sidebar Colors

Sidebar uses its own set of CSS variables (`--sidebar-*`) that mirror the main palette but allow independent theming. In light mode the sidebar is white; in dark mode it's `#121212`.

---

## Typography

### Fonts

| Tailwind Class | Family | Role |
|----------------|--------|------|
| `font-sans` | **Plus Jakarta Sans** | Body text, default |
| `font-display` | **Inter** | Headings, display text |
| `font-logo` | **Plus Jakarta Sans** | Logo / brand marks |

Loaded from Google Fonts with weights **400 - 900** (Inter) and **400 - 800** (Plus Jakarta Sans).

### Scale

Standard Tailwind type scale (`text-xs` through `text-4xl`). No custom font sizes. Body text uses antialiased rendering.

---

## Spacing & Layout

### Container

- **Max width:** 1400px (at `2xl` breakpoint)
- **Centered** with `mx-auto`
- **Padding:** 2rem default

### Border Radius

| Tailwind | Value |
|----------|-------|
| `rounded-lg` | `0.5rem` (8px) — cards, dialogs |
| `rounded-md` | `0.375rem` (6px) — buttons, inputs |
| `rounded-sm` | `0.125rem` (2px) |
| `rounded-full` | pill — badges, avatars |

Base radius controlled by `--radius: 0.5rem`.

### Common Spacing

- Card padding: `p-6` (1.5rem)
- Button padding: `px-4 py-2` (h-9)
- Input padding: `px-3 py-2` (h-10)
- Sidebar width: `16rem` expanded, `3rem` collapsed

### Breakpoints

Mobile-first, standard Tailwind breakpoints:

| Key | Width |
|-----|-------|
| `sm` | 640px |
| `md` | 768px — sidebar appears, layout shifts to row |
| `lg` | 1024px — full desktop |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Shadows

### Glass Button

```css
box-shadow:
  0 10px 28px rgba(40, 20, 80, 0.22),
  0 4px 10px rgba(40, 20, 80, 0.14),
  0 1px 2px rgba(0, 0, 0, 0.08);
```

Purple-tinted soft shadow. Deepens on hover.

### Standard Components

- Cards: `shadow-sm`
- Dropdowns / popovers: Radix UI default elevation
- Chat button: inset shadows for 3D depth

---

## Dark Mode

- **Implementation:** class-based (`dark` class on `<html>`)
- **Tailwind config:** `darkMode: ["class"]`
- All colors defined as CSS variables that swap between `:root` and `.dark`
- Purple accent stays the same in both modes
- Backgrounds invert (white to near-black), borders darken, text lightens

---

## Component Library

Built on **shadcn/ui** (Radix UI primitives + Tailwind styling). 50+ components in `webapp/src/components/ui/`.

### shadcn Config

```json
{
  "style": "default",
  "baseColor": "slate",
  "cssVariables": true,
  "tsx": true
}
```

### Button Variants

| Variant | Style |
|---------|-------|
| `default` | Dark bg (`bg-primary`), white text |
| `secondary` | Light gray bg |
| `outline` | Border only, transparent bg |
| `ghost` | No border/bg, accent on hover |
| `destructive` | Red bg |
| `link` | Underlined text |
| `cool` | Dark gradient with inset shadows |

Sizes: `default` (h-9), `sm` (h-8), `lg` (h-10), `icon` (h-9 w-9).

### Card

```
rounded-lg border bg-card text-card-foreground shadow-sm
  CardHeader: p-6, space-y-1.5
  CardTitle: text-2xl font-semibold tracking-tight
  CardDescription: text-sm text-muted-foreground
  CardContent: p-6 pt-0
  CardFooter: p-6 pt-0
```

### Input

```
h-10 rounded-md border border-input bg-background px-3 py-2
Focus: ring-2 ring-ring (purple) ring-offset-2
Disabled: opacity-50 cursor-not-allowed
```

### Badge

```
rounded-full border px-2.5 py-0.5 text-xs font-semibold
Variants: default, secondary, destructive, outline
```

### Forms

React Hook Form + Zod validation. Shared schemas imported from `backend/src/types.ts`. Errors rendered via `<FormMessage>`.

---

## Custom Effects

### Glass Button

Glassmorphism with `backdrop-blur(14px) saturate(180%)`, gradient overlay, and a slow shine sweep animation (`glass-shine` at 7s). Hover lifts (`translateY(-1px) scale(1.02)`), active presses down (`scale(0.98)`).

### Sparkles

tsParticles with default purple (`#A46EDB`) circles radiating outward.

### Loading Animation

Rotating circle border + staggered letter color shift to purple with scale/translate.

### New Chat Button

Dark gradient surface with an LED pulse indicator in purple, outer glow ring, and corner shine.

---

## Animations

| Name | Duration | Usage |
|------|----------|-------|
| `fade-in` | 0.5s ease-out | Page/element entry |
| `accordion-down/up` | 0.2s ease-out | Collapsible content |
| `shimmer` | 4.5s linear infinite | Loading skeletons |
| `marquee` | 30s linear infinite | Scrolling text |
| `blink` | 1s steps | Cursor blink |
| `glass-shine` | 7s ease-in-out infinite | Button shine sweep |
| `brain-pop` | 1.8s cubic-bezier | Element pop-in |
| `brain-float` | 16s ease-in-out infinite | Floating drift |
| `glow-fade` | 0.8s ease-out | Pulse-out glow |

---

## Icons

**Lucide React** — line-style icon set. Consistent stroke width across the app.

---

## Charts

Recharts wrapped in a shadcn `<ChartContainer>` that injects theme-aware CSS variables (`--color-{key}`). Supports light/dark via the chart config's `theme` property.

---

## Brand Assets

Located in `webapp/public/`:

| File | Purpose |
|------|---------|
| `whistle-icon.png` | App icon |
| `zebra-logo.png` | Zebra brand mark |
| `og-base.png` | Open Graph preview image |
| `favicon-*.png` | Favicons (16, 32, 64, 180) |
| `logos/` | 100+ school and conference logos (SVG, PNG, WebP) |

---

## Key Libraries

- **React 18.3** + Vite (SWC)
- **Tailwind CSS 3.4**
- **shadcn/ui** (Radix UI)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React Hook Form** + **Zod** (forms/validation)
- **Recharts** (charts)
- **Sonner** (toasts)
