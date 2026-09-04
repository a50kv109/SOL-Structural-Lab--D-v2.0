# LAB-G / SOL Structural Lab v2.0

> **Rigorous Structural Analysis and Epistemic Inspection for Software Repositories**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Epistemic Framework](https://img.shields.io/badge/Epistemic%20Core-5.2%20Frozen-emerald.svg)](#epistemic-model)

---

## What is it?

**SOL Structural Lab (LAB-G)** is a deterministic structural analysis engine designed to evaluate software repositories with strict epistemic discipline. It extracts verifiable architectural facts, tests boundary invariants, and emits machine-readable reports (`lab_report.json`) where every claim is tagged with an explicit certainty level: **`FACT`**, **`INFERENCE`**, **`UNKNOWN`**, **`AMBIGUOUS`**, or **`DISPUTED`**.

## What problem does it solve?

When autonomous AI coding agents analyze large codebases, they frequently suffer from **epistemic escalation**:
- Hallucinating certainty about unverified code paths.
- Conflating speculative inferences with ground-truth facts.
- Mistaking unobserved properties (`UNKNOWN`) for non-existent ones (`FALSE`).
- Inventing code coordinates when exact lines are absent.

LAB-G provides a hardened analytical boundary that enforces invariant checks so neither human engineers nor autonomous agents can conflate hypotheses with verified evidence.

## When should an agent use it?

An AI agent should invoke or consult LAB-G when:
- Performing initial repository reconnaissance to identify core architectural modules and contracts.
- Auditing architectural invariants, interface boundaries, and contract constraints.
- Requiring reliable file loci for targeted, safe source code inspection.
- Evaluating competing structural hypotheses via dual-pass analysis (`DUAL_ANALYSIS`).

## When should an agent NOT use it?

Do NOT use LAB-G when:
- Compiling, running dynamic unit tests, or debugging runtime memory crashes.
- Requesting automated code refactoring, AST transformations, or PR creation.
- Expecting a universal full-codebase semantic index for arbitrary niche languages.
- Searching for subjective styling advice (use standard linters instead).

## How it works

LAB-G processes repositories through a 5-contract pipeline (**C1–C5**) governed by 7 hard epistemic invariants (**I1–I7**):
1. **C1 (Observation)**: Ingests raw repository data into purely factual observations (`OBSERVATION ≠ INFERENCE`).
2. **C2 (Decision)**: Filters and directs analytical passes with mandatory reason and provenance.
3. **C3 (Execution)**: Dispatches specialized analyzers yielding raw telemetry.
4. **C4 (Evidence)**: Validates raw output against source checks before admitting it as evidence (`OUTPUT ≠ EVIDENCE`).
5. **C5 (Report)**: Synthesizes validated evidence into a structured diagnostic report (`lab_report.json`).

## Input

LAB-G accepts:
- **Repository Source**: Full `.zip` archive (recommended for 100% corpus integrity) or public GitHub URL/branch.
- **Analysis Mode**:
  - `SINGLE`: Canonical 5.2 Core baseline analysis.
  - `DUAL_ANALYSIS`: Experimental dual-pass analysis (Analyst A Topology vs. Analyst B Invariants).

## Output

Every run produces:
- **`lab_report.json`** (also exported as `analysis_result.json`): Structured machine-readable findings with epistemic classifications.
- **`analysis_report.md` / `.txt`**: Formatted diagnostic reports.
- **Reproducibility Zip Bundle**: Self-contained archive including raw input manifests, pass telemetry, validation records, and report artifacts.

## Epistemic Model

LAB-G enforces a 5-tier classification across all reported items:

| Status | Meaning | Agent Rule |
| :--- | :--- | :--- |
| **`FACT`** | Directly observed in source files without inference. | Accept as established property. |
| **`INFERENCE`** | Derived interpretation or structural hypothesis. | **Never promote to FACT** without source proof. |
| **`UNKNOWN`** | Attribute explicitly checked but unobserved. | **`UNKNOWN ≠ FALSE`**. Never treat as non-existent. |
| **`AMBIGUOUS`** | Multiple conflicting yet valid interpretations exist. | Preserve ambiguity; do not guess. |
| **`DISPUTED`** | Contradiction between analytical passes. | Contested; requires independent resolution. |

## Quick Start

### Autonomous Agent Workflow (Zero-Overhead)

```text
DISCOVER → UNDERSTAND PURPOSE → PREPARE INPUT → RUN LAB-G → READ lab_report.json → RESPECT EPISTEMIC STATUS → VERIFY IF NECESSARY → DECIDE NEXT ACTION
```

### 1. Installation & Environment Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-org-or-username>/sol-structural-lab.git
cd sol-structural-lab
npm install
```

### 2. Development / Local Runner

Launch the interactive local analysis runner:

```bash
npm run dev
```

Open `http://localhost:3000` to access the operator interface.

### 3. Production Build & Validation

```bash
npm run lint    # Type check (tsc --noEmit)
npm run build   # Production Vite bundle
```

## Result Interpretation

When an autonomous agent consumes `lab_report.json`:
1. **Check Scope & Warnings**: Read `corpus_status` (`COMPLETE` vs `PARTIAL`) and `unknowns`.
2. **Accept `FACT`s**: Use factual observations as verified architectural anchors.
3. **Treat `INFERENCE`s as Hypotheses**: Even with `confidence: HIGH`, do not treat inferences as facts.
4. **Navigate via File Pointers**: Use `evidence.file` to inspect code directly in `repository.zip`. If line numbers are `null`, do not invent them; inspect the file independently.

## Limitations

- **Non-Exhaustive**: Absence from `lab_report.json` does **NOT** mean absence from the repository.
- **Static Scope**: Does not execute dynamic code or measure runtime throughput.
- **Single-Corpus Isolation**: Does not analyze third-party private remote dependencies not included in the source archive.

## Examples & Walkthroughs

See [`examples/`](examples/README.md) for:
- A minimal synthetic sample repository (`examples/sample-repository/`).
- An authentic sample report (`examples/lab_report.json`).
- A step-by-step autonomous agent decision log (`examples/agent_decision_log.md`).

## Documentation Index

- [**AGENT_GUIDE.md**](AGENT_GUIDE.md) — Canonical instructions for autonomous AI agents.
- [**TOOL_CARD.md**](TOOL_CARD.md) — Compact tool profile and quick-reference specifications.
- [**LAB_REPORT_SCHEMA.md**](LAB_REPORT_SCHEMA.md) — Complete JSON report schema and field definitions.
- [**LICENSE**](LICENSE) — MIT License.
