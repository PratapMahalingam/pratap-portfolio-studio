// A tiny mutable store the flow field reads every frame. GSAP writes into it from
// scroll timelines; nothing here triggers React re-renders.
export const scene = {
  intro: 0, // 0 → 1 as the field spreads out after the preloader
  hero: 0, // 0 → 1 across the pinned hero
  page: 0, // 0 → 1 across the whole home page
  resolve: 0, // 0 → 1 in the final contact scene
  pointerX: 0,
  pointerY: 0,
};
