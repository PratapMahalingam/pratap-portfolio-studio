"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// The address is always visible and selectable; the button copies it, and the
// link opens the mail app.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById("email-text")!);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a id="email-text" href={`mailto:${email}`} className="text-[clamp(1.6rem,4vw,3.6rem)] font-semibold tracking-[-0.03em] underline decoration-1 underline-offset-[0.15em]" data-cursor="Write">{email}</a>
      <button type="button" onClick={copy} className="btn !h-10" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={copied ? "y" : "n"} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>{copied ? "Copied" : "Copy"}</motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
