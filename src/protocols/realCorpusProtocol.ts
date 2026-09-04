/**
 * SOL STRUCTURAL LAB v2.0
 * EXPERIMENTAL PROTOCOL: REAL CORPUS TEST
 * 
 * Target Repositories & Comparison Protocol
 * Status: PROTOCOL READY FOR REAL EXECUTION
 */

export interface CorpusRepositoryTarget {
  id: string;
  name: string;
  url: string;
  category: 'PRIMARY_CORPUS' | 'CANDIDATE_TOOL' | 'HISTORICAL_REFERENCE';
  description: string;
  structuralCharacteristics: string;
}

export const REAL_CORPUS_TARGETS: CorpusRepositoryTarget[] = [
  {
    id: 'ecp_mentor',
    name: 'Mentor (ECP)',
    url: 'https://github.com/a50kv109/engineering-constructor-primitives-MENTOR',
    category: 'PRIMARY_CORPUS',
    description: 'Engineering Constructor Primitives core reference implementation.',
    structuralCharacteristics: 'Primitive definitions, structural metadata, modular constructor contracts.',
  },
  {
    id: 'dn_classic_v2',
    name: 'DN-CLASSIC-v2',
    url: 'https://github.com/a50kv109/Document-Navigator-Classic-v2-DN-CLASSIC-v2',
    category: 'PRIMARY_CORPUS',
    description: 'Document Navigator Classic version 2 codebase.',
    structuralCharacteristics: 'Hierarchical navigation, multi-stage parser pipelines, state transitions.',
  },
  {
    id: 'aam_v1_telemetry',
    name: 'AAM-V1 Runtime Telemetry',
    url: 'https://github.com/a50kv109/AAM-V1_Runtime_Telemetry',
    category: 'PRIMARY_CORPUS',
    description: 'Runtime telemetry collector and monitoring agent.',
    structuralCharacteristics: 'Event streaming, metrics collection, raw output buffering.',
  },
  {
    id: 'two_heroes_tool',
    name: 'two-heroes-tool',
    url: 'https://github.com/a50kv109/two-heroes-tool',
    category: 'CANDIDATE_TOOL',
    description: 'Dual interpretation Python synthesis tool candidate.',
    structuralCharacteristics: 'Dual perspective comparison, agreement clustering.',
  },
  {
    id: 'book_nav_classic_v6',
    name: 'BOOK-NAV Classic V6',
    url: 'https://github.com/a50kv109/BOOK-NAV-Classic-V6',
    category: 'HISTORICAL_REFERENCE',
    description: 'Historical reference for structural reconstruction benchmarks.',
    structuralCharacteristics: 'Complex tree parsing, chapter node relationships.',
  },
  {
    id: 'libreoffice_agent_adapter',
    name: 'LibreOffice Agent Adapter',
    url: 'https://github.com/a50kv109/libreoffice-agent-adapter',
    category: 'HISTORICAL_REFERENCE',
    description: 'Historical reference for adapter and bridge architectures.',
    structuralCharacteristics: 'External C/Python boundary bridges, IPC protocols.',
  },
];

export const REAL_CORPUS_METRICS = [
  { id: 'M1', name: 'Quality of Inferences', description: 'Factual fidelity of inferences against verified source codebase' },
  { id: 'M2', name: 'False Conclusions Rate', description: 'Count and percentage of hallucinatory or unsupported assertions' },
  { id: 'M3', name: 'Missed Structural Facts', description: 'Omissions of key structural nodes, interfaces, or constraints' },
  { id: 'M4', name: 'UNKNOWN Handling Discipline', description: 'Strict retention of UNKNOWN without illegitimate coercion to FALSE' },
  { id: 'M5', name: 'Traceability (Provenance)', description: 'Completeness of source observation trails for all decisions' },
  { id: 'M6', name: 'Explainability', description: 'Clarity and reproducibility of synthesized reports' },
  { id: 'M7', name: 'Computational Overhead', description: 'Latency and resource multiplication factor of discipline layer' },
] as const;
