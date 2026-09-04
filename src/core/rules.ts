/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 CORE — FROZEN
 * 
 * 3 CANONICAL RULES
 * R1: AMBIGUOUS → HUMAN_REVIEW
 * R2: DISPUTED → do not choose automatically
 * R3: Tool Output → not Evidence without validation
 */

import { CoreStatus, Observation, Inference, Decision } from './entities';

export interface RuleEvaluationResult {
  ruleId: 'R1' | 'R2' | 'R3';
  passed: boolean;
  actionRequired?: 'HUMAN_REVIEW' | 'HOLD_SELECTION' | 'VALIDATE_TOOL_OUTPUT';
  message: string;
}

export class CoreRulesEngine {
  /**
   * R1: AMBIGUOUS → HUMAN_REVIEW
   */
  public static evaluateR1(item: Observation | Inference): RuleEvaluationResult {
    if (item.status === CoreStatus.AMBIGUOUS) {
      return {
        ruleId: 'R1',
        passed: false,
        actionRequired: 'HUMAN_REVIEW',
        message: `R1 Triggered: Entity '${item.id}' contains AMBIGUOUS data and requires manual human review before proceeding.`,
      };
    }
    return {
      ruleId: 'R1',
      passed: true,
      message: 'R1 OK: Entity is unambiguous.',
    };
  }

  /**
   * R2: DISPUTED → do not automatically choose
   */
  public static evaluateR2(disputedItems: Array<{ id: string; status: CoreStatus }>, candidateDecision: Decision): RuleEvaluationResult {
    const hasDisputedTarget = disputedItems.some(i => i.status === CoreStatus.DISPUTED && i.id === candidateDecision.target);
    if (hasDisputedTarget && candidateDecision.action === 'ACTIVATE') {
      return {
        ruleId: 'R2',
        passed: false,
        actionRequired: 'HOLD_SELECTION',
        message: `R2 Triggered: Target '${candidateDecision.target}' has DISPUTED claims. Automatic ACTIVATE decision is forbidden.`,
      };
    }
    return {
      ruleId: 'R2',
      passed: true,
      message: 'R2 OK: No disputed target auto-selected.',
    };
  }

  /**
   * R3: Tool Output → not Evidence without validation
   */
  public static evaluateR3(validationPerformed: boolean): RuleEvaluationResult {
    if (!validationPerformed) {
      return {
        ruleId: 'R3',
        passed: false,
        actionRequired: 'VALIDATE_TOOL_OUTPUT',
        message: 'R3 Triggered: Raw output cannot be converted to evidence without an explicit validation step.',
      };
    }
    return {
      ruleId: 'R3',
      passed: true,
      message: 'R3 OK: Tool output has been formally validated.',
    };
  }
}

export const CANONICAL_5_2_RULES = [
  { id: 'R1', name: 'AMBIGUOUS → HUMAN_REVIEW', description: 'Ambiguity halts automatic resolution and mandates expert review' },
  { id: 'R2', name: 'DISPUTED → No Auto-Choice', description: 'Contested assertions cannot be auto-selected by execution planner' },
  { id: 'R3', name: 'Tool Output → Validation Mandate', description: 'Raw tool streams require validation pass before evidence registration' },
] as const;
