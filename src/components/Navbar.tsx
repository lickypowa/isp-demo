import React, { useState } from 'react';
import { ViewMode } from '../types';
import { User, ChevronDown, Shield, Briefcase, Globe, Check } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenAmmissibilita?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const isCustomerArea = ['customer-progetti', 'customer-progetto-detail', 'customer-profilo'].includes(currentView);
  const isBackOffice = ['backoffice-utenti', 'backoffice-partner'].includes(currentView);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D3E0FF]">
      {/* Quick Environment / Perspective Bar for user testing */}
      <div className="bg-[#0A0045] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium tracking-wide">Piattaforma Istituzionale ISP</span>
          <span className="text-[#A5C2FF] hidden sm:inline">• Monitoraggio PNRR & MIMIT 2025 attivo</span>
        </div>
        
        {/* Workspace switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium cursor-pointer"
          >
            {isBackOffice ? (
              <>
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Vista: Back Office Amministrazione</span>
              </>
            ) : isCustomerArea ? (
              <>
                <Briefcase className="w-3.5 h-3.5 text-blue-300" />
                <span>Vista: Area Clienti (Nexus Tech)</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span>Vista: Portale Pubblico</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 text-white/70" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white text-[#283759] rounded-lg shadow-xl border border-[#D3E0FF] py-1 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#767684] uppercase tracking-wider border-b border-[#D3E0FF]/60">
                Seleziona Ambiente Demo
              </div>
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowRoleSwitcher(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7FAFF] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#1F299C]" />
                  <div>
                    <div className="font-semibold text-[#1F299C]">Portale Pubblico & Bandi</div>
                    <div className="text-[11px] text-[#767684]">Catalogo, Piani, Blog, Chi siamo</div>
                  </div>
                </div>
                {!isCustomerArea && !isBackOffice && <Check className="w-4 h-4 text-[#1F299C]" />}
              </button>

              <button
                onClick={() => {
                  onNavigate('customer-progetti');
                  setShowRoleSwitcher(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7FAFF] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#1F299C]" />
                  <div>
                    <div className="font-semibold text-[#1F299C]">Area Riservata Clienti</div>
                    <div className="text-[11px] text-[#767684]">Progetti, Fascicolo 5.0, Profilo</div>
                  </div>
                </div>
                {isCustomerArea && <Check className="w-4 h-4 text-[#1F299C]" />}
              </button>

              <button
                onClick={() => {
                  onNavigate('backoffice-utenti');
                  setShowRoleSwitcher(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F7FAFF] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#1F299C]" />
                  <div>
                    <div className="font-semibold text-[#1F299C]">Back Office ISP</div>
                    <div className="text-[11px] text-[#767684]">Gestione Utenti & Partner da approvare</div>
                  </div>
                </div>
                {isBackOffice && <Check className="w-4 h-4 text-[#1F299C]" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded bg-[#1F299C] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <span className="tracking-tighter font-extrabold text-[15px]">ISP</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-[#0A0045]">
              Innovation Smart Plaza
            </span>
          </div>
        </div>

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px]">
          <button
            onClick={() => onNavigate('home')}
            className={`font-medium transition-colors hover:text-[#1F299C] cursor-pointer pb-0.5 ${
              currentView === 'home'
                ? 'text-[#1F299C] font-semibold border-b-2 border-[#1F299C]'
                : 'text-[#283759]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('bandi')}
            className={`font-medium transition-colors hover:text-[#1F299C] cursor-pointer pb-0.5 ${
              currentView === 'bandi' || currentView === 'categoria-innovazione' || currentView === 'bando-detail'
                ? 'text-[#1F299C] font-semibold border-b-2 border-[#1F299C]'
                : 'text-[#283759]'
            }`}
          >
            Ricerca bandi
          </button>
          <button
            onClick={() => onNavigate('chi-siamo')}
            className={`font-medium transition-colors hover:text-[#1F299C] cursor-pointer pb-0.5 ${
              currentView === 'chi-siamo'
                ? 'text-[#1F299C] font-semibold border-b-2 border-[#1F299C]'
                : 'text-[#283759]'
            }`}
          >
            Chi siamo
          </button>
          <button
            onClick={() => onNavigate('piani')}
            className={`font-medium transition-colors hover:text-[#1F299C] cursor-pointer pb-0.5 ${
              currentView === 'piani'
                ? 'text-[#1F299C] font-semibold border-b-2 border-[#1F299C]'
                : 'text-[#283759]'
            }`}
          >
            Piani
          </button>
          <button
            onClick={() => onNavigate('blog')}
            className={`font-medium transition-colors hover:text-[#1F299C] cursor-pointer pb-0.5 ${
              currentView === 'blog'
                ? 'text-[#1F299C] font-semibold border-b-2 border-[#1F299C]'
                : 'text-[#283759]'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => onNavigate('chi-siamo')}
            className="font-medium text-[#283759] transition-colors hover:text-[#1F299C] cursor-pointer"
          >
            Contatti
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 text-sm font-medium text-[#1F299C] hover:bg-[#F7FAFF] rounded-lg transition-colors cursor-pointer"
          >
            Accedi
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#E8590C] hover:bg-[#CF4D07] rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Registrati gratuitamente
          </button>
          <button
            onClick={() => onNavigate('customer-profilo')}
            title="Area Personale"
            className="w-9 h-9 rounded-full bg-[#1F299C] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer ml-1"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
