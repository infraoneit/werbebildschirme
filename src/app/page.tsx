"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UseCases from"@/components/UseCases";
import WhyUs from "@/components/WhyUs";
import Packages from "@/components/Packages";
import TechGrid from "@/components/TechGrid";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ConsultModal from "@/components/ConsultModal";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <UseCases />
      <WhyUs />
      <Packages />
      <TechGrid />
      <Process />
      <FAQ />
      <CTASection />
      <Footer />
      <ConsultModal />
    </main>
  );
}
