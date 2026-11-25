"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rows = [
  { word: "Finance", note: "Three-statement models, CAPM, equity research and the economics of risk." },
  { word: "Data", note: "Cleaning, validation, regression and dashboards people can act on." },
  { word: "Intelligence", note: "Machine learning, AI evaluation and models checked against fair controls." },
];

// The page turns light. Each word is drawn as an outline and fills with ink as it
// crosses the screen, sliding in from alternating sides.
export default function Disciplines() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const word = row.querySelector("[data-word]");
        gsap.fromTo(word, { xPercent: i % 2 ? 18 : -18 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "top 35%", scrub: true } });
        gsap.fromTo(word, { "--fill": "0%" }, { "--fill": "100%", ease: "none", scrollTrigger: { trigger: row, start: "top 75%", end: "top 30%", scrub: true } });
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} data-tone="light" className="wrap py-[18vh]" aria-labelledby="disc-h">
      <p className="mono dim mb-10">(03) <span id="disc-h">Where I work</span></p>
      {rows.map((r) => (
        <div key={r.word} data-row className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] items-end gap-4 border-t hair py-6 md:py-8">
          <p data-word className="display outline-fill text-[clamp(3rem,10.5vw,12rem)] leading-[0.85]">{r.word}</p>
          <p className="dim max-w-[30ch] md:pb-4">{r.note}</p>
        </div>
      ))}
    </section>
  );
}
