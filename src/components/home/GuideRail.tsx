"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Stop = { id: string; label: string };

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
};

// Guides a visitor through the home page: a progress rail with every section
// (desktop), and a "Next" button that always points at the following section.
// Sections opt in with data-guide="Label" and an id.
export default function GuideRail() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const id = window.setTimeout(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("#home [data-guide]"));
      setStops(els.map((e) => ({ id: e.id, label: e.dataset.guide ?? "" })));
      triggers = els.map((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) }),
      );
      triggers.push(
        ScrollTrigger.create({
          trigger: "#home", start: "top top", end: "bottom bottom",
          onUpdate: (s) => { if (bar.current) bar.current.style.transform = `scaleY(${s.progress})`; },
        }),
      );
      ScrollTrigger.refresh();
    }, 120);
    return () => { window.clearTimeout(id); triggers.forEach((t) => t.kill()); };
  }, []);

  if (!stops.length) return null;
  const next = stops[active + 1];

  return (
    <>
      <nav aria-label="Page sections" className="fixed right-[var(--pad)] top-1/2 z-40 hidden -translate-y-1/2 md:block" data-testid="guide-rail">
        <div className="relative pl-5">
          <span className="absolute left-0 top-1 bottom-1 w-px bg-[var(--line)]" aria-hidden="true" />
          <span ref={bar} className="absolute left-0 top-1 bottom-1 w-px origin-top bg-[var(--fg)]" style={{ transform: "scaleY(0)" }} aria-hidden="true" />
          <ol className="grid gap-3">
            {stops.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  aria-current={i === active ? "true" : undefined}
                  className={`group flex min-h-6 items-center gap-2 mono text-[10px] transition-colors duration-300 ${i === active ? "text-[var(--fg)]" : "text-[var(--dim)] hover:text-[var(--fg)]"}`}
                >
                  <span className={`h-1.5 rounded-full bg-current transition-all duration-500 ${i === active ? "w-4" : "w-1.5"}`} aria-hidden="true" />
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {next && (
        <button
          type="button"
          onClick={() => scrollToId(next.id)}
          className={`guide-next fixed bottom-5 left-1/2 z-40 -translate-x-1/2 btn h-11 bg-[var(--bg)]/70 px-5 backdrop-blur-md`}
          data-on-intro={active === 0 ? "" : undefined}
          data-testid="guide-next"
          data-cursor="Go"
        >
          <span className="dim">Next</span> {next.label} <ArrowDown size={14} className="guide-next__arrow" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
