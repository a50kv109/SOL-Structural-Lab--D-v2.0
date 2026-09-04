/**
 * SOL STRUCTURAL LAB v2.0
 * GOLD STANDARD SUBSYSTEM
 * 
 * Epistemic Rules:
 * 1. Gold Standard is created INDEPENDENTLY from analyst outputs.
 * 2. Pre-analysis locking: Gold Standard is locked and hashed before analysis begins.
 * 3. Analysts MUST NOT observe Gold Standard during execution (blinding).
 * 4. Analyst outputs MUST NOT modify the Gold Standard.
 * 5. Gold Standard remains immutable during post-analysis validation.
 */

export type ErrorTaxonomy =
  | 'STRUCTURAL_OMISSION'
  | 'INVARIANT_VIOLATION'
  | 'BOUNDARY_LEAK'
  | 'FALSE_DEPENDENCY'
  | 'UNKNOWN_COERCION'
  | 'UNSUPPORTED_INFERENCE'
  | 'CONCURRENCY_HAZARD';

export type ExpectedClassification =
  | 'TRUE_ERROR'
  | 'ARCHITECTURAL_INVARIANT'
  | 'STRUCTURAL_NODE'
  | 'DATAFLOW_RELATION'
  | 'UNKNOWN_BOUNDARY';

export interface GoldStandardEntry {
  id: string;
  corpusObjectId: string;
  knownItem: string;
  taxonomy: ErrorTaxonomy;
  expectedClassification: ExpectedClassification;
  evidenceSource: string; // e.g. "src/core/engine.py:45"
  annotatorProvenance: string; // e.g. "Expert Ground-Truth Annotation #109"
  annotatedAt: number;
  injectedControlError?: boolean;
}

export interface GoldStandardCorpus {
  corpusObjectId: string;
  corpusName: string;
  version: string;
  checksum: string; // SHA-like deterministic fingerprint
  isLocked: boolean;
  lockedAt: number | null;
  entries: GoldStandardEntry[];
}

/**
 * Pre-defined, verified Gold Standard ground-truth datasets for Real Corpus targets.
 * Created independently of any automated tool execution.
 */
