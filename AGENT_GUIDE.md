# AGENT_GUIDE: Autonomous Agent Operations Manual for SOL Structural Lab (D-v2.0)

> **"I am an autonomous AI coding/reasoning agent encountering this repository for the first time. What do I do?"**

This document is the canonical operational manual for AI coding and reasoning agents interacting with **SOL Structural Lab — D-v2.0** (with historical operational lineage from LAB-G).

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
RUN D-v2.0 (SINGLE or DUAL_ANALYSIS)
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
  - Implementation details of internal analyzers or private helper classes

### Architectural Layer Separation (Do Not Conflate)

1. **Structural Canon (`src/canon/`)**:
   - 4 Primitives: `OBJECT`, `RELATION`, `CONSTRAINT`, `STATE`
   - 4 Operators: `BIND`, `SPLIT`, `INSERT`, `DELETE`
   - Defines structural elements and operations.
2. **5.2 Epistemic Core (`src/core/`)**:
   - 5 Entities: `OBSERVATION`, `INFERENCE`, `UNKNOWN`, `DECISION`, `EVIDENCE`
   - 5 Contracts: `C1` through `C5`
   - 7 Invariants: `I1` through `I7`
   - Enforces epistemic certainty, non-fabrication, and verification gates.
3. **Experimental & Benchmark Layer (`src/operators/`, `src/protocols/`)**:
   - `DUAL_ANALYSIS`: Experimental hypothesis (`HYPOTHESIS`); analyst consensus does not constitute factual proof.
   - Benchmark Alignment: Heuristic keyword and structural matching against pre-annotated reference sets.
   - Candidate Tools: Isolated external integrations (`two-heroes-tool` status: `CANDIDATE`).

---

## 1. Purpose & Tool Usage Boundary

**SOL Structural Lab — D-v2.0** is a deterministic, epistemically constrained structural analysis engine. It evaluates code repositories and emits findings classified into strict epistemic tiers (`FACT`, `INFERENCE`, `UNKNOWN`, `AMBIGUOUS`, `DISPUTED`).

### D-v2.0 is designed for:
- **Structural reconnaissance** (extracting classes, interfaces, imports, and call dependencies via deterministic source-structure parsing).
- **Diagnostic investigation** (detecting boundary contradictions, invariant mismatches, and contract violations).
- **Evidence-grounded repository analysis** (generating verifiable factual observations).
- **Prioritization of further investigation** (providing reliable file-level locators for targeted inspection).

### D-v2.0 is NOT:
- A universal mathematical proof system or theorem prover.
- A guarantee of the total absence of bugs or security vulnerabilities.
- An exhaustive AST compiler or semantic indexer for all programming languages.
- A replacement for independent agent source code verification.

### Historical Lineage Note:
Where you encounter mentions of **LAB-G** (e.g. in historical experiment notes, benchmark datasets, or archive manifests), recognize that LAB-G was the original laboratory prototype. **D-v2.0** is the autonomous, public release implementing the complete 5.2 Core discipline.

---

## 2. When to Use D-v2.0

Use D-v2.0 when you need to:
- Establish verified structural properties of a codebase (modules, exported interfaces, and dependency edges).
- Identify explicit boundary contradictions or invariant violations without relying on ungrounded LLM guesses.
- Obtain an epistemically graded inventory before performing non-trivial architectural refactorings.
- Obtain precise file pointers for targeted code inspection.

---

## 3. When NOT to Use D-v2.0

Do NOT use D-v2.0 when:
- You need a dynamic compiler or test runner (e.g., executing `npm test` or `pytest`).
- You expect automated code refactoring, AST rewriting, or automatic PR generation.
- You require natural-language summaries of business requirements or product roadmaps.
- You need stylistic linting or formatting (use standard linters like ESLint, Prettier, or Ruff).

---

## 4. Input Requirements

D-v2.0 consumes:
1. **Source Repository Corpus**:
   - **`FULL_ZIP` (Recommended)**: A zipped archive containing the target codebase. Ensures `corpus_status: COMPLETE`.
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
RUN D-v2.0 (SINGLE or DUAL_ANALYSIS)
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
3. **Use as a Locator**: Open `src/services/sessionStore.ts` in `repository.zip` to locate the exact construct.
4. **Distinguish Provenance**: When you locate the exact lines independently, classify them as **Agent Independent Evidence**, never as "Evidence supplied by SOL LAB".

---

## 9. Completeness Boundary

> **Absence from `lab_report.json` DOES NOT imply absence from the repository.**

- D-v2.0 analyzes specific invariants and targets. It is **not** an exhaustive mirror of every line of code.
- If a security flaw, architectural pattern, or method is not mentioned in `lab_report.json`, you **must not** conclude that it does not exist in the codebase.
- The report is a **navigation and analytical aid**, not a substitute for source inspection.

---

## 10. Independent Verification Protocol

When your task requires certainty beyond what D-v2.0 provides:
1. Extract `evidence.file` targets from `lab_report.json`.
2. Inspect the raw source code in `repository.zip`.
3. If your inspection confirms or refutes an `INFERENCE`, state:
   - *"SOL Structural Lab (D-v2.0) reported INFERENCE [id]. Independent source inspection of [file] confirmed/refuted this hypothesis with the following evidence: [...]"*
4. Keep D-v2.0 findings and your independent findings strictly separated in your output.

---

## 11. Prohibited Actions ("DO NOT")

- **DO NOT** convert `UNKNOWN` into `FALSE` (e.g., claiming a function is absent just because its return type was marked UNKNOWN).
- **DO NOT** convert `INFERENCE` into `FACT` without reading the source code.
- **DO NOT** fabricate missing line numbers or missing code excerpts.
- **DO NOT** state that D-v2.0 guaranteed something was absent just because the report was silent.
- **DO NOT** confuse `lab_report.json` with internal execution logs (`PipelineExecutionLog`).
- **DO NOT** attempt to execute or invoke internal D-v2.0 private methods directly.
