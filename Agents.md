# Agent Guidelines for Tourino Client Panel

## 1. Package Manager

- **Always use `pnpm`** (`pnpm build`, `pnpm start`, `pnpm add`, `pnpm remove`).
- Do NOT use `npm` or `yarn`. The project uses `pnpm-lock.yaml` with symlinked node_modules.

## 2. Fallow & Static Analysis Policy

- **On-demand only:** Only invoke `fallow` or `fallow-review` when the developer **explicitly asks** for an audit, health check, or PR review.
- **No unprompted gating:** Do NOT run `fallow` in the background or during regular feature development, bug fixing, or UI styling.
- **Exercise Caution When Requested:** If and only if the developer explicitly asks to run `fallow`, exercise deep caution before treating any finding as an actionable issue. Avoid perfectionism or over-engineering that risks breaking working features, UI styling, or code quality.

## 3. Code Integrity & Practicality

- Prioritize stability, readability, and working functionality over automated scoring numbers.
- Preserve existing public API contracts, component props, and export signatures so callers are never broken.

## 4. Software Engineering Principles

- Write clean, readable, maintainable, and reusable code.
- Consistently apply SOLID, DRY (Don't Repeat Yourself), YAGNI (You Aren't Gonna Need It), SoC (Separation of Concerns), KISS (Keep It Simple), and other relevant software engineering principles.
- Keep functions, components, and modules focused, with clear responsibilities and explicit dependencies.
- Reuse shared logic where it serves a real need; avoid premature abstractions, speculative features, unnecessary layers, and overengineering.
- Treat these principles as firm standards while choosing the simplest design that meets current requirements and preserves working behavior.

After implementing changes, present the changed files, relevant diffs, and test results. Leave changes uncommitted for my review. Do not commit, push, deploy, or apply database migrations until I explicitly approve that step.

## 5. UI/UX Design Consistency

- **Design system first:** Whenever fixing, adding, or enhancing any UI, the existing project design language must be followed consistently across the entire project — including colors, themes, typography/fonts, spacing, layouts, components, icons, shadows, and animations. Do not introduce one-off styles that diverge from the established look and feel.
- **Use the defined theme tokens:** Reuse the design tokens already configured in the project (e.g., the `dojo`, `crimson`, `gold`, `teal` color palettes, `glass` shadows/blur, and `iran-sans`/`lalezar` font families defined in `tailwind.config.ts` and `src/app/fonts.ts`). Prefer shared components from `src/components/ui` and existing layout wrappers in `src/layouts` over creating new, visually inconsistent variants.
- **Mobile-first and responsive:** All designs must be built mobile-first and verified to work gracefully across breakpoints (mobile, tablet, desktop). Consider touch targets, readable text sizes, and usable layouts on small screens. Respect RTL layout conventions for the Persian (`fa`) pages and LTR for English (`en`) pages.
- **Adhere to UI/UX standards:** Follow established UI/UX best practices consistent with the application theme: clear visual hierarchy, sufficient contrast and accessibility, consistent states (hover, focus, active, disabled, loading, error, empty), predictable navigation, and feedback for user actions.
- **Consistency check before handoff:** Before presenting UI changes, review them against existing screens/components to confirm colors, fonts, spacing, and patterns match the rest of the application. Any new design token or pattern must be justified and integrated into the shared theme rather than hardcoded locally.

## Test-Driven Development and Regression Testing

- Develop behavior changes and bug fixes alongside meaningful unit and integration tests. Use `pnpm` for all test commands.
- For bug fixes, first add a regression test that reproduces the reported failure. Confirm it fails for the expected reason, implement the fix, then confirm it passes.
- For new behavior, define the expected contract in tests before implementing it where practical.
- Review relevant existing tests during development. Update outdated expectations only when the intended behavior changes; never weaken assertions just to make tests pass.

### Project commands

