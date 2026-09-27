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
