/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — PIPELINE MODULE 4 (PART B)
 * 
 * RESPONSIBILITY: REPORTING / SYNTHESIS
 * CONTRACT: C5 (REPORT CONTRACT)
 * INPUT: Evidence[], Inference[], UnknownData[]
 * OUTPUT: SynthesisReport
 * MUST: Formal synthesis with epistemic discipline preservation
 * MUST NOT: Evidence = Report without synthesis; Inferences masquerading as Evidence (I5, I7)
 */

import { Evidence, Inference, UnknownData, SynthesisReport } from '../core/entities';
import { CoreContractsValidator, ContractCheckResult } from '../core/contracts';
import { CoreInvariantsValidator, InvariantViolation } from '../core/invariants';

export interface ReportOptions {
  title?: string;
  targetSystemName: string;
}

export class LaboratoryReporter {
  public static synthesizeReport(
    evidences: Evidence[],
    inferences: Inference[],
    unknowns: UnknownData[],
    options: ReportOptions
  ): {
    report: SynthesisReport;
    c5Compliance: ContractCheckResult;
    invariantViolations: InvariantViolation[];
  } {
    const invariantViolations: InvariantViolation[] = [];
    const now = Date.now();
    const epistemicWarnings: string[] = [];

    // Check invariants I7: Inferences cannot be treated as factual evidence
    for (const inf of inferences) {
      const i7Violation = CoreInvariantsValidator.validateI7(inf as any);
      if (i7Violation) invariantViolations.push(i7Violation);
    }

    // Record warnings for UNKNOWN handling
    if (unknowns.length > 0) {
      epistemicWarnings.push(
        `Preserved ${unknowns.length} UNKNOWN fields strictly without assuming falsehood (I6 compliance).`
      );
    }

    // Synthesis summary calculation
    const summary = `Laboratory 5.2 synthesis for [${options.targetSystemName}]: processed ${evidences.length} validated evidence items, ${inferences.length} analytical inferences, and ${unknowns.length} explicit UNKNOWN boundaries.`;

    const report: SynthesisReport = {
      id: `report_${Date.now()}`,
      title: options.title || `Research Synthesis Report — ${options.targetSystemName}`,
      summary,
      evidences,
      inferences,
      unknowns,
      epistemicWarnings,
      generatedAt: now,
    };

    // Check invariant I5
    const i5Violation = CoreInvariantsValidator.validateI5(report);
    if (i5Violation) invariantViolations.push(i5Violation);

    // Check contract C5
    const c5Compliance = CoreContractsValidator.verifyC5(report);

    return {
      report,
      c5Compliance,
      invariantViolations,
    };
  }
}
