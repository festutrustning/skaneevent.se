import { SITE } from './site';

const BASE = SITE.festutrustning;

export const FEST = {
  home: BASE,
  foretag: `${BASE}/foretag`,
  scen: `${BASE}/scen`,
  ljudLjusSkane: `${BASE}/ljud-ljus-skane`,
  ljudLjusMalmo: `${BASE}/ljud-ljus-malmo`,
  hyraHogtalareMalmo: `${BASE}/hyra-hogtalare-malmo`,
  produkter: `${BASE}/produkter`,
  offert: `${BASE}/offert`,
  offertEvent: `${BASE}/offert/event`,
  kontakt: `${BASE}/kontakt`,
} as const;

export type FestDestination = keyof typeof FEST;

/** Central deep-link matrix: Skaneevent path → Festutrustning destinations */
export const LINK_MATRIX: Record<
  string,
  { destinations: FestDestination[]; defaultCampaign: string }
> = {
  '/': { destinations: ['foretag'], defaultCampaign: 'home' },
  '/foretagsevent/': { destinations: ['foretag'], defaultCampaign: 'foretagsevent' },
  '/eventteknik/': {
    destinations: ['foretag', 'ljudLjusSkane'],
    defaultCampaign: 'eventteknik',
  },
  '/eventproduktion/': {
    destinations: ['foretag', 'scen'],
    defaultCampaign: 'eventproduktion',
  },
  '/konferens/': { destinations: ['foretag'], defaultCampaign: 'konferens' },
  '/gala/': { destinations: ['scen', 'foretag'], defaultCampaign: 'gala' },
  '/produktlansering/': {
    destinations: ['scen', 'foretag'],
    defaultCampaign: 'produktlansering',
  },
  '/foretagsfest/': {
    destinations: ['foretag', 'ljudLjusSkane'],
    defaultCampaign: 'foretagsfest',
  },
  '/julfest/': {
    destinations: ['foretag', 'ljudLjusSkane'],
    defaultCampaign: 'julfest',
  },
  '/kickoff/': {
    destinations: ['foretag', 'ljudLjusSkane'],
    defaultCampaign: 'kickoff',
  },
  '/ljud-ljus-foretagsevent/': {
    destinations: ['ljudLjusSkane'],
    defaultCampaign: 'ljud-ljus',
  },
  '/scen-till-event/': { destinations: ['scen'], defaultCampaign: 'scen' },
  '/malmo/foretagsevent/': {
    destinations: ['foretag', 'ljudLjusMalmo'],
    defaultCampaign: 'malmo-foretagsevent',
  },
  '/malmo/eventteknik/': {
    destinations: ['ljudLjusMalmo', 'foretag'],
    defaultCampaign: 'malmo-eventteknik',
  },
  '/lund/foretagsevent/': {
    destinations: ['foretag'],
    defaultCampaign: 'lund-foretagsevent',
  },
  '/helsingborg/foretagsevent/': {
    destinations: ['foretag'],
    defaultCampaign: 'helsingborg-foretagsevent',
  },
};

export function festUrl(
  destination: FestDestination,
  opts?: { campaign?: string; utm?: boolean }
): string {
  const url = FEST[destination];
  if (!opts?.utm) return url;
  const campaign = opts.campaign ?? 'referral';
  const u = new URL(url);
  u.searchParams.set('utm_source', 'skaneevent');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}

/** B2B/event offert-CTA med partner-attribution (first-party metadata på FEST). */
export function buildOffertEventUrl(opts: {
  campaign?: string;
  skRef?: string;
  ctaContext?: string;
}): string {
  const url = new URL(FEST.offertEvent);
  url.searchParams.set('utm_source', 'skaneevent');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', opts.campaign ?? 'referral');
  if (opts.skRef) url.searchParams.set('sk_ref', opts.skRef);
  if (opts.ctaContext) url.searchParams.set('cta_context', opts.ctaContext);
  return url.toString();
}

/** Offert-CTA från en Skåne Event-sida med kampanj från link matrix. */
export function offertEventUrlForPath(sourcePath: string, ctaContext: string): string {
  const normalized =
    sourcePath === '/' ? '/' : sourcePath.endsWith('/') ? sourcePath : `${sourcePath}/`;
  const matrix = LINK_MATRIX[normalized] ?? LINK_MATRIX['/'];
  return buildOffertEventUrl({
    campaign: matrix.defaultCampaign,
    skRef: normalized,
    ctaContext,
  });
}

/** Eventspecifika CTA-etiketter per landningssida. */
export const OFFERT_CTA_LABELS: Record<string, string> = {
  '/konferens/': 'Planera er konferens',
  '/foretagsfest/': 'Få förslag för företagsfesten',
  '/kickoff/': 'Planera er kickoff',
};
