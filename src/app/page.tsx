"use me";
"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LiveTicker } from "@/components/LiveTicker";
import { Hero } from "@/components/Hero";
import { InteractiveBookingDemo } from "@/components/InteractiveBookingDemo";
import { RoiCalculator } from "@/components/RoiCalculator";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { RegionalCoverage } from "@/components/RegionalCoverage";
import { SocialProof } from "@/components/SocialProof";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { BookingModal } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";

export default function Home() {
  const [audienceMode, setAudienceMode] = useState<"pelotero" | "complejo">("pelotero");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalPrefillData, setModalPrefillData] = useState<any>(null);

  const handleOpenBooking = (prefill?: any) => {
    setModalPrefillData(prefill || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040806] text-gray-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black">
      {/* Top Real-time Pichangas Live Ticker */}
      <LiveTicker />

      {/* Responsive Header Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        audienceMode={audienceMode}
        setAudienceMode={setAudienceMode}
      />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero
          onOpenBooking={handleOpenBooking}
          audienceMode={audienceMode}
          setAudienceMode={setAudienceMode}
        />

        {/* Interactive Booking & SaaS Admin Demo */}
        <InteractiveBookingDemo
          onOpenBooking={handleOpenBooking}
          audienceMode={audienceMode}
          setAudienceMode={setAudienceMode}
        />

        {/* Loss Aversion ROI Calculator for Complex Owners */}
        <RoiCalculator onOpenBooking={() => handleOpenBooking()} />

        {/* Neuromarketing Features Showcase */}
        <FeaturesShowcase />

        {/* Peru Regional Coverage */}
        <RegionalCoverage onOpenBooking={handleOpenBooking} />

        {/* Verified Social Proof & Reviews */}
        <SocialProof />

        {/* B2B SaaS Pricing Tiers */}
        <PricingSection onOpenBooking={(plan) => handleOpenBooking({ plan })} />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Conversion Bar */}
      <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking & Payment Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefillData={modalPrefillData}
      />
    </div>
  );
}