- Build: `pnpm build`
  Review test coverage relevant to each change as part of normal development.
  This does not authorize running `fallow` or `fallow-review`; their existing
  explicit-request policy still applies.

## 6. Commit Conventions and Workflow

- Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `<type>[optional scope]: <description>`.
- Use `feat` for new features, `fix` for bug fixes, and appropriate types such as `refactor`, `test`, `docs`, `chore`, `build`, `ci`, or `perf` for other changes. Write concise, specific descriptions.
- Mark breaking changes with `!` before the colon or a `BREAKING CHANGE:` footer. Add a body when needed to explain the reason or consequences.
- Inspect recent commit history and statistics before organizing commits. Match the repository’s typical scope and size while prioritizing logical cohesion. Avoid both excessive tiny commits and oversized commits containing unrelated work.
- Every change must belong to its specific, logically appropriate commit. Each commit must serve one coherent purpose. Keep related implementation, tests, and necessary documentation together; separate unrelated changes, including by staging individual hunks when needed.
- Keep each commit independently understandable and functional. Do not separate tightly coupled changes in a way that creates broken intermediate states.
- Review the working tree and staged diff before every commit. Stage deliberately, verify every included change, and exclude credentials, local environment files, database backups, and unintended generated files.
- Preserve unrelated work unless explicitly authorized to include it. When asked to commit all current project changes, include authorized changes regardless of who created them, organized by purpose.
- Run relevant checks using `pnpm`. Report failures or unavailable checks honestly; never claim validation that was not performed.
- Present changed files, relevant diffs, and test results for review. Leave changes uncommitted until explicitly authorized to commit. Commit authorization does not authorize pushing, deploying, applying database migrations, or rewriting existing history.
- After committing, report each commit’s hash and purpose, validation results, and any remaining uncommitted changes.

## 7. SEO & Server-Side SEO Standards

All SEO must be handled **server-side** through the Next.js App Router (Metadata API, route handlers, and Server Components). Never rely on client-only DOM manipulation for indexing. Every user-facing, indexable route must satisfy the checklist below.

### Centralized I18N & SEO layer (single source of truth)

A reusable layer already exists — **build on it, do not hand-roll locale/metadata/schema logic per page**. When adding or overhauling any page or feature, adapt the feature to this infrastructure (not the other way around):

- `src/lib/i18n/config.ts` — the locale registry and URL model: default locale `fa` served at `/` (no prefix), every other locale prefixed (`/en`, and future `/ar`, etc.). Exposes `localeConfig`, `localizePath`, `parseLocale`, `absoluteUrl`, `nextLocale`, `hreflangAlternates`, `siteUrl`, and the locale-cookie contract (`LOCALE_COOKIE`, `LOCALE_COOKIE_MAX_AGE`, `isLocale`, `localeCookie`). **Adding a language = add a dictionary in `src/lang`, a route folder, and one entry in `localeConfig`** — never duplicate locale logic in components, pages, or middleware.
- `src/lib/seo/metadata.ts` — `buildMetadata(...)` is the **only** sanctioned way to produce per-page metadata (canonical, hreflang alternates, OpenGraph, Twitter, noindex); `buildCourseMetadata(locale, course)` is the course-detail specialization shared by both locale routes. Route `generateMetadata()` implementations must call one of them.
- `src/lib/seo/schema.ts` — typed JSON-LD builders (`websiteSchema`, `organizationSchema`, `siteSchema`, `breadcrumbSchema`, `courseSchema`, `itemListSchema`, `articleSchema`, `faqSchema`). Never write raw schema objects inline.
- `src/components/seo/JsonLd.tsx` — renders schema server-side; `src/components/seo/SiteSchema.tsx` already injects `WebSite` + `Organization` in both root layouts (do not repeat it per page).
- Locale-aware URL switching is centralized: `LanguageSwitcher` and `middleware.ts` read from the i18n config — extend the config, do not add new prefix logic.

### Metadata (per route)

