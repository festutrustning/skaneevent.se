import { SITE } from '../../data/site';

/**
 * WebSite + Organization JSON-LD nodes for @graph.
 * BaseLayout merges these into the page graph.
 */
export function buildOrganizationGraph(): Record<string, unknown>[] {
  return [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url + '/',
      name: SITE.name,
      description: SITE.description,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'sv-SE',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.orgName,
      url: SITE.url + '/',
      logo: new URL(SITE.logo, SITE.url).href,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        postalCode: SITE.address.postalCode,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      sameAs: SITE.sameAs,
      parentOrganization: {
        '@type': 'Organization',
        name: 'festutrustning.se',
        url: SITE.festutrustning,
      },
    },
  ];
}
