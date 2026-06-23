import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'content');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function contentToHtml(text) {
  const lines = text.split('\n');
  const parts = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      parts.push('</ul>');
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed === '⸻') {
      closeList();
      parts.push('<hr>');
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      closeList();
      parts.push(`<h2>${escapeHtml(trimmed)}</h2>`);
      continue;
    }

    if (trimmed.startsWith('•') || line.startsWith('\t•')) {
      if (!inList) {
        parts.push('<ul>');
        inList = true;
      }
      parts.push(`<li>${escapeHtml(trimmed.replace(/^•\s*/, ''))}</li>`);
      continue;
    }

    const email = trimmed.match(/📧\s*([^\s]+)/);
    const phone = trimmed.match(/📞\s*(.+)/);
    const location = trimmed.match(/📍\s*(.+)/);

    if (email) {
      closeList();
      parts.push(`<p>📧 <a href="mailto:${email[1]}">${escapeHtml(email[1])}</a></p>`);
      continue;
    }

    if (phone) {
      closeList();
      const display = phone[1].trim();
      const tel = display.replace(/\s/g, '');
      parts.push(`<p>📞 <a href="tel:${tel}">${escapeHtml(display)}</a></p>`);
      continue;
    }

    if (location) {
      closeList();
      parts.push(`<p>📍 ${escapeHtml(location[1])}</p>`);
      continue;
    }

    closeList();
    parts.push(`<p>${escapeHtml(trimmed)}</p>`);
  }

  closeList();
  return parts.join('\n');
}

function pageShell({ title, description, canonical, bodyHtml, metaDate, extraSections = '' }) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Skåne Event</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/logo.png">
  <link rel="stylesheet" href="/styles.css">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-0K4XG6F43Q"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-0K4XG6F43Q');
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Hoppa till innehåll</a>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Skåne Event – startsida">
        <img src="/logo.png" alt="festutrustning.se logotyp" width="280" height="55" loading="eager">
      </a>
      <nav class="nav" aria-label="Huvudnavigation">
        <a href="/">Startsida</a>
        <a href="/villkor/">Allmänna villkor</a>
        <a href="/integritet/">Integritetspolicy</a>
        <a class="btn btn-primary btn-sm" href="https://festutrustning.se/offert">Boka nu</a>
      </nav>
    </div>
  </header>

  <main id="main" class="legal-page">
    <div class="container">
      <article class="legal-card">
        <h1>${escapeHtml(title)}</h1>
        ${metaDate ? `<p class="legal-meta">${escapeHtml(metaDate)}</p>` : ''}
        <div class="legal-prose">
          ${bodyHtml}
        </div>
        ${extraSections}
      </article>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a href="https://festutrustning.se">
          <img src="/logo.png" alt="festutrustning.se" width="260" height="51" loading="lazy">
        </a>
        <p>Skåne Event är en landningssida för <a href="https://festutrustning.se">festutrustning.se</a> – professionell uthyrning av eventteknik till företagsevent i Skåne.</p>
      </div>
      <div class="footer-links">
        <h3>Länkar</h3>
        <ul>
          <li><a href="/">Startsida</a></li>
          <li><a href="/villkor/">Allmänna villkor</a></li>
          <li><a href="/integritet/">Integritetspolicy</a></li>
          <li><a href="https://festutrustning.se/offert">Begär offert</a></li>
          <li><a href="https://festutrustning.se/kontakt">Kontakt</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3>Kontakt</h3>
        <ul>
          <li><a href="tel:+46766777232">076-677 72 32</a></li>
          <li><a href="mailto:info@festutrustning.se">info@festutrustning.se</a></li>
          <li>Lockarpsvägen 6B, 213 76 Malmö</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; 2026 festutrustning.se. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </footer>

  <div class="cookie-banner" id="cookie-banner" role="dialog" aria-labelledby="cookie-heading" aria-describedby="cookie-text" hidden>
    <div class="cookie-banner-inner">
      <div class="cookie-banner-content">
        <h2 id="cookie-heading">Cookies på skaneevent.se</h2>
        <p id="cookie-text">Vi använder cookies för att förbättra din upplevelse och analysera trafik. Du kan välja vilka cookies du vill tillåta. Läs mer i vår <a href="/integritet/">integritetspolicy</a>.</p>
      </div>
      <div class="cookie-banner-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="cookie-reject">Endast nödvändiga</button>
        <button type="button" class="btn btn-primary btn-sm" id="cookie-accept">Acceptera alla</button>
      </div>
    </div>
  </div>

  <script>
    const COOKIE_KEY = 'skaneevent_cookie_consent';
    const banner = document.getElementById('cookie-banner');

    function setAnalyticsConsent(granted) {
      gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }

    function saveConsent(value) {
      localStorage.setItem(COOKIE_KEY, value);
      banner.hidden = true;
      setAnalyticsConsent(value === 'all');
    }

    const savedConsent = localStorage.getItem(COOKIE_KEY);
    if (savedConsent === 'all') {
      setAnalyticsConsent(true);
    } else if (savedConsent === 'necessary') {
      setAnalyticsConsent(false);
    } else {
      banner.hidden = false;
    }

    document.getElementById('cookie-accept').addEventListener('click', () => saveConsent('all'));
    document.getElementById('cookie-reject').addEventListener('click', () => saveConsent('necessary'));
  </script>
