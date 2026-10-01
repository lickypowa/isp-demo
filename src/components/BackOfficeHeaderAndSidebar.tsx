import React from 'react';
import { ViewMode } from '../types';
import {
  FileText,
  Megaphone,
  LayoutGrid,
  FolderTree,
  Inbox,
  Award,
  CheckSquare,
  Files,
  CreditCard,
  FolderGit2,
  Sliders,
  Users,
  Settings,
  Search,
  Bell,
  HelpCircle,
  User
} from 'lucide-react';

interface BackOfficeNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  children: React.ReactNode;
}

export const BackOfficeLayout: React.FC<BackOfficeNavProps> = ({
  currentView,
  onNavigate,
  children
}) => {
  return (
    <div className="min-h-screen bg-[#F7FAFF] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A0045] text-white flex-shrink-0 flex flex-col justify-between hidden md:flex min-h-screen border-r border-[#1F299C]/30 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo brand */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded bg-[#1F299C] flex items-center justify-center text-white font-bold text-xs">
                ISP
              </div>
              <div>
                <div className="font-heading text-xs font-bold tracking-tight text-white leading-tight">
                  ISP
                </div>
                <div className="text-[10px] text-[#A5C2FF] font-semibold tracking-wider uppercase">
                  INNOVATION PLAZA
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between text-[11px] text-[#A5C2FF]">
            <span>Back Office Amm.</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>

          {/* Menu items */}
          <div className="px-3 py-3">
            <nav className="space-y-0.5">
              <button
                onClick={() => onNavigate('bandi')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <FileText className="w-4 h-4 text-[#A5C2FF]" />
                <span>Bandi</span>
              </button>

              <button
                onClick={() => onNavigate('bandi')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Megaphone className="w-4 h-4 text-[#A5C2FF]" />
                <span>Call</span>
              </button>

              <button
                onClick={() => onNavigate('categoria-innovazione')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <LayoutGrid className="w-4 h-4 text-[#A5C2FF]" />
                <span>Catalogo</span>
              </button>

              <button
                onClick={() => onNavigate('bandi')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <FolderTree className="w-4 h-4 text-[#A5C2FF]" />
                <span>Categorie</span>
              </button>

              <button
                onClick={() => onNavigate('backoffice-utenti')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Inbox className="w-4 h-4 text-[#A5C2FF]" />
                <span>Richieste</span>
              </button>

              <button
                onClick={() => onNavigate('backoffice-partner')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'backoffice-partner'
                    ? 'bg-[#1F299C] text-white font-semibold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 text-[#7EC8C3]" />
                <span>Partner da approvare</span>
              </button>

              <button
                onClick={() => onNavigate('customer-progetti')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <CheckSquare className="w-4 h-4 text-[#A5C2FF]" />
                <span>Richieste ammissibilità</span>
              </button>

              <button
                onClick={() => onNavigate('customer-progetto-detail')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Files className="w-4 h-4 text-[#A5C2FF]" />
                <span>Documenti</span>
              </button>

              <button
                onClick={() => onNavigate('piani')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <CreditCard className="w-4 h-4 text-[#A5C2FF]" />
                <span>Pagamenti</span>
              </button>

              <button
                onClick={() => onNavigate('customer-progetti')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <FolderGit2 className="w-4 h-4 text-[#A5C2FF]" />
                <span>Progetti</span>
              </button>

              <button
                onClick={() => onNavigate('piani')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Sliders className="w-4 h-4 text-[#A5C2FF]" />
                <span>Piani</span>
              </button>

              <button
                onClick={() => onNavigate('backoffice-utenti')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                  currentView === 'backoffice-utenti'
                    ? 'bg-[#1F299C] text-white font-semibold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-[#A5C2FF]" />
                <span>Utenti</span>
              </button>

              <button
                onClick={() => onNavigate('customer-profilo')}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-left"
              >
                <Settings className="w-4 h-4 text-[#A5C2FF]" />
                <span>Profilo</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom profile info */}
        <div className="p-3 border-t border-white/10 m-2 rounded bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1F299C] flex items-center justify-center text-white text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">Amministratore</div>
              <div className="text-[10px] text-[#A5C2FF] truncate">isp-admin@smartplaza.it</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#D3E0FF] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 text-xs text-[#364349]">
            <span className="font-bold text-[#1F299C]">ISP</span>
            <span className="text-[#D3E0FF]">/</span>
            <span className="text-[#283759] font-medium">Back Office Amministrazione</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block w-80">
              <Search className="w-4 h-4 text-[#767684] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cerca protocolli, ID o bandi..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D3E0FF] focus:outline-none focus:border-[#719CFF] focus:ring-2 focus:ring-[#719CFF]/20"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-2 rounded-lg text-[#364349] hover:bg-[#F7FAFF] relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8590C]"></span>
            </button>

            {/* Help */}
            <button className="p-2 rounded-lg text-[#364349] hover:bg-[#F7FAFF] cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-[#0A0045] text-white text-xs font-bold flex items-center justify-center cursor-pointer">
              ADM
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
