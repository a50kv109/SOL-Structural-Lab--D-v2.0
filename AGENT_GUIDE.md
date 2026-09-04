# AGENT_GUIDE: Autonomous Agent Operations Manual for SOL LAB (LAB-G)

> **"I am an autonomous AI agent encountering this repository for the first time. What do I do?"**

This document is the canonical operational manual for AI coding and reasoning agents interacting with **SOL Structural Lab (LAB-G) v2.0**.

---

## Canonical Agent Entry Point

```text
DISCOVER
  ↓
UNDERSTAND PURPOSE
  ↓
READ TOOL_CARD.md
  ↓
READ AGENT_GUIDE.md
  ↓
PREPARE TARGET REPOSITORY (repository.zip preferred)
  ↓
RUN LAB-G (SINGLE or DUAL_ANALYSIS)
  ↓
LOCATE lab_report.json (PRIMARY MACHINE-READABLE RESULT)
  ↓
READ FINDINGS (unknowns & limitations first)
  ↓
RESPECT EPISTEMIC STATUS (FACT != INFERENCE, UNKNOWN != FALSE)
  ↓
INDEPENDENTLY VERIFY IMPORTANT CLAIMS (source inspection at evidence.file)
  ↓
DECIDE NEXT ACTION (preserve original epistemic statuses)
```

### Primary Result & Boundary Separation

- **PRIMARY MACHINE-READABLE RESULT:** `lab_report.json`  
  *(Note: In the web operator interface and export zip, the downloadable file is named `analysis_result.json` — it contains the identical data payload and schema).*
- **DO NOT USE AS EXTERNAL AGENT CONTRACT:**
  - `PipelineExecutionLog`
  - Internal execution telemetry
  - Implementation details of internal analyzers

---

## 1. Purpose & Tool Usage Boundary

SOL Structural Lab is a deterministic, epistemically constrained structural analysis engine. It evaluates code repositories and emits findings classified by strict epistemic tiers (`FACT`, `INFERENCE`, `UNKNOWN`, `AMBIGUOUS`, `DISPUTED`).

### LAB-G is designed for:
- **Structural analysis** (imported modules, interface contracts, call hierarchies).
- **Diagnostic investigation** (detecting boundary contradictions, invariant mismatches).
- **Evidence-oriented repository analysis** (verifiable ground-truth observations).
- **Prioritization of further investigation** (actionable file-level loci).

### LAB-G is NOT:
- A universal proof system.
- A guarantee of the absence of defects.
- An exhaustive mirror of the repository.
- A replacement for independent verification.

---

## 2. When to Use LAB-G

Use LAB-G when you need to:
- Establish verified structural properties of a codebase (imported modules, interface contracts, call hierarchies).
- Identify explicit boundary contradictions or invariant violations.
- Obtain an epistemically graded inventory before performing architectural modifications.
- Obtain precise file pointers for targeted code inspection.

---

## 3. When NOT to Use LAB-G

Do NOT use LAB-G when:
- You need a universal compiler or dynamic test execution runner (e.g., running `npm test` or `pytest`).
- You expect automated code refactoring or automatic file generation.
- You require natural-language summaries of business requirements or user stories.
- You need micro-optimizations or style linting (use ESLint/Prettier instead).

---

## 4. Input Requirements

LAB-G consumes:
1. **Source Repository Corpus**:
   - **`FULL_ZIP` (Recommended)**: An uncompressed or zipped archive containing the target codebase. Ensures `corpus_status: COMPLETE`.
   - **`GITHUB_QUICK_SCAN`**: Scans an accessible repository tree. Results in `corpus_status: PARTIAL`; findings must be treated with partial-corpus warnings.
2. **Execution Mode**:
   - `SINGLE`: Canonical 5.2 Core baseline analysis pass.
   - `DUAL_ANALYSIS`: Experimental dual-pass analysis (Analyst A Topology vs. Analyst B Invariants) evaluating complementarity and disputes.

---

## 5. Agent Quick-Start Workflow

