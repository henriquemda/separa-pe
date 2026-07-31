"use me";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  DollarSign,
  Zap
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RoiCalculatorProps {
  onOpenBooking: () => void;
}

export function RoiCalculator({ onOpenBooking }: RoiCalculatorProps) {
  const [numFields, setNumFields] = useState(3);
  const [hourlyPrice, setHourlyPrice] = useState(140);
  const [emptyHoursPerWeek, setEmptyHoursPerWeek] = useState(8);

  // Calculations:
  // Weekly lost revenue = numFields * emptyHoursPerWeek * hourlyPrice
  // Monthly lost revenue = Weekly * 4.33
  // Yearly lost revenue = Monthly * 12
  // Separa.pe Estimated Recovery = 85% of lost revenue recovered via dynamic lightning slots & instant Yape señas.
  const weeklyLoss = numFields * emptyHoursPerWeek * hourlyPrice;
  const monthlyLoss = Math.round(weeklyLoss * 4.33);
  const yearlyLoss = monthlyLoss * 12;
  const recoveredMonthly = Math.round(monthlyLoss * 0.85);
  const recoveredYearly = recoveredMonthly * 12;

  return (
    <section id="roi" className="py-20 bg-stadium relative overflow-hidden border-t border-emerald-900/30">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 h-96 w-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
            <AlertTriangle className="h-3.5 w-3.5" />
            Neuromarketing Financial Audit
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ¿Cuánto dinero estás perdiendo en <span className="text-gradient-gold">Horarios Muertos</span>?
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Las reservas canceladas a última hora y los chats de WhatsApp sin respuesta le cuestan miles de soles al mes a tu complejo deportivo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-amber-400" />
              Calculadora de Fuga de Ingresos
            </h3>

            {/* Slider 1: Number of fields */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-300">Número de canchas en tu complejo:</span>
                <span className="text-amber-400 font-extrabold text-base">{numFields} canchas</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={numFields}
                onChange={(e) => setNumFields(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-emerald-950 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 2: Average price per hour */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-300">Precio promedio por hora (Soles):</span>
                <span className="text-amber-400 font-extrabold text-base">{formatCurrency(hourlyPrice)}</span>
              </div>
              <input
                type="range"
                min="60"
                max="300"
                step="10"
                value={hourlyPrice}
                onChange={(e) => setHourlyPrice(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-emerald-950 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Slider 3: Empty hours per week per field */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-300">Horas desocupadas/semana (por cancha):</span>
                <span className="text-amber-400 font-extrabold text-base">{emptyHoursPerWeek} horas / sem</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={emptyHoursPerWeek}
                onChange={(e) => setEmptyHoursPerWeek(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-emerald-950 rounded-lg cursor-pointer h-2"
              />
              <span className="text-[11px] text-gray-400 block mt-1">
                Incluye reservas no confirmadas, cancelaciones en frío y turnos tarde/noche sin llenar.
              </span>
            </div>

          </div>

          {/* Output Loss vs Recovery Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Loss Alert Box */}
            <div className="bg-red-950/40 border border-red-500/40 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="h-4 w-4" />
                Fuga Actual de Dinero (Pérdida Sin Separa.pe)
              </div>
              <div className="text-4xl sm:text-5xl font-black text-red-400">
                -{formatCurrency(monthlyLoss)} <span className="text-sm font-normal text-gray-400">/ mes</span>
              </div>
              <p className="text-xs text-gray-300 mt-2">
                Es equivalente a regalar <span className="font-bold text-red-300">-{formatCurrency(yearlyLoss)}</span> al año en canchas vacías.
              </p>
            </div>

            {/* Separa.pe Recovery Box */}
            <div className="bg-emerald-950/60 border border-emerald-400/50 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="h-4 w-4 fill-emerald-400" />
                Ingreso Adicional Recuperado con Separa.pe
              </div>
              <div className="text-4xl sm:text-5xl font-black text-gradient-turf">
                +{formatCurrency(recoveredMonthly)} <span className="text-sm font-normal text-gray-300">/ mes</span>
              </div>
              <p className="text-sm text-emerald-200 mt-2">
                Recuperas hasta <span className="font-extrabold text-white">+{formatCurrency(recoveredYearly)}</span> al año mediante reservas automáticas por Yape, seña obligatoria del 50% y ofertas relámpago en tu zona.
              </p>

              <div className="mt-6 pt-4 border-t border-emerald-800/40">
                <button
                  onClick={onOpenBooking}
                  className="w-full neon-glow-btn flex items-center justify-center gap-2 rounded-xl bg-emerald-400 py-3.5 text-base font-extrabold text-black shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  <Building2 className="h-5 w-5" />
                  <span>Detener la Fuga y Probar Demo Gratis</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
