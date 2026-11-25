"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "../Magnetic";
import Reveal from "../Reveal";
import { profile } from "@/lib/profile";
import { scene } from "@/lib/sceneStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The closing scene: the page turns blue and the flow field settles into rings
// (scene.resolve) behind the call to action.
export default function FinalScene() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const st = ScrollTrigger.create({ trigger: root.current, start: "top 85%", end: "center center", scrub: true, onUpdate: (s) => (scene.resolve = s.progress) });
      return () => { st.kill(); scene.resolve = 0; };
    },
    { scope: root },
  );
  return (
    <section ref={root} id="contact" data-guide="Contact" data-tone="blue" className="relative wrap min-h-[100svh] flex flex-col justify-center py-24" aria-labelledby="cta-h" data-testid="final-scene">
      <p className="mono dim mb-8">(05) Next step</p>
      <Reveal as="h2" by="chars" className="display text-[clamp(2.28rem,7.22vw,7.6rem)] max-w-[12ch]"><span id="cta-h">Let&apos;s turn data into decisions.</span></Reveal>
      <p className="mt-8 max-w-[44ch] dim text-lg">Open to roles as a {profile.roles.slice(0, 5).join(", ")} or {profile.roles[5]}, in Dubai or remote.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Magnetic><a href={`mailto:${profile.email}`} className="btn btn--solid" data-cursor="Say hi">Email me</a></Magnetic>
        <Magnetic><a href={profile.linkedin} target="_blank" rel="noopener" className="btn" data-cursor="Connect">LinkedIn</a></Magnetic>
        <Magnetic><a href={profile.github} target="_blank" rel="noopener" className="btn" data-cursor="Code">GitHub</a></Magnetic>
        <Magnetic><a href={profile.resume} download className="btn" data-cursor="PDF">Resume</a></Magnetic>
      </div>
    </section>
  );
}
