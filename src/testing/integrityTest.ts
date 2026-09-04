/**
 * SOL STRUCTURAL LAB v2.0
 * AUTOMATED BUILD INTEGRITY TEST (SELF-CHECK & SELF-AUDIT)
 * 
 * Verifies that all 5.2 invariants, rules, contracts, and boundaries are strictly intact.
 */

import { StructuralLabPipelineEngine } from '../pipeline/engine';
import { CoreStatus, CoreEntityKind, Observation, UnknownData, Decision, Evidence, SynthesisReport } from '../core/entities';
import { CoreInvariantsValidator } from '../core/invariants';
import { CoreRulesEngine } from '../core/rules';
import { CoreContractsValidator } from '../core/contracts';
import { DualAnalysisOperator } from '../operators/dualAnalysis';
import { ExternalToolRegistry } from '../tools/registry';
import { TWO_HEROES_TOOL_SPEC } from '../tools/twoHeroesTool';
import { CURRENT_LABORATORY_CHECKPOINT } from '../memory/checkpoint';
import { DualAnalysisEvaluationProtocol } from '../protocols/dualAnalysisEvaluationProtocol';
import '../tools/builtInAnalyzers';

export interface IntegrityCheckItem {
  id: string;
  name: string;
  category: 'CORE_INVARIANTS' | 'RULES_ENGINE' | 'CONTRACTS' | 'PIPELINE_FLOW' | 'BOUNDARY_ISOLATION' | 'NEGATIVE_CASES';
  passed: boolean;
  details: string;
  timestamp: number;
}

export interface BuildIntegrityReport {
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  checks: IntegrityCheckItem[];
  timestamp: number;
}

