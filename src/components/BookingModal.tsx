"use me";
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  QrCode, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatCurrency } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: any;
}

export function BookingModal({ isOpen, onClose, prefillData }: BookingModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedYapeCode, setCopiedYapeCode] = useState(false);
  
  // Data
  const district = prefillData?.district || "Surco, Lima";
  const canchaName = prefillData?.canchaName || "Cancha 1 - Sintético 7v7";
  const slotTime = prefillData?.slotTime || "20:00 - 21:00 (Hoy)";
  const totalPrice = prefillData?.price || 180;
  const numPlayers = 14;
  const perPlayer = Math.ceil(totalPrice / numPlayers);

  useEffect(() => {
    if (isOpen) {
      setStep("details");
    }
  }, [isOpen]);

  const handleProceedToPayment = () => {
    setStep("payment");
  };

  const handleConfirmYape = () => {
    // Trigger victory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00ff87", "#10b981", "#38bdf8", "#f59e0b"]
    });
    setStep("success");
  };

  const copyShareLink = () => {
    const text = `⚽ ¡Muchachos! Ya separé la cancha en Separa.pe para hoy 8:00 PM (${district}). Yapeen su parte de S/ ${perPlayer} al 987-654-321 o entren al link: https://separa.pe/r/pichanga-surco-9823`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden glass-card rounded-3xl border border-emerald-400/40 p-6 sm:p-8 shadow-2xl bg-stadium"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-gray-400 hover:text-white border border-emerald-800"
          >
            <X className="h-5 w-5" />
          </button>

          {/* STEP 1: DETAILS CONFIRMATION */}
          {step === "details" && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Paso 1 de 2: Detalle de Reserva
              </div>

              <h3 className="text-2xl font-black text-white">Reserva tu Cancha en 1-Clic</h3>

              <div className="space-y-3 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Ubicación:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    {district}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cancha:</span>
                  <span className="font-bold text-white">{canchaName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Horario:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {slotTime}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-emerald-800/40 text-base">
                  <span className="font-bold text-gray-300">Total Cancha (1 Hora):</span>
                  <span className="font-black text-amber-400">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Split calculation highlight */}
              <div className="bg-purple-950/40 border border-purple-500/40 p-4 rounded-2xl text-center">
                <span className="text-xs text-purple-300 font-semibold block">
                  Dividiendo cuota entre 14 peloteros:
                </span>
                <span className="text-2xl font-black text-purple-200">
                  {formatCurrency(perPlayer)} <span className="text-xs text-gray-400 font-normal">/ persona</span>
                </span>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="neon-glow-btn w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Continuar a Yape / Plin</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* STEP 2: YAPE / PLIN QR CONFIRMATION */}
          {step === "payment" && (
            <div className="space-y-5 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Zap className="h-4 w-4 fill-purple-400" />
                Paso 2 de 2: Pago por Yape o Plin
              </div>

              <h3 className="text-xl font-extrabold text-white">Escanea y Yapea la Seña</h3>

              {/* QR Code Container */}
              <div className="bg-white p-4 rounded-2xl max-w-[200px] mx-auto shadow-xl border-4 border-emerald-400">
                {/* Simulated QR Visual */}
                <div className="aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center text-white p-2">
                  <QrCode className="h-28 w-28 text-emerald-400" />
                  <span className="text-[10px] font-mono text-gray-300 font-bold mt-1">SEPARA.PE #9823</span>
                </div>
              </div>

              <div className="bg-emerald-950/50 p-4 rounded-2xl border border-emerald-800/40 text-xs text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Monto Seña (50%):</span>
                  <span className="font-bold text-emerald-400">{formatCurrency(totalPrice / 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Titular:</span>
                  <span className="font-bold text-white">Complejo Surco Depor S.A.C.</span>
                </div>
                <div className="flex justify-between">
                  <span>Número Yape:</span>
                  <span className="font-mono font-bold text-amber-400">987-654-321</span>
                </div>
              </div>

              <button
                onClick={handleConfirmYape}
                className="neon-glow-btn w-full py-4 rounded-xl bg-emerald-400 text-black font-extrabold text-base flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span>¡Ya Yapeé! Confirmar Reserva</span>
              </button>
            </div>
          )}

          {/* STEP 3: VICTORY SUCCESS STATE */}
          {step === "success" && (
            <div className="space-y-6 text-center py-4">
              <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">¡Cancha Separada con Éxito! 🎉</h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  Tu turno ha sido bloqueado en {canchaName} para {slotTime}.
                </p>
              </div>

              {/* Share box */}
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50 space-y-3 text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Share2 className="h-4 w-4 text-emerald-400" />
                  Comparte la cuota con tu mancha en WhatsApp:
                </span>
                <p className="text-xs text-gray-300 bg-black/60 p-2.5 rounded-lg border border-emerald-900 font-mono">
                  ⚽ ¡Muchachos! Ya separé la cancha en Separa.pe. Yapeen su parte de S/ {perPlayer} al 987-654-321.
                </p>

                <button
                  onClick={copyShareLink}
                  className="w-full py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedLink ? "¡Copiado al portapapeles!" : "Copiar Texto de WhatsApp"}</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-sm"
              >
                Volver al Inicio
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
