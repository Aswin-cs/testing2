import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AqiSimulator from "@/components/AqiSimulator";
import PollutantMatrix from "@/components/PollutantMatrix";
import UrbanAnatomy from "@/components/UrbanAnatomy";
import SolutionsShowcase from "@/components/SolutionsShowcase";
import MetrologyTable from "@/components/MetrologyTable";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <HeroSection />
      <AqiSimulator />
      <PollutantMatrix />
      <UrbanAnatomy />
      <SolutionsShowcase />
      <MetrologyTable />
      <FaqSection />
      <Footer />
    </main>
  );
}
