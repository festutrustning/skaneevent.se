export const capacityBlocks = [
  {
    title: 'Ljud',
    text: 'Zon-PA och tal i en lokal, eller line array över en öppen yta. Ljudet dimensioneras efter rummet och programmet.',
    examples: [
      { href: '/case/dj-foretagsevent/', label: 'Ljud och DJ på Hyrox i Helsingborg' },
      { href: '/case/utomhus-led-scen-malmo/', label: 'Ljud till invigning i Hyllie' },
    ],
  },
  {
    title: 'Bild',
    text: 'Projektor i konferenslokal, hängd LED i tross, eller LED som syns i dagsljus utomhus. Ytan följer lokalen och innehållet.',
    examples: [
      { href: '/case/tross-led-rigg/', label: 'LED-skärm till VM-visning i Helsingborg' },
    ],
  },
  {
    title: 'Scen och rigg',
    text: 'Modulscen, tross, väderskydd och reservel. Vi bygger efter programmet: tal, panel, lansering eller utomhuskväll.',
    examples: [
      { href: '/guider/valja-scenstorlek/', label: 'Så väljer ni scenstorlek' },
      { href: '/case/tross-led-rigg/', label: 'Scen och truss till VM-visning i Helsingborg' },
      { href: '/case/dj-foretagsevent/', label: 'Truss på Majoren CrossFit' },
    ],
  },
  {
    title: 'Personal',
    text: 'Ljud, ljus, bild och produktion, bemannat efter programmet. En ljudtekniker kan räcka en kväll. Lansering och utomhus har flera roller, och rigg kan börja dagen före.',
    examples: [
      { href: '/case/ljud-ljus-foretagsfest/', label: 'DJ på firmafest i Lund' },
      { href: '/case/tross-led-rigg/', label: 'Ljudtekniker och AV-tekniker i Helsingborg' },
      { href: '/guider/tekniker-pa-plats/', label: 'När tekniker är på plats' },
    ],
  },
] as const;

export const capacityClose = {
  text: 'Större gala, fler dagar eller fler gäster tas i offerten med samma byggstenar, anpassat till lokalen.',
  links: [
    { href: '/gala/', label: 'Gala' },
    { href: '/julfest/', label: 'Julfest' },
    { href: '/case/ljud-ljus-foretagsfest/', label: 'firmafesten i Lund' },
  ],
} as const;
