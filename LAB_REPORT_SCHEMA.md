# LAB_REPORT_SCHEMA: SOL Structural Lab Report Specification

This document defines the schema, structure, epistemic taxonomy, and interpretation constraints for `lab_report.json` (exported as `analysis_result.json` in the web operator interface).

---

## 1. Document Purpose

`lab_report.json` is the structured machine-readable contract emitted by SOL Structural Lab v2.0 upon completion of an analytical run. It conveys verified observations, derived inferences, validated evidence, and explicitly unestablished attributes (`unknowns`) regarding an ingested repository corpus.

**Key Consumer:** Autonomous AI engineering agents and automated evaluation pipelines operating in conjunction with `repository.zip`.

---

## 2. Root Fields Specification

```json
{
  "run_id": "RUN-1725450000000",
  "object_id": "auth-service-core",
  "repository_url": "https://github.com/example/auth-service-core",
  "branch_ref": "main",
  "source_mode": "FULL_ZIP",
  "corpus_status": "COMPLETE",
  "corpus_size_bytes": 145200,
  "file_count": 28,
  "mode": "SINGLE",
  "timestamp": "2026-09-04T09:45:00.000Z",
  "is_smoke_test": false,
  "corpus_integrity_warning": null,
  "experimental_warning": "Canonical 5.2 Core baseline analysis.",
  "analyst_configuration": { ... },
  "pipeline_status": "COMPLETED",
  "raw_single_output": { ... },
  "raw_dual_output": null,
  "validation_record": null,
  "epistemic_classification": { ... },
  "epistemic_invariants": [ ... ],
  "gold_standard_provenance": { ... }
}
```

### Field Definitions

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `run_id` | `string` | Unique execution run identifier. |
| `object_id` | `string` | Canonical name/identifier of the analyzed codebase. |
| `repository_url` | `string` | Source repository origin or remote URL. |
| `branch_ref` | `string` | Git branch, commit SHA, or tag analyzed. |
| `source_mode` | `string` | Ingest mechanism: `FULL_ZIP`, `GITHUB_QUICK_SCAN`, or `CANONICAL_PRESET`. |
| `corpus_status` | `string` | `COMPLETE` (100% files provided) or `PARTIAL` (subset of files analyzed). |
| `corpus_size_bytes` | `number` | Total uncompressed source byte count in analyzed buffer. |
| `file_count` | `number` | Total number of files ingested into analytical memory. |
| `mode` | `string` | `SINGLE` (5.2 Core baseline pass) or `DUAL_ANALYSIS` (Analyst A ∥ B hypothesis). |
| `timestamp` | `string` | Execution timestamp. |
| `is_smoke_test` | `boolean` | When `true`, execution was an end-to-end plumbing check, NOT full semantic evaluation. |
| `corpus_integrity_warning` | `string \| null` | Set when `corpus_status === "PARTIAL"`. Alerts consumer that findings are based on a partial corpus. |
| `experimental_warning` | `string` | Explicit boundary marker separating frozen 5.2 Core from experimental hypotheses. |
| `pipeline_status` | `string` | Terminal execution state (`COMPLETED`, `ABORTED`, `FAILED`). |
| `raw_single_output` | `object \| null` | Single-pass 5.2 output structure (see Section 3). |
| `raw_dual_output` | `object \| null` | Populated only when `mode === "DUAL_ANALYSIS"`. |
| `validation_record` | `object \| null` | Comparative validation record against reference benchmark (if provided). |
| `epistemic_classification` | `object` | Aggregate counts of items by epistemic tier. |
| `epistemic_invariants` | `string[]` | Active epistemic rules enforced during the run. |
| `gold_standard_provenance` | `object` | Provenance data regarding ground-truth benchmark locking and checksums. |

---

## 3. Core Epistemic Statuses

Every reported observation, inference, and evidence element carries a strict epistemic status:

| Status | Semantics | Agent Trust & Usage Directive |
| :--- | :--- | :--- |
| **`FACT`** | Direct, verified observation of raw source data. | High trust. May be treated as an established property of the analyzed files. |
| **`INFERENCE`** | Derived analytical deduction or architectural synthesis. | Conditional trust. **MUST NOT** be treated as verified fact without independent source confirmation. |
| **`UNKNOWN`** | Attribute explicitly analyzed but could not be established. | Neutral. **`UNKNOWN ≠ FALSE`.** Must never be coerced to boolean `false` or non-existence. |
| **`AMBIGUOUS`** | Multiple conflicting yet valid interpretations exist in code. | Preserve ambiguity. Do not pick one interpretation arbitrarily. |
| **`DISPUTED`** | Direct contradiction detected between analytical passes. | Contested. Requires independent resolution before acting. |

---

## 4. Evidence Structure & `null` Coordinates

Evidence items link observations and conclusions to the underlying codebase:

```json
{
  "id": "ev_01",
  "sourceOutputId": "raw_ast_scanner",
  "validationStatus": "VALIDATED",
  "file": "src/auth/jwtValidator.ts",
  "line_start": null,
  "line_end": null,
  "source_excerpt": null
}
```

### Interpretation of `null` Values:
- **`file`**: Always populated with the relative path inside the repository.
- **`line_start` / `line_end`**: When integer, marks exact lines. When `null`, indicates file-level locus where exact line coordinates were not isolated by the analyzer pass.
- **`source_excerpt`**: When `null`, no raw text snippet was captured.
- **MANDATORY AGENT RULE**: An agent must **never** invent line numbers, synthesize imaginary excerpts, or infer that `null` indicates a bogus or invalid finding. The agent should use `file` as a pointer to inspect the file directly in `repository.zip`.

---

## 5. Completeness Boundary

```
Absence from lab_report.json ≠ Absence from repository
```

1. The report contains only what active analytical analyzers specifically targeted.
2. If an architectural pattern, bug, or vulnerability is **not mentioned** in `lab_report.json`, the agent must **never** conclude that the pattern does not exist in the repository.
3. The report is an **analytical aid**, not a complete mathematical proof of the codebase's entire state.

---

## 6. Internal Boundary Isolation

Internal execution telemetry (`PipelineExecutionLog`, step timer events, internal operator states) is strictly separated from `lab_report.json`. An external autonomous agent does **not** need `PipelineExecutionLog` to safely and completely consume `lab_report.json`.
