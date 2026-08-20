export interface PageImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PageVisuals {
  band: PageImage[];
  feature?: PageImage;
  gallery?: PageImage[];
}

const I = {
  konferensScen: {
    src: '/images/konferens-scen.jpg',
    alt: 'Publik på företagskonferens i professionell lokalbelysning',
    caption: 'Konferens & paneler i professionell miljö',
  },
  konferensPublik: {
    src: '/images/konferens-publik.jpg',
    alt: 'Deltagare på företagskonferens i blå scenbelysning',
    caption: 'Fokus på publikupplevelsen',
  },
  scenBelysning: {
    src: '/images/scen-belysning.jpg',
    alt: 'Publik på event med scenbelysning och bokeh',
    caption: 'Scenbelysning som skapar rätt atmosfär',
  },
  scenPublik: {
    src: '/images/scen-publik.jpg',
    alt: 'Publik med upplyfta händer vid live-event',
    caption: 'Energi och engagemang i salen',
  },
  ledUtomhus: {
    src: '/images/led-scen-utomhus.jpg',
    alt: 'LED-skärm och scen riggad utomhus i Skåne',
    caption: 'LED och scen – utomhus i Skåne',
  },
  ledHero: {
    src: '/images/led-scen-hero.jpg',
    alt: 'Scen och ljus riggat inför företagsevent',
    caption: 'Scen, ljus och bild i samma lösning',
  },
  tross: {
    src: '/images/tross-uppsattning.jpg',
    alt: 'Tross och flight cases riggas inför event',
    caption: 'Tross och rigg inför eventdagen',
  },
  rigg: {
    src: '/images/rigg-eventteknik.jpg',
    alt: 'Rigg av tross och LED inför företagsevent',
    caption: 'Rigg av tross och LED',
  },
  ljudLjus: {
    src: '/images/ljud-ljus-utrustning.jpg',
    alt: 'Ljud- och ljusutrustning för företagsevent',
    caption: 'Ljud och ljus – dimensionerat efter lokal',
  },
  dj: {
    src: '/images/dj-ljudutrustning.jpg',
    alt: 'DJ och ljudutrustning till företagsfest',
    caption: 'Ljud till fest och mingel',
  },
  eventProduktion: {
    src: '/images/eventproduktion.jpg',
    alt: 'Eventtekniker vid mixer och ljusbord',
    caption: 'Tekniker vid mixer och ljusbord',
  },
  eventBackstage: {
    src: '/images/event-backstage.jpg',
    alt: 'Publik och ljuseffekter på stort event',
    caption: 'Storskalig eventproduktion',
  },
  gala: {
    src: '/images/gala-foretagsevent.jpg',
    alt: 'Publik och scenljus på gala och företagsevent',
    caption: 'Gala och större företagsevent',
  },
  eventEffekter: {
    src: '/images/event-effekter.jpg',
    alt: 'Publik på konferens med varm scenbelysning',
    caption: 'Atmosfär och ljusdesign',
  },
} as const satisfies Record<string, PageImage>;

export const PAGE_VISUALS: Record<string, PageVisuals> = {
  '/foretagsevent/': {
    band: [I.konferensScen, I.tross, I.ledUtomhus],
    feature: I.scenBelysning,
    gallery: [I.rigg, I.eventProduktion, I.gala],
  },
  '/eventteknik/': {
    band: [I.tross, I.rigg, I.ljudLjus],
    feature: I.eventProduktion,
    gallery: [I.ledHero, I.eventBackstage, I.konferensPublik],
  },
  '/eventproduktion/': {
    band: [I.eventProduktion, I.tross, I.rigg],
    feature: I.eventBackstage,
    gallery: [I.ledUtomhus, I.scenBelysning, I.gala],
  },
  '/konferens/': {
    band: [I.konferensScen, I.konferensPublik, I.scenBelysning],
    feature: I.eventEffekter,
    gallery: [I.ljudLjus, I.eventProduktion, I.tross],
  },
  '/gala/': {
    band: [I.gala, I.scenPublik, I.eventBackstage],
    feature: I.scenBelysning,
    gallery: [I.tross, I.ledHero, I.eventProduktion],
  },
  '/produktlansering/': {
    band: [I.ledHero, I.ledUtomhus, I.scenPublik],
    feature: I.eventBackstage,
    gallery: [I.tross, I.eventProduktion, I.gala],
  },
  '/foretagsfest/': {
    band: [I.dj, I.gala, I.scenPublik],
    feature: I.ljudLjus,
    gallery: [I.scenBelysning, I.eventEffekter, I.eventProduktion],
  },
  '/julfest/': {
    band: [I.gala, I.dj, I.scenBelysning],
    feature: I.scenPublik,
    gallery: [I.ljudLjus, I.eventEffekter, I.eventProduktion],
  },
  '/kickoff/': {
    band: [I.scenPublik, I.konferensScen, I.gala],
    feature: I.eventBackstage,
    gallery: [I.tross, I.ledHero, I.eventProduktion],
  },
  '/ljud-ljus-foretagsevent/': {
    band: [I.ljudLjus, I.dj, I.scenBelysning],
    feature: I.eventProduktion,
    gallery: [I.gala, I.rigg, I.konferensPublik],
  },
  '/scen-till-event/': {
    band: [I.tross, I.ledUtomhus, I.rigg],
    feature: I.ledHero,
    gallery: [I.eventProduktion, I.gala, I.scenPublik],
  },
  '/malmo/foretagsevent/': {
    band: [I.ledUtomhus, I.konferensScen, I.tross],
    feature: I.rigg,
    gallery: [I.eventProduktion, I.gala, I.ljudLjus],
  },
  '/lund/foretagsevent/': {
    band: [I.konferensPublik, I.konferensScen, I.tross],
    feature: I.eventEffekter,
    gallery: [I.ljudLjus, I.eventProduktion, I.scenBelysning],
  },
  '/helsingborg/foretagsevent/': {
    band: [I.gala, I.tross, I.konferensScen],
    feature: I.scenBelysning,
    gallery: [I.rigg, I.ledHero, I.eventProduktion],
  },
  '/malmo/eventteknik/': {
    band: [I.rigg, I.ledUtomhus, I.ljudLjus],
    feature: I.tross,
    gallery: [I.eventProduktion, I.konferensPublik, I.ledHero],
  },
};

export function getPageVisuals(canonicalPath: string): PageVisuals | undefined {
  return PAGE_VISUALS[canonicalPath];
}
