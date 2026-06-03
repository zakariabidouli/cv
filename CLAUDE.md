# CLAUDE.md — Project Instructions

## Frontend Aesthetics

When working on any frontend task in this project, internalize these principles before writing a single line of UI code.

---

### The Core Problem to Avoid

Generic AI output converges toward "on distribution" aesthetics — what users call "AI slop." This means:
- Inter / Roboto / system fonts
- Purple gradients on white backgrounds
- Predictable card layouts and component patterns
- Timid, evenly-distributed color palettes
- Scattered micro-interactions that add noise without delight

**Never default to safe. Make every design decision intentional and context-specific.**

---

### Typography

Typography is the single fastest signal of quality. Make a decisive, distinctive font choice before writing any component.

**Never use:** Inter, Roboto, Open Sans, Lato, Arial, system-ui, or any default font.

**Strong choices by category:**
- Code / Technical: `JetBrains Mono`, `Fira Code`, `Space Grotesk`, `IBM Plex` family
- Editorial / Serif: `Playfair Display`, `Crimson Pro`, `Fraunces`, `Newsreader`
- Startup / Display: `Clash Display`, `Satoshi`, `Cabinet Grotesk`, `Bricolage Grotesque`
- Current project: `Geist` (sans) + `Geist Mono` (labels/numbers) + `Instrument Serif italic` (editorial accents)

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across extreme weights.

**Use weight extremes:** 100–200 vs 800–900. Never 400 vs 600 — that's invisible contrast.

**Size jumps:** 3× or more, not 1.5×. A 12px label next to a 96px headline is a design decision. 14px next to 20px is noise.

State the font choice and rationale before coding any component.

---

### Color and Theme

Commit to a cohesive aesthetic. Never distribute color evenly — one dominant color with one sharp accent beats a balanced 5-color palette every time.

- Use CSS custom properties (`--accent`, `--foreground`, etc.) for all color decisions
- Dominant background + high-contrast foreground + one accent used sparingly and meaningfully
- Draw from IDE themes, cultural aesthetics, editorial design for inspiration
- Vary between light and dark approaches — don't default to dark because it "looks techy"
- The accent color should appear on 2–3 meaningful elements max, not scattered everywhere

---

### Motion and Animation

Motion should punctuate, not decorate.

- **One well-orchestrated page load** with staggered reveals (`animation-delay`) creates more delight than a dozen scattered micro-interactions
- Prefer CSS-only animations for HTML output
- Use the Motion library for React when available
- Interactions: hover states should be instant (0–100ms), reveals should be deliberate (400–800ms)
- Reduce translate distance on scroll reveals — 4–8px feels premium; 20–40px feels template-like
- Never animate something that doesn't need to communicate a state change

---

### Backgrounds

Never default to a solid color. Create atmosphere.

- Layer CSS gradients subtly
- Use geometric patterns, noise textures, or grid overlays at very low opacity
- Background should reinforce the aesthetic, not compete with content
- Exception: when the design calls for maximum restraint (like this portfolio), a clean background IS the choice — but make it a decision, not a default

---

### Layouts

Avoid predictable patterns:
- Every section centered with a title + subtitle + card grid is template thinking
- Asymmetric grids, editorial columns, and left-aligned text feel designed
- Generous whitespace is a design element — use it with intention
- Consistent spacing tokens (4px grid) applied systematically outperform ad-hoc margins

---

### What "Distinctive" Actually Means

Before shipping any UI component, ask:
1. Would this exact thing appear in 100 other AI-generated portfolios? If yes, change it.
2. Does every element have a reason to exist? If not, remove it.
3. Is this the most refined version of this idea, or the first draft? Refine it.

Distinctive does not mean complex. It means every decision is specific to this context, this person, this purpose.

---

### This Portfolio's Design System

The current design identity is **"The Ruled System"**:

- **Signature element:** `SectionDivider` — two thin rules flanking `01 · ABOUT` — appears identically in every section
- **Hero:** Name at `clamp(4.5rem, 14vw, 11.5rem)` in `font-black`, `-0.04em` tracking, `line-height: 0.88`
- **Tagline:** `Instrument Serif italic` — the one editorial serif accent in an otherwise geometric sans system
- **Labels/numbers:** `Geist Mono` at 10–11px, `uppercase`, wide tracking (`tracking-[0.2em]+`)
- **No:** gradient text, glow effects, orbs, dot grids, decorative shapes, hover scale transforms, shadow-accent
- **Accent (blue):** Used only on active nav items, company names in experience, link hovers, and the status dot
- **Spacing:** `py-20 lg:py-28`, `max-w-5xl mx-auto`, `px-6 sm:px-8 lg:px-12` — consistent across all sections
