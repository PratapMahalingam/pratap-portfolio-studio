"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, ViewTransition } from "react";
import gsap from "gsap";
import type { Project } from "@/lib/projects";
import ProjectArt from "./ProjectArt";

// A project card with depth: it tilts toward the pointer, a light sweeps across it,
// and the hover swaps in an animated preview where one exists. The media morphs
// into the case-study hero through a shared view transition.
export default function ProjectCard({ p, index, size = "md" }: { p: Project; index: number; size?: "md" | "lg" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    gsap.to(el, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 8, transformPerspective: 1000, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => ref.current && gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });

  return (
    <Link ref={ref} href={`/work/${p.slug}`} className="card group" data-cursor="Open" onPointerMove={onMove} onPointerLeave={onLeave} data-testid="project-card" aria-label={`${p.title}: ${p.metric.value} ${p.metric.label}`}>
      <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
        <div className={`card__media ${size === "lg" ? "!aspect-[16/10]" : ""}`}>
          {p.cover ? (
            <div className="card__plate">
              <Image src={p.cover} alt={p.figures[0]?.alt ?? p.title} fill sizes="(max-width: 768px) 90vw, 40vw" className="!object-contain p-2" />
            </div>
          ) : (
            p.art && <ProjectArt kind={p.art} />
          )}
          {p.preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.preview} alt="" className="card__preview" loading="lazy" />
          )}
          <div className="card__shine" />
          <span className="absolute left-4 top-4 mono rounded-full bg-black/55 text-white px-3 py-1.5 backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
          {p.art && <span className="absolute right-4 top-4 mono rounded-full bg-black/55 text-white/80 px-3 py-1.5">Illustration</span>}
        </div>
      </ViewTransition>
      <div className="flex items-start justify-between gap-6 p-5 md:p-6">
        <div className="min-w-0">
          <p className="mono dim">{p.categories.join(" / ")}</p>
          <h3 className="mt-2 text-[clamp(1.24rem,1.84vw,1.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-2 dim text-[0.95rem] leading-snug max-w-[42ch]">{p.summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="metric text-[clamp(1.2rem,1.89vw,1.89rem)] font-bold tracking-[-0.03em]">{p.metric.value}</p>
          <p className="mono dim mt-1 max-w-[16ch]">{p.metric.label}</p>
        </div>
      </div>
    </Link>
  );
}
