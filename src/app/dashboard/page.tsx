"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar, DashboardTab } from "@/components/dashboard/DashboardSidebar";
import { PitchGridTimeline } from "@/components/dashboard/PitchGridTimeline";
import { CanchasConfigModule } from "@/components/dashboard/CanchasConfigModule";
import { MonetizacionModule } from "@/components/dashboard/MonetizacionModule";
import { WhatsappIaMonitorModule } from "@/components/dashboard/WhatsappIaMonitorModule";
import { GoogleCalendarSyncModule } from "@/components/dashboard/GoogleCalendarSyncModule";
import { ReportesModule } from "@/components/dashboard/ReportesModule";
import { NewBookingModal } from "@/components/dashboard/NewBookingModal";
import { BarChart3, TrendingUp, Users, CalendarCheck, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("grid");
  const [activeBranch, setActiveBranch] = useState("los-olivos");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<any>(null);

  const handleOpenSlotBooking = (slot: any) => {
    setSelectedSlotForBooking(slot);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040806] text-gray-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black">
      {/* Top Header */}
      <DashboardHeader
        activeBranch={activeBranch}
        setActiveBranch={setActiveBranch}
        onOpenNewBooking={() => {
          setSelectedSlotForBooking(null);
          setIsBookingModalOpen(true);
        }}
        unreadNotifications={3}
      />

      <div className="flex-grow flex overflow-hidden">
        {/* Left Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingWaActions={1}
        />

        {/* Main Content Area */}
        <main className="flex-grow p-6 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
          {/* Top KPI Cards (Always visible) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Ingresos Hoy (Yape/Plin/Efec)</p>
                <h4 className="text-xl font-black text-white font-mono">S/ 1,840.00</h4>
              </div>
            </div>

            <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Ocupación Peak (Noche)</p>
                <h4 className="text-xl font-black text-emerald-400 font-mono">87.5%</h4>
              </div>
            </div>

            <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Reservas WhatsApp IA</p>
                <h4 className="text-xl font-black text-white font-mono">18 Confirmadas</h4>
              </div>
            </div>

            <div className="bg-[#070e0a] border border-emerald-900/40 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
              <div className="p-3 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Google Calendar Sync</p>
                <h4 className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sincronizado OK
                </h4>
              </div>
            </div>
          </div>

          {/* Tab Views Switching */}
          {activeTab === "grid" && (
            <PitchGridTimeline onSelectSlot={handleOpenSlotBooking} />
          )}

          {activeTab === "canchas" && (
            <CanchasConfigModule />
          )}

          {activeTab === "monetizacion" && (
            <MonetizacionModule />
          )}

          {activeTab === "whatsapp" && (
            <WhatsappIaMonitorModule />
          )}

          {activeTab === "gcal" && (
            <GoogleCalendarSyncModule />
          )}

          {activeTab === "reportes" && (
            <ReportesModule />
          )}

          {activeTab === "configuracion" && (
            <div className="p-8 bg-[#070e0a] border border-emerald-900/40 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Configuración de Sede & Parámetros Generales</h3>
              <p className="text-xs text-gray-400">
                Ajuste de ubigeo, RUC del complejo, números receptores de Yape/Plin y credenciales de WhatsApp Business Cloud API.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialSlotData={selectedSlotForBooking}
      />
    </div>
  );
}
