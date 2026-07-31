"use me";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Building2, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PricingSectionProps {
  onOpenBooking: (plan?: string) => void;
}

export function PricingSection({ onOpenBooking }: PricingSectionProps) {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      id: "free",
      name: "Pelotero Standard",
      audience: "Para Jugadores y Capitanes",
      priceMonthly: 0,
      priceAnnual: 0,
      description: "Acceso 100% gratuito para buscar, reservar y dividir cuotas con tu equipo en todo el Perú.",
      features: [
        "Búsqueda de canchas por distrito y horario",
        "Reserva inmediata en 1-Clic",
        "Generador de 'Dividir Cuota' por Yape/Plin",
        "Modo 'Falta 1' para encontrar jugadores",
        "Histórico de pichangas y estadísticas"
      ],
      cta: "Usar Gratis Ahora",
      highlight: false,
      badge: "100% GRATIS"
    },
    {
      id: "pro",
      name: "Cancha Pro (SaaS)",
      audience: "Complejos de 1 a 3 Canchas",
      priceMonthly: 99,
      priceAnnual: 79,
      description: "Automatización total de reservas por Yape/Plin y agenda 24/7 sin comisiones por transacción.",
      features: [
        "Todo lo de Pelotero Standard",
        "Validación Automática de Yape & Plin con IA",
        "Señas automáticas del 50% anti-plantones",
        "Agenda digital sincronizada en tiempo real",
        "Alertas por WhatsApp a tus clientes",
        "Soporte técnico prioritario en Perú"
      ],
      cta: "Prueba Gratis 14 Días",
      highlight: true,
      badge: "MÁS POPULAR"
    },
    {
      id: "enterprise",
      name: "Estadio Enterprise",
      audience: "Complejos de 4+ Canchas",
      priceMonthly: 249,
      priceAnnual: 199,
      description: "Plataforma integral con control de luces IoT, POS para kiosko y reportes contables avazados.",
      features: [
        "Todo lo del Plan Cancha Pro",
        "Integración Hardware IoT para Encendido de Luces",
        "Punto de Venta (POS) para bebidas y snacks",
        "Gestión de múltiples sedes y permisos de staff",
        "Reportes financieros exportables a Excel/SUNAT",
        "Asesor dedicado 24/7 vía WhatsApp"
      ],
      cta: "Solicitar Demostración",
      highlight: false,
      badge: "VIP COMPLEJOS"
    }
  ];

  return (
    <section id="precios" className="py-20 bg-stadium relative border-t border-emerald-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <Building2 className="h-3.5 w-3.5" />
            Transparencia Total Sin Letras Chicas
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Planes diseñados para <span className="text-gradient-turf">hacer crecer tu negocio</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            Empieza hoy con 14 días de prueba gratis. Cancela cuando quieras en 1-clic.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!annualBilling ? "text-white" : "text-gray-400"}`}>
              Pago Mensual
            </span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`w-14 h-7 rounded-full p-1 transition-colors flex items-center ${
                annualBilling ? "bg-emerald-500 justify-end" : "bg-gray-800 justify-start"
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-black font-bold" />
            </button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 ${annualBilling ? "text-emerald-400" : "text-gray-400"}`}>
              Pago Anual
              <span className="bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                AHORRA 20% (2 MESES GRATIS)
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const price = annualBilling ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
                  plan.highlight
                    ? "border-emerald-400 bg-emerald-950/40 shadow-2xl shadow-emerald-500/20 scale-[1.03]"
                    : "border-emerald-800/40 hover:border-emerald-600"
                }`}
              >
                {/* Badge Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      {plan.audience}
                    </span>
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                      plan.highlight
                        ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/30"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-gray-300 min-h-[36px]">{plan.description}</p>

                  <div className="my-6 border-y border-emerald-900/40 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">
                        {price === 0 ? "S/ 0" : formatCurrency(price)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {price === 0 ? "/ siempre" : "/ mes"}
                      </span>
                    </div>
                    {annualBilling && price > 0 && (
                      <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                        Facturado anualmente (S/ {price * 12}/año)
                      </span>
                    )}
                  </div>

                  {/* Features checklist */}
                  <ul className="space-y-3 mb-6 text-xs text-gray-200">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => onOpenBooking(plan.name)}
                    className={`w-full py-3.5 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? "neon-glow-btn bg-emerald-400 text-black"
                        : "bg-emerald-950 text-white border border-emerald-800 hover:border-emerald-400"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">
                    {plan.priceMonthly === 0 ? "Sin tarjeta requerida" : "14 días de prueba gratis • Cancela cuando quieras"}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
