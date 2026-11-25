"use client";
import { useSyncExternalStore } from "react";

// Reduced motion, a fine pointer (mouse), a "lite" flag for low-power devices, and
// WebGL support, read from the browser without effects. On the server, all are null.
type Prefs = { reduced: boolean; finePointer: boolean; lite: boolean; webgl: boolean };

let cached: Prefs | null = null;
let cachedKey = "";

function read(): Prefs {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lite =
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    Boolean(nav.connection?.saveData) ||
    window.matchMedia("(max-width: 768px)").matches;
  const key = `${reduced}${finePointer}${lite}`;
  if (cached && key === cachedKey) return cached;
  cachedKey = key;
  cached = { reduced, finePointer, lite, webgl: cached?.webgl ?? hasWebGL() };
  return cached;
}

function subscribe(cb: () => void) {
  const queries = ["(prefers-reduced-motion: reduce)", "(hover: hover) and (pointer: fine)", "(max-width: 768px)"].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", cb));
  return () => queries.forEach((q) => q.removeEventListener("change", cb));
}

export function usePrefs(): Prefs | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
