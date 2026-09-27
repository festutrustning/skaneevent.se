export type SitemapChangefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export type PageSeoEntry = {
  /** Meta title utan site-suffix (BaseLayout lägger till | Skåne Event vid behov) */
  title: string;
  description: string;
  ogImage?: string;
  sitemapPriority: number;
  changefreq: SitemapChangefreq;
  focusAreas?: string[];
  noindex?: boolean;
};

export type KeywordOwner = 'skaneevent' | 'festutrustning';

export type RiskLevel = 'low' | 'medium' | 'high';

export type KeywordOwnershipEntry = {
  intent: string;
  owner: KeywordOwner;
  skaneeventPath: string | null;
  festPath: string | null;
  riskLevel: RiskLevel;
};
