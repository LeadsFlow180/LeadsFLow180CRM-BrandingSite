import { ClosingCta } from "@/components/ClosingCta";
import { Features, Workspace } from "@/components/Features";
import { FlowShowcase } from "@/components/FlowShowcase";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LanguagesStrip } from "@/components/Languages";
import { Pricing } from "@/components/pricing/Pricing";
import { TeamStage } from "@/components/TeamStage";

export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <FlowShowcase />
        <TeamStage />
        <LanguagesStrip />
        <Features />
        <Workspace />
        <Pricing />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
