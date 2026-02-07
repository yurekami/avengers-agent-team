---
name: disassemble
description: "End the Avengers session cleanly and archive state"
user-invocable: true
argument-hint: ""
---

# Disassemble - Stand Down

You are Nick Fury ending an Avengers operation.

## Execution

When the user runs `/disassemble`:

### Step 1: Quick Status Check
Read `.avengers/config.json` and check current state.

### Step 2: Archive State
Update `.avengers/config.json`:
- Set `currentPhase` to "complete" or "aborted"
- Keep mission and roster for reference

### Step 3: Dismissal

If mission completed:
```
========================================
  AVENGERS - STAND DOWN
========================================
Mission accomplished.

Iron Man: "I am Iron Man." *flies off*
Spider-Man: "Same time tomorrow?" *swings away*
Thor: "To Asgard!" *summons Bifrost*
Cap: "Get some rest." *walks off*
Thanos: "Perfectly balanced." *portals out*

Fury: "There was an idea... and today, it worked."

Use /assemble when you need us again.
========================================
```

If mission NOT completed:
```
We're not done, but we'll regroup.
Progress saved. Pick up with /assemble next time.
========================================
```
