# Dovepeak Letter Head Creator (DLHC) - Brand & UI Design Guidelines

**Version:** 1.0
**Design Philosophy:** Clean, Professional, Minimalist, Trustworthy, and Modern SaaS.

---

## 1. Core Design Principles
The DLHC platform targets businesses, NGOs, and professionals. Therefore, the UI must inspire trust and competence.
- **Clarity over Clutter:** Use generous whitespace to let content breathe. Every UI element must serve a clear purpose.
- **Professionalism:** Avoid overly playful elements. The design should feel premium, like a high-end corporate tool.
- **Accessibility (A11y):** Maintain high contrast ratios (WCAG AA compliant) for text and critical interactive elements.
- **Subtle Dynamics:** Use micro-interactions, smooth transitions, and soft hover states to make the app feel alive without being distracting.

---

## 2. Color Palette
We utilize a highly curated, premium color palette designed to inspire trust and focus.

### Primary Colors (Trust & Action)
- **Primary Brand (Deep Indigo/Blue):** `#2563EB` (Tailwind `blue-600`) - Used for primary buttons, active states, and key highlights.
- **Primary Dark (Navy):** `#1E3A8A` (Tailwind `blue-900`) - Used for heavy emphasis, sidebars, and strong structural elements.

### Neutral & Background Colors (Cleanliness & Space)
Pure whites and soft slates to create a crisp, medical-grade clean interface.
- **App Background:** `#F8FAFC` (Tailwind `slate-50`) - Provides a soft backdrop that makes white cards pop.
- **Surface / Cards:** `#FFFFFF` (White) - Used for all content containers, editor canvas, and modals.
- **Borders / Dividers:** `#E2E8F0` (Tailwind `slate-200`) - Subtle separation without visual noise.

### Text Colors (Readability)
Never use pure black (`#000000`).
- **Primary Text:** `#0F172A` (Tailwind `slate-900`) - For headings and high-emphasis text.
- **Secondary Text:** `#475569` (Tailwind `slate-600`) - For body copy, labels, and muted information.
- **Placeholder Text:** `#94A3B8` (Tailwind `slate-400`).

### Feedback & System Colors
- **Success:** `#10B981` (Tailwind `emerald-500`)
- **Warning:** `#F59E0B` (Tailwind `amber-500`)
- **Error/Destructive:** `#EF4444` (Tailwind `red-500`)

---

## 3. Typography
A premium SaaS application requires flawless typography.
- **Primary Typeface:** **Inter** (Google Fonts). It provides exceptional legibility on digital screens, perfect for data-heavy dashboards and clean UI.
- **Fallback Typeface:** System fonts (San Francisco, Segoe UI, Roboto).

### Font Weights
- **Regular (400):** Standard body text, descriptions.
- **Medium (500):** Button text, input labels, secondary headers.
- **Semibold (600):** Section headings, important data points.
- **Bold (700):** Page titles, hero text.

---

## 4. UI Elements & Styling

### Buttons & Inputs
- **Border Radius:** Use `md` (6px) or `lg` (8px). Avoid overly rounded "pill" shapes (`full`) to maintain a serious corporate aesthetic.
- **Primary Button:** Solid background (`#2563EB`), white text, subtle hover lift (`-translate-y-0.5`), and a soft colored drop shadow.
- **Secondary Button:** White background, subtle border (`slate-200`), dark text (`slate-900`), and a light gray hover state (`slate-50`).

### Shadows & Elevation
Avoid harsh, dark shadows. Use soft, diffused shadows to simulate realistic depth.
- **Cards/Containers:** Tailwind `shadow-sm` or `shadow-md` (e.g., `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05)`).
- **Modals/Dropdowns:** Tailwind `shadow-xl`.

### Glassmorphism & Modern Touches
- **Navigation/Headers:** When scrolling, headers should become sticky with a subtle blur effect (`backdrop-blur-md bg-white/80`) to feel premium and layered.

---

## 5. Iconography
- **Icon Set:** **Lucide React** (Standard with Shadcn UI).
- **Style:** Outline icons with a consistent stroke width of `1.5px` or `2px`.
- **Sizing:** `16px` for inline text icons, `20px` for buttons/navigation, `24px` for section headers.

---

## 6. Layout & Spacing System
- **Grid:** 8-point grid system (Tailwind default spacing). E.g., `p-4` (16px), `p-8` (32px).
- **Max Widths:** Content areas should be constrained to a readable width (e.g., `max-w-7xl` for dashboards, `max-w-3xl` for forms).
- **Editor Layout:** 
  - Left Sidebar: Settings & Properties (Fixed width, ~300px, light gray background).
  - Center Canvas: The Letterhead Preview (White background, prominent drop shadow to simulate paper, zoomed to fit).

---

## 7. Motion & Animation
Animations should be functional, fast, and purposeful.
- **Durations:** Keep them snappy. `150ms` for hover states, `300ms` for page transitions or modals.
- **Easing:** Use ease-out functions so animations feel responsive.
- **Micro-interactions:** Buttons slightly depressing on click, skeleton loaders smoothly pulsing during data fetches.

---

By adhering to these guidelines, the DLHC platform will look professional, inspire user confidence, and position itself as a premium corporate tool immediately upon first use.
