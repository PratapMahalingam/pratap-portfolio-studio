"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { House } from "lucide-react";
import type Lenis from "lenis";
import Magnetic from "./Magnetic";
import { profile } from "@/lib/profile";
import { EASE } from "@/lib/motion";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);

  // fade in after the intro; hide on scroll down, show on scroll up
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = () => gsap.to(el, { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.8, ease: "expo.out" });
    if (document.documentElement.dataset.intro === "done") show();
    else { gsap.set(el, { autoAlpha: 0, y: -16 }); window.addEventListener("intro:done", show, { once: true }); }
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      gsap.to(el, { yPercent: y > last && y > 160 ? -120 : 0, duration: 0.5, ease: "power3.out" });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("intro:done", show); };
  }, []);

  // close the menu when the route changes (adjusting state during render, not in an effect)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[120] wrap flex items-center justify-between gap-3 py-5 text-[var(--fg)] transition-colors duration-700" data-testid="nav">
        <Link href="/" className="inline-flex min-h-11 items-center font-extrabold tracking-tight text-[clamp(0.8rem,4vw,1.125rem)] whitespace-nowrap" aria-label="Pratap Mahalingam, home">PRATAP MAHALINGAM</Link>
        <div className="flex items-center gap-3 md:gap-10">
        <Magnetic>
          <Link
            href="/"
            aria-label="Home"
            aria-current={pathname === "/" ? "page" : undefined}
            data-cursor="Home"
            data-testid="home-link"
            onClick={(e) => {
              // already home: glide back to the top instead of reloading
              if (pathname !== "/") return;
              e.preventDefault();
              const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
            }}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${pathname === "/" ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]" : "hair hover:bg-[var(--fg)] hover:text-[var(--bg)]"}`}
          >
            <House size={17} strokeWidth={1.8} aria-hidden="true" style={pathname === "/" ? { color: "var(--bg)" } : undefined} />
          </Link>
        </Magnetic>
        <nav aria-label="Main" className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="mono relative group" aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
              {l.label}
              <span className={`absolute left-0 -bottom-1 h-px bg-current transition-[width] duration-500 ${pathname.startsWith(l.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
          <Magnetic><a href={profile.resume} download className="btn !h-10 !px-5" data-cursor="PDF">Resume</a></Magnetic>
        </nav>
        <button type="button" className="md:hidden mono h-10 px-4 rounded-full border hair" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Menu"}
        </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="fixed inset-0 z-[110] bg-[var(--ink)] text-white wrap pt-28 pb-10 flex flex-col justify-between md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE.cssArray }}>
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
                <motion.div key={l.href} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE.cssArray }}>
                  <Link href={l.href} className="display block" style={{ fontSize: "clamp(3rem, 14vw, 5rem)" }}>{l.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-wrap gap-3">
              <a href={profile.resume} download className="btn btn--solid">Download resume</a>
              <a href={profile.linkedin} target="_blank" rel="noopener" className="btn">LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noopener" className="btn">GitHub</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
