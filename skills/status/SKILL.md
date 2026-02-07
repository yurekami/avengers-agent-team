---
name: status
description: "Show Avengers team status dashboard - current phase, mission, agent states, and task progress."
user-invocable: true
---

# Status - Team Dashboard

## Overview

Display a comprehensive dashboard showing the current state of the Avengers team, including active phase, mission objectives, agent statuses, and task progress.

## Execution Protocol

### 1. Read State Files

Gather information from:
- `.avengers/state/phase.json` - Current workflow phase
- `.avengers/state/mission.json` - Mission North Star and objectives
- `.avengers/state/tasks.json` - Task queue and progress
- `.avengers/state/agents/*.json` - Individual agent states
- `.avengers/config.json` - Team configuration

### 2. Display Dashboard

Format output as a comprehensive status dashboard:

```
═══════════════════════════════════════════════════════════════
🛡️  AVENGERS TEAM STATUS DASHBOARD
═══════════════════════════════════════════════════════════════

📋 MISSION
  North Star: Build a scalable e-commerce platform that empowers
              small businesses to compete with enterprise retailers

  Defined by: Captain America
  Status: Active
  Phase: Tower Lab (Active Development)

───────────────────────────────────────────────────────────────

📍 CURRENT PHASE: Tower Lab
  Focus: Active development and iteration
  Duration: 2h 15m
  Progress: 12/20 tasks completed (60%)

  Next Phase: Battle of New York
  Exit Criteria: ⚠️ 2 of 4 criteria met
    ✓ Core features implemented
    ✓ Components integrated
    ✗ Integration tests written
    ✗ Performance baseline established

───────────────────────────────────────────────────────────────

👥 AGENT STATUS

  🎯 Nick Fury (Orchestrator)
     Status: ACTIVE
     Model: opus
     Current: Coordinating integration testing
     Tasks: 3 active, 12 completed
     Last Activity: 2m ago

  🛡️ Captain America (North Star)
     Status: IDLE
     Model: opus
     Current: Monitoring alignment
     Tasks: 0 active, 4 completed
     Last Activity: 45m ago

  🔧 Iron Man (Architect)
     Status: ACTIVE
     Model: sonnet
     Current: Reviewing API design
     Tasks: 2 active, 18 completed
     Last Activity: 5m ago

  🕷️ Spider-Man (Frontend)
     Status: ACTIVE
     Model: sonnet
     Current: Building product catalog UI
     Tasks: 4 active, 15 completed
     Last Activity: 1m ago

  ⚡ Thor (Backend)
     Status: ACTIVE
     Model: sonnet
     Current: Implementing payment gateway
     Tasks: 3 active, 14 completed
     Last Activity: 3m ago

  ⚖️ Thanos (Quality Assurance)
     Status: QUEUED
     Model: opus
     Current: Waiting for integration phase
     Tasks: 0 active, 8 completed
     Last Activity: 1h 20m ago

───────────────────────────────────────────────────────────────

📊 TASK BREAKDOWN

  Active Tasks (12):
    • [Spider-Man] Product catalog component
    • [Spider-Man] Shopping cart UI
    • [Spider-Man] Checkout flow
    • [Spider-Man] User dashboard
    • [Thor] Payment gateway integration
    • [Thor] Order processing API
    • [Thor] Inventory management
    • [Iron Man] API documentation
    • [Iron Man] Security review
    • [Fury] Integration test planning
    • [Fury] Performance monitoring setup
    • [Fury] Deployment pipeline

  Queued Tasks (8):
    • [Thanos] E2E testing suite
    • [Thanos] Performance benchmarking
    • [Thanos] Security audit
    • [Thor] Database optimization
    • [Spider-Man] Mobile responsiveness
    • [Spider-Man] Accessibility audit
    • [Iron Man] Code review backlog
    • [Cap] Mission alignment check

  Recently Completed (5):
    ✓ [Iron Man] Architecture design
    ✓ [Thor] Database schema
    ✓ [Spider-Man] Design system
    ✓ [Thor] Authentication service
    ✓ [Spider-Man] Navigation component

  Failed (1):
    ✗ [Thor] Third-party API integration
      Reason: API rate limits exceeded
      Retry: Scheduled

───────────────────────────────────────────────────────────────

⚡ TEAM VELOCITY

  Tasks/Hour: 3.2
  Completion Rate: 85%
  Active Agents: 4/6
  Parallel Efficiency: 78%

  Estimated Completion: 3h 45m (at current velocity)

───────────────────────────────────────────────────────────────

💡 RECOMMENDATIONS

  ⚠️ Spider-Man has 4 active tasks (high load)
     → Consider delegating 1-2 tasks to expansion agent

  ℹ️ Thanos idle for 1h 20m
     → Early integration testing could prevent late bugs

  ✓ Team velocity strong
     → Maintain current phase for 1-2 more hours

───────────────────────────────────────────────────────────────

Commands:
  /avengers-agent-team:phase next    - Advance to Battle of New York
  /avengers-agent-team:mission check - Verify alignment with North Star
  /avengers-agent-team:roster add    - Add expansion agents if needed

═══════════════════════════════════════════════════════════════
```

