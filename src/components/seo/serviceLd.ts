import { SITE } from '../../data/site';

export function buildServiceLd(opts: {
  name: string;
  description: string;
  canonicalPath: string;
  /** City name for geo landings; defaults to Skåne län. */
  areaServedName?: string;
}): Record<string, unknown> {
  const areaServed = opts.areaServedName
    ? { '@type': 'City', name: opts.areaServedName, containedInPlace: { '@type': 'AdministrativeArea', name: 'Skåne län' } }
    : { '@type': 'AdministrativeArea', name: 'Skåne län' };

  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed,
    url: new URL(opts.canonicalPath, SITE.url).href,
  };
}
