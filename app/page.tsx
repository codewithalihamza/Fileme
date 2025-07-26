import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { CtaSection } from "@/components/view/home/cta-section";
import { Experts } from "@/components/view/home/experts";
import { HeroSection } from "@/components/view/home/hero-section";
import { ServicesSection } from "@/components/view/home/services-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* CTA Section */}
      <CtaSection />
      {/* Experts Section */}
      <Experts />
      <Footer />
    </div>
  );
}
