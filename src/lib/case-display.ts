/**
 * Gästantalet i frontmatter har ofta med sin egen enhet ("ca 200 deltagare").
 * Enheten läggs bara till när värdet slutar på en siffra, så den inte dubbleras.
 */
export function formatGuests(guests: string): string {
  const value = guests.trim();
  return /\d$/.test(value) ? `${value} gäster` : value;
}