</body>
</html>`;
}

const termsText = fs.readFileSync(path.join(contentDir, 'terms.txt'), 'utf8');
const privacyText = fs.readFileSync(path.join(contentDir, 'privacy.txt'), 'utf8');

const termsBody = contentToHtml(termsText);
const privacyBody = contentToHtml(privacyText);

const cookieSection = `
        <section class="legal-cookies" aria-labelledby="cookies-heading">
          <h2 id="cookies-heading">Cookies</h2>
          <p>Vår webbplats använder cookies för att förbättra din upplevelse. Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats.</p>
          <h3>Vilka typer av cookies använder vi?</h3>
          <div class="legal-cookie-types">
            <div>
              <h4>Nödvändiga cookies</h4>
              <p>Dessa cookies är nödvändiga för att webbplatsen ska fungera och kan inte stängas av. De lagrar inga personuppgifter.</p>
            </div>
            <div>
              <h4>Funktionella cookies</h4>
              <p>Dessa cookies gör det möjligt för webbplatsen att komma ihåg val du gjort och tillhandahålla förbättrade funktioner.</p>
            </div>
            <div>
              <h4>Analyscookies</h4>
              <p>Dessa cookies hjälper oss att förstå hur besökare interagerar med webbplatsen genom att samla in anonym information.</p>
            </div>
            <div>
              <h4>Marknadsföringscookies</h4>
              <p>Dessa cookies används för att spåra besökare på olika webbplatser i syfte att leverera anpassade annonser.</p>
            </div>
          </div>
          <h3>Hantera dina cookie-inställningar</h3>
          <p>Du kan när som helst ändra dina cookie-inställningar genom att rensa ditt val och ladda om sidan.</p>
          <button type="button" class="legal-cookie-reset" id="cookie-reset">Hantera cookie-inställningar</button>
        </section>`;

const termsHtml = pageShell({
  title: 'Allmänna villkor',
  description: 'Allmänna villkor för uthyrning av eventteknik via festutrustning.se och Enta Sverige AB.',
  canonical: 'https://skaneevent.se/villkor/',
  metaDate: 'Gäller från och med: 1 mars 2024 (senast uppdaterad: 18 april 2026)',
  bodyHtml: termsBody,
});

let privacyHtml = pageShell({
  title: 'Integritetspolicy',
  description: 'Läs om hur vi hanterar dina personuppgifter och cookies på skaneevent.se.',
  canonical: 'https://skaneevent.se/integritet/',
  metaDate: 'Senast uppdaterad: 7 februari 2026',
  bodyHtml: privacyBody,
  extraSections: cookieSection,
});

privacyHtml = privacyHtml.replace(
  `document.getElementById('cookie-reject').addEventListener('click', () => saveConsent('necessary'));`,
  `document.getElementById('cookie-reject').addEventListener('click', () => saveConsent('necessary'));
    document.getElementById('cookie-reset')?.addEventListener('click', () => {
      localStorage.removeItem(COOKIE_KEY);
      banner.hidden = false;
      setAnalyticsConsent(false);
    });`
);

fs.mkdirSync(path.join(root, 'villkor'), { recursive: true });
fs.mkdirSync(path.join(root, 'integritet'), { recursive: true });
fs.writeFileSync(path.join(root, 'villkor', 'index.html'), termsHtml);
fs.writeFileSync(path.join(root, 'integritet', 'index.html'), privacyHtml);

console.log('Generated villkor/index.html and integritet/index.html');
