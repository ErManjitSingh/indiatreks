/**
 * Lightweight no-op animation stubs.
 * Heavy GSAP / Framer Motion removed from the critical path for LCP/INP.
 */
export const fadeUp = {};
export const stagger = {};

export function registerGsapPlugins() {
  /* intentional no-op — load gsap only via dynamic import if cinematic pages return */
}

export const gsap = {
  context: () => ({ revert: () => undefined }),
  fromTo: () => undefined,
  to: () => undefined,
  timeline: () => ({ fromTo: () => undefined, to: () => undefined }),
  utils: { toArray: () => [] as HTMLElement[] },
};

export const ScrollTrigger = {};
