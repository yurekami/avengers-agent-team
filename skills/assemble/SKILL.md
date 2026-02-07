---
name: assemble
description: "Assemble the Avengers team for a mission. Spawns Nick Fury as orchestrator who coordinates all 6 agents for your project."
user-invocable: true
---

# Assemble - Avengers Assemble!

## Overview

This command activates the full Avengers team for a project mission. Nick Fury takes command as the orchestrator and coordinates all 6 core agents.

## Execution Protocol

### 1. Mission Briefing

Ask the user for their project mission description. Key questions:
- What are you building?
- What problem does it solve?
- What are the key deliverables?
- What are the critical constraints (timeline, tech stack, etc.)?

### 2. Spawn Nick Fury (Orchestrator)

Use the Task tool to spawn Nick Fury:

```
Task(
  subagent_type="avengers-agent-team:fury",
  model="opus",
  prompt="Mission briefing: [user's mission description]. Coordinate the Avengers team through the following phases:

  1. Define North Star with Captain America
  2. Draft architecture with Iron Man
  3. Assign implementation domains to Spider-Man and Thor
  4. Brief Thanos on quality expectations
  5. Set initial phase to 'S.H.I.E.L.D. Briefing Room'

  Initialize team state in .avengers/state/ and begin coordination."
)
```

### 3. State Initialization

Nick Fury will create:
- `.avengers/state/mission.json` - Mission definition and North Star
- `.avengers/state/phase.json` - Current workflow phase
- `.avengers/state/agents/` - Individual agent states
- `.avengers/state/tasks.json` - Task queue and assignments

### 4. Team Activation Sequence

Nick Fury coordinates the following sequence:

**Phase 1: Mission Definition (Captain America)**
- Spawn Captain America to define the North Star
- Establish WHY the team is building this
- Document mission objectives clearly

**Phase 2: Architecture Design (Iron Man)**
- Spawn Iron Man to draft system architecture
- Design technical foundation
- Identify key components and integration points

**Phase 3: Domain Assignment**
- Assign frontend/user-facing work to Spider-Man
- Assign backend/infrastructure work to Thor
- Both agents review architecture and confirm understanding

**Phase 4: Quality Standards (Thanos)**
- Brief Thanos on acceptable quality thresholds
- Establish verification criteria
- Set up monitoring checkpoints

### 5. Transition to Active Development

Once briefing is complete, transition phase to "Tower Lab" (active development).

## Success Criteria

- All 6 agents spawned and briefed
- Mission North Star clearly defined
- Architecture documented
- Work domains assigned
- Quality standards established
- Phase set to "Tower Lab" for development

## Output Format

Display an Avengers-themed activation message:

```
🛡️ AVENGERS ASSEMBLED 🛡️

Mission: [mission summary]
Phase: S.H.I.E.L.D. Briefing Room → Tower Lab

ACTIVE ROSTER:
✓ Nick Fury (Orchestrator) - Mission Command
✓ Captain America (North Star) - Mission defined
✓ Iron Man (Architect) - Architecture ready
✓ Spider-Man (Frontend) - Domain assigned
✓ Thor (Backend) - Domain assigned
✓ Thanos (Quality) - Standards set

Ready for deployment. Good luck, team.
```

## Error Handling

- If Agent Teams feature not enabled, instruct user to run `/avengers-agent-team:setup` first
- If `.avengers/` directory doesn't exist, run `/avengers-agent-team:init` first
- If agents fail to spawn, check Claude Code experimental features are enabled
