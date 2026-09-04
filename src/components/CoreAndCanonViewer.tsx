import React, { useState } from 'react';
import {
  BookOpen,
  Shield,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  Split,
  PlusCircle,
  Trash2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CANONICAL_5_2_INVARIANTS } from '../core/invariants';
import { CANONICAL_5_2_RULES } from '../core/rules';
import { CANONICAL_RESEARCH_MODES } from '../canon/modes';
import { CanonicalSystemModel } from '../canon/primitives';
import { StructuralTransformationEngine, CanonOperatorType } from '../canon/operators';

export const CoreAndCanonViewer: React.FC = () => {
  const [subTab, setSubTab] = useState<'ENTITIES' | 'INVARIANTS' | 'RULES' | 'PRIMITIVES' | 'OPERATORS' | 'MODES'>('ENTITIES');

  // Interactive sample model for Operator demonstration
  const [demoModel, setDemoModel] = useState<CanonicalSystemModel>({
    id: 'demo_auth_system',
    name: 'Sample Microservice Model',
    description: 'Demonstrates 4 canonical transformation operators.',
    objects: [
      { id: 'client_app', name: 'Client UI', kind: 'OBJECT' as any, category: 'EXTERNAL_BOUNDARY' },
      { id: 'api_gateway', name: 'API Gateway', kind: 'OBJECT' as any, category: 'SERVICE' },
      { id: 'auth_module', name: 'Auth Module', kind: 'OBJECT' as any, category: 'MODULE' },
      { id: 'user_db', name: 'User Store', kind: 'OBJECT' as any, category: 'DATA_STORE' },
    ],
    relations: [
      { id: 'r1', kind: 'RELATION' as any, sourceObjectId: 'client_app', targetObjectId: 'api_gateway', type: 'CALLS' },
      { id: 'r2', kind: 'RELATION' as any, sourceObjectId: 'api_gateway', targetObjectId: 'auth_module', type: 'PIPES_INTO' },
      { id: 'r3', kind: 'RELATION' as any, sourceObjectId: 'auth_module', targetObjectId: 'user_db', type: 'READS_FROM' },
    ],
    constraints: [
      { id: 'c1', kind: 'CONSTRAINT' as any, name: 'Auth Boundary', expression: 'All client requests must pass Auth', enforcementLevel: 'INVARIANT', affectsObjectIds: ['api_gateway', 'auth_module'] },
    ],
    states: [],
  });

  const [operatorFeedback, setOperatorFeedback] = useState<string>('');

  const handleApplyBind = () => {
    try {
      const res = StructuralTransformationEngine.applyBind(demoModel, 'api_gateway', 'auth_module', 'Gateway_Auth_Composite');
      setDemoModel(res.resultingModel);
      setOperatorFeedback(res.rationale);
    } catch (e: any) {
      setOperatorFeedback(e.message);
    }
  };

  const handleApplySplit = () => {
    try {
      const res = StructuralTransformationEngine.applySplit(demoModel, 'user_db', 'UserReadReplica', 'UserWriteMaster');
      setDemoModel(res.resultingModel);
      setOperatorFeedback(res.rationale);
    } catch (e: any) {
      setOperatorFeedback(e.message);
    }
  };

  const handleApplyInsert = () => {
    try {
      const res = StructuralTransformationEngine.applyInsert(demoModel, 'client_app', 'api_gateway', 'WAF_Firewall', 'MODULE');
      setDemoModel(res.resultingModel);
      setOperatorFeedback(res.rationale);
    } catch (e: any) {
      setOperatorFeedback(e.message);
    }
  };

  const handleResetModel = () => {
    setDemoModel({
      id: 'demo_auth_system',
      name: 'Sample Microservice Model',
      description: 'Demonstrates 4 canonical transformation operators.',
      objects: [
        { id: 'client_app', name: 'Client UI', kind: 'OBJECT' as any, category: 'EXTERNAL_BOUNDARY' },
        { id: 'api_gateway', name: 'API Gateway', kind: 'OBJECT' as any, category: 'SERVICE' },
        { id: 'auth_module', name: 'Auth Module', kind: 'OBJECT' as any, category: 'MODULE' },
        { id: 'user_db', name: 'User Store', kind: 'OBJECT' as any, category: 'DATA_STORE' },
      ],
      relations: [
        { id: 'r1', kind: 'RELATION' as any, sourceObjectId: 'client_app', targetObjectId: 'api_gateway', type: 'CALLS' },
        { id: 'r2', kind: 'RELATION' as any, sourceObjectId: 'api_gateway', targetObjectId: 'auth_module', type: 'PIPES_INTO' },
        { id: 'r3', kind: 'RELATION' as any, sourceObjectId: 'auth_module', targetObjectId: 'user_db', type: 'READS_FROM' },
      ],
      constraints: [
        { id: 'c1', kind: 'CONSTRAINT' as any, name: 'Auth Boundary', expression: 'All client requests must pass Auth', enforcementLevel: 'INVARIANT', affectsObjectIds: ['api_gateway', 'auth_module'] },
      ],
      states: [],
    });
    setOperatorFeedback('Reset model to baseline structure.');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 font-mono">
                  5.2 CORE & CANON MATRIX
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  FROZEN REFERENCE
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-sans">
                Core: 5 Entities • 5 Statuses • 7 Invariants • 3 Rules | Canon: 4 Primitives • 4 Operators • 9 Research Modes
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 text-xs font-mono">
          {[
            { id: 'ENTITIES', name: '5 Entities & 5 Statuses' },
            { id: 'INVARIANTS', name: '7 Invariants (I1–I7)' },
            { id: 'RULES', name: '3 Rules (R1–R3)' },
            { id: 'PRIMITIVES', name: '4 Primitives' },
            { id: 'OPERATORS', name: '4 Operators (Simulator)' },
            { id: 'MODES', name: '9 Research Modes' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                subTab === t.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* View Content */}
      <div className="space-y-4 font-mono text-xs">

        {/* 1. ENTITIES & STATUSES */}
        {subTab === 'ENTITIES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 5 Entities */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-blue-700 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-600" />
                5 Canonical Entities (FROZEN)
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'OBSERVATION', desc: 'Directly verified fact extracted from raw input or repository artifacts.' },
                  { name: 'INFERENCE', desc: 'Deductive conclusion derived from one or more validated observations.' },
                  { name: 'UNKNOWN', desc: 'Explicitly marked missing data or unobserved structural attribute (I6: UNKNOWN ≠ FALSE).' },
                  { name: 'DECISION', desc: 'Selected pipeline action with mandatory REASON and PROVENANCE tracking (I2).' },
                  { name: 'EVIDENCE', desc: 'Raw tool output validated by explicit checking pass with source reference (I4).' },
                ].map((e, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-blue-700 font-bold">{idx + 1}. {e.name}</span>
                    <p className="text-slate-700 text-[11px] mt-1 font-sans">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Statuses */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-emerald-700 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                5 Canonical Statuses (FROZEN)
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'FACT', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: 'Directly observed and verifiable against raw ground-truth source.' },
                  { name: 'INFERENCE', badge: 'bg-purple-50 text-purple-700 border-purple-200', desc: 'Derived conclusion with explicit reasoning chain.' },
                  { name: 'UNKNOWN', badge: 'bg-amber-50 text-amber-700 border-amber-200', desc: 'Unobserved or absent attribute. Never assumed false.' },
                  { name: 'AMBIGUOUS', badge: 'bg-orange-50 text-orange-700 border-orange-200', desc: 'Conflicting or multi-valued data. Mandates Human Review (R1).' },
                  { name: 'DISPUTED', badge: 'bg-rose-50 text-rose-700 border-rose-200', desc: 'Contested assertion. Automatic selection is forbidden (R2).' },
                ].map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-900 font-bold">{idx + 1}. {s.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.badge}`}>{s.name}</span>
                    </div>
                    <p className="text-slate-700 text-[11px] font-sans">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. INVARIANTS */}
        {subTab === 'INVARIANTS' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-blue-700">
              7 CANONICAL INVARIANTS (I1–I7)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CANONICAL_5_2_INVARIANTS.map(inv => (
                <div key={inv.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold">
                      {inv.id}
                    </span>
                    <span className="text-slate-900 font-bold">{inv.rule}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] font-sans">{inv.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. RULES */}
        {subTab === 'RULES' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-amber-700">
              3 CANONICAL RULES (R1–R3)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CANONICAL_5_2_RULES.map(r => (
                <div key={r.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                      {r.id}
                    </span>
                    <span className="text-xs text-amber-900 font-bold">{r.name}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] font-sans">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PRIMITIVES */}
        {subTab === 'PRIMITIVES' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-blue-700">
              4 CANONICAL STRUCTURAL PRIMITIVES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'OBJECT', desc: 'Structural node or component in the architecture (e.g. Module, Store, Gateway).' },
                { name: 'RELATION', desc: 'Directed edge representing dataflow or dependency (CALLS, PIPES_INTO, READS_FROM).' },
                { name: 'CONSTRAINT', desc: 'Invariant or structural requirement governing nodes (e.g. Auth boundary).' },
                { name: 'STATE', desc: 'State machine lifecycle representation (e.g. RECEIVED → AUTHENTICATED).' },
              ].map((p, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-blue-700 font-bold text-xs">{i + 1}. {p.name}</span>
                  <p className="text-slate-600 text-[11px] mt-1 font-sans">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. OPERATORS SIMULATOR */}
        {subTab === 'OPERATORS' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4 CANONICAL OPERATORS (CONFIGURATION SEARCH SIMULATOR)
                </h3>
                <p className="text-[11px] text-slate-500 font-sans">
                  Applied exclusively in CONFIGURATION SEARCH mode: BIND, SPLIT, INSERT, DELETE.
                </p>
              </div>
              <button
                onClick={handleResetModel}
                className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Reset Topology
              </button>
            </div>

            {/* Operator Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={handleApplyBind}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                1. Apply BIND (Merge Gateway + Auth)
              </button>
              <button
                onClick={handleApplySplit}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                2. Apply SPLIT (Decompose User Store)
              </button>
              <button
                onClick={handleApplyInsert}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                3. Apply INSERT (Insert WAF Firewall)
              </button>
            </div>

            {operatorFeedback && (
              <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200 text-blue-800 text-xs font-mono">
                Log: {operatorFeedback}
              </div>
            )}

            {/* Live Model View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="text-slate-600 font-bold block mb-2 text-xs">OBJECTS ({demoModel.objects.length})</span>
                <div className="space-y-1.5">
                  {demoModel.objects.map(o => (
                    <div key={o.id} className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span className="text-slate-900 font-bold">{o.name}</span>
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">{o.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="text-slate-600 font-bold block mb-2 text-xs">RELATIONS ({demoModel.relations.length})</span>
                <div className="space-y-1.5">
                  {demoModel.relations.map(r => (
                    <div key={r.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-800 font-medium">
                      {r.sourceObjectId} <span className="text-blue-600 font-bold font-mono">--[{r.type}]--&gt;</span> {r.targetObjectId}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. RESEARCH MODES */}
        {subTab === 'MODES' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              9 CANONICAL RESEARCH MODES & CAPABILITY MAP
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CANONICAL_RESEARCH_MODES.map(m => (
                <div key={m.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-bold">{m.id}. {m.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'VERIFIED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : m.status === 'CONDITIONAL'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] font-sans">{m.description}</p>
                  {m.executionConstraint && (
                    <p className="text-amber-800 text-[10px] font-mono">Note: {m.executionConstraint}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
