/**
 * SOL STRUCTURAL LAB v2.0
 * EXPERIMENTAL PROTOCOL: DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0
 * 
 * STATUS: FROZEN EXPERIMENTAL PROTOCOL
 * Modification: FORBIDDEN
 */

export interface DualAnalysisMetrics {
  recallSingle: number;       // E_single / E_total
  recallDual: number;         // (E_both + E_dual_only) / E_total
  dualOnlyGain: number;       // Count of true errors/features caught only by Dual mode
  singleOnlyLoss: number;     // Count of true items missed in Dual but caught in Single
  detectionAdvantage: number; // Recall_DUAL - Recall_SINGLE
  falseDisputeRate: number;   // F_disputes / (F_disputes + T_disputes)
  overheadFactor: number;     // Cost_dual / Cost_single
}

export type DecisionMatrixOutcome = 'SUCCESS' | 'PARTIAL' | 'FAILURE' | 'INCONCLUSIVE';

export interface GoldStandardSpec {
  corpusId: string;
  sourceUri: string;
  groundTruthEntitiesCount: number;
  knownAnomaliesCount: number;
  injectedControlErrorsCount: number;
  verifiedByExpert: boolean;
}

export class DualAnalysisEvaluationProtocol {
  public static readonly VERSION = 'v1.0-FROZEN';

  public static readonly INDEPENDENCE_MANDATES = [
    'Analyst A must not observe outputs, inferences, or state of Analyst B.',
    'Analyst B must not observe outputs, inferences, or state of Analyst A.',
    'Zero shared cache or cross-analyst memory buffers permitted.',
    'Analyst execution contexts must employ distinct prompt instructions and decomposition strategies.',
  ] as const;

  public static readonly STOP_CONDITIONS = [
    { id: 'STOP_INDEPENDENCE_BREACH', condition: 'Violation of analyst independence', action: 'HALT — experiment invalid' },
    { id: 'STOP_INCOMPLETE_GOLD_STANDARD', condition: 'Gold Standard not fully annotated prior to trial', action: 'HALT — uncalibrated' },
    { id: 'STOP_CROSS_CONTAMINATION', condition: 'Result contamination across comparative branches', action: 'HALT — reset pipeline' },
    { id: 'STOP_INSUFFICIENT_CORPUS', condition: 'Corpus sample count < 10 repositories', action: 'HALT — underpowered sample' },
  ] as const;

  /**
   * Evaluates the Decision Matrix for Dual Analysis Evaluation Trial
   */
  public static evaluateDecisionMatrix(
    metrics: DualAnalysisMetrics,
    corpusSampleSize: number,
    goldStandardComplete: boolean
  ): {
    outcome: DecisionMatrixOutcome;
    rationale: string;
  } {
    if (corpusSampleSize < 10 || !goldStandardComplete) {
      return {
        outcome: 'INCONCLUSIVE',
        rationale: `Inconclusive trial: Corpus sample size (${corpusSampleSize}) is below required power threshold (>= 10) or Gold Standard is incomplete.`,
      };
    }

    if (metrics.detectionAdvantage > 0 && metrics.falseDisputeRate < 0.30 && metrics.overheadFactor <= 2.5) {
      return {
        outcome: 'SUCCESS',
        rationale: `SUCCESS: Dual Analysis demonstrated positive detection advantage (+${(metrics.detectionAdvantage * 100).toFixed(1)}%), low False Dispute Rate (${(metrics.falseDisputeRate * 100).toFixed(1)}% < 30%), and acceptable overhead (${metrics.overheadFactor.toFixed(2)}x <= 2.5x).`,
      };
    }

    if (
      metrics.detectionAdvantage > 0 &&
      (metrics.falseDisputeRate <= 0.50 || metrics.overheadFactor <= 3.0)
    ) {
      return {
        outcome: 'PARTIAL',
        rationale: `PARTIAL: Dual Analysis has positive detection advantage but exhibits elevated False Dispute Rate (${(metrics.falseDisputeRate * 100).toFixed(1)}%) or overhead factor (${metrics.overheadFactor.toFixed(2)}x).`,
      };
    }

    return {
      outcome: 'FAILURE',
      rationale: `FAILURE: Detection advantage is non-positive or False Dispute Rate exceeds 50%. Hypothesis rejected for general canon inclusion.`,
    };
  }
}
