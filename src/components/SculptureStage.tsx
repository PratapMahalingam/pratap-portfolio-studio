"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefs } from "@/hooks/usePrefs";

// The 3D scene is lazy-loaded on the client only. Without WebGL, or under reduced
// motion, a still image of the same sculpture is shown instead.
const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });

export default function SculptureStage({ mode = "home", className = "" }: { mode?: "home" | "contact"; className?: string }) {
  const prefs = usePrefs();
  // set when the live frame rate stays too low (see PerformanceMonitor in Sculpture)
  const [fellBack, setFellBack] = useState(false);
  useEffect(() => {
    const fb = () => setFellBack(true);
    window.addEventListener("scene:fallback", fb);
    return () => window.removeEventListener("scene:fallback", fb);
  }, []);
  const use3D = Boolean(prefs && prefs.webgl && !prefs.reduced && !fellBack);
  return (
    <div className={className} aria-hidden="true" data-testid="sculpture-stage" data-mode={prefs ? (use3D ? "3d" : "still") : "pending"}>
      {prefs && (use3D ? <Sculpture mode={mode} lite={prefs.lite} /> : <Image src="/sculpture.webp" alt="" fill sizes="(max-width: 768px) 80vw, 45vw" className={mode === "home" ? "object-contain object-top p-[18%] pt-[22%] md:object-right md:p-[6%] md:pl-[52%] md:pt-[8%] opacity-90" : "object-contain p-[12%] opacity-90"} priority={mode === "home"} />)}
    </div>
  );
}
