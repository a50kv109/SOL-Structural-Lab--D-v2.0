/**
 * SOL STRUCTURAL LAB v2.0
 * EXPERIMENTAL MEMORY & HISTORICAL RECORD
 * 
 * Experiments C–I (5.2 Core derivation) and J–O (Dual Analysis formulation)
 * Status: HISTORICAL RECORD (NOT CANON)
 */

export interface HistoricalExperimentRecord {
  experimentId: string;
  name: string;
  testedHypothesis: string;
  outcome: string;
  provenFindings: string[];
  rejectedComponents: string[];
  artefact: string;
}

export const EXPERIMENTS_C_TO_I_HISTORY: HistoricalExperimentRecord[] = [
  {
    experimentId: 'EXP_C',
    name: 'Experiment C — Complex Cases',
    testedHypothesis: 'Analyze monorepos, security boundaries, and high-complexity systems.',
    outcome: 'Identified monorepo fragility; proved 4 modular roles are sufficient to cover complex topologies.',
    provenFindings: ['4 modules cover all structural cases', 'Clear boundary separation is mandatory'],
    rejectedComponents: [],
    artefact: 'Monorepo structural analysis protocol',
  },
  {
    experimentId: 'EXP_D',
    name: 'Experiment D — DEPSIK vs BASELINE',
    testedHypothesis: 'Evaluate recall improvement provided by DEPSIK disciplinary layer over unconstrained baseline.',
    outcome: '+3.7% recall advantage; epistemic discipline strictly prevents ungrounded hallucinations.',
    provenFindings: ['Discipline layer improves recall by +3.7%', 'Structural tracking prevents false positives'],
    rejectedComponents: ['Full monolithic DEPSIK D'],
    artefact: 'BASELINE vs DEPSIK comparative benchmark table',
  },
  {
    experimentId: 'EXP_E',
    name: 'Experiment E — Architectural Minimality',
    testedHypothesis: 'Determine minimum number of modules necessary for epistemic pipeline.',
    outcome: '4 modules (Profiler, Planner, Executor, Validator+Reporter) are necessary and sufficient.',
    provenFindings: ['4 modules sufficient', '6 proposed sub-components were redundant'],
    rejectedComponents: ['Separate D-INSTRUCTOR', 'Separate Research Planner', 'Separate Tool Selection Policy'],
    artefact: 'Minimal 4-Module Architecture Specification',
  },
  {
    experimentId: 'EXP_F',
    name: 'Experiment F — Contracts as Boundaries',
    testedHypothesis: 'Enforce module boundaries through formal input/output contracts (C1–C5).',
    outcome: '5 contracts cleanly isolate responsibilities and make violations immediately detectable.',
    provenFindings: ['5 responsibilities map to 5 formal contracts', 'Contract breaches catch reasoning drift early'],
    rejectedComponents: ['Implicit pipeline parameter passing'],
    artefact: 'Canonical Contracts C1–C5',
  },
  {
    experimentId: 'EXP_G',
    name: 'Experiment G — Invariant Violations',
    testedHypothesis: 'Test machine-enforceability of 9 candidate architectural invariants.',
    outcome: '5 of 9 invariants were not machine-enforceable; pruned to 7 strictly enforceable invariants.',
    provenFindings: ['7 Core Invariants (I1–I7) are valid and enforceable', 'Human review required for ambiguous edge cases'],
    rejectedComponents: ['Unverifiable speculative invariants'],
    artefact: 'Canonical 7 Invariants (I1–I7)',
  },
  {
    experimentId: 'EXP_H',
    name: 'Experiment H — Semantic Enforcement Limits',
    testedHypothesis: 'Attempt 100% automated machine-checked semantic verification.',
    outcome: '16 of 27 semantic checks produced silent failures; proved STRUCTURAL VALIDITY != TRUTH OF CONTENT.',
    provenFindings: ['Structural validity does not guarantee semantic truth', 'Human in the loop is essential for ambiguous claims'],
    rejectedComponents: ['Complex enforcement engine', 'Full machine-check semantics'],
    artefact: 'Silent failure analysis report & Epistemic Boundary Notice',
  },
  {
    experimentId: 'EXP_I',
    name: 'Experiment I — Real Repositories Protocol',
    testedHypothesis: 'Design formal protocol for analyzing external repositories in sandboxed environments.',
    outcome: 'Defined Real Corpus Test protocol and target repository suite for Google AI Studio.',
    provenFindings: ['Protocol ready for real corpus testing', 'External tools must be vetted before integration'],
    rejectedComponents: [],
    artefact: 'REAL CORPUS TEST Protocol v1.0',
  },
];

export const EXPERIMENTS_J_TO_O_HISTORY: HistoricalExperimentRecord[] = [
  {
    experimentId: 'EXP_J_O',
    name: 'Experiments J–O — Dual Analysis Formulation',
    testedHypothesis: 'Can dual independent analyst passes produce superior structural recall over single pass?',
    outcome: 'Formulated DUAL_ANALYSIS as an experimental HYPOTHESIS; authored and froze Evaluation Protocol v1.0.',
    provenFindings: ['Dual pass formulated with strict independence rules', 'A=B does not prove Truth', 'A!=B does not prove Error'],
    rejectedComponents: ['Prematurely declaring Dual Analysis as Canon'],
    artefact: 'DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0 (FROZEN)',
  },
];

export const REJECTED_LABORATORY_COMPONENTS = [
  { name: 'Full Monolithic DEPSIK D', reason: 'Excessive complexity without added recall over minimal layer' },
  { name: 'Separate D-INSTRUCTOR', reason: 'Function cleanly integrated directly into Profiler' },
  { name: 'Separate Research Planner', reason: 'Function cleanly integrated directly into Planner' },
  { name: 'Separate Tool Selection Policy', reason: 'Function cleanly integrated directly into Planner' },
  { name: 'DLE for Tool Selection', reason: 'Provided no measurable advantage in empirical tests' },
  { name: 'Complex Enforcement Engine', reason: '16/27 checks caused silent failures; semantic truth unprovable purely syntactically' },
  { name: 'Full Machine-Check Semantics', reason: 'Proved impossible; epistemic discipline requires human review for ambiguity' },
] as const;

export const FUNDAMENTAL_LAB_LIMITATION = {
  rule: 'STRUCTURAL VALIDITY ≠ TRUTH OF CONTENT',
  explanation: 'Strict structural adherence to contracts (valid reason, provenance, non-empty outputs) guarantees procedural integrity, but does not guarantee the objective semantic truth of the underlying subject matter. Independent empirical evidence is required.',
} as const;
