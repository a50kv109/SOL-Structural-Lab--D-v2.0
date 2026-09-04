/**
 * SOL STRUCTURAL LAB v2.0
 * Autonomous Instance in Google AI Studio
 * 
 * 5.2 CORE: FROZEN
 * ARCHITECTURE: FROZEN (4 Modules, 5 Contracts)
 * DUAL_ANALYSIS: HYPOTHESIS
 * two-heroes-tool: CANDIDATE EXTERNAL TOOL
 * PROTOCOL: DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0 (FROZEN)
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, LabTabId } from './components/Navigation';
import { RealCorpusExperimentRunner } from './components/RealCorpusExperimentRunner';
import { PipelineWorkbench } from './components/PipelineWorkbench';
import { DualAnalysisWorkbench } from './components/DualAnalysisWorkbench';
import { CoreAndCanonViewer } from './components/CoreAndCanonViewer';
import { ToolsRegistryViewer } from './components/ToolsRegistryViewer';
import { ProtocolViewer } from './components/ProtocolViewer';
import { MemoryAndCheckpointViewer } from './components/MemoryAndCheckpointViewer';
import { IntegrityTestRunner } from './components/IntegrityTestRunner';
import { BuildIntegrityTester, BuildIntegrityReport } from './testing/integrityTest';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function LabContent() {
  const [activeTab, setActiveTab] = useState<LabTabId>('real_corpus');
  const [integrityReport, setIntegrityReport] = useState<BuildIntegrityReport | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const { language } = useLanguage();

  const runGlobalAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await BuildIntegrityTester.runAllChecks();
      setIntegrityReport(res);
      setActiveTab('integrity_test');
    } catch (e) {
      console.error('Audit failed', e);
    } finally {
      setIsAuditing(false);
    }
  };

  useEffect(() => {
    // Initial auto-audit on load
    BuildIntegrityTester.runAllChecks().then(setIntegrityReport);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Header with Status Indicators, Language Switch & Quick Audit */}
      <Header onRunAudit={runGlobalAudit} auditRunning={isAuditing} />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        failedTestCount={integrityReport?.failedChecks || 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'real_corpus' && <RealCorpusExperimentRunner />}
        {activeTab === 'pipeline' && <PipelineWorkbench />}
        {activeTab === 'dual_analysis' && <DualAnalysisWorkbench />}
        {activeTab === 'core_canon' && <CoreAndCanonViewer />}
        {activeTab === 'tools' && <ToolsRegistryViewer />}
        {activeTab === 'protocols' && <ProtocolViewer />}
        {activeTab === 'memory' && <MemoryAndCheckpointViewer />}
        {activeTab === 'integrity_test' && (
          <IntegrityTestRunner
            initialReport={integrityReport}
            onReportUpdate={setIntegrityReport}
          />
        )}
      </main>

      {/* Epistemic Footer Notice */}
      <footer className="border-t border-slate-200 bg-slate-100 py-3.5 text-xs text-slate-600 font-mono shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {language === 'RU' ? 'ЭПИСТЕМИЧЕСКАЯ ДИСЦИПЛИНА АКТИВНА' : 'EPISTEMIC DISCIPLINE ACTIVE'}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Boundary: <strong className="text-slate-700">STRUCTURAL VALIDITY ≠ TRUTH OF CONTENT</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>5.2 Core (Frozen)</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              BUILD: READY FOR REAL CORPUS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LabContent />
    </LanguageProvider>
  );
}

