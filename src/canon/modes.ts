/**
 * SOL STRUCTURAL LAB v2.0
 * LABORATORY CANON — FROZEN
 * 
 * 9 RESEARCH MODES & CAPABILITY MAP
 */

export enum CapabilityStatus {
  VERIFIED = 'VERIFIED',         // Confirmed through repeatable empirical experiments
  CONDITIONAL = 'CONDITIONAL',   // Operates only when input fulfills structural criteria
  EXPERIMENTAL = 'EXPERIMENTAL', // Single experiment demonstrated or under active trial
  NOT_SUPPORTED = 'NOT_SUPPORTED',
}

export interface ResearchModeDefinition {
  id: number;
  name: string;
  code: string;
  status: CapabilityStatus;
  description: string;
  historicalExperiments: string[];
  executionConstraint?: string;
}

export const CANONICAL_RESEARCH_MODES: ResearchModeDefinition[] = [
  {
    id: 1,
    name: 'STRUCTURAL RECONSTRUCTION',
    code: 'STRUCTURAL_RECONSTRUCTION',
    status: CapabilityStatus.VERIFIED,
    description: 'Decomposition of source artifacts into OBJECT, RELATION, CONSTRAINT, and STATE primitives.',
    historicalExperiments: ['15_structures', 'booknav_v6', 'libreoffice_adapter', 'api_gateway'],
  },
  {
    id: 2,
    name: 'FUNCTIONAL RECONSTRUCTION',
    code: 'FUNCTIONAL_RECONSTRUCTION',
    status: CapabilityStatus.VERIFIED,
    description: 'Reconstruction of data flow, telemetry hooks, and functional behavior across modules.',
    historicalExperiments: ['booknav_v6', 'libreoffice_adapter', 'api_gateway'],
  },
  {
    id: 3,
    name: 'INVARIANT DISCOVERY',
    code: 'INVARIANT_DISCOVERY',
    status: CapabilityStatus.VERIFIED,
    description: 'Identification of immutable architectural constraints and ordering invariants.',
    historicalExperiments: ['booknav_v6', 'api_gateway'],
  },
  {
    id: 4,
    name: 'ARCHITECTURAL ATTACK',
    code: 'ARCHITECTURAL_ATTACK',
    status: CapabilityStatus.VERIFIED,
    description: 'Identification of single points of failure (SPOF), semantic drift, and structural fragility.',
    historicalExperiments: ['booknav_v6', 'api_gateway'],
  },
  {
    id: 5,
    name: 'CONFIGURATION SEARCH',
    code: 'CONFIGURATION_SEARCH',
    status: CapabilityStatus.VERIFIED,
    description: 'Exploration of topological variations using the 4 canonical operators.',
    historicalExperiments: ['booknav_v6', 'libreoffice_adapter', 'api_gateway'],
  },
  {
    id: 6,
    name: 'ALTERNATIVE GENERATION',
    code: 'ALTERNATIVE_GENERATION',
    status: CapabilityStatus.VERIFIED,
    description: 'Automated synthesis of alternative architectural topologies with invariant preservation.',
    historicalExperiments: ['booknav_v6', 'libreoffice_adapter', 'api_gateway'],
  },
  {
    id: 7,
    name: 'CONSTRUCTION RECONSTRUCTION',
    code: 'CONSTRUCTION_RECONSTRUCTION',
    status: CapabilityStatus.CONDITIONAL,
    description: 'Reconstruction of the authoring methodology from artifact trace signatures.',
    historicalExperiments: ['ecp_mentor'],
    executionConstraint: 'Applied ONLY if structure exhibits sufficient historical traces; otherwise emits NOT_RECONSTRUCTABLE_FROM_AVAILABLE_EVIDENCE.',
  },
  {
    id: 8,
    name: 'CAPABILITY DISCOVERY',
    code: 'CAPABILITY_DISCOVERY',
    status: CapabilityStatus.EXPERIMENTAL,
    description: 'Discovery and empirical validation of boundary limits for laboratory operators.',
    historicalExperiments: ['self_audit'],
  },
  {
    id: 9,
    name: 'SELF-AUDIT',
    code: 'SELF_AUDIT',
    status: CapabilityStatus.EXPERIMENTAL,
    description: 'Internal audit of reasoning chains, invariant enforcement, and contract fulfillment.',
    historicalExperiments: ['self_audit'],
  },
];
