# Davis Dog Farm website

The website for [Davis Dog Farm Inc.](https://davisdogfarm.com), a foster-based, all-breed 501(c)(3) dog rescue in Grantville, PA. It replaces the rescue's old GoDaddy Website Builder site.

It's a fully static [Astro](https://astro.build) site, hosted on Cloudflare Pages.

## Quick start

Requires Node 22.12 or newer (`.node-version` pins 24).

```sh
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
```

## Project layout

```
src/
  pages/                 one file per page; the file name becomes the URL
    index.astro          /
    adopt.astro          /adopt/
    get-involved.astro   /get-involved/
    hope-for-healing.astro /hope-for-healing/
    about.astro          /about/
  layouts/Base.astro     <head>, header + nav, footer, shared by every page
  components/
    Adoptables.astro     live adoptable-dogs list (ShelterManager embed)
  data/site.ts           email, address, donation and application links
  styles/global.css      all site styles; conventions documented at the top
  assets/images/         photos; resized and converted to WebP at build time
public/                  copied to the site as-is
  _redirects             old GoDaddy URLs → new pages (Cloudflare Pages)
  favicon.png, apple-touch-icon.png
astro.config.mjs         site URL and self-hosted font setup
```

## How the site gets its content

| Content | Where it lives | Who updates it |
| --- | --- | --- |
| Adoptable dogs (names, photos, details) | The rescue's [ShelterManager](https://sheltermanager.com) account `ah2716` | Rescue staff, in ShelterManager. The site picks up changes on its own, with no rebuild |
| Adoption, foster and volunteer applications | ShelterManager online forms 32, 42 and 45 | Rescue staff, in ShelterManager |
| Donations | PayPal hosted button `BNYCE2ETKYDN6` | Rescue's PayPal account |
| Events | The rescue's Facebook page | Rescue staff, on Facebook |
| Everything else (text, fees, Hope for Healing stories, memorial wall, partners) | This repo | A developer: edit, commit, push |

The adoptable-dogs list is ShelterManager's own embed script, loaded in the visitor's browser. `src/components/Adoptables.astro` configures it, restyles its markup to match the site, and patches a few accessibility gaps (labels on its filter dropdowns, alt text, lazy-loaded photos). If ShelterManager changes its markup and the list suddenly looks unstyled, start there.

## Common edits

- **Change the email, address, PayPal button or a form link:** edit `src/data/site.ts`. Every page reads from it.
- **Change page text:** edit the page in `src/pages/`. Page bodies are plain HTML.
- **Change adoption fees:** they're in the table in `src/pages/adopt.astro`.
- **Add a photo:** put the file in `src/assets/images/`, import it at the top of the page, and use `<Image src={name} alt="…" width={800} />`. Set `width` to about twice the largest size it's displayed at. Astro produces the resized WebP. Give every photo a real description in `alt`.
- **Add a Hope for Healing recipient:** copy an `<article class="story">` block in `src/pages/hope-for-healing.astro`.
- **Add a pet to the memorial wall:** add a `<figure>` to `.memorial` in `src/pages/get-involved.astro`.
- **Add a page:** create `src/pages/name.astro` wrapped in `<Base title="…" description="…">`. If it belongs in the menu, add it to `nav` in `src/layouts/Base.astro`.
- **Colors and fonts:** colors are CSS variables at the top of `src/styles/global.css`. Fonts are set up in `astro.config.mjs`, downloaded at build time and served from the site itself.

## Deploying (Cloudflare Pages)

Cloudflare Pages builds and deploys every push to `master`. Project settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |

Cloudflare reads the Node version from `.node-version`.

**Moving the domain over from GoDaddy:** add `davisdogfarm.com` (and `www`) as a custom domain on the Pages project. Cloudflare will tell you which DNS records to set. Once the site is live there, cancel the GoDaddy Website Builder plan. The domain registration itself can stay at GoDaddy. `public/_redirects` sends the old GoDaddy URLs (`/adoptable-dogs`, `/volunteers`, …) to their new pages, so existing links keep working.

## Quality checks

Before the latest round of changes, all pages were checked at desktop and phone widths with:

- **axe-core:** 0 violations (WCAG 2.2 AA plus best practices).
- **Lighthouse:** 100 on accessibility, best practices and SEO. Performance is 95–100 on phones and 99–100 on desktop, with zero layout shift.

Re-run both after significant layout changes, for example with the axe DevTools browser extension and Chrome's built-in Lighthouse panel on `npm run preview`.
