/**
 * SOL STRUCTURAL LAB v2.0
 * ARTIFACT EXPORTER & ZIP PACKAGE GENERATOR
 * 
 * Epistemic Rules:
 * 1. Analysis packages are self-contained, reproducible artifacts.
 * 2. Result packages clearly distinguish SOURCE REPOSITORY from ANALYSIS RESULT.
 * 3. Formats:
 *    - analysis_result.json
 *    - analysis_report.md
 *    - analysis_report.txt
 *    - analysis_<repository>_<timestamp>.zip
 *      Contains: /metadata.json, /raw_input/, /analysis/, /validation/, /report/, /artifacts/
 */

import JSZip from 'jszip';
import { ExperimentSession } from '../protocols/experimentStateMachine';

export interface ArtifactRunSummary {
  runId: string;
  targetObjectId: string;
  repositoryUrl: string;
  branchRef?: string;
  executionMode: string;
  sourceMode?: string;
  corpusStatus?: string;
  corpusSizeBytes?: number;
  filesCount?: number;
  timestamp: string;
  isSmokeTest: boolean;
  status: string;
  session: ExperimentSession;
}

export class ArtifactExporter {
  /**
   * Helper to trigger a browser file download from Blob
   */
  public static triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Generates structured analysis_result.json
   */
  public static generateResultJson(summary: ArtifactRunSummary): string {
    const { session } = summary;
    const repo = session.corpusObject;
    const sourceMode = summary.sourceMode || repo?.sourceMode || 'CANONICAL_PRESET';
    const corpusStatus = summary.corpusStatus || repo?.corpusStatus || (sourceMode === 'GITHUB_QUICK_SCAN' ? 'PARTIAL' : 'COMPLETE');
    const filesCount = summary.filesCount || repo?.files?.length || 0;
    const corpusSizeBytes = summary.corpusSizeBytes || repo?.totalSizeBytes || repo?.files?.reduce((acc, f) => acc + f.sizeBytes, 0) || 0;

    const resultPayload = {
      run_id: summary.runId,
      object_id: summary.targetObjectId,
      repository_url: summary.repositoryUrl,
      branch_ref: summary.branchRef || repo?.revision || 'main',
      source_mode: sourceMode,
      corpus_status: corpusStatus,
      corpus_size_bytes: corpusSizeBytes,
      file_count: filesCount,
      mode: summary.executionMode,
      timestamp: summary.timestamp,
      is_smoke_test: summary.isSmokeTest,
      corpus_integrity_warning: corpusStatus === 'PARTIAL' || sourceMode === 'GITHUB_QUICK_SCAN'
        ? 'WARNING: Result is based on an accessible subset of the repository. This is not equivalent to a full corpus analysis.'
        : undefined,
      experimental_warning: summary.executionMode === 'DUAL_ANALYSIS'
        ? 'DUAL_ANALYSIS is an experimental HYPOTHESIS outside the 5.2 CORE.'
        : 'Canonical 5.2 Core baseline analysis.',
      analyst_configuration: {
        analyst_a: {
          id: 'ANALYST_A_TOPOLOGY_STRUCTURE',
          perspective: 'Object relations, interfaces, module topology',
        },
        analyst_b: {
          id: 'ANALYST_B_INVARIANTS_CONSTRAINTS',
          perspective: 'Boundary constraints, exception contracts, failure modes',
        },
        independence_guarantee: 'INDEPENDENCE ENFORCED BY EXPERIMENTAL CONFIGURATION',
      },
      pipeline_status: session.state,
      raw_single_output: session.rawSingleOutput,
      raw_dual_output: session.rawDualOutput,
      validation_record: session.validationRecord,
      epistemic_classification: {
        observations_count: (session.rawSingleOutput?.observations?.length || 0) + (session.rawDualOutput?.analystA?.executionLog?.observations?.length || 0),
        inferences_count: (session.rawSingleOutput?.inferences?.length || 0) + (session.rawDualOutput?.synthesisInferences?.length || 0),
        evidence_count: session.rawSingleOutput?.evidences?.length || 0,
        unknowns_count: session.rawSingleOutput?.unknowns?.length || 0,
        disputed_count: session.rawDualOutput?.disputedCount || 0,
        agreements_count: session.rawDualOutput?.agreementCount || 0,
        complementarity_count: session.rawDualOutput?.complementarityCount || 0,
      },
      epistemic_invariants: [
        'OBSERVATION != INFERENCE',
        'INFERENCE != EVIDENCE',
        'UNKNOWN != FALSE',
        'DISPUTED != TRUE',
        'AGREEMENT != TRUTH',
      ],
      gold_standard_provenance: {
        is_provided: !!session.goldStandard,
        checksum: session.goldStandard?.checksum || 'NOT_PROVIDED',
        is_locked: session.goldStandard?.isLocked || false,
        total_entries: session.goldStandard?.entries?.length || 0,
      },
    };

    return JSON.stringify(resultPayload, null, 2);
  }

