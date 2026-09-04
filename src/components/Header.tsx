import React from 'react';
import { ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  onRunAudit: () => void;
  auditRunning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRunAudit, auditRunning }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-[#0F172A] border-b border-slate-700/80 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Instance Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/30 flex-shrink-0">
              <span className="text-white font-bold text-xs tracking-wider">SL</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold tracking-tight text-white uppercase font-mono">
                  {t.appTitle} <span className="text-blue-400 text-xs font-sans font-medium tracking-normal lowercase ml-1">v2.0 Autonomous</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                  RESTORED
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Canonical Status Badges, Language Switch & Quick Action */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            
            {/* Language Switch [ EN | RU ] */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 shadow-inner">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  language === 'EN'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch UI language to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('RU')}
                className={`px-2 py-1 rounded text-xs font-bold transition cursor-pointer ${
                  language === 'RU'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Переключить язык интерфейса на Русский"
              >
                RU
              </button>
            </div>

            <div className="h-5 w-[1px] bg-slate-700 hidden sm:block"></div>

            {/* Core Status */}
            <div className="flex flex-col items-start px-2 py-0.5" title="5.2 Core is Frozen: Entities, Statuses, Invariants, Rules immutable">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{t.coreStatusLabel}</span>
              <span className="text-blue-400 text-xs font-bold tracking-tight">5.2 CORE: FROZEN</span>
            </div>

            <div className="px-2 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-300 flex items-center gap-1.5" title="DUAL_ANALYSIS is an active experimental hypothesis, not canon">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-400 text-[11px]">{t.dualStatusLabel}</span>
              <span className="font-semibold text-amber-300 text-[11px]">HYPOTHESIS</span>
            </div>

            <div className="px-2 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-slate-300 flex items-center gap-1.5" title="two-heroes-tool is an unverified candidate external tool">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span className="text-slate-400 text-[11px]">{t.twoHeroesLabel}</span>
              <span className="font-semibold text-purple-300 text-[11px]">CANDIDATE</span>
            </div>

            {/* Run Integrity Test CTA */}
            <button
              onClick={onRunAudit}
              disabled={auditRunning}
              className="ml-1 inline-flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className={`w-3.5 h-3.5 mr-1.5 ${auditRunning ? 'animate-spin' : ''}`} />
              {auditRunning ? t.btnAuditing : t.btnRunAudit}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

