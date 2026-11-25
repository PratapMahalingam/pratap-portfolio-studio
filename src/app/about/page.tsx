import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import SkillChips from "@/components/SkillChips";
import Magnetic from "@/components/Magnetic";
import Footer from "@/components/Footer";
import { profile, education } from "@/lib/profile";

export const metadata: Metadata = { title: "About", description: "Education, experience and skills of Pratap Mahalingam, MBA in AI & Business Analytics." };

export default function AboutPage() {
  return (
    <>
      <section data-tone="light" className="wrap pt-36 pb-24">
        <p className="mono dim mb-6">About</p>
        <Reveal as="h1" by="chars" onLoad delay={0.1} className="display text-[clamp(3rem,9vw,9.5rem)] max-w-[11ch]">Finance, data &amp; intelligence.</Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <p className="mono dim">{profile.name} / {profile.location}</p>
          <div className="grid gap-8">
            <Reveal as="p" className="text-[clamp(1.4rem,2.6vw,2.4rem)] leading-[1.15] tracking-[-0.02em]">{profile.about}</Reveal>
            <div className="flex flex-wrap gap-3">
              <Magnetic><a href={profile.resume} download className="btn btn--solid" data-cursor="PDF">Download resume</a></Magnetic>
              <Magnetic><a href={profile.linkedin} target="_blank" rel="noopener" className="btn" data-cursor="Connect">LinkedIn</a></Magnetic>
            </div>
          </div>
        </div>
      </section>

      <section data-tone="light" className="wrap py-24 border-t hair grid gap-12 md:grid-cols-[1fr_1.4fr]" aria-labelledby="exp-h">
        <Reveal as="h2" by="chars" className="display text-[clamp(2.4rem,5vw,4.5rem)]"><span id="exp-h">Experience</span></Reveal>
        <Timeline />
      </section>

      <section data-tone="light" className="wrap py-24 border-t hair grid gap-12 md:grid-cols-[1fr_1.4fr]" aria-labelledby="edu-h">
        <Reveal as="h2" by="chars" className="display text-[clamp(2.4rem,5vw,4.5rem)]"><span id="edu-h">Education</span></Reveal>
        <ul className="grid">
          {education.map((e) => (
            <li key={e.title} className="grid gap-1 border-t hair py-6 first:border-t-0 first:pt-0">
              <p className="mono dim">{[e.when, e.detail].filter(Boolean).join(" / ")}</p>
              <p className="text-[clamp(1.2rem,1.9vw,1.7rem)] font-semibold tracking-[-0.015em] leading-tight">{e.title}</p>
              <p className="dim">{e.org}</p>
            </li>
          ))}
        </ul>
      </section>

      <section data-tone="light" className="wrap py-24 border-t hair grid gap-12 md:grid-cols-[1fr_1.4fr]" aria-labelledby="skills-h">
        <Reveal as="h2" by="chars" className="display text-[clamp(2.4rem,5vw,4.5rem)]"><span id="skills-h">Skills</span></Reveal>
        <SkillChips />
      </section>

      <section data-tone="dark" className="wrap py-28" aria-labelledby="roles-h">
        <p className="mono dim mb-6"><span id="roles-h">Roles I&apos;m looking for</span></p>
        <ul className="grid gap-2">
          {profile.roles.map((r) => (
            <li key={r}><Reveal as="span" by="words" className="display block text-[clamp(2.2rem,6vw,6rem)]">{r}</Reveal></li>
          ))}
        </ul>
        <p className="mt-10 dim">Dubai, UAE or remote.</p>
      </section>
      <Footer />
    </>
  );
}
