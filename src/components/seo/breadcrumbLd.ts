import type { BreadcrumbItem } from '../../data/site';
import { SITE } from '../../data/site';

export function buildBreadcrumbLd(
  breadcrumbs: BreadcrumbItem[]
): Record<string, unknown> | null {
  if (breadcrumbs.length === 0) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Skåne Event', item: SITE.url + '/' },
      ...breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: b.name,
        item: new URL(b.href, SITE.url).href,
      })),
    ],
  };
}
