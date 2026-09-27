export interface PageImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PageVisuals {
  feature?: PageImage;
  gallery?: PageImage[];
}

const I = {
  konferensScen: {
    src: '/images/konferens-scen.jpg',
    alt: 'Publik på företagskonferens i professionell blå lokalbelysning',
    caption: 'Konferens & paneler i professionell miljö',
  },
  konferensPublik: {
    src: '/images/konferens-publik.jpg',
    alt: 'Deltagare på företagskonferens i blå scenbelysning',
    caption: 'Fokus på publikupplevelsen',
  },
  scenBelysning: {
    src: '/images/scen-belysning.jpg',
    alt: 'Publik på företagskonferens med projekterat ljusmönster',
    caption: 'Ljusdesign som sätter tonen i salen',
  },
  scenPublik: {
    src: '/images/scen-publik.jpg',
    alt: 'Publik med upplyfta händer framför varmt scenljus',
    caption: 'Energi och engagemang i salen',
  },
  ledUtomhus: {
    src: '/images/led-scen-utomhus.jpg',
    alt: 'LED-skärm och scen riggad utomhus i Skåne',
    caption: 'LED och scen – utomhus i Skåne',
  },
  ledHero: {
    src: '/images/led-scen-hero.jpg',
    alt: 'Publik filmar live-event med intensivt scenljus',
    caption: 'Scenljus och atmosfär på live-event',
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
  foretagseventDj: {
    src: '/images/foretagsevent-dj.jpg',
    alt: 'DJ-bord och ljus på företagsevent med Oktoberfest-tema',
    caption: 'Företagsevent med DJ, ljus och stämning',
  },
  foretagseventLedRigg: {
    src: '/images/foretagsevent-led-rigg.jpg',
    alt: 'Omgivningsbelysning med LED-uplights i korridor inför företagsevent',
    caption: 'Omgivningsbelysning',
  },
  foretagseventAtmosfar: {
    src: '/images/foretagsevent-atmosfar.jpg',
    alt: 'Gäster under lila eventljus på företagsfest',
    caption: 'Atmosfärljus på företagsfest',
  },
  foretagseventBankett: {
    src: '/images/foretagsevent-bankett.jpg',
    alt: 'Bankettsal dukad för företagsevent med ljuskronor',
    caption: 'Bankett och galamiljö',
  },
  eventProduktion: {
    src: '/images/eventproduktion.jpg',
    alt: 'Eventtekniker vid mixer och ljusbord under produktion',
    caption: 'Tekniker vid mixer och ljusbord',
  },
  eventBackstage: {
    src: '/images/event-backstage.jpg',
    alt: 'Publik under konfettiregn och blått scenljus',
    caption: 'Storskalig eventproduktion med effekter',
  },
  gala: {
    src: '/images/foretagsevent-bankett.jpg',
    alt: 'Bankettsal dukad för gala och företagsevent',
    caption: 'Gala och större företagsevent',
  },
  eventEffekter: {
    src: '/images/event-effekter.jpg',
    alt: 'Publik på konferens med blått scenljus och ljusmönster',
    caption: 'Atmosfär och ljusdesign',
  },
} as const satisfies Record<string, PageImage>;

export const PAGE_VISUALS: Record<string, PageVisuals> = {
  '/foretagsevent/': {
    feature: I.foretagseventDj,
    gallery: [I.eventProduktion, I.foretagseventLedRigg, I.foretagseventBankett],
  },
  '/eventteknik/': {
    feature: I.eventProduktion,
    gallery: [I.foretagseventDj, I.foretagseventLedRigg, I.konferensPublik],
  },
  '/eventproduktion/': {
    feature: I.eventProduktion,
    gallery: [I.ledUtomhus, I.foretagseventDj, I.foretagseventBankett],
  },
  '/konferens/': {
    feature: I.eventEffekter,
    gallery: [I.ljudLjus, I.eventProduktion, I.tross],
  },
  '/gala/': {
    feature: I.foretagseventBankett,
    gallery: [I.tross, I.foretagseventDj, I.eventProduktion],
  },
  '/produktlansering/': {
    feature: I.eventBackstage,
    gallery: [I.tross, I.eventProduktion, I.foretagseventBankett],
  },
  '/foretagsfest/': {
    feature: I.foretagseventDj,
    gallery: [I.foretagseventAtmosfar, I.foretagseventLedRigg, I.eventProduktion],
  },
  '/julfest/': {
    feature: I.foretagseventAtmosfar,
    gallery: [I.foretagseventDj, I.ljudLjus, I.eventProduktion],
  },
  '/kickoff/': {
    feature: I.foretagseventDj,
    gallery: [I.foretagseventLedRigg, I.eventProduktion, I.foretagseventBankett],
  },
  '/ljud-ljus-foretagsevent/': {
    feature: I.foretagseventDj,
    gallery: [I.foretagseventLedRigg, I.eventProduktion, I.konferensPublik],
  },
  '/scen-till-event/': {
    feature: I.ledUtomhus,
    gallery: [I.eventProduktion, I.foretagseventDj, I.foretagseventBankett],
  },
  '/malmo/foretagsevent/': {
    feature: I.foretagseventDj,
    gallery: [I.eventProduktion, I.foretagseventLedRigg, I.ljudLjus],
  },
  '/lund/foretagsevent/': {
    feature: I.eventEffekter,
    gallery: [I.foretagseventDj, I.foretagseventLedRigg, I.scenBelysning],
  },
  '/helsingborg/foretagsevent/': {
    feature: I.foretagseventDj,
    gallery: [I.foretagseventLedRigg, I.eventProduktion, I.foretagseventBankett],
  },
  '/kristianstad/foretagsevent/': {
    feature: I.dj,
    gallery: [I.foretagseventDj, I.ljudLjus, I.konferensPublik],
  },
  '/landskrona/foretagsevent/': {
    feature: I.foretagseventBankett,
    gallery: [I.foretagseventDj, I.rigg, I.eventProduktion],
  },
  '/trelleborg/foretagsevent/': {
    feature: I.eventProduktion,
    gallery: [I.foretagseventDj, I.tross, I.konferensScen],
  },
  '/ystad/foretagsevent/': {
    feature: I.foretagseventDj,
    gallery: [I.foretagseventBankett, I.eventEffekter, I.ljudLjus],
  },
  '/malmo/eventteknik/': {
    feature: I.tross,
    gallery: [I.eventProduktion, I.foretagseventDj, I.foretagseventLedRigg],
  },
};

export function getPageVisuals(canonicalPath: string): PageVisuals | undefined {
  return PAGE_VISUALS[canonicalPath];
}
