"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const items = [
  ["0.908", "F1, fraud monitor"],
  ["0.936", "ROC-AUC, Kepler"],
  ["0.895", "nDCG@10, GraphRAG"],
  ["0.592", "macro-F1, spatial GNN"],
  ["0.412", "Spearman ρ, ProteinGym"],
  ["68.7%", "accuracy, EEG"],
  ["22,000+", "breach records"],
];

// Kinetic numbers: an endless band whose speed and skew react to scroll velocity.
export default function MetricsMarquee() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (s) => {
          const v = gsap.utils.clamp(-1600, 1600, s.getVelocity());
          loop.timeScale(1 + Math.abs(v) / 250);
          skew(v / -160);
          gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: "auto", delay: 0.1 });
        },
      });
      return () => { loop.kill(); st.kill(); };
    },
    { scope: root },
  );
  const row = items.map(([v, l], i) => (
    <span key={i} className="flex items-baseline gap-4 pr-16">
      <span className="text-[clamp(2.28rem,6.08vw,5.7rem)] font-extrabold tracking-[-0.05em] leading-none">{v}</span>
      <span className="mono dim whitespace-nowrap">{l}</span>
      <span className="text-[clamp(1.72rem,3.44vw,3.01rem)] text-[var(--signal)] pl-12" aria-hidden="true">✳</span>
    </span>
  ));
  return (
    <section ref={root} data-tone="dark" className="py-16 border-y hair overflow-hidden" aria-label="Headline results">
      <div data-track className="marquee">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">{row}</div>
      </div>
    </section>
  );
}
