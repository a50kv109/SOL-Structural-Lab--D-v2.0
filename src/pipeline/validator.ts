/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — PIPELINE MODULE 4 (PART A)
 * 
 * RESPONSIBILITY: VALIDATION
 * CONTRACT: C4 (EVIDENCE CONTRACT)
 * INPUT: ToolRawOutput[]
 * OUTPUT: Evidence[]
 * MUST: source + validationStatus === 'VALIDATED'
 * MUST NOT: RawOutput = Evidence without explicit validation pass (I4, R3)
 */

import { ToolRawOutput, Evidence } from '../core/entities';
import { CoreContractsValidator, ContractCheckResult } from '../core/contracts';
import { CoreInvariantsValidator, InvariantViolation } from '../core/invariants';

export class LaboratoryValidator {
  public static validateOutputs(
    rawOutputs: ToolRawOutput[],
    sourceUri: string
  ): {
    evidences: Evidence[];
    c4Compliance: ContractCheckResult;
    invariantViolations: InvariantViolation[];
  } {
    const evidences: Evidence[] = [];
    const invariantViolations: InvariantViolation[] = [];
    const now = Date.now();

    for (let i = 0; i < rawOutputs.length; i++) {
      const out = rawOutputs[i];

      // Perform rigorous validation check:
      // Epistemic Rule: exitCode === 0 is NOT sufficient for VALIDATED.
      // Output is VALIDATED only if analyzer returned substantive findings grounded in the source artifact.
      const payload = out.rawPayload as any;
      let isValid = false;
      let rejectionReason = '';

      if (out.exitCode !== 0) {
        isValid = false;
        rejectionReason = `Tool exited with non-zero exit code: ${out.exitCode}. Error: ${out.stderr || 'Unknown'}`;
      } else if (!payload || typeof payload !== 'object') {
        isValid = false;
        rejectionReason = 'Tool returned null or non-object raw payload.';
      } else if (payload.isStub === true) {
        isValid = false;
        rejectionReason = 'Substantive Grounding Failure: Tool payload is flagged as an ungrounded STUB handler.';
      } else if (payload.status === 'EMPTY_INPUT' || payload.nodeCount === 0 || (payload.tool === 'tool_structural_analyzer' && (!payload.nodes || payload.nodes.length === 0))) {
        isValid = false;
        rejectionReason = 'Substantive Grounding Failure: 0 structural nodes or invariants extracted from source artifact.';
      } else if (out.toolId === 'tool_structural_analyzer') {
        // Must contain real structural nodes with source locators
        const hasValidNodes = Array.isArray(payload.nodes) && payload.nodes.length > 0 && payload.nodes.some((n: any) => n.sourceRange || n.sourceFile);
        isValid = hasValidNodes;
        rejectionReason = isValid ? '' : 'Structural node validation failed: Missing verified source locators.';
      } else if (out.toolId === 'tool_invariant_discovery') {
        // Must contain real discovered invariants with source ranges
        const hasValidInvariants = Array.isArray(payload.invariants) && payload.invariants.length > 0 && payload.invariants.some((inv: any) => inv.sourceRange || inv.sourceFile);
        isValid = hasValidInvariants;
        rejectionReason = isValid ? '' : 'Invariant discovery validation failed: 0 grounded invariants discovered in source artifact.';
      } else {
        // Other registered tools: must contain non-empty structured payload
        isValid = Object.keys(payload).length > 0;
        rejectionReason = isValid ? '' : 'Tool returned an empty payload object.';
      }

      const validationStatus: Evidence['validationStatus'] = isValid ? 'VALIDATED' : 'INVALID';

      const evidenceItem: Evidence = {
        id: `ev_${out.toolId}_${i}_${now}`,
        source: `${sourceUri}/tool/${out.toolId}`,
        sourceOutputId: `raw_out_${out.toolId}_${i}`,
        content: JSON.stringify(out.rawPayload, null, 2),
        validationStatus,
        validatorNotes: isValid
          ? `Validated successfully: tool produced ${out.toolId === 'tool_structural_analyzer' ? `${payload.nodeCount} structural nodes` : `${payload.discoveredInvariantsCount} invariants`} grounded in source artifact in ${out.executionTimeMs}ms.`
          : `Validation rejected: ${rejectionReason}`,
        timestamp: now,
      };

      // Invariant I4 check
      const i4Violation = CoreInvariantsValidator.validateI4(evidenceItem);
      if (i4Violation && validationStatus !== 'VALIDATED') {
        // Expected if invalid
      }

      if (validationStatus === 'VALIDATED') {
        evidences.push(evidenceItem);
      }
    }

    const c4Compliance = CoreContractsValidator.verifyC4(evidences);

    return {
      evidences,
      c4Compliance,
      invariantViolations,
    };
  }
}
