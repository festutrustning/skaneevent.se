const COOKIE_KEY = 'skaneevent_cookie_consent';

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

function trackFestClicks() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.('[data-fest-link]') as HTMLAnchorElement | null;
    if (!link || typeof gtag !== 'function') return;

    gtag('event', 'festutrustning_click', {
      source_page: window.location.pathname,
      destination_url: link.href,
      link_context: link.dataset.linkContext || 'unknown',
      anchor_type: link.dataset.anchorType || 'unknown',
      position: link.dataset.position || 'inline',
    });
  });
}

function trackLeadForms() {
  document.querySelectorAll('form[data-lead-form]').forEach((form) => {
    form.addEventListener('submit', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          form_id: (form as HTMLFormElement).id || 'offert',
          source_page: window.location.pathname,
        });
      }
    });
  });
}

declare function gtag(...args: unknown[]): void;

initMenu();
initCookies();
trackFestClicks();
trackLeadForms();
