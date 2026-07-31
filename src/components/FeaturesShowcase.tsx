"use me";
"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Smartphone, 
  Users, 
  Zap, 
  CheckCircle2, 
  Lightbulb, 
  BarChart3, 
  CalendarCheck,
  Lock,
  QrCode,
  Flame
} from "lucide-react";

export function FeaturesShowcase() {
  const features = [
    {
      icon: <Smartphone className="h-6 w-6 text-purple-400" />,
      title: "Validación IA de Yape & Plin",
      description: "Nuestra tecnología verifica al instante la validez del comprobante de Yape o Plin. Dile adiós a capturas truchas o comprobantes falsificados.",
      tag: "Cero Fraudes",
      color: "border-purple-500/30 bg-purple-950/20"
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: "Dividir la Cuota ('Pagar por Cabeza')",
      description: "Genera un enlace rápido para que tus 12 o 14 amigos yapeen su parte individual (ej. S/ 14 c/u). Sin que el capitán tenga que perseguir a nadie.",
      tag: "Para Peloteros",
      color: "border-emerald-500/30 bg-emerald-950/20"
    },
    {
      icon: <Lock className="h-6 w-6 text-amber-400" />,
      title: "Seña Automática del 50% (Anti-Plantón)",
      description: "Elimina el 100% de las cancelaciones a última hora. Si un equipo no confirma con seña en 15 minutos, el slot se libera automáticamente.",
      tag: "100% Garantizado",
      color: "border-amber-500/30 bg-amber-950/20"
    },
    {
      icon: <Flame className="h-6 w-6 text-cyan-400" />,
      title: "Modo 'Falta Uno' (Matchmaking)",
      description: "¿Les falta arquero o 2 defensas para armar la pichanga? Publica tu partido y encuentra jugadores verificados en tu mismo distrito.",
      tag: "Comunidad",
      color: "border-cyan-500/30 bg-cyan-950/20"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
      title: "Automatización de Luces IoT",
      description: "Conecta los reflectores de tus canchas con nuestro sistema. Las luces se encienden al iniciar el turno y se apagan automáticamente al terminar.",
      tag: "Ahorro de Energía",
      color: "border-yellow-500/30 bg-yellow-950/20"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-emerald-400" />,
      title: "Caja Registradora & Ventas de Kiosko",
      description: "Controla no solo las canchas sino también las ventas de rehidratantes, cervezas, chimpunes y pelotas en un solo punto de venta integrado.",
      tag: "Para Complejos",
      color: "border-emerald-500/30 bg-emerald-950/20"
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-[#040806] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-3">
            <Zap className="h-3.5 w-3.5 fill-emerald-400" />
            Ingeniería de Experiencia Neuro-Diseñada
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Diseñado para la verdadera <span className="text-gradient-turf">cultura pelotera</span> del Perú
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Combinamos la velocidad que buscan los jugadores con el control absoluto que exigen los dueños de complejos deportivos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-card p-6 rounded-2xl border ${feat.color} hover:scale-[1.02] transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#040806] border border-gray-800">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/40">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{feat.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/30 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Disponible en Separa.pe App & Web</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
