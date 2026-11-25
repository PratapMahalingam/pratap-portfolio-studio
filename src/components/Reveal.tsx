"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { EASE, DUR, STAGGER } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Masked line reveal for headings. The text is real, readable HTML at all times;
// without JS or under reduced motion it simply shows.
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  by = "lines",
  delay = 0,
  onLoad = false,
  start = "top 85%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  by?: "lines" | "words" | "chars";
  delay?: number;
  onLoad?: boolean;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create(el, {
        type: by === "chars" ? "lines,chars" : by === "words" ? "lines,words" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 110,
            rotate: by === "chars" ? 6 : 2,
            duration: DUR.slow,
            ease: EASE.expo,
            stagger: by === "chars" ? STAGGER.chars : by === "words" ? STAGGER.words : STAGGER.lines,
            delay,
            scrollTrigger: onLoad ? undefined : { trigger: el, start, once: true },
          });
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [by, delay, onLoad, start] },
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
