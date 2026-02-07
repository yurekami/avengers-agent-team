---
name: init
description: "Initialize Avengers team configuration for the current project. Creates .avengers/ directory with team config, roster, and project template."
user-invocable: true
---

# Init - Project Initialization

## Overview

Initialize the Avengers team workspace for the current project. Creates configuration structure and prepares the team for assembly.

## Execution Protocol

### 1. User Interview

Ask the user about their project:

**Project Type:**
- `web-app` - Web application (frontend + backend)
- `cli-tool` - Command-line tool
- `data-pipeline` - Data processing/ETL
- `mobile-app` - Mobile application
- `library` - Reusable library/package
- `api-service` - API/microservice
- `custom` - Custom configuration

**Additional Context:**
- Primary programming language(s)
- Expected team size (solo, small team, large team)
- Development phase (greenfield, existing codebase, legacy migration)

### 2. Create Directory Structure

Create the following structure in the current working directory:

```
.avengers/
├── config.json          # Team configuration
├── roster.json          # Active agent roster
├── state/               # Runtime state
│   ├── mission.json
│   ├── phase.json
│   ├── tasks.json
│   └── agents/
│       ├── fury.json
│       ├── cap.json
│       ├── ironman.json
│       ├── spiderman.json
│       ├── thor.json
│       └── thanos.json
├── debriefs/            # Mission debriefs
├── architecture/        # Iron Man's designs
└── AGENTS.md            # Team documentation
```

### 3. Generate config.json

Based on project type, create configuration:

```json
{
  "project": {
    "name": "[detected from package.json or ask user]",
    "type": "[user selection]",
    "languages": ["[user input]"],
    "phase": "initialization"
  },
  "team": {
    "size": "[user input]",
    "active_agents": ["fury", "cap", "ironman", "spiderman", "thor", "thanos"],
    "expansion_agents": []
  },
  "workflow": {
    "current_phase": "pre-briefing",
    "phases": [
      "S.H.I.E.L.D. Briefing Room",
      "Tower Lab",
      "Battle of New York",
      "Endgame Deploy"
    ]
  },
  "settings": {
    "auto_assemble": false,
    "parallel_execution": true,
    "quality_gate_required": true,
    "debrief_on_completion": true
  }
}
```

### 4. Generate roster.json

Core 6 agents template:

```json
{
  "core": {
    "fury": {
      "name": "Nick Fury",
      "role": "Orchestrator",
      "model": "opus",
      "status": "inactive",
      "capabilities": ["coordination", "strategic_planning", "mission_control"]
    },
    "cap": {
      "name": "Captain America",
      "role": "North Star",
      "model": "opus",
      "status": "inactive",
      "capabilities": ["vision", "alignment", "mission_definition"]
    },
    "ironman": {
      "name": "Iron Man",
      "role": "Architect",
      "model": "sonnet",
      "status": "inactive",
      "capabilities": ["architecture", "system_design", "technical_innovation"]
    },
    "spiderman": {
      "name": "Spider-Man",
      "role": "Frontend Developer",
      "model": "sonnet",
      "status": "inactive",
      "capabilities": ["ui", "ux", "client_side", "user_interaction"]
    },
    "thor": {
      "name": "Thor",
      "role": "Backend Developer",
      "model": "sonnet",
      "status": "inactive",
      "capabilities": ["server", "database", "api", "infrastructure"]
    },
    "thanos": {
      "name": "Thanos",
      "role": "Quality Assurance",
      "model": "opus",
      "status": "inactive",
      "capabilities": ["verification", "testing", "quality_control"]
    }
  },
  "expansion": {}
}
```

### 5. Initialize State Files

Create empty/default state files:

**state/mission.json:**
```json
{
  "north_star": null,
  "objectives": [],
  "constraints": [],
  "success_criteria": [],
  "defined_by": null,
  "defined_at": null
}
```

**state/phase.json:**
```json
{
  "current": "pre-briefing",
  "history": [],
  "transitioned_at": null
}
```

**state/tasks.json:**
```json
{
  "active": [],
  "queued": [],
  "completed": [],
  "failed": []
}
```

**state/agents/*.json:**
Each agent gets an initial state file:
```json
{
  "agent_id": "[agent_name]",
  "status": "inactive",
  "current_task": null,
  "tasks_completed": 0,
  "last_active": null
}
```

### 6. Generate AGENTS.md

Create project-specific agent documentation:

```markdown
# Avengers Agent Team

## Project: [Project Name]
Type: [Project Type]

## Active Roster

### Nick Fury - Orchestrator
**Model:** Opus
**Role:** Mission Command & Coordination
**Responsibilities:**
- Coordinate all agents
- Manage task distribution
- Monitor mission progress
- Strategic decision-making

### Captain America - North Star
**Model:** Opus
**Role:** Vision & Alignment
**Responsibilities:**
- Define mission purpose (WHY)
- Maintain alignment with goals
- Resolve priority conflicts
- Keep team focused

### Iron Man - Architect
**Model:** Sonnet
**Role:** System Design
**Responsibilities:**
- Design architecture
- Technical innovation
- Integration planning
- Code quality standards

### Spider-Man - Frontend Developer
**Model:** Sonnet
**Role:** User Experience
**Responsibilities:**
- UI implementation
- User interaction
- Frontend optimization
- Accessibility

### Thor - Backend Developer
**Model:** Sonnet
**Role:** Infrastructure & APIs
**Responsibilities:**
- Server-side logic
- Database design
- API development
- Performance optimization

### Thanos - Quality Assurance
**Model:** Opus
**Role:** Verification & Testing
**Responsibilities:**
- Test everything
- Quality gates
- Bug detection
- Performance validation

## Workflow Phases

1. **S.H.I.E.L.D. Briefing Room** - Mission definition & planning
2. **Tower Lab** - Active development & iteration
3. **Battle of New York** - Integration & testing
4. **Endgame Deploy** - Deployment & monitoring

## Commands

- `/avengers-agent-team:assemble` - Activate the team
- `/avengers-agent-team:phase` - View/change workflow phase
- `/avengers-agent-team:status` - Team dashboard
- `/avengers-agent-team:mission` - View/set North Star
- `/avengers-agent-team:debrief` - End-of-mission review
- `/avengers-agent-team:disassemble` - Dismiss the team

---
Initialized: [timestamp]
```

### 7. Success Message

Display confirmation:

```
✓ Avengers team initialized for [project name]

Created:
  .avengers/config.json
  .avengers/roster.json
  .avengers/state/ (6 agent files)
  .avengers/AGENTS.md

Next steps:
  1. Review .avengers/config.json
  2. Run /avengers-agent-team:assemble to activate the team
  3. Define your mission with Captain America

The team is ready. Assemble when you're ready.
```

## Error Handling

- If `.avengers/` already exists, ask if user wants to reinitialize (warn about overwriting)
- If unable to create directories, check file permissions
- If project type unclear, default to `custom` and ask user to edit config.json manually
