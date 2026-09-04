import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
  Layers,
  Lock,
  Cpu,
} from 'lucide-react';
import { BuildIntegrityTester, BuildIntegrityReport } from '../testing/integrityTest';

interface IntegrityTestRunnerProps {
  initialReport?: BuildIntegrityReport | null;
  onReportUpdate?: (report: BuildIntegrityReport) => void;
}

export const IntegrityTestRunner: React.FC<IntegrityTestRunnerProps> = ({
  initialReport,
  onReportUpdate,
}) => {
  const [report, setReport] = useState<BuildIntegrityReport | null>(initialReport || null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const runAudit = async () => {
    setIsRunning(true);
    try {
      const res = await BuildIntegrityTester.runAllChecks();
      setReport(res);
      if (onReportUpdate) onReportUpdate(res);
    } catch (e) {
      console.error('Integrity audit error', e);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (!report) {
      runAudit();
    }
  }, []);

  const filteredChecks = report
    ? categoryFilter === 'ALL'
      ? report.checks
      : report.checks.filter(c => c.category === categoryFilter)
    : [];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 font-mono">
                  BUILD INTEGRITY AUDIT & TEST SUITE
                </h2>
                {report && (
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      report.status === 'SUCCESS'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    STATUS: {report.status} ({report.passedChecks}/{report.totalChecks} PASSED)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-sans">
                Automated Verification of 5.2 Invariants, Rules, Contracts C1–C5, Positive Path & Negative Cases
              </p>
            </div>
          </div>

          <button
            onClick={runAudit}
            disabled={isRunning}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer font-mono"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Auditing System...' : 'Re-Run All Checks'}
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 font-mono text-xs">
          {[
            { id: 'ALL', name: 'All Checks' },
            { id: 'CORE_INVARIANTS', name: 'Core Invariants (I1–I7)' },
            { id: 'RULES_ENGINE', name: 'Rules Engine (R1–R3)' },
            { id: 'PIPELINE_FLOW', name: 'Pipeline Flow (C1–C5)' },
            { id: 'BOUNDARY_ISOLATION', name: 'Boundary Isolation' },
            { id: 'NEGATIVE_CASES', name: 'Negative Cases' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setCategoryFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition text-xs cursor-pointer ${
                categoryFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Test List */}
      {report && (
        <div className="space-y-3 font-mono text-xs">
          {filteredChecks.map(check => (
            <div
              key={check.id}
              className={`p-4 rounded-xl border transition flex items-start justify-between ${
                check.passed
                  ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center space-x-2">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                  <span className="text-slate-900 font-bold text-xs">{check.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px]">
                    {check.id}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                    {check.category}
                  </span>
                </div>
                <p className="text-slate-600 text-xs pl-6 font-sans">{check.details}</p>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 border ${
                  check.passed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {check.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
