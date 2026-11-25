import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import WorkGallery from "@/components/WorkGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Work", description: "Thirteen projects in finance, data analytics, AI and research, each with verified results and code." };

export default function WorkPage() {
  return (
    <>
      <section data-tone="dark" className="wrap pt-36 pb-24 min-h-screen">
        <p className="mono dim mb-6">Index / 13 projects</p>
        <Reveal as="h1" by="chars" onLoad delay={0.1} className="display text-[clamp(3.04rem,11.4vw,11.4rem)]">Work</Reveal>
        <p className="mt-6 mb-14 max-w-[46ch] dim text-lg">Machine learning, finance, analytics and research. Results come from each project&apos;s own repository and resume; nothing is rounded up.</p>
        <WorkGallery />
      </section>
      <Footer />
    </>
  );
}