- Every route exports either a static `metadata` object or an async `generateMetadata()`. Dynamic pages (e.g. `courses/[courseId]`) **must** use `generateMetadata()` so title/description/canonical are content-specific — never let a public page silently fall back to the layout defaults.
- **Title**: follow the root `template` (`%s | <site>`); keep under ~60 chars. **Description**: unique per page, under ~160 chars.
- Always set `metadataBase` (already configured in the `fa`/`en` layouts). Set `alternates.canonical` on every page and `alternates.languages` (hreflang) for the `fa` / `en` / `x-default` variants via `buildMetadata` + `hreflangAlternates` — do not handcraft them. To keep hreflang reciprocal and valid, only list locales in `availableLocales` for which that exact page actually exists (e.g. a Persian-only page passes `["fa"]`). The site is bilingual today and multi-locale by design: Persian pages are RTL, English LTR — `<html lang>`/`dir` come from `localeConfig`.
- Provide full `openGraph` (title, description, absolute `url`, `siteName`, `locale`, relevant `type`, 1200×630 image) and `twitter` card metadata on every indexable page. Course detail pages should use the course image, not the generic logo, for OG.
- Keep all SEO copy (titles, descriptions, keywords) in `src/lang/{fa,en}.ts` as the single source of truth; do not hardcode strings inside page metadata.
- Apply `robots: { index: false, follow: false }` (noindex) to non-public routes: `auth`, `profile`, `payment`, admin. Only pages that are genuinely indexable may appear in the sitemap.

### Structured data (JSON-LD / schema.org)

- Emit JSON-LD via `src/components/seo/JsonLd.tsx` using the builders in `src/lib/seo/schema.ts` — do not scatter raw JSON across pages. `WebSite` + `Organization` are already injected site-wide by `SiteSchema` in the root layouts.
- Required schema coverage: `WebSite` + `Organization` at the site level (root layout), and `Course` (with provider, image, offers/price, inLanguage) plus `BreadcrumbList` on course detail pages; add `FAQPage`/`Event` where relevant.
- Always use absolute URLs derived from `metadataBase`/`NEXT_PUBLIC_SITE_URL` inside JSON-LD, and validate output with Google's Rich Results Test.

### Sitemaps & robots

- Maintain the Metadata-Route files `src/app/sitemap.ts` (dynamic entries + hreflang `alternates`, with a sensible `revalidate`) and `src/app/robots.ts` (allow public areas, disallow private areas, and reference the sitemap URL). Build all sitemap URLs and hreflang through the i18n config (`localizePath`/`hreflangAlternates`), not string concatenation. As content types multiply (articles, categories, videos), split into a sitemap index (`sitemap-courses.ts`, `sitemap-articles.ts`, …) with `robots.ts` pointing at the index.
- New public routes must be added to the sitemap and made consistent with `robots.ts` allow/disallow rules. A page in the sitemap must never be `noindex`\'d, and a disallowed path must never appear in the sitemap.

### Technical & performance SEO

- Prefer Server Components and SSG/ISR; ensure `generateStaticParams` covers dynamic routes so crawlers get fully-rendered HTML.
- Use `next/image` with proper `alt`/`sizes`, semantic HTML, exactly one `<h1>` per page, and descriptive link text. Avoid blocking content on the main thread.

### Server-first rendering & bilingual SSR safety

**Server-first is the default.** Pages and layouts should be Server Components that render their content, data, and state on the server (server data fetching, route-derived locale, server-rendered HTML). Client components (`"use client"`) are an **opt-in exception** used only for genuinely interactive islands (buttons, forms, cart, toggles). A `"use client"` island is still server-rendered — that is fine — but it must not be the source of page content or first-paint state. Enforce:

