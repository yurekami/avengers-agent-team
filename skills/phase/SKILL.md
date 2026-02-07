---
name: phase
description: "View or transition workflow phases. Phases: Briefing Room > Tower Lab > Battle of New York > Endgame Deploy."
user-invocable: true
argument-hint: "[next|briefing|lab|battle|deploy|status]"
---

# Phase - Workflow Phase Management

## Overview

Manage the Avengers team workflow phases. Each phase represents a distinct stage of the development lifecycle with specific agent focuses and activities.

## Workflow Phases

### 1. S.H.I.E.L.D. Briefing Room
**Focus:** Mission definition, planning, and architecture

**Active Agents:**
- Nick Fury: Mission coordination
- Captain America: North Star definition
- Iron Man: Architecture design

**Activities:**
- Define mission objectives
- Establish success criteria
- Design system architecture
- Plan implementation approach

**Exit Criteria:**
- Mission North Star documented
- Architecture approved
- Work domains assigned
- All agents briefed

### 2. Tower Lab
**Focus:** Active development and iteration

**Active Agents:**
- Spider-Man: Frontend implementation
- Thor: Backend implementation
- Iron Man: Technical guidance
- Nick Fury: Coordination

**Activities:**
- Feature implementation
- Component development
- API creation
- Iterative refinement

**Exit Criteria:**
- Core features implemented
- Components integrated
- Ready for comprehensive testing

### 3. Battle of New York
**Focus:** Integration, testing, and quality assurance

**Active Agents:**
- Thanos: Quality verification
- All developers: Bug fixes
- Iron Man: Integration oversight

**Activities:**
- Integration testing
- Bug identification and fixes
- Performance optimization
- Security review

**Exit Criteria:**
- All tests passing
- No critical bugs
- Performance acceptable
- Security validated

### 4. Endgame Deploy
**Focus:** Deployment, monitoring, and mission completion

**Active Agents:**
- Thor: Deployment infrastructure
- Nick Fury: Mission oversight
- Thanos: Post-deploy verification

**Activities:**
- Production deployment
- Monitoring setup
- Documentation finalization
- Mission debrief

**Exit Criteria:**
- Successfully deployed
- Monitoring active
- Documentation complete
- Mission objectives achieved

## Execution Protocol

### Command Syntax

```
/avengers-agent-team:phase [command]
```

**Commands:**
- `status` - Show current phase (default if no argument)
- `next` - Transition to next sequential phase
- `briefing` - Jump to S.H.I.E.L.D. Briefing Room
- `lab` - Jump to Tower Lab
- `battle` - Jump to Battle of New York
- `deploy` - Jump to Endgame Deploy

### 1. Status Display

If no argument or `status`, display current phase:

```
📍 CURRENT PHASE: Tower Lab

Focus: Active development and iteration
Active Since: [timestamp]

Active Agents:
  • Spider-Man (Frontend) - Working on UI components
  • Thor (Backend) - Building API endpoints
  • Iron Man (Architect) - Code review
  • Nick Fury (Orchestrator) - Coordination

Next Phase: Battle of New York
Progress: 12/20 tasks completed (60%)

To advance: /avengers-agent-team:phase next
```

### 2. Next Phase Transition

If argument is `next`, transition to next sequential phase:

**Process:**
1. Read current phase from `.avengers/state/phase.json`
2. Verify exit criteria for current phase (warn if incomplete)
3. Update phase.json with new phase and transition timestamp
4. Add phase transition to history
5. Display narrated transition message
6. Notify relevant agents of phase change

**Narration Examples:**

*Briefing Room → Tower Lab:*
```
🚀 PHASE TRANSITION

Captain America: "We know what we're building and why. Team, let's move to the Tower."

Nick Fury: "Iron Man, Spider-Man, Thor - you're cleared for active development. I want regular status updates."

📍 NEW PHASE: Tower Lab
Focus: Active development and iteration

Team assignments updated. Begin implementation.
```

*Tower Lab → Battle of New York:*
```
⚔️ PHASE TRANSITION

Iron Man: "Core systems are operational. Time to see if they hold together under pressure."

Thanos: "Finally. Let me test if your work is... perfectly balanced."

📍 NEW PHASE: Battle of New York
Focus: Integration, testing, and quality assurance

All hands on deck. Thanos has the floor.
```

*Battle of New York → Endgame Deploy:*
```
🎯 PHASE TRANSITION

Thanos: "Quality standards met. This... does put a smile on my face."

Nick Fury: "Thor, prep for deployment. Everyone else, final checks. We get one shot at this."

📍 NEW PHASE: Endgame Deploy
Focus: Deployment, monitoring, and mission completion

Final phase. Make it count.
```

### 3. Direct Phase Jump

If argument is a specific phase name:

**Process:**
1. Validate phase name
2. Check if skipping phases (warn user)
3. Confirm with user if skipping
4. Update phase.json
5. Display transition message

**Skip Warning Example:**
```
⚠️ PHASE SKIP WARNING

You're jumping from "S.H.I.E.L.D. Briefing Room" to "Battle of New York"

Skipping:
  • Tower Lab (Active development)

This may cause issues if:
  - Features aren't implemented yet
  - Components not integrated
  - Architecture not validated

Continue anyway? [y/N]
```

### 4. State File Updates

Update `.avengers/state/phase.json`:

```json
{
  "current": "Tower Lab",
  "previous": "S.H.I.E.L.D. Briefing Room",
  "transitioned_at": "2025-01-15T10:30:00Z",
  "history": [
    {
      "phase": "S.H.I.E.L.D. Briefing Room",
      "entered": "2025-01-15T09:00:00Z",
      "exited": "2025-01-15T10:30:00Z",
      "duration_minutes": 90
    }
  ],
  "exit_criteria_met": true,
  "skipped_phases": []
}
```

### 5. Agent Notifications

For each active agent in the new phase, update their state file to reflect phase change and new focus areas.

## Phase-Specific Behaviors

### Briefing Room
- Restrict implementation tasks (planning only)
- Require mission definition before exit
- Architecture review mandatory

### Tower Lab
- Enable parallel development
- Regular progress check-ins
- Code review on all changes

### Battle of New York
- All changes require tests
- Thanos approval required
- Integration tests mandatory

### Endgame Deploy
- Deployment checklist required
- Rollback plan mandatory
- Post-deploy monitoring

## Error Handling

- If `.avengers/` not initialized, prompt to run `/avengers-agent-team:init`
- If invalid phase name, show valid options
- If phase transition prerequisites not met, warn but allow override
- If state file corrupted, attempt recovery from history

## Output Formatting

Use Avengers-themed formatting:
- Shield emoji (🛡️) for status
- Rocket (🚀) for forward transitions
- Warning (⚠️) for skips/issues
- Target (🎯) for deployment phase
- Crossed swords (⚔️) for testing phase
