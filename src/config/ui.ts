export const NAV_MENU_ID = 'menu-mobile';

export const NAV_SCROLLED_THRESHOLD = 8;

export const ACTIVE_SECTION_LINE = 0.4;

export const REVEAL_TARGETS = '.reveal:not(.is-in), .reveal-group:not(.is-in)';

export const TIMELINE_VISIBLE_TOPICS = 2;

export const GSAP_PRELOAD_MARGIN = '600px 0px';

export const COUNT_UP_DURATION_MS = 1400;

export const DEMO_REPLAY_COOLDOWN_MS = 2400;

export const CAROUSEL_MEDIA_QUERY = '(max-width: 767px)';

export const MAGNETIC = {
  pull: 0.35,
  labelPull: 0.15,
  spring: { stiffness: 220, damping: 18, mass: 0.6 },
};

export const ZERO_WIDTH_SPACE = '\u200B';

export const REVEAL_BOOT_SCRIPT =
  "var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.dataset.revealReady)d.classList.remove('js')},4000)";
