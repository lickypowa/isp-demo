import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate?: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#D3E0FF] text-[#283759] text-xs pt-10 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#D3E0FF]">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-[#1F299C] flex items-center justify-center text-white font-bold text-xs">
                ISP
              </div>
              <span className="font-heading text-sm font-bold text-[#0A0045]">
                Innovation Smart Plaza
              </span>
            </div>
            <p className="text-[#364349] leading-relaxed pr-2">
              Piattaforma digitale per la finanza agevolata, l&apos;innovazione aziendale e la gestione integrata di bandi italiani ed europei.
            </p>
          </div>

          {/* Sede Principale Milano */}
          <div>
            <h4 className="font-semibold text-[#0A0045] uppercase tracking-wider text-[11px] mb-2.5">
              SEDE PRINCIPALE MILANO
            </h4>
            <p className="text-[#364349] leading-relaxed">
              Via Monte Napoleone 8<br />
              20121 Milano (MI)<br />
              Italia
            </p>
          </div>

          {/* Sede Operativa Brindisi */}
          <div>
            <h4 className="font-semibold text-[#0A0045] uppercase tracking-wider text-[11px] mb-2.5">
              SEDE OPERATIVA BRINDISI
            </h4>
            <p className="text-[#364349] leading-relaxed">
              Via Appia 120<br />
              72100 Brindisi (BR)<br />
              Italia
            </p>
          </div>

          {/* Contatti & Assistenza */}
          <div>
            <h4 className="font-semibold text-[#0A0045] uppercase tracking-wider text-[11px] mb-2.5">
              CONTATTI & ASSISTENZA
            </h4>
            <p className="text-[#364349] leading-relaxed">
              Tel: +39 02 8900 1234<br />
              Email: info@innovationsmartplaza.it<br />
              PEC: pec@innovationsmartplaza.legal
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#767684]">
          <p>© 2025 Innovation Smart Plaza. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate?.('chi-siamo')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate?.('chi-siamo')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => onNavigate?.('chi-siamo')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Note Legali
            </button>
            <button
              onClick={() => onNavigate?.('chi-siamo')}
              className="hover:text-[#1F299C] transition-colors cursor-pointer"
            >
              Termini di Servizio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
