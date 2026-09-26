// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  // Production URL, used for canonical links.
  site: "https://davisdogfarm.com",

  // Fonts are downloaded from Google Fonts at build time and served from this
  // site, with size-matched fallbacks to avoid layout shift while they load.
  // Each is exposed as a CSS variable used in src/styles/global.css.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Public Sans",
      cssVariable: "--font-sans",
      weights: [400, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Zilla Slab",
      cssVariable: "--font-slab",
      weights: [700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
  ],
});
