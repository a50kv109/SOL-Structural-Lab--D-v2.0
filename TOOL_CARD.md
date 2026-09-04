# TOOL CARD: SOL Structural Lab (D-v2.0)

```yaml
TOOL: SOL Structural Lab — D-v2.0 (Historical Lineage: LAB-G)
PURPOSE: Rigorous structural and invariant inspection of software source repositories with strict epistemic discipline.
BEST FOR:
  - Extracting verifiable architectural observations (FACTs) from TypeScript/JavaScript and Python codebases via deterministic source-structure parsing.
  - Detecting invariant violations, contract mismatches, and boundary contradictions.
  - Generating structured analytical reports with segregated epistemic confidence.
  - Providing file-level pointers for targeted autonomous agent source code inspection.
NOT FOR:
  - Universal full-compiler AST semantic indexing or arbitrary language execution.
  - Automated refactoring, code editing, or unsupervised pull-request generation.
  - Direct execution of arbitrary repository test suites or build runners.
  - Replacing manual human code review or independent agent source verification.
INPUT:
  - Source Code Repository: Full `.zip` archive (recommended for 100% corpus integrity) OR public GitHub repository URL/branch.
  - Execution Mode: `SINGLE` (5.2 Core baseline analysis) OR `DUAL_ANALYSIS` (Hypothesis testing: Analyst A Topology vs Analyst B Invariants).
OUTPUT:
  - `lab_report.json` (also downloadable as `analysis_result.json`): Structured machine-readable findings tagged with epistemic statuses (`FACT`, `INFERENCE`, `UNKNOWN`, `AMBIGUOUS`, `DISPUTED`).
  - `analysis_report.md` / `analysis_report.txt`: Human- and LLM-readable diagnostic report summaries.
  - Structured Zip Package: Complete bundle including raw input manifests, pass telemetry, and reproducibility hashes.
AGENT INTERACTION:
  - Autonomous consumption via `lab_report.json` alongside `repository.zip`.
  - Zero requirement to parse internal `PipelineExecutionLog`.
  - Navigation via `evidence.file` targets for independent agent source checks.
EVIDENCE MODEL:
  - Contract C4: Raw tool output is NEVER accepted as evidence without validation (`OUTPUT ≠ EVIDENCE`).
  - Coordinates: File paths with optional line start/end. When lines are `null`, file serves as navigational pointer.
EPISTEMIC MODEL:
  - 5-Tier Epistemic Taxonomy: FACT, INFERENCE, UNKNOWN, AMBIGUOUS, DISPUTED.
  - Invariant I1: `OBSERVATION ≠ INFERENCE` (pure observations cannot contain speculative verbs).
  - Invariant I6: `UNKNOWN ≠ FALSE` (absence of evidence is never coerced to boolean false).
  - Invariant I7: `INFERENCE ≠ EVIDENCE` (inferences cannot be promoted to facts without source proof).
PARSER IMPLEMENTATION:
  - Local deterministic source-structure parser (regex, token, and indentation heuristics; not a full compiler AST).
VERIFICATION REALITY:
  - Built-in runtime integrity suite (`src/testing/integrityTest.ts`) with 12 automated checks covering 5.2 invariants, contracts C1-C5, and negative cases.
  - Executable via `npm test` or `bun run test`.
MAIN STRENGTH:
  - Immune to hallucinated certainty: enforces hard epistemic guardrails so derived interpretations cannot masquerade as ground truth.
MAIN LIMITATION:
  - Non-exhaustive: silence in the report does NOT imply absence from the repository.
TRUST MODEL:
  - FACT: High trust, directly observed from source data.
  - INFERENCE: Analytical hypothesis; trust conditionally; requires independent source verification before mission-critical reliance.
  - UNKNOWN: Zero trust; marks unanalyzed or indeterminate areas. Never treat as false.
COMPLEMENTARY TO:
  - Static linters, security SAST scanners, unit/e2e test suites, and autonomous coding agents performing local source edits.
QUICK START:
  DISCOVER → UNDERSTAND PURPOSE → PREPARE INPUT → RUN D-v2.0 → READ lab_report.json → RESPECT EPISTEMIC STATUS → VERIFY IF NECESSARY → DECIDE NEXT ACTION
```
