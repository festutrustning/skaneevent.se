import type { FestReview } from '../../lib/festutrustning-sync';
import { SITE } from '../../data/site';

/** AggregateRating + Review[] när synkade FEST-recensioner finns vid build. */
export function buildAggregateRatingLd(
  reviews: FestReview[]
): Record<string, unknown> | null {
  if (!reviews.length) return null;
  const ratings = reviews.map((r) => r.rating).filter((n) => n >= 1 && n <= 5);
  if (!ratings.length) return null;
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.round(avg * 10) / 10,
      reviewCount: ratings.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 6).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.customer_name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.comment,
      datePublished: r.created_at,
    })),
  };
}
