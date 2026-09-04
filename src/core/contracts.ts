/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 CORE — FROZEN
 * 
 * 5 ARCHITECTURAL CONTRACTS (C1–C5)
 * C1 — OBSERVATION CONTRACT
 * C2 — DECISION CONTRACT
 * C3 — EXECUTION CONTRACT
 * C4 — EVIDENCE CONTRACT
 * C5 — REPORT CONTRACT
 */

import {
  Observation,
  Decision,
  ToolRawOutput,
  Evidence,
  SynthesisReport,
  CoreStatus,
} from './entities';

export interface ContractCheckResult {
  contractId: 'C1' | 'C2' | 'C3' | 'C4' | 'C5';
  valid: boolean;
  violations: string[];
}

export class CoreContractsValidator {
  /**
   * C1 — OBSERVATION CONTRACT
   * Input: Raw source data
   * Output: Observation
   * MUST: Only facts + verifiable source
   * MUST NOT: Interpretations / deductive conclusions
   */
  public static verifyC1(observations: Observation[]): ContractCheckResult {
    const violations: string[] = [];
    for (const obs of observations) {
      if (!obs.source || obs.source.trim() === '') {
        violations.push(`Observation [${obs.id}] violates C1: missing required source origin.`);
      }
      if (!obs.statement || obs.statement.trim() === '') {
        violations.push(`Observation [${obs.id}] violates C1: empty statement.`);
      }
      // Check for speculative marker words in observation statements
      const speculativeWords = ['probably', 'might be', 'suggests that', 'infer that', 'assumed'];
      const lower = obs.statement.toLowerCase();
      if (speculativeWords.some(w => lower.includes(w)) && obs.status === CoreStatus.FACT) {
        violations.push(`Observation [${obs.id}] violates C1 MUST NOT: contains speculative deduction instead of pure observation.`);
      }
    }
    return {
      contractId: 'C1',
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * C2 — DECISION CONTRACT
   * Input: Observation
   * Output: Decision (ACTIVATE / BLOCK / REVIEW / SKIP)
   * MUST: reason + provenance
   * MUST NOT: Decision without explicit ground
   */
  public static verifyC2(decisions: Decision[]): ContractCheckResult {
    const violations: string[] = [];
    for (const dec of decisions) {
      if (!dec.reason || dec.reason.trim() === '') {
        violations.push(`Decision [${dec.id}] violates C2: missing required reason.`);
      }
      if (!dec.provenance || dec.provenance.trim() === '') {
        violations.push(`Decision [${dec.id}] violates C2: missing required provenance.`);
      }
      if (!['ACTIVATE', 'BLOCK', 'REVIEW', 'SKIP'].includes(dec.action)) {
        violations.push(`Decision [${dec.id}] violates C2: invalid action [${dec.action}].`);
      }
    }
    return {
      contractId: 'C2',
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * C3 — EXECUTION CONTRACT
   * Input: Tool + Tool Input
   * Output: RawOutput
   * MUST: Only raw telemetry / payload
   * MUST NOT: Interpretations
   */
  public static verifyC3(rawOutput: ToolRawOutput): ContractCheckResult {
    const violations: string[] = [];
    if (!rawOutput.toolId) {
      violations.push('Execution output violates C3: missing toolId.');
    }
    if (typeof rawOutput.rawPayload === 'undefined') {
      violations.push('Execution output violates C3: missing rawPayload.');
    }
    return {
      contractId: 'C3',
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * C4 — EVIDENCE CONTRACT
   * Input: RawOutput
   * Output: Evidence
   * MUST: source + validation_status
   * MUST NOT: RawOutput = Evidence (must pass validation check)
   */
  public static verifyC4(evidenceList: Evidence[]): ContractCheckResult {
    const violations: string[] = [];
    for (const ev of evidenceList) {
      if (!ev.sourceOutputId) {
        violations.push(`Evidence [${ev.id}] violates C4: missing source raw output reference.`);
      }
      if (ev.validationStatus !== 'VALIDATED') {
        violations.push(`Evidence [${ev.id}] violates C4: validation status is '${ev.validationStatus}' (MUST be 'VALIDATED').`);
      }
    }
    return {
      contractId: 'C4',
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * C5 — REPORT CONTRACT
   * Input: Evidence
   * Output: Report
   * MUST: synthesis of validated evidence
   * MUST NOT: Evidence = Report
   */
  public static verifyC5(report: SynthesisReport): ContractCheckResult {
    const violations: string[] = [];
    if (!report.title || !report.summary) {
      violations.push('Report violates C5: missing title or synthesis summary.');
    }
    if (!Array.isArray(report.evidences) || report.evidences.length === 0) {
      violations.push('Report violates C5: report must synthesize at least one validated evidence item.');
    }
    return {
      contractId: 'C5',
      valid: violations.length === 0,
      violations,
    };
  }
}

export const CANONICAL_5_2_CONTRACTS = [
  { id: 'C1', name: 'OBSERVATION CONTRACT', in: 'Raw Data', out: 'Observation', must: 'Only facts + source', mustNot: 'Interpretation' },
  { id: 'C2', name: 'DECISION CONTRACT', in: 'Observation', out: 'Decision (ACTIVATE/BLOCK/REVIEW)', must: 'reason + provenance', mustNot: 'Groundless choice' },
  { id: 'C3', name: 'EXECUTION CONTRACT', in: 'Tool + Tool Input', out: 'RawOutput', must: 'Pure raw output', mustNot: 'Synthesis' },
  { id: 'C4', name: 'EVIDENCE CONTRACT', in: 'RawOutput', out: 'Evidence', must: 'source + validation_status', mustNot: 'Direct unvalidated output' },
  { id: 'C5', name: 'REPORT CONTRACT', in: 'Evidence', out: 'Report', must: 'Formal synthesis', mustNot: 'Raw evidence passthrough' },
] as const;
