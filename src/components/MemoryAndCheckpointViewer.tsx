import React, { useState } from 'react';
import {
  History,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  FileText,
} from 'lucide-react';
import {
  EXPERIMENTS_C_TO_I_HISTORY,
  EXPERIMENTS_J_TO_O_HISTORY,
  REJECTED_LABORATORY_COMPONENTS,
  FUNDAMENTAL_LAB_LIMITATION,
} from '../memory/history';
import { CURRENT_LABORATORY_CHECKPOINT } from '../memory/checkpoint';

export const MemoryAndCheckpointViewer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'CHECKPOINT' | 'EXPERIMENTS' | 'REJECTED' | 'LIMITS'>('CHECKPOINT');

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3 font-mono">
        <div className="flex items-center space-x-3">
          <span className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
            <History className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900">
                EXPERIMENTAL MEMORY & CHECKPOINT
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                CHECKPOINT 0 RESTORED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Historical lineage of Experiments C–I, J–O, 7 Rejected Modules & Epistemic Boundaries
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 text-xs">
          {[
            { id: 'CHECKPOINT', name: '1. Checkpoint State' },
            { id: 'EXPERIMENTS', name: '2. Experiments C–I & J–O' },
            { id: 'REJECTED', name: '3. Rejected Modules (7)' },
            { id: 'LIMITS', name: '4. Epistemic Limits' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                activeSubTab === t.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CHECKPOINT SNAPSHOT */}
      {activeSubTab === 'CHECKPOINT' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4 font-mono">
            <h3 className="text-sm font-bold text-slate-900">
              CURRENT CHECKPOINT STATUS SNAPSHOT
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(CURRENT_LABORATORY_CHECKPOINT.componentsState).map(([key, val]) => (
                <div key={key} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-800 font-bold text-xs">{key}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    val.includes('FROZEN')
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : val.includes('HYPOTHESIS')
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
              <span className="text-blue-800 font-bold block text-xs">Next Authorized Step:</span>
              <p className="text-slate-800 text-xs font-sans">{CURRENT_LABORATORY_CHECKPOINT.nextAuthorizedStep}</p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-rose-700 font-bold block uppercase tracking-wider text-xs">
                Explicitly Forbidden Actions (Epistemic Directives):
              </span>
              <div className="space-y-1.5">
                {CURRENT_LABORATORY_CHECKPOINT.forbiddenActions.map((act, i) => (
                  <div key={i} className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-200 text-rose-900 text-xs flex items-center font-sans">
                    <XCircle className="w-4 h-4 mr-2 text-rose-600 flex-shrink-0" />
                    {act}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EXPERIMENTS HISTORY */}
      {activeSubTab === 'EXPERIMENTS' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4 font-mono">
            <h3 className="text-sm font-bold text-blue-700">
              EXPERIMENTS C–I (DERIVATION OF 5.2 CORE)
            </h3>
            <div className="space-y-3">
              {EXPERIMENTS_C_TO_I_HISTORY.map(exp => (
                <div key={exp.experimentId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-bold text-xs">{exp.name}</span>
                    <span className="text-slate-500 text-[10px]">{exp.artefact}</span>
                  </div>
                  <p className="text-slate-700 text-xs font-sans">Hypothesis: {exp.testedHypothesis}</p>
                  <p className="text-emerald-700 font-semibold text-xs font-sans">Outcome: {exp.outcome}</p>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-bold text-amber-700 pt-4 border-t border-slate-200">
              EXPERIMENTS J–O (DUAL ANALYSIS HYPOTHESIS)
            </h3>
            <div className="space-y-3">
              {EXPERIMENTS_J_TO_O_HISTORY.map(exp => (
                <div key={exp.experimentId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800 font-bold text-xs">{exp.name}</span>
                    <span className="text-slate-500 text-[10px]">{exp.artefact}</span>
                  </div>
                  <p className="text-slate-700 text-xs font-sans">Hypothesis: {exp.testedHypothesis}</p>
                  <p className="text-amber-800 font-semibold text-xs font-sans">Outcome: {exp.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. REJECTED MODULES */}
      {activeSubTab === 'REJECTED' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-rose-700 flex items-center">
              <XCircle className="w-4 h-4 mr-2 text-rose-600" />
              7 PERMANENTLY REJECTED ARCHITECTURAL MODULES
            </h3>
            <span className="text-slate-500 text-[11px] font-sans">Pruned by Occam's Razor & Empirical Data</span>
          </div>

          <div className="space-y-2">
            {REJECTED_LABORATORY_COMPONENTS.map((comp, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between">
                <div>
                  <span className="text-slate-900 font-bold text-xs">{idx + 1}. {comp.name}</span>
                  <p className="text-slate-600 text-xs mt-0.5 font-sans">{comp.reason}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                  REJECTED
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EPISTEMIC LIMITS */}
      {activeSubTab === 'LIMITS' && (
        <div className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm space-y-4 font-mono">
          <h3 className="text-sm font-bold text-amber-800 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-amber-600" />
            FUNDAMENTAL EPISTEMIC LIMITATION (EXPERIMENT H)
          </h3>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
            <h4 className="text-amber-900 text-sm font-bold">
              {FUNDAMENTAL_LAB_LIMITATION.rule}
            </h4>
            <p className="text-slate-700 text-xs leading-relaxed font-sans">
              {FUNDAMENTAL_LAB_LIMITATION.explanation}
            </p>
            <div className="p-3 bg-white rounded-lg border border-amber-200 text-slate-700 text-xs font-sans">
              <span className="text-blue-700 font-bold block mb-1 font-mono">Key Empirical Finding from Experiment H:</span>
              16 of 27 automated syntactic check suites experienced silent failures when evaluating semantic claims. Machine-level structural verification guarantees valid data types and non-empty reasons, but cannot replace independent ground-truth evidence.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
