import React, { useState } from 'react';
import {
  FileCheck,
  Calculator,
  GitBranch,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  DualAnalysisEvaluationProtocol,
  DualAnalysisMetrics,
  DecisionMatrixOutcome,
} from '../protocols/dualAnalysisEvaluationProtocol';
import { REAL_CORPUS_TARGETS, REAL_CORPUS_METRICS } from '../protocols/realCorpusProtocol';

export const ProtocolViewer: React.FC = () => {
  const [subView, setSubView] = useState<'PROTOCOL' | 'CORPUS' | 'CALCULATOR'>('PROTOCOL');

  // Interactive Calculator State
  const [recallSingle, setRecallSingle] = useState<number>(0.78);
  const [recallDual, setRecallDual] = useState<number>(0.84);
  const [falseDisputeRate, setFalseDisputeRate] = useState<number>(0.18);
  const [overheadFactor, setOverheadFactor] = useState<number>(2.1);
  const [corpusSize, setCorpusSize] = useState<number>(12);
  const [goldStandardComplete, setGoldStandardComplete] = useState<boolean>(true);

  const currentMetrics: DualAnalysisMetrics = {
    recallSingle,
    recallDual,
    dualOnlyGain: 8,
    singleOnlyLoss: 1,
    detectionAdvantage: recallDual - recallSingle,
    falseDisputeRate,
    overheadFactor,
  };

  const decisionResult = DualAnalysisEvaluationProtocol.evaluateDecisionMatrix(
    currentMetrics,
    corpusSize,
    goldStandardComplete
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <FileCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 font-mono">
                  DUAL_ANALYSIS_EVALUATION_PROTOCOL
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  VERSION: v1.0-FROZEN
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-sans">
                Frozen Protocol for Empirical Hypothesis Testing & Real Corpus Target Suite
              </p>
            </div>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 font-mono text-xs">
          {[
            { id: 'PROTOCOL', name: '1. Frozen Protocol v1.0' },
            { id: 'CORPUS', name: '2. Target Repositories Suite' },
            { id: 'CALCULATOR', name: '3. Decision Matrix Calculator' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSubView(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                subView === t.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 1. PROTOCOL VIEW */}
      {subView === 'PROTOCOL' && (
        <div className="space-y-4">
          
          {/* Independence Mandates */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3 font-mono">
            <h3 className="text-sm font-bold text-blue-700 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              MANDATORY INDEPENDENCE RULES (FROZEN)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DualAnalysisEvaluationProtocol.INDEPENDENCE_MANDATES.map((rule, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-xs">
                  <span className="text-blue-700 font-bold block mb-1">Mandate {idx + 1}:</span>
                  <p className="font-sans">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stop Conditions */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3 font-mono">
            <h3 className="text-sm font-bold text-rose-700 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-rose-600" />
              EXPERIMENT STOP CONDITIONS (HALT MANDATES)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DualAnalysisEvaluationProtocol.STOP_CONDITIONS.map(cond => (
                <div key={cond.id} className="p-3.5 bg-rose-50/50 rounded-lg border border-rose-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-rose-700 font-bold">{cond.id}</span>
                    <span className="text-rose-800 font-bold text-[10px] bg-rose-100 px-2 py-0.5 rounded">{cond.action}</span>
                  </div>
                  <p className="text-slate-700 text-xs font-sans mt-1">{cond.condition}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. CORPUS VIEW */}
      {subView === 'CORPUS' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                REAL CORPUS REPOSITORY SUITE
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                {REAL_CORPUS_TARGETS.length} Target Codebases
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_CORPUS_TARGETS.map(repo => (
                <div key={repo.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-bold text-xs">{repo.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      repo.category === 'PRIMARY_CORPUS'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : repo.category === 'CANDIDATE_TOOL'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {repo.category}
                    </span>
                  </div>
                  <p className="text-slate-700 text-xs font-sans">{repo.description}</p>
                  <p className="text-[11px] text-slate-500 font-sans">Characteristics: {repo.structuralCharacteristics}</p>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 pt-1 font-semibold"
                  >
                    <GitBranch className="w-3.5 h-3.5 mr-1" />
                    {repo.url}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Metrics Table */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3 font-mono">
            <h3 className="text-sm font-bold text-slate-900">
              7 COMPARATIVE EVALUATION METRICS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {REAL_CORPUS_METRICS.map(m => (
                <div key={m.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-blue-700 font-bold block text-xs">{m.id}. {m.name}</span>
                  <p className="text-slate-600 text-[11px] mt-1 font-sans">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CALCULATOR VIEW */}
      {subView === 'CALCULATOR' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-5 font-mono">
          <div className="flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              DECISION MATRIX EVALUATOR (HYPOTHESIS VERIFICATION)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-800 font-bold block mb-2 text-xs">Recall Parameters</span>
              <div>
                <label className="block text-slate-600 text-xs mb-1">
                  Recall SINGLE: {(recallSingle * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.01"
                  value={recallSingle}
                  onChange={e => setRecallSingle(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">
                  Recall DUAL: {(recallDual * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.01"
                  value={recallDual}
                  onChange={e => setRecallDual(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-800 font-bold block mb-2 text-xs">Error & Overhead Limits</span>
              <div>
                <label className="block text-slate-600 text-xs mb-1">
                  False Dispute Rate: {(falseDisputeRate * 100).toFixed(1)}% (Threshold &lt; 30%)
                </label>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.01"
                  value={falseDisputeRate}
                  onChange={e => setFalseDisputeRate(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">
                  Overhead Factor: {overheadFactor.toFixed(2)}x (Threshold &lt;= 2.5x)
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={overheadFactor}
                  onChange={e => setOverheadFactor(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-800 font-bold block mb-2 text-xs">Corpus Quality</span>
              <div>
                <label className="block text-slate-600 text-xs mb-1">
                  Sample Size: {corpusSize} repos (Min &gt;= 10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={corpusSize}
                  onChange={e => setCorpusSize(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 text-xs shadow-xs"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  checked={goldStandardComplete}
                  onChange={e => setGoldStandardComplete(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 cursor-pointer"
                />
                <span className="text-slate-700 text-xs font-sans">Gold Standard Fully Annotated</span>
              </div>
            </div>

          </div>

          {/* Outcome Card */}
          <div className={`p-4 rounded-xl border font-mono ${
            decisionResult.outcome === 'SUCCESS'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : decisionResult.outcome === 'PARTIAL'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">
                DECISION MATRIX OUTCOME: {decisionResult.outcome}
              </span>
              <span className="text-xs font-semibold">
                Detection Advantage: {((recallDual - recallSingle) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs font-sans">{decisionResult.rationale}</p>
          </div>

        </div>
      )}

    </div>
  );
};
