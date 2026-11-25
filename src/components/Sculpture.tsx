"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, Float, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { scene } from "@/lib/sceneStore";

type Mode = "home" | "contact";

// An original blue glass knot. Its pose comes from the scene store (scroll and
// intro, written by GSAP) plus a softly damped pointer tilt.
function Knot({ lite, mode }: { lite: boolean; mode: Mode }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const geo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.34, lite ? 160 : 320, lite ? 24 : 48, 2, 3), [lite]);
  const tilt = useRef({ x: 0, y: 0 });
  // what the glass refracts: a deep blue backdrop (the canvas itself is transparent)
  const backdrop = useMemo(() => new THREE.Color("#1a2a8c"), []);

  useFrame((state, delta) => {
    const g = group.current;
    const m = mesh.current;
    if (!g || !m) return;
    const t = state.clock.elapsedTime;
    // pointer tilt, damped
    tilt.current.x = THREE.MathUtils.damp(tilt.current.x, scene.pointerY * 0.35, 3, delta);
    tilt.current.y = THREE.MathUtils.damp(tilt.current.y, scene.pointerX * 0.5, 3, delta);

    const intro = scene.intro;
    const wide = viewport.aspect > 1.15; // landscape screens put the sculpture beside the headline
    if (mode === "home") {
      const h = scene.hero; // pinned hero progress
      const p = scene.page; // whole page progress
      const r = scene.resolve;
      // emerge from depth, then travel: right of the headline → centre → resolve
      const baseX = wide ? THREE.MathUtils.lerp(viewport.width * 0.27, 0, h) : 0;
      const baseY = wide ? THREE.MathUtils.lerp(0.35, -0.1, h) : THREE.MathUtils.lerp(viewport.height * 0.2, 0, h);
      g.position.x = THREE.MathUtils.damp(g.position.x, THREE.MathUtils.lerp(baseX, 0, r) + Math.sin(p * Math.PI * 2) * (wide ? 1.6 : 0.4) * (1 - r), 4, delta);
      g.position.y = THREE.MathUtils.damp(g.position.y, baseY, 4, delta);
      g.position.z = THREE.MathUtils.lerp(-9, 0, intro);
      const s = (wide ? 0.82 : 0.62) * (0.6 + 0.4 * intro) * (1 + h * 0.3) * (1 - r * 0.2);
      g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 4, delta));
      m.rotation.x = t * 0.12 * (1 - r * 0.7) + h * 1.6 + p * 3.2 + tilt.current.x;
      m.rotation.y = t * 0.18 * (1 - r * 0.7) + h * 2.4 + p * 4.0 + tilt.current.y;
    } else {
      g.position.set(0, 0, THREE.MathUtils.lerp(-6, 0, intro));
      g.scale.setScalar((wide ? 0.95 : 0.7) * (0.6 + 0.4 * intro));
      m.rotation.x = t * 0.06 + tilt.current.x;
      m.rotation.y = t * 0.09 + tilt.current.y;
    }
  });

  return (
    <group ref={group} position={[0, 0, -9]}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh ref={mesh} geometry={geo}>
          <MeshTransmissionMaterial
            samples={lite ? 4 : 10}
            resolution={lite ? 256 : 768}
            transmission={1}
            thickness={1.1}
            roughness={0.06}
            ior={1.45}
            chromaticAberration={lite ? 0.04 : 0.12}
            anisotropicBlur={0.15}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.08}
            color="#5b8cff"
            attenuationColor="#1f4dff"
            attenuationDistance={1.4}
            background={backdrop}
            backside={!lite}
            backsideThickness={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Pointer() {
  // map the pointer to -1..1 on both axes (window-level, so it works under the content)
  useFrame(({ pointer }) => {
    scene.pointerX = pointer.x;
    scene.pointerY = pointer.y;
  });
  return null;
}

export default function Sculpture({ lite: liteProp = false, mode = "home" }: { lite?: boolean; mode?: Mode }) {
  // adaptive quality: drop to the lite material when frames are slow, and hand over to
  // the still image entirely if the device keeps struggling
  const [degraded, setDegraded] = useState(false);
  const lite = liteProp || degraded;
  // stop drawing while the sculpture is hidden (scene:pause / scene:resume) or the tab is in the background
  const [running, setRunning] = useState(true);
  useEffect(() => {
    const pause = () => setRunning(false);
    const resume = () => setRunning(true);
    const vis = () => setRunning(document.visibilityState === "visible");
    window.addEventListener("scene:pause", pause);
    window.addEventListener("scene:resume", resume);
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.removeEventListener("scene:pause", pause);
      window.removeEventListener("scene:resume", resume);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={lite ? 1 : [1, 1.75]}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 40 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      data-testid="sculpture-canvas"
    >
      <PerformanceMonitor
        ms={200}
        iterations={8}
        bounds={() => [24, 50]}
        flipflops={1}
        onDecline={() => setDegraded(true)}
        onFallback={() => window.dispatchEvent(new Event("scene:fallback"))}
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#cfe0ff" />
      <Knot lite={lite} mode={mode} />
      <Pointer />
      {/* studio lighting built in code, so no environment map has to be downloaded */}
      <Environment resolution={lite ? 128 : 256}>
        <Lightformer form="rect" intensity={6} color="#ffffff" position={[0, 4, -4]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={3} color="#9db8ff" position={[0, -4, 3]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#7aa2ff" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={2} color="#c6ff3d" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer form="ring" intensity={3} color="#ffffff" position={[0, 0, 6]} scale={2} />
      </Environment>
    </Canvas>
  );
}
