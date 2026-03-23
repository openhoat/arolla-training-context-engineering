# Agent Skills Classification Quiz

> For a Context Engineering training for devs, I need an interactive quizz to quickly self assess
> which specific skills or instructions to put into agent.md files whether modular on-demand
> skills files.
> The quizz is for senior crafters (male or female) who do backend, frontend, modeling, object or
> FO design, Living Documentation, tests, BDD, TDD, SDD, product discovery and a little bit of
> Devops. Include professional attitudes.
> Give me a list of 30-40 concise concrete examples of instructions/knowledge, and for each the
> trainees will have to decide on whether to include that always in the agent.md, in a specific
> skills, or not mentioning it at all (few cases of the later only).

Here’s a concise, interactive quiz format with **35 concrete examples** of
instructions/knowledge relevant to senior crafters in your context. Each item is designed to spark
reflection on whether it belongs in **agent.md**, a **specific skill file**, or
**not mentioned at all**.

---

## **Context Engineering Quiz: Where Does This Belong?**

*For each item, decide:*

- **🔹 agent.md** (always include)
- **📁 skill/[specific].md** (modular/on-demand)
- **❌ Not mentioned** (rare, only if truly irrelevant)

---

### **1. Backend & Architecture**

1. **"Always use hexagonal architecture for new services."**
2. **"Prefer event sourcing for audit-critical domains."**
3. **"Avoid N+1 queries in database access layers."**
4. **"Use CQRS only after proving read/write separation is needed."**

### **2. Frontend**

1. **"Enforce a11y compliance (WCAG 2.1 AA) for all UI components."**
2. **"Use feature flags for gradual rollouts of UI changes."**
3. **"Avoid direct DOM manipulation; use React/Vue state management."**

### **3. Modeling & Design**

1. **"Model aggregates with clear invariants and transactional boundaries."**
2. **"Use DDD tactical patterns (Entity, Value Object, Repository)."**
3. **"Document ubiquitous language in a glossary.md."**
4. **"Avoid anemic domain models."**

### **4. Testing**

1. **"Write tests for behavior, not implementation (BDD style)."**
2. **"Use property-based testing for complex business rules."**
3. **"Mock external services, but never mock domain objects."**
4. **"Aim for 80%+ test coverage for critical paths."**

### **5. Documentation**

1. **"Update Living Documentation (e.g., ADRs, architecture diagrams) after major changes."**
2. **"Document API contracts with OpenAPI/Swagger."**
3. **"Add ‘Why’ comments in code for non-obvious decisions."**

### **6. DevOps & Practices**

1. **"Deploy to production only via CI/CD pipelines."**
2. **"Use infrastructure-as-code (Terraform/Ansible) for environments."**
3. **"Monitor SLIs/SLOs for user-facing services."**

### **7. Product & Discovery**

1. **"Use EventStorming for complex domain discovery."**
2. **"Prioritize user stories with impact/effort matrices."**
3. **"Validate assumptions with spike solutions before full implementation."**

### **8. Professional Attitudes**

1. **"Pair program for critical or unfamiliar tasks."**
2. **"Conduct blameless postmortems for incidents."**
3. **"Refactor mercilessly when code smells are detected."**
4. **"Challenge requirements if they conflict with quality standards."**

### **9. Cross-Cutting**

1. **"Use semantic commit messages (Conventional Commits)."**
2. **"Enforce branch protection rules (PR reviews, status checks)."**
3. **"Log structured events (JSON) for observability."**
4. **"Use feature toggles for incomplete or experimental features."**

### **10. Edge Cases**

1. **"Avoid hardcoding configuration; use environment variables."**
2. **"Validate inputs at API boundaries (never trust clients)."**
3. **"Document third-party dependencies and their licenses."**

---

### **How to Use This Quiz**

