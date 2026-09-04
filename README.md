# SOL Structural Lab — D-v2.0

> **Rigorous Structural Analysis and Epistemic Inspection for Software Repositories**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Epistemic Framework](https://img.shields.io/badge/Epistemic%20Core-5.2%20Frozen-emerald.svg)](#dual-architecture--theoretical-framework)
[![Integrity Checks](https://img.shields.io/badge/Integrity%20Checks-12%2F12%20Passing-brightgreen.svg)](#verification--testing-reality)

---

## What is SOL Structural Lab (D-v2.0)?

**SOL Structural Lab — D-v2.0** is an autonomous, deterministic structural analysis engine designed to evaluate software repositories with uncompromising epistemic discipline. It decomposes source code artifacts, audits structural contracts, and outputs machine-readable diagnostic reports (`lab_report.json`) where every claim is strictly classified by certainty: **`FACT`**, **`INFERENCE`**, **`UNKNOWN`**, **`AMBIGUOUS`**, or **`DISPUTED`**.

### Project Identity & Historical Lineage (LAB-G vs D-v2.0)

- **Current Release (D-v2.0):** This repository represents the standalone, public release of **SOL Structural Lab — D-v2.0**. It contains a self-contained execution pipeline (Contracts C1–C5), built-in integrity self-audit suites, and autonomous agent operational protocols.
- **Historical Lineage (LAB-G):** **LAB-G** (Laboratory Generation G) was the internal research prototype and experimental baseline from which D-v2.0 evolved. References to LAB-G in provenance notes and historical experiment registries denote this operational lineage. D-v2.0 is an autonomous, hardened implementation with strict 5.2 Core discipline, not merely a replica of LAB-G.

---

## The Problem: Epistemic Escalation in AI Agents

When autonomous AI coding and reasoning agents inspect unfamiliar codebases, they routinely suffer from **epistemic escalation**:
- **Hallucinating certainty**: Stating unverified architectural hypotheses as ground truth.
- **Conflating inferences with facts**: Promoting heuristic conclusions to verified invariants without checking source code.
- **Negative coercion**: Conflating unobserved properties (`UNKNOWN`) with non-existence (`FALSE`), falsely asserting that missing observations mean missing features.
- **Coordinate fabrication**: Inventing line numbers when exact source coordinates are absent.

**D-v2.0** provides a mathematically and epistemically hardened analytical boundary that prevents humans and autonomous agents from mistaking speculative inferences for verified evidence.

---

## Dual Architecture & Theoretical Framework

SOL Structural Lab is organized into clearly separated architectural layers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      CANONICAL STRUCTURAL LAYER                        │
│   4 Primitives: OBJECT | RELATION | CONSTRAINT | STATE                 │
│   4 Operators:  BIND   | SPLIT    | INSERT     | DELETE                │
│   9 Research Modes (Structural, Functional, Invariant Discovery, etc.)  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       5.2 EPISTEMIC CORE (FROZEN)                      │
│   5 Entities:   OBSERVATION | INFERENCE | UNKNOWN | DECISION | EVIDENCE│
│   5 Contracts:  C1 (Obs) → C2 (Dec) → C3 (Exec) → C4 (Evid) → C5 (Rep) │
│   7 Invariants: I1 (Obs≠Inf) | I2 (Dec Provenance) | I3 (Exec Purity)  │
│                 I4 (Out≠Evid)| I5 (Report Ground)  | I6 (Unk≠False)    │
│                 I7 (Inf≠Evid)                                          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 DETERMINISTIC PIPELINE & TOOLS LAYER                   │
│   Pipeline: C1 Profiling → C2 Planning → C3 Execution                  │
│             → C4 Validation → Inference Gen → C5 Synthesis Reporting   │
│   Analyzers: Deterministic Source-Structure Parser (TS/JS, Python)     │
│   Boundary: Local, read-only buffer inspection (Zero Mutation)         │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 EXPERIMENTAL & PROTOCOL EXTENSIONS                     │
│   DUAL_ANALYSIS: Experimental Research Operator (Status: HYPOTHESIS)   │
│   Tools Registry: Candidate Tools (e.g. two-heroes-tool: CANDIDATE)    │
│   Evaluation Protocol: DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0 (FROZEN)│
│   Benchmark Reference: Pre-annotated Gold Standard alignment matching  │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Structural & Canonical Layer (`src/canon/`)
Defines the universal ontology of structural systems:
- **4 Structural Primitives:** `OBJECT`, `RELATION`, `CONSTRAINT`, `STATE`.
- **4 Canonical Operators:** `BIND`, `SPLIT`, `INSERT`, `DELETE`.
- **9 Research Modes:** Including `STRUCTURAL_RECONSTRUCTION`, `FUNCTIONAL_RECONSTRUCTION`, `INVARIANT_DISCOVERY`, `ARCHITECTURAL_ATTACK`, and `SELF_AUDIT`.

### 2. Epistemic Core Layer (5.2 Frozen) (`src/core/`)
Maintains epistemological boundaries:
- **5 Epistemic Entities:** `OBSERVATION` (raw facts), `INFERENCE` (derived models), `UNKNOWN` (deliberate gaps), `DECISION` (audited actions), `EVIDENCE` (validated facts).
- **5 Pipeline Contracts:**
  - **C1 (Observation):** Profiling captures raw facts without speculation (`OBSERVATION ≠ INFERENCE`).
  - **C2 (Decision):** Analytical steps require explicit justification and provenance.
  - **C3 (Execution):** Analyzers emit raw telemetry without premature synthesis.
  - **C4 (Evidence):** Raw output is rejected from the Evidence tier without explicit validation (`OUTPUT ≠ EVIDENCE`).
  - **C5 (Report):** Diagnostic synthesis requires validated evidence grounding.
- **7 Epistemic Invariants (I1–I7):** Formal invariants enforced at runtime by `CoreInvariantsValidator`.

### 3. Pipeline & Deterministic Tooling (`src/pipeline/`, `src/tools/`)
- **`StructuralLabPipelineEngine`:** Orchestrates the C1–C5 pipeline end-to-end.
- **`SourceCodeAnalyzer`:** A **deterministic source-structure parser** utilizing regex, indentation tracking, and token heuristics to extract classes, interfaces, methods, imports, and call dependencies from TypeScript/JavaScript and Python files. *(Note: This is a fast, deterministic structural extractor, not a full compiler AST).*

### 4. Experimental Research Layer (`src/operators/`, `src/protocols/`)
- **`DUAL_ANALYSIS`:** An experimental multi-perspective operator comparing Analyst A (Topology focus) against Analyst B (Invariants focus). Treated strictly as an experimental hypothesis (`HYPOTHESIS`). Agreement between analysts does not imply truth.
- **Reference Gold Standard:** A pre-annotated benchmark dataset against which analyst outputs can be checked via keyword and structural alignment heuristics (not formal mathematical proofs).

---

## When Should an Agent Use D-v2.0?

An AI agent should invoke or consult D-v2.0 when:
- Conducting initial codebase reconnaissance to map top-level modules, contracts, and interfaces.
- Auditing architectural invariants, interface boundaries, and contract constraints.
- Requiring reliable file locators for targeted, safe source code inspection.
- Evaluating structural complementarity and potential contradictions across analytical passes.

## When Should an Agent NOT Use D-v2.0?

Do NOT use D-v2.0 when:
- Compiling, running dynamic unit tests, or debugging runtime memory faults.
- Requesting automated code refactoring, AST transformations, or automatic PR generation.
- Expecting a full compiler-level semantic type-checker across arbitrary niche languages.
- Looking for stylistic linting (use ESLint, Prettier, or Ruff instead).

---

## Epistemic Taxonomy for Autonomous Agents

Every finding emitted by D-v2.0 carries an explicit epistemic status:

| Status | Meaning | Agent Rule |
| :--- | :--- | :--- |
| **`FACT`** | Directly observed in source files without inference. | Accept as an established structural property. |
| **`INFERENCE`** | Synthesized interpretation or structural hypothesis. | **Never promote to FACT** without source inspection. |
| **`UNKNOWN`** | Attribute explicitly examined but unobserved. | **`UNKNOWN ≠ FALSE`**. Never treat as non-existent. |
| **`AMBIGUOUS`** | Multiple conflicting yet valid interpretations exist. | Preserve ambiguity; never guess or force a single view. |
| **`DISPUTED`** | Direct contradiction detected between analysis passes. | Contested claim; requires human review or independent check. |

### Essential Agent Rules:
1. **`UNKNOWN ≠ FALSE`**: If an interface return type or method is marked `UNKNOWN`, you must NOT assert that the method does not exist or returns void.
2. **`confidence: HIGH ≠ FACT`**: Analytical confidence measures contextual heuristic alignment. An inference remains an inference regardless of its confidence score.
3. **`null` Line Coordinates**: When an evidence item lists `line_start: null`, it represents a file-level locator (e.g. `src/auth/service.ts`). Inspect the file in the repository archive; do not invent fake line numbers.
4. **Absence is Not Proof of Absence**: Silence in `lab_report.json` does not guarantee the absence of an element in the codebase.

---

## Verification & Testing Reality

To ensure total transparency regarding testing and verification:

- **Built-in Automated Integrity Checks:** The project includes an automated self-audit engine (`src/testing/integrityTest.ts`) executing **12 automated checks**:
  - Verification of 5.2 Core frozen states.
  - Invariants I1, I2, I4, I6, I7 runtime enforcement.
  - Rule engine R1 and R2 evaluations.
  - End-to-end synthetic pipeline pass satisfying Contracts C1, C2, C3, C4, and C5.
  - DUAL_ANALYSIS hypothesis isolation and epistemic boundaries.
  - Candidate tool (`two-heroes-tool`) status preservation.
  - Dual Analysis Evaluation Protocol v1.0 immutability.
- **Running Integrity Checks:**
  ```bash
  npm test
  # or
  bun run test
  ```
- **Static Type Safety:**
  ```bash
  npm run lint
  # or
  bun run lint
  ```
- **External Test Runner Notice:** A dedicated external test framework (such as Jest or Vitest) is intentionally not bundled; validation relies on the built-in `BuildIntegrityTester`, TypeScript compilation (`tsc --noEmit`), and Vite production builds.

---

## Installation & Quick Start

The repository supports both **Node.js (npm)** and **Bun** runtimes:

### 1. Installation

Using npm:
```bash
git clone https://github.com/<your-org-or-username>/sol-structural-lab.git
cd sol-structural-lab
npm install
```

Using Bun:
```bash
bun install
```

### 2. Run Built-In Integrity Checks

```bash
npm test
# or
bun run test
```

### 3. Launch Development Workbench

```bash
npm run dev
# or
bun run dev
```

Open `http://localhost:3000` to access the interactive laboratory workbench.

### 4. Build Production Distribution

```bash
npm run build
# or
bun run build
```

---

## Autonomous Agent Quick-Start

```text
DISCOVER → UNDERSTAND PURPOSE → PREPARE INPUT → RUN D-v2.0 → READ lab_report.json → RESPECT EPISTEMIC STATUS → VERIFY IF NECESSARY → DECIDE NEXT ACTION
```

### Primary Output Artifacts

Every analysis run produces:
- **`lab_report.json`** (also downloadable as `analysis_result.json`): Primary machine-readable payload containing observations, inferences, unknowns, decisions, and evidence.
- **`analysis_report.md` / `.txt`**: Human- and LLM-readable diagnostic summaries.
- **Reproducibility Zip Package**: Bundle containing the input manifest, analyzer telemetry, and diagnostic logs.

---

## Documentation Index

- [**AGENT_GUIDE.md**](AGENT_GUIDE.md) — Comprehensive operational manual for autonomous AI coding and reasoning agents.
- [**TOOL_CARD.md**](TOOL_CARD.md) — Compact machine-readable tool summary and parameter specification.
- [**LAB_REPORT_SCHEMA.md**](LAB_REPORT_SCHEMA.md) — Complete JSON schema and field descriptions for `lab_report.json`.
- [**examples/**](examples/README.md) — Synthetic demonstration repository, authentic report sample, and agent decision logs.
- [**LICENSE**](LICENSE) — MIT License.
