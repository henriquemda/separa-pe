# ⚽ AGENTS.md — SEPARA Project Specifications & AI Agent Guidelines

> **Project URI**: `henriquemda/separa-pe` | **Stack**: Next.js 16 (App Router / Turbopack), React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, Radix UI / Shadcn UI Primitives.

---

## 🏛️ 1. Project Overview & Sovereign Architecture
**SEPARA (`separa.pe`)** is the premier B2C & B2B SaaS sports pitch reservation ecosystem in Peru and Latin America.

- **B2C (Pelotero Mode)**: Enables players and captains to discover available soccer pitches, reserve instantly in 1-click via Yape/Plin, split payments ("Dividir Cuota" per player), and find open matches ("Modo Falta Uno").
- **B2B (Complejo SaaS Mode)**: Enables sports facility managers to automate 100% of reservations, prevent no-shows with automated 50% deposit locks, validate Yape/Plin transaction receipts automatically via AI, and control IoT field reflectors/lighting.

---

## 🎨 2. UI/UX Design System & Theme Engine

### Color Palette Tokens
- **Stadium Night (Dark Theme - Default)**:
  - Base Background: `#040806` (Stadium Pitch Black)
  - Primary Accent: `#00ff87` / `#10b981` (Electric Turf Emerald)
  - Secondary Accent: `#84cc16` (Electric Lime) & `#f59e0b` (Gold Amber)
  - Cyan Accent: `#06b6d4` (Matchmaking Cyan)
- **Sunlight Turf (Light Theme)**:
  - Base Background: `#f0faf4` (Fresh Grass White)
  - Primary Accent: `#047857` / `#059669` (Deep Forest Emerald)
  - Text Tokens: Slate-900 (`#0f172a`), Slate-700 (`#334155`), Slate-500 (`#64748b`)

### Theme Toggle (`theme === "dark" | "light"`)
- Handled at page root via `.light-theme` class on container.
- Uses dynamic background utility `.bg-stadium` which resolves to `var(--bg-main)` in Dark Mode and `#f0faf4` in Light Mode.

---

## 🧩 3. Frontend Coding Standards & Library Discipline

### Rule 4 Compliance (Shadcn UI & Radix Primitives)
- **MANDATORY**: Any interactive UI primitives (modals, dialogs, sliders, switches, tabs, buttons) **MUST** use Radix UI / Shadcn UI primitives located in `src/components/ui/` (`dialog.tsx`, `slider.tsx`, `switch.tsx`, `button.tsx`).
- Wrap and style Radix UI primitives with custom Tailwind CSS utility classes to achieve the Avant-Garde stadium look without breaking accessibility (WCAG AAA) or state stability.

---

## 🇵🇪 4. Localization & Neuromarketing Tone
All user-facing copy, CTAs, badges, calculators, and tooltips **MUST** be written in native Peruvian / LatAm Spanish with high-converting neuromarketing triggers:
- *"Separa tu cancha en segundos"*
- *"Dividir Cuota (Yape / Plin)"*
- *"Modo Falta Uno (Matchmaking)"*
- *"Cero llamadas, cero no-shows"*
- *"Junta tu mancha"*

---

## 🚀 5. Build & Verification Commands
```bash
# Development Server
npm run dev

# Production Build (Must always pass with 0 errors & 0 warnings)
npm run build
```
