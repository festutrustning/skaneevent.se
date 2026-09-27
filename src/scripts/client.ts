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
      is_offert_event: path === '/offert/event' || path.endsWith('/offert/event'),
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

function trackLeadForms() {
  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
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
  if (!document.body.classList.contains('page-home')) return;

  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 48);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

declare function gtag(...args: unknown[]): void;

initMenu();
initCookies();
initScrollReveal();
initHeroCinematic();
initHomeHeader();
trackFestClicks();
trackPhoneClicks();
trackLeadForms();
trackFaqExpands();
