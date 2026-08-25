/**
 * Build-time sync från Festutrustning (samma Supabase som festutrustning.se).
 * Anon-nyckeln är publik – samma som i FEST:s klient.
 */

const FEST_SUPABASE_URL =
  import.meta.env.PUBLIC_FEST_SUPABASE_URL ?? 'https://vibncjluhzsuhymwumdt.supabase.co';

let resolvedAnonKey: string | null = import.meta.env.PUBLIC_FEST_SUPABASE_ANON_KEY ?? null;

export type FestReview = {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  event_type: string;
  created_at: string;
};

export type FestLogo = {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
};

async function resolveAnonKey(): Promise<string | null> {
  if (resolvedAnonKey) return resolvedAnonKey;
  try {
    const html = await fetch('https://festutrustning.se/offert/event').then((r) => r.text());
    const jsPath = html.match(/assets\/index-[^"]+\.js/)?.[0];
    if (!jsPath) return null;
    const bundle = await fetch(`https://festutrustning.se/${jsPath}`).then((r) => r.text());
    const key = [...bundle.matchAll(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^"'\\]+/g)].map(
      (m) => m[0]
    )[0];
    resolvedAnonKey = key ?? null;
    return resolvedAnonKey;
  } catch {
    return null;
  }
}

async function festRest<T>(path: string): Promise<T[]> {
  const anon = await resolveAnonKey();
  if (!anon) {
    console.warn('[festutrustning-sync] Ingen anon-nyckel – hoppar över fetch');
    return [];
  }

  try {
    const res = await fetch(`${FEST_SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
      },
    });
    if (!res.ok) {
      console.warn('[festutrustning-sync] Fetch misslyckades:', path, res.status);
      return [];
    }
    return (await res.json()) as T[];
  } catch (err) {
    console.warn('[festutrustning-sync] Fetch error:', path, err);
    return [];
  }
}

export async function fetchFestReviews(limit = 6): Promise<FestReview[]> {
  const rows = await festRest<FestReview>(
    `reviews?approved=eq.true&archived=eq.false&select=id,customer_name,rating,comment,event_type,created_at&order=created_at.desc&limit=${limit}`
  );
  return rows;
}

export async function fetchFestProductBrandLogos(): Promise<FestLogo[]> {
  const rows = await festRest<{
    id: string;
    brand_name: string;
    logo_url: string;
    website_url: string | null;
  }>(
    'product_brand_logos?is_active=eq.true&select=id,brand_name,logo_url,website_url&order=display_order.asc'
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.brand_name,
    logo_url: r.logo_url,
    website_url: r.website_url,
  }));
}

export async function fetchFestCompanyLogos(): Promise<FestLogo[]> {
  const rows = await festRest<{
    id: string;
    company_name: string;
    logo_url: string;
    website_url: string | null;
  }>(
    'company_logos?is_active=eq.true&select=id,company_name,logo_url,website_url&order=display_order.asc'
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.company_name,
    logo_url: r.logo_url,
    website_url: r.website_url,
  }));
}

export function formatReviewDate(iso: string): string {
  try {
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days < 1) return 'Idag';
    if (days === 1) return 'Igår';
    if (days < 30) return `${days} dagar sedan`;
    if (days < 365) return `${Math.floor(days / 30)} månader sedan`;
    return date.toLocaleDateString('sv-SE', { year: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}
