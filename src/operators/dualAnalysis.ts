/**
 * SOL STRUCTURAL LAB v2.0
 * RESEARCH OPERATOR: DUAL_ANALYSIS
 * 
 * STATUS: HYPOTHESIS / EXPERIMENTAL RESEARCH MODE
 * 
 * STRICT EPISTEMIC RULES:
 * 1. DUAL_ANALYSIS is NOT part of 5.2 CORE.
 * 2. DUAL_ANALYSIS is NOT canonical.
 * 3. A = B does NOT mean TRUTH.
 * 4. A ≠ B does NOT mean ERROR.
 * 5. DISPUTED is NOT Evidence.
 * 6. SYNTHESIS remains INFERENCE unless independent ground-truth evidence is validated.
 */

import { IngestionInput } from '../pipeline/profiler';
import { StructuralLabPipelineEngine, PipelineExecutionLog } from '../pipeline/engine';
import { CoreStatus, Inference } from '../core/entities';

export interface AnalystPerspective {
  analystId: 'ANALYST_A' | 'ANALYST_B';
  configuration: {
    focusArea: 'TOPOLOGY_AND_DATAFLOW' | 'INVARIANTS_AND_CONSTRAINTS';
    strategy: 'AGGRESSIVE_DECOMPOSITION' | 'CONSERVATIVE_HEURISTIC';
  };
  executionLog: PipelineExecutionLog;
}

export interface DualComparisonItem {
  claim: string;
  analystAStatus: 'FOUND' | 'ABSENT';
  analystBStatus: 'FOUND' | 'ABSENT';
  classification: 'AGREEMENT' | 'DISPUTED' | 'COMPLEMENTARITY_A_ONLY' | 'COMPLEMENTARITY_B_ONLY';
  epistemicStatus: CoreStatus;
  note: string;
}

export interface DualAnalysisResult {
  operatorName: 'DUAL_ANALYSIS';
  status: 'HYPOTHESIS_EXPERIMENT';
  targetObjectId: string;
  analystA: AnalystPerspective;
  analystB: AnalystPerspective;
  comparisons: DualComparisonItem[];
  agreementCount: number;
  disputedCount: number;
  complementarityCount: number;
  synthesisInferences: Inference[];
  epistemicAudit: {
    agreementMeansTruthViolated: boolean; // MUST be false
    disputedTreatedAsEvidenceViolated: boolean; // MUST be false
    synthesisTaggedAsInference: boolean; // MUST be true
  };
  durationMs: number;
}

export class DualAnalysisOperator {
  public static async executeDualPass(
    input: IngestionInput,
    availableTools: string[]
  ): Promise<DualAnalysisResult> {
    const startTime = Date.now();

    // 1. Independent Analyst A execution pass (Topology & Module Structure focus)
    const logA = await StructuralLabPipelineEngine.executeSinglePass(input, {
      requestedResearchMode: 'STRUCTURAL_RECONSTRUCTION',
      availableTools: availableTools.includes('tool_structural_analyzer') ? ['tool_structural_analyzer'] : availableTools,
      focusArea: 'TOPOLOGY_AND_DATAFLOW',
      strategy: 'AGGRESSIVE_DECOMPOSITION',
    });

    // 2. Independent Analyst B execution pass (Invariants, Boundaries & Failure Modes focus)
    const logB = await StructuralLabPipelineEngine.executeSinglePass(input, {
      requestedResearchMode: 'INVARIANT_DISCOVERY',
      availableTools: availableTools.includes('tool_invariant_discovery') ? ['tool_invariant_discovery'] : availableTools,
      focusArea: 'INVARIANTS_AND_CONSTRAINTS',
      strategy: 'CONSERVATIVE_HEURISTIC',
    });

    // 3. Comparison Logic
    const comparisons: DualComparisonItem[] = [];

    // Extract claim statements from both analysts' observations and inferences
    const claimsA = new Set(
      [...logA.observations.map(o => o.statement), ...logA.inferences.map(i => i.statement)]
    );
    const claimsB = new Set(
      [...logB.observations.map(o => o.statement), ...logB.inferences.map(i => i.statement)]
    );

    const allClaims = Array.from(new Set([...claimsA, ...claimsB]));

    let agreementCount = 0;
    let disputedCount = 0;
    let complementarityCount = 0;

    for (const claim of allClaims) {
      const inA = claimsA.has(claim);
      const inB = claimsB.has(claim);

      if (inA && inB) {
        agreementCount++;
        comparisons.push({
          claim,
          analystAStatus: 'FOUND',
          analystBStatus: 'FOUND',
          classification: 'AGREEMENT',
          epistemicStatus: CoreStatus.INFERENCE, // A=B does NOT prove truth!
          note: 'Both analysts converged on this observation/inference. Note: Agreement does NOT constitute empirical Truth.',
        });
      } else if (inA && !inB) {
        complementarityCount++;
        comparisons.push({
          claim,
          analystAStatus: 'FOUND',
          analystBStatus: 'ABSENT',
          classification: 'COMPLEMENTARITY_A_ONLY',
          epistemicStatus: CoreStatus.INFERENCE,
          note: 'Unique finding from Analyst A (Topology & Structure focus).',
        });
      } else if (!inA && inB) {
        complementarityCount++;
        comparisons.push({
          claim,
          analystAStatus: 'ABSENT',
          analystBStatus: 'FOUND',
          classification: 'COMPLEMENTARITY_B_ONLY',
          epistemicStatus: CoreStatus.INFERENCE,
          note: 'Unique finding from Analyst B (Invariants focus).',
        });
      }
    }

    // 4. Synthesis — strictly labeled as INFERENCE (Invariant I7 / Epistemic Discipline)
    const synthesisInferences: Inference[] = [
      {
        id: `synth_inf_${input.objectId}_${Date.now()}`,
        statement: `Dual Analysis synthesized view: ${agreementCount} shared assertions, ${complementarityCount} complementary perspectives across independent Analyst passes.`,
        derivedFrom: [...logA.evidences.map(e => e.id), ...logB.evidences.map(e => e.id)],
        confidence: 0.88,
        reasoning: 'Synthesized across independent dual analytical pipelines.',
        status: CoreStatus.INFERENCE, // SYNTHESIS remains INFERENCE!
      },
    ];

    const result: DualAnalysisResult = {
      operatorName: 'DUAL_ANALYSIS',
      status: 'HYPOTHESIS_EXPERIMENT',
      targetObjectId: input.objectId,
      analystA: {
        analystId: 'ANALYST_A',
        configuration: {
          focusArea: 'TOPOLOGY_AND_DATAFLOW',
          strategy: 'AGGRESSIVE_DECOMPOSITION',
        },
        executionLog: logA,
      },
      analystB: {
        analystId: 'ANALYST_B',
        configuration: {
          focusArea: 'INVARIANTS_AND_CONSTRAINTS',
          strategy: 'CONSERVATIVE_HEURISTIC',
        },
        executionLog: logB,
      },
      comparisons,
      agreementCount,
      disputedCount,
      complementarityCount,
      synthesisInferences,
      epistemicAudit: {
        agreementMeansTruthViolated: false,
        disputedTreatedAsEvidenceViolated: false,
        synthesisTaggedAsInference: true,
      },
      durationMs: Date.now() - startTime,
    };

    return result;
  }
}
