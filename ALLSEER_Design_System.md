# ALLSEER SOFTWARE — Concept Page Design System

**Status:** Concept draft library — not real companies.  
**Goal:** Each concept page must look like a real, polished product page. Distinct identity per page. Cohesive family feel. Emoji logos (placeholder for real branding later). CSS background patterns (no external images required).

---

## Design Principles

1. **Each page has its own identity.** Color palette, logo, background pattern, mood — all distinct. A visitor should recognize which concept they're on without reading the title.
2. **Professional, not playful.** Concept drafts can look like real products. Dark, serious palettes. Clean typography. No toy-ish elements.
3. **Emoji logos are placeholders.** Displayed in a styled square chip with the page's accent color. Not tacked on — part of the visual identity.
4. **Background patterns on every page.** CSS-generated SVG patterns via `background-image: url("data:image/svg+xml,...")`. No external image files needed. Each page has a unique pattern that reinforces its identity.
5. **Consistent chrome, different content.** The topbar, footer, pledge bar, and section rhythm are consistent across pages. The palette, logo, pattern, and content voice differ.
6. **Full-bleed hero sections.** Each page opens with a dark hero block that uses a CSS gradient (no image needed) plus the logo chip and title. The gradient colour comes from the page's accent.
7. **Card-based content sections.** Content is organized into cards, grids, and stat rows. Each card uses the page's accent as a left border or top border.

---

## Shared Chrome (all pages)

