"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Sparkles, 
  Menu, 
  X, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  Building2,
  Users,
  ChevronRight,
  Zap,
  Sun,
  Moon
} from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  audienceMode: "pelotero" | "complejo";
  setAudienceMode: (mode: "pelotero" | "complejo") => void;
  theme?: "dark" | "light";
  setTheme?: (theme: "dark" | "light") => void;
}

export function Navbar({ onOpenBooking, audienceMode, setAudienceMode, theme = "dark", setTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (setTheme) {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/30 bg-[#040806]/85 backdrop-blur-md transition-all">
      <div className="w-full flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#040806]">
                <svg className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18" />
                  <path d="M8 4h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H8" />
                  <path d="M16 14H8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h8" />
                </svg>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[9px] font-black text-black shadow">
                PE
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Separa<span className="text-emerald-400">.pe</span>
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Perú 🇵🇪
                </span>
              </div>
              <span className="text-[10px] text-gray-400 tracking-wider">
                RESERVAS DE CANCHAS EN 1-CLIC
              </span>
            </div>
          </a>

          {/* Mode Switcher Toggle (Neuromarketing Dual Audience) */}
          <div className="hidden md:flex items-center rounded-full bg-emerald-950/40 p-1 border border-emerald-800/40 ml-4">
            <button
              onClick={() => setAudienceMode("pelotero")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                audienceMode === "pelotero"
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Soy Pelotero
            </button>
            <button
              onClick={() => setAudienceMode("complejo")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                audienceMode === "complejo"
                  ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Tengo Canchas (SaaS)
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <a href="#demo" className="hover:text-emerald-400 transition-colors">
            {audienceMode === "pelotero" ? "Buscar Cancha" : "Demostración SaaS"}
          </a>
          <a href="#roi" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Calculadora ROI
          </a>
          <a href="#beneficios" className="hover:text-emerald-400 transition-colors">
            Beneficios
          </a>
          <a href="#cobertura" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
            Sedes Perú
          </a>
          <a href="#precios" className="hover:text-emerald-400 transition-colors">
            Precios
          </a>
        </nav>

        {/* Action Buttons & Light/Dark Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Theme Button */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-900/50 transition-all shadow-sm"
            title={theme === "dark" ? "Cambiar a Modo Día ☀️" : "Cambiar a Modo Noche 🌙"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-400" />
            )}
          </button>

          <button
            onClick={onOpenBooking}
            className="neon-glow-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 px-4 py-2 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-95"
          >
            <Sparkles className="h-4 w-4 fill-black" />
            <span>Separar Cancha</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
            aria-label="Toggle Theme Mobile"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-800/40 bg-emerald-950/20 text-gray-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-emerald-900/30 bg-[#040806] px-4 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {/* Audience mode switcher in mobile */}
              <div className="flex items-center rounded-xl bg-emerald-950/60 p-1 border border-emerald-800/40 mb-2">
                <button
                  onClick={() => {
                    setAudienceMode("pelotero");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-1 justify-center items-center gap-1.5 rounded-lg py-2 text-xs font-semibold ${
                    audienceMode === "pelotero"
                      ? "bg-emerald-500 text-black"
                      : "text-gray-400"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  Soy Pelotero
                </button>
                <button
                  onClick={() => {
                    setAudienceMode("complejo");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex flex-1 justify-center items-center gap-1.5 rounded-lg py-2 text-xs font-semibold ${
                    audienceMode === "complejo"
                      ? "bg-amber-400 text-black"
                      : "text-gray-400"
                  }`}
                >
                  <Building2 className="h-3.5 w-3.5" />
                  Tengo Canchas
                </button>
              </div>

              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400"
              >
                {audienceMode === "pelotero" ? "Buscar Cancha Live" : "Demostración Panel SaaS"}
              </a>
              <a
                href="#roi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>Calculadora ROI Complejos</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Recomendado
                </span>
              </a>
              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400"
              >
                Beneficios para Peloteros & Dueños
              </a>
              <a
                href="#cobertura"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400"
              >
                Canchas en Lima y Regiones
              </a>
              <a
                href="#precios"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-200 hover:text-emerald-400"
              >
                Planes y Licencias SaaS
              </a>

              <div className="pt-4 border-t border-emerald-900/30 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full neon-glow-btn flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3 text-sm font-bold text-black"
                >
                  <Sparkles className="h-4 w-4" />
                  Separar Cancha Ahora (Yape/Plin)
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
