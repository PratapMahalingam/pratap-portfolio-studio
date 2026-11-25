"use client";
import { useEffect, useRef } from "react";
import { scene } from "@/lib/sceneStore";

// A 2D field of short strokes on a canvas.
// - Each stroke follows a slow, drifting flow; the flow turns as the page scrolls.
// - The pointer pushes strokes away and turns them to face it (they lengthen and turn blue).
// - With no pointer activity, a "ghost" pointer drifts through the field on its own.
// - In the closing scene (scene.resolve) the strokes settle into rings around the centre.
// Reduced motion draws one still frame. Rendering pauses when the tab is hidden.
type Mode = "home" | "contact";

// shortest turn between two line angles (a line looks the same rotated by π)
const turn = (from: number, to: number) => {
  let d = (to - from) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  else if (d < -Math.PI / 2) d += Math.PI;
  return d;
};

export default function FlowField({ mode = "home", className = "" }: { mode?: Mode; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

    let w = 0, h = 0;
    let px: Float32Array, py: Float32Array, hx: Float32Array, hy: Float32Array, vx: Float32Array, vy: Float32Array, ang: Float32Array, seed: Float32Array;
    let n = 0;
    let fg = "238,240,246";
    let accent = "47,91,255";

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const toRgb = (v: string) => {
        const m = v.trim().match(/^#([0-9a-f]{6})$/i);
        if (m) { const x = parseInt(m[1], 16); return `${(x >> 16) & 255},${(x >> 8) & 255},${x & 255}`; }
        const r = v.match(/rgba?\(([^)]+)\)/);
        return r ? r[1].split(",").slice(0, 3).join(",") : null;
      };
      fg = toRgb(cs.getPropertyValue("--fg")) ?? fg;
      const tone = document.documentElement.dataset.tone;
      accent = tone === "blue" ? "198,255,61" : "47,91,255";
    };

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = coarse ? 30 : w < 900 ? 26 : 24;
      const cols = Math.ceil(w / gap) + 1, rows = Math.ceil(h / gap) + 1;
      n = cols * rows;
      px = new Float32Array(n); py = new Float32Array(n); hx = new Float32Array(n); hy = new Float32Array(n);
      vx = new Float32Array(n); vy = new Float32Array(n); ang = new Float32Array(n); seed = new Float32Array(n);
      let k = 0;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const jx = (Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1;
        const jy = (Math.sin(i * 39.346 + j * 11.135) * 24634.6345) % 1;
        hx[k] = px[k] = i * gap + jx * gap * 0.35;
        hy[k] = py[k] = j * gap + jy * gap * 0.35;
        seed[k] = Math.abs(jx);
        k++;
      }
    };

    // pointer, in canvas space; ghost takes over after a few idle seconds
    const ptr = { x: -9999, y: -9999, active: false, last: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.active = true; ptr.last = performance.now();
    };
    const onLeave = () => { ptr.active = false; };

    let raf = 0, running = false;
    const t0 = performance.now();
    let gx = -9999, gy = -9999; // smoothed influence point

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const page = mode === "contact" ? 0.85 : scene.page;
      const resolve = mode === "contact" ? 1 : scene.resolve;
      const intro = reduced ? 1 : scene.intro;

      // influence point: real pointer, or a slow lissajous ghost when idle
      const idle = !ptr.active || now - ptr.last > 3500;
      const tx = idle ? w * (0.5 + 0.32 * Math.sin(t * 0.23)) : ptr.x;
      const ty = idle ? h * (0.5 + 0.28 * Math.sin(t * 0.31 + 1.2)) : ptr.y;
      if (gx < -999) { gx = tx; gy = ty; }
      gx += (tx - gx) * (idle ? 0.03 : 0.18);
      gy += (ty - gy) * (idle ? 0.03 : 0.18);
      const R = Math.min(260, Math.max(150, w * 0.16)) * (idle ? 0.8 : 1);
      const R2 = R * R;
      const cx = w * (mode === "contact" ? 0.72 : 0.5), cy = h * 0.5;
      const reveal = intro * Math.hypot(w, h) * 0.75;

      ctx.clearRect(0, 0, w, h);
      const base = new Path2D();
      const hot = new Path2D();
      const flowT = t * 0.12 + page * 6;

      for (let k = 0; k < n; k++) {
        const x0 = hx[k], y0 = hy[k];
        // radial reveal after the preloader
        const dc = Math.hypot(x0 - cx, y0 - cy);
        if (dc > reveal) continue;

        // flow direction (cheap layered sines, no noise library)
        let a = Math.sin(x0 * 0.0042 + flowT) + Math.cos(y0 * 0.0051 - flowT * 0.8) + Math.sin((x0 + y0) * 0.0023 + page * 3);
        a *= 1.6;
        // closing scene: strokes turn tangent to rings around the centre
        if (resolve > 0) {
          const tang = Math.atan2(y0 - cy, x0 - cx) + Math.PI / 2;
          a += turn(a, tang) * resolve;
        }

        // spring back home, pushed by the influence point
        let fx = (x0 - px[k]) * 0.06, fy = (y0 - py[k]) * 0.06;
        const dx = px[k] - gx, dy = py[k] - gy, d2 = dx * dx + dy * dy;
        let heat = 0;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          heat = 1 - d / R;
          const push = heat * heat * 9;
          fx += (dx / d) * push; fy += (dy / d) * push;
          a += turn(a, Math.atan2(-dy, -dx)) * heat; // face the pointer
        }
        vx[k] = (vx[k] + fx) * 0.78; vy[k] = (vy[k] + fy) * 0.78;
        px[k] += vx[k]; py[k] += vy[k];
        ang[k] += turn(ang[k], a) * 0.12;

        const len = 5 + seed[k] * 4 + heat * 14;
        const ca = Math.cos(ang[k]) * len * 0.5, sa = Math.sin(ang[k]) * len * 0.5;
        const p = heat > 0.12 ? hot : base;
        p.moveTo(px[k] - ca, py[k] - sa);
        p.lineTo(px[k] + ca, py[k] + sa);
      }
      ctx.lineCap = "round";
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = `rgba(${fg},0.22)`;
      ctx.stroke(base);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = `rgba(${accent},0.8)`;
      ctx.stroke(hot);

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!running && !reduced) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    const onVis = () => (document.hidden ? stop() : start());

    readColors();
    build();
    if (reduced) frame(performance.now());
    else start();

    const ro = new ResizeObserver(() => { build(); if (reduced) frame(performance.now()); });
    ro.observe(canvas);
    // the page tone changes as sections pass; re-read the colours when it does
    const mo = new MutationObserver(() => { readColors(); if (reduced) frame(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tone"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("scene:pause", stop);
    window.addEventListener("scene:resume", start);
    return () => {
      stop(); ro.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scene:pause", stop);
      window.removeEventListener("scene:resume", start);
    };
  }, [mode]);

  return <canvas ref={ref} aria-hidden="true" data-testid="flow-field" className={`block h-full w-full ${className}`} />;
}
