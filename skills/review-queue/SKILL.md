---
name: review-queue
description: "Review Queue - Manage completed agent work awaiting human review. List, approve, reject, or provide feedback on task completions."
user-invocable: true
argument-hint: "[list|approve <id>|feedback <id> \"comments\"|reject <id>|stats]"
---

# /review-queue - Mission Review Queue

> *"Nothing leaves this base without my sign-off. Nothing."*

## Overview

The Review Queue collects completed agent work for human review. In tech-lead mode, this is the primary interface for reviewing and approving agent output. Simple tasks can be auto-approved; complex work requires explicit review.

## Subcommands

### `/review-queue` or `/review-queue list`

Display all items awaiting review:

```
╔══════════════════════════════════════════════════╗
║       REVIEW QUEUE - PENDING APPROVAL            ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  #1  Solo Op | Spider-Man                        ║
║      "Add login form with validation"            ║
║      Files: src/components/LoginForm.tsx (+2)     ║
║      Tests: 5 passing | Coverage: 87%            ║
║      Submitted: 10 min ago                       ║
║      ─────────────────────────────────────────── ║
║                                                  ║
║  #2  Solo Op | Thor                              ║
║      "Add /auth/login API endpoint"              ║
║      Files: src/api/auth.ts (+3)                 ║
║      Tests: 8 passing | Coverage: 92%            ║
║      Submitted: 5 min ago                        ║
║      ─────────────────────────────────────────── ║
║                                                  ║
║  Pending: 2 | Auto-approved today: 3             ║
╚══════════════════════════════════════════════════╝
```

### `/review-queue approve <id>`

Approve a completed task. The agent's work is accepted and marked as done.

> "Approved. Good work, [Agent]. Move to the next objective."

### `/review-queue feedback <id> "comments"`

Send feedback to the agent. The agent will iterate on the work and resubmit.

> "Not good enough. [Agent], here's what needs to change: [comments]. Fix it and report back."

The agent receives the feedback and re-executes with the comments as additional context. Updated work goes back into the review queue.

### `/review-queue reject <id>`

Reject a completed task entirely. The task is marked as failed and may be reassigned.

> "Rejected. This doesn't meet our standards. [Agent], stand down. I'm reassigning this."

### `/review-queue stats`

Show review statistics:

```
╔══════════════════════════════════════════════════╗
║       REVIEW QUEUE - STATISTICS                  ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  Total Reviewed:     15                          ║
║  Approved:           12 (80%)                    ║
║  Approved w/Feedback: 2 (13%)                    ║
║  Rejected:            1 (7%)                     ║
║  Avg Feedback Rounds: 1.2                        ║
║                                                  ║
║  BY AGENT                                        ║
║  Spider-Man:  5 approved, 1 feedback, 0 rejected ║
║  Thor:        4 approved, 1 feedback, 1 rejected ║
║  Iron Man:    3 approved, 0 feedback, 0 rejected ║
╚══════════════════════════════════════════════════╝
```

## State Management

State stored in `.avengers/state/review-queue.json`:

```json
{
  "queue": [
    {
      "id": 1,
      "agent": "spiderman",
      "task": "Add login form with validation",
      "triageLevel": "manageable",
      "files": ["src/components/LoginForm.tsx"],
      "testResults": { "passing": 5, "coverage": 87 },
      "handoff": { "done": "...", "concerns": "...", "next": "..." },
      "submittedAt": "2026-02-07T10:30:00.000Z",
      "feedbackHistory": [],
      "status": "pending"
    }
  ],
  "completed": [],
  "stats": {
    "totalReviewed": 0,
    "approved": 0,
    "rejected": 0,
    "feedbackRounds": 0
  }
}
```

## Auto-Approve Rules

When `autoApproveSimple` is enabled in config:
- Quick Strike tasks are auto-approved if all tests pass
- Auto-approved items appear in the list with an "[AUTO]" tag
- Still logged for auditing purposes

## Integration

- **Tech-lead mode**: Primary review interface
- **Background agents**: Completed background work flows here
- **Self-drive mode**: Manageable tasks route through review queue
- **Velocity metrics**: Review throughput tracked in velocity dashboard
