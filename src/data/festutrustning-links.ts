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
