export interface GuideImage {
  src: string;
  alt: string;
  caption: string;
}

/** Explicit image per guide – never rotate by index. */
export const GUIDE_IMAGES: Record<string, GuideImage> = {
  'tekniker-pa-plats': {
    src: '/images/eventproduktion.jpg',
    alt: 'Eventtekniker vid mixer och ljusbord under produktion',
    caption: 'Tekniker på plats under eventet',
  },
  'projektor-eller-led': {
    src: '/images/led-scen-utomhus.jpg',
    alt: 'LED-skärm och scen riggad utomhus i Skåne',
    caption: 'LED-skärm i praktiken',
  },
  'teknik-till-gala': {
    src: '/images/foretagsevent-bankett.jpg',
    alt: 'Bankettsal dukad för gala och företagsevent',
    caption: 'Galamiljö med ljud, ljus och scen',
  },
  'valja-scenstorlek': {
    src: '/images/rigg-eventteknik.jpg',
    alt: 'Truss riggas på en flightcase i Majoren CrossFit',
    caption: 'Scen och tross dimensioneras efter programmet',
  },
  'mikrofoner-paneldiskussion': {
    src: '/images/konferens-panel.jpg',
    alt: 'Paneldiskussion med mikrofoner på företagskonferens',
    caption: 'Mikrofoner till panel och konferens',
  },
  'teknik-till-konferens': {
    src: '/images/malmo-live-konferens.jpg',
    alt: 'Talare och publik på konferens på Malmö Live, med bildskärmar och scenljus',
    caption: 'Konferens på Malmö Live',
  },
  'ljud-till-foretagsevent': {
    src: '/images/ljud-ljus-utrustning.jpg',
    alt: 'Ljud- och ljusutrustning för företagsevent',
    caption: 'PA och ljus dimensionerat efter lokal',
  },
  'checklista-foretagsevent': {
    src: '/images/foretagsevent-led-rigg.jpg',
    alt: 'Omgivningsbelysning med LED-uplights inför företagsevent',
    caption: 'Omgivningsbelysning',
  },
  'komplett-guide-foretagsevent-skane': {
    src: '/images/foretagsevent-dj.jpg',
    alt: 'DJ-bord och ljus på företagsevent i Skåne',
    caption: 'Företagsevent från planering till genomförande',
  },
  'vad-kostar-teknik-foretagsevent': {
    src: '/images/tross-uppsattning.jpg',
    alt: 'Tross och flight cases riggas inför event',
    caption: 'Vad som påverkar teknikbudgeten',
  },
};

const FALLBACK: GuideImage = {
  src: '/images/boozt-awards-malmo.jpg',
  alt: 'Awards på Boozt HQ i Malmö med projektion, uplights och rollups',
  caption: 'Eventteknik för företagsevent i Skåne',
};

export function getGuideImage(guideId: string): GuideImage {
  return GUIDE_IMAGES[guideId] ?? FALLBACK;
}
