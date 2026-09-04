/**
 * SOL STRUCTURAL LAB v2.0
 * VALIDATION & METRICS ENGINE
 * 
 * Implements exact evaluation logic from:
 * DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0 (FROZEN)
 * 
 * Epistemic Rules:
 * 1. Never fabricate results or cost values.
 * 2. If cost is unmeasured, report 'NOT MEASURED'.
 * 3. Validation is performed against a frozen Gold Standard.
 * 4. SYNTHESIS remains INFERENCE; never promoted to EVIDENCE.
 */

import { PipelineExecutionLog } from '../pipeline/engine';
import { DualAnalysisResult } from '../operators/dualAnalysis';
import { GoldStandardCorpus, GoldStandardEntry } from './goldStandard';
import { DualAnalysisMetrics, DecisionMatrixOutcome, DualAnalysisEvaluationProtocol } from './dualAnalysisEvaluationProtocol';

export interface GroundTruthMatch {
  goldStandardEntry: GoldStandardEntry;
  detectedInSingle: boolean;
  detectedInAnalystA: boolean;
  detectedInAnalystB: boolean;
  detectedInSynthesis: boolean;
  matchingEvidenceSnippet?: string;
}

export interface ValidationRecord {
  corpusObjectId: string;
  goldStandardChecksum: string;
  goldStandardTotalCount: number;
  matches: GroundTruthMatch[];
  
  // Counts
  eTotal: number;
  eSingle: number;
  eBoth: number;
  eDualOnly: number;
  eSingleOnly: number;
  errorsMissedByBoth: number;
  
  trueDisputesCount: number;
  falseDisputesCount: number;

  metrics: DualAnalysisMetrics & {
    overheadStatus: 'MEASURED' | 'NOT_MEASURED';
    costSingleSec?: number;
    costDualSec?: number;
  };

  decisionMatrixOutcome: DecisionMatrixOutcome;
  verdictRationale: string;
  stopConditionsTriggered: string[];
}

