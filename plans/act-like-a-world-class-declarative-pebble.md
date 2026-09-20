# Personal Website — Production-Ready Plan

## Context

The user wants a complete, production-quality personal branding website built inside the existing React + Vite + Tailwind CSS v4 project. This is a single-page scrolling site with distinct named sections, premium Swiss/editorial aesthetics, and long-term maintainability. All personal content is placeholder — clearly labeled for later substitution. The existing `src/App.tsx` is a simple demo component that will be entirely replaced.

---

## Strategy & Design Philosophy

**Stance**: Swiss/Editorial hybrid — precise typographic grid, generous whitespace, restrained accent usage, clean information hierarchy. Timeless over trendy.

**Profession**: Classical violinist. The site must feel at home in the world of classical music — refined, cultured, with a performative quality. Imagery, copy tone, and section naming all reflect this.

**Target audience**: Concert promoters, record labels, festival organizers, journalists, music schools, fellow musicians, and general audiences discovering the artist online.

**User journey**: Land on hero (name + instrument + tagline) → hear/watch recordings immediately → understand the artist (About / Biography) → trust via credentials (Performances / Education / Awards) → explore repertoire or projects → connect via social platforms and contact form.

---

## Design System

### Typography (via `figma fonts resolve` + Google Fonts)
- **Display**: `Playfair Display` — authoritative serif for section headings and hero name
- **Body**: `Inter` — neo-grotesque, highly legible at all sizes for body copy
- **Mono/Labels**: `DM Mono` — structural labels, tags, dates, category markers

### Color Palette (CSS variables in `src/index.css`)
```css
--background:          #FAFAF9;   /* warm white ground */
--foreground:          #141414;   /* near-black text */
--card:                #F4F3F0;   /* card surfaces */
--card-foreground:     #141414;
--primary:             #1C3557;   /* deep navy — trust, authority */
--primary-foreground:  #FAFAF9;
--secondary:           #F0EFED;   /* soft neutral surfaces */
--secondary-foreground:#3A3A3A;
--muted:               #EBEBEA;
--muted-foreground:    #6B6863;   /* captions, meta text */
--accent:              #B8965A;   /* warm gold — used sparingly */
--accent-foreground:   #141414;
--border:              #E2E0DC;   /* hairline dividers */
--ring:                #1C3557;
--radius:              4px;
```

### Spacing System
8px base unit; sections use 96–128px vertical padding on desktop, 64px on mobile.

---

## Project Architecture

```
src/
  App.tsx                       ← Main scroll-assembly component
  main.tsx                      ← Entry point (unchanged)
  index.css                     ← Global styles: @import tailwindcss + @font-face + CSS vars
  data/
    personal.ts                 ← Name, tagline, bio, social links, contact
    experience.ts               ← Array of work history entries
    education.ts                ← Array of education entries
    projects.ts                 ← Array of portfolio projects
    skills.ts                   ← Skills grouped by category
    achievements.ts             ← Awards, certifications, recognitions
    publications.ts             ← Talks, papers, articles, media
  components/
    layout/
      Navigation.tsx            ← Fixed top nav (logo left, links right, mobile hamburger)
      Footer.tsx                ← Copyright, social links, nav shortcuts
    sections/
      Hero.tsx                  ← Full-height: name, tagline, CTAs (Download CV / Contact)
      About.tsx                 ← Photo placeholder + biography prose
      Experience.tsx            ← Vertical timeline of work history
      Education.tsx             ← Compact education timeline
      Projects.tsx              ← 3-column responsive project grid with hover states
      Skills.tsx                ← Skills grouped by category (tag-cloud style)
      Achievements.tsx          ← Award/recognition list with icon accent
      Publications.tsx          ← Media, talks, papers — linked list
      Contact.tsx               ← Contact form + direct contact details
    ui/
      SectionHeader.tsx         ← Reusable: label (mono) + heading (display) + optional description
      Tag.tsx                   ← Skill/tech tag chip
      TimelineItem.tsx          ← Reusable timeline row (date | title | company | description)
      ProjectCard.tsx           ← Portfolio card (image, title, tags, link)
      AchievementItem.tsx       ← Award row with accent marker
      PublicationItem.tsx       ← Publication/talk row with external link
```