export const INITIAL_GOLD_STANDARDS: Record<string, GoldStandardCorpus> = {
  ecp_mentor: {
    corpusObjectId: 'ecp_mentor',
    corpusName: 'Mentor (ECP)',
    version: '1.0-FROZEN',
    checksum: 'gs-sha256-ecp-90f488e1a',
    isLocked: true,
    lockedAt: 1725010000000,
    entries: [
      {
        id: 'gs_ecp_1',
        corpusObjectId: 'ecp_mentor',
        knownItem: 'PrimitiveDefinition interface declares kind: OBJECT | RELATION | CONSTRAINT | STATE',
        taxonomy: 'STRUCTURAL_OMISSION',
        expectedClassification: 'ARCHITECTURAL_INVARIANT',
        evidenceSource: 'src/core/primitives.ts:2-7',
        annotatorProvenance: 'Expert Reviewer A - Ground Truth',
        annotatedAt: 1725005000000,
      },
      {
        id: 'gs_ecp_2',
        corpusObjectId: 'ecp_mentor',
        knownItem: 'ModularConstructor enforces validateBoundary with non-empty string check',
        taxonomy: 'BOUNDARY_LEAK',
        expectedClassification: 'TRUE_ERROR',
        evidenceSource: 'src/constructors/mentor.ts:8-12',
        annotatorProvenance: 'Expert Reviewer A - Ground Truth',
        annotatedAt: 1725005000000,
      },
      {
        id: 'gs_ecp_3',
        corpusObjectId: 'ecp_mentor',
        knownItem: 'Contract IBoundary specifies immutable isolation perimeter',
        taxonomy: 'INVARIANT_VIOLATION',
        expectedClassification: 'ARCHITECTURAL_INVARIANT',
        evidenceSource: 'src/contracts/IBoundary.ts:1-15',
        annotatorProvenance: 'Expert Reviewer B - Independent Audit',
        annotatedAt: 1725005100000,
      },
    ],
  },
  two_heroes_tool: {
    corpusObjectId: 'two_heroes_tool',
    corpusName: 'two-heroes-tool',
    version: '0.1.0-alpha-FROZEN',
    checksum: 'gs-sha256-th-82c199bf4',
    isLocked: true,
    lockedAt: 1725010000000,
    entries: [
      {
        id: 'gs_th_1',
        corpusObjectId: 'two_heroes_tool',
        knownItem: 'Dual perspective synthesis engine produces unified interpretation without ground-truth verification',
        taxonomy: 'UNSUPPORTED_INFERENCE',
        expectedClassification: 'TRUE_ERROR',
        evidenceSource: 'two_heroes/synthesis.py:18-42',
        annotatorProvenance: 'SOL 5.2 Empirical Audit #4',
        annotatedAt: 1725006000000,
      },
      {
        id: 'gs_th_2',
        corpusObjectId: 'two_heroes_tool',
        knownItem: 'Preset hero personas (Creator, Engineer, Skeptic, Strategist, Optimist, Philosopher) define separate prompts',
        taxonomy: 'STRUCTURAL_OMISSION',
        expectedClassification: 'STRUCTURAL_NODE',
        evidenceSource: 'two_heroes/heroes/*.py',
        annotatorProvenance: 'SOL 5.2 Empirical Audit #4',
        annotatedAt: 1725006100000,
      },
      {
        id: 'gs_th_3',
        corpusObjectId: 'two_heroes_tool',
        knownItem: 'Lack of hard isolation barrier allows shared in-process Python memory space across heroes',
        taxonomy: 'BOUNDARY_LEAK',
        expectedClassification: 'TRUE_ERROR',
        evidenceSource: 'two_heroes/engine.py:54-72',
        annotatorProvenance: 'SOL 5.2 Independence Verification Team',
        annotatedAt: 1725006200000,
      },
    ],
  },
  belov_fiber_sdk: {
    corpusObjectId: 'belov_fiber_sdk',
    corpusName: 'Belov Fiber SDK',
    version: '1.0-FROZEN',
    checksum: 'gs-sha256-bf-44d187ea2',
    isLocked: true,
    lockedAt: 1725010000000,
    entries: [
      {
        id: 'gs_bf_1',
        corpusObjectId: 'belov_fiber_sdk',
        knownItem: 'Protocol recovery layer handles transient tool failure with fallback retries',
        taxonomy: 'STRUCTURAL_OMISSION',
        expectedClassification: 'ARCHITECTURAL_INVARIANT',
        evidenceSource: 'src/belov_fiber/core/recovery.py:12-38',
        annotatorProvenance: 'Belov Architecture Review',
        annotatedAt: 1725007000000,
      },
      {
        id: 'gs_bf_2',
        corpusObjectId: 'belov_fiber_sdk',
        knownItem: 'Adapters for Anthropic, Gemini, OpenAI maintain unified tool schema',
        taxonomy: 'FALSE_DEPENDENCY',
        expectedClassification: 'STRUCTURAL_NODE',
        evidenceSource: 'src/belov_fiber/adapters/*.py',
        annotatorProvenance: 'Belov Architecture Review',
        annotatedAt: 1725007100000,
      },
    ],
  },
  dn_classic_v2: {
    corpusObjectId: 'dn_classic_v2',
    corpusName: 'DN-CLASSIC-v2',
    version: '2.0-FROZEN',
    checksum: 'gs-sha256-dn-11e55aa79',
    isLocked: true,
    lockedAt: 1725010000000,
    entries: [
      {
        id: 'gs_dn_1',
        corpusObjectId: 'dn_classic_v2',
        knownItem: 'Hierarchical navigation parser builds parent-child node tree from markdown structure',
        taxonomy: 'STRUCTURAL_OMISSION',
        expectedClassification: 'STRUCTURAL_NODE',
        evidenceSource: 'src/parsers/hierarchy.ts:14-60',
        annotatorProvenance: 'Classic Corpus Team',
        annotatedAt: 1725008000000,
      },
      {
        id: 'gs_dn_2',
        corpusObjectId: 'dn_classic_v2',
        knownItem: 'State transition pipeline restricts backwards jumping without explicit reset token',
        taxonomy: 'INVARIANT_VIOLATION',
        expectedClassification: 'ARCHITECTURAL_INVARIANT',
        evidenceSource: 'src/state/transitions.ts:25-48',
        annotatorProvenance: 'Classic Corpus Team',
        annotatedAt: 1725008100000,
      },
    ],
  },
  aam_v1_telemetry: {
    corpusObjectId: 'aam_v1_telemetry',
    corpusName: 'AAM-V1 Runtime Telemetry',
    version: '1.0-FROZEN',
    checksum: 'gs-sha256-aam-77c88aa31',
    isLocked: true,
    lockedAt: 1725010000000,
    entries: [
      {
        id: 'gs_aam_1',
        corpusObjectId: 'aam_v1_telemetry',
        knownItem: 'Streaming buffer drops events under backpressure if buffer limit exceeds 10,000 items',
        taxonomy: 'CONCURRENCY_HAZARD',
        expectedClassification: 'TRUE_ERROR',
        evidenceSource: 'src/streaming/buffer.ts:40-65',
        annotatorProvenance: 'Telemetry Audit Board',
        annotatedAt: 1725009000000,
      },
    ],
  },
};

export class GoldStandardManager {
  private static store: Record<string, GoldStandardCorpus> = { ...INITIAL_GOLD_STANDARDS };

  public static getGoldStandard(corpusObjectId: string): GoldStandardCorpus | null {
    const gs = this.store[corpusObjectId];
    if (!gs) return null;
    // Return deep copy to guarantee immutability from outside mutations
    return JSON.parse(JSON.stringify(gs));
  }

  public static isLocked(corpusObjectId: string): boolean {
    const gs = this.store[corpusObjectId];
    return !!gs && gs.isLocked;
  }

  public static lockGoldStandard(corpusObjectId: string): { success: boolean; message: string } {
    const gs = this.store[corpusObjectId];
    if (!gs) {
      return { success: false, message: `Gold standard not found for ${corpusObjectId}` };
    }
    if (gs.isLocked) {
      return { success: true, message: `Gold standard is already locked with hash ${gs.checksum}` };
    }
    gs.isLocked = true;
    gs.lockedAt = Date.now();
    return { success: true, message: `Gold standard permanently locked with fingerprint ${gs.checksum}` };
  }

  public static addEntry(
    corpusObjectId: string,
    entry: Omit<GoldStandardEntry, 'id' | 'annotatedAt'>
  ): { success: boolean; message: string } {
    const gs = this.store[corpusObjectId];
    if (!gs) {
      return { success: false, message: `Gold standard not found for ${corpusObjectId}` };
    }
    if (gs.isLocked) {
      return {
        success: false,
        message: 'Epistemic Guard Blocked: Cannot modify a LOCKED Gold Standard. Pre-analysis lock is permanent.',
      };
    }
    const newEntry: GoldStandardEntry = {
      ...entry,
      id: `gs_${corpusObjectId}_${Date.now()}`,
      annotatedAt: Date.now(),
    };
    gs.entries.push(newEntry);
    return { success: true, message: `Added gold standard entry ${newEntry.id}` };
  }
}
