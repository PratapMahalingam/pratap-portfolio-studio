"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "@/lib/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Skill groups reveal chip by chip. The chips are visible in the HTML; the
// animation only runs when JavaScript does and motion is allowed. No ratings.
export default function SkillChips() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-group]").forEach((g) =>
        gsap.from(g.querySelectorAll("li"), { y: 16, scale: 0.9, autoAlpha: 0, duration: 0.6, ease: "expo.out", stagger: 0.04, scrollTrigger: { trigger: g, start: "top 88%", once: true } }),
      );
    },
    { scope: root },
  );
  return (
    <div ref={root} className="grid gap-10 md:grid-cols-2" data-testid="skills">
      {skills.map((g) => (
        <div key={g.group} data-group>
          <h3 className="mono dim mb-4">{g.group}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s} className="rounded-full border hair px-4 py-2 text-[0.95rem] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-300">{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
