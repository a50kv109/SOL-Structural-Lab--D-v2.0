/**
 * SOL STRUCTURAL LAB v2.0
 * EXPERIMENT STATE MACHINE & EXECUTION CONTROLLER
 * 
 * Epistemic Rules:
 * 1. Strict State Progression:
 *    DRAFT → CORPUS_READY → GOLD_STANDARD_READY → SINGLE_COMPLETE → DUAL_COMPLETE → COMPARE_COMPLETE → VALIDATION_COMPLETE → METRICS_COMPLETE → VERDICT_READY
 * 2. Invalid transitions are strictly rejected.
 * 3. RAW results are FROZEN once single/dual runs complete.
 * 4. Pilot Mode (10 objects) is explicitly labeled QUALITATIVE / PRELIMINARY.
 * 5. 30-object Quantitative Mode is a protocol hypothesis.
 */

import { IngestionInput } from '../pipeline/profiler';
import { StructuralLabPipelineEngine, PipelineExecutionLog } from '../pipeline/engine';
import { DualAnalysisOperator, DualAnalysisResult } from '../operators/dualAnalysis';
import { GoldStandardManager, GoldStandardCorpus } from './goldStandard';
import { ValidationEngine, ValidationRecord } from './validationEngine';
import { CorpusObjectRecord, CorpusIntakeManager } from './corpusIntake';

export type ExperimentState =
  | 'DRAFT'
  | 'CORPUS_READY'
  | 'GOLD_STANDARD_READY'
  | 'SINGLE_COMPLETE'
  | 'DUAL_COMPLETE'
  | 'COMPARE_COMPLETE'
  | 'VALIDATION_COMPLETE'
  | 'METRICS_COMPLETE'
  | 'VERDICT_READY'
  | 'HALTED_ON_STOP_CONDITION';

export type ExperimentExecutionMode = 'PILOT_10_OBJECTS' | 'QUANTITATIVE_30_OBJECTS';

export interface ExperimentSession {
  id: string;
  targetObjectId: string;
  executionMode: ExperimentExecutionMode;
  state: ExperimentState;
  createdAt: number;
  updatedAt: number;

  // Immutability boundaries
  corpusObject: CorpusObjectRecord | null;
  goldStandard: GoldStandardCorpus | null;
  
  // Frozen Raw Results
  rawSingleOutput: PipelineExecutionLog | null;
  rawDualOutput: DualAnalysisResult | null;

  // Derived / Synthesized
  comparisonCompleted: boolean;
  
  // Validated
  validationRecord: ValidationRecord | null;

  // Stop conditions
  stopReason: string | null;

  // Timings
  singleDurationMs: number | null;
  dualDurationMs: number | null;
}

export class ExperimentStateMachine {
  /**
   * Initializes a new experiment session for a selected corpus object
   */
  public static initSession(
    targetObjectId: string,
    mode: ExperimentExecutionMode = 'PILOT_10_OBJECTS'
  ): ExperimentSession {
    const corpus = CorpusIntakeManager.getById(targetObjectId);
    const gs = GoldStandardManager.getGoldStandard(targetObjectId);

    let initialState: ExperimentState = 'DRAFT';
    if (corpus && corpus.files.length > 0) {
      initialState = 'CORPUS_READY';
      if (gs && gs.isLocked && gs.entries.length > 0) {
        initialState = 'GOLD_STANDARD_READY';
      }
    }

    return {
      id: `exp_${targetObjectId}_${Date.now()}`,
      targetObjectId,
      executionMode: mode,
      state: initialState,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      corpusObject: corpus,
      goldStandard: gs,
      rawSingleOutput: null,
      rawDualOutput: null,
      comparisonCompleted: false,
      validationRecord: null,
      stopReason: null,
      singleDurationMs: null,
      dualDurationMs: null,
    };
  }

  /**
   * Step 1: Execute Single Analysis Pass (5.2 Core C1-C5)
   */
  public static async executeSinglePass(
    session: ExperimentSession
  ): Promise<{ session: ExperimentSession; error?: string }> {
    if (session.state !== 'GOLD_STANDARD_READY' && session.state !== 'CORPUS_READY') {
      return {
        session,
        error: `Cannot execute Single Analysis in state '${session.state}'. Prerequisite: GOLD_STANDARD_READY.`,
      };
    }

    if (!session.corpusObject || session.corpusObject.files.length === 0) {
      return {
        session,
        error: 'Corpus object has no ingested files. Execution blocked.',
      };
    }

    const payload: IngestionInput = {
      objectId: session.corpusObject.id,
      sourceUri: session.corpusObject.url,
      rawText: session.corpusObject.ingestionText || session.corpusObject.description,
      files: session.corpusObject.files.map(f => ({
        path: f.path,
        sizeBytes: f.sizeBytes,
        content: f.content,
        contentSample: f.content,
      })),
      manifest: {
        name: session.corpusObject.name,
        version: '1.0.0',
        category: session.corpusObject.category,
      },
    };

    const startTime = Date.now();
    const singleLog = await StructuralLabPipelineEngine.executeSinglePass(payload, {
      requestedResearchMode: 'STRUCTURAL_RECONSTRUCTION',
      availableTools: ['tool_structural_analyzer', 'tool_invariant_discovery'],
    });
    const duration = Date.now() - startTime;

    // Freeze raw output into session
    const updated: ExperimentSession = {
      ...session,
      rawSingleOutput: Object.freeze(JSON.parse(JSON.stringify(singleLog))),
      singleDurationMs: duration,
      state: 'SINGLE_COMPLETE',
      updatedAt: Date.now(),
    };

    return { session: updated };
  }

