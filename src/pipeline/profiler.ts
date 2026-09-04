/**
 * SOL STRUCTURAL LAB v2.0
 * 5.2 DISCIPLINE LAYER — PIPELINE MODULE 1
 * 
 * RESPONSIBILITY: PROFILING
 * CONTRACT: C1 (OBSERVATION CONTRACT)
 * INPUT: Raw Ingested Data / Object Payload
 * OUTPUT: Observation[], UnknownData[]
 * MUST: Only factual observations with verifiable source attribution
 * MUST NOT: Deductive inference, hypothesis projection, or speculative conclusions
 */

import { Observation, UnknownData, CoreStatus } from '../core/entities';
import { CoreContractsValidator } from '../core/contracts';

export interface IngestionInput {
  objectId: string;
  sourceUri: string;
  rawText?: string;
  files?: Array<{ path: string; sizeBytes: number; contentSample?: string }>;
  manifest?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export class LaboratoryProfiler {
  public static profileObject(input: IngestionInput): {
    observations: Observation[];
    unknowns: UnknownData[];
    c1Compliance: ReturnType<typeof CoreContractsValidator.verifyC1>;
  } {
    const observations: Observation[] = [];
    const unknowns: UnknownData[] = [];
    const now = Date.now();

    // 1. Basic Ingestion Observation
    observations.push({
      id: `obs_obj_${input.objectId}`,
      source: input.sourceUri,
      statement: `Object ingested with identifier '${input.objectId}' from URI '${input.sourceUri}'.`,
      status: CoreStatus.FACT,
      timestamp: now,
      metadata: { objectId: input.objectId },
    });

    // 2. File tree observations
    if (input.files && input.files.length > 0) {
      observations.push({
        id: `obs_files_count_${input.objectId}`,
        source: `${input.sourceUri}/filesystem`,
        statement: `Object contains exactly ${input.files.length} registered file paths.`,
        status: CoreStatus.FACT,
        timestamp: now,
      });

      for (const file of input.files) {
        observations.push({
          id: `obs_file_${file.path.replace(/[^a-zA-Z0-9_]/g, '_')}`,
          source: `${input.sourceUri}/${file.path}`,
          statement: `File path '${file.path}' exists with size ${file.sizeBytes} bytes.`,
          status: CoreStatus.FACT,
          timestamp: now,
          metadata: { path: file.path, sizeBytes: file.sizeBytes },
        });
      }
    } else {
      unknowns.push({
        id: `unk_files_${input.objectId}`,
        targetField: 'files',
        reason: 'No file list was provided in raw ingestion payload.',
        status: CoreStatus.UNKNOWN,
      });
    }

    // 3. Manifest observations
    if (input.manifest) {
      const keys = Object.keys(input.manifest);
      observations.push({
        id: `obs_manifest_${input.objectId}`,
        source: `${input.sourceUri}/manifest`,
        statement: `Manifest payload contains ${keys.length} top-level fields: ${keys.join(', ')}.`,
        status: CoreStatus.FACT,
        timestamp: now,
      });
    } else {
      unknowns.push({
        id: `unk_manifest_${input.objectId}`,
        targetField: 'manifest',
        reason: 'Manifest is absent from ingested payload.',
        status: CoreStatus.UNKNOWN,
      });
    }

    // 4. Raw text observations
    if (input.rawText && input.rawText.trim() !== '') {
      const lineCount = input.rawText.split('\n').length;
      observations.push({
        id: `obs_rawtext_lines_${input.objectId}`,
        source: `${input.sourceUri}/rawText`,
        statement: `Raw text stream present consisting of ${lineCount} lines and ${input.rawText.length} characters.`,
        status: CoreStatus.FACT,
        timestamp: now,
      });
    }

    // Contract verification check
    const c1Compliance = CoreContractsValidator.verifyC1(observations);

    return {
      observations,
      unknowns,
      c1Compliance,
    };
  }
}
