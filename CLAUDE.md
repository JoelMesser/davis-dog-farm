# CLAUDE.md

Website for Davis Dog Farm Inc., a small foster-based dog rescue in Grantville, PA. It's a static Astro 7 site deployed to Cloudflare Pages from `master`. The main audience is people on phones arriving from Facebook: would-be adopters, fosters and donors, many of them older. README.md covers the layout and common edits. This file covers what isn't obvious from the code.

## Commands

```sh
npm run dev       # http://localhost:4321
npm run build     # must pass before any commit
npm run preview   # serves dist/. In Astro 7 this starts a background daemon;
                  # stop it with `npx astro preview stop`
```

There's no test suite. Verify changes by building and looking at the rendered pages at desktop (1280px) and phone (390px) widths.

## Where things live

- `src/data/site.ts`: the single source for email, address, PayPal, Facebook, Petfinder, the policies doc, and all ShelterManager URLs. Never hard-code these in pages. Import them.
- `src/layouts/Base.astro`: head, header/nav (the `nav` array), footer.
- `src/components/Adoptables.astro`: the adoptable-dogs list. See "ShelterManager embed" below.
- `src/styles/global.css`: all styles except the embed's. The header comment lists the reusable classes (`.section`, `.split`, `.actions`, `.note`, …). Reuse them before adding new ones. Don't add inline `style=""`.
- `public/_redirects`: maps old GoDaddy URLs to new pages. It references section ids like `/get-involved/#wish-list`, so don't rename section ids without updating it.

## ShelterManager embed

The dog list is **not** stored in this repo. ShelterManager's script (`adoptablesScriptUrl`) carries the live animal data and renders the list in the browser on `window.load`. This is deliberate: rescue staff update dogs in ShelterManager and the site follows without a rebuild. Don't replace it with a build-time fetch.

- It's configured through global `var asm3_adoptable_*` variables, which must be defined before the script tag.
- Its styles are in a `<style is:global>` block in the component. They target ShelterManager's undocumented `asm3-*` classes and DOM order, and use a few `!important`s to beat its inline styles.
- A `MutationObserver` in the component patches its output (aria-labels on the filter selects, empty alt on thumbnails, lazy-loading). Keep it: without it axe reports a critical violation.
- The `min-height: 100svh` on `.adoptables` keeps layout shift at zero while the list loads.
- A plain HTML list (`adoptablesPageUrl`) is the `<noscript>` fallback.

## Images

- Photos go in `src/assets/images/` and are used through `astro:assets` `<Image>`, never a raw `<img>` pointing at `/images/…`.
- Set `width` to about 2× the largest rendered size (line-up 450, story 520, memorial 360, split sections 800). Height is inferred.
- `<Image>` lazy-loads by default. Add `loading="eager"` for above-the-fold images, and `fetchpriority="high"` for the first hero photo.
- Every photo gets a descriptive `alt`. Use `alt=""` only when the adjacent text already names the image, or for a logo that sits next to the site name.
- `sharp` is an explicit dependency on purpose: Astro only lists it as optional, and the Cloudflare build needs it.

## Content rules

- All facts about the rescue (fees, policies, clearances, dog stories, hours, address) come from the rescue's original site or from the rescue itself. **Don't invent claims.** For example, don't say fosters' costs are covered or donations are tax-deductible unless the rescue has said so.
- Copy is plain, warm and short. Use sentence case and active voice. Button text says what happens ("Apply to foster", "Donate with PayPal").
- Directed donations work through a PayPal note keyword ("Hope for Healing", "training", "wish list", "in memory of"). Keep that wording consistent across pages.
- The rescue's contact person reviews content. Flag anything uncertain (like which photo belongs to which dog) rather than guessing silently.

## Design rules

- Palette tokens are at the top of `global.css`. Hay yellow (`--hay`) is only for Donate. Headings use Zilla Slab 700, body text Public Sans, both self-hosted through the `fonts` config in `astro.config.mjs`. Don't add Google Fonts `<link>` tags.
- Keep the one entrance animation (the hero line-up) and respect `prefers-reduced-motion`. Don't add scroll or hover animations.
- Numbered markers appear only where the content really is a sequence (the adoption steps).

## Quality bar

These results were verified on 2026-09-26. Re-check after layout or component changes:

- **axe-core** (WCAG 2.2 AA + best-practice), all 5 pages at 1280px and 390px: 0 violations. Test the adopt page after the list has rendered (wait for `.asm3-adoptable-item`).
- **Lighthouse:** accessibility, best practices and SEO at 100. Performance ≥ 95 on the mobile preset, CLS 0.
- No horizontal scrolling at 390px. The line-up is the only sideways scroller, and it's keyboard-focusable (`tabindex="0"`, `role="region"`).