---

## Implementation Steps

### 1. Font Wiring
- Run `figma fonts list` to check file-scoped catalog
- Run `figma fonts resolve` for Playfair Display, Inter, DM Mono
- Wire `@font-face` rules into `src/index.css` (the file imported by `src/main.tsx`)

### 2. Design Tokens + Global CSS
- Add CSS custom properties (color palette above) to `src/index.css`
- Add base typography resets: `font-family: 'Inter'` on body, `'Playfair Display'` on headings
- Add smooth scroll behavior: `scroll-behavior: smooth`
- Add scrollbar suppression (hide by default, show on hover)
- Set Tailwind `@theme` inline block mapping tokens to Tailwind class names

### 3. Data Files (`src/data/*.ts`)
Each file exports a typed array/object with clearly labeled placeholder strings marked `[PLACEHOLDER: ...]`.

**`personal.ts`**: name, instrument ("Violin"), tagline, bio (2–3 paragraphs), location, email, **YouTube channel URL, Instagram URL, Facebook URL**, optional Twitter/X, press kit PDF URL, profile photo URL placeholder. Social links typed as `{ platform, url, label }[]`.

**`recordings.ts`**: Array of `{ id, title, composer, work, ensemble?, conductor?, year, thumbnailUrl, youtubeUrl, spotifyUrl?, appleMusicUrl?, description }`. Rendered as an embeddable YouTube grid.

**`performances.ts`**: Array of `{ id, role, venue, location, period, highlights: string[] }`. Replaces `experience.ts` — named for concert/recital engagements.

**`education.ts`**: Array of `{ id, institution, degree, field, period, honors?, teachers?: string[], description? }`. Teachers field is important in classical music (pedagogy lineage).

**`repertoire.ts`**: Object with categories (Concertos, Sonatas, Chamber Music, Contemporary, etc.): `{ category: string, items: { composer: string, work: string }[] }[]`. Replaces `skills.ts`.

**`awards.ts`**: Array of `{ id, title, organization, year, description }`. Competition prizes, fellowships, grants.

**`press.ts`**: Array of `{ id, title, type: 'review'|'interview'|'feature'|'radio'|'tv', publication, date, url?, quote? }`. Press quotes displayed as pull-quotes. Replaces `publications.ts`.

**`social.ts`**: Re-exported from `personal.ts` — YouTube, Instagram, Facebook, Spotify artist page, optional Apple Music.

### 4. UI Primitives (`src/components/ui/`)

**`SectionHeader.tsx`**: Props: `label` (DM Mono, accent color, small caps), `heading` (Playfair Display), `description?`, `align?: 'left'|'center'`. Used at the top of every section.

**`Tag.tsx`**: Small pill with border, DM Mono text. Hover state with primary color fill.

**`TimelineItem.tsx`**: Left-aligned date column (DM Mono, muted) | right content column (title, subtitle, description). Left hairline connector.

**`RecordingCard.tsx`**: YouTube thumbnail image (16:9 aspect ratio), composer + work title, ensemble/conductor, year. Click opens YouTube link in new tab. Subtle lift + play-icon overlay on hover.

**`AchievementItem.tsx`**: Year (DM Mono) | accent dot marker | title + org.

**`PressItem.tsx`**: Publication name (DM Mono) | pull-quote in italics | "Read more" link.

**`SocialLink.tsx`**: Platform icon (YouTube = red, Instagram = gradient, Facebook = blue) + label + URL. Used in Connect section and footer.

### 5. Layout Components

**`Navigation.tsx`**:
- Fixed `position: fixed` top-0 with backdrop blur + border-bottom on scroll
- Left: Name/initials mark
- Right: inline links (Recordings, About, Performances, Contact) + smooth-scroll `href="#section-id"`
- Mobile: hamburger icon → slide-down drawer
- Active section highlight via IntersectionObserver

**`Footer.tsx`**:
- Single row: copyright left, social icons right
- Thin border-top hairline

### 6. Section Components

