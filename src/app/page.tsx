import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import MetricsMarquee from "@/components/home/MetricsMarquee";
import FeaturedWork from "@/components/home/FeaturedWork";
import Disciplines from "@/components/home/Disciplines";
import FinalScene from "@/components/home/FinalScene";
import HomeScene from "@/components/home/HomeScene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="home" className="relative">
      <HomeScene />
      <div className="relative z-10">
        <Hero />
        <Statement />
        <MetricsMarquee />
        <FeaturedWork />
        <Disciplines />
        <FinalScene />
        <Footer />
      </div>
    </div>
  );
}
