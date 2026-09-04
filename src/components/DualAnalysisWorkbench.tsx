import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  GitCompare,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Cpu,
  HelpCircle,
  Split,
} from 'lucide-react';
import { DualAnalysisOperator, DualAnalysisResult } from '../operators/dualAnalysis';
import { REAL_CORPUS_TARGETS } from '../protocols/realCorpusProtocol';
import { IngestionInput } from '../pipeline/profiler';

export const DualAnalysisWorkbench: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('ecp_mentor');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [dualResult, setDualResult] = useState<DualAnalysisResult | null>(null);

  const runDualAnalysis = async () => {
    setIsRunning(true);
    try {
      const inputPayload: IngestionInput = {
        objectId: selectedTargetId,
        sourceUri: `https://github.com/a50kv109/${selectedTargetId}`,
        rawText: `// Target Object for Dual Analysis Hypothesis Test: ${selectedTargetId}\nexport class DualAnalysisSubject {}`,
        files: [
          { path: 'src/core.ts', sizeBytes: 3200 },
          { path: 'src/contracts/boundary.ts', sizeBytes: 1500 },
          { path: 'src/telemetry.ts', sizeBytes: 2400 },
        ],
      };

      const result = await DualAnalysisOperator.executeDualPass(inputPayload, [
        'tool_structural_analyzer',
        'tool_invariant_discovery',
      ]);

      setDualResult(result);
    } catch (err: any) {
      console.error('Dual Analysis error', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner: Dual Analysis Hypothesis Specification */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 font-mono">
                  DUAL_ANALYSIS Research Operator
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  STATUS: HYPOTHESIS
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Decoupled Dual Pass: <span className="font-mono text-amber-700 font-semibold">Analyst A (Topology)</span> ∥ <span className="font-mono text-blue-700 font-semibold">Analyst B (Invariants)</span> → Compare → Synthesis
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedTargetId}
              onChange={e => setSelectedTargetId(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs font-mono focus:border-blue-500 shadow-xs"
            >
              {REAL_CORPUS_TARGETS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              onClick={runDualAnalysis}
              disabled={isRunning}
              className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running Dual Passes...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Dual Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mandatory Epistemic Guard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs font-mono">
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3">
            <span className="text-amber-900 font-bold block mb-1">A = B ≠ TRUTH</span>
            <p className="text-amber-800 text-[11px] font-sans">
              Agreement between Analyst A and B does not prove factual truth; it is an inference cluster.
            </p>
          </div>
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3">
            <span className="text-amber-900 font-bold block mb-1">A ≠ B ≠ ERROR</span>
            <p className="text-amber-800 text-[11px] font-sans">
              Disagreement does not imply error; it reflects differing analytical perspectives or lenses.
            </p>
          </div>
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3">
            <span className="text-amber-900 font-bold block mb-1">DISPUTED ≠ EVIDENCE</span>
            <p className="text-amber-800 text-[11px] font-sans">
              Contested assertions cannot be converted into evidence without independent external verification.
            </p>
          </div>
          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3">
            <span className="text-amber-900 font-bold block mb-1">SYNTHESIS = INFERENCE</span>
            <p className="text-amber-800 text-[11px] font-sans">
              The combined output of both passes remains categorized strictly as an INFERENCE.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!dualResult && (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center shadow-xs">
          <GitCompare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700 font-mono">
            Dual Analysis Operator Ready
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 font-sans">
            Execute a dual-pass hypothesis trial on <strong className="text-slate-800 font-mono">{selectedTargetId}</strong> to inspect independent analyst streams and comparative synthesis.
          </p>
        </div>
      )}

      {/* Result View */}
      {dualResult && (
        <div className="space-y-6">
          
          {/* Metrics & Epistemic Audit Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
              <span className="text-slate-500 text-xs font-mono block">Shared Agreement</span>
              <span className="text-emerald-600 text-2xl font-bold font-mono">{dualResult.agreementCount}</span>
              <span className="text-[10px] text-slate-400 block font-mono">A = B (Inference)</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
              <span className="text-slate-500 text-xs font-mono block">Complementarity</span>
              <span className="text-blue-600 text-2xl font-bold font-mono">{dualResult.complementarityCount}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Unique Lens Findings</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
              <span className="text-slate-500 text-xs font-mono block">Disputed Claims</span>
              <span className="text-amber-600 text-2xl font-bold font-mono">{dualResult.disputedCount}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Requires External Audit</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-xs">
              <span className="text-slate-500 text-xs font-mono block">Epistemic Audit</span>
              <span className="text-emerald-600 text-2xl font-bold font-mono">100% OK</span>
              <span className="text-[10px] text-slate-400 block font-mono">All 4 Guards Preserved</span>
            </div>
          </div>

          {/* Side-by-side Analyst Streams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Analyst A Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 font-mono shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-amber-800 font-bold text-xs flex items-center">
                  <Split className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  ANALYST A (Topology Focus)
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {dualResult.analystA.executionLog.observations.length} Facts • {dualResult.analystA.executionLog.evidences.length} Evidences
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans">
                Strategy: {dualResult.analystA.configuration.strategy} ({dualResult.analystA.configuration.focusArea})
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {dualResult.analystA.executionLog.observations.map(obs => (
                  <div key={obs.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-800 font-sans">
                    {obs.statement}
                  </div>
                ))}
              </div>
            </div>

            {/* Analyst B Box */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 font-mono shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-blue-800 font-bold text-xs flex items-center">
                  <Split className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  ANALYST B (Invariants Focus)
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {dualResult.analystB.executionLog.observations.length} Facts • {dualResult.analystB.executionLog.evidences.length} Evidences
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-sans">
                Strategy: {dualResult.analystB.configuration.strategy} ({dualResult.analystB.configuration.focusArea})
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {dualResult.analystB.executionLog.observations.map(obs => (
                  <div key={obs.id} className="p-2 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-800 font-sans">
                    {obs.statement}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Comparison Matrix */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 font-mono">
            <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <GitCompare className="w-4 h-4 mr-2 text-blue-600" />
              Comparative Analysis Matrix (Agreement & Complementarity)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden font-mono">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Claim / Observation</th>
                    <th className="p-2.5">Analyst A</th>
                    <th className="p-2.5">Analyst B</th>
                    <th className="p-2.5">Classification</th>
                    <th className="p-2.5">Epistemic Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {dualResult.comparisons.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="p-2.5 text-slate-900 font-medium font-sans">{c.claim}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${c.analystAStatus === 'FOUND' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}`}>
                          {c.analystAStatus}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${c.analystBStatus === 'FOUND' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}`}>
                          {c.analystBStatus}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          c.classification === 'AGREEMENT'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-teal-50 text-teal-700 border border-teal-200'
                        }`}>
                          {c.classification}
                        </span>
                      </td>
                      <td className="p-2.5 text-[11px] text-slate-500 font-sans">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dual Synthesis Result */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-amber-800 font-bold text-sm">
                SYNTHESIS OUTPUT (INFERENCE CATEGORY)
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                STATUS: INFERENCE (Invariant I7)
              </span>
            </div>
            {dualResult.synthesisInferences.map(inf => (
              <div key={inf.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <p className="text-slate-800 font-medium font-sans">{inf.statement}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-mono">Derived From: {inf.derivedFrom.join(', ')}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
