export interface CaseVisual {
  src: string;
  alt: string;
  /** Sant när caset saknar egna foton och visar en neutral grafik i stället. */
  isIllustration: boolean;
}

/** Neutral grafik i sajtens färger. Inget motiv som påstår sig vara från uppdraget. */
const ILLUSTRATION_SRC = '/images/case-illustration.svg';

/**
 * Case utan egna foton får den neutrala grafiken, med tom alt-text eftersom
 * grafiken är dekorativ och inte beskriver eventet.
 */
export function getCaseVisual(
  data: { image?: string; imageAlt?: string },
  fallbackAlt = '',
): CaseVisual {
  if (!data.image) {
    return { src: ILLUSTRATION_SRC, alt: '', isIllustration: true };
  }
  return { src: data.image, alt: data.imageAlt ?? fallbackAlt, isIllustration: false };
}

/**
 * Gästantalet i frontmatter har ofta med sin egen enhet ("ca 200 deltagare").
 * Enheten läggs bara till när värdet slutar på en siffra, så den inte dubbleras.
 */
export function formatGuests(guests: string): string {
  const value = guests.trim();
  return /\d$/.test(value) ? `${value} gäster` : value;
}