**`Hero.tsx`** (full viewport height):
- Large Playfair Display name (~80–96px desktop, fluid)
- DM Mono label: "Violinist" (accent color)
- Tagline (Inter, 20px, muted) — e.g. "Performing the classical canon with contemporary urgency"
- Two CTAs: primary button (Watch & Listen → scrolls to Recordings) + ghost button (Contact)
- Social icon row beneath CTAs: YouTube, Instagram, Facebook
- Scroll indicator arrow at bottom
- Background: warm white, optionally a subtle full-bleed performance photo with dark overlay

**`Recordings.tsx`** ← NEW, placed immediately after Hero:
- `SectionHeader` label "Listen & Watch", heading "Recordings"
- 3-col responsive grid (→ 2-col tablet → 1-col mobile) of `RecordingCard`
- Each card: YouTube thumbnail, composer, work title, year
- Cards link to YouTube in new tab; hover reveals play icon overlay
- Optional streaming badges row (Spotify, Apple Music) if URLs provided

**`About.tsx`**:
- Two-column grid: performance photo placeholder left (portrait crop), biography right
- Pull quote in Playfair Display italic — a press excerpt or personal statement
- Key facts row (location, instrument, teachers) in DM Mono

**`Performances.tsx`** (replaces Experience):
- `SectionHeader` + vertical `TimelineItem` list
- Entries: venue, role (soloist/chamber/orchestra), location, season, highlights
- No technology tags — replaced with repertoire performed

**`Education.tsx`**:
- Compact `TimelineItem` list
- Teachers/professors field displayed prominently (lineage matters in classical music)
- Honors, prizes won during studies noted

**`Repertoire.tsx`** (replaces Skills):
- `SectionHeader` + grouped composer/work lists by category (Concertos, Sonatas, Chamber, etc.)
- Each category: DM Mono category label + list of "Composer — Work" rows
- Clean typographic list, no tag-cloud pills

**`Awards.tsx`** (replaces Achievements):
- `SectionHeader` + `AchievementItem` list
- Competition prizes, fellowships, grants — accent left border marker

**`Press.tsx`** (replaces Publications):
- `SectionHeader` + featured press quotes as pull-quotes
- Below: tabbed list (All, Reviews, Interviews, Radio/TV) — React state
- `PressItem` rows with publication name, date, link

**`Connect.tsx`** ← NEW section before Contact:
- `SectionHeader` label "Follow Along", heading "Connect"
- Large `SocialLink` cards for YouTube, Instagram, Facebook (+ Spotify if applicable)
- Each card: platform color, icon, platform name, handle/description, "Follow" button

**`Contact.tsx`**:
- Two-column: left = email, location, booking inquiries note; right = contact form
- Form fields: name, email, subject (dropdown: Booking Inquiry / Press / Collaboration / Other), message
- Form state: idle → submitting → success/error (mailto fallback)
- Honeypot field for basic spam prevention

### 7. App Assembly (`src/App.tsx`)
- Import all sections in scroll order
- Each section wrapped in `<section id="section-name">` for anchor navigation
- IntersectionObserver hook for active nav highlighting
- No router — single scrolling page

### 8. SEO & Metadata (`index.html`)
Update the Figma Make template slots with:
- `<title>` — Full name + tagline
- `<meta name="description">` — 155-char bio excerpt
- `<meta property="og:*">` — OpenGraph for social sharing
- `<meta name="twitter:*">` — Twitter Cards
- `<link rel="canonical">`
- `<meta name="robots" content="index, follow">`
- Schema.org JSON-LD `<script type="application/ld+json">` — `Person` type with all fields

### 9. Micro-Interactions & Animation
- CSS `transition` on all interactive elements (200–300ms ease)
- Scroll-reveal: `IntersectionObserver` adds `animate-in` class when section enters viewport → `opacity: 0 → 1` + `translateY(16px → 0)`
- Navigation backdrop blur on scroll (scroll event listener)
- Project card hover: subtle `translateY(-4px)` + shadow increase
- Button hover states: fill transition on ghost button, brightness shift on primary

### 10. Responsive Breakpoints
- Desktop: ≥1024px (full layout)
- Tablet: 768–1023px (2-col projects, stacked about)
- Mobile: <768px (single column, hamburger nav, reduced heading scale)

