---
name: rules
description: "Domain Rules Engine - List, check, add, and initialize development rules. Enforces anti-slop standards per agent domain."
user-invocable: true
argument-hint: "[list|check|add|init]"
---

# /rules - Domain Rules Engine

> *"I don't make suggestions. I make rules. And rules keep this team alive."*

## Overview

The Rules Engine enforces domain-specific development standards across the Avengers team. Each agent has rules tailored to their specialty, preventing common mistakes ("slop") before they reach code review.

## Subcommands

### `/rules` or `/rules list`

Display all active rules organized by domain:

```
╔══════════════════════════════════════════╗
║       S.H.I.E.L.D. RULEBOOK             ║
╠══════════════════════════════════════════╣
║                                          ║
║  FRONTEND (Spider-Man)      12 rules     ║
║  ├── MUST:     7 rules                   ║
║  ├── SHOULD:   6 rules                   ║
║  └── MUST NOT: 7 rules                   ║
║                                          ║
║  BACKEND (Thor)             11 rules     ║
║  ├── MUST:     7 rules                   ║
║  ├── SHOULD:   7 rules                   ║
║  └── MUST NOT: 7 rules                   ║
║                                          ║
║  ARCHITECTURE (Iron Man)    11 rules     ║
║  ├── MUST:     6 rules                   ║
║  ├── SHOULD:   6 rules                   ║
║  └── MUST NOT: 5 rules                   ║
║                                          ║
║  QUALITY (Thanos)           12 rules     ║
║  ├── MUST:     6 rules                   ║
║  ├── SHOULD:   6 rules                   ║
║  └── MUST NOT: 6 rules                   ║
║                                          ║
║  Enforcement: WARN                       ║
║  Source: plugin defaults                 ║
╚══════════════════════════════════════════╝
```

### `/rules check`

Run rules validation against recent agent output. Reports violations by severity.

### `/rules add "<rule>" --domain <domain> --level <must|should|must-not>`

Add a custom project rule to `.avengers/rules/<domain>.md`. Project rules override plugin defaults.

### `/rules init`

Initialize project-level rules directory at `.avengers/rules/` with copies of plugin defaults for customization.

## Rule Resolution Order

1. Project rules (`.avengers/rules/`) - highest priority
2. Plugin rules (`rules/`) - defaults

Project rules override plugin rules for the same domain. If a project rule file exists for a domain, it completely replaces the plugin default for that domain.

## Integration

- **SubagentStop hook**: `rules-checker.js` validates agent output against applicable rules
- **Self-drive mode**: Rules are checked automatically after every task completion
- **Review queue**: Rule violations are included in review summaries
- **Thanos**: Includes rules compliance in every review report