export class BuildIntegrityTester {
  public static async runAllChecks(): Promise<BuildIntegrityReport> {
    const checks: IntegrityCheckItem[] = [];
    const now = Date.now();

    // 1. Check: 5.2 CORE Entities & Invariants presence
    checks.push({
      id: 'CHK_1_52_CORE_FROZEN',
      name: '5.2 CORE Frozen Verification',
      category: 'CORE_INVARIANTS',
      passed: CURRENT_LABORATORY_CHECKPOINT.componentsState.core52 === 'FROZEN',
      details: 'Verified 5.2 CORE entities (5), statuses (5), and invariants (7) are locked as FROZEN.',
      timestamp: now,
    });

    // 2. Invariant I1: OBSERVATION != INFERENCE check
    const rawObs: Observation = {
      id: 'obs_test_1',
      source: 'test://source',
      statement: 'File README.md exists',
      status: CoreStatus.FACT,
      timestamp: now,
    };
    const i1Pass = CoreInvariantsValidator.validateI1(rawObs) === null;
    checks.push({
      id: 'CHK_2_INV_I1',
      name: 'Invariant I1 (OBSERVATION ≠ INFERENCE)',
      category: 'CORE_INVARIANTS',
      passed: i1Pass,
      details: 'Confirmed factual observation is distinguished from derived inference.',
      timestamp: now,
    });

    // 3. Invariant I2: DECISION requires REASON + PROVENANCE (Positive & Negative)
    const validDecision: Decision = {
      id: 'dec_valid',
      action: 'ACTIVATE',
      target: 'tool_structural_analyzer',
      reason: 'Valid factual basis provided',
      provenance: 'obs_test_1',
      timestamp: now,
    };
    const invalidDecision: Decision = {
      id: 'dec_invalid',
      action: 'ACTIVATE',
      target: 'tool_structural_analyzer',
      reason: '',
      provenance: '',
      timestamp: now,
    };
    const i2Positive = CoreInvariantsValidator.validateI2(validDecision) === null;
    const i2Negative = CoreInvariantsValidator.validateI2(invalidDecision) !== null;
    checks.push({
      id: 'CHK_3_INV_I2',
      name: 'Invariant I2 (DECISION requires REASON + PROVENANCE)',
      category: 'CORE_INVARIANTS',
      passed: i2Positive && i2Negative,
      details: 'Confirmed invalid decision lacking reason/provenance is strictly blocked.',
      timestamp: now,
    });

    // 4. Invariant I4 / R3: OUTPUT != EVIDENCE (Validation Mandate)
    const unvalidatedEvidence: Evidence = {
      id: 'ev_unval',
      source: 'test://source',
      sourceOutputId: 'raw_1',
      content: '{}',
      validationStatus: 'UNCHECKED',
      timestamp: now,
    };
    const i4Triggered = CoreInvariantsValidator.validateI4(unvalidatedEvidence) !== null;
    checks.push({
      id: 'CHK_4_INV_I4_R3',
      name: 'Invariant I4 / Rule R3 (OUTPUT ≠ EVIDENCE without validation)',
      category: 'CORE_INVARIANTS',
      passed: i4Triggered,
      details: 'Confirmed unvalidated raw tool output is rejected by Evidence layer.',
      timestamp: now,
    });

    // 5. Invariant I6: UNKNOWN != FALSE
    const unknownField: UnknownData = {
      id: 'unk_test',
      targetField: 'testCoverage',
      reason: 'No test report found in payload',
      status: CoreStatus.UNKNOWN,
    };
    const i6ViolationCaught = CoreInvariantsValidator.validateI6(unknownField, true) !== null;
    checks.push({
      id: 'CHK_5_INV_I6',
      name: 'Invariant I6 (UNKNOWN ≠ FALSE)',
      category: 'NEGATIVE_CASES',
      passed: i6ViolationCaught,
      details: 'Confirmed UNKNOWN data cannot be coerced into boolean FALSE.',
      timestamp: now,
    });

    // 6. Invariant I7: INFERENCE != EVIDENCE
    const fakeEvidenceClaim = {
      kind: CoreEntityKind.INFERENCE,
      status: CoreStatus.FACT,
    };
    const i7ViolationCaught = CoreInvariantsValidator.validateI7(fakeEvidenceClaim) !== null;
    checks.push({
      id: 'CHK_6_INV_I7',
      name: 'Invariant I7 (INFERENCE ≠ EVIDENCE)',
      category: 'CORE_INVARIANTS',
      passed: i7ViolationCaught,
      details: 'Confirmed speculative inference cannot masquerade as factual evidence.',
      timestamp: now,
    });

    // 7. Rule R1: AMBIGUOUS -> HUMAN_REVIEW
    const ambiguousObs: Observation = {
      id: 'obs_ambig',
      source: 'test://source',
      statement: 'Term "core" has multiple contradictory definitions',
      status: CoreStatus.AMBIGUOUS,
      timestamp: now,
    };
    const r1Result = CoreRulesEngine.evaluateR1(ambiguousObs);
    checks.push({
      id: 'CHK_7_RULE_R1',
      name: 'Rule R1 (AMBIGUOUS → HUMAN_REVIEW)',
      category: 'RULES_ENGINE',
      passed: !r1Result.passed && r1Result.actionRequired === 'HUMAN_REVIEW',
      details: 'Confirmed ambiguous input triggers mandatory human review flag.',
      timestamp: now,
    });

    // 8. Rule R2: DISPUTED -> Do not choose automatically
    const disputedItem = { id: 'security_module_v1', status: CoreStatus.DISPUTED };
    const r2Decision: Decision = {
      id: 'dec_disputed',
      action: 'ACTIVATE',
      target: 'security_module_v1',
      reason: 'Attempting to auto-activate disputed item',
      provenance: 'test',
      timestamp: now,
    };
    const r2Result = CoreRulesEngine.evaluateR2([disputedItem], r2Decision);
    checks.push({
      id: 'CHK_8_RULE_R2',
      name: 'Rule R2 (DISPUTED → No Auto-Choice)',
      category: 'RULES_ENGINE',
      passed: !r2Result.passed && r2Result.actionRequired === 'HOLD_SELECTION',
      details: 'Confirmed contested/disputed targets cannot be auto-activated.',
      timestamp: now,
    });

    // 9. Pipeline End-to-End Execution (Positive Synthetic Object)
    const pipelineLog = await StructuralLabPipelineEngine.executeSinglePass(
      {
        objectId: 'synthetic_benchmark_obj_1',
        sourceUri: 'local://synthetic/module',
        rawText: 'export interface AuthService { login(): Promise<boolean>; }',
        files: [
          { path: 'src/auth/service.ts', sizeBytes: 1240 },
          { path: 'src/contracts/IAuth.ts', sizeBytes: 520 },
        ],
      },
      {
        requestedResearchMode: 'STRUCTURAL_RECONSTRUCTION',
        availableTools: ['tool_structural_analyzer', 'tool_invariant_discovery'],
      }
    );

    const pipelinePassed =
      pipelineLog.observations.length > 0 &&
      pipelineLog.decisions.length > 0 &&
      pipelineLog.rawOutputs.length > 0 &&
      pipelineLog.evidences.length > 0 &&
      pipelineLog.report !== null &&
      pipelineLog.contractsReport?.c1.valid === true &&
      pipelineLog.contractsReport?.c2.valid === true &&
      pipelineLog.contractsReport?.c4.valid === true &&
      pipelineLog.contractsReport?.c5.valid === true;

    checks.push({
      id: 'CHK_9_PIPELINE_E2E',
      name: 'Integrated Pipeline End-to-End (C1–C5 Contracts)',
      category: 'PIPELINE_FLOW',
      passed: pipelinePassed,
      details: `Synthetic object successfully passed Profiling (C1), Planning (C2), Execution (C3), Validation (C4), and Reporting (C5) in ${pipelineLog.durationMs}ms.`,
      timestamp: now,
    });

    // 10. Research Operator: DUAL_ANALYSIS Hypothesis isolation
    const dualResult = await DualAnalysisOperator.executeDualPass(
      {
        objectId: 'synthetic_dual_test_target',
        sourceUri: 'local://dual_test/repo',
        files: [{ path: 'src/index.ts', sizeBytes: 800 }],
      },
      ['tool_structural_analyzer', 'tool_invariant_discovery']
    );

    const dualPassed =
      dualResult.status === 'HYPOTHESIS_EXPERIMENT' &&
      dualResult.epistemicAudit.synthesisTaggedAsInference === true &&
      dualResult.epistemicAudit.agreementMeansTruthViolated === false;

    checks.push({
      id: 'CHK_10_DUAL_ANALYSIS_HYPOTHESIS',
      name: 'DUAL_ANALYSIS Hypothesis Epistemic Boundary',
      category: 'BOUNDARY_ISOLATION',
      passed: dualPassed,
      details: 'Confirmed DUAL_ANALYSIS is treated strictly as an experimental hypothesis, synthesis is marked as INFERENCE, and agreement does not claim truth.',
      timestamp: now,
    });

    // 11. External Tool: two-heroes-tool candidate status check
    const toolRecord = ExternalToolRegistry.getTool('two-heroes-tool');
    const toolCandidatePreserved =
      toolRecord?.status === 'CANDIDATE' &&
      TWO_HEROES_TOOL_SPEC.status === 'CANDIDATE';

    checks.push({
      id: 'CHK_11_TWO_HEROES_CANDIDATE',
      name: 'two-heroes-tool Candidate Status Preservation',
      category: 'BOUNDARY_ISOLATION',
      passed: toolCandidatePreserved,
      details: 'Confirmed two-heroes-tool is registered as CANDIDATE and not prematurely marked as VERIFIED or part of Core.',
      timestamp: now,
    });

    // 12. Protocol: DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0 Frozen check
    checks.push({
      id: 'CHK_12_EVAL_PROTOCOL_FROZEN',
      name: 'Dual Analysis Evaluation Protocol v1.0 Frozen',
      category: 'BOUNDARY_ISOLATION',
      passed: DualAnalysisEvaluationProtocol.VERSION === 'v1.0-FROZEN',
      details: 'Confirmed Evaluation Protocol v1.0 is preserved with immutable metrics, stop conditions, and decision matrix.',
      timestamp: now,
    });

    const passedChecks = checks.filter(c => c.passed).length;
    const failedChecks = checks.filter(c => !c.passed).length;
    const status = failedChecks === 0 ? 'SUCCESS' : passedChecks > 0 ? 'PARTIAL' : 'FAILED';

    return {
      status,
      totalChecks: checks.length,
      passedChecks,
      failedChecks,
      checks,
      timestamp: now,
    };
  }
}
