# Context Drift Patterns

> I’m using AI agents to craft code in a rigorous fashion (not vibe-coding), in a Context
> Engineering / Harness engineering fashion. You’re an expert or both of those.
> Recap the 12 most important ways to detect / reduce context drift so that agentic worflows
> can Converge. Be concise and specific. For each item, give the pattern name, a quick summary
> of what it is and how to apply it.

Here’s a concise, actionable recap of the **12 most critical patterns** to detect and reduce
context drift in agentic workflows, ensuring convergence in Context/Harness Engineering:

---

## **1. Context Bounding**

**What:** Explicitly define the scope of context (inputs, outputs, constraints) for each agent.
**How:** Use structured schemas (e.g., JSON/YAML) to declare allowed inputs, outputs, and
invariants. Reject out-of-scope requests.

---

## **2. Prompt Anchoring**

**What:** Fix the core intent of a prompt to prevent semantic drift.
**How:** Embed a "north star" instruction (e.g., *"Always optimize for X"*) and validate agent
outputs against it.

---

## **3. State Snapshotting**

**What:** Capture the state of context at key milestones.
**How:** Log context (e.g., variables, decisions) at each agent handoff. Use diffs to detect
unintended changes.

---

## **4. Invariant Checking**

**What:** Enforce rules that must always hold (e.g., "Never modify X").
**How:** Automate runtime checks (e.g., assertions, type systems) to fail fast on violations.

---

## **5. Context Pruning**

**What:** Remove irrelevant or stale context to reduce noise.
**How:** Use relevance scoring (e.g., TF-IDF, embeddings) to filter context before passing it to agents.

---

## **6. Feedback Loops**

**What:** Continuously validate agent outputs against ground truth.
**How:** Integrate human-in-the-loop or automated tests (e.g., unit tests for agent outputs).

---

## **7. Deterministic Seeding**

**What:** Ensure reproducibility by controlling randomness.
**How:** Fix seeds for LLM sampling, tool calls, or data generation. Log seeds for debugging.

---

## **8. Context Versioning**

**What:** Track changes to context over time.
**How:** Version control context (e.g., Git for prompts, DVC for data) and roll back on drift.

---

## **9. Agent Isolation**

**What:** Limit agent interactions to minimize cascading drift.
**How:** Sandbox agents (e.g., separate environments, read-only access) and use message queues
for controlled communication.

---

## **10. Drift Metrics**

**What:** Quantify context drift (e.g., semantic distance, token divergence).
**How:** Use embeddings (e.g., cosine similarity) or hash-based diffs to measure drift between
context states.

---

## **11. Fallback Policies**

**What:** Define recovery actions for detected drift.
**How:** Implement retries, rollbacks, or escalation to human oversight when drift exceeds thresholds.

---

## **12. Canonical Examples**

**What:** Use gold-standard examples to anchor agent behavior.
**How:** Provide few-shot examples in prompts and validate new outputs against them
(e.g., "Does this match the style of Example A?").

---
**Key Insight:** Combine *preventive* (e.g., bounding, anchoring) and *detective* (e.g., metrics,
snapshots) patterns for robustness.
**Question:** Which of these patterns are you already using, and where do you see the biggest
gaps in your workflow?

> I’m surprised Condensation and Repeating Intent regularly are not in the list; are they implied
> by others? Or I’m making confusions?

You’re absolutely right to call out **Condensation** and **Repeating Intent**—they’re both
powerful and distinct patterns for combating context drift, and they’re *not* fully covered by the
previous 12. Here’s how they fit and differ:

---

## **Condensation**

**What:** Distill context into its minimal, essential form to reduce noise and ambiguity.
**How:** After each agent step, summarize the core state
(e.g., "Current goal: X. Constraints: Y. Open questions: Z.") and pass *only* this to the next
agent.
**Why it’s distinct:** Unlike *Context Pruning* (which removes irrelevant data), Condensation
actively *reinterprets* and *repackages* context to preserve intent while minimizing drift-prone
details.

---

## **Repeating Intent**

**What:** Explicitly restate the original goal or constraints at regular intervals.
**How:** Inject the "north star" intent (e.g., *"Remember: Optimize for latency, not cost"*) into
prompts or validation steps, especially after context transitions.
**Why it’s distinct:** While *Prompt Anchoring* fixes intent at the start, Repeating Intent
*re-injects* it dynamically to counteract drift during execution.

---

## **Overlap with the Original 12?**

- **Condensation** overlaps with *Context Pruning* and *State Snapshotting* but goes further by
  *transforming* context, not just filtering it.
- **Repeating Intent** overlaps with *Prompt Anchoring* but is *proactive* (repeats intent) vs.
  *passive* (relies on initial anchoring).

---
**Clarification:** They’re complementary, not redundant. If you’re using them, you’re likely
covering gaps in *semantic drift* (Condensation) and *long-horizon alignment*
(Repeating Intent).
**Question:** How are you currently applying these two in your workflows? Are they manual or automated?
