"use me";
"use client";

import { MapPin, Phone, Mail, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020504] border-t border-emerald-900/40 text-gray-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black font-black text-lg">
                ⚽
              </div>
              <span className="text-2xl font-black text-white">
                Separa<span className="text-emerald-400">.pe</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              La plataforma SaaS líder en Perú para reservas instantáneas de canchas sintéticas, gras natural y complejos deportivos.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" /> Pagos seguros 100% verificados por Yape/Plin
            </div>
          </div>

          {/* Col 2: Para Peloteros */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 text-emerald-400">
              Para Peloteros
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">Buscar Cancha en Surco</a></li>
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">Canchas en San Borja</a></li>
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">Canchas en Los Olivos</a></li>
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">Canchas en Arequipa & Trujillo</a></li>
              <li><a href="#beneficios" className="hover:text-emerald-400 transition-colors">Dividir Cuota por WhatsApp</a></li>
            </ul>
          </div>

          {/* Col 3: Para Administradores (SaaS) */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 text-amber-400">
              Para Complejos (SaaS)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#roi" className="hover:text-amber-400 transition-colors">Calculadora de Pérdida ROI</a></li>
              <li><a href="#precios" className="hover:text-amber-400 transition-colors">Prueba Gratis 14 Días</a></li>
              <li><a href="#beneficios" className="hover:text-amber-400 transition-colors">Automatización de Luces IoT</a></li>
              <li><a href="#beneficios" className="hover:text-amber-400 transition-colors">Validación IA de Yape & Plin</a></li>
              <li><a href="#precios" className="hover:text-amber-400 transition-colors">Planes Cancha Pro & Enterprise</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 text-emerald-400">
              Contacto & Soporte Perú
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Av. José Larco 880, Miraflores, Lima - Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Soporte: +51 987 654 321</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>contacto@separa.pe</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Separa.pe S.A.C. Todos los derechos reservados. Hecho con pasión pelotera en Perú 🇵🇪
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400">Términos de Servicio</a>
            <a href="#" className="hover:text-emerald-400">Política de Privacidad</a>
            <a href="#" className="hover:text-emerald-400">Libro de Reclamaciones 📖</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
