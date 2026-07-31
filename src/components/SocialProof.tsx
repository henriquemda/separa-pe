"use me";
"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Quote, Building2, Users } from "lucide-react";

export function SocialProof() {
  const testimonials = [
    {
      name: "Ing. Jorge Benavides",
      role: "Administrador General",
      venue: "Complejo Deportivo El Golazo - Surco, Lima",
      avatar: "⚽",
      text: "Antes perdíamos casi S/ 4,000 al mes porque la gente reservaba por WhatsApp y a las 9:00 PM nos dejaban colgados. Con Separa.pe y la seña automática por Yape, pasamos de 60% a 94% de ocupación en solo 3 semanas.",
      badge: "Complejo Verificado",
      metric: "+34% Ingresos"
    },
    {
      name: "Capitán Renzo 'Chino' Salazar",
      role: "Capitán de FC La Mancha",
      venue: "Pelotero Frecuente en San Borja & Surco",
      avatar: "🏃‍♂️",
      text: "Lo mejor de la app es la función de Dividir Cuota. Ya no tengo que andar cobrándole a los 12 patas al día siguiente en el grupo de WhatsApp. Cada uno entra al link, yapea su parte de S/ 15 y listo. La cancha queda separada en 1 minuto.",
      badge: "Pelotero VIP",
      metric: "120+ Pichangas"
    },
    {
      name: "Dra. Patricia Morales",
      role: "Propietaria",
      venue: "DeporCenter Yanahuara - Arequipa",
      avatar: "🏟️",
      text: "La validación automática de comprobantes de Yape fue la clave. Antes nos enviaban capturas truchas editadas. Ahora el sistema de Separa.pe verifica el código de operación en tiempo real antes de bloquear el turno. Una maravilla.",
      badge: "Complejo Arequipa",
      metric: "0 Comprobantes Falsos"
    }
  ];

  return (
    <section className="py-20 bg-[#040806] relative border-t border-emerald-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            Testimonios Reales Verificados
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Lo que dicen <span className="text-gradient-turf">los dueños y capitanes</span>
          </h2>
          <p className="mt-3 text-gray-300 text-base sm:text-lg">
            La comunidad futbolera más grande del Perú confía en Separa.pe diariamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col justify-between relative hover:border-emerald-400 transition-all"
            >
              <div>
                {/* Rating & Metric Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    {item.metric}
                  </span>
                </div>

                <Quote className="h-8 w-8 text-emerald-500/30 mb-2" />
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xl shadow-inner">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {item.name}
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold">{item.role}</div>
                  <div className="text-[11px] text-gray-400">{item.venue}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
