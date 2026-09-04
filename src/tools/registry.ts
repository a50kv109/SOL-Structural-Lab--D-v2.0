/**
 * SOL STRUCTURAL LAB v2.0
 * EXTERNAL TOOL REGISTRY
 * 
 * Tool Lifecycle:
 * UNKNOWN → CANDIDATE → VERIFIED → INTEGRATED
 * 
 * Rules:
 * 1. External tools are NOT part of 5.2 CORE.
 * 2. External tools require factual verification before status transitions.
 * 3. Two-Heroes-Tool current canonical status: CANDIDATE.
 */

export enum ToolLifecycleStatus {
  UNKNOWN = 'UNKNOWN',       // Implementation not yet examined or verified
  CANDIDATE = 'CANDIDATE',   // Potentially conforms to requirements, pending formal audit
  VERIFIED = 'VERIFIED',     // Formal compliance verification tests passed
  INTEGRATED = 'INTEGRATED', // Attached and active in experimental execution pipeline
}

export interface ExternalToolRecord {
  id: string;
  name: string;
  repositoryUrl: string;
  description: string;
  status: ToolLifecycleStatus;
  version: string;
  verificationRequirements: Array<{
    id: string;
    description: string;
    verified: boolean;
    evidenceNotes?: string;
  }>;
  registeredAt: number;
  lastAuditedAt?: number;
}

export class ExternalToolRegistry {
  private static tools: Map<string, ExternalToolRecord> = new Map();

  public static registerTool(tool: ExternalToolRecord) {
    this.tools.set(tool.id, tool);
  }

  public static getTool(id: string): ExternalToolRecord | undefined {
    return this.tools.get(id);
  }

  public static listTools(): ExternalToolRecord[] {
    return Array.from(this.tools.values());
  }

  public static updateToolStatus(
    id: string,
    newStatus: ToolLifecycleStatus,
    reason: string
  ): ExternalToolRecord {
    const tool = this.tools.get(id);
    if (!tool) throw new Error(`Tool [${id}] not registered.`);

    // Strict status transition checking
    if (newStatus === ToolLifecycleStatus.VERIFIED) {
      const allVerified = tool.verificationRequirements.every(r => r.verified);
      if (!allVerified) {
        throw new Error(`Cannot transition tool [${id}] to VERIFIED: incomplete verification requirements.`);
      }
    }

    tool.status = newStatus;
    tool.lastAuditedAt = Date.now();
    this.tools.set(id, tool);
    return tool;
  }
}
