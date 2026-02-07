---
name: tech-lead
description: "Tech Lead Mode - You review, agents build. Combines self-drive, triage, and review queue for a human-in-the-loop autonomous workflow."
user-invocable: true
---

# /tech-lead - Engineer as Tech Lead

> *"You're not here to code, soldier. You're here to lead. Let the agents do the heavy lifting."*

## Overview

Tech Lead Mode transforms your workflow: **you review, agents build**. Fury triages incoming tasks, assigns them to agents, and completed work flows to your review queue. You approve, provide feedback, or reject - and agents iterate until you're satisfied.

This is the "Engineer as Tech Lead" paradigm from Agent-Native Engineering: you set direction and maintain quality while agents handle implementation.

## What Changes

1. **Self-drive mode activates** - Fury plans and delegates autonomously
2. **Triage system activates** - All tasks are classified before assignment
3. **Review queue activates** - Completed work requires your approval
4. **You don't code** - Your role is reviewing, providing feedback, and setting direction
5. **Simple tasks auto-approve** (optional) - Quick Strikes can skip your review

## Activation Protocol

### Step 1: Initialize

Enable tech-lead mode in `.avengers/config.json`:

```json
{
  "techLead": {
    "enabled": true,
    "reviewRequired": true,
    "autoApproveSimple": false
  }
}
```

### Step 2: Set Mission

Describe what you want built. Fury breaks it down:

> "Give me the mission brief, Commander. I'll handle the rest."

### Step 3: Fury Creates Tasks

Fury uses triage to classify each sub-task:
- **Quick Strike** → Direct to agent (auto-approve if enabled)
- **Solo Op** → Agent works, result goes to review queue
- **Full Assemble** → Multi-agent coordination with review checkpoints

### Step 4: Review Loop

Your workflow becomes:

```
┌─────────────────────────────────────────┐
│                                         │
│   1. Check /review-queue               │
│   2. Review completed work              │
│   3. /review-queue approve <id>         │
│      OR                                 │
│      /review-queue feedback <id> "..."  │
│   4. Agents iterate on feedback         │
│   5. Repeat until mission complete      │
│                                         │
└─────────────────────────────────────────┘
```

### Step 5: Monitor

Use these commands while agents work:
- `/status` - Overall team progress
- `/velocity` - Performance metrics
- `/review-queue stats` - Review throughput
- `/review-queue list` - Pending reviews

## Fury's Tech-Lead Briefing

When tech-lead mode activates, Fury addresses you:

> "Commander on deck. Here's how this works:
>
> I run the field operations. I triage every task, assign the right agent, and keep the pipeline full. When an agent finishes, their work comes to you for review.
>
> Your job: review, approve, or send feedback. That's it. No coding. No micromanaging. Trust the team, but verify the output.
>
> Quick Strikes go straight through unless you say otherwise. Solo Ops need your sign-off. Full Assembles get checkpoints.
>
> Give me the mission, and I'll deploy the team."

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `reviewRequired` | `true` | Whether completed work needs human review |
| `autoApproveSimple` | `false` | Auto-approve Quick Strike tasks |

## Deactivation

Run `/disassemble` or set `techLead.enabled = false` in config.

## Integration

- Requires: self-drive, triage, review-queue
- Compatible with: velocity tracking, rules engine
- Incompatible with: none (enhances all other modes)
