import React, { useState } from 'react';
import {
  Wrench,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  GitBranch,
  Cpu,
} from 'lucide-react';
import { TWO_HEROES_TOOL_SPEC } from '../tools/twoHeroesTool';
import { ToolLifecycleStatus } from '../tools/registry';

export const ToolsRegistryViewer: React.FC = () => {
  const [toolSpec, setToolSpec] = useState(TWO_HEROES_TOOL_SPEC);
  const [transitionError, setTransitionError] = useState<string | null>(null);

  const toggleRequirement = (reqId: string) => {
    setToolSpec(prev => ({
      ...prev,
      verificationRequirements: prev.verificationRequirements.map(req =>
        req.id === reqId ? { ...req, verified: !req.verified } : req
      ),
    }));
    setTransitionError(null);
  };

  const handlePromoteToVerified = () => {
    const allVerified = toolSpec.verificationRequirements.every(r => r.verified);
    if (!allVerified) {
      setTransitionError(
        'Epistemic Guard Blocked: Cannot transition two-heroes-tool to VERIFIED. All 4 empirical verification criteria must be tested and passed first.'
      );
      return;
    }
    setToolSpec(prev => ({
      ...prev,
      status: ToolLifecycleStatus.VERIFIED,
    }));
    setTransitionError(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-2">
        <div className="flex items-center space-x-3">
          <span className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
            <Wrench className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900 font-mono">
                EXTERNAL TOOLS REGISTRY
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                LIFECYCLE CONTROL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Tool Progression: <span className="font-mono text-slate-700 font-semibold">UNKNOWN → CANDIDATE → VERIFIED → INTEGRATED</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Candidate Tool Card: two-heroes-tool */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="text-base font-bold text-slate-900">{toolSpec.name}</h3>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                STATUS: {toolSpec.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">v{toolSpec.version}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 font-sans">{toolSpec.description}</p>
          </div>

          <a
            href={toolSpec.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition border border-slate-200 shadow-xs"
          >
            <GitBranch className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
            GitHub Repository
            <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
          </a>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Mandatory Verification Requirements for Status Transition:
            </h4>
            <span className="text-xs text-slate-500 font-bold">
              {toolSpec.verificationRequirements.filter(r => r.verified).length} / {toolSpec.verificationRequirements.length} Verified
            </span>
          </div>

          <div className="space-y-2">
            {toolSpec.verificationRequirements.map(req => (
              <div
                key={req.id}
                onClick={() => toggleRequirement(req.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-start justify-between ${
                  req.verified
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={req.verified}
                    onChange={() => {}}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-xs">{req.id}</span>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-sans">{req.description}</p>
                    {req.evidenceNotes && (
                      <p className="text-[10px] text-blue-700 mt-1 font-mono">Note: {req.evidenceNotes}</p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    req.verified
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {req.verified ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>
            ))}
          </div>

          {transitionError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span className="font-sans">{transitionError}</span>
            </div>
          )}

          {/* Action to promote */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[11px] text-slate-500 font-sans">
              * In accordance with Transfer Package rules, two-heroes-tool cannot be used as verified without completing the formal checklist.
            </p>
            <button
              onClick={handlePromoteToVerified}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
            >
              Promote to VERIFIED
            </button>
          </div>
        </div>
      </div>

      {/* Built-in Verified Analyzers Section */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-3 font-mono">
        <h3 className="text-sm font-bold text-emerald-700 flex items-center">
          <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
          BUILT-IN VERIFIED ANALYZERS (ACTIVE IN 5.2 PIPELINE)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-900 font-bold text-xs">tool_structural_analyzer</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                INTEGRATED
              </span>
            </div>
            <p className="text-slate-600 text-[11px] font-sans">
              Extracts OBJECT nodes and RELATION edges from code files, ast manifests, and raw streams.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-900 font-bold text-xs">tool_invariant_discovery</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                INTEGRATED
              </span>
            </div>
            <p className="text-slate-600 text-[11px] font-sans">
              Identifies immutable architectural constraints, interface contracts, and boundary definitions.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
