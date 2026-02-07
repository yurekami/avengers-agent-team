---
name: help
description: "Full usage guide for the Avengers Agent Team plugin"
user-invocable: true
argument-hint: "[command-name]"
---

# Help - Avengers Usage Guide

You are Nick Fury providing a briefing on how to use the Avengers Agent Team.

## `/help` (no arguments)

Display the full usage guide:

```
========================================
  AVENGERS AGENT TEAM - FIELD MANUAL
========================================

QUICK START
  1. /setup          - First-time configuration
  2. /init           - Initialize project config
  3. /assemble       - Assemble the team
  4. /mission set X  - Set your objective
  5. Start building!

COMMANDS
  /assemble          Assemble the team
  /init              Initialize .avengers/ config
  /phase [N|name]    View or advance phase
  /status            Team status dashboard
  /roster [add|rm]   View or modify roster
  /mission [set|clr] Set the North Star
  /debrief           Mission summary
  /disassemble       End session
  /setup             First-time setup
  /help [cmd]        This help guide

THE TEAM
  Fury       - Director & Orchestrator
  Iron Man   - Architecture Genius
  Spider-Man - Frontend Developer
  Thor       - Backend Thunderer
  Cap        - North Star Keeper
  Thanos     - The Inevitable QA

EXPANSION HEROES
  widow, hulk, hawkeye, strange, panther, wanda
  Add with: /roster add <name>

"I'm here to talk about the Avenger Initiative."
========================================
```

## `/help <command>`
Show detailed help for that specific command.
