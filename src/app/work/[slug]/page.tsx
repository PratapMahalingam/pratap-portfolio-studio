import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects, getProject } from "@/lib/projects";
import Reveal from "@/components/Reveal";
import CaseStudyMotion from "@/components/CaseStudyMotion";
import ProjectArt from "@/components/ProjectArt";
import Magnetic from "@/components/Magnetic";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: `${p.summary} ${p.metric.value} ${p.metric.label}.` } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <CaseStudyMotion>
      <article data-tone="dark" className="pt-32" data-testid="case-study">
        <header className="wrap">
          <Link href="/work" className="mono dim inline-flex items-center gap-2 hover:text-[var(--fg)]"><ArrowLeft size={14} /> All work</Link>
          <p className="mono dim mt-10">{String(i + 1).padStart(2, "0")} / {p.categories.join(" / ")}</p>
          <Reveal as="h1" by="chars" onLoad delay={0.15} className="display mt-4 text-[clamp(2.8rem,8vw,8.5rem)] max-w-[14ch]">{p.title}</Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] items-end">
            <p className="max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug dim">{p.summary}</p>
            <div className="md:text-right">
              <p className="metric text-[clamp(3rem,6vw,5.5rem)] font-extrabold tracking-[-0.05em] leading-none">{p.metric.value}</p>
              <p className="mono dim mt-2">{p.metric.label}</p>
            </div>
          </div>
        </header>

        <div className="wrap mt-14">
          <ViewTransition name={`project-${p.slug}`} share="morph" default="none">
            <div className="relative overflow-hidden rounded-[24px] aspect-[16/9] bg-[radial-gradient(120%_90%_at_30%_20%,#23284a,#0b0d16_70%)]">
              {p.cover ? (
                <div className="absolute inset-[5%] rounded-xl bg-white overflow-hidden"><Image src={p.cover} alt={p.figures[0]?.alt ?? p.title} fill priority sizes="90vw" className="object-contain p-3" /></div>
              ) : (
                p.art && <ProjectArt kind={p.art} />
              )}
              {p.art && <span className="absolute right-4 top-4 mono rounded-full bg-black/55 text-white/80 px-3 py-1.5">Illustration</span>}
            </div>
          </ViewTransition>
        </div>

        <section className="wrap mt-24 grid gap-x-12 gap-y-6 md:grid-cols-[14rem_1fr] border-t hair pt-10" aria-label="Project facts">
          <p className="mono dim">Stack</p>
          <ul className="flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="mono rounded-full border hair px-3 py-1.5">{s}</li>)}</ul>
          <p className="mono dim">Contribution</p>
          <p>{p.contribution}</p>
          {p.note && (<><p className="mono dim">Note</p><p className="dim">{p.note}</p></>)}
          {p.links.length > 0 && (<><p className="mono dim">Links</p><div className="flex flex-wrap gap-3">{p.links.map((l) => <Magnetic key={l.href}><a href={l.href} target="_blank" rel="noopener" className="btn btn--solid" data-cursor="Open">{l.label} <ArrowUpRight size={14} /></a></Magnetic>)}</div></>)}
        </section>

        {[
          { n: "01", h: "Problem", body: <p className="text-[clamp(1.3rem,2.4vw,2.2rem)] leading-[1.2] tracking-[-0.015em] max-w-[34ch]">{p.problem}</p> },
          { n: "02", h: "Approach", body: <ol className="grid gap-4">{p.approach.map((a, k) => <li key={k} className="grid grid-cols-[2.5rem_1fr] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-snug"><span className="mono dim pt-1">{String(k + 1).padStart(2, "0")}</span>{a}</li>)}</ol> },
        ].map((b) => (
          <section key={b.h} className="wrap mt-24 grid gap-8 md:grid-cols-[14rem_1fr]" data-rise>
            <h2 className="mono dim">({b.n}) {b.h}</h2>
            {b.body}
          </section>
        ))}

        <section className="wrap mt-24" aria-labelledby="ev-h">
          <h2 id="ev-h" className="mono dim mb-8">(03) Evidence</h2>
          <div className="grid gap-px bg-[var(--line)] rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {p.evidence.map((e) => (
              <div key={e.label} data-evidence className="bg-[var(--bg)] p-6 md:p-8">
                <p className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-[-0.04em] leading-none">{e.value}</p>
                <p className="mono dim mt-3">{e.label}</p>
              </div>
            ))}
          </div>
          {p.figures.length > 0 && (
            <div className="mt-10 grid gap-10">
              {p.figures.map((f) => (
                <figure key={f.src}>
                  <div data-figure className="relative overflow-hidden rounded-[24px] bg-white">
                    <Image src={f.src} alt={f.alt} width={1600} height={900} sizes="(max-width: 1024px) 94vw, 80vw" className="w-full h-auto" />
                  </div>
                  <figcaption className="mono dim mt-3">{f.caption} From the project repository.</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>

        <section className="wrap mt-24 grid gap-8 md:grid-cols-[14rem_1fr]" data-rise>
          <h2 className="mono dim">(04) Outcome</h2>
          <p className="text-[clamp(1.5rem,3vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.025em] max-w-[28ch]">{p.outcome}</p>
        </section>

        <Link href={`/work/${next.slug}`} className="group block wrap mt-32 py-16 border-t hair" data-cursor="Next" data-testid="next-project">
          <p className="mono dim">Next project</p>
          <p className="display mt-4 text-[clamp(2.5rem,8vw,8rem)] transition-transform duration-700 group-hover:translate-x-4">{next.title}</p>
        </Link>
      </article>
      <Footer />
    </CaseStudyMotion>
  );
}