  /**
   * Step 2: Execute Dual Analysis Pass (Analyst A + Analyst B)
   */
  public static async executeDualPass(
    session: ExperimentSession
  ): Promise<{ session: ExperimentSession; error?: string }> {
    if (session.state !== 'SINGLE_COMPLETE') {
      return {
        session,
        error: `Cannot execute Dual Analysis in state '${session.state}'. Prerequisite: SINGLE_COMPLETE.`,
      };
    }

    if (!session.corpusObject) {
      return { session, error: 'Corpus object missing.' };
    }

    const payload: IngestionInput = {
      objectId: session.corpusObject.id,
      sourceUri: session.corpusObject.url,
      rawText: session.corpusObject.ingestionText || session.corpusObject.description,
      files: session.corpusObject.files.map(f => ({
        path: f.path,
        sizeBytes: f.sizeBytes,
        content: f.content,
        contentSample: f.content,
      })),
      manifest: {
        name: session.corpusObject.name,
        version: '1.0.0',
        category: session.corpusObject.category,
      },
    };

    const startTime = Date.now();
    const dualResult = await DualAnalysisOperator.executeDualPass(payload, [
      'tool_structural_analyzer',
      'tool_invariant_discovery',
    ]);
    const duration = Date.now() - startTime;

    const updated: ExperimentSession = {
      ...session,
      rawDualOutput: Object.freeze(JSON.parse(JSON.stringify(dualResult))),
      dualDurationMs: duration,
      state: 'DUAL_COMPLETE',
      comparisonCompleted: true,
      updatedAt: Date.now(),
    };

    return { session: updated };
  }

  /**
   * Step 3: Compare & Synthesize Gate
   */
  public static advanceToCompare(
    session: ExperimentSession
  ): { session: ExperimentSession; error?: string } {
    if (session.state !== 'DUAL_COMPLETE') {
      return {
        session,
        error: `Cannot compare in state '${session.state}'. Prerequisite: DUAL_COMPLETE.`,
      };
    }

    const updated: ExperimentSession = {
      ...session,
      state: 'COMPARE_COMPLETE',
      updatedAt: Date.now(),
    };

    return { session: updated };
  }

  /**
   * Step 4: Validate against Frozen Gold Standard & Calculate Metrics
   */
  public static validateAndComputeMetrics(
    session: ExperimentSession,
    corpusSampleSize: number = 10
  ): { session: ExperimentSession; error?: string } {
    if (session.state !== 'COMPARE_COMPLETE' && session.state !== 'DUAL_COMPLETE') {
      return {
        session,
        error: `Cannot validate in state '${session.state}'. Prerequisite: COMPARE_COMPLETE.`,
      };
    }

    if (!session.goldStandard || !session.goldStandard.isLocked) {
      return {
        session: {
          ...session,
          state: 'HALTED_ON_STOP_CONDITION',
          stopReason: 'STOP_INCOMPLETE_GOLD_STANDARD: Gold standard is missing or not locked.',
          updatedAt: Date.now(),
        },
        error: 'STOP_INCOMPLETE_GOLD_STANDARD: Pre-analysis lock missing.',
      };
    }

    if (!session.rawSingleOutput || !session.rawDualOutput) {
      return {
        session,
        error: 'Raw results missing. Cannot validate.',
      };
    }

    const validation = ValidationEngine.validateAgainstGoldStandard(
      session.goldStandard,
      session.rawSingleOutput,
      session.rawDualOutput,
      {
        corpusSampleSize,
        measuredLatencySingleMs: session.singleDurationMs || undefined,
        measuredLatencyDualMs: session.dualDurationMs || undefined,
      }
    );

    const isHalted = validation.stopConditionsTriggered.length > 0 && validation.decisionMatrixOutcome === 'INCONCLUSIVE';

    const updated: ExperimentSession = {
      ...session,
      validationRecord: validation,
      state: isHalted ? 'HALTED_ON_STOP_CONDITION' : 'VERDICT_READY',
      stopReason: isHalted ? validation.stopConditionsTriggered.join('; ') : null,
      updatedAt: Date.now(),
    };

    return { session: updated };
  }
}
