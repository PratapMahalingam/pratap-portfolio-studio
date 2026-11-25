"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "../ProjectCard";
import Reveal from "../Reveal";
import { projects } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featured = ["fintech-fraud-monitor", "kepler-exoplanet-vetting", "biomed-graphrag-evidence", "spatial-transcriptomics-gnn", "neuron-morphology"]
  .map((s) => projects.find((p) => p.slug === s)!);

// Desktop: the section pins and the cards travel sideways as you scroll down,
// each tilting slightly as it passes. Phones: a plain vertical stack.
export default function FeaturedWork() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((card) => {
          gsap.fromTo(card, { rotate: 2.5, y: 40 }, { rotate: -1.5, y: -20, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((card) =>
          gsap.from(card, { y: 80, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } }),
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} data-tone="dark" className="relative lg:h-[100svh] lg:overflow-hidden py-24 lg:py-0" aria-labelledby="featured-h" data-testid="featured">
      <div data-track className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12 wrap lg:h-full lg:w-max">
        <div className="lg:w-[34vw] shrink-0">
          <p className="mono dim mb-6">(02) Selected work</p>
          <Reveal as="h2" className="display text-[clamp(3rem,7vw,7.5rem)]" by="chars"><span id="featured-h">Evidence, not adjectives.</span></Reveal>
          <p className="mt-6 dim max-w-[34ch]">Real figures from the projects&apos; own repositories. Each one opens into a full case study.</p>
          <Link href="/work" className="btn mt-8" data-cursor="All">All 13 projects</Link>
        </div>
        {featured.map((p, i) => (
          <div key={p.slug} data-slide className="lg:w-[38vw] shrink-0">
            <ProjectCard p={p} index={i} size="lg" />
          </div>
        ))}
      </div>
    </section>
  );
}
