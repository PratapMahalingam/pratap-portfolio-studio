import Link from "next/link";
import Reveal from "../Reveal";
import Timeline from "../Timeline";
import SkillChips from "../SkillChips";
import Magnetic from "../Magnetic";
import { profile, education } from "@/lib/profile";

// About, in the home page's scroll path: who I am, experience, education and skills,
// so a visitor who only scrolls still meets all of it before the contact scene.
export default function AboutFlow() {
  return (
    <section id="about" data-guide="About" data-tone="light" className="wrap py-[14vh]" aria-labelledby="about-h" data-testid="about-flow">
      <p className="mono dim mb-8">(04) <span id="about-h">About</span></p>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <p className="mono dim">{profile.name} / {profile.location}</p>
        <div className="grid gap-8">
          <Reveal as="p" className="text-[clamp(1.25rem,2.1vw,1.9rem)] leading-[1.2] tracking-[-0.02em]">{profile.about}</Reveal>
          <div className="flex flex-wrap gap-3">
            <Magnetic><a href={profile.resume} download className="btn btn--solid" data-cursor="PDF">Download resume</a></Magnetic>
            <Magnetic><Link href="/about" className="btn" data-cursor="More">Full profile</Link></Magnetic>
          </div>
        </div>
      </div>

      <div className="mt-[10vh] grid gap-10 border-t hair pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal as="h3" by="chars" className="display text-[clamp(1.9rem,3.6vw,3.4rem)]">Experience</Reveal>
        <Timeline />
      </div>

      <div className="mt-[8vh] grid gap-10 border-t hair pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal as="h3" by="chars" className="display text-[clamp(1.9rem,3.6vw,3.4rem)]">Education</Reveal>
        <ul className="grid">
          {education.map((e) => (
            <li key={e.title} className="grid gap-1 border-t hair py-5 first:border-t-0 first:pt-0">
              <p className="mono dim">{[e.when, e.detail].filter(Boolean).join(" / ")}</p>
              <p className="text-[clamp(1.05rem,1.5vw,1.35rem)] font-semibold tracking-[-0.015em] leading-tight">{e.title}</p>
              <p className="dim">{e.org}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[8vh] grid gap-10 border-t hair pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal as="h3" by="chars" className="display text-[clamp(1.9rem,3.6vw,3.4rem)]">Skills</Reveal>
        <SkillChips />
      </div>
    </section>
  );
}
