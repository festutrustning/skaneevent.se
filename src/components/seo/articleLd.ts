import { SITE } from '../../data/site';

export function buildArticleLd(opts: {
  title: string;
  description: string;
  canonicalPath: string;
  datePublished: Date;
  dateModified?: Date;
  keywords?: string[];
  image?: string;
  aboutEvent?: { name: string; location: string };
}): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished.toISOString(),
    dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
    author: { '@id': `${SITE.url}/#organization` },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: new URL(opts.canonicalPath, SITE.url).href,
    inLanguage: 'sv-SE',
  };
  if (opts.keywords?.length) ld.keywords = opts.keywords.join(', ');
  if (opts.image) ld.image = new URL(opts.image, SITE.url).href;
  if (opts.aboutEvent) {
    ld.about = {
      '@type': 'Event',
      name: opts.aboutEvent.name,
      location: { '@type': 'Place', name: opts.aboutEvent.location },
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    };
  }
  return ld;
}
