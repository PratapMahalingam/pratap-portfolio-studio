"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SculptureStage from "../SculptureStage";
import { scene } from "@/lib/sceneStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Fixed 3D layer behind the home page; it fades out over the light section so
// the outline type stays crisp, then returns for the final scene.
export default function HomeScene() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const st = ScrollTrigger.create({ trigger: "#home", start: "top top", end: "bottom bottom", onUpdate: (s) => (scene.page = s.progress) });
    const light = document.querySelector("#home [data-tone='light']");
    const fade = light
      ? gsap.timeline({ scrollTrigger: { trigger: light, start: "top 70%", end: "bottom 30%", scrub: true } }).to(ref.current, { autoAlpha: 0, duration: 0.2 }).to(ref.current, { autoAlpha: 0, duration: 0.6 }).to(ref.current, { autoAlpha: 1, duration: 0.2 })
      : null;
    // pause rendering while the sculpture is fully hidden behind the light section
    const pauser = light
      ? ScrollTrigger.create({ trigger: light, start: "top 40%", end: "bottom 60%", onToggle: (s) => window.dispatchEvent(new Event(s.isActive ? "scene:pause" : "scene:resume")) })
      : null;
    return () => { st.kill(); fade?.kill(); pauser?.kill(); window.dispatchEvent(new Event("scene:resume")); scene.page = 0; scene.hero = 0; };
  });
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0"><SculptureStage mode="home" className="absolute inset-0" /></div>;
}