  /**
   * Generates formatted Markdown analysis_report.md
   */
  public static generateReportMd(summary: ArtifactRunSummary): string {
    const { session } = summary;
    const repo = session.corpusObject;
    const val = session.validationRecord;
    const sourceMode = summary.sourceMode || repo?.sourceMode || 'CANONICAL_PRESET';
    const corpusStatus = summary.corpusStatus || repo?.corpusStatus || (sourceMode === 'GITHUB_QUICK_SCAN' ? 'PARTIAL' : 'COMPLETE');
    const filesCount = summary.filesCount || repo?.files?.length || 0;
    const corpusSizeBytes = summary.corpusSizeBytes || repo?.totalSizeBytes || repo?.files?.reduce((acc, f) => acc + f.sizeBytes, 0) || 0;

    return `# SOL STRUCTURAL LAB v2.0 — ANALYSIS REPORT
**RUN_ID:** \`${summary.runId}\`  
**OBJECT_ID:** \`${summary.targetObjectId}\`  
**REPOSITORY_URL:** ${summary.repositoryUrl}  
**BRANCH / REF:** \`${summary.branchRef || repo?.revision || 'main'}\`  
**SOURCE_MODE:** \`${sourceMode}\`  
**CORPUS_STATUS:** \`${corpusStatus}\`  
**CORPUS_SIZE:** ${(corpusSizeBytes / 1024).toFixed(1)} KB (${filesCount} files)  
**FILE_COUNT:** ${filesCount}  
**ANALYSIS_MODE:** \`${summary.executionMode}\`  
**TIMESTAMP:** ${summary.timestamp}  
**EXECUTION TYPE:** ${summary.isSmokeTest ? 'SMOKE TEST (Plumbing Verification)' : 'RIGOROUS EXPERIMENT'}  
**RESULT STATUS:** \`${session.state}\`  

${corpusStatus === 'PARTIAL' || sourceMode === 'GITHUB_QUICK_SCAN' ? `
> ⚠️ **PARTIAL CORPUS WARNING:**  
> Результат основан на доступном подмножестве репозитория. Это не эквивалентно анализу полного корпуса.
` : ''}

---

## 1. EPISTEMIC & METHODOLOGICAL BOUNDARIES
> **CRITICAL DISCIPLINE:**  
> - \`5.2 CORE = FROZEN\`  
> - \`DUAL_ANALYSIS = HYPOTHESIS\`  
> - \`OBSERVATION ≠ INFERENCE\` | \`INFERENCE ≠ EVIDENCE\` | \`UNKNOWN ≠ FALSE\` | \`DISPUTED ≠ TRUE\`  
> - \`AGREEMENT ≠ TRUTH\` | \`DISAGREEMENT ≠ ERROR\` | \`SYNTHESIS = INFERENCE\`  

---

## 2. INGESTED SOURCE METADATA
- **Target Name:** ${repo?.name || summary.targetObjectId}
- **Category:** \`${repo?.category || 'UNKNOWN'}\`
- **Verification State:** \`${repo?.verificationState || 'COMMUNITY'}\`
- **Source Mode:** \`${sourceMode}\` (${sourceMode === 'FULL_ZIP' ? 'Full Repository Archive' : sourceMode === 'GITHUB_QUICK_SCAN' ? 'GitHub URL Quick Scan' : 'Canonical Test Core'})
- **Corpus Status:** \`${corpusStatus}\`
- **Files Ingested:** ${filesCount} real source files
- **Total Uncompressed Size:** ${(corpusSizeBytes / 1024).toFixed(1)} KB
- **Structural Characteristics:** ${repo?.structuralCharacteristics || 'N/A'}

---

## 3. ANALYTICAL TELEMETRY & OBSERVATIONS

### 3.1 Single 5.2 Pass (Baseline)
- **Observations (C1):** ${session.rawSingleOutput?.observations?.length || 0}
- **Decisions (C2):** ${session.rawSingleOutput?.decisions?.length || 0}
- **Validated Evidence (C4):** ${session.rawSingleOutput?.evidences?.length || 0}
- **Inferences (C5):** ${session.rawSingleOutput?.inferences?.length || 0}
- **Execution Duration:** ${session.singleDurationMs ? `${session.singleDurationMs} ms` : 'N/A'}

### 3.2 Dual Analysis Pass (Hypothesis)
- **Analyst A Focus:** Topology, Module Structure, Components (Pass Log: ${session.rawDualOutput?.analystA?.executionLog?.observations?.length || 0} observations)
- **Analyst B Focus:** Invariants, Boundary Contracts, Exceptions (Pass Log: ${session.rawDualOutput?.analystB?.executionLog?.observations?.length || 0} observations)
- **Agreements (A = B):** ${session.rawDualOutput?.agreementCount || 0} claims
- **Complementarity (A ⊻ B):** ${session.rawDualOutput?.complementarityCount || 0} claims
- **Disputed (A ⊥ B):** ${session.rawDualOutput?.disputedCount || 0} claims
- **Synthesized Inferences:** ${session.rawDualOutput?.synthesisInferences?.length || 0} (Strictly tagged \`INFERENCE\`)

---

## 4. GOLD STANDARD & VALIDATION METRICS
- **Gold Standard Checksum:** \`${session.goldStandard?.checksum || 'GOLD STANDARD: NOT PROVIDED'}\`
- **Validation Status:** ${val ? 'COMPUTED AGAINST LOCKED GROUND TRUTH' : 'VALIDATION PENDING / CANNOT COMPLETE'}
${val ? `
- **Recall_SINGLE:** ${(val.metrics.recallSingle * 100).toFixed(1)}%
- **Recall_DUAL:** ${(val.metrics.recallDual * 100).toFixed(1)}%
- **Detection Advantage:** ${(val.metrics.detectionAdvantage * 100).toFixed(1)}%
- **False Dispute Rate:** ${(val.metrics.falseDisputeRate * 100).toFixed(1)}% (Target < 30%)
- **Overhead Factor:** ${val.metrics.overheadStatus === 'MEASURED' ? `${val.metrics.overheadFactor.toFixed(2)}x` : 'COST: NOT MEASURED'}
- **Decision Matrix Verdict:** \`${val.decisionMatrixOutcome}\`
- **Verdict Rationale:** ${val.verdictRationale}
` : ''}

---

## 5. REPRODUCIBILITY ARTIFACT MANIFEST
This report is part of the downloadable analysis package for \`${summary.targetObjectId}\`.
Package signature: \`SL-ART-${Date.now()}\`
`;
  }

  /**
   * Generates plain text analysis_report.txt
   */
  public static generateReportTxt(summary: ArtifactRunSummary): string {
    const md = this.generateReportMd(summary);
    // Strip markdown tags cleanly for text
    return md
      .replace(/#+\s*/g, '')
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/>\s*/g, '  ');
  }

  /**
   * Generates self-contained analysis_<repository>_<timestamp>.zip
   */
  public static async generateCompleteZip(summary: ArtifactRunSummary): Promise<Blob> {
    const zip = new JSZip();
    const { session } = summary;
    const cleanRepoName = summary.targetObjectId.replace(/[^a-zA-Z0-9_-]/g, '_');

    // 1. /metadata.json
    const metadata = {
      run_id: summary.runId,
      object_id: summary.targetObjectId,
      repository_url: summary.repositoryUrl,
      branch_ref: summary.branchRef || 'main',
      mode: summary.executionMode,
      timestamp: summary.timestamp,
      is_smoke_test: summary.isSmokeTest,
      lab_version: 'SOL Structural Lab v2.0',
      epistemic_framework: '5.2 Core Epistemic Discipline',
    };
    zip.file('metadata.json', JSON.stringify(metadata, null, 2));

    // 2. /raw_input/
    const rawInputFolder = zip.folder('raw_input');
    if (rawInputFolder && session.corpusObject) {
      rawInputFolder.file('manifest.json', JSON.stringify({
        id: session.corpusObject.id,
        name: session.corpusObject.name,
        url: session.corpusObject.url,
        category: session.corpusObject.category,
        verificationState: session.corpusObject.verificationState,
        files_count: session.corpusObject.files?.length || 0,
      }, null, 2));

      (session.corpusObject.files || []).forEach(f => {
        rawInputFolder.file(f.path, f.content);
      });
    }

    // 3. /analysis/
    const analysisFolder = zip.folder('analysis');
    if (analysisFolder) {
      if (session.rawSingleOutput) {
        analysisFolder.file('single_5_2_pass.json', JSON.stringify(session.rawSingleOutput, null, 2));
      }
      if (session.rawDualOutput) {
        analysisFolder.file('dual_analysis_pass.json', JSON.stringify(session.rawDualOutput, null, 2));
      }
    }

    // 4. /validation/
    const validationFolder = zip.folder('validation');
    if (validationFolder) {
      if (session.goldStandard) {
        validationFolder.file('gold_standard.json', JSON.stringify(session.goldStandard, null, 2));
      } else {
        validationFolder.file('gold_standard_status.txt', 'GOLD STANDARD: NOT PROVIDED');
      }
      if (session.validationRecord) {
        validationFolder.file('validation_record.json', JSON.stringify(session.validationRecord, null, 2));
      }
    }

    // 5. /report/
    const reportFolder = zip.folder('report');
    if (reportFolder) {
      reportFolder.file('analysis_report.md', this.generateReportMd(summary));
      reportFolder.file('analysis_report.txt', this.generateReportTxt(summary));
    }

    // 6. /artifacts/
    const artifactsFolder = zip.folder('artifacts');
    if (artifactsFolder) {
      artifactsFolder.file('analysis_result.json', this.generateResultJson(summary));
    }

    return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  }

  /**
   * Downloads analysis_result.json
   */
  public static downloadResultJson(summary: ArtifactRunSummary): void {
    const jsonStr = this.generateResultJson(summary);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    this.triggerDownload(blob, `analysis_result_${summary.targetObjectId}.json`);
  }

  /**
   * Downloads analysis_report.md
   */
  public static downloadReportMd(summary: ArtifactRunSummary): void {
    const mdStr = this.generateReportMd(summary);
    const blob = new Blob([mdStr], { type: 'text/markdown;charset=utf-8' });
    this.triggerDownload(blob, `analysis_report_${summary.targetObjectId}.md`);
  }

  /**
   * Downloads analysis_report.txt
   */
  public static downloadReportTxt(summary: ArtifactRunSummary): void {
    const txtStr = this.generateReportTxt(summary);
    const blob = new Blob([txtStr], { type: 'text/plain;charset=utf-8' });
    this.triggerDownload(blob, `analysis_report_${summary.targetObjectId}.txt`);
  }

  /**
   * Downloads complete analysis zip
   */
  public static async downloadCompleteZip(summary: ArtifactRunSummary): Promise<void> {
    const blob = await this.generateCompleteZip(summary);
    const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
    this.triggerDownload(blob, `analysis_${summary.targetObjectId}_${timestampStr}.zip`);
  }

  /**
   * Generates pure source repository archive (contains ONLY the ingested source files)
   */
  public static async generateSourceCorpusZip(session: ExperimentSession): Promise<Blob> {
    const zip = new JSZip();
    const repo = session.corpusObject;

    if (repo && repo.files) {
      repo.files.forEach(file => {
        zip.file(file.path, file.content);
      });
    }

    return await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  }

  /**
   * Downloads pure source repository archive
   */
  public static async downloadSourceCorpusZip(session: ExperimentSession): Promise<void> {
    const blob = await this.generateSourceCorpusZip(session);
    const repoName = session.corpusObject?.name || session.targetObjectId || 'source_corpus';
    const cleanName = repoName.replace(/[^a-zA-Z0-9_-]/g, '_');
    this.triggerDownload(blob, `source_corpus_${cleanName}.zip`);
  }
}
