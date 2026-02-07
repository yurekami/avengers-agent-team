---
name: self-drive
description: "Activate Self-Driving Mode. Transforms the Avengers team into a continuous autonomous system where Fury delegates exclusively, workers provide structured handoffs, and the team maintains ~95% throughput with minimal human intervention."
user-invocable: true
---

# /self-drive - Activate Self-Driving Mode

> *"There was an idea... to build a system that could drive itself."*

## Overview

Self-Driving Mode transforms the Avengers team from a manually-coordinated unit into a continuous autonomous system. Fury becomes a strict Root Planner who never writes code, workers provide structured handoffs after every task, and the system maintains high throughput by accepting a small error budget.

## What Changes

1. **Fury enters strict delegate mode** - No coding tools. Only plan, delegate, review, route.
2. **Workers provide structured handoffs** - Every task completion includes DONE, TESTS, CONCERNS, DEVIATED, DISCOVERED, NEXT sections.
3. **Fury continuously creates follow-up tasks** - Processing handoffs immediately to keep the pipeline full.
4. **Error budget of 5% accepted** - Thanos tracks error rate and only escalates above threshold.
5. **File ownership strictly enforced** - Each agent owns specific file domains; no cross-domain edits.
6. **Task freshness maintained** - Fury rewrites task descriptions every 5-10 completions instead of appending.

## Activation Protocol

### Step 1: Verify Configuration

Check `.avengers/config.json` for self-driving settings. If not present, initialize with defaults:

```json
{
  "selfDriving": {
    "enabled": true,
    "errorBudget": 0.05,
    "taskTarget": { "min": 20, "max": 50 },
    "handoffEnforcement": "strict",
    "freshnessInterval": 10,
    "metricsTracking": true
  }
}
```

### Step 2: Spawn Fury in Self-Driving Mode

Spawn Nick Fury with the self-driving prompt addition:

```
Task(
  subagent_type="avengers-agent-team:fury",
  model="opus",
  prompt="SELF-DRIVING MODE ACTIVE. You are the Root Planner.

  CONSTRAINTS:
  - No coding. No editing files. Only delegate, review, plan.
  - Create 20-50 tasks initially based on the mission.
  - Process every handoff immediately upon receipt.
  - Rewrite task list every 10 completions with fresh context.
  - Accept 5% error budget - don't block for perfection.

  Mission: [user's mission description]

  Begin by creating the initial task list of 20-50 specific, scoped tasks.
  Each task must specify: deliverable, acceptance criteria, file scope, owning agent, and dependencies.

  'There was an idea... to build a system that could drive itself.'"
)
```

### Step 2b: Initialize Triage State

If triage is enabled, initialize the triage state:

```json
{
  "lastTriage": null,
  "history": []
}
```

Write to `.avengers/state/triage.json`.

### Step 3: Initialize Metrics Tracking

Create `.avengers/state/metrics.json`:

```json
{
  "tasksCreated": 0,
  "tasksCompleted": 0,
  "handoffsReceived": 0,
  "handoffCompleteness": 1.0,
  "errorRate": 0.0,
  "freshnessRewriteCount": 0,
  "startTime": null
}
```

### Step 3b: Initialize Velocity Tracking

If velocity tracking is enabled, initialize `.avengers/state/velocity.json`:

```json
{
  "entries": [],
  "summary": {
    "totalTasks": 0,
    "totalErrors": 0,
    "startTime": null,
    "lastUpdate": null,
    "currentAPM": 0,
    "currentTasksPerHour": 0,
    "errorRate": 0
  }
}
```

### Step 3c: Initialize Rules Engine

If rules engine is enabled, ensure domain rules are loaded and `.avengers/rules/` exists for project overrides.

### Step 4: Monitor and Report

The system runs continuously until:
- All tasks are complete and verified
- The user manually stops with `/avengers-agent-team:disassemble`
- Error rate exceeds 10% (automatic safety stop)

## Deactivation

Run `/avengers-agent-team:disassemble` or set `selfDriving.enabled = false` in config.

## Success Criteria

- Fury creates 20-50 initial tasks within the first interaction
- Workers provide complete handoffs (all 6 sections present)
- Handoff completeness rate > 90%
- Error rate stays within budget (< 5%)
- No agent idle time (tasks always queued)
- Task descriptions stay fresh (rewritten every 10 completions)

## Compatible Enhancements

- **Tech-Lead Mode** (`/tech-lead`): Adds human review loop on top of self-drive
- **Background Agents** (`/background`): Enables async task execution within self-drive
- **Velocity Tracking** (`/velocity`): Real-time APM and throughput metrics
- **Rules Engine** (`/rules`): Automated anti-slop checking on agent output
- **Triage** (`/triage`): Task classification before assignment
