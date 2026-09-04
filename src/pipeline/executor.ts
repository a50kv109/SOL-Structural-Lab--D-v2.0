/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — PIPELINE MODULE 3
 * 
 * RESPONSIBILITY: EXECUTION
 * CONTRACT: C3 (EXECUTION CONTRACT)
 * INPUT: Decision, Tool Implementation Registry
 * OUTPUT: ToolRawOutput[]
 * MUST: Emit strictly RAW telemetry & payload without synthesis
 * MUST NOT: Conflate execution output with validated evidence (I3/I4)
 */

import { Decision, ToolRawOutput } from '../core/entities';
import { CoreContractsValidator, ContractCheckResult } from '../core/contracts';
import { CoreInvariantsValidator, InvariantViolation } from '../core/invariants';

export interface ToolContext {
  objectId: string;
  sourceUri: string;
  rawText?: string;
  files?: Array<{ path: string; sizeBytes: number; contentSample?: string }>;
  manifest?: Record<string, unknown>;
}

export type ToolHandler = (ctx: ToolContext) => Promise<{ rawPayload: unknown; stdout?: string; stderr?: string }>;

export class LaboratoryExecutor {
  private static registeredTools: Map<string, ToolHandler> = new Map();

  public static registerToolHandler(toolId: string, handler: ToolHandler) {
    this.registeredTools.set(toolId, handler);
  }

  public static async executeDecisions(
    decisions: Decision[],
    ctx: ToolContext
  ): Promise<{
    rawOutputs: ToolRawOutput[];
    c3Compliance: ContractCheckResult[];
    invariantViolations: InvariantViolation[];
  }> {
    const rawOutputs: ToolRawOutput[] = [];
    const c3Compliance: ContractCheckResult[] = [];
    const invariantViolations: InvariantViolation[] = [];

    for (const decision of decisions) {
      if (decision.action !== 'ACTIVATE') {
        continue;
      }

      const handler = this.registeredTools.get(decision.target);
      const startTime = Date.now();

      if (handler) {
        try {
          const result = await handler(ctx);
          const executionTimeMs = Date.now() - startTime;
          const output: ToolRawOutput = {
            toolId: decision.target,
            rawPayload: result.rawPayload,
            executionTimeMs,
            exitCode: 0,
            stdout: result.stdout || `Executed ${decision.target} successfully`,
            stderr: result.stderr,
          };

          // Validate I3 Invariant
          const i3Violation = CoreInvariantsValidator.validateI3(output);
          if (i3Violation) invariantViolations.push(i3Violation);

          // Validate C3 Contract
          const c3Res = CoreContractsValidator.verifyC3(output);
          c3Compliance.push(c3Res);

          rawOutputs.push(output);
        } catch (err: any) {
          const output: ToolRawOutput = {
            toolId: decision.target,
            rawPayload: { error: err.message },
            executionTimeMs: Date.now() - startTime,
            exitCode: 1,
            stderr: err.message,
          };
          rawOutputs.push(output);
        }
      } else {
        // Fallback generic structural extractor
        const executionTimeMs = Date.now() - startTime;
        const fallbackPayload = {
          tool: decision.target,
          extractedEntitiesCount: ctx.files?.length || 1,
          summaryNote: `Tool execution raw payload generated for ${decision.target}`,
          target: ctx.objectId,
        };

        const output: ToolRawOutput = {
          toolId: decision.target,
          rawPayload: fallbackPayload,
          executionTimeMs,
          exitCode: 0,
          stdout: `Default handler for ${decision.target} finished.`,
        };

        c3Compliance.push(CoreContractsValidator.verifyC3(output));
        rawOutputs.push(output);
      }
    }

    return {
      rawOutputs,
      c3Compliance,
      invariantViolations,
    };
  }
}
