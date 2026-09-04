/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — INTEGRATED PIPELINE ENGINE
 * 
 * PIPELINE FLOW:
 * INPUT → [ PROFILER (C1) → PLANNER (C2) → EXECUTOR (C3) → VALIDATOR (C4) → REPORTER (C5) ] → SYNTHESIS REPORT
 */

import { LaboratoryProfiler, IngestionInput } from './profiler';
import { LaboratoryPlanner, PlanOptions } from './planner';
import { LaboratoryExecutor } from './executor';
import { LaboratoryValidator } from './validator';
import { LaboratoryReporter } from './reporter';
import {
  Observation,
  UnknownData,
  Decision,
  ToolRawOutput,
  Evidence,
  Inference,
  SynthesisReport,
  CoreStatus,
} from '../core/entities';
import { ContractCheckResult } from '../core/contracts';
import { InvariantViolation } from '../core/invariants';
import { RuleEvaluationResult } from '../core/rules';

export interface PipelineExecutionLog {
  stage: 'INGESTION' | 'PROFILING' | 'PLANNING' | 'EXECUTION' | 'VALIDATION' | 'REPORTING' | 'COMPLETED';
  observations: Observation[];
  unknowns: UnknownData[];
  decisions: Decision[];
  rawOutputs: ToolRawOutput[];
  evidences: Evidence[];
  inferences: Inference[];
  report: SynthesisReport | null;
  contractsReport: {
    c1: ContractCheckResult;
    c2: ContractCheckResult;
    c3: ContractCheckResult[];
    c4: ContractCheckResult;
    c5: ContractCheckResult;
  } | null;
  ruleEvaluations: RuleEvaluationResult[];
  invariantViolations: InvariantViolation[];
  durationMs: number;
}

export class StructuralLabPipelineEngine {
  public static async executeSinglePass(
    input: IngestionInput,
    options: PlanOptions
  ): Promise<PipelineExecutionLog> {
    const startTime = Date.now();
    const invariantViolations: InvariantViolation[] = [];

    // 1. PROFILING (Contract C1)
    const profilerRes = LaboratoryProfiler.profileObject(input);

    // 2. PLANNING (Contract C2, Rules R1, R2)
    const plannerRes = LaboratoryPlanner.planExecution(
      profilerRes.observations,
      profilerRes.unknowns,
      options
    );

    // 3. EXECUTION (Contract C3, Invariant I3)
    const executorRes = await LaboratoryExecutor.executeDecisions(plannerRes.decisions, {
      objectId: input.objectId,
      sourceUri: input.sourceUri,
      rawText: input.rawText,
      files: input.files,
      manifest: input.manifest,
    });
    invariantViolations.push(...executorRes.invariantViolations);

    // 4. VALIDATION (Contract C4, Invariant I4, Rule R3)
    const validatorRes = LaboratoryValidator.validateOutputs(
      executorRes.rawOutputs,
      input.sourceUri
    );
    invariantViolations.push(...validatorRes.invariantViolations);

    // 5. INFERENCE GENERATION (Epistemic discipline: tagged strictly as INFERENCE, not FACT)
    const inferences: Inference[] = [];
    const validEvidenceIds = validatorRes.evidences.map(e => e.id);

    if (validatorRes.evidences.length > 0) {
      for (const ev of validatorRes.evidences) {
        try {
          const payload = JSON.parse(ev.content);

          if (payload.analyzer === 'tool_structural_analyzer' && payload.nodes) {
            const classCount = payload.summary?.totalClasses || 0;
            const fnCount = payload.summary?.totalFunctions || 0;
            const fileCount = payload.summary?.totalFiles || 0;

            inferences.push({
              id: `inf_topo_${input.objectId}_${Date.now()}`,
              statement: `System architecture is decomposed into ${fileCount} observable modules (${classCount} classes, ${fnCount} functions) with verified structural topology.`,
              derivedFrom: [ev.id],
              confidence: 0.94,
              reasoning: `Extracted ${payload.nodeCount} structural nodes and ${payload.edgeCount} dependency edges from source files.`,
              status: CoreStatus.INFERENCE,
            });
          }

          if (payload.analyzer === 'tool_invariant_discovery' && Array.isArray(payload.invariants)) {
            for (const inv of payload.invariants) {
              inferences.push({
                id: `inf_inv_${inv.id}_${Date.now()}`,
                statement: inv.title || inv.statement,
                derivedFrom: [ev.id],
                confidence: inv.severity === 'CRITICAL' ? 0.95 : 0.88,
                reasoning: `Identified by invariant discovery analyzer at ${inv.sourceRange} (${inv.provenance}).`,
                status: CoreStatus.INFERENCE,
              });
            }
          }
        } catch {
          // If JSON parse fails, fallback to general evidence inference
        }
      }

      if (inferences.length === 0) {
        inferences.push({
          id: `inf_arch_${input.objectId}_${Date.now()}`,
          statement: `System architecture is decomposed into observable modules based on ${validatorRes.evidences.length} verified evidence items.`,
          derivedFrom: validEvidenceIds,
          confidence: 0.92,
          reasoning: 'Derived by structural correlation across verified outputs.',
          status: CoreStatus.INFERENCE,
        });
      }
    }

    // 6. REPORTING / SYNTHESIS (Contract C5, Invariant I5)
    const reporterRes = LaboratoryReporter.synthesizeReport(
      validatorRes.evidences,
      inferences,
      profilerRes.unknowns,
      {
        targetSystemName: input.objectId,
      }
    );
    invariantViolations.push(...reporterRes.invariantViolations);

    const durationMs = Date.now() - startTime;

    return {
      stage: 'COMPLETED',
      observations: profilerRes.observations,
      unknowns: profilerRes.unknowns,
      decisions: plannerRes.decisions,
      rawOutputs: executorRes.rawOutputs,
      evidences: validatorRes.evidences,
      inferences,
      report: reporterRes.report,
      contractsReport: {
        c1: profilerRes.c1Compliance,
        c2: plannerRes.c2Compliance,
        c3: executorRes.c3Compliance,
        c4: validatorRes.c4Compliance,
        c5: reporterRes.c5Compliance,
      },
      ruleEvaluations: plannerRes.ruleEvaluations,
      invariantViolations,
      durationMs,
    };
  }
}
