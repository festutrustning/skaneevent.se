import type { PageSeoEntry } from './types';

/** Normalisera path till trailing-slash-form (utom root som `/`). */
export function normalizeSeoPath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`;
}

/**
 * Page SEO SoT för indexerbara hub-/landningssidor.
 * Content collections (guider/case-slug) styrs via frontmatter + opt-in SEO-fält.
 */
export const PAGES_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Eventteknik och företagsevent i Skåne',
    description:
      'Professionell eventteknik för företagsevent i Skåne. Ljud, ljus, scen, bild, mikrofoner och tekniker – en partner för hela eventet. Begär offert.',
    sitemapPriority: 1,
    changefreq: 'weekly',
    focusAreas: ['foretagsevent', 'eventteknik', 'skane'],
  },
  '/foretagsevent/': {
    title: 'Företagsevent i Skåne – eventteknik och produktion',
    description:
      'Professionella företagsevent i Skåne med ljud, ljus, scen och tekniker. En partner från planering till genomförande. Begär offert.',
    sitemapPriority: 0.9,
    changefreq: 'weekly',
    focusAreas: ['foretagsevent', 'skane'],
  },
  '/eventteknik/': {
    title: 'Eventteknik i Skåne – ljud, ljus, scen och bild',
    description:
      'Professionell eventteknik i Skåne för företagsevent. Ljud, ljus, scen, bild, mikrofoner och tekniker. Begär offert.',
    sitemapPriority: 0.9,
    changefreq: 'weekly',
    focusAreas: ['eventteknik', 'skane'],
  },
  '/eventproduktion/': {
    title: 'Eventproduktion i Skåne – teknik och genomförande',
    description:
      'Eventproduktion för företagsevent i Skåne. Planering, ljud, ljus, scen och tekniker – från idé till genomförande. Begär offert.',
    sitemapPriority: 0.85,
    changefreq: 'monthly',
    focusAreas: ['eventproduktion', 'skane'],
  },
  '/konferens/': {
    title: 'Konferens i Skåne – eventteknik för företagsdagar',
    description:
      'Eventteknik till företagskonferenser i Skåne. Ljud, mikrofoner, bild och ljus för tal, paneler och workshops. Begär offert.',
    sitemapPriority: 0.85,
    changefreq: 'monthly',
    focusAreas: ['konferens', 'eventteknik'],
  },
  '/gala/': {
    title: 'Gala i Skåne – scen, ljud och ljus för företagsevent',
    description:
      'Eventteknik till företagsgalor i Skåne. Scen, ljus, ljud och tekniker för prisutdelningar och galakvällar. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['gala', 'scen'],
  },
  '/produktlansering/': {
    title: 'Produktlansering i Skåne – eventteknik som lyfter budskapet',
    description:
      'Eventteknik till produktlanseringar i Skåne. Scen, ljud, ljus, bild och tekniker för företagsevent. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['produktlansering', 'scen'],
  },
  '/foretagsfest/': {
    title: 'Företagsfest i Skåne – ljud, ljus och stämning',
    description:
      'Eventteknik till företagsfester i Skåne. Ljud, ljus, mikrofoner och tekniker för kvällar som engagerar hela teamet. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['foretagsfest'],
  },
  '/julfest/': {
    title: 'Julfest i Skåne – eventteknik för företag',
    description:
      'Eventteknik till företagsjulfester i Skåne. Ljud, ljus, mikrofoner och stämning för julens företagsevent. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['julfest'],
  },
  '/kickoff/': {
    title: 'Kick-off i Skåne – eventteknik som sätter tonen',
    description:
      'Eventteknik till kick-offs och strategidagar i Skåne. Scen, ljud, ljus och bild för energifyllda företagsevent. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['kickoff'],
  },
  '/ljud-ljus-foretagsevent/': {
    title: 'Ljud och ljus till företagsevent i Skåne',
    description:
      'Professionellt ljud och ljus till företagsevent i Skåne. PA, mikrofoner, scenljus och tekniker. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['ljud-ljus', 'foretagsevent'],
  },
  '/scen-till-event/': {
    title: 'Scen till event i Skåne – rigg och lösningar',
    description:
      'Scen till företagsevent i Skåne. Modulära scenlösningar, rigg och teknik för konferenser, galor och lanseringar. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['scen'],
  },
  '/malmo/foretagsevent/': {
    title: 'Företagsevent i Malmö – eventteknik och produktion',
    description:
      'Professionella företagsevent i Malmö med ljud, ljus, scen och tekniker. Lokal partner för event i Öresundsregionen. Begär offert.',
    sitemapPriority: 0.85,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'malmo'],
  },
  '/malmo/eventteknik/': {
    title: 'Eventteknik i Malmö – ljud, ljus och rigg',
    description:
      'Professionell eventteknik i Malmö för företagsevent. Ljud, ljus, scen, mikrofoner och tekniker. Begär offert.',
    sitemapPriority: 0.85,
    changefreq: 'monthly',
    focusAreas: ['eventteknik', 'malmo'],
  },
  '/lund/foretagsevent/': {
    title: 'Företagsevent i Lund – eventteknik och produktion',
    description:
      'Professionella företagsevent i Lund med ljud, ljus, scen och tekniker. Partner för event i universitetsstaden. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'lund'],
  },
  '/helsingborg/foretagsevent/': {
    title: 'Företagsevent i Helsingborg – eventteknik och produktion',
    description:
      'Professionella företagsevent i Helsingborg med ljud, ljus, scen och tekniker. Partner för event i nordvästra Skåne. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'helsingborg'],
  },
  '/kristianstad/foretagsevent/': {
    title: 'Företagsevent i Kristianstad – eventteknik och produktion',
    description:
      'Företagsevent i Kristianstad med ljud, ljus, scen och tekniker. Eventpartner för kick-off, konferens och företagsfest i nordöstra Skåne. Begär offert.',
    sitemapPriority: 0.8,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'kristianstad'],
  },
  '/landskrona/foretagsevent/': {
    title: 'Företagsevent i Landskrona – eventteknik och produktion',
    description:
      'Företagsevent i Landskrona med ljud, ljus, scen och tekniker. Eventpartner för konferens, kick-off och företagsfest längs Öresund. Begär offert.',
    sitemapPriority: 0.75,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'landskrona'],
  },
  '/trelleborg/foretagsevent/': {
    title: 'Företagsevent i Trelleborg – eventteknik och produktion',
    description:
      'Företagsevent i Trelleborg med ljud, ljus, scen och tekniker. Eventpartner för konferens, kick-off och företagsfest i södra Skåne. Begär offert.',
    sitemapPriority: 0.75,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'trelleborg'],
  },
  '/ystad/foretagsevent/': {
    title: 'Företagsevent i Ystad – eventteknik och produktion',
    description:
      'Företagsevent i Ystad med ljud, ljus, scen och tekniker. Eventpartner för konferens, kick-off och företagsfest i sydöstra Skåne. Begär offert.',
    sitemapPriority: 0.75,
    changefreq: 'monthly',
    focusAreas: ['foretagsevent', 'ystad'],
  },
  '/guider/': {
    title: 'Guider för företagsevent i Skåne',
    description:
      'Praktiska guider om eventteknik, planering och genomförande av företagsevent i Skåne. Ljud, ljus, scen, konferens och mer.',
    sitemapPriority: 0.7,
    changefreq: 'weekly',
    focusAreas: ['guider'],
  },
  '/case/': {
    title: 'Case – företagsevent i Skåne',
    description:
      'Se hur vi löst eventteknik till företagsevent i Skåne – utomhus LED-scen, konferens, gala och företagsfester.',
    sitemapPriority: 0.7,
    changefreq: 'monthly',
    focusAreas: ['case'],
  },
  '/kontakt/': {
    title: 'Kontakt',
    description:
      'Kontakta Skåne Event för eventteknik och företagsevent i Skåne. Telefon, e-post och adress i Malmö.',
    sitemapPriority: 0.6,
    changefreq: 'yearly',
    focusAreas: ['kontakt'],
  },
  '/om-oss/': {
    title: 'Om Skåne Event',
    description:
      'Skåne Event är specialistresursen för företagsevent och eventteknik i Skåne. Drivs av Festutrustning / Enta Sverige AB i Malmö.',
    sitemapPriority: 0.5,
    changefreq: 'yearly',
    focusAreas: ['om-oss'],
  },
  '/villkor/': {
    title: 'Allmänna villkor',
    description:
      'Allmänna villkor för uthyrning av eventteknik via Festutrustning och Enta Sverige AB.',
    sitemapPriority: 0.2,
    changefreq: 'yearly',
  },
  '/integritet/': {
    title: 'Integritetspolicy',
    description: 'Läs om hur vi hanterar personuppgifter och cookies på skaneevent.se.',
    sitemapPriority: 0.2,
    changefreq: 'yearly',
  },
  '/offert/': {
    title: 'Begär offert på eventteknik',
    description:
      'Begär kostnadsfri offert på eventteknik till företagsevent i Skåne. Beskriv ert event så återkommer vi med ett skräddarsytt förslag.',
    sitemapPriority: 0,
    changefreq: 'never',
    noindex: true,
  },
  '/offert/tack/': {
    title: 'Tack för er förfrågan',
    description: 'Vi har tagit emot er offertförfrågan.',
    sitemapPriority: 0,
    changefreq: 'never',
    noindex: true,
  },
};

export function getPageSeo(path: string): PageSeoEntry | undefined {
  return PAGES_SEO[normalizeSeoPath(path)];
}

export function resolvePageSeo(
  path: string,
  overrides?: Partial<Pick<PageSeoEntry, 'title' | 'description' | 'ogImage' | 'noindex'>>
): PageSeoEntry | undefined {
  const base = getPageSeo(path);
  if (!base && !overrides) return undefined;
  if (!base) {
    return {
      title: overrides!.title ?? '',
      description: overrides!.description ?? '',
      ogImage: overrides?.ogImage,
      sitemapPriority: 0.5,
      changefreq: 'monthly',
      noindex: overrides?.noindex,
    };
  }
  return {
    ...base,
    title: overrides?.title ?? base.title,
    description: overrides?.description ?? base.description,
    ogImage: overrides?.ogImage ?? base.ogImage,
    noindex: overrides?.noindex ?? base.noindex,
  };
}

export function listIndexableSeoPaths(): string[] {
  return Object.entries(PAGES_SEO)
    .filter(([, e]) => !e.noindex)
    .map(([p]) => p);
}
