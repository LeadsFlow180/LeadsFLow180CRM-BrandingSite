import { ClosingCta } from "@/components/ClosingCta";
import { Features, Workspace } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LanguagesStrip } from "@/components/Languages";
import { TeamStage } from "@/components/TeamStage";

export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <TeamStage />
        <LanguagesStrip />
        <Features />
        <Workspace />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
