# Workspace Organization Structure

**Last Updated:** March 18, 2026

---

## Directory Layout

```
oscarolg-portfolio/
├── .github/
│   ├── agents/
│   │   └── portfolio-dev.agent.md          # Custom maintenance agent for this project
│   └── reports/
│       ├── ISSUE-data-inconsistency-analysis.md           # Problem analysis
│       └── SOLUTION-unified-data-implementation.md        # Implementation details
├── scripts/
│   ├── seed*.mjs                           # Content seeding scripts
│   └── upload*.mjs                         # Portfolio upload scripts
├── src/
│   ├── app/                                # Next.js app routes
│   ├── lib/                                # Utilities (Sanity client, queries, pricing)
│   ├── types/                              # TypeScript definitions
│   └── contexts/                           # React contexts (Language)
├── sanity/
│   └── schemaTypes/                        # Sanity CMS schemas
└── [project config files]
```

---

## Files in `.github/agents/`

### `portfolio-dev.agent.md`
- **Purpose:** Custom agent definition for portfolio maintenance
- **Usage:** Loaded automatically by VS Code Copilot when working in this project
- **Contains:**
  - Project tech stack and architecture overview
  - Core scripts reference (seeding, uploads, translations)
  - Common maintenance task workflows
  - File structure knowledge base
  - Interaction guidelines and best practices

---

## Files in `.github/reports/`

### `ISSUE-data-inconsistency-analysis.md`
- **Purpose:** Detailed analysis of the data inconsistency bug
- **Contents:**
  - Root cause analysis (duplicate data sources)
  - Specific price mismatches found
  - Additional issues (orphaned components, stale data)
  - Recommended solutions (Options A & B)
  - Implementation roadmap

**When to Read:** To understand what the problem was before it was fixed

---

### `SOLUTION-unified-data-implementation.md`
- **Purpose:** Technical summary of the implemented fix
- **Contents:**
  - Changes made to each file
  - Data architecture improvements
  - Testing checklist
  - Benefits of the changes
  - Deployment notes and next steps

**When to Read:** To see what was changed and verify the implementation

---

## How to Use

### For Maintenance Tasks
1. Open the project in VS Code
2. Copilot automatically picks up `.github/agents/portfolio-dev.agent.md`
3. Mention it's a portfolio maintenance task
4. Agent provides contextual guidance based on the knowledge base

### For Problem Reference
1. Consult `ISSUE-data-inconsistency-analysis.md` for context on what the bug was
2. Reference `SOLUTION-unified-data-implementation.md` for implementation details
3. Use as onboarding for new developers on why the architecture is this way

---

## Future Organization

Consider adding to `.github/reports/` as you document:
- `BUG-*.md` — Bug fixes and their solutions
- `FEATURE-*.md` — New feature implementations
- `REFACTOR-*.md` — Code restructuring efforts
- `DEPLOYMENT-*.md` — Deployment guides and notes

This keeps the project history organized and accessible.

---

## Quick Links

- **Agent:** [`.github/agents/portfolio-dev.agent.md`](.github/agents/portfolio-dev.agent.md)
- **Issue Report:** [`.github/reports/ISSUE-data-inconsistency-analysis.md`](.github/reports/ISSUE-data-inconsistency-analysis.md)
- **Solution Report:** [`.github/reports/SOLUTION-unified-data-implementation.md`](.github/reports/SOLUTION-unified-data-implementation.md)
