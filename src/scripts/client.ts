const COOKIE_KEY = 'skaneevent_cookie_consent';
const SITE_ID = 'skaneevent';

function setAnalyticsConsent(granted: boolean) {
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
  }
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
    document.body.classList.toggle('menu-open', !open);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
      document.body.classList.remove('menu-open');
    });
  });
}

function initCookies() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const saveConsent = (value: string) => {
    localStorage.setItem(COOKIE_KEY, value);
    banner.hidden = true;
    setAnalyticsConsent(value === 'all');
  };

  const saved = localStorage.getItem(COOKIE_KEY);
  if (saved === 'all') setAnalyticsConsent(true);
  else if (saved === 'necessary') setAnalyticsConsent(false);
  else banner.hidden = false;

  document.getElementById('cookie-accept')?.addEventListener('click', () => saveConsent('all'));
  document.getElementById('cookie-reject')?.addEventListener('click', () => saveConsent('necessary'));
  document.getElementById('cookie-reset')?.addEventListener('click', () => {
    localStorage.removeItem(COOKIE_KEY);
    banner.hidden = false;
    setAnalyticsConsent(false);
  });
}

/** Parse attribution params already present on outbound /offert/event URLs. */
function attributionFromHref(href: string): {
  sk_ref: string | null;
  cta_context: string | null;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  is_offert_event: boolean;
} {
  try {
    const url = new URL(href, window.location.origin);
    const path = url.pathname.replace(/\/$/, '') || '/';
    return {
      sk_ref: url.searchParams.get('sk_ref'),
      cta_context: url.searchParams.get('cta_context'),
      utm_campaign: url.searchParams.get('utm_campaign'),
      utm_source: url.searchParams.get('utm_source'),
      utm_medium: url.searchParams.get('utm_medium'),
      is_offert_event: path === '/offert' || path === '/offert/event' || path.endsWith('/offert/event'),
    };
  } catch {
    return {
      sk_ref: null,
      cta_context: null,
      utm_campaign: null,
      utm_source: null,
      utm_medium: null,
      is_offert_event: false,
    };
  }
}

/**
 * Existing event name `festutrustning_click` is the Skaneevent CTA / outbound standard.
 * Do not invent a parallel quote_cta_click — enrich this event instead.
 */
function trackFestClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.('[data-fest-link]') as HTMLAnchorElement | null;
    if (!link || typeof gtag !== 'function') return;

    const attr = attributionFromHref(link.href);
    const ctaContext =
      link.dataset.linkContext || attr.cta_context || 'unknown';

    gtag('event', 'festutrustning_click', {
      site: SITE_ID,
      page_path: window.location.pathname,
      source_page: window.location.pathname,
      destination_url: link.href,
      destination: link.href,
      link_context: ctaContext,
      cta_context: ctaContext,
      anchor_type: link.dataset.anchorType || 'unknown',
      position: link.dataset.position || 'inline',
      sk_ref: attr.sk_ref,
      utm_campaign: attr.utm_campaign,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      outbound_to_offert: attr.is_offert_event,
    });
  });
}

/** Phone interest signal only — never treat as booking. */
function trackPhoneClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
    if (!link || typeof gtag !== 'function') return;

    const ctaContext = link.dataset.linkContext || link.dataset.phoneContext || 'phone';

    gtag('event', 'phone_click', {
      site: SITE_ID,
      page_path: window.location.pathname,
      source_page: window.location.pathname,
      destination_url: link.href,
      cta_context: ctaContext,
      link_context: ctaContext,
    });
  });
}

const QUOTE_ATTRIBUTION_KEY = 'skaneevent_quote_attribution';
const QUOTE_LEAD_KEY = 'skaneevent_lead_uid';

function readQuoteAttribution(): Record<string, string> {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(QUOTE_ATTRIBUTION_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function initQuoteAttribution() {
  const params = new URLSearchParams(window.location.search);
  const stored = readQuoteAttribution();
  if (!stored.landing_page) {
    stored.landing_page = `${window.location.pathname}${window.location.search}`;
    if (document.referrer) stored.referrer = document.referrer;
  }
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']) {
    const value = params.get(key);
    if (value && !stored[key]) stored[key] = value;
  }
  const skRef = params.get('sk_ref');
  const ctaContext = params.get('cta_context');
  if (skRef) stored.sk_ref = skRef;
  if (ctaContext) stored.cta_context = ctaContext;
  sessionStorage.setItem(QUOTE_ATTRIBUTION_KEY, JSON.stringify(stored));
}

function leadUid(): string {
  const existing = sessionStorage.getItem(QUOTE_LEAD_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  sessionStorage.setItem(QUOTE_LEAD_KEY, created);
  return created;
}

function trackLeadForms() {
  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
    if (form instanceof HTMLFormElement && form.dataset.intakeUrl !== undefined) return;
    form.addEventListener('submit', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          site: SITE_ID,
          form_id: (form as HTMLFormElement).id || 'offert',
          source_page: window.location.pathname,
          page_path: window.location.pathname,
        });
      }
    });
  });
}