- **Content & state live on the server.** Fetch and render page content and initial state in Server Components (like `CoursesPageView`). Do not move whole pages/content to the client just for convenience; wrap only the small interactive leaf in `"use client"` and pass data via props.
- **Served HTML language must match the URL locale.** Any text in the initial (pre-hydration) render on an indexable route must come from `lang[locale]` where `locale` is derived from the **route**, never from a persisted browser default. Keep the `locale ? lang[locale] : storeT` pattern only where a locale prop is guaranteed; otherwise derive locale server-side.
- **Never gate indexable content behind `useEffect`/post-mount fetches.** Social/OG scrapers and non-JS crawlers read raw HTML; public/demo content must be in that HTML. Gated (paid) content stays client-side and is `noindex`\'d.
- **Locale source of truth is the URL (content) and the cookie (app).** Keep `Providers`/`syncLanguage` for client interactivity. `useLanguageStore()` is request-aware: on the **server** it returns the locale that `Providers` published through `src/lib/i18n/requestLocale.tsx` (per-request React context — the route locale, or the cookie on app routes), and in the **browser** it returns the live store so a toggle re-renders instantly. Never reintroduce a store that resolves to `fa` during SSR, and never seed the module-level store per request (it is a process singleton and would leak between concurrent requests).

### Two-tier i18n routing: locale-split content vs locale-agnostic app

Routes fall into exactly one of two categories; pick the treatment by whether the page needs server-rendered, indexable, locale-specific content:

- **Content / SEO pages** (`/`, `/courses`, `/courses/[courseId]` and their `/en` twins): **locale-split routes** that are thin per-locale files passing the **server locale** into **shared components** (`locale ? lang[locale] : storeT`). They are "separated but not duplicated" — the route splits to derive locale, the component is reused. Use `isContentRoute(pathname)` to detect them.
- **Interactive / gated app pages** (`auth`, `payment`, `profile`, admin): a **single locale-agnostic source** under the `(app)` route group (URLs without a locale prefix). They are **not** mirrored per locale. Their layout renders `Providers`/`Navbar`/`Footer`/`MobileBottomNav` with **no `locale` prop**, so those components stay store-driven; on the server the store hook resolves the locale from the cookie via `RequestLocaleProvider`, and in the browser it follows the user's toggled language. These pages are `noindex`.
- **Language switcher rule:** always flip the store; **only rewrite the URL** (`localizePath`) when `isContentRoute` is true. On app routes it must stay on the same path (no `/en/profile` — that route does not exist and would 404). App-route links in `Navbar`/`MobileBottomNav` and middleware redirects therefore use neutral paths (`/auth/login`, `/profile`).

### Locale preference: the cookie is the single source of truth

`LOCALE_COOKIE` (`language`) is the **only** persisted locale — nothing else (not `localStorage`) may store one. `useLanguageStore` is a client **mirror** of that cookie (reads it on init, writes it in `setLanguage`) and `getServerLocale()` reads it on the server for the URL-less app routes.

`Providers` also publishes that locale as a per-request React context (`src/lib/i18n/requestLocale.tsx`). Server-rendered text, `dir` decisions and `<html dir>` must come from it, because the store cannot read the request on the server: reading only the store made English auth pages ship Persian HTML and then flip on hydration (React text-mismatch errors). `setLanguage` mirrors the new locale onto `<html lang/dir>` so text and direction flip together, without waiting for the refresh.

`middleware.ts` (`syncLocaleWithUrl`) keeps the cookie and the URL equal, for content routes only:

- **Prefixed URL** (`/en…`) → the response sets the cookie to that locale, so browsing a language makes it the preference.
- **Unprefixed URL** (the default locale at `/`) → if the cookie asks for a different locale, respond `307` to its prefixed twin, preserving search params. Always 307, never 308: the target depends on a cookie.
- **App routes** (`/auth`, `/payment`, `/profile`) are never redirected — they carry no locale by design.
- **Cookie-less requests** (crawlers, first visits) get the canonical unprefixed URL with no `Set-Cookie`, so indexing and hreflang keep reflecting the URL alone.
- Choosing Persian writes `fa`, which maps back to `/`, so the redirect can never bounce the user to `/en`.

