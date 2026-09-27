#!/usr/bin/env node
/**
 * End-to-end: skaneevent.se/konferens/ → festutrustning.se/offert/event → quote + emails
 */
import { randomUUID } from 'node:crypto';
import https from 'node:https';

const SUPABASE_URL = 'https://vibncjluhzsuhymwumdt.supabase.co';

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, body: await res.text(), url: res.url };
}

function decodeHtml(s) {
  return s.replace(/&amp;/g, '&');
}

console.log('[E2E 1/6] Hämtar skaneevent.se/konferens/');
const konferens = await fetchText('https://skaneevent.se/konferens/');
if (konferens.status !== 200) throw new Error(`Konferens page ${konferens.status}`);

const hrefMatch = konferens.body.match(
  /href="(https:\/\/festutrustning\.se\/offert\/event[^"]*landing_hero_cta[^"]*)"/
);
if (!hrefMatch) throw new Error('Ingen landing_hero_cta till /offert/event hittades');
const ctaUrl = decodeHtml(hrefMatch[1]);
console.log('  CTA:', ctaUrl);

const parsed = new URL(ctaUrl);
const checks = [
  ['utm_source', 'skaneevent'],
  ['utm_medium', 'referral'],
  ['utm_campaign', 'konferens'],
  ['sk_ref', '/konferens/'],
  ['cta_context', 'landing_hero_cta'],
];
for (const [k, v] of checks) {
  if (parsed.searchParams.get(k) !== v) {
    throw new Error(`Param ${k}: expected ${v}, got ${parsed.searchParams.get(k)}`);
  }
}
console.log('[E2E 2/6] CTA-parametrar OK');

console.log('[E2E 3/6] Följer CTA till Festutrustning');
const fest = await fetchText(ctaUrl);
if (fest.status !== 200) throw new Error(`Fest page ${fest.status}`);

const js = fest.body.match(/assets\/index-[^"]+\.js/)?.[0];
const bundle = (await fetchText(`https://festutrustning.se/${js}`)).body;
if (!bundle.includes('b2b_event')) throw new Error('B2B route saknas i bundle');
console.log('[E2E 4/6] /offert/event live med B2B-variant');

const anon = [...bundle.matchAll(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[^"'\\]+/g)].map((m) => m[0])[0];
const quoteId = randomUUID();
const quoteNumber = `OFF-E2E-${Date.now()}`;

const partnerLead = {
  partner: 'skaneevent',
  skaneevent_path: parsed.searchParams.get('sk_ref'),
  cta_context: parsed.searchParams.get('cta_context'),
  utm_source: parsed.searchParams.get('utm_source'),
  utm_medium: parsed.searchParams.get('utm_medium'),
  utm_campaign: parsed.searchParams.get('utm_campaign'),
  budget_segment: '15 000–30 000 kr',
  event_type: 'Konferens',
  full_service_preference: 'Vi vet ungefär vad vi behöver',
  form_variant: 'b2b_event',
  source_page: `${parsed.pathname}${parsed.search}`,
};

const quoteData = {
  id: quoteId,
  quote_number: quoteNumber,
  customer_name: 'E2E Konferens Test',
  customer_email: 'e2e-konferens@example.invalid',
  customer_phone: '0701112233',
  customer_city: 'Malmö',
  event_date: '2026-11-15',
  event_type: 'Konferens',
  event_description: 'Konferens',
  guest_count: 85,
  customer_message: 'E2E från skaneevent.se/konferens/ – kan raderas.',
  delivery_address: 'Konferenscenter Malmö',
  items: JSON.stringify([
    {
      id: randomUUID(),
      product_id: null,
      product_name: 'Skåne Event – eventförfrågan',
      description: 'E2E test',
      quantity: 1,
      unit_price: 0,
      total_price: 0,
      is_custom: true,
    },
  ]),
  subtotal: 0,
  discount_percentage: 0,
  discount_amount: 0,
  delivery_fee: 0,
  total_amount: 0,
  status: 'draft',
  source: 'customer_request',
  attribution_snapshot: partnerLead,
  request_metadata: {
    company_name: 'E2E Testbolag AB',
    venue: 'Konferenscenter Malmö',
    needs: ['Tal & presentation', 'Panel / moderator'],
    budget_segment: '15 000–30 000 kr',
    full_service_preference: 'Vi vet ungefär vad vi behöver',
  },
};

const hdr = {
  apikey: anon,
  Authorization: `Bearer ${anon}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
};

console.log('[E2E 5/6] Skickar quote', quoteNumber);
const insert = await fetch(`${SUPABASE_URL}/rest/v1/quotes`, {
  method: 'POST',
  headers: hdr,
  body: JSON.stringify(quoteData),
});
if (!insert.ok) {
  console.error(await insert.text());
  throw new Error(`Insert ${insert.status}`);
}

console.log('[E2E 6/6] Admin + kundmail');
const admin = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
  method: 'POST',
  headers: hdr,
  body: JSON.stringify({ type: 'quote_request_admin', quoteId }),
});
const customer = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
  method: 'POST',
  headers: hdr,
  body: JSON.stringify({ type: 'quote_request_customer', quoteId }),
});

console.log('  admin:', admin.status, admin.ok ? 'OK (ämne: Ny Skåne Event-förfrågan – Konferens – 85 gäster)' : await admin.text());
console.log('  customer:', customer.status, customer.ok ? 'OK' : await customer.text());

if (!admin.ok || !customer.ok) process.exit(1);

console.log('\nE2E PASS');
console.log('Quote ID:', quoteId);
console.log('Resa: skaneevent.se/konferens/ →', ctaUrl, '→ quote i Enta');
