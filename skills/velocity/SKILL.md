---
name: velocity
description: "Velocity Metrics Dashboard - Display APM (actions per minute), tasks/hour, agent utilization, error rate trends, and token efficiency. Fury narrates the tactical readout."
user-invocable: true
---

# /velocity - Mission Velocity Dashboard

> *"I need real-time intel on team performance. Numbers don't lie, and neither do I."*

## Overview

The Velocity Dashboard provides Agent Performance Management (APM) metrics for the Avengers team. Track throughput, efficiency, and quality in real-time.

## Metrics Tracked

| Metric | Target | Description |
|--------|--------|-------------|
| **APM** | 0.5 | Actions (task completions) per minute |
| **Tasks/Hour** | 3.0 | Completed tasks per hour |
| **Utilization** | 75% | Percentage of time agents are active vs idle |
| **Error Rate** | <5% | Issues found per completed task |
| **Token Efficiency** | - | Tokens consumed per completed task |

## Dashboard Display

When invoked, display the velocity dashboard with Fury narrating:

```
╔══════════════════════════════════════════════════╗
║        S.H.I.E.L.D. VELOCITY REPORT             ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  APM:            0.45  ████████░░ (target: 0.5)  ║
║  Tasks/Hour:     2.8   ████████░░ (target: 3.0)  ║
║  Utilization:    72%   ███████░░░ (target: 75%)  ║
║  Error Rate:     3.2%  ██░░░░░░░░ (budget: 5%)  ║
║                                                  ║
║  MISSION ELAPSED: 2h 15m                         ║
║  TASKS COMPLETED: 7 / 35                         ║
║  AGENTS ACTIVE:   3 / 5                          ║
║                                                  ║
║  STATUS: ███ OPERATIONAL                         ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║  AGENT BREAKDOWN                                 ║
║  ─────────────────────────────────────────────── ║
║  Spider-Man:  3 tasks  │ 0.3 APM │ 1 error      ║
║  Thor:        2 tasks  │ 0.25 APM │ 0 errors    ║
║  Iron Man:    2 tasks  │ 0.2 APM │ 0 errors     ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║  TREND (last 30 min)                             ║
║  APM:        ↑ improving (+0.1)                  ║
║  Error Rate: → stable                            ║
║  Throughput: ↑ improving (+0.5 tasks/hr)         ║
╚══════════════════════════════════════════════════╝
```

## Fury's Commentary

Based on metrics, Fury provides tactical commentary:

**Healthy (APM > 0.3, Error < 3%):**
> "Team's running like a well-oiled helicarrier. Keep this pace, and we finish ahead of schedule."

**Warning (APM 0.15-0.3, Error 3-5%):**
> "We're slowing down. I need eyes on what's blocking the pipeline. Thanos, what's the error trend?"

**Critical (APM < 0.15, Error > 5%):**
> "All stop. Something's wrong. Error rate's climbing and throughput's dropping. I want a sitrep from every agent NOW."

## Data Source

Reads from `.avengers/state/velocity.json`:

```json
{
  "entries": [
    {
      "timestamp": "2026-02-07T10:30:00.000Z",
      "agent": "spiderman",
      "taskId": 1,
      "completionCount": 1,
      "runningAPM": 0.5,
      "errorsFound": 0
    }
  ],
  "summary": {
    "totalTasks": 7,
    "totalErrors": 1,
    "startTime": "2026-02-07T10:00:00.000Z",
    "lastUpdate": "2026-02-07T12:15:00.000Z",
    "currentAPM": 0.45,
    "currentTasksPerHour": 2.8,
    "errorRate": 0.032
  }
}
```

## Activation

- **Manual**: Run `/velocity` at any time
- **Automatic**: Fury reports every 10 completed tasks in self-driving mode
- **Integration**: Available in `/status` dashboard as a sub-section

## Thresholds and Alerts

| Condition | Action |
|-----------|--------|
| APM drops below 0.15 for 30min | Fury diagnoses bottleneck |
| Error rate exceeds 5% | Thanos escalates to Fury |
| Agent idle for 15min+ | Fury reassigns or investigates |
| All targets exceeded | Fury commends the team |
