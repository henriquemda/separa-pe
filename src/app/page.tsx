"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { LiveTicker } from "@/components/LiveTicker";
import { Hero } from "@/components/Hero";
import { InteractiveBookingDemo } from "@/components/InteractiveBookingDemo";
import { MatchmakingShowcase } from "@/components/MatchmakingShowcase";
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalPrefillData, setModalPrefillData] = useState<any>(null);

  const handleOpenBooking = (prefill?: any) => {
    setModalPrefillData(prefill || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "light" ? "light-theme bg-[#f2fbf5] text-slate-900" : "bg-[#040806] text-gray-100"
    } flex flex-col font-sans selection:bg-emerald-400 selection:text-black`}>
      {/* Top Real-time Pichangas Live Ticker */}
      <LiveTicker />

      {/* Responsive Header Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        audienceMode={audienceMode}
        setAudienceMode={setAudienceMode}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Hero Section (Always active with dual-persona dynamic inner views) */}
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

        {/* Persona-Filtered Section Grouping for Zero-Clutter UX */}
        <AnimatePresence mode="wait">
          {audienceMode === "pelotero" ? (
            <motion.div
              key="pelotero-sections"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Real-time Matchmaking / Modo Falta Uno */}
              <MatchmakingShowcase onOpenBooking={handleOpenBooking} />

              {/* Features Showcase Filtered for Peloteros */}
              <FeaturesShowcase audienceMode="pelotero" />

              {/* Peru Regional Coverage */}
              <RegionalCoverage onOpenBooking={handleOpenBooking} />

              {/* Verified Social Proof & Player Reviews */}
              <SocialProof />

              {/* FAQ Section */}
              <FaqSection />
            </motion.div>
          ) : (
            <motion.div
              key="complejo-sections"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Loss Aversion ROI Calculator for Facility Owners */}
              <RoiCalculator onOpenBooking={() => handleOpenBooking()} />

              {/* Features Showcase Filtered for Facility SaaS */}
              <FeaturesShowcase audienceMode="complejo" />

              {/* B2B SaaS Pricing Tiers */}
              <PricingSection onOpenBooking={(plan) => handleOpenBooking({ plan })} />

              {/* Verified Social Proof & Facility Testimonials */}
              <SocialProof />

              {/* FAQ Section */}
              <FaqSection />
            </motion.div>
          )}
        </AnimatePresence>
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

