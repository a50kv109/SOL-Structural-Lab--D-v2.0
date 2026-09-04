# SOL Structural Lab Examples & Reference Walkthroughs

This folder contains reference materials and walkthroughs demonstrating how an external autonomous AI agent consumes SOL Structural Lab (LAB-G) outputs.

---

## Folder Contents

| File / Folder | Purpose |
| :--- | :--- |
| **`sample-repository/`** | Minimal, self-contained **synthetic** micro-repository demonstrating a TypeScript authentication service. |
| **`lab_report.json`** | Canonical output emitted by SOL LAB for `sample-repository/`, featuring `FACT`, `INFERENCE`, `UNKNOWN`, and `null` evidence coordinates. |
| **`agent_decision_log.md`** | Detailed decision trace illustrating how an autonomous agent consumes `lab_report.json` safely without epistemic escalation or evidence fabrication. |

---

## Key Principles Demonstrated in the Example

1. **Epistemic Segregation**: Factual observations (`FACT`) are kept distinct from structural deductions (`INFERENCE`).
2. **`confidence: HIGH` Guard**: The agent treats an inference as a hypothesis even when labeled with high confidence.
3. **`null` Coordinate Handling**: Missing line numbers are not fabricated; the agent treats the file path as a pointer to the source corpus.
4. **`UNKNOWN ≠ FALSE`**: Unestablished properties (e.g. rate limiting) are not assumed to be absent or false.
5. **Independent Verification**: When the agent inspects the code to confirm hypotheses, it clearly distinguishes its new independent evidence from LAB-supplied evidence.
