"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experience } from "@/lib/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// A line draws down the timeline as you scroll; each entry's dot lights and its
// text slides in when the line reaches it.
export default function Timeline() {
  const root = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-line]", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((el) => {
        gsap.from(el.querySelector("[data-body]"), { x: 40, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 72%", once: true } });
        gsap.from(el.querySelector("[data-dot]"), { scale: 0, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 72%", once: true } });
      });
    },
    { scope: root },
  );
  return (
    <ol ref={root} className="relative pl-10" data-testid="timeline">
      <span data-line className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--fg)]/40" aria-hidden="true" />
      {experience.map((e) => (
        <li key={e.role} data-item className="relative pb-14 last:pb-0">
          <span data-dot className="absolute -left-10 top-2 h-[15px] w-[15px] rounded-full bg-[var(--blue)] ring-4 ring-[var(--bg)]" aria-hidden="true" />
          <div data-body>
            <p className="mono dim">{e.when}</p>
            <h3 className="mt-2 text-[clamp(1.2rem,2.06vw,1.89rem)] font-semibold tracking-[-0.02em] leading-tight">{e.role}</h3>
            <p className="dim mt-1">{e.org}</p>
            <ul className="mt-4 grid gap-2 max-w-[60ch]">{e.points.map((pt) => <li key={pt} className="leading-snug">{pt}</li>)}</ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
