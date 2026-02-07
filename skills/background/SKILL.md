---
name: background
description: "Background Agent Workflow - Launch agents in the background to work on tasks while you continue other work. Agents create branches, implement, test, and submit to review queue."
user-invocable: true
argument-hint: "[\"task description\"|status|cancel <id>]"
---

# /background - Background Mission Deployment

> *"I've got agents in the field you've never even heard of. They work while you sleep."*

## Overview

Background Mode launches agents to work on tasks asynchronously. Each agent gets a task, creates a feature branch, implements the solution, runs tests, and submits to the review queue - all while you continue other work.

## Subcommands

### `/background "task description"`

Launch a background agent for the given task.

**Workflow:**
1. Fury triages the task (Quick Strike / Solo Op / Full Assemble)
2. Assigns to the appropriate agent
3. Agent spawns with `run_in_background: true`
4. Agent creates a branch (`feat/<task-slug>`)
5. Agent implements the task
6. Agent runs tests
7. Completed work goes to review queue
8. You get notified when it's ready for review

**Example:**
```
/background "Add user profile page with avatar upload"
```

> "Deploying Spider-Man on a Solo Op - background mission. I'll notify you when the work's ready for review."

### `/background status`

Show all active and recently completed background missions:

```
╔══════════════════════════════════════════════════╗
║       BACKGROUND MISSIONS                        ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  ACTIVE                                          ║
║  ─────────────────────────────────────────────── ║
║  #1  Spider-Man | "Add user profile page"        ║
║      Branch: feat/user-profile-page              ║
║      Status: Implementing... (15 min elapsed)    ║
║      ─────────────────────────────────────────── ║
║  #2  Thor | "Add avatar upload API"              ║
║      Branch: feat/avatar-upload-api              ║
║      Status: Running tests... (8 min elapsed)    ║
║                                                  ║
║  COMPLETED (last 24h)                            ║
║  ─────────────────────────────────────────────── ║
║  #3  Thor | "Add /health endpoint"               ║
║      Branch: feat/health-endpoint                ║
║      Status: ✓ In review queue (#4)              ║
║                                                  ║
║  Active: 2/3 | Completed today: 1                ║
╚══════════════════════════════════════════════════╝
```

### `/background cancel <id>`

Cancel an active background mission.

> "Mission #1 aborted. Spider-Man, stand down and report what you have."

## How It Works

### Agent Spawning

Background agents are spawned using Claude Code's built-in Task background support:

```
Task(
  subagent_type="avengers-agent-team:<agent>",
  model="sonnet",
  prompt="BACKGROUND MISSION #<id>
    Task: <description>
    Branch: <branch-name>

    Protocol:
    1. Create branch: git checkout -b <branch>
    2. Implement the task
    3. Run tests and ensure they pass
    4. Provide structured handoff (DONE/TESTS/CONCERNS/DEVIATED/DISCOVERED/NEXT)

    CONSTRAINTS:
    - Stay within your file ownership scope
    - All tests must pass before reporting complete
    - Include test coverage in handoff

    'You have your orders. Execute.'",
  run_in_background=true
)
```

### Branch Management

- Branch naming: `<prefix><task-slug>` (e.g., `feat/user-profile-page`)
- Prefix configurable in config (default: `feat/`)
- Agent creates branch at start, commits work incrementally

### Completion Flow

1. Agent finishes and sends handoff
2. Handoff validator checks completeness
3. Metrics tracker updates velocity
4. Rules checker validates output
5. Work is added to review queue
6. User is notified

## Limits

- **Max concurrent**: 3 background agents (configurable)
- **Timeout**: Background agents have a natural turn limit from their agent definition
- **Conflicts**: If two agents need the same files, the second one queues until the first completes

## State Management

State stored in `.avengers/state/background.json`:

```json
{
  "activeMissions": [
    {
      "id": 1,
      "agent": "spiderman",
      "task": "Add user profile page",
      "branch": "feat/user-profile-page",
      "triageLevel": "manageable",
      "startedAt": "2026-02-07T10:00:00.000Z",
      "status": "implementing"
    }
  ],
  "completedMissions": [],
  "nextId": 2
}
```

## Integration

- **Triage**: Tasks are triaged before background assignment
- **Review queue**: Completed work automatically enters review queue
- **Tech-lead mode**: Background agents are the primary workers
- **Velocity**: Background completions tracked in metrics
- **File ownership**: Enforced even in background mode
