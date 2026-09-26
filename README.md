# Davis Dog Farm website

A replacement for the GoDaddy site at davisdogfarm.com, built with [Astro](https://astro.build) as a fully static site.

## Pages

| File | URL | Replaces (old site) |
| --- | --- | --- |
| `src/pages/index.astro` | `/` | Home |
| `src/pages/adopt.astro` | `/adopt/` | Adoptable Dogs, Training |
| `src/pages/get-involved.astro` | `/get-involved/` | Volunteers, Wish List, Events and Fundraisers, Memorial Page |
| `src/pages/hope-for-healing.astro` | `/hope-for-healing/` | Hope For Healing |
| `src/pages/about.astro` | `/about/` | About Us, Information, Our Partners |

The header, footer and nav live in `src/layouts/Base.astro`. The empty Shop page and the GoDaddy account and sign-in pages were dropped. The old URLs redirect to the new pages through `public/_redirects`, which Cloudflare Pages reads, so links already shared on Facebook keep working.

## Adoptable dogs update themselves

The dog list on `/adopt/` is loaded live from the rescue's ShelterManager account (`ah2716`), the same system that hosts the adoption, foster and volunteer applications. To add or remove a dog, or change its photo, update it in ShelterManager. Nobody needs to edit the website. Display settings are in `public/adoptables.js`.

## Common edits

- **Donations** go to the PayPal button `BNYCE2ETKYDN6`. Search `src/` for `paypal.com` to change it.
- **Applications** are ShelterManager forms: adoption `formid=32`, foster `formid=42`, volunteer `formid=45`.
- **Colors and fonts** are defined at the top of `src/styles/global.css`.
- **Photos** go in `public/images/` and are referenced as `/images/name.jpg`.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Deploy (Cloudflare Pages)

Connect this repo in Cloudflare Pages with:

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

The Node version is pinned in `.node-version`. After the first deploy, add davisdogfarm.com as a custom domain in Pages, then cancel the GoDaddy Website Builder plan. The domain registration can stay at GoDaddy, or be moved to Cloudflare.
