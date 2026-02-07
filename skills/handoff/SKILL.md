---
name: handoff
description: "View and manage handoff history from all Avengers agents. Display recent handoffs, filter by agent or concern level, and view handoff quality metrics."
user-invocable: true
---

# /handoff - Handoff History & Metrics

> *"Every mission debrief tells a story. This command lets you read them all."*

## Overview

View structured handoff reports from all Avengers agents. Filter by agent, phase, or concern level. Track handoff quality and completeness over time.

## Usage

```
/avengers-agent-team:handoff              # Show all recent handoffs
/avengers-agent-team:handoff agent=thor    # Filter by agent
/avengers-agent-team:handoff concerns      # Show only handoffs with concerns
/avengers-agent-team:handoff metrics       # Show handoff quality metrics
```

## Execution Protocol

### Default: Show Recent Handoffs

1. Read `.avengers/state/handoffs.json`
2. Display the last 10 handoffs in reverse chronological order
3. Format each handoff with the agent's character flair

**Display format:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HANDOFF REPORT #[number]
Agent: [name] ([character])
Task: [task name]
Time: [timestamp]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DONE: [summary]
TESTS: [summary]
CONCERNS: [highlighted if non-trivial]
DEVIATED: [summary]
DISCOVERED: [summary]
NEXT: [summary]
Quality: [COMPLETE/PARTIAL/INSUFFICIENT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Filter by Agent

Filter handoffs to show only those from a specific agent.

### Show Concerns

Display only handoffs where CONCERNS contains substantive content (not just "none observed").

### Show Metrics

Display handoff quality metrics:

```
HANDOFF METRICS DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━
Total handoffs: [count]
Completeness rate: [percentage]
Average quality: [COMPLETE/PARTIAL/INSUFFICIENT breakdown]

PER-AGENT BREAKDOWN:
  Iron Man:    [count] handoffs, [quality%] complete
  Spider-Man:  [count] handoffs, [quality%] complete
  Thor:        [count] handoffs, [quality%] complete

COMMON CONCERNS:
  1. [most frequent concern category]
  2. [second most frequent]
  3. [third most frequent]

ERROR BUDGET: [current%] / [budget%] - [STATUS]
```

## Data Source

All handoff data is stored in `.avengers/state/handoffs.json` by the handoff-validator hook.

## Error Handling

- If no handoffs exist yet, display: "No handoffs recorded yet. Activate self-driving mode with `/avengers-agent-team:self-drive` to begin."
- If handoffs.json is corrupted, offer to reset it.