```text
DISCOVER
  ↓
UNDERSTAND PURPOSE
  ↓
PREPARE INPUT (repository.zip preferred)
  ↓
RUN LAB-G (SINGLE or DUAL_ANALYSIS)
  ↓
READ lab_report.json (unknowns & limitations first)
  ↓
RESPECT EPISTEMIC STATUS (FACT != INFERENCE, UNKNOWN != FALSE)
  ↓
VERIFY IF NECESSARY (source inspection at evidence.file)
  ↓
DECIDE NEXT ACTION (preserve original epistemic statuses)
```

---

## 6. Result Interpretation & Epistemic Safety

Every finding in `lab_report.json` carries an explicit epistemic status. You must preserve these statuses in your downstream reasoning.

### Epistemic Status Hierarchy

| Status | Definition | What You MUST Do | What You MUST NOT Do |
| :--- | :--- | :--- | :--- |
| **`FACT`** | Directly observed in source files without inference. | Accept as an established structural observation. | Claim verification without checking source when certainty beyond report is needed. |
| **`INFERENCE`** | Synthesized architectural interpretation. | Treat as a working hypothesis requiring verification. | **NEVER promote to `FACT`** based solely on report metadata. |
| **`DISPUTED`** | Direct contradiction detected between analysis passes. | Preserve dispute; treat claim as unresolved. | Treat as resolved truth or dismiss as invalid error. |
| **`AMBIGUOUS`** | Multiple valid interpretations remain open. | Preserve ambiguity in downstream reasoning. | Select one interpretation arbitrarily. |
| **`UNKNOWN`** | Attribute explicitly analyzed but unobserved. | Treat as unestablished. | **`UNKNOWN ≠ FALSE`.** Never treat as boolean false or non-existent. |

---

## 7. What Confidence Does NOT Mean

Inferences may contain a `confidence` rating (`LOW`, `MEDIUM`, `HIGH`):
- `confidence: HIGH` means the analytical heuristics had strong contextual alignment.
- **CRITICAL RULE**: `confidence: HIGH` does **NOT** convert an `INFERENCE` into a `FACT`.
- An inference remains an inference regardless of confidence score.

---

## 8. Evidence Rules & Handling `null` Coordinates

Evidence items link claims to source files:

```json
{
  "file": "src/services/sessionStore.ts",
  "line_start": null,
  "line_end": null,
  "source_excerpt": null
}
```

### When Line Coordinates Are `null`:
1. **Do NOT invent coordinates**: Never guess line numbers, line ranges, or code excerpts.
2. **Do NOT infer falsehood**: `null` does not mean the evidence is invalid or fabricated; it means the analyzer localized the finding to the file level rather than isolated lines.
3. **Use as a Locator**: Open `src/services/sessionStore.ts` in `repository.zip` to find the exact construct.
4. **Distinguish Provenance**: When you locate the exact lines independently, classify them as **Agent Independent Evidence**, never as "Evidence supplied by SOL LAB".

---

## 9. Completeness Boundary

> **Absence from `lab_report.json` DOES NOT imply absence from the repository.**

- LAB-G analyzes specific invariants and targets. It is **not** an exhaustive mirror of every line of code.
- If a security flaw, pattern, or method is not mentioned in `lab_report.json`, you **must not** conclude that it does not exist in the codebase.
- The report is a **navigation and analytical aid**, not a substitute for source inspection.

---

## 10. Independent Verification Protocol

When your task requires certainty beyond what LAB-G provides:
1. Extract `evidence.file` targets from `lab_report.json`.
2. Inspect the raw source code in `repository.zip`.
3. If your inspection confirms or refutes an `INFERENCE`, state:
   - *"SOL LAB reported INFERENCE [id]. Independent source inspection of [file] confirmed/refuted this hypothesis with the following evidence: [...]"*
4. Keep LAB findings and your independent findings strictly separated in your output.

---

## 11. Prohibited Actions ("DO NOT")

- **DO NOT** convert `UNKNOWN` into `FALSE` (e.g., claiming a function is absent just because its return type was marked UNKNOWN).
- **DO NOT** convert `INFERENCE` into `FACT` without reading the source code.
- **DO NOT** fabricate missing line numbers or missing code excerpts.
- **DO NOT** state that LAB-G guaranteed something was absent just because the report was silent.
- **DO NOT** confuse `lab_report.json` with internal execution logs (`PipelineExecutionLog`).
- **DO NOT** attempt to execute or invoke internal LAB-G private methods directly.
