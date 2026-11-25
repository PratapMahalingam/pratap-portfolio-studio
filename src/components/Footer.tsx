import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="wrap py-6 border-t hair flex flex-wrap items-center justify-between gap-4 mono dim">
      <span>© 2026 {profile.name}</span>
      <span className="flex flex-wrap gap-x-6 gap-y-1">
        <a href={profile.linkedin} target="_blank" rel="noopener" className="inline-flex items-center min-h-11 hover:text-[var(--fg)]">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener" className="inline-flex items-center min-h-11 hover:text-[var(--fg)]">GitHub</a>
        <a href={`mailto:${profile.email}`} className="inline-flex items-center min-h-11 hover:text-[var(--fg)]">Email</a>
        <Link href="/work" className="inline-flex items-center min-h-11 hover:text-[var(--fg)]">Work</Link>
      </span>
    </footer>
  );
}
