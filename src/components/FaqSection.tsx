"use me";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "¿Cómo funciona la validación automática por Yape o Plin?",
    a: "Cuando un pelotero realiza el Yape o Plin a tu número de complejo, ingresa el número de operación en la app. Nuestro motor de IA valida con el banco en menos de 10 segundos y confirma el turno bloqueando la cancha inmediatamente. Cero capturas truchas."
  },
  {
    q: "¿Cómo funciona la opción 'Dividir Cuota' para peloteros?",
    a: "Al reservar, el capitán genera un link único de WhatsApp con el desglose del costo (ej. S/ 15 c/u entre 12 personas). Cada amigo hace click en el enlace y yapea directamente su parte. El capitán ve en tiempo real quién ya pagó y quién falta."
  },
  {
    q: "¿Qué sucede si un equipo no asiste o cancela a última hora?",
    a: "Con la regla del 50% de seña obligatoria en Separa.pe, si el equipo cancela con menos de 3 horas de anticipación, la seña queda retenida para el complejo deportivo y el slot se publica automáticamente como 'Oferta Relámpago' en la app."
  },
  {
    q: "¿Cómo funciona la automatización de luces de las canchas?",
    a: "Te proporcionamos un módulo inteligente IoT plug-and-play que se conecta al tablero eléctrico de tus reflectores. El sistema enciende las luces exactas 3 minutos antes de que empiece el turno y las apaga al finalizar si no hay reserva posterior."
  },
  {
    q: "¿Puedo probar la plataforma antes de pagar?",
    a: "¡Sí! Todos los complejos deportivos en Perú tienen 14 días de prueba 100% gratuita con soporte personalizado por WhatsApp. No requerimos tarjeta de crédito ni contrato de permanencia."
  }
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#040806] relative border-t border-emerald-900/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Tienes dudas sobre <span className="text-gradient-turf">Separa.pe</span>?
          </h2>
          <p className="mt-2 text-gray-300 text-sm sm:text-base">
            Respondemos las preguntas más comunes de los peloteros y administradores en Perú.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-emerald-800/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-base hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-emerald-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-emerald-900/30 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
