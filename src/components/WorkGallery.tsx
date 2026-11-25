"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import { projects, categories, type Category } from "@/lib/projects";
import { EASE } from "@/lib/motion";

// Filter chips with an animated indicator; cards reflow with layout animation
// and enter with a stagger.
export default function WorkGallery() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const shown = projects.filter((p) => filter === "All" || p.categories.includes(filter));
  const grid = useRef<HTMLUListElement>(null);
  // first entrance runs only with JS and motion allowed; the server HTML shows every card
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(grid.current!.children, { y: 70, autoAlpha: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.25 });
  }, { scope: grid });
  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
          const active = c === filter;
          return (
            <button key={c} role="tab" aria-selected={active} onClick={() => setFilter(c)} className="relative h-11 px-5 rounded-full border hair mono" data-testid={`filter-${c}`}>
              {active && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-[var(--fg)]" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <span className={`relative transition-colors duration-300 ${active ? "text-[var(--bg)]" : ""}`}>{c} <span className="opacity-60">{count}</span></span>
            </button>
          );
        })}
      </div>
      <motion.ul ref={grid} layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-testid="work-grid">
        {/* initial={false}: cards present on first render are not hidden by an entrance */}
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => (
            <motion.li key={p.slug} layout initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
              transition={{ duration: 0.8, ease: EASE.cssArray, delay: Math.min(i, 8) * 0.05 }}>
              <ProjectCard p={p} index={projects.indexOf(p)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
