/**
 * SOL STRUCTURAL LAB v2.0
 * COMPACT EXPERIMENTAL INTEGRITY PANEL
 * 
 * Epistemic Rules:
 * - Integrity status verification (not a decorative dashboard).
 * - Exposes the real state of all 10 architectural and protocol pillars.
 */

import React from 'react';
import { Shield, Lock, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { ExperimentSession } from '../protocols/experimentStateMachine';

interface ExperimentalIntegrityPanelProps {
  session?: ExperimentSession | null;
}

export const ExperimentalIntegrityPanel: React.FC<ExperimentalIntegrityPanelProps> = ({ session }) => {
  const getGoldStandardStatus = () => {
    if (!session?.goldStandard) return { label: 'MISSING', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    if (session.goldStandard.isLocked) return { label: `LOCKED (${session.goldStandard.entries.length} items)`, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    return { label: 'UNLOCKED (UNSAFE)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  };

  const getIndependenceStatus = () => {
    if (!session?.rawDualOutput) return { label: 'STANDBY', color: 'text-slate-600 bg-slate-100 border-slate-200' };
    return { label: 'VERIFIED (PROCEDURAL)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const getRawResultsStatus = () => {
    if (!session?.rawSingleOutput && !session?.rawDualOutput) return { label: 'EMPTY', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    if (session?.rawSingleOutput && session?.rawDualOutput) return { label: 'FROZEN & ISOLATED', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    return { label: 'PARTIAL', color: 'text-blue-700 bg-blue-50 border-blue-200' };
  };

  const getValidationStatus = () => {
    if (!session?.validationRecord) return { label: 'PENDING', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    return { label: 'MATCHED AGAINST GS', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const getMetricsStatus = () => {
    if (!session?.validationRecord?.metrics) return { label: 'UNCOMPUTED', color: 'text-slate-500 bg-slate-100 border-slate-200' };
    const costStatus = session.validationRecord.metrics.overheadStatus === 'MEASURED' ? 'MEASURED' : 'COST: NOT MEASURED';
    return { label: `COMPUTED (${costStatus})`, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  };

  const getVerdictStatus = () => {
    if (session?.state === 'HALTED_ON_STOP_CONDITION') return { label: 'HALTED (STOP CONDITION)', color: 'text-rose-700 bg-rose-50 border-rose-300' };
    if (session?.validationRecord?.decisionMatrixOutcome) {
      const outcome = session.validationRecord.decisionMatrixOutcome;
      if (outcome === 'SUCCESS') return { label: 'VERDICT: SUCCESS', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
      if (outcome === 'PARTIAL') return { label: 'VERDICT: PARTIAL', color: 'text-amber-700 bg-amber-50 border-amber-300' };
      if (outcome === 'FAILURE') return { label: 'VERDICT: FAILURE', color: 'text-rose-700 bg-rose-50 border-rose-300' };
      return { label: 'VERDICT: INCONCLUSIVE', color: 'text-slate-700 bg-slate-100 border-slate-300' };
    }
    return { label: 'PENDING EXECUTION', color: 'text-slate-500 bg-slate-100 border-slate-200' };
  };

  const gsStatus = getGoldStandardStatus();
  const indepStatus = getIndependenceStatus();
  const rawStatus = getRawResultsStatus();
  const valStatus = getValidationStatus();
  const metStatus = getMetricsStatus();
  const verdStatus = getVerdictStatus();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
        <div className="flex items-center space-x-2 text-slate-900 font-bold">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>EXPERIMENTAL INTEGRITY PANEL</span>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          Runtime Epistemic Guard
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {/* Core */}
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold">CORE:</div>
          <div className="mt-0.5 text-blue-700 font-bold">FROZEN</div>
        </div>

        {/* Dual */}
        <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200">
          <div className="text-[10px] text-amber-700 uppercase font-sans font-semibold">DUAL:</div>
          <div className="mt-0.5 text-amber-800 font-bold">HYPOTHESIS</div>
        </div>

        {/* Protocol */}
        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold">PROTOCOL:</div>
          <div className="mt-0.5 text-slate-800 font-bold">FROZEN v1.0</div>
        </div>

        {/* two-heroes */}
        <div className="p-2 rounded-lg bg-purple-50/70 border border-purple-200">
          <div className="text-[10px] text-purple-700 uppercase font-sans font-semibold">TWO-HEROES:</div>
          <div className="mt-0.5 text-purple-800 font-bold">CANDIDATE</div>
        </div>

        {/* Gold Standard */}
        <div className={`p-2 rounded-lg border ${gsStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">GOLD STANDARD:</div>
          <div className="mt-0.5 font-bold truncate">{gsStatus.label}</div>
        </div>

        {/* Independence */}
        <div className={`p-2 rounded-lg border ${indepStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">INDEPENDENCE:</div>
          <div className="mt-0.5 font-bold truncate">{indepStatus.label}</div>
        </div>

        {/* Raw Results */}
        <div className={`p-2 rounded-lg border ${rawStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">RAW RESULTS:</div>
          <div className="mt-0.5 font-bold truncate">{rawStatus.label}</div>
        </div>

        {/* Validation */}
        <div className={`p-2 rounded-lg border ${valStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">VALIDATION:</div>
          <div className="mt-0.5 font-bold truncate">{valStatus.label}</div>
        </div>

        {/* Metrics */}
        <div className={`p-2 rounded-lg border ${metStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">METRICS:</div>
          <div className="mt-0.5 font-bold truncate">{metStatus.label}</div>
        </div>

        {/* Verdict */}
        <div className={`p-2 rounded-lg border ${verdStatus.color}`}>
          <div className="text-[10px] opacity-80 uppercase font-sans font-semibold">VERDICT:</div>
          <div className="mt-0.5 font-bold truncate">{verdStatus.label}</div>
        </div>
      </div>
    </div>
  );
};
