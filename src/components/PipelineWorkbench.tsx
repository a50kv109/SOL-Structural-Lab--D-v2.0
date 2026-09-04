import React, { useState } from 'react';
import {
  Layers,
  Play,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ArrowRight,
  Database,
  Search,
  Shield,
  FileText,
  Activity,
  Terminal,
  Cpu,
  RefreshCw,
  Info,
  GitBranch,
  ExternalLink,
} from 'lucide-react';
import { StructuralLabPipelineEngine, PipelineExecutionLog } from '../pipeline/engine';
import { IngestionInput } from '../pipeline/profiler';
import { CANONICAL_RESEARCH_MODES } from '../canon/modes';
import { REAL_CORPUS_TARGETS } from '../protocols/realCorpusProtocol';
import { CoreStatus } from '../core/entities';

export const PipelineWorkbench: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('ecp_mentor');
  const [selectedMode, setSelectedMode] = useState<string>('STRUCTURAL_RECONSTRUCTION');
  const [customInputText, setCustomInputText] = useState<string>(
    `// Structural Ingestion Target: ECP Mentor Core\nexport interface PrimitiveDefinition {\n  kind: 'OBJECT' | 'RELATION' | 'CONSTRAINT' | 'STATE';\n  id: string;\n  name: string;\n}\n\nexport class ModularConstructor {\n  public validateBoundary(target: string): boolean {\n    return target.length > 0;\n  }\n}`
  );
  const [customFiles, setCustomFiles] = useState<Array<{ path: string; sizeBytes: number }>>([
    { path: 'src/core/primitives.ts', sizeBytes: 2450 },
    { path: 'src/constructors/mentor.ts', sizeBytes: 4120 },
    { path: 'src/contracts/IBoundary.ts', sizeBytes: 1180 },
    { path: 'tests/mentor.spec.ts', sizeBytes: 3200 },
  ]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLog, setExecutionLog] = useState<PipelineExecutionLog | null>(null);
  const [activeStageView, setActiveStageView] = useState<'ALL' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5'>('ALL');

  const handleTargetChange = (targetId: string) => {
    setSelectedTargetId(targetId);
    const target = REAL_CORPUS_TARGETS.find(t => t.id === targetId);
    if (target) {
      if (target.id === 'ecp_mentor') {
        setCustomFiles([
          { path: 'src/core/primitives.ts', sizeBytes: 2450 },
          { path: 'src/constructors/mentor.ts', sizeBytes: 4120 },
          { path: 'src/contracts/IBoundary.ts', sizeBytes: 1180 },
        ]);
        setCustomInputText(`// Target: ${target.name}\n// ${target.description}\n// ${target.structuralCharacteristics}`);
      } else if (target.id === 'dn_classic_v2') {
        setCustomFiles([
          { path: 'src/nav/navigator.ts', sizeBytes: 5200 },
          { path: 'src/parsers/hierarchy.ts', sizeBytes: 3800 },
          { path: 'src/state/transitions.ts', sizeBytes: 2100 },
        ]);
        setCustomInputText(`// Target: ${target.name}\n// ${target.description}`);
      } else if (target.id === 'aam_v1_telemetry') {
        setCustomFiles([
          { path: 'src/telemetry/collector.ts', sizeBytes: 4500 },
          { path: 'src/streaming/buffer.ts', sizeBytes: 3100 },
          { path: 'src/agents/runtime.ts', sizeBytes: 6200 },
        ]);
        setCustomInputText(`// Target: ${target.name}\n// Telemetry runtime collectors and buffers`);
      } else if (target.id === 'two_heroes_tool') {
        setCustomFiles([
          { path: 'two_heroes/core.py', sizeBytes: 3400 },
          { path: 'two_heroes/dual_pass.py', sizeBytes: 4800 },
          { path: 'two_heroes/compare.py', sizeBytes: 2900 },
        ]);
        setCustomInputText(`// Target: ${target.name} (Candidate External Tool)\n// Repository: https://github.com/a50kv109/two-heroes-tool`);
      }
    }
  };

  const runPipeline = async (targetIdToRun?: string) => {
    const target = targetIdToRun || selectedTargetId;
    if (targetIdToRun && targetIdToRun !== selectedTargetId) {
      handleTargetChange(targetIdToRun);
    }
    setIsRunning(true);
    try {
      const inputPayload: IngestionInput = {
        objectId: target,
        sourceUri: `https://github.com/a50kv109/${target}`,
        rawText: customInputText,
        files: customFiles,
        manifest: {
          name: target,
          version: '1.0.0',
          mode: selectedMode,
          environment: 'Google AI Studio Sandboxed Instance',
        },
      };

      const result = await StructuralLabPipelineEngine.executeSinglePass(inputPayload, {
        requestedResearchMode: selectedMode,
        availableTools: ['tool_structural_analyzer', 'tool_invariant_discovery'],
      });

      setExecutionLog(result);
    } catch (err: any) {
      console.error('Pipeline execution error', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Top 3-Card Summary Grid (Theme Aesthetic) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: 5.2 CORE Entities */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              5.2 CORE Entities
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
              FROZEN
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-blue-700 font-semibold text-center">
              OBSERVATION
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-700 text-center">
              INFERENCE
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-700 text-center">
              UNKNOWN
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-700 text-center">
              DECISION
            </div>
            <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-blue-700 font-semibold text-center col-span-2">
              EVIDENCE
            </div>
          </div>
        </div>

        {/* Card 2: External Tool Registry */}
        <div className="bg-[#0F172A] rounded-xl border border-slate-800 p-4 flex flex-col justify-between shadow-md text-white font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              External Tool Registry
            </span>
            <span className="text-[10px] text-slate-400">Lifecycle</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs p-2 bg-slate-800/90 rounded border border-slate-700">
              <span className="text-slate-200 font-bold">two-heroes-tool</span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold rounded uppercase tracking-tight">
                Candidate
              </span>
            </div>
            <div className="flex justify-between items-center text-xs p-2 bg-slate-800/50 rounded border border-slate-800 text-slate-400">
              <span>built-in-analyzers</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded uppercase tracking-tight">
                Integrated
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Discipline Invariants */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Discipline Invariants
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">Active</span>
          </div>
          <div className="flex flex-col gap-1 text-[11px] text-slate-700">
            <p><strong className="text-slate-900">I1:</strong> OBSERVATION ≠ INFERENCE</p>
            <p><strong className="text-slate-900">I2:</strong> DECISION = REASON + PROV</p>
            <p><strong className="text-slate-900">I4:</strong> OUTPUT ≠ EVIDENCE</p>
            <p><strong className="text-slate-900">I6:</strong> UNKNOWN ≠ FALSE</p>
            <p className="text-blue-600 font-bold pt-1 border-t border-slate-100">
              Bound: Structural Validity ≠ Truth
            </p>
          </div>
        </div>

      </div>

      {/* 2. REAL CORPUS TEST: INTAKE QUEUE (Table Layout from Theme) */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm">
        <div className="bg-slate-100/80 px-5 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              REAL CORPUS TEST: INTAKE QUEUE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Protocol v1.0 Target Suite
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {REAL_CORPUS_TARGETS.length} Target Repositories Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead className="bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200 font-mono">
              <tr>
                <th className="px-5 py-3">Repository Name</th>
                <th className="px-5 py-3">Category & Characteristics</th>
                <th className="px-5 py-3">Verification State</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-100">
              {REAL_CORPUS_TARGETS.map(repo => {
                const isSelected = selectedTargetId === repo.id;
                return (
                  <tr
                    key={repo.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{repo.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <GitBranch className="w-3 h-3 text-slate-400" />
                        {repo.url}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-slate-700 block">{repo.description}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {repo.structuralCharacteristics}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                          repo.category === 'PRIMARY_CORPUS'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : repo.category === 'CANDIDATE_TOOL'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {repo.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => runPipeline(repo.id)}
                        disabled={isRunning}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        {isRunning && isSelected ? 'RUNNING...' : 'INITIATE'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Pipeline Configuration & Execution Controls */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-mono">
                5.2 Traceable Pipeline Engine
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Strict 5-Stage Contract Flow: <span className="font-mono text-blue-600 font-semibold">C1 Profiler → C2 Planner → C3 Executor → C4 Validator → C5 Reporter</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => runPipeline()}
            disabled={isRunning}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Executing Pipeline...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Execute 5.2 Pipeline
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 font-mono">
              Selected Target:
            </label>
            <select
              value={selectedTargetId}
              onChange={e => handleTargetChange(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs shadow-xs"
            >
              {REAL_CORPUS_TARGETS.map(target => (
                <option key={target.id} value={target.id}>
                  {target.name} [{target.category}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 font-mono">
              Laboratory Research Mode:
            </label>
            <select
              value={selectedMode}
              onChange={e => setSelectedMode(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 font-mono text-xs shadow-xs"
            >
              {CANONICAL_RESEARCH_MODES.map(mode => (
                <option key={mode.code} value={mode.code}>
                  {mode.id}. {mode.name} ({mode.status})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Contracts Guard:</span>
              <span className="text-emerald-700 font-semibold">C1–C5 ENFORCED</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Invariants Guard:</span>
              <span className="text-blue-700 font-semibold">I1–I7 ACTIVE</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Rules Engine:</span>
              <span className="text-amber-700 font-semibold">R1 (Ambig) / R2 (Disputed)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Stage Tabs / Filter */}
      {executionLog && (
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
          <span className="text-xs text-slate-500 font-mono mr-2 font-bold">Filter Stage:</span>
          {(['ALL', 'C1', 'C2', 'C3', 'C4', 'C5'] as const).map(stage => (
            <button
              key={stage}
              onClick={() => setActiveStageView(stage)}
              className={`px-3 py-1 text-xs rounded-md font-mono font-semibold transition cursor-pointer ${
                activeStageView === stage
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {stage === 'ALL' ? 'Full Pipeline (All)' : `Contract ${stage}`}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 font-mono">
            Elapsed: <span className="text-blue-600 font-bold">{executionLog.durationMs}ms</span>
          </span>
        </div>
      )}

      {/* Execution Results View */}
      {executionLog && (
        <div className="space-y-6">

          {/* STAGE 1: PROFILING (Contract C1) */}
          {(activeStageView === 'ALL' || activeStageView === 'C1') && (
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 text-xs font-mono font-bold">
                    C1
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    STAGE 1: PROFILING & OBSERVATIONS
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    C1 Validated ({executionLog.observations.length} Facts)
                  </span>
                  {executionLog.unknowns.length > 0 && (
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                      {executionLog.unknowns.length} UNKNOWN (I6 Preserved)
                    </span>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden font-mono">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">ID</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">Observation Statement</th>
                      <th className="p-2.5">Verifiable Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {executionLog.observations.map(obs => (
                      <tr key={obs.id} className="hover:bg-slate-50/80">
                        <td className="p-2.5 font-bold text-slate-500">{obs.id}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              obs.status === CoreStatus.FACT
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {obs.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-900 font-medium">{obs.statement}</td>
                        <td className="p-2.5 text-slate-500 truncate max-w-xs">{obs.source}</td>
                      </tr>
                    ))}
                    {executionLog.unknowns.map(unk => (
                      <tr key={unk.id} className="bg-amber-50/40 hover:bg-amber-50/70">
                        <td className="p-2.5 text-amber-700 font-bold">{unk.id}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            UNKNOWN
                          </span>
                        </td>
                        <td className="p-2.5 text-amber-900 font-medium">
                          [Field: {unk.targetField}] {unk.reason}
                        </td>
                        <td className="p-2.5 text-slate-400 italic">Missing from source payload</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STAGE 2: PLANNING (Contract C2, Rules R1, R2) */}
          {(activeStageView === 'ALL' || activeStageView === 'C2') && (
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200 text-xs font-mono font-bold">
                    C2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    STAGE 2: PLANNING & TOOL SELECTION
                  </h3>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs font-mono font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  C2 Validated ({executionLog.decisions.length} Decisions with Reason + Provenance)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden font-mono">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Decision ID</th>
                      <th className="p-2.5">Action</th>
                      <th className="p-2.5">Target</th>
                      <th className="p-2.5">Mandatory Reason (I2)</th>
                      <th className="p-2.5">Mandatory Provenance (I2)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {executionLog.decisions.map(dec => (
                      <tr key={dec.id} className="hover:bg-slate-50/80">
                        <td className="p-2.5 text-slate-500 font-bold">{dec.id}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              dec.action === 'ACTIVATE'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : dec.action === 'BLOCK'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {dec.action}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-900 font-semibold">{dec.target}</td>
                        <td className="p-2.5 text-slate-700">{dec.reason}</td>
                        <td className="p-2.5 text-blue-700 font-medium">{dec.provenance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STAGE 3: EXECUTION (Contract C3, Invariant I3) */}
          {(activeStageView === 'ALL' || activeStageView === 'C3') && (
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
                    C3
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    STAGE 3: TOOL EXECUTION & RAW OUTPUTS
                  </h3>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs font-mono font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  C3 Validated ({executionLog.rawOutputs.length} Raw Telemetry Payloads)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {executionLog.rawOutputs.map((out, idx) => (
                  <div key={idx} className="bg-[#0F172A] border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-200 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                      <span className="text-blue-400 font-bold">{out.toolId}</span>
                      <span className="text-slate-400 text-[11px]">Exit Code: {out.exitCode} ({out.executionTimeMs}ms)</span>
                    </div>
                    <pre className="text-slate-300 text-[11px] overflow-x-auto max-h-40 p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      {JSON.stringify(out.rawPayload, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 4: VALIDATION (Contract C4, Invariant I4, Rule R3) */}
          {(activeStageView === 'ALL' || activeStageView === 'C4') && (
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200 text-xs font-mono font-bold">
                    C4
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    STAGE 4: VALIDATION & EVIDENCE FORMATION
                  </h3>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs font-mono font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  C4 Validated ({executionLog.evidences.length} Verified Evidence Items)
                </span>
              </div>

              <div className="space-y-3">
                {executionLog.evidences.map(ev => (
                  <div key={ev.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-mono">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-teal-700 font-bold">{ev.id}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {ev.validationStatus}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[11px]">Origin: {ev.source}</span>
                    </div>
                    <p className="text-slate-700 mb-2 font-sans text-xs">{ev.validatorNotes}</p>
                    <pre className="text-slate-800 text-[11px] overflow-x-auto max-h-32 p-2.5 bg-white rounded-lg border border-slate-200 font-mono">
                      {ev.content}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 5: REPORTING & SYNTHESIS (Contract C5, Invariants I5 & I7) */}
          {(activeStageView === 'ALL' || activeStageView === 'C5') && executionLog.report && (
            <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 text-xs font-mono font-bold">
                    C5
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    STAGE 5: SYNTHESIS & REPORT (CONTRACT C5)
                  </h3>
                </div>
                <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 text-xs font-mono font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Synthesis Report Formally Signed
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-blue-700 font-bold text-sm">{executionLog.report.title}</h4>
                  <span className="text-slate-500 text-xs">ID: {executionLog.report.id}</span>
                </div>
                <p className="text-xs text-slate-700 font-sans">{executionLog.report.summary}</p>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 font-mono">
                    Derived Analytical Inferences (Invariant I7: INFERENCE ≠ EVIDENCE)
                  </h5>
                  <div className="space-y-2">
                    {executionLog.report.inferences.map(inf => (
                      <div key={inf.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-purple-700 font-bold">{inf.id}</span>
                          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                            {inf.status} (Conf: {(inf.confidence || 0.9) * 100}%)
                          </span>
                        </div>
                        <p className="text-slate-800 font-medium font-sans">{inf.statement}</p>
                        <p className="text-[11px] text-slate-500 mt-1">Reasoning: {inf.reasoning}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {executionLog.report.epistemicWarnings.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs space-y-1">
                    <span className="text-amber-800 font-bold flex items-center font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />
                      Epistemic Safeguard Notes:
                    </span>
                    {executionLog.report.epistemicWarnings.map((w, i) => (
                      <p key={i} className="text-amber-900 text-[11px] font-sans">
                        • {w}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
