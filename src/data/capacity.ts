export const capacityBlocks = [
  {
    title: 'Ljud',
    text: 'Zon-PA och tal i en lokal, eller line array över en öppen yta. Ljudet dimensioneras efter rummet och programmet.',
    examples: [
      { href: '/case/dj-foretagsevent/', label: 'Zoner och DJ i Kristianstad' },
      { href: '/case/utomhus-led-scen-malmo/', label: 'Line array på utomhusscen i Malmö' },
    ],
  },
  {
    title: 'Bild',
    text: 'Projektor i konferenslokal, hängd LED i tross, eller LED som syns i dagsljus utomhus. Ytan följer lokalen och innehållet.',
    examples: [
      { href: '/case/konferens-panel/', label: 'Projektor till panel i Malmö' },
      { href: '/case/tross-led-rigg/', label: 'Hängd LED 6×3 m i Lund' },
      { href: '/case/utomhus-led-scen-malmo/', label: 'Dagsljus-LED utomhus i Malmö' },
    ],
  },
  {
    title: 'Scen och rigg',
    text: 'Modulscen, tross, väderskydd och reservel. Vi bygger efter programmet: tal, panel, lansering eller utomhuskväll.',
    examples: [
      { href: '/guider/valja-scenstorlek/', label: 'Så väljer ni scenstorlek' },
      { href: '/case/tross-led-rigg/', label: 'Tross och scen i Lund' },
      { href: '/case/utomhus-led-scen-malmo/', label: 'Utomhusscen med väderskydd' },
    ],
  },
  {
    title: 'Personal',
    text: 'Ljud, ljus, bild och produktion, bemannat efter programmet. En ljudtekniker kan räcka en kväll. Lansering och utomhus har flera roller, och rigg kan börja dagen före.',
    examples: [
      { href: '/case/ljud-ljus-foretagsfest/', label: 'En ljudtekniker på företagsfest' },
      { href: '/case/tross-led-rigg/', label: 'Ljud, ljus och bild i Lund' },
      { href: '/guider/tekniker-pa-plats/', label: 'När tekniker är på plats' },
    ],
  },
] as const;

export const capacityClose = {
  text: 'Större gala, fler dagar eller fler gäster tas i offerten med samma byggstenar, anpassat till lokalen.',
  links: [
    { href: '/gala/', label: 'Gala' },
    { href: '/julfest/', label: 'Julfest' },
    { href: '/case/ljud-ljus-foretagsfest/', label: 'företagsfesten i Helsingborg' },
  ],
} as const;