export class ValidationEngine {
  /**
   * Executes validation of frozen raw Single and Dual outputs against a frozen Gold Standard
   */
  public static validateAgainstGoldStandard(
    goldStandard: GoldStandardCorpus,
    singleLog: PipelineExecutionLog,
    dualResult: DualAnalysisResult,
    options: {
      corpusSampleSize?: number;
      measuredLatencySingleMs?: number;
      measuredLatencyDualMs?: number;
    } = {}
  ): ValidationRecord {
    const stopConditionsTriggered: string[] = [];

    // Check Stop Condition: Incomplete Gold Standard
    if (!goldStandard.isLocked || goldStandard.entries.length === 0) {
      stopConditionsTriggered.push('STOP_INCOMPLETE_GOLD_STANDARD: Gold standard is not locked or has 0 entries.');
    }

    const singleClaims = [
      ...singleLog.observations.map(o => o.statement.toLowerCase()),
      ...singleLog.inferences.map(i => i.statement.toLowerCase()),
      ...singleLog.evidences.map(e => e.content.toLowerCase()),
    ];

    const analystAClaims = [
      ...dualResult.analystA.executionLog.observations.map(o => o.statement.toLowerCase()),
      ...dualResult.analystA.executionLog.inferences.map(i => i.statement.toLowerCase()),
    ];

    const analystBClaims = [
      ...dualResult.analystB.executionLog.observations.map(o => o.statement.toLowerCase()),
      ...dualResult.analystB.executionLog.inferences.map(i => i.statement.toLowerCase()),
    ];

    const synthesisClaims = dualResult.synthesisInferences.map(i => i.statement.toLowerCase());

    const matches: GroundTruthMatch[] = [];
    let eSingle = 0;
    let eBoth = 0;
    let eDualOnly = 0;
    let eSingleOnly = 0;

    for (const entry of goldStandard.entries) {
      const needle = entry.knownItem.toLowerCase();
      const needleSource = entry.evidenceSource.toLowerCase();
      const keywords = needle.split(/[\s,()_.:/-]+/).filter(w => w.length >= 4);

      const checkMatch = (claims: string[]) => {
        return claims.some(c => {
          if (c.includes(needle)) return true;
          const matchedKeywords = keywords.filter(k => c.includes(k));
          if (keywords.length > 0 && matchedKeywords.length >= Math.min(2, keywords.length)) return true;
          if (needleSource && c.includes(needleSource.split(':')[0])) return true;
          return false;
        });
      };

      const inSingle = checkMatch(singleClaims);
      const inA = checkMatch(analystAClaims);
      const inB = checkMatch(analystBClaims);
      const inSynthesis = checkMatch(synthesisClaims);

      const inDual = inA || inB || inSynthesis;

      if (inSingle) eSingle++;

      if (inSingle && inDual) {
        eBoth++;
      } else if (!inSingle && inDual) {
        eDualOnly++;
      } else if (inSingle && !inDual) {
        eSingleOnly++;
      }

      matches.push({
        goldStandardEntry: entry,
        detectedInSingle: inSingle,
        detectedInAnalystA: inA,
        detectedInAnalystB: inB,
        detectedInSynthesis: inSynthesis,
        matchingEvidenceSnippet: entry.evidenceSource,
      });
    }

    const eTotal = goldStandard.entries.length || 1;
    const errorsMissedByBoth = Math.max(0, eTotal - (eBoth + eDualOnly + eSingleOnly));

    // Calculate frozen metrics
    const recallSingle = eSingle / eTotal;
    const recallDual = (eBoth + eDualOnly) / eTotal;
    const dualOnlyGain = eDualOnly;
    const singleOnlyLoss = Math.max(0, eSingleOnly - eBoth);
    const detectionAdvantage = recallDual - recallSingle;

    // False dispute rate calculation:
    // A dispute is True if it accurately reflected divergent ground-truth perspectives,
    // False if it was spurious noise.
    const totalDisputes = dualResult.disputedCount;
    // Ground truth disputes are those where entry was found in only one of A/B
    const trueDisputesCount = matches.filter(m => (m.detectedInAnalystA && !m.detectedInAnalystB) || (!m.detectedInAnalystA && m.detectedInAnalystB)).length;
    const falseDisputesCount = Math.max(0, totalDisputes - trueDisputesCount);
    const falseDisputeRate = totalDisputes > 0 ? falseDisputesCount / totalDisputes : 0;

    // Overhead Factor
    let overheadFactor = 2.0; // Default execution ratio (2 passes)
    let overheadStatus: 'MEASURED' | 'NOT_MEASURED' = 'NOT_MEASURED';
    let costSingleSec: number | undefined;
    let costDualSec: number | undefined;

    if (options.measuredLatencySingleMs && options.measuredLatencyDualMs && options.measuredLatencySingleMs > 0) {
      overheadFactor = options.measuredLatencyDualMs / options.measuredLatencySingleMs;
      overheadStatus = 'MEASURED';
      costSingleSec = options.measuredLatencySingleMs / 1000;
      costDualSec = options.measuredLatencyDualMs / 1000;
    }

    const metrics: DualAnalysisMetrics & {
      overheadStatus: 'MEASURED' | 'NOT_MEASURED';
      costSingleSec?: number;
      costDualSec?: number;
    } = {
      recallSingle,
      recallDual,
      dualOnlyGain,
      singleOnlyLoss,
      detectionAdvantage,
      falseDisputeRate,
      overheadFactor,
      overheadStatus,
      costSingleSec,
      costDualSec,
    };

    const corpusSize = options.corpusSampleSize || 1;
    if (corpusSize < 10) {
      stopConditionsTriggered.push(`STOP_INSUFFICIENT_CORPUS: Sample count (${corpusSize}) is below minimum target of 10 for quantitative conclusions.`);
    }

    const { outcome, rationale } = DualAnalysisEvaluationProtocol.evaluateDecisionMatrix(
      metrics,
      corpusSize,
      goldStandard.isLocked && goldStandard.entries.length > 0
    );

    return {
      corpusObjectId: goldStandard.corpusObjectId,
      goldStandardChecksum: goldStandard.checksum,
      goldStandardTotalCount: goldStandard.entries.length,
      matches,
      eTotal,
      eSingle,
      eBoth,
      eDualOnly,
      eSingleOnly,
      errorsMissedByBoth,
      trueDisputesCount,
      falseDisputesCount,
      metrics,
      decisionMatrixOutcome: outcome,
      verdictRationale: rationale,
      stopConditionsTriggered,
    };
  }
}
