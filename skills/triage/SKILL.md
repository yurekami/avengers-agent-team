---
name: triage
description: "Task Triage - Classify tasks as Quick Strike (simple), Solo Op (manageable), or Full Assemble (complex). Routes tasks to the appropriate workflow based on scope, ambiguity, and risk."
user-invocable: true
argument-hint: "<task description>"
---

# /triage - Task Classification System

> *"I don't send a full strike team for a recon mission. Know the threat level before you deploy."*

## Overview

Task Triage classifies incoming tasks into three levels, each with a Marvel-themed codename:

| Level | Codename | Scope | Time | Review | Routing |
|-------|----------|-------|------|--------|---------|
| Simple | **Quick Strike** | 1 file | <30min | None | Direct to worker |
| Manageable | **Solo Op** | 2-5 files | 1-4hrs | Via queue | Background agent |
| Complex | **Full Assemble** | 6+ files | 4hrs+ | Required | Multi-agent sync |

## Classification Dimensions

Tasks are evaluated across three weighted dimensions:

- **Scope** (40%): How many files, functions, and systems are affected?
- **Ambiguity** (35%): How clear are the requirements? Are there unknowns?
- **Risk** (25%): What could break? Is this touching critical paths?

## Activation Protocol

### Step 1: Receive Task Description

The user provides a task description via `/triage <description>`.

### Step 2: Classify

Analyze the task against classification dimensions:

**Quick Strike indicators:**
- "fix typo", "update text", "change color", "rename variable"
- Single file mentioned or implied
- No architectural decisions needed
- No new dependencies

**Solo Op indicators:**
- "add feature", "implement endpoint", "create component"
- 2-5 files affected
- Clear requirements but some implementation decisions
- May need tests

**Full Assemble indicators:**
- "refactor", "redesign", "migrate", "overhaul"
- 6+ files or cross-cutting concerns
- Architectural decisions required
- Multiple agents needed simultaneously
- "I'm not sure how to..." (high ambiguity)

### Step 3: Announce Classification

Fury announces the classification in-character:

**Quick Strike:**
> "This is a Quick Strike op. [Agent], you're up. Get it done, get out. No review needed."

**Solo Op:**
> "Solo Op. [Agent], take the lead. You've got 1-4 hours. Report back to the review queue when done."

**Full Assemble:**
> "Full Assemble. Everyone to the briefing room. This one needs the whole team."

### Step 4: Route

- **Quick Strike** → Directly spawn the appropriate worker agent
- **Solo Op** → Queue via `/background` if available, otherwise direct spawn
- **Full Assemble** → Trigger full `/assemble` workflow

### Step 5: Update State

Write classification to `.avengers/state/triage.json`:

```json
{
  "lastTriage": {
    "task": "<description>",
    "level": "simple|manageable|complex",
    "codename": "Quick Strike|Solo Op|Full Assemble",
    "dimensions": { "scope": 0.0, "ambiguity": 0.0, "risk": 0.0 },
    "routing": "direct-to-worker|background-queue|full-assemble",
    "assignedAgent": "<agent-name>",
    "timestamp": "<ISO timestamp>"
  },
  "history": []
}
```

## Ambiguous Cases

If the classification is unclear (two dimensions conflict), use AskUserQuestion:

> "Director's assessment is split. This could be a Solo Op or a Full Assemble. Let me ask the field commander."

Present options with descriptions of what each level means for the specific task.

## Integration

- Works with `/self-drive` for automatic task routing
- Works with `/background` for Solo Op queuing
- Works with `/tech-lead` for review routing
- History available via `/status` dashboard
