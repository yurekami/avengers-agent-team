---
name: roster
description: "View, add, or remove Avengers from the team roster. Core 6 are always available. Add expansion characters like Black Widow, Hulk, Hawkeye, Doctor Strange, Black Panther, or Scarlet Witch."
user-invocable: true
argument-hint: "[list|add|remove] [character-name]"
---

# Roster - Team Management

## Overview

Manage the Avengers team roster. The core 6 agents are always available. Add expansion characters for specialized capabilities or increased parallelism.

## Core 6 Agents (Always Available)

These agents cannot be removed:

1. **Nick Fury** (Orchestrator) - Mission command and coordination
2. **Captain America** (North Star) - Vision and alignment
3. **Iron Man** (Architect) - System design and architecture
4. **Spider-Man** (Frontend) - UI/UX and client-side development
5. **Thor** (Backend) - Server, database, and infrastructure
6. **Thanos** (Quality Assurance) - Testing and verification

## Expansion Characters

### Available Expansions

**Black Widow** - Intelligence & Security
- **Role:** Security Specialist & Intelligence
- **Model:** Sonnet
- **Capabilities:**
  - Security audits and penetration testing
  - Code security analysis
  - Authentication/authorization systems
  - Threat modeling
  - Data encryption
- **When to Add:** Security-critical applications, handling sensitive data

**Hulk** - Performance & Optimization
- **Role:** Performance Engineer
- **Model:** Sonnet
- **Capabilities:**
  - Performance profiling and optimization
  - Load testing and stress testing
  - Resource optimization
  - Bottleneck identification
  - Scalability engineering
- **When to Add:** High-performance requirements, scalability concerns

**Hawkeye** - DevOps & Deployment
- **Role:** DevOps Engineer
- **Model:** Sonnet
- **Capabilities:**
  - CI/CD pipeline design
  - Infrastructure as code
  - Container orchestration
  - Monitoring and observability
  - Deployment automation
- **When to Add:** Complex deployment needs, microservices architecture

**Doctor Strange** - Data & Analytics
- **Role:** Data Engineer & Analyst
- **Model:** Sonnet
- **Capabilities:**
  - Data pipeline design
  - Analytics implementation
  - Machine learning integration
  - Data visualization
  - Statistical analysis
- **When to Add:** Data-heavy applications, ML/AI features

**Black Panther** - Mobile Development
- **Role:** Mobile Specialist
- **Model:** Sonnet
- **Capabilities:**
  - iOS development
  - Android development
  - React Native/Flutter
  - Mobile-first design
  - Cross-platform optimization
- **When to Add:** Mobile applications, mobile-responsive requirements

**Scarlet Witch** - Integration & Automation
- **Role:** Integration Specialist
- **Model:** Sonnet
- **Capabilities:**
  - Third-party API integration
  - Workflow automation
  - Event-driven architecture
  - Message queue systems
  - Webhook management
- **When to Add:** Complex integrations, automation-heavy workflows

## Execution Protocol

### Command Syntax

```
/avengers-agent-team:roster [command] [character-name]
```

**Commands:**
- `list` - Show current roster (default if no argument)
- `add [character]` - Add expansion character
- `remove [character]` - Remove expansion character (core 6 cannot be removed)

### 1. List Roster

Display current team composition:

```
═══════════════════════════════════════════════════════════════
🦸 AVENGERS ROSTER
═══════════════════════════════════════════════════════════════

CORE TEAM (6)

  🎯 Nick Fury - Orchestrator
     Model: opus | Status: active
     Specialties: Coordination, strategy, mission control

  🛡️ Captain America - North Star
     Model: opus | Status: active
     Specialties: Vision, alignment, leadership

  🔧 Iron Man - Architect
     Model: sonnet | Status: active
     Specialties: Architecture, design, innovation

  🕷️ Spider-Man - Frontend Developer
     Model: sonnet | Status: active
     Specialties: UI, UX, client-side development

  ⚡ Thor - Backend Developer
     Model: sonnet | Status: active
     Specialties: Server, database, infrastructure

  ⚖️ Thanos - Quality Assurance
     Model: opus | Status: idle
     Specialties: Testing, verification, quality control

───────────────────────────────────────────────────────────────

EXPANSION TEAM (2)

  🕶️ Black Widow - Security Specialist
     Model: sonnet | Status: active
     Specialties: Security, penetration testing, threat analysis
     Added: 2025-01-15

  🔬 Doctor Strange - Data Engineer
     Model: sonnet | Status: queued
     Specialties: Data pipelines, analytics, ML integration
     Added: 2025-01-15

───────────────────────────────────────────────────────────────

AVAILABLE EXPANSIONS

  💪 Hulk - Performance Engineer
     Capabilities: Performance optimization, load testing, scalability

  🎯 Hawkeye - DevOps Engineer
     Capabilities: CI/CD, infrastructure, deployment automation

  👑 Black Panther - Mobile Specialist
     Capabilities: iOS, Android, React Native, mobile-first design

  ✨ Scarlet Witch - Integration Specialist
     Capabilities: API integration, automation, event-driven systems

  Add: /avengers-agent-team:roster add [character-name]

═══════════════════════════════════════════════════════════════

Total Active: 8 agents
Team Capacity: Excellent (high parallelism possible)
```

