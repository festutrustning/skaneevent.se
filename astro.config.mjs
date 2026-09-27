// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { PAGES_SEO, normalizeSeoPath } from './src/seo/pages-seo.ts';

/** Paths that must never appear in sitemap (redirected / noindex). */
const SITEMAP_EXCLUDE = ['/offert', '/offert/', '/offert/tack', '/offert/tack/'];

/**
 * @param {string} pageUrl
 */
function pathFromSitemapUrl(pageUrl) {
  try {
    const u = new URL(pageUrl);
    return normalizeSeoPath(u.pathname);
  } catch {
    return normalizeSeoPath(pageUrl);
  }
}

export default defineConfig({
  site: 'https://skaneevent.se',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = pathFromSitemapUrl(page);
        if (SITEMAP_EXCLUDE.some((p) => path === normalizeSeoPath(p) || path.startsWith('/offert/'))) {
          return false;
        }
        const entry = PAGES_SEO[path];
        if (entry?.noindex) return false;
        return true;
      },
      serialize: (item) => {
        const path = pathFromSitemapUrl(item.url);
        const entry = PAGES_SEO[path];
        if (entry) {
          item.priority = entry.sitemapPriority;
          item.changefreq = entry.changefreq;
        } else if (path.startsWith('/guider/') && path !== '/guider/') {
          item.priority = 0.65;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/case/') && path !== '/case/') {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