---

## SEO Completeness Checklist

- [x] Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- [x] Descriptive heading hierarchy (one `<h1>`, then `<h2>` per section)
- [x] `alt` text on all images
- [x] `aria-label` on icon-only buttons and links
- [x] `lang="en"` on `<html>`
- [x] Meta description, OpenGraph, Twitter Cards
- [x] Schema.org Person JSON-LD
- [x] Canonical URL
- [x] Robots meta
- [x] Smooth scroll without breaking accessibility (respects `prefers-reduced-motion`)
- [x] Focus-visible rings on all interactive elements
- [x] Color contrast meets WCAG AA (4.5:1 body, 3:1 large text)

---

## Deployment & Maintenance Guide (in code comments + README)

Documented inside `src/data/personal.ts` header comments:

- **Local dev**: `pnpm dev` → localhost:8443
- **Build**: `pnpm build` → `/dist` folder
- **Deploy**: Upload `/dist` to Vercel / Netlify / Cloudflare Pages (drag-drop or git push)
- **Custom domain**: Point DNS CNAME/A record per hosting provider docs
- **Update content**: Edit any file in `src/data/` — no architecture changes needed
- **Add blog**: Create `src/data/posts.ts` + `src/components/sections/Blog.tsx` — slot into App.tsx
- **Analytics**: Add Plausible/Fathom script tag in index.html (privacy-respecting, no cookie banner needed)

---

## Critical Files to Create / Modify

| File | Action |
|------|--------|
| `src/index.css` | Add font-face rules, CSS variables, base resets |
| `src/App.tsx` | Replace entirely — section assembly |
| `src/data/personal.ts` | Create — includes YouTube, Instagram, Facebook URLs |
| `src/data/recordings.ts` | Create — YouTube recordings grid |
| `src/data/performances.ts` | Create — concert/recital engagements |
| `src/data/education.ts` | Create — includes teachers field |
| `src/data/repertoire.ts` | Create — grouped by concertos/sonatas/chamber/etc. |
| `src/data/awards.ts` | Create — competition prizes & fellowships |
| `src/data/press.ts` | Create — reviews, interviews, media |
| `src/components/layout/Navigation.tsx` | Create |
| `src/components/layout/Footer.tsx` | Create — includes YouTube/Instagram/Facebook icons |
| `src/components/ui/SectionHeader.tsx` | Create |
| `src/components/ui/Tag.tsx` | Create |
| `src/components/ui/TimelineItem.tsx` | Create |
| `src/components/ui/RecordingCard.tsx` | Create — YouTube thumbnail + play overlay |
| `src/components/ui/AchievementItem.tsx` | Create |
| `src/components/ui/PressItem.tsx` | Create — press quote + link |
| `src/components/ui/SocialLink.tsx` | Create — platform card (YouTube/Instagram/Facebook) |
| `src/components/sections/Hero.tsx` | Create — includes social icon row |
| `src/components/sections/Recordings.tsx` | Create ← new |
| `src/components/sections/About.tsx` | Create |
| `src/components/sections/Performances.tsx` | Create |
| `src/components/sections/Education.tsx` | Create |
| `src/components/sections/Repertoire.tsx` | Create |
| `src/components/sections/Awards.tsx` | Create |
| `src/components/sections/Press.tsx` | Create |
| `src/components/sections/Connect.tsx` | Create ← new (YouTube/Instagram/Facebook cards) |
| `src/components/sections/Contact.tsx` | Create |
| `index.html` | Update meta tags, SEO, Schema.org JSON-LD |

---

## Verification

1. Dev server renders full page without errors
2. All 9 sections visible on scroll
3. Navigation links smooth-scroll to correct anchors
4. Mobile hamburger menu opens/closes
5. Projects filter tabs work
6. Publications filter tabs work
7. Contact form shows success state on submit
8. No TypeScript errors (`pnpm build` succeeds)
9. Heading hierarchy is correct (browser dev tools Accessibility tree)
10. All images have alt text
11. CSS variables render correct palette
12. Fonts load (Playfair Display, Inter, DM Mono)
13. Scroll animations trigger on viewport entry
14. `prefers-reduced-motion` disables animations