### Topbar
- Fixed, 56px tall, dark (page's `--bg2`).
- Left: ALLSEER SOFTWARE brand mark (angelcorp.png logo + wordmark).
- Right: page tag (e.g. "Extension · YouTube Tools") + back arrow linking to omni.html.
- Border-bottom: 1px solid page's `--line`.
- On scroll: stays fixed. No transparency — solid dark.

### Footer
- Top border: 1px solid page's `--line2`.
- Left: PRIMAL APE mark (same as omni.html).
- Right: page name + "concept draft" note.
- Small, muted, monospace.

### Pledge bar
- Top border: 1px solid rgba(255,255,255,.06).
- Background: rgba(255,255,255,.028).
- Text: "20% of all gross income is pledged to charity | an ALLSEER company | [page descriptor]".
- Links back to omni.html.

### Section rhythm
- Each content section separated by `border-top: 1px solid var(--line2)` on a wrapper, or a margin gap.
- Section headers: uppercase, letter-spaced, page accent colour, small (11px mono), above each H2.
- H2s: large, bold, white/ink colour, page accent underline (2px solid `--accent2`).

---

## Page Design Specs

### 1. UNLIST — YouTube Unlisted Video Scanner

| Element | Value |
|---------|-------|
| **Logo emoji** | 🔍 (magnifying glass — "find what's hidden") |
| **Logo chip** | 56px square, `--accent` background, white emoji, rounded 10px, displayed in hero and topbar |
| **Primary colour** | `--bg: #0a0e17` (deep space blue-black) |
| **Secondary** | `--bg2: #111827`, `--bg3: #1a2235`, `--bg4: #232d44` |
| **Accent** | `--accent: #ff3333` (YouTube red — direct reference to the platform) |
| **Accent 2** | `--accent2: #cc0000` (darker red for borders/underlines) |
| **Ink** | `--ink: #f0f4f8` (near-white for headings) |
| **Secondary text** | `--sec: #94a3b8` (slate) |
| **Muted** | `--faint: #475569` |
| **Line** | `--line: rgba(255,51,51,.20)` (red-tinted) |
| **Line 2** | `--line2: rgba(255,51,51,.08)` |
| **Font** | `--corp: "Archivo","Segoe UI",system-ui,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Dot grid with horizontal scan lines (radar/scanner aesthetic).
```css
background-color: var(--bg);
background-image:
  radial-gradient(circle at 1px 1px, rgba(255,51,51,.12) 1px, transparent 1px),
  linear-gradient(rgba(255,51,51,.04) 1px, transparent 1px);
background-size: 28px 28px, 100% 3px;
```
The dot grid evokes a radar/scanner screen. The horizontal lines add a "scan" feel. Together: "we scan YouTube for hidden content."

**Hero section:**
- Full-width dark block (no image — CSS gradient).
- Background: `linear-gradient(180deg, #0f1729 0%, var(--bg) 100%)`.
- Subtle red radial glow at top: `radial-gradient(600px 300px at 50% 0%, rgba(255,51,51,.08), transparent 70%)`.
- Logo chip (🔍) centered at top of hero, 56px.
- H1 "UNLIST" — huge, bold, white, letter-spaced, uppercase. 3.6rem on desktop.
- Accent underline: 120px wide, red gradient, below title.
- Tagline: "See what YouTube doesn't show you." — slate, large, italic accent on "doesn't show you."
- Sub-tag: "A Chrome extension concept — scan channels for unlisted videos, search for hidden content by keyword."
- Draft pill: "Extension Concept · Draft".

**Content sections:**
1. **The idea** — H2 "Find hidden YouTube content." Lead paragraph. Card grid: what the extension does (scan channels, search keywords, filter by date/size, direct access, export results).
2. **How it works** — Two-column layout: left = scan modes (channel scan, keyword search); right = what you get (video list, metadata, direct link, export).
3. **Interactive demo** — A working demo (fake but functional): input field + mode toggle + "scan" button + results list. Shows the UI concept in action.
4. **Why unlisted matters** — Stat row: "Unlisted ≠ private" — unlisted videos don't appear in search but anyone with the link can watch. Many creators use unlisted for drafts, WIPs, private share links. This extension finds them.
5. **The name** — "UNLIST" — because the whole point is finding what's been unlisted.

---

### 2. DownloadHarvester — Freeware Ad Network & Bloatware Middleman

| Element | Value |
|---------|-------|
| **Logo emoji** | ⬇️ (download — "we harvest downloads") |
| **Logo chip** | 56px square, `--accent` (green) background, white emoji |
| **Primary colour** | `--bg: #0d1117` (GitHub-dark style — software feel) |
| **Secondary** | `--bg2: #161b22`, `--bg3: #21262d`, `--bg4: #2d333b` |
| **Accent** | `--accent: #3fb950` (green — "go", "download", "paid") |
| **Accent 2** | `--accent2: #2ea043` |
| **Ink** | `--ink: #f0f6f8` |
| **Secondary text** | `--sec: #8b949e` |
| **Muted** | `--faint: #484f58` |
| **Line** | `--line: rgba(63,185,80,.20)` |
| **Line 2** | `--line2: rgba(63,185,80,.08)` |
| **Orange accent** | `--orange: #d29922` (for the "bloatware" contrast — warm vs green) |
| **Orange 2** | `--orange2: #bb8009` |
| **Font** | `--corp: "Archivo","Segoe UI",system-ui,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Subtle file/download icon grid (software/SaaS feel).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M16 2 L16 18 M16 18 L10 12 M16 18 L22 12' stroke='%233fb950' stroke-width='1.5' fill='none' opacity='0.06'/%3E%3Cpath d='M6 24 L26 24 M6 24 L10 12 M26 24 L22 12' stroke='%233fb950' stroke-width='1' fill='none' opacity='0.03'/%3E%3C/svg%3E");
background-size: 32px 32px;
```
The SVG draws a download arrow icon repeated across the background. Subtle (low opacity). Evokes "downloads" without being literal.

**Hero section:**
- Background: `linear-gradient(180deg, #111c14 0%, var(--bg) 100%)`.
- Subtle green radial glow at top.
- Logo chip (⬇️) centered.
- H1 "DOWNLOADHARVESTER" — huge, bold, white.
- Accent underline: green.
- Tagline: "Freeware Ad Network & Bloatware Middleman." — with "Ad Network" and "Middleman" in green accent.
- Sub: "Think Google AdSense — but for software. Auto-detects downloads. Pays devs per download. Zero work on their end."
- Draft pill: "Software Platform · Concept Draft".

**Content sections:**
1. **Three products, one platform** — Three product cards (green/green/orange accents): Freeware Ad Network, Bloatware Middleman, Desktop Port of itch.io. Each with description, metric row, tag.
2. **How the bloatware middleman works** — End-to-end flow diagram (4 steps, horizontal on desktop, vertical on mobile): Dev packages → Download happens → Bloatware company pays → Dev gets paid. Arrows between steps.
3. **For developers** / **For bloatware companies** — Two cards side by side. What each side gets.
4. **The numbers** — Stat row: 10,000 developers, per-DL auto-pay, $0 work for devs, 100% slop filtered.
5. **Why this exists** — Short closing statement.

---

### 3. IdentityEngine — Digital Private Investigation & OPSEC

| Element | Value |
|---------|-------|
| **Logo emoji** | 🔎 (magnifying glass — investigation) |
| **Logo chip** | 56px square, `--accent` (steel blue) background, white emoji |
| **Primary colour** | `--bg: #0b0e14` (deep charcoal — serious, investigative) |
| **Secondary** | `--bg2: #10141c`, `--bg3: #181e28`, `--bg4: #202835` |
| **Accent** | `--accent: #4a8fb8` (steel blue — professional, forensic) |
| **Accent 2** | `--accent2: #356e94` |
| **Ink** | `--ink: #e8e6e0` (warm white — less clinical than pure white) |
| **Secondary text** | `--sec: #7a8593` |
| **Muted** | `--faint: #46505f` |
| **Line** | `--line: rgba(74,143,184,.16)` |
| **Line 2** | `--line2: rgba(74,143,184,.06)` |
| **Red accent** | `--red: #b8432a` (for "alert" / "findings" — used sparingly) |
| **Font** | `--corp: "Archivo","Segoe UI",system-ui,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Network node/connection pattern (investigation, surveillance, OSINT feel).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%234a8fb8' opacity='0.12'/%3E%3Ccircle cx='40' cy='15' r='1.5' fill='%234a8fb8' opacity='0.12'/%3E%3Ccircle cx='25' cy='40' r='1.5' fill='%234a8fb8' opacity='0.12'/%3E%3Ccircle cx='50' cy='45' r='1.5' fill='%234a8fb8' opacity='0.12'/%3E%3Ccircle cx='15' cy='50' r='1.5' fill='%234a8fb8' opacity='0.12'/%3E%3Cline x1='10' y1='10' x2='40' y2='15' stroke='%234a8fb8' stroke-width='0.5' opacity='0.06'/%3E%3Cline x1='40' y1='15' x2='25' y2='40' stroke='%234a8fb8' stroke-width='0.5' opacity='0.06'/%3E%3Cline x1='25' y1='40' x2='50' y2='45' stroke='%234a8fb8' stroke-width='0.5' opacity='0.06'/%3E%3Cline x1='25' y1='40' x2='15' y2='50' stroke='%234a8fb8' stroke-width='0.5' opacity='0.06'/%3E%3C/svg%3E");
background-size: 60px 60px;
```
The SVG draws 5 nodes connected by lines — a network graph. Evokes "investigation," "connections," "OSINT mapping." Subtle and professional.

**Hero section:**
- Background: `linear-gradient(180deg, #101a26 0%, var(--bg) 100%)`.
- Subtle blue radial glow at top.
- Logo chip (🔎) centered.
- H1 "IDENTITYENGINE" — huge, bold.
- Accent underline: steel blue.
- Tagline: "A fully digital private investigator." With "digital" and "private investigator" in accent.
- Sub: "OPSEC tools to legally find information on anyone. AI-assisted. No physical presence required."
- Meta tags row: Digital PI — fully remote | OPSEC — legal methods only | AI-Assisted — automated investigation | Red-Team — available.
- Draft pill: "Digital Investigation · Concept Draft".

**Content sections:**
1. **The idea** — H2 "Find anyone. Legally. Without leaving your desk." Lead paragraph.
2. **OPSEC methods** — Six capability cards in a 3×2 grid: people-search tools, social media image scanning, full profile building, node investigation, alt-account discovery (writing-style correlation), full report generation. Each with a tag.
3. **Need the source software** — Callout block: the writing-style correlation method referenced in the source video. Either partner or replicate.
4. **What IdentityEngine offers** — Three service cards: Digital Private Investigation (primary), Red-Team Cybersecurity (expansion), Legal & Authorized (positioning).
5. **The mission** — "Fill the world with justice and fairness." Three-column mission bar: Find, Verify, Report.
6. **The quote** — "We must fill the world with justice and fairness as it was filled with injustice and oppression." — from the notes.

---

### 4. Ophanim Financials — AI Debt Collection Agency (renamed from "Debt Engine")

| Element | Value |
|---------|-------|
| **Logo emoji** | 💰 (money bag — finance, debt, collection) |
| **Logo chip** | 56px square, `--accent` (gold) background, white emoji |
| **Primary colour** | `--bg: #0e0c0a` (warm near-black — finance, gravitas) |
| **Secondary** | `--bg2: #16120f`, `--bg3: #1e1915`, `--bg4: #26221d` |
| **Accent** | `--accent: #c9a84c` (gold — finance, value, serious money) |
| **Accent 2** | `--accent2: #a8892f` |
| **Ink** | `--ink: #e8e0d0` (warm cream-white) |
| **Secondary text** | `--sec: #9a8a72` (warm tan) |
| **Muted** | `--faint: #5a4e3e` |
| **Line** | `--line: rgba(201,168,76,.16)` |
| **Line 2** | `--line2: rgba(201,168,76,.08)` |
| **Red** | `--red: #b8432a` (for "debt" / "pressure" — used sparingly) |
| **Font** | `--corp: "Archivo","Helvetica Neue",Arial,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Subtle currency/finance motif (coins, bars, documents).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect x='8' y='8' width='24' height='16' rx='2' stroke='%23c9a84c' stroke-width='0.8' fill='none' opacity='0.07'/%3E%3Cline x1='12' y1='12' x2='28' y2='12' stroke='%23c9a84c' stroke-width='0.5' opacity='0.04'/%3E%3Cline x1='12' y1='16' x2='24' y2='16' stroke='%23c9a84c' stroke-width='0.5' opacity='0.04'/%3E%3Cline x1='12' y1='20' x2='20' y2='20' stroke='%23c9a84c' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
background-size: 40px 40px;
```
The SVG draws a document/receipt shape (rectangle with lines) — evokes invoices, debt documents, financial records. Subtle gold tint.

**Hero section:**
- Background: `linear-gradient(180deg, #18130c 0%, var(--bg) 100%)`.
- Subtle gold radial glow at top.
- Logo chip (💰) centered.
- H1 "OPHANIM FINANCIALS" — huge, bold, letter-spaced.
- Accent underline: gold gradient.
- Tagline: "AI Debt Collection Agency." With "AI" and "Debt Collection Agency" in gold accent.
- Sub: "AI calls people with debt obligations. Applies pressure tactics. Gets them to pay — anything they can. Offered to banks and finance companies."
- Meta tags: AI-Powered — automated calls | Pressure Tactics — get them to pay | B2B — offered to banks | Concept Draft.
- Draft pill: "Finance · Collections · Concept Draft".

**Content sections:**
1. **The idea** — H2 "AI calls people with debt. Applies pressure. Gets them to pay." Lead paragraph.
2. **How it works** — Three-step flow: Identify (AI has the debt list) → Call (AI calls the debtor, often, repeatedly) → Collect (AI gets them to pay anything they can).
3. **Two approaches** — Two cards: "Offered to banks and finance companies" (B2B service contract) and "Buy the debt. Collect it yourself." (debt purchase at discount). Each with description.
4. **Three service models** — Three detailed blocks: Service contract (we collect for you), Debt purchase (buy cheap, collect), Percentage split (we collect, you split). Each with "Best for:" line.
5. **Contract details** — Three contract rows: Service Fee (percentage of collected), Debt Purchase (discounted buyout), Percentage Split (split of collected).
6. **The AI** — Two cards: "Pressure tactics" (calling often, varying script, creating urgency) and "Adaptable" (learns what works, adjusts per debtor type).
7. **The numbers** — Stat row: AI-Driven Collection, 24/7 Calls, Any Amount (goal: collect what they can), 3 Models.
8. **Note on expansion** — "Expansion idea: eventually expand into finance ourselves — but the rule is no interest or debt. Something like KALSHI but 100% debt-free." (from notes — separate concept, mentioned for context).

---

### 5. ORPHANIM — Interest-Free Bank for Businesses

| Element | Value |
|---------|-------|
| **Logo emoji** | 🏦 (bank building — finance, banking, business) |
| **Logo chip** | 56px square, `--accent` (cyan) background, white emoji |
| **Primary colour** | `--bg: #081428` (deep navy — banking, trust, stability) |
| **Secondary** | `--bg2: #0d1d35`, `--bg3: #142748`, `--bg4: #1b3260` |
| **Accent** | `--accent: #00d4ff` (cyan — fintech, modern banking, digital) |
| **Accent 2** | `--accent2: #0099cc` |
| **Ink** | `--ink: #e6f3ff` (very light blue-white) |
| **Secondary text** | `--sec: #8aa8c8` |
| **Muted** | `--faint: #4a6580` |
| **Line** | `--line: rgba(0,212,255,.16)` |
| **Line 2** | `--line2: rgba(0,212,255,.06)` |
| **Gold accent** | `--gold: #ffd86a` (for "money" / "value" highlights) |
| **Font** | `--corp: "Archivo","Segoe UI",system-ui,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Geometric banking/architecture pattern (columns, structure, fintech).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect x='6' y='6' width='6' height='36' rx='1' fill='none' stroke='%2300d4ff' stroke-width='0.8' opacity='0.08'/%3E%3Crect x='18' y='6' width='6' height='36' rx='1' fill='none' stroke='%2300d4ff' stroke-width='0.8' opacity='0.08'/%3E%3Crect x='30' y='6' width='6' height='36' rx='1' fill='none' stroke='%2300d4ff' stroke-width='0.8' opacity='0.08'/%3E%3Cline x1='6' y1='18' x2='36' y2='18' stroke='%2300d4ff' stroke-width='0.5' opacity='0.04'/%3E%3Cline x1='6' y1='30' x2='36' y2='30' stroke='%2300d4ff' stroke-width='0.5' opacity='0.04'/%3E%3C/svg%3E");
background-size: 48px 48px;
```
The SVG draws three vertical columns (like a bank facade or courthouse) with two horizontal lines — evokes architecture, banking, structure, trust. Subtle cyan.

**Hero section:**
- Background: `linear-gradient(180deg, #0a1d38 0%, var(--bg) 100%)` with a top navy band.
- Subtle cyan radial glow at top.
- Logo chip (🏦) centered.
- H1 "ORPHANIM" — huge, bold. Note: ORPHANIM is the name for the finance/banking concept (renamed from the earlier "Debt Engine" concept, but this is the broader "interest-free bank for businesses" idea).
- Accent underline: cyan gradient.
- Tagline: "An interest-free bank for businesses." With "interest-free" and "bank for businesses" in cyan accent.
- Sub: "We lend to businesses that can't get traditional financing. 3% equity, 0% interest. AI trading on the spread. Tax and accounting built in. Debt collection when needed. Everything under one roof."
- Meta tags: Interest-Free — 0% APR | 3% Equity Model | AI-Powered Trading | Business Banking.
- Draft pill: "Finance · Banking · Concept Draft".

**Content sections:**
1. **The idea** — H2 "Finance for businesses that banks won't touch." Lead paragraph.
2. **What ORPHANIM does** — Six cards: Interest-free business loans (3% equity, 0% interest), AI trading (automated strategies on the spread), Tax and accounting (built-in, same platform), Debt collection (internal — same company, no third party), Tax-free LLC setup (handle for clients), AI call center (lead generation, outreach — separate from debt collection).
3. **How lending works** — Two cards: "The deal" (3% equity, 0% interest, AI trading on the spread, profit from trading not interest) and "Why 3%" (enough to make it worth it, not predatory, businesses keep their cash flow).
4. **AI trading** — Two cards: "The engine" (automated trading strategies, runs on the spread between what's lent and what's collected, profit from market movement not interest) and "Why it matters" (allows 0% interest — the profit comes from trading, not from charging businesses).
5. **Debt collection — internal** — Note: ORPHANIM handles its own bad debt internally. This is separate from Ophanim Financials (the AI debt collection agency offered to banks). ORPHANIM collects its own debts; Ophanim Financials collects for others.
6. **The numbers** — Stat row: 0% APR, 3% Equity, AI-Powered, All-in-One.
7. **Why ORPHANIM** — Closing statement.

---

### 6. MARKUP — Men's Grooming / Looksmaxxing

| Element | Value |
|---------|-------|
| **Logo emoji** | 💄 (makeup/moisturizer — grooming, but masculine context) |
| **Logo chip** | 56px square, `--accent2` (pink) background, white emoji |
| **Primary colour** | `--bg: #1a0a0e` (deep rose-black — masculine but beauty-adjacent) |
| **Secondary** | `--bg2: #251018`, `--bg3: #2f1820`, `--bg4: #3a2028` |
| **Accent** | `--accent: #ff6b9d` (pink — beauty, grooming, but still bold) |
| **Accent 2** | `--accent2: #e8457a` |
| **Ink** | `--ink: #fce4ec` (very light pink-white) |
| **Secondary text** | `--sec: #c9a0b0` |
| **Muted** | `--faint: #6b4a55` |
| **Line** | `--line: rgba(255,107,157,.18)` |
| **Line 2** | `--line2: rgba(255,107,157,.08)` |
| **Silver accent** | `--silver: #c0c0c0` / `--silver2: #a0a0a0` (for "masculine" contrast — metal, tools, excercisers) |
| **Font** | `--corp: "Archivo","Segoe UI",system-ui,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Subtle makeup brush / cosmetic tool pattern (beauty, grooming).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Cpath d='M18 4 L18 22 Q18 28 12 28 Q6 28 6 22 L6 10 Q6 4 18 4' fill='none' stroke='%23ff6b9d' stroke-width='1' opacity='0.06'/%3E%3Ccircle cx='18' cy='22' r='3' fill='%23ff6b9d' opacity='0.04'/%3E%3C/svg%3E");
background-size: 36px 36px;
```
The SVG draws a simplified makeup brush shape (handle + bristles) — evokes grooming, cosmetics. Subtle pink.

**Hero section:**
- Background: `linear-gradient(180deg, #2a1018 0%, var(--bg) 100%)`.
- Subtle pink radial glow at top.
- Logo chip (💄) centered.
- H1 "MARKUP" — huge, bold. Note: MARKUP is the name — a play on "makeup" but for men. Masculine framing of cosmetic products.
- Accent underline: pink gradient.
- Tagline: "Makeup — for men." With "Makeup" and "for men" in pink accent.
- Sub: "Light, invisible, comfortable. Products that make you look better without anyone knowing you're wearing them. Haircolour gel in every colour. Jaw and neck exercisers. Dropshipped until we make our own."
- Draft pill: "Men's Grooming · Concept Draft".

**Content sections:**
1. **The idea** — H2 "Makeup that doesn't look like makeup." Lead paragraph.
2. **Haircolour gel** — Product card: "Colourgel" — haircolour gel in every colour including black. For guys with hairloss. Apply to hair, makes it look thicker, covers bald spots and thin areas. Barely feels it. Dry, doesn't rub off. Good for hair and skin. Like makeup but actually healthy. Drop-ship until we make our own formula.
3. **Jaw & neck exercisers** — Product card: "Jawline" — jaw and neck exercisers, dropshipped. For the looksmaxxing audience. Physical tools for facial definition.
4. **The audience** — Two cards: "Who this is for" (men who want to look better but don't want to wear obvious makeup — looksmaxxing community, young modern men) and "The positioning" (makeup but healthy, masculine, invisible. Not obvious. Not feminine. Just better-looking hair and skin without anyone knowing).
5. **Dropship-first** — Note: both products are dropshipped at first. The real strategy is to make it look like a professional company with a clean idea and sales pitch. Build the brand and presentation first, then move to own manufacturing later.
6. **Marketing** — Note: TikTok and Hermes agents as marketing channels for dropship ventures.

---

### 7. ALLSEER WIKI — Free Knowledge Base

| Element | Value |
|---------|-------|
| **Logo emoji** | 📚 (books — knowledge, wiki, documentation) |
| **Logo chip** | 56px square, `--accent` (blue) background, white emoji |
| **Primary colour** | `--bg: #0b0d13` (deep slate — knowledge, documentation, reading) |
| **Secondary** | `--bg2: #111520`, `--bg3: #171c28`, `--bg4: #1d2330` |
| **Accent** | `--accent: #7bc0e8` (sky blue — open, knowledge, wiki) |
| **Accent 2** | `--accent2: #4a8fb8` |
| **Ink** | `--ink: #ece9e0` (warm white) |
| **Secondary text** | `--sec: #8b93a3` |
| **Muted** | `--faint: #4a5260` |
| **Line** | `--line: rgba(123,192,232,.12)` |
| **Line 2** | `--line2: rgba(123,192,232,.06)` |
| **Font** | `--corp: "Archivo","Helvetica Neue",Arial,sans-serif` |
| **Mono** | `--mono: "Archivo","Courier New",monospace` |

**Background pattern:** Book pages / document lines pattern (wiki, documentation, knowledge).
```css
background-color: var(--bg);
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect x='4' y='4' width='24' height='24' rx='1' fill='none' stroke='%237bc0e8' stroke-width='0.8' opacity='0.06'/%3E%3Cline x1='8' y1='10' x2='24' y2='10' stroke='%237bc0e8' stroke-width='0.3' opacity='0.03'/%3E%3Cline x1='8' y1='14' x2='22' y2='14' stroke='%237bc0e8' stroke-width='0.3' opacity='0.03'/%3E%3Cline x1='8' y1='18' x2='20' y2='18' stroke='%237bc0e8' stroke-width='0.3' opacity='0.03'/%3E%3Cline x1='8' y1='22' x2='24' y2='22' stroke='%237bc0e8' stroke-width='0.3' opacity='0.03'/%3E%3C/svg%3E");
background-size: 32px 32px;
```
The SVG draws a document/page rectangle with text lines inside — evokes a wiki page, documentation, reading. Subtle blue.

**Hero section:**
- Background: `linear-gradient(180deg, #101824 0%, var(--bg) 100%)`.
- Subtle blue radial glow at top.
- Logo chip (📚) centered.
- H1 "ALLSEER WIKI" — huge, bold.
- Accent underline: blue gradient.
- Tagline: "A free knowledge base." With "free knowledge base" in blue accent.
- Sub: "Everything made free first. Then, every month, one of the ideas becomes real."
- Meta tags: Free First — always | Open Source — repackaged | Wiki Format — clean pages | Concept Draft.
- Draft pill: "Knowledge Base · Concept Draft".

**Content sections:**
1. **The idea** — H2 "Make every idea free. Then pick one to make real each month." Lead paragraph.
2. **What's in the wiki** — Four category cards: Software & Apps, Hardware & Physical, Finance & Business, Security & Investigation. Each with description and tag.
3. **The model** — Two sections: "The monthly cadence" (4-step grid: document → repackage → add logo/website → make real) and "How ideas get combined" (combine many open-source projects into one full application, add MCP tools, give it a single brand and clean website).
4. **Closing** — Short statement.

---

## Implementation Notes

- **No external image dependencies.** All logos are emoji characters rendered in styled chips. All background patterns are inline SVG data URIs. Hero sections use CSS gradients. This means every page is self-contained — no broken image links, no missing assets.
- **Responsive.** All grids collapse to single column under 640px. Stat rows go to 2 columns. Flow diagrams stack vertically.
- **Scrollbar.** Custom 10px scrollbar with page accent thumb. Matches the dark theme.
- **Selection colour.** Page accent on selection — small detail that reinforces identity.
- **Font stack.** Archivo (Google Font, loaded via @import in a real deployment) falls back to Segoe UI / system-ui. For concept drafts, system fonts are fine — Archivo is mentioned in the CSS but doesn't need to load for the concept to look right.
- **Pace.** Each page is 250–350 lines of HTML. Enough to feel complete, not bloated.
- **Charity pledge.** Every page carries the 20% pledge bar. It's part of the ALLSEER identity.
