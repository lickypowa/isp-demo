import React, { useState, useEffect } from 'react';
import { ViewMode, Bando, Progetto } from './types';
import { initialBandi, initialProgetti } from './data/mockData';

// Public Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BandoPreviewModal } from './components/BandoPreviewModal';
import { AmmissibilitaWizardModal } from './components/AmmissibilitaWizardModal';

// Workspace Layouts
import { CustomerLayout } from './components/CustomerHeaderAndSidebar';
import { BackOfficeLayout } from './components/BackOfficeHeaderAndSidebar';

// Views
import { HomeView } from './views/HomeView';
import { BandiView } from './views/BandiView';
import { CategoriaInnovazioneView } from './views/CategoriaInnovazioneView';
import { BandoDetailView } from './views/BandoDetailView';
import { PianiView } from './views/PianiView';
import { BlogView } from './views/BlogView';
import { ChiSiamoView } from './views/ChiSiamoView';
import { AuthViews } from './views/AuthViews';
import { CustomerProgettiView } from './views/CustomerProgettiView';
import { CustomerProgettoDetailView } from './views/CustomerProgettoDetailView';
import { CustomerProfiloView } from './views/CustomerProfiloView';
import { BackOfficeUtentiView } from './views/BackOfficeUtentiView';
import { BackOfficePartnerView } from './views/BackOfficePartnerView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [bandi, setBandi] = useState<Bando[]>(initialBandi);
  const [progetti, setProgetti] = useState<Progetto[]>(initialProgetti);

  // Modals state
  const [previewBando, setPreviewBando] = useState<Bando | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAmmissibilitaOpen, setIsAmmissibilitaOpen] = useState(false);

  // Selected entities for detail screens
  const [selectedBando, setSelectedBando] = useState<Bando>(initialBandi[0]);
  const [selectedProgetto, setSelectedProgetto] = useState<Progetto>(initialProgetti[0]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPreview = (bando: Bando) => {
    setPreviewBando(bando);
    setIsPreviewOpen(true);
  };

  const handleOpenDetail = (bando: Bando) => {
    setSelectedBando(bando);
    setIsPreviewOpen(false);
    handleNavigate('bando-detail');
  };

  const handleOpenAmmissibilita = () => {
    setIsAmmissibilitaOpen(true);
  };

  const handleSaveProjectFromWizard = (projectData: {
    titolo: string;
    importo: string;
    misura: string;
  }) => {
    const newProj: Progetto = {
      id: `proj-${Date.now()}`,
      codiceFascicolo: `ISP-2025-${Math.floor(100 + Math.random() * 900)}`,
      titolo: projectData.titolo,
      misura: projectData.misura,
      cliente: 'Nexus Technologies S.r.l.',
      enteGestore: 'MIMIT',
      importoAgevolabile: projectData.importo,
      tipoContributo: 'Fondo perduto 50% + Credito Transizione 5.0',
      deskIsp: 'Ing. Marco Rossi (Milano Hub)',
      prossimaScadenza: '15/04/2025',
      scadenzaNote: 'Predisposizione perizia asseverata ex-ante',
      stato: 'In Lavorazione (Fase Istruttoria)',
      messaggi: [
        {
          id: 'msg-init',
          sender: 'Desk ISP Automation',
          senderRole: 'Sistema Centrale',
          text: 'Fascicolo aperto con successo a seguito di audit di ammissibilità favorevole. Il perito asseveratore incaricato prenderà contatto a breve.',
          time: 'Adesso',
          isClient: false
        }
      ],
      documenti: [
        {
          id: 'doc-report',
          name: 'Report_Audit_Ammissibilita_ISP.pdf',
          size: '640 KB',
          date: 'Oggi',
          type: 'pdf'
        }
      ],
      noteInterne: [],
      scadenze: [
        {
          id: 'scad-1',
          date: '15 Aprile 2025',
          title: 'Perizia Asseverata Ex-Ante',
          note: 'Caricamento relazione energetica GSE',
          type: 'deadline'
        }
      ]
    };

    setProgetti([newProj, ...progetti]);
    setSelectedProgetto(newProj);
    showToast(`Pratica "${projectData.titolo}" generata e aggiunta al tuo portale!`);
    handleNavigate('customer-progetto-detail');
  };

  // Helper booleans
  const isCustomerArea = [
    'customer-progetti',
    'customer-progetto-detail',
    'customer-profilo'
  ].includes(currentView);

  const isBackOffice = [
    'backoffice-utenti',
    'backoffice-partner'
  ].includes(currentView);

  const isAuthView = [
    'login',
    'register',
    'recupero-password'
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col font-sans text-[#283759] antialiased selection:bg-[#1F299C] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0045] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#D3E0FF]/30 flex items-center gap-3 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. AUTH VIEWS (FULL PAGE) */}
      {isAuthView ? (
        <AuthViews
          mode={currentView as 'login' | 'register' | 'recupero-password'}
          onNavigate={handleNavigate}
          onLoginSuccess={(role) => {
            if (role === 'admin') {
              handleNavigate('backoffice-utenti');
              showToast('Accesso effettuato come Amministratore Back Office ISP.');
            } else {
              handleNavigate('customer-progetti');
              showToast('Accesso effettuato come Referente Impresa.');
            }
          }}
        />
      ) : isCustomerArea ? (
        /* 2. CUSTOMER WORKSPACE */
        <CustomerLayout
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenAmmissibilita={handleOpenAmmissibilita}
        >
          {currentView === 'customer-progetti' && (
            <CustomerProgettiView
              progetti={progetti}
              onSelectProgetto={(proj) => {
                setSelectedProgetto(proj);
                handleNavigate('customer-progetto-detail');
              }}
              onNavigate={handleNavigate}
              onOpenAmmissibilita={handleOpenAmmissibilita}
            />
          )}

          {currentView === 'customer-progetto-detail' && (
            <CustomerProgettoDetailView
              progetto={selectedProgetto}
              onNavigate={handleNavigate}
              onOpenAmmissibilita={handleOpenAmmissibilita}
            />
          )}

          {currentView === 'customer-profilo' && (
            <CustomerProfiloView onNavigate={handleNavigate} />
          )}
        </CustomerLayout>
      ) : isBackOffice ? (
        /* 3. BACK OFFICE WORKSPACE */
        <BackOfficeLayout currentView={currentView} onNavigate={handleNavigate}>
          {currentView === 'backoffice-utenti' && (
            <BackOfficeUtentiView onNavigate={handleNavigate} />
          )}
          {currentView === 'backoffice-partner' && (
            <BackOfficePartnerView onNavigate={handleNavigate} />
          )}
        </BackOfficeLayout>
      ) : (
        /* 4. PUBLIC PORTAL VIEWS */
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenAmmissibilita={handleOpenAmmissibilita}
          />

          <main className="flex-1">
            {currentView === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenAmmissibilita={handleOpenAmmissibilita}
              />
            )}

            {currentView === 'bandi' && (
              <BandiView
                bandi={bandi}
                onOpenPreview={handleOpenPreview}
                onOpenDetail={handleOpenDetail}
                onOpenAmmissibilita={handleOpenAmmissibilita}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'categoria-innovazione' && (
              <CategoriaInnovazioneView
                bandi={bandi}
                onOpenPreview={handleOpenPreview}
                onOpenDetail={handleOpenDetail}
                onOpenAmmissibilita={handleOpenAmmissibilita}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'bando-detail' && (
              <BandoDetailView
                bando={selectedBando}
                onNavigate={handleNavigate}
                onOpenAmmissibilita={handleOpenAmmissibilita}
              />
            )}

            {currentView === 'piani' && (
              <PianiView
                onNavigate={handleNavigate}
                onOpenAmmissibilita={handleOpenAmmissibilita}
              />
            )}

            {currentView === 'blog' && (
              <BlogView onNavigate={handleNavigate} />
            )}

            {currentView === 'chi-siamo' && (
              <ChiSiamoView onNavigate={handleNavigate} />
            )}
          </main>

          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Global Modals */}
      <BandoPreviewModal
        bando={previewBando}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onOpenFullDetail={handleOpenDetail}
      />

      <AmmissibilitaWizardModal
        isOpen={isAmmissibilitaOpen}
        onClose={() => setIsAmmissibilitaOpen(false)}
        onSaveAsProject={handleSaveProjectFromWizard}
      />
    </div>
  );
}
