"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FlowField from "../FlowField";
import { scene } from "@/lib/sceneStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fixed 2D flow field behind the home page. It is strongest in the hero and the
// closing scene, and softens behind the reading-heavy About section.
export default function HomeScene() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const st = ScrollTrigger.create({ trigger: "#home", start: "top top", end: "bottom bottom", onUpdate: (s) => (scene.page = s.progress) });
    const about = document.getElementById("about");
    const soften = about
      ? gsap.timeline({ scrollTrigger: { trigger: about, start: "top 80%", end: "bottom 20%", scrub: true } })
          .to(ref.current, { autoAlpha: 0.35, duration: 0.15 }).to(ref.current, { autoAlpha: 0.35, duration: 0.7 }).to(ref.current, { autoAlpha: 1, duration: 0.15 })
      : null;
    return () => { st.kill(); soften?.kill(); scene.page = 0; scene.hero = 0; };
  });
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0"><FlowField mode="home" /></div>;
}
