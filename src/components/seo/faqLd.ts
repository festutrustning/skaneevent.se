/** Stable GA4 faq_id across pages that reuse the same question text. */
export function faqIdFromQuestion(question: string): string {
  const slug = question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return slug || 'faq';
}

export function buildFaqLd(
  faqs: { q: string; a: string }[]
): Record<string, unknown> | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