- **Individual/Group Exercise**: Have trainees categorize each item, then discuss disagreements.
- **Debrief**: Highlight patterns (e.g., "Most architecture rules go in agent.md, but
  tool-specific tips go in skills/").
- **Customize**: Add/remove items to match your team’s stack or priorities.

---
**Question for you**: Should I refine the categories further (e.g., split "Testing" into
TDD/BDD/SDD) or add more edge cases?

> Should all skills be also indexed in agent.md, or they’re sole existence is index?

Great question! The answer depends on **discoverability**, **maintainability**, and **context
clarity** for your team. Here’s a practical breakdown:

---

### **Option 1: Explicit Index in `agent.md`**

**Approach**: List all skills in `agent.md` (e.g., as a table or bullet list) with a
**brief description + link** to the skill file.
**Pros**:

- **Single source of truth**: Users can see the full scope of available skills at a glance.
- **Discoverability**: New team members (or the AI) can easily find relevant skills without
  digging through directories.
- **Consistency**: Ensures no skill is "hidden" or forgotten.

**Example**:

```markdown
## Available Skills
| Skill               | Description                          | File                     |
|---------------------|--------------------------------------|--------------------------|
| Hexagonal Arch      | Rules for service layering          | skills/hexagonal.md      |
| BDD Testing         | Gherkin + test automation guidelines | skills/bdd.md            |
```

**When to use**:

- If your team **frequently adds/removes skills**.
- If skills are **cross-cutting** (e.g., "Testing" might be referenced by backend *and* frontend devs).

---

### **Option 2: Implicit Index (Directory Structure Only)**

**Approach**: Rely on the **file system** (e.g., `/skills/`) as the index. `agent.md` only
references skills contextually (e.g., "For testing, see `skills/bdd.md`").
**Pros**:

- **Lower maintenance**: No need to update `agent.md` when adding/removing skills.
- **Flexibility**: Skills can be grouped into subdirectories (e.g., `/skills/testing/bdd.md`).

**Cons**:

- **Harder to discover**: Users must know to look in `/skills/` or rely on search tools.
- **Risk of fragmentation**: Skills might be overlooked if not explicitly linked.

**When to use**:

- If your team **rarely changes skills** and has a **stable, well-known structure**.
- If you use **tooling** (e.g., a CLI or IDE plugin) to auto-index the `/skills/` directory.

---

### **Option 3: Hybrid Approach (Recommended)**

**Approach**:

1. **`agent.md`** contains a **high-level index** of *key* or *frequently used* skills
   (e.g., core architecture, testing, DevOps).
2. **`/skills/README.md`** (or similar) lists **all skills** with descriptions/links.
3. **Contextual references**: `agent.md` links to specific skills where relevant
   (e.g., "For event sourcing, see [skills/event-sourcing.md]").

**Example**:

```markdown
# agent.md
## Core Guidelines
- Always use hexagonal architecture ([see skills/hexagonal.md](skills/hexagonal.md)).
- For testing, follow BDD ([skills/bdd.md](skills/bdd.md)) or TDD ([skills/tdd.md](skills/tdd.md)).

## Full Skills Index
See [skills/README.md](skills/README.md) for the complete list.
```

**Pros**:

- Balances **discoverability** and **maintainability**.
- Keeps `agent.md` **focused** while ensuring nothing is lost.

**When to use**:

- **Default choice** for most teams. Scales well with 20–100+ skills.

---

### **Key Considerations**

1. **AI Context Windows**:
    - If your AI assistant has a **limited context window**, explicitly indexing critical skills in
      `agent.md` ensures they're always "in scope" during prompts.
    - For less critical skills, a directory-based approach may suffice.

2. **Team Onboarding**:
    - New hires benefit from a **central index** (Option 1 or 3). Veterans might prefer
      **implicit indexing** (Option 2).

3. **Tooling**:
    - If you use a **static site generator** (e.g., MkDocs, Docusaurus) or **search tool**
      (e.g., `ripgrep`, VS Code search), implicit indexing (Option 2) becomes more viable.

4. **Skill Granularity**:
    - **Broad skills** (e.g., "Testing") → Index in `agent.md`.
    - **Niche skills** (e.g., "Property-Based Testing with Hypothesis") → Directory only.

---

### **Suggested Action**

Start with the **hybrid approach (Option 3)**:

- Add a **curated list** of 5–10 core skills in `agent.md`.
- Maintain a **full index** in `skills/README.md`.
- Iterate based on team feedback (e.g., if people keep asking "Where’s the X skill?", add it to `agent.md`).

---
**Question for you**:
Does your team already have a convention for documenting skills, or is this a greenfield setup?
That might influence which option fits best.
