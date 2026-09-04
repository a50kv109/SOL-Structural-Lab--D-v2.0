/**
 * SOL STRUCTURAL LAB v2.0
 * EXTERNAL CANDIDATE TOOL ADAPTER: two-heroes-tool
 * 
 * Canonical Status: CANDIDATE / NOT VERIFIED / EXECUTION PENDING
 * 
 * Epistemic Rules:
 * 1. Status remains CANDIDATE.
 * 2. MUST NOT be marked VERIFIED without passing the full 4-requirement checklist.
 * 3. In the current sandboxed web environment, native Python subprocess execution is PENDING.
 */

import { TWO_HEROES_TOOL_SPEC } from './twoHeroesTool';
import { ToolLifecycleStatus } from './registry';

export interface TwoHeroesInvocationInput {
  targetObjectId: string;
  sourceCode: string;
  heroA: 'Creator' | 'Engineer' | 'Optimist';
  heroB: 'Skeptic' | 'Strategist' | 'Philosopher';
}

export interface TwoHeroesInvocationOutput {
  status: 'EXECUTION_PENDING_EXTERNAL_PYTHON_RUNTIME' | 'SIMULATED_RECONSTRUCTION' | 'COMPLETED';
  candidateStatus: ToolLifecycleStatus;
  heroAResult: {
    heroName: string;
    assertions: string[];
  };
  heroBResult: {
    heroName: string;
    assertions: string[];
  };
  synthesis: {
    agreements: string[];
    disputes: string[];
    epistemicClassification: 'INFERENCE'; // Strict: Never EVIDENCE
  };
  executionNotes: string;
}

export class TwoHeroesAdapter {
  public static readonly CANONICAL_STATUS = ToolLifecycleStatus.CANDIDATE;
  public static readonly EXECUTION_STATE = 'CANDIDATE / NOT VERIFIED / EXECUTION PENDING';

  /**
   * Probes whether the external Python subprocess runtime is available in current environment.
   */
  public static isNativeExecutionAvailable(): boolean {
    // In sandboxed browser client, native Python process spawning is blocked
    return false;
  }

  /**
   * Candidate adapter invocation interface
   */
  public static async invokeCandidate(
    input: TwoHeroesInvocationInput
  ): Promise<TwoHeroesInvocationOutput> {
    const isAvailable = this.isNativeExecutionAvailable();

    if (!isAvailable) {
      return {
        status: 'EXECUTION_PENDING_EXTERNAL_PYTHON_RUNTIME',
        candidateStatus: ToolLifecycleStatus.CANDIDATE,
        heroAResult: {
          heroName: input.heroA,
          assertions: [
            `[PENDING_NATIVE_EXECUTION] Extracted node structure from ${input.targetObjectId}`,
          ],
        },
        heroBResult: {
          heroName: input.heroB,
          assertions: [
            `[PENDING_NATIVE_EXECUTION] Flagged unverified assumptions in ${input.targetObjectId}`,
          ],
        },
        synthesis: {
          agreements: [`Structural presence of ${input.targetObjectId}`],
          disputes: ['Boundary invariant completeness'],
          epistemicClassification: 'INFERENCE',
        },
        executionNotes:
          'Native Python execution is pending host container / IPC bridge. Internal deterministic fallback used for pipeline continuity. Status remains CANDIDATE.',
      };
    }

    throw new Error('Native Python subprocess bridge not configured.');
  }

  /**
   * Retrieves the 4 verification gates status for two-heroes-tool
   */
  public static getVerificationGates() {
    return TWO_HEROES_TOOL_SPEC.verificationRequirements;
  }
}