Consequence: **every content route must exist in every locale** (`/courses/[courseId]` ↔ `/en/courses/[courseId]`). Adding an indexable route without its twin breaks this invariant and 404s for users whose cookie points at the missing locale.

### No hardcoded strings (i18n is mandatory)

- **All user-facing text must come from the centralized i18n dictionaries** in `src/lang/{locale}.ts`, selected via the route locale. Hardcoded literals (e.g. Persian strings written directly into JSX or a `siteName`) are not acceptable anywhere, because they bypass i18n and cannot be localized or used for correct-language SSR/SEO.
- This also applies to content-driven pages: course detail, articles, etc. must not inline locale-specific labels; pull them from `lang[locale]`. Add new keys to the dictionary for every locale, not just `fa`.
- Shared, locale-independent values (site name, URL, hreflang, direction) live in `src/lib/i18n/config.ts` (`localeConfig`); do not re-declare them in layouts or components.

### Pre-handoff SEO checklist

Confirm for every UI/route change: (1) `metadata`/`generateMetadata` present, page-specific, and built with `buildMetadata`; (2) canonical + hreflang set via the i18n config; (3) OG + twitter cards; (4) JSON-LD structured data via `src/lib/seo/schema.ts` where the page is content-bearing; (5) added to sitemap; (6) `robots.ts` and noindex consistent with the page\'s public/private status; (7) **all user-facing text sourced from `src/lang` (zero hardcoded strings)**; (8) SSR HTML renders in the URL\'s language (no store/localStorage dependency for first paint).

## 8. UI Performance & Rendering (GPU-Aware) Standards

These rules apply to **all UI** across the project — landing, courses, course detail, articles/news, forms, shared components — not just the landing page. They apply whenever fixing, adding, or overhauling any interface.

- **Why (context):** GPU hardware acceleration is enabled by default and is good — modern effects should use it freely. The concern is only that certain effects (backdrop-blur, large `filter: blur()`, `background-attachment: fixed`, animated transforms, big glows) are _entirely_ GPU-dependent, so when it is unavailable the UI becomes laggy. The goal is that our UI must not depend **completely** on the GPU: prefer effects that stay smooth and degrade gracefully, while still using GPU acceleration normally. This is not a rule to avoid the GPU.
- **`backdrop-blur` budget:** `backdrop-filter: blur` is the single most expensive effect. Use it sparingly (hero/critical surfaces only), never repeatedly down a long scroll. Prefer a semi-transparent solid fill (e.g. `bg-slate-950/70`) over glass blur on secondary cards and rows.
- **Glow effects:** Replace large blurred pseudo-element glows (`blur-2xl` / `blur-3xl` divs) with cheap `radial-gradient(...)` glows or a static asset. Avoid `filter: blur()` over large areas.
- **No `bg-fixed`:** Do not use `background-attachment: fixed` (as currently used in `src/layouts/BackgroundImage.tsx`). Use an absolutely-positioned layer or a `transform`-based parallax so scrolling does not force a full-viewport repaint.
- **Animation discipline:** Prefer animating `transform`/`opacity` over layout properties. Keep entrance/`whileInView` animations short and limited in count, and gate non-essential motion behind `prefers-reduced-motion`. Avoid animating scale/transform on full-viewport background layers.
- **Shadows:** Limit large-radius glow `box-shadow` and `filter: drop-shadow` on big/headline text; use them on small focal elements only.
- **Images:** Do not set `unoptimized` on `next/image` without a reason; supply proper `sizes`/dimensions so full-size images are not decoded and painted each frame.
- **Layer promotion:** Use `will-change` / GPU hints sparingly and only where an element genuinely animates; never globally.
- **Verification:** When overhauling UI, sanity-check smoothness under CPU throttling in DevTools (and optionally with hardware acceleration disabled) to confirm the page degrades gracefully, and avoid regressions versus current behavior.
