export const SITE = {
  name: 'Skåne Event',
  url: 'https://skaneevent.se',
  description:
    'Professionell eventteknik och företagsevent i Skåne. Ljud, ljus, scen, bild, mikrofoner och tekniker – en partner för hela eventet.',
  phone: '+46766777232',
  phoneDisplay: '076-677 72 32',
  email: 'info@festutrustning.se',
  address: {
    street: 'Lockarpsvägen 6B',
    postalCode: '213 76',
    city: 'Malmö',
    region: 'Skåne',
    country: 'SE',
  },
  orgName: 'Enta Sverige AB',
  orgNumber: '559579-0832',
  gaId: 'G-0K4XG6F43Q',
  festutrustning: 'https://festutrustning.se',
  defaultOgImage: '/images/konferens-panel.jpg',
  logo: '/logo.png',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61577953652127',
    'https://www.instagram.com/festutrustning',
  ],
} as const;

export type BreadcrumbItem = { name: string; href: string };
