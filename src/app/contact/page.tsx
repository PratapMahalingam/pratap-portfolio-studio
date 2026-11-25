import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SculptureStage from "@/components/SculptureStage";
import CopyEmail from "@/components/CopyEmail";
import { profile } from "@/lib/profile";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Pratap Mahalingam: email, LinkedIn, GitHub and resume." };

export default function ContactPage() {
  return (
    <section data-tone="blue" className="relative min-h-[100svh] wrap pt-36 pb-12 flex flex-col justify-between overflow-hidden" data-testid="contact">
      <SculptureStage mode="contact" className="pointer-events-none absolute inset-0 z-0 opacity-80" />
      <div className="relative z-10">
        <p className="mono dim mb-6">Contact</p>
        <Reveal as="h1" by="chars" onLoad delay={0.15} className="display text-[clamp(3rem,10vw,11rem)] max-w-[12ch]">Let&apos;s turn data into decisions.</Reveal>
      </div>
      <div className="relative z-10 mt-16 grid gap-10 md:grid-cols-[1fr_auto] items-end">
        <div className="grid gap-4">
          <p className="mono dim">Email</p>
          <CopyEmail email={profile.email} />
          <p className="dim max-w-[44ch]">Open to {profile.roles.join(", ")} roles, in Dubai or remote.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Magnetic><a href={profile.linkedin} target="_blank" rel="noopener" className="btn btn--solid" data-cursor="Connect">LinkedIn</a></Magnetic>
          <Magnetic><a href={profile.github} target="_blank" rel="noopener" className="btn" data-cursor="Code">GitHub</a></Magnetic>
          <Magnetic><a href={profile.resume} download className="btn" data-cursor="PDF">Resume</a></Magnetic>
        </div>
      </div>
    </section>
  );
}
