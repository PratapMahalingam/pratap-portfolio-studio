"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Magnetic from "../Magnetic";
import { profile } from "@/lib/profile";
import { scene } from "@/lib/sceneStore";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Full-screen hero. On load: the headline rises line by line (masked), copy and
// actions fade in. On scroll: the hero pins, the lines drift apart, the copy
// lifts away and the flow field (via the scene store) begins to turn.
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
      if (reduced) return;

      const splits = lines.map((l) => SplitText.create(l, { type: "chars", mask: "chars" }));
      gsap.set(splits.flatMap((s) => s.chars), { yPercent: 120 });
      gsap.set(fades, { autoAlpha: 0, y: 24 });
      const intro = () =>
        gsap
          .timeline()
          .to(splits.flatMap((s) => s.chars), { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.022 })
          .to(fades, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, "-=0.7");
      if (document.documentElement.dataset.intro === "done") intro();
      else window.addEventListener("intro:done", intro, { once: true });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=110%", scrub: 0.8, pin: true, onUpdate: (s) => (scene.hero = s.progress) },
        });
        tl.to(lines[0], { xPercent: -14, ease: "none" }, 0)
          .to(lines[1], { xPercent: 10, ease: "none" }, 0)
          .to(lines[2], { xPercent: -6, ease: "none" }, 0)
          // the scroll fade drives outer wrappers ([data-hero-out]); the intro drives the inner
          // [data-hero-fade] elements, so the two animations never fight over the same opacity
          .fromTo("[data-hero-out]", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -40, ease: "none", immediateRender: false }, 0)
          .fromTo("[data-hero-title]", { scale: 1, autoAlpha: 1 }, { scale: 0.92, autoAlpha: 0.25, ease: "none", immediateRender: false }, 0.35);
      });
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom top", onUpdate: (s) => (scene.hero = s.progress) });
      });
      return () => {
        window.removeEventListener("intro:done", intro);
        mm.revert();
        splits.forEach((s) => s.revert());
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="intro" data-guide="Intro" data-tone="dark" className="relative min-h-[100svh] wrap pt-28 pb-10 md:pb-24 flex flex-col justify-between overflow-hidden" aria-labelledby="hero-title" data-testid="hero">
      <div data-hero-out>
        <div className="flex flex-wrap justify-between gap-6" data-hero-fade>
          <p className="mono dim max-w-[22ch]">{profile.focus}</p>
          <p className="mono dim">Based in {profile.location}</p>
        </div>
      </div>

      <div data-hero-title className="origin-left">
        <h1 id="hero-title" className="display text-[clamp(2.43rem,7.9vw,9.5rem)]" aria-label={profile.headline.join(" ")}>
          {profile.headline.map((l, i) => (
            <span key={i} data-hero-line className={`block ${i === 1 ? "md:pl-[12vw]" : ""}`} aria-hidden="true">
              {i === 2 ? (<>{l.replace("intelligence.", "")}<span className="serif normal-case tracking-[-0.02em] italic" style={{ fontWeight: 400 }}>intelligence.</span></>) : l}
            </span>
          ))}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_auto] items-end" data-hero-out>
        <p className="max-w-[38ch] text-[clamp(1rem,1.29vw,1.24rem)] leading-snug dim" data-hero-fade>{profile.intro}</p>
        <div className="flex flex-wrap items-center gap-3" data-hero-fade>
          <Magnetic><Link href="/work" className="btn btn--solid" data-cursor="Work">View work</Link></Magnetic>
          <Magnetic><a href={profile.resume} download className="btn" data-cursor="PDF">Download resume</a></Magnetic>
        </div>
      </div>
    </section>
  );
}
