"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scene } from "@/lib/sceneStore";

// A short counter and a curtain, once per visit (about 1.4 s). Afterwards the
// flow field spreads out from the centre and the page announces "intro:done".
export default function Preloader() {
  const [show, setShow] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("pm-intro") === "1";
      sessionStorage.setItem("pm-intro", "1");
    } catch {}
    const finish = () => {
      document.documentElement.dataset.intro = "done";
      window.dispatchEvent(new Event("intro:done"));
      gsap.to(scene, { intro: 1, duration: reduced ? 0 : 1.8, ease: "expo.out" });
    };
    if (reduced || seen) {
      const id = requestAnimationFrame(() => setShow(false));
      finish();
      return () => cancelAnimationFrame(id);
    }
    const c = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setShow(false) });
    tl.to(c, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => { if (count.current) count.current.textContent = String(Math.round(c.v)).padStart(3, "0"); } })
      .add(finish, "-=0.15")
      .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");
    return () => { tl.kill(); };
  }, []);
  if (!show) return null;
  return (
    <div ref={root} className="preloader" data-testid="preloader" aria-hidden="true">
      <div className="flex justify-between mono"><span>Pratap Mahalingam</span><span>Portfolio 2026</span></div>
      <div className="flex items-end justify-between">
        <span className="mono dim">Finance × Data × AI</span>
        <span ref={count} className="display" style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}>000</span>
      </div>
    </div>
  );
}