function initOffertForm() {
  const form = document.getElementById('offert-form');
  if (!(form instanceof HTMLFormElement)) return;

  const button = form.querySelector('button[type="submit"]');
  const errorBox = document.getElementById('offert-error');
  const retry = document.getElementById('offert-retry');
  if (!(button instanceof HTMLButtonElement)) return;
  const idleLabel = button.textContent || 'Skicka offertförfrågan';

  const showError = () => {
    if (errorBox) errorBox.hidden = false;
    button.disabled = false;
    button.textContent = idleLabel;
  };

  const submit = async () => {
    if (!form.reportValidity()) return;
    errorBox?.setAttribute('hidden', '');
    button.disabled = true;
    button.textContent = 'Skickar…';

    const data = new FormData(form);
    const attribution = readQuoteAttribution();
    const payload = {
      turnstile_token: String(data.get('cf-turnstile-response') || ''),
      lead_uid: leadUid(),
      company: data.get('foretag'),
      contact_name: data.get('kontaktperson'),
      email: data.get('epost'),
      phone: data.get('telefon'),
      city: data.get('ort'),
      event_type: data.get('eventtyp'),
      needs: data.get('behov'),
      event_date: data.get('datum') || null,
      guest_count: data.get('gaster') || null,
      budget: data.get('budget') || null,
      message: data.get('meddelande') || null,
      bot_field: data.get('bot-field') || '',
      attribution: {
        utm_source: attribution.utm_source || null,
        utm_medium: attribution.utm_medium || null,
        utm_campaign: attribution.utm_campaign || null,
        utm_term: attribution.utm_term || null,
        utm_content: attribution.utm_content || null,
        gclid: attribution.gclid || null,
        landing_page: attribution.landing_page || null,
        referrer: attribution.referrer || null,
        sk_ref: attribution.sk_ref || null,
        cta_context: attribution.cta_context || null,
      },
    };

    const backup = () => {
      const params = new URLSearchParams();
      data.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });
      return fetch('/offert/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }).catch(() => undefined);
    };

    const intakeUrl = form.dataset.intakeUrl || '';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10000);
    try {
      if (!intakeUrl) throw new Error('missing-intake');
      const response = await fetch(intakeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; quote_id?: string } | null;
      if (!response.ok || !result?.ok || !result.quote_id) throw new Error('intake');
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          site: SITE_ID,
          form_id: 'offert-form',
          lead_uid: payload.lead_uid,
          cta_context: payload.attribution.cta_context,
          source_page: window.location.pathname,
          page_path: window.location.pathname,
        });
      }
      window.location.assign('/offert/tack/');
    } catch {
      void backup();
      showError();
    } finally {
      window.clearTimeout(timer);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    void submit();
  });
  retry?.addEventListener('click', () => {
    void submit();
  });
}

/**
 * FAQ interest signal — only user-opened details (default-open first item does not fire).
 * Requires GA4 event-scoped custom dimensions faq_id + faq_question for by-question reporting.
 */
function trackFaqExpands() {
  document.addEventListener(
    'toggle',
    (event) => {
      const el = event.target;
      if (!(el instanceof HTMLDetailsElement)) return;
      if (!el.classList.contains('faq-item') || !el.open) return;
      if (typeof gtag !== 'function') return;

      const summary = el.querySelector('summary');
      const question = (el.dataset.faqQuestion || summary?.textContent || '').trim();
      const faqId =
        (el.dataset.faqId || '').trim() ||
        question
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 80) ||
        'faq';

      gtag('event', 'faq_expand', {
        site: SITE_ID,
        page_path: window.location.pathname,
        source_page: window.location.pathname,
        faq_id: faqId,
        faq_question: question.slice(0, 120),
      });
    },
    true,
  );
}

function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initHeroCinematic() {
  const hero = document.querySelector('[data-hero-cinematic]');
  if (!hero) return;

  requestAnimationFrame(() => hero.classList.add('is-ready'));

  const slides = hero.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let current = 0;
  window.setInterval(() => {
    slides[current]?.classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current]?.classList.add('is-active');
  }, 5500);
}

function initHomeHeader() {
  const darkHero = document.body.classList.contains('page-home') || document.body.classList.contains('has-dark-hero');
  if (!darkHero) return;

  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.home-hero, .landing-hero');
  if (!(header instanceof HTMLElement)) return;

  const onScroll = () => {
    const pastHero = hero instanceof HTMLElement
      ? hero.getBoundingClientRect().bottom <= header.offsetHeight + 1
      : window.scrollY > 48;
    header.classList.toggle('is-scrolled', pastHero);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

declare function gtag(...args: unknown[]): void;

initMenu();
initCookies();
initQuoteAttribution();
initScrollReveal();
initHeroCinematic();
initHomeHeader();
trackFestClicks();
trackPhoneClicks();
trackLeadForms();
trackFaqExpands();
initOffertForm();
