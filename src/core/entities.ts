/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 CORE — FROZEN
 * 
 * 5 Entities & 5 Statuses
 * Modification: FORBIDDEN
 * Extension: FORBIDDEN
 */

export enum CoreEntityKind {
  OBSERVATION = 'OBSERVATION', // Observed fact directly from raw data/source
  INFERENCE = 'INFERENCE',     // Derived conclusion from observations
  UNKNOWN = 'UNKNOWN',         // Verified absence of data or unobserved attribute
  DECISION = 'DECISION',       // Selected action with explicit Reason + Provenance
  EVIDENCE = 'EVIDENCE',       // Validated proof with source and verification check
}

export enum CoreStatus {
  FACT = 'FACT',             // Directly observed, verified against source
  INFERENCE = 'INFERENCE',   // Derived from facts by analytical reasoning
  UNKNOWN = 'UNKNOWN',       // Cannot be determined from available data
  AMBIGUOUS = 'AMBIGUOUS',   // Admits multiple valid or conflicting interpretations
  DISPUTED = 'DISPUTED',     // Contested assertion or conflicting claims
}

export interface Observation {
  id: string;
  source: string;
  statement: string;
  status: CoreStatus.FACT | CoreStatus.UNKNOWN | CoreStatus.AMBIGUOUS;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

export interface Inference {
  id: string;
  statement: string;
  derivedFrom: string[]; // IDs of observations or validated evidence
  confidence?: number;
  reasoning: string;
  status: CoreStatus.INFERENCE | CoreStatus.AMBIGUOUS | CoreStatus.DISPUTED;
}

export interface UnknownData {
  id: string;
  targetField: string;
  reason: string;
  status: CoreStatus.UNKNOWN;
}

export type DecisionAction = 'ACTIVATE' | 'BLOCK' | 'REVIEW' | 'SKIP';

export interface Decision {
  id: string;
  action: DecisionAction;
  target: string;
  reason: string;          // MANDATORY invariant: Reason
  provenance: string;      // MANDATORY invariant: Provenance (source observation/rule ID)
  timestamp: number;
}

export interface ToolRawOutput {
  toolId: string;
  rawPayload: unknown;
  executionTimeMs: number;
  exitCode: number;
  stdout?: string;
  stderr?: string;
}

export interface Evidence {
  id: string;
  source: string;
  sourceOutputId: string;
  content: string;
  validationStatus: 'VALIDATED' | 'INVALID' | 'UNCHECKED';
  validatorNotes?: string;
  timestamp: number;
}

export interface SynthesisReport {
  id: string;
  title: string;
  summary: string;
  evidences: Evidence[];
  inferences: Inference[];
  unknowns: UnknownData[];
  epistemicWarnings: string[];
  generatedAt: number;
}