## Dashboard Sections

### 1. Mission Summary
- Display North Star statement
- Who defined it and when
- Current mission status
- Link to current phase

### 2. Phase Information
- Current phase name and focus
- How long in current phase
- Task completion percentage
- Exit criteria checklist
- Next phase preview

### 3. Agent Status
For each agent, display:
- Name and role with themed emoji
- Status (ACTIVE, IDLE, QUEUED, OFFLINE)
- Current model being used
- Current task or activity
- Task counts (active/completed)
- Last activity timestamp

**Status Indicators:**
- `ACTIVE` - Currently executing tasks
- `IDLE` - Available but not tasked
- `QUEUED` - Has pending tasks
- `OFFLINE` - Not currently spawned

**Agent Emojis:**
- Nick Fury: 🎯
- Captain America: 🛡️
- Iron Man: 🔧
- Spider-Man: 🕷️
- Thor: ⚡
- Thanos: ⚖️

### 4. Task Breakdown
- Active tasks with assignees
- Queued tasks in priority order
- Recently completed (last 5-10)
- Failed tasks with retry info

### 5. Team Velocity Metrics
Calculate and display:
- Tasks completed per hour
- Overall completion rate
- Number of active agents
- Parallel execution efficiency
- Estimated time to completion

### 6. Recommendations
Analyze state and provide actionable insights:
- Agent load balancing suggestions
- Phase transition readiness
- Bottleneck identification
- Resource allocation tips

## Data Collection

### Agent Status Determination

For each agent in `state/agents/`:

```javascript
const status = {
  ACTIVE: agent.current_task !== null && agent.last_active < 5 minutes ago,
  IDLE: agent.current_task === null && agent.status === "active",
  QUEUED: agent.current_task === null && tasks.queued includes agent,
  OFFLINE: agent.status === "inactive"
}
```

### Velocity Calculation

```javascript
const velocity = {
  tasksPerHour: completed_count / (current_time - phase_start) * 3600,
  completionRate: completed / (completed + failed) * 100,
  parallelEfficiency: actual_time / (total_time / active_agents) * 100
}
```

### Completion Estimate

```javascript
const remaining = active_tasks.length + queued_tasks.length
const avgTimePerTask = total_time / completed_count
const estimate = remaining * avgTimePerTask / active_agents
```

## Compact Mode

If user passes `--compact` or `-c` flag, show condensed version:

```
🛡️ AVENGERS STATUS

Phase: Tower Lab (60% complete, 2h 15m)
Mission: Build scalable e-commerce platform

Agents: 4/6 active
  ✓ Fury, Iron Man, Spider-Man, Thor
  ○ Cap (idle), Thanos (queued)

Tasks: 12 active, 8 queued, 32 completed, 1 failed
Velocity: 3.2 tasks/hour | ETA: 3h 45m

⚠️ Spider-Man overloaded (4 tasks)
ℹ️ Ready for Battle of New York in ~1-2h
```

## Real-Time Updates

If watching mode available (future feature), offer:
```
Watch mode: /avengers-agent-team:status --watch
Updates every 30 seconds. Press Ctrl+C to exit.
```

## Error Handling

- If `.avengers/` not initialized: "Run /avengers-agent-team:init first"
- If state files missing: Attempt to reconstruct from available data
- If no mission defined: Show "Mission not yet defined - run /avengers-agent-team:mission set"
- If agents never spawned: Show initialization status only

## Color Coding (if terminal supports)

- Green: Healthy metrics, completed tasks
- Yellow: Warnings, high load, attention needed
- Red: Failed tasks, blocked work, critical issues
- Blue: Informational, recommendations
- Gray: Idle agents, low priority items
