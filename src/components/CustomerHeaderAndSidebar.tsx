import React from 'react';
import { ViewMode } from '../types';
import {
  Folder,
  UserCheck,
  CheckCircle2,
  Sliders,
  FileText,
  LayoutGrid,
  ShieldCheck,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';

interface CustomerNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita: () => void;
  children: React.ReactNode;
}

export const CustomerLayout: React.FC<CustomerNavProps> = ({
  currentView,
  onNavigate,
  onOpenAmmissibilita,
  children
}) => {
  return (
    <div className="min-h-screen bg-[#F7FAFF] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A0045] text-white flex-shrink-0 flex flex-col justify-between hidden md:flex min-h-screen border-r border-[#1F299C]/30 sticky top-0 h-screen">
        <div>
          {/* Logo brand */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer select-none"
            >
              <div className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#719CFF]"></span>
                Smart Plaza
              </div>
              <div className="text-[10px] text-[#A5C2FF] font-semibold tracking-wider uppercase mt-0.5">
                CUSTOMER AREA
              </div>
            </div>
          </div>

          {/* Section: SERVIZI & BANDI */}
          <div className="px-4 py-4">
            <div className="text-[11px] font-semibold text-white/50 tracking-wider uppercase px-3 mb-2">
              SERVIZI & BANDI
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => onNavigate('bandi')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'bandi'
                    ? 'bg-[#1F299C] text-white font-semibold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-[#A5C2FF]" />
                <span>Bandi</span>
              </button>

              <button
                onClick={() => onNavigate('categoria-innovazione')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'categoria-innovazione'
                    ? 'bg-[#1F299C] text-white font-semibold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-[#A5C2FF]" />
                <span>Catalogo</span>
              </button>

              <button
                onClick={() => onNavigate('customer-progetti')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'customer-progetti' || currentView === 'customer-progetto-detail'
                    ? 'bg-[#1F299C] text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Folder className="w-4 h-4 text-[#A5C2FF]" />
                <span>Progetti</span>
              </button>

              <button
                onClick={onOpenAmmissibilita}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-[#7EC8C3]" />
                <span>Richieste ammissibilità</span>
              </button>

              <button
                onClick={() => onNavigate('customer-profilo')}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Sliders className="w-4 h-4 text-[#A5C2FF]" />
                <span>Preferenze</span>
              </button>

              <button
                onClick={() => onNavigate('customer-profilo')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'customer-profilo'
                    ? 'bg-[#1F299C] text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4 text-[#A5C2FF]" />
                <span>Profilo</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Badge: Servizio Attivo */}
        <div className="p-4 border-t border-white/10 m-3 rounded-lg bg-white/5">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Servizio Attivo</div>
              <div className="text-[11px] text-[#A5C2FF]">Desk Finanza Agevolata 2024</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#D3E0FF] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 text-xs text-[#364349]">
            <span className="font-semibold text-[#1F299C]">Area Clienti</span>
            <span className="text-[#D3E0FF]">/</span>
            <span className="text-[#283759] font-medium">Desk Operativo</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 text-[#767684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cerca bandi, protocolli..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D3E0FF] focus:outline-none focus:border-[#719CFF] focus:ring-2 focus:ring-[#719CFF]/20"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-2 rounded-lg text-[#364349] hover:bg-[#F7FAFF] relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8590C]"></span>
            </button>

            {/* Profile Dropdown */}
            <div
              onClick={() => onNavigate('customer-profilo')}
              className="flex items-center gap-2.5 pl-2 cursor-pointer hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-full bg-[#1F299C] text-white text-xs font-bold flex items-center justify-center">
                MB
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold text-[#0A0045] leading-tight">
                  Studio Rossi &amp; Partners
                </div>
                <div className="text-[11px] text-[#767684]">Dott. M. Bianchi</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#767684]" />
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
