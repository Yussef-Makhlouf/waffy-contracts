export const brand = {
  name: "الوافي للمقاولات العامة",
  englishName: "ALWAFI GENERAL CONTRACTING",
  tagline: "الوافي، أبد حنا وافين",
  logo: { dark: "/brand/alwafi-dark.svg", light: "/brand/alwafi-light.svg", icon: "/brand/alwafi-icon.svg" },
  images: {
    hero: "/images/arabian-development.webp",
    about: "/images/construction-skyline.webp",
    architecture: "/images/riyadh-panorama.webp",
    engineering: "/images/site-engineer.webp",
  },
  // Art-directed framings of the same four renders; see scripts/prepare-assets.mjs.
  crops: {
    heroPortrait: "/images/crop-hero-portrait.webp",
    skylineDusk: "/images/crop-skyline-dusk.webp",
    engineerView: "/images/crop-engineer-view.webp",
    sitePanorama: "/images/crop-site-panorama.webp",
    lattice: "/images/crop-lattice.webp",
    sitePlans: "/images/crop-site-plans.webp",
    cityWorks: "/images/crop-city-works.webp",
  },
} as const;
