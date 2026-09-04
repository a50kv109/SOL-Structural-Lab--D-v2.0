/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 CORE — FROZEN
 * 
 * 7 INVARIANTS
 * I1: OBSERVATION ≠ INFERENCE
 * I2: DECISION requires REASON + PROVENANCE
 * I3: EXECUTION returns RAW OUTPUT
 * I4: OUTPUT ≠ EVIDENCE
 * I5: EVIDENCE ≠ REPORT
 * I6: UNKNOWN ≠ FALSE
 * I7: INFERENCE ≠ EVIDENCE
 */

import {
  CoreEntityKind,
  CoreStatus,
  Observation,
  Inference,
  Decision,
  ToolRawOutput,
  Evidence,
  SynthesisReport,
  UnknownData,
} from './entities';

export interface InvariantViolation {
  invariantId: 'I1' | 'I2' | 'I3' | 'I4' | 'I5' | 'I6' | 'I7';
  description: string;
  culprit: unknown;
  timestamp: number;
}

export class CoreInvariantsValidator {
  /**
   * I1: OBSERVATION ≠ INFERENCE
   * Ensures an Observation object contains only factual statements without inferred conclusions.
   */
  public static validateI1(entity: Observation | Inference): InvariantViolation | null {
    if ('derivedFrom' in entity && (entity as any).status === CoreStatus.FACT) {
      return {
        invariantId: 'I1',
        description: 'Invariant I1 violated: Inference object masquerading as factual Observation without raw source verification.',
        culprit: entity,
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I2: DECISION requires REASON + PROVENANCE
   * Ensures any decision has non-empty reason and non-empty provenance.
   */
  public static validateI2(decision: Decision): InvariantViolation | null {
    if (!decision.reason || decision.reason.trim() === '') {
      return {
        invariantId: 'I2',
        description: 'Invariant I2 violated: Decision made without mandatory REASON.',
        culprit: decision,
        timestamp: Date.now(),
      };
    }
    if (!decision.provenance || decision.provenance.trim() === '') {
      return {
        invariantId: 'I2',
        description: 'Invariant I2 violated: Decision made without mandatory PROVENANCE.',
        culprit: decision,
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I3: EXECUTION returns RAW OUTPUT
   * Verifies that execution step emits raw output rather than synthesized evidence.
   */
  public static validateI3(output: ToolRawOutput): InvariantViolation | null {
    if (!output || typeof output.rawPayload === 'undefined' || output.executionTimeMs < 0) {
      return {
        invariantId: 'I3',
        description: 'Invariant I3 violated: Execution did not yield structured RAW OUTPUT.',
        culprit: output,
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I4: OUTPUT ≠ EVIDENCE
   * Verifies that raw tool output is never treated directly as validated Evidence without validation pass.
   */
  public static validateI4(candidateEvidence: Evidence): InvariantViolation | null {
    if (candidateEvidence.validationStatus !== 'VALIDATED') {
      return {
        invariantId: 'I4',
        description: 'Invariant I4 violated: Raw tool output injected into Evidence layer without validation step (validationStatus is not VALIDATED).',
        culprit: candidateEvidence,
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I5: EVIDENCE ≠ REPORT
   * Verifies that discrete Evidence items are not conflated with the synthesized final Report.
   */
  public static validateI5(report: SynthesisReport): InvariantViolation | null {
    if (!report.title || !report.summary || !Array.isArray(report.evidences)) {
      return {
        invariantId: 'I5',
        description: 'Invariant I5 violated: Raw evidence item emitted as Report without formal synthesis structure.',
        culprit: report,
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I6: UNKNOWN ≠ FALSE
   * Verifies that unobserved or missing attributes remain UNKNOWN rather than being coerced to boolean false.
   */
  public static validateI6(unknownItem: UnknownData, interpretedAsFalse: boolean): InvariantViolation | null {
    if (unknownItem.status === CoreStatus.UNKNOWN && interpretedAsFalse) {
      return {
        invariantId: 'I6',
        description: 'Invariant I6 violated: UNKNOWN status illegitimately coerced to FALSE or non-existence.',
        culprit: { unknownItem, interpretedAsFalse },
        timestamp: Date.now(),
      };
    }
    return null;
  }

  /**
   * I7: INFERENCE ≠ EVIDENCE
   * Verifies that speculative inferences are not labeled as validated Evidence.
   */
  public static validateI7(item: { kind?: CoreEntityKind; status?: CoreStatus }): InvariantViolation | null {
    if (item.kind === CoreEntityKind.INFERENCE && item.status === (CoreStatus.FACT as any)) {
      return {
        invariantId: 'I7',
        description: 'Invariant I7 violated: Analytical Inference promoted to Evidence without independent ground-truth verification.',
        culprit: item,
        timestamp: Date.now(),
      };
    }
    return null;
  }
}

export const CANONICAL_5_2_INVARIANTS = [
  { id: 'I1', rule: 'OBSERVATION ≠ INFERENCE', description: 'Separation of raw observation from deductive inference' },
  { id: 'I2', rule: 'DECISION requires REASON + PROVENANCE', description: 'No decision can be enacted without documented rationale and origin' },
  { id: 'I3', rule: 'EXECUTION returns RAW OUTPUT', description: 'Tool executions produce raw telemetry/payloads only' },
  { id: 'I4', rule: 'OUTPUT ≠ EVIDENCE', description: 'Raw tool output is never accepted as Evidence prior to validation' },
  { id: 'I5', rule: 'EVIDENCE ≠ REPORT', description: 'Disjoint evidence elements must be synthesized through reporting layer' },
  { id: 'I6', rule: 'UNKNOWN ≠ FALSE', description: 'Missing data represents lack of observation, never falsity' },
  { id: 'I7', rule: 'INFERENCE ≠ EVIDENCE', description: 'Theoretical models and hypotheses remain distinct from validated proof' },
] as const;