### 2. Add Expansion Character

Process for adding an agent:

**Step 1: Validate Character**
- Check if character is in available expansions
- Check if character already on roster
- Verify character name spelling

**Step 2: Confirm Addition**
Display character details and ask for confirmation:

```
➕ ADD TO ROSTER

Black Widow - Security Specialist
  Model: Sonnet
  Capabilities:
    • Security audits and penetration testing
    • Code security analysis
    • Authentication/authorization systems
    • Threat modeling
    • Data encryption

  Cost Impact: +1 sonnet agent (moderate token usage)
  Best For: Security-critical applications, sensitive data

Add Black Widow to the team? [y/N]
```

**Step 3: Update Files**

Update `.avengers/roster.json`:
```json
{
  "core": { ... },
  "expansion": {
    "blackwidow": {
      "name": "Black Widow",
      "role": "Security Specialist",
      "model": "sonnet",
      "status": "inactive",
      "capabilities": ["security", "penetration_testing", "threat_modeling"],
      "added_at": "2025-01-15T14:30:00Z"
    }
  }
}
```

Create state file `.avengers/state/agents/blackwidow.json`:
```json
{
  "agent_id": "blackwidow",
  "status": "inactive",
  "current_task": null,
  "tasks_completed": 0,
  "last_active": null,
  "added_at": "2025-01-15T14:30:00Z"
}
```

**Step 4: Success Message**

```
✓ Black Widow added to the roster

The team now has 7 active agents.

Nick Fury: "Welcome to the team, Romanoff. We could use your expertise."

To activate: /avengers-agent-team:assemble
```

### 3. Remove Expansion Character

Process for removing an agent:

**Step 1: Validate Removal**
- Check if character is on expansion roster (core 6 cannot be removed)
- Warn if character has active tasks

**Step 2: Confirm Removal**

```
➖ REMOVE FROM ROSTER

Black Widow - Security Specialist
  Status: active
  Active Tasks: 2
  Completed Tasks: 15

⚠️ Warning: Black Widow has 2 active tasks:
  • Security audit of authentication system
  • Penetration testing of API endpoints

These tasks will be:
  1. Reassigned to Iron Man (security review)
  2. Moved to queue for later completion

Remove Black Widow from the team? [y/N]
```

**Step 3: Task Reassignment**

If agent has active tasks:
- Move tasks to queue
- Or reassign to most appropriate core agent
- Log reassignment in task history

**Step 4: Update Files**

Remove from `.avengers/roster.json` expansion section
Delete `.avengers/state/agents/blackwidow.json`
Update any references in tasks.json

**Step 5: Success Message**

```
✓ Black Widow removed from the roster

Active tasks reassigned to Iron Man.
The team now has 6 active agents.

Nick Fury: "Good work, Romanoff. We'll call if we need you again."
```

## Expansion Recommendations

Analyze current project and suggest expansions:

```
💡 EXPANSION RECOMMENDATIONS

Based on your project configuration:
  Project Type: web-app
  Tech Stack: React, Node.js, PostgreSQL, AWS

Recommended additions:

  1. 🎯 Hawkeye (DevOps Engineer) - HIGH PRIORITY
     Why: AWS deployment detected, CI/CD would improve velocity
     Impact: Faster deployments, better monitoring

  2. 🕶️ Black Widow (Security) - MEDIUM PRIORITY
     Why: User authentication and payment processing detected
     Impact: Secure sensitive data handling

  3. 💪 Hulk (Performance) - LOW PRIORITY
     Why: Could optimize database queries and API performance
     Impact: Better scalability for growth

Add recommended agents: /avengers-agent-team:roster add hawkeye
```

## Error Handling

- If character name misspelled: Suggest closest match
  ```
  ❌ Character "black-widow" not found.
  Did you mean: "blackwidow" or "black_widow"?
  ```

- If trying to remove core agent:
  ```
  ❌ Cannot remove Iron Man - core agents are permanent.
  Only expansion agents can be removed.
  ```

- If character already on roster:
  ```
  ℹ️ Black Widow is already on the roster.
  Status: active | Tasks: 3 active, 12 completed
  ```

- If roster not initialized:
  ```
  ❌ Roster not initialized.
  Run: /avengers-agent-team:init
  ```

## Future Expansion Ideas

Placeholder for future characters:
- **Vision** - AI/ML Specialist
- **Ant-Man** - Microservices Architect
- **Wasp** - Frontend Performance
- **Falcon** - API Design Specialist
- **War Machine** - DevSecOps

These can be added in future plugin updates.
