# skaneevent.se

SEO-driven B2B-satellit till [Festutrustning.se](https://festutrustning.se) – fokus på företagsevent och eventteknik i Skåne.

## Stack

- [Astro](https://astro.build) (static HTML)
- Netlify (`npm run build` → `dist/`)
- GA4 `G-0K4XG6F43Q` med Consent Mode
- Netlify Forms för `/offert/`

## Kommandon

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Dokumentation

- [Keyword ownership](docs/keyword-ownership.md)
- [Festutrustning-koordinering](docs/festutrustning-koordinering.md)
- [SEO-tracking / GSC](docs/seo-tracking.md)

## Struktur

- `src/pages/` – landningssidor
- `src/content/guider/` – Markdown-guider
- `src/content/case/` – Case studies
- `src/data/festutrustning-links.ts` – central deep-link-matris
- `public/images/` – bilder
