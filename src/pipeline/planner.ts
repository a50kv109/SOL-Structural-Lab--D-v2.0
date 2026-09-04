/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — PIPELINE MODULE 2
 * 
 * RESPONSIBILITY: PLANNING & TOOL SELECTION
 * CONTRACT: C2 (DECISION CONTRACT)
 * INPUT: Observation[], UnknownData[]
 * OUTPUT: Decision[]
 * MUST: Explicit REASON + PROVENANCE for every decision
 * MUST NOT: Action selection without grounding, ignoring R1 (Ambiguity) or R2 (Disputed)
 */

import { Observation, UnknownData, Decision, CoreStatus } from '../core/entities';
import { CoreContractsValidator } from '../core/contracts';
import { CoreRulesEngine, RuleEvaluationResult } from '../core/rules';

export interface PlanOptions {
  requestedResearchMode: string;
  availableTools: string[];
  focusArea?: string;
  strategy?: string;
}

export class LaboratoryPlanner {
  public static planExecution(
    observations: Observation[],
    unknowns: UnknownData[],
    options: PlanOptions
  ): {
    decisions: Decision[];
    ruleEvaluations: RuleEvaluationResult[];
    c2Compliance: ReturnType<typeof CoreContractsValidator.verifyC2>;
  } {
    const decisions: Decision[] = [];
    const ruleEvaluations: RuleEvaluationResult[] = [];
    const now = Date.now();

    // 1. Check for Ambiguities across all observations (R1)
    for (const obs of observations) {
      const r1Res = CoreRulesEngine.evaluateR1(obs);
      if (!r1Res.passed) {
        ruleEvaluations.push(r1Res);
        decisions.push({
          id: `dec_review_${obs.id}`,
          action: 'REVIEW',
          target: obs.id,
          reason: `R1 triggered due to ambiguous observation: ${obs.statement}`,
          provenance: obs.id,
          timestamp: now,
        });
      }
    }

    // 2. Formulate tool decisions based on valid factual observations
    const factObs = observations.filter(o => o.status === CoreStatus.FACT);

    if (factObs.length > 0) {
      // Primary Structural Reconstruction Decision
      const primaryObs = factObs[0];
      decisions.push({
        id: `dec_activate_structural_analyzer_${primaryObs.id}`,
        action: 'ACTIVATE',
        target: 'tool_structural_analyzer',
        reason: `Target artifact verified with ${factObs.length} factual observations for mode [${options.requestedResearchMode}].`,
        provenance: `obs_provenance_${primaryObs.id}`,
        timestamp: now,
      });

      // Invariant Discovery Tool Decision
      if (options.availableTools.includes('tool_invariant_discovery')) {
        decisions.push({
          id: `dec_activate_invariants_${primaryObs.id}`,
          action: 'ACTIVATE',
          target: 'tool_invariant_discovery',
          reason: `Factual filesystem or text evidence exists to search for structural invariants.`,
          provenance: primaryObs.id,
          timestamp: now,
        });
      }
    } else {
      // No facts observed -> cannot safely activate
      decisions.push({
        id: `dec_block_no_facts`,
        action: 'BLOCK',
        target: 'all_tools',
        reason: 'Zero factual observations available from ingestion. Tool activation blocked.',
        provenance: unknowns.map(u => u.id).join(';') || 'empty_input',
        timestamp: now,
      });
    }

    // 3. Check for Disputed targets (R2 check)
    for (const dec of decisions) {
      const r2Res = CoreRulesEngine.evaluateR2([], dec);
      if (!r2Res.passed) {
        ruleEvaluations.push(r2Res);
      }
    }

    // 4. Validate C2 contract compliance
    const c2Compliance = CoreContractsValidator.verifyC2(decisions);

    return {
      decisions,
      ruleEvaluations,
      c2Compliance,
    };
  }
}
