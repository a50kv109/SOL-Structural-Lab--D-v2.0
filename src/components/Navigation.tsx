import React from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  Wrench,
  FileCheck,
  History,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type LabTabId =
  | 'real_corpus'
  | 'pipeline'
  | 'dual_analysis'
  | 'core_canon'
  | 'tools'
  | 'protocols'
  | 'memory'
  | 'integrity_test';

interface NavigationProps {
  activeTab: LabTabId;
  onSelectTab: (tab: LabTabId) => void;
  failedTestCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  failedTestCount = 0,
}) => {
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'real_corpus' as LabTabId,
      name: t.tabRealCorpus,
      description: t.tabRealCorpusDesc,
      icon: FolderGit2,
      tag: 'Operator Flow',
    },
    {
      id: 'pipeline' as LabTabId,
      name: t.tabPipeline,
      description: t.tabPipelineDesc,
      icon: Layers,
      tag: '5.2 Core',
    },
    {
      id: 'dual_analysis' as LabTabId,
      name: t.tabDualAnalysis,
      description: t.tabDualAnalysisDesc,
      icon: Sparkles,
      tag: 'Hypothesis',
    },
    {
      id: 'core_canon' as LabTabId,
      name: t.tabCoreCanon,
      description: t.tabCoreCanonDesc,
      icon: BookOpen,
      tag: 'Frozen',
    },
    {
      id: 'tools' as LabTabId,
      name: t.tabTools,
      description: t.tabToolsDesc,
      icon: Wrench,
      tag: 'Candidate',
    },
    {
      id: 'protocols' as LabTabId,
      name: t.tabProtocols,
      description: t.tabProtocolsDesc,
      icon: FileCheck,
      tag: 'v1.0 Frozen',
    },
    {
      id: 'memory' as LabTabId,
      name: t.tabMemory,
      description: t.tabMemoryDesc,
      icon: History,
      tag: 'Restored',
    },
    {
      id: 'integrity_test' as LabTabId,
      name: t.tabIntegrity,
      description: t.tabIntegrityDesc,
      icon: ShieldCheck,
      tag: failedTestCount > 0 ? `${failedTestCount} Alerts` : 'Verified',
      alert: failedTestCount > 0,
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 text-slate-700 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1.5 overflow-x-auto py-2.5 scrollbar-thin">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.name}</span>
                {tab.tag && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-bold ${
                      isActive
                        ? 'bg-blue-800 text-blue-100 border border-blue-400/40'
                        : tab.alert
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {tab.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

