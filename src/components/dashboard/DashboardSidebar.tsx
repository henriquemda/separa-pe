"use client";

import { 
  CalendarDays, 
  Dribbble, 
  Coins, 
  MessageSquareCode, 
  CalendarSync, 
  BarChart3, 
  Settings,
  Users,
  Clock,
  Sparkles
} from "lucide-react";

export type DashboardTab = 
  | "grid"
  | "canchas"
  | "monetizacion"
  | "whatsapp"
  | "gcal"
  | "reportes"
  | "configuracion";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  pendingWaActions: number;
}

export function DashboardSidebar({
  activeTab,
  setActiveTab,
  pendingWaActions
}: DashboardSidebarProps) {
  const menuItems = [
    {
      id: "grid" as DashboardTab,
      label: "Matriz de Reservas",
      icon: CalendarDays,
      badge: null
    },
    {
      id: "canchas" as DashboardTab,
      label: "Canchas & Tarifas",
      icon: Dribbble,
      badge: null
    },
    {
      id: "monetizacion" as DashboardTab,
      label: "Créditos & Eventos",
      icon: Coins,
      badge: "Nuevo"
    },
    {
      id: "whatsapp" as DashboardTab,
      label: "Agente IA WhatsApp",
      icon: MessageSquareCode,
      badge: pendingWaActions > 0 ? `${pendingWaActions} OCR` : null,
      badgeColor: "bg-emerald-500 text-black font-bold"
    },
    {
      id: "gcal" as DashboardTab,
      label: "Sync Google Calendar",
      icon: CalendarSync,
      badge: "Sync OK"
    },
    {
      id: "reportes" as DashboardTab,
      label: "Reportes & Ocupación",
      icon: BarChart3,
      badge: null
    },
    {
      id: "configuracion" as DashboardTab,
      label: "Configuración Sede",
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-[#050a07] border-r border-emerald-900/30 flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-semibold">
            Módulos Principales
          </p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-950/50"
                    : "text-gray-400 hover:text-gray-200 hover:bg-emerald-950/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      item.badgeColor || "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-emerald-400">
          <span className="font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Estado del Bot
          </span>
          <span className="text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">
            v2.4 Online
          </span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight">
          Sincronización activa con Google Calendar y OCR Yape/Plin habilitado.
        </p>
      </div>
    </aside>
  );
}
