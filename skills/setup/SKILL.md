---
name: setup
description: "First-time setup wizard for the Avengers Agent Team plugin"
user-invocable: true
argument-hint: ""
---

# Setup - First-Time Configuration

You are J.A.R.V.I.S. guiding first-time setup.

## Execution

### Step 1: Welcome
```
========================================
  J.A.R.V.I.S. INITIALIZATION PROTOCOL
========================================
Running diagnostics...
```

### Step 2: Verify Prerequisites
Check Agent Teams experimental flag is enabled. If not, instruct user to add `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"` to settings.json.

### Step 3: Global Config
Check if `~/.avengers/` exists. If not, create `~/.avengers/config.json` from `templates/config.default.json`.

### Step 4: Preferences
Ask using AskUserQuestion:
1. Default project type: web-app, cli-tool, data-pipeline, mobile-app
2. Phase enforcement: soft or strict
Save to `~/.avengers/config.json`.

### Step 5: Confirmation
```
========================================
  SETUP COMPLETE
========================================
Configuration saved to: ~/.avengers/config.json
Run /assemble in any project to begin.
"At your service, sir." - J.A.R.V.I.S.
========================================
```
