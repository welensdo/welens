import Navbar from "@/components/navbar";
import ScrollVideoHero from "@/components/scroll-video-hero";
import FeaturesCarousel from "@/components/features-carousel";
import UltrathinVideoSection from "@/components/ultrathin-video-section";
import HowItWorks from "@/components/how-it-works";
import BenefitsSection from "@/components/benefits-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />
      <ScrollVideoHero />
      <FeaturesCarousel />
      <UltrathinVideoSection />
      <BenefitsSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}
