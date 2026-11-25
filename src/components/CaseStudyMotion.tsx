"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll choreography for a case study: blocks rise in, figures unmask with a clip
// and drift with parallax, evidence numbers count up.
export default function CaseStudyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) =>
        gsap.from(el, { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
      );
      gsap.utils.toArray<HTMLElement>("[data-figure]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(12% 8% 12% 8% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: true } });
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-evidence]").forEach((el, i) =>
        gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.9, delay: i * 0.08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }),
      );
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
