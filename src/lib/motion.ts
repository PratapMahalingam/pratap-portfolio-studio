// One set of timing and easing tokens for every animation on the site.
export const EASE = {
  out: "power4.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  css: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssArray: [0.16, 1, 0.3, 1] as [number, number, number, number],
};
export const DUR = { fast: 0.35, base: 0.7, slow: 1.1, xslow: 1.6 };
export const STAGGER = { chars: 0.025, words: 0.06, lines: 0.1, cards: 0.08 };
