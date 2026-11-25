"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Scroll-driven typography: each word lights up as the paragraph passes through the screen.
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create("[data-statement]", { type: "words" });
      gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true } });
      return () => split.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} data-tone="dark" className="wrap py-[22vh]" aria-label="About in brief">
      <p className="mono dim mb-8">(01) In brief</p>
      <p data-statement className="max-w-[24ch] text-[clamp(1.52rem,3.95vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
        MBA in AI &amp; Business Analytics. AI research at Mercor. Data science training at the University of Tokyo. Thirteen projects, each with a measured result and code you can read.
      </p>
    </section>
  );
}
