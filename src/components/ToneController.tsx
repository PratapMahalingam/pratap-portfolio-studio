"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sections declare data-tone="dark|light|blue"; the page background shifts to match
// as each one reaches the middle of the screen.
export default function ToneController() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    let triggers: ScrollTrigger[] = [];
    const setup = () => {
    // visited routes stay mounted but hidden (React Activity), so only read visible sections
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-tone]")).filter((s) => s.checkVisibility());
    const first = sections[0]?.dataset.tone ?? "dark";
    root.dataset.tone = first;
    triggers = sections.map((s) =>
      ScrollTrigger.create({
        trigger: s,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) root.dataset.tone = s.dataset.tone ?? "dark";
        },
      }),
    );
    ScrollTrigger.refresh();
    };
    const id = window.setTimeout(setup, 60);
    return () => {
      window.clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);
  return null;
}
