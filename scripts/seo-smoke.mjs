#!/usr/bin/env node
/**
 * SEO smoke checks against dist/ after `astro build`.
 * Exit 0 = PASS, non-zero = FAIL.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

const errors = [];

function fail(msg) {
  errors.push(msg);
}

if (!fs.existsSync(dist)) {
  console.error('dist/ saknas – kör npm run build först');
  process.exit(2);
}

const { PAGES_SEO, listIndexableSeoPaths, normalizeSeoPath } = await import(
  pathToFileURL(path.join(root, 'src/seo/pages-seo.ts')).href
);
const { HIGH_OWNERSHIP_SKANEEVENT_PATHS, getHighRiskOwnershipEntries } = await import(
  pathToFileURL(path.join(root, 'src/seo/keyword-ownership.ts')).href
);

// --- SoT field checks ---
for (const [p, entry] of Object.entries(PAGES_SEO)) {
  if (p !== normalizeSeoPath(p)) {
    fail(`Path ej normaliserad: ${p}`);
  }
  if (!entry.noindex) {
    if (!entry.title || entry.title.length < 5) fail(`${p}: title för kort`);
    if (entry.title.length > 70) fail(`${p}: title för lång (${entry.title.length})`);
    if (!entry.description || entry.description.length < 40) {
      fail(`${p}: description för kort`);
    }
    if (entry.description.length > 170) {
      fail(`${p}: description för lång (${entry.description.length})`);
    }
  }
}

// --- HIGH ownership paths in SoT ---
for (const p of HIGH_OWNERSHIP_SKANEEVENT_PATHS) {
  if (!PAGES_SEO[p]) fail(`HIGH ownership-path saknas i PAGES_SEO: ${p}`);
}
for (const e of getHighRiskOwnershipEntries()) {
  if (e.owner === 'skaneevent' && e.skaneeventPath && !PAGES_SEO[e.skaneeventPath]) {
    fail(`HIGH ownership SoT-gap: ${e.intent} → ${e.skaneeventPath}`);
  }
}

// --- Sitemap must not include offert ---
const sitemapFiles = fs
  .readdirSync(dist)
  .filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
if (sitemapFiles.length === 0) fail('Ingen sitemap-*.xml i dist/');

let sitemapXml = '';
for (const f of sitemapFiles) {
  sitemapXml += fs.readFileSync(path.join(dist, f), 'utf8');
}
if (/skaneevent\.se\/offert/i.test(sitemapXml)) {
  fail('Sitemap innehåller /offert');
}

// Soft check: indexable hub paths appear in sitemap (home at least)
if (!sitemapXml.includes('https://skaneevent.se/') && !sitemapXml.includes('skaneevent.se/sitemap')) {
  // index may only list child sitemaps
}
const childMatch = sitemapXml.match(/https:\/\/skaneevent\.se\/sitemap-\d+\.xml/);
if (childMatch) {
  const childName = childMatch[0].split('/').pop();
  const childPath = path.join(dist, childName);
  if (fs.existsSync(childPath)) {
    sitemapXml += fs.readFileSync(childPath, 'utf8');
  }
}
for (const p of ['/foretagsevent/', '/eventteknik/', '/konferens/']) {
  const needle = `https://skaneevent.se${p === '/' ? '/' : p}`;
  if (!sitemapXml.includes(needle.replace(/\/$/, '') ) && !sitemapXml.includes(needle)) {
    // Astro may emit with or without trailing slash depending on config; we use trailingSlash always
    if (!sitemapXml.includes(`https://skaneevent.se${p}`)) {
      fail(`Sitemap saknar förväntad URL: ${p}`);
    }
  }
}

// --- Sample HTML: trailing slash canonical + meta from SoT ---
function readHtml(rel) {
  const candidates = [
    path.join(dist, rel, 'index.html'),
    path.join(dist, `${rel}.html`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return fs.readFileSync(c, 'utf8');
  }
  return null;
}

const home = readHtml('') ?? readHtml('.');
const homeHtml = fs.existsSync(path.join(dist, 'index.html'))
  ? fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
  : null;
if (!homeHtml) fail('dist/index.html saknas');
else {
  if (!homeHtml.includes('rel="canonical"')) fail('Home saknar canonical');
  if (!homeHtml.includes('https://skaneevent.se/')) fail('Home canonical/URL-fel');
  const homeSeo = PAGES_SEO['/'];
  if (homeSeo && !homeHtml.includes(homeSeo.description.slice(0, 40))) {
    fail('Home description matchar inte PAGES_SEO');
  }
  if (!homeHtml.includes('application/ld+json')) fail('Home saknar JSON-LD');
}

const konferens = readHtml('konferens');
if (!konferens) fail('dist/konferens/index.html saknas');
else {
  if (!konferens.includes('canonical') || !konferens.includes('/konferens/')) {
    fail('Konferens canonical fel');
  }
  const seo = PAGES_SEO['/konferens/'];
  if (seo && !konferens.includes(seo.title.split('–')[0].trim())) {
    fail('Konferens title matchar inte SoT');
  }
}

// --- SE-0 Helsingborg case → money ownership repair ---
const caseHbg = readHtml('case/ljud-ljus-foretagsfest');
if (!caseHbg) fail('dist/case/ljud-ljus-foretagsfest/index.html saknas');
else {
  if (!caseHbg.includes('canonical') || !caseHbg.includes('/case/ljud-ljus-foretagsfest/')) {
    fail('SE-0 case canonical self saknas');
  }
  if (/rel=["']canonical["'][^>]*helsingborg\/foretagsevent/i.test(caseHbg)) {
    fail('SE-0 case får inte canonical till money page');
  }
  if (/noindex/i.test(caseHbg) && !/index,\s*follow/i.test(caseHbg)) {
    fail('SE-0 case får inte noindex');
  }
  if (!caseHbg.includes('/helsingborg/foretagsevent/')) {
    fail('SE-0 case saknar länk till money page /helsingborg/foretagsevent/');
  }
  if (!caseHbg.includes('application/ld+json') || !caseHbg.includes('Article')) {
    fail('SE-0 case saknar Article JSON-LD');
  }
  // Title/H1 preserved (no generic deopt)
  if (!caseHbg.includes('Ljud och ljus till företagsfest i Helsingborg')) {
    fail('SE-0 case title/H1 får inte ändras i denna repair');
  }
}

const moneyHbg = readHtml('helsingborg/foretagsevent');
if (!moneyHbg) fail('dist/helsingborg/foretagsevent/index.html saknas');
else {
  if (!moneyHbg.includes('canonical') || !moneyHbg.includes('/helsingborg/foretagsevent/')) {
    fail('SE-0 money canonical self saknas');
  }
  if (/festutrustning\.se.*rel=["']canonical|canonical[^>]*festutrustning/i.test(moneyHbg)) {
    fail('SE-0 money får inte cross-domain canonical');
  }
  if (!moneyHbg.includes('/case/ljud-ljus-foretagsfest/')) {
    fail('SE-0 money saknar länk till case proof');
  }
  if (!moneyHbg.includes('"@type":"Service"') && !moneyHbg.includes('"@type": "Service"')) {
    fail('SE-0 money saknar Service JSON-LD');
  }
  if (!moneyHbg.includes('Helsingborg') || !moneyHbg.includes('City')) {
    // areaServed City signal
    if (!/"name"\s*:\s*"Helsingborg"/.test(moneyHbg)) {
      fail('SE-0 money saknar areaServed Helsingborg');
    }
  }
  if (!moneyHbg.includes('Företagsevent i Helsingborg')) {
    fail('SE-0 money H1/title-kärna får inte ändras');
  }
}

const malmoEt = readHtml('malmo/eventteknik');
if (!malmoEt) fail('dist/malmo/eventteknik/index.html saknas (PROTECT)');
else {
  if (!malmoEt.includes('Eventteknik i Malmö')) {
    fail('SE-0 får inte röra /malmo/eventteknik H1');
  }
  if (!malmoEt.includes('/malmo/eventteknik/')) {
    fail('SE-0 Malmö working owner canonical saknas');
  }
}

const indexable = listIndexableSeoPaths();
if (indexable.length < 10) fail(`För få indexerbara SoT-paths: ${indexable.length}`);

if (errors.length) {
  console.error('SEO smoke FAIL:');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

console.log('SEO smoke PASS');
console.log(`  SoT paths: ${Object.keys(PAGES_SEO).length} (${indexable.length} indexerbara)`);
console.log(`  Sitemap files: ${sitemapFiles.join(', ')}`);
console.log('  SE-0 case↔money + Malmö protect checks: OK');
