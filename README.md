# avengers-agent-team

**Marvel Avengers-themed multi-agent orchestration plugin for Claude Code.**

> *"There was an idea... to bring together a group of remarkable agents, so when we needed them, they could fight the battles we never could."*

[![CI](https://github.com/yurekami/avengers-agent-team/actions/workflows/ci.yml/badge.svg)](https://github.com/yurekami/avengers-agent-team/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What is this?

A Claude Code plugin that provides **6 specialized AI agents**, each embodying a Marvel Avenger with unique expertise and full character personality. Agents coordinate through a structured **4-phase workflow** to build software as a team.

### The Team

| Agent | Character | Role | Specialty |
|-------|-----------|------|-----------|
| `fury` | Nick Fury | Director & Orchestrator | Task delegation, coordination, error recovery |
| `ironman` | Tony Stark | Architecture Genius | System design, tech stack, code review |
| `spiderman` | Peter Parker | Frontend Developer | UI/UX, responsive design, accessibility |
| `thor` | Thor | Backend Thunderer | APIs, databases, infrastructure, DevOps |
| `cap` | Steve Rogers | North Star Keeper | Mission alignment, scope guarding, user value |
| `thanos` | Thanos | The Inevitable QA | Testing, security audit, code quality |

### Expansion Pack (6 more heroes)

| Agent | Character | Role |
|-------|-----------|------|
| `widow` | Black Widow | Security Specialist |
| `hulk` | Hulk | Load Testing & Performance |
| `hawkeye` | Hawkeye | Precision Debugger |
| `strange` | Doctor Strange | Incident Response & Rollback |
| `panther` | Black Panther | DevOps & Resource Management |
| `wanda` | Scarlet Witch | Data/ML Specialist |

---

## Quick Start

### 1. Install the plugin

```bash
claude plugin install https://github.com/yurekami/avengers-agent-team.git
```

### 2. Enable Agent Teams (required)

Add to your Claude Code `settings.json`:
```json
{
  "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
}
```

### 3. Assemble!

In Claude Code:
```
/avengers-agent-team:assemble
```

Nick Fury takes command, asks about your mission, and deploys the right agents.

---

## Commands

| Command | Description |
|---------|-------------|
| `/avengers-agent-team:assemble` | Assemble the team for a mission |
| `/avengers-agent-team:init` | Initialize project config (`.avengers/` directory) |
| `/avengers-agent-team:phase` | View or transition workflow phases |
| `/avengers-agent-team:status` | Team status dashboard |
| `/avengers-agent-team:roster` | View/add/remove team members |
| `/avengers-agent-team:mission` | Set or check the North Star |
| `/avengers-agent-team:debrief` | End-of-mission summary |
| `/avengers-agent-team:disassemble` | End the session cleanly |
| `/avengers-agent-team:setup` | First-time setup |
| `/avengers-agent-team:help` | Full usage guide |

---

## Workflow: The Avengers Initiative

The team follows a 4-phase workflow:

### Phase 1: S.H.I.E.L.D. Briefing Room
Nick Fury sets objectives. Captain America defines the North Star. Iron Man drafts architecture. Full team discusses approach.

### Phase 2: Avengers Tower Lab
Spider-Man and Thor build in parallel. Captain America monitors mission alignment. Iron Man reviews. Thanos does real-time quality checks.

### Phase 3: Battle of New York
Thanos runs full integration tests and security audit. Iron Man conducts architecture review. Team fixes issues. Nick Fury adjusts priorities.

### Phase 4: Endgame Deploy
Thor configures infrastructure. Spider-Man optimizes builds. Captain America validates mission achievement. Thanos does final security audit. Nick Fury approves deployment.

---

## Project Templates

The plugin adapts agent roles to your project type:

| Template | Spider-Man becomes | Thor becomes |
|----------|-------------------|--------------|
| `web-app` | Frontend Developer | Backend Developer |
| `cli-tool` | CLI Interface/UX | Core Logic/IO |
| `data-pipeline` | Data Viz/Reporting | Pipeline/ETL |
| `mobile-app` | Mobile UI | API Backend |

Set during `/avengers-agent-team:init` or in `.avengers/config.json`.

---

## Configuration

### Global config (`~/.avengers/`)
Personal defaults that apply to all projects.

### Project config (`.avengers/`)
Project-specific overrides. Takes priority over global.

### Inheritance
Project config > Global config > Plugin defaults

---

## Key Features

- **Full Character Immersion** - Agents speak in character at all times
- **Soft Phase Enforcement** - Warnings when actions don't match phase (override with `--force`)
- **Nick Fury Auto-Recovery** - Orchestrator detects and recovers from agent failures
- **Expandable Roster** - Add new Marvel characters with custom roles
- **Project Templates** - Roles adapt to web apps, CLI tools, data pipelines, or mobile apps
- **Hybrid Dependencies** - Task graph for planned work + Teammate messages for dynamic coordination

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md).

**Want to add a new Avenger?** Create an agent definition in `agents/expansions/` following the existing pattern and submit a PR.

---

## License

MIT - see [LICENSE](./LICENSE).

---

## Credits

- Inspired by [The Agent of the Rings](https://github.com/seriousran/the-agent-of-the-rings) by [@chanrankim](https://github.com/chanrankim)
- Built for [Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams)
- Character concepts from Marvel Studios

---

<div align="center">

**"I am inevitable... and so is quality code."** - Thanos

</div>
