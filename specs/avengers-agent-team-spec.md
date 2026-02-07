# Avengers Agent Team - Specification

## Overview

`avengers-agent-team` is a standalone Claude Code plugin that provides Marvel Avengers-themed multi-agent orchestration. It combines a runtime plugin (slash commands, hooks, state management) with a project config generator that scaffolds agent team configurations. Agents maintain full Marvel character personalities at all times, creating an immersive development experience. The core team of 6 Avengers maps to software engineering roles, with an expandable roster system for adding new Marvel characters.

## Problem Statement

Multi-agent orchestration in Claude Code is powerful but lacks personality, structure, and opinionated workflow guidance. Developers using Agent Teams face:

1. **No character or role enforcement** - Agents are generic, making it hard to remember which agent does what
2. **No workflow phases** - No structured progression from planning to deployment
3. **No dependency management** - Agents don't coordinate well on dependent tasks
4. **No failure recovery** - When an agent fails, the user must manually intervene
5. **No project-type adaptation** - Same generic agents regardless of whether you're building a web app or CLI tool

This plugin solves all five by providing an opinionated, character-driven, workflow-aware orchestration layer on top of Claude Code's Agent Teams.

## User Stories

### US-1: First-Time Setup
**As a** developer installing the plugin for the first time,
**I want to** run a single setup command and have everything configured,
**So that** I can start using Avengers agents immediately.

**Acceptance Criteria:**
- `npm install -g avengers-agent-team` installs the plugin
- `/avengers:setup` in Claude Code configures settings.json, creates global roster
- Setup detects project type and suggests a template
- Works on Windows, macOS, and Linux

### US-2: Assembling the Team
**As a** developer starting a new project,
**I want to** type `/avengers:assemble` and have all 6 agents ready,
**So that** I can immediately delegate work to specialized, character-driven agents.

**Acceptance Criteria:**
- `/avengers:assemble` spawns the Nick Fury orchestrator
- Nick Fury presents the mission briefing and asks for project goals
- All 6 agents are available with full Marvel personas
- Phase tracking starts at "S.H.I.E.L.D. Briefing Room"

### US-3: Project Config Generation
**As a** developer setting up a new project,
**I want to** run `/avengers:init` to generate project-level agent configs,
**So that** my project has the right team configuration baked in.

**Acceptance Criteria:**
- Creates `.avengers/` directory with team config
- Generates AGENTS.md with character personas
- Applies project template (web-app, cli-tool, data-pipeline, mobile-app)
- Respects global roster defaults with project-level overrides

### US-4: Phase Tracking
**As a** team lead (Nick Fury),
**I want** the system to track which workflow phase we're in,
**So that** agents get appropriate context and I get warnings about phase-mismatched actions.

**Acceptance Criteria:**
- 4 phases: Briefing > Build > Battle-Test > Deploy
- `/avengers:phase` shows current phase and progress
- `/avengers:phase next` transitions to next phase
- Soft warnings when actions don't match phase (e.g., deploying during Build)
- Agents adjust behavior based on current phase

### US-5: Expanding the Roster
**As a** power user,
**I want to** add new Marvel characters with custom roles,
**So that** I can specialize my team for my project's needs.

**Acceptance Criteria:**
- `/avengers:roster add` prompts for character, role, and persona
- New characters available immediately as agents
- Pre-built expansions: Black Widow (Security), Hulk (Load Testing), Hawkeye (Debugging), Doctor Strange (Incident Response)
- Global roster inherits to projects, projects can override

### US-6: Agent Failure Recovery
**As a** developer whose agent hit a context limit or API error,
**I want** Nick Fury to automatically detect the failure and recover,
**So that** my workflow isn't blocked by a single agent's failure.

**Acceptance Criteria:**
- Nick Fury detects agent failures (timeout, error, stale output)
- Automatic retry with reduced context for context-limit failures
- Reassignment to backup agent if retry fails
- User notified of recovery action taken
- Other agents continue working during recovery

### US-7: Non-Web Projects
**As a** developer building a CLI tool,
**I want** the agents to adapt their roles to my project type,
**So that** Spider-Man isn't talking about responsive design for a terminal app.

**Acceptance Criteria:**
- Project templates remap roles appropriately:
  - **web-app**: Spider-Man=Frontend, Thor=Backend (default)
  - **cli-tool**: Spider-Man=CLI Interface/UX, Thor=Core Logic/IO
  - **data-pipeline**: Spider-Man=Data Viz/Reporting, Thor=Pipeline/ETL
  - **mobile-app**: Spider-Man=Mobile UI, Thor=API/Backend
- Character personality stays consistent, only role context changes
- Custom templates can be defined

## Technical Requirements

### Functional

#### Plugin System
- Claude Code plugin installed via npm
- Registers slash commands under `/avengers:` namespace
- Provides hooks (PreToolUse, PostToolUse, Stop) for phase enforcement and state management
- Manages state in `.avengers/state/` within project directory

#### Slash Commands

| Command | Description |
|---------|-------------|
| `/avengers:setup` | First-time global setup |
| `/avengers:init` | Initialize project config (config generator) |
| `/avengers:assemble` | Spawn the full team with mission briefing |
| `/avengers:phase` | Show/transition workflow phases |
| `/avengers:status` | Team status dashboard |
| `/avengers:roster` | View/add/remove characters |
| `/avengers:mission` | Set or view current mission (North Star) |
| `/avengers:debrief` | End-of-mission summary and lessons learned |
| `/avengers:disassemble` | Cleanly end the session |
| `/avengers:help` | Usage guide |

#### Agent Definitions (Core 6)

| Character | Emoji | Role | subagent_type |
|-----------|-------|------|---------------|
| Nick Fury | `shield` | Director & Orchestrator | `avengers:fury` |
| Iron Man / Tony Stark | `red_circle` | Architecture Genius | `avengers:ironman` |
| Spider-Man / Peter Parker | `spider` | Frontend / Client Dev | `avengers:spiderman` |
| Thor | `zap` | Backend / Infrastructure | `avengers:thor` |
| Captain America / Steve Rogers | `shield` | North Star Keeper | `avengers:cap` |
| Thanos | `gem` | The Inevitable QA | `avengers:thanos` |

#### Pre-Built Roster Expansions

| Character | Role | subagent_type |
|-----------|------|---------------|
| Black Widow / Natasha | Security Specialist | `avengers:widow` |
| Hulk / Bruce Banner | Load Testing & Performance | `avengers:hulk` |
| Hawkeye / Clint Barton | Precision Debugger | `avengers:hawkeye` |
| Doctor Strange | Incident Response & Rollback | `avengers:strange` |
| Black Panther / T'Challa | DevOps & Resource Management | `avengers:panther` |
| Scarlet Witch / Wanda | Data/ML Specialist | `avengers:wanda` |

#### Workflow Phases

```
Phase 1: S.H.I.E.L.D. Briefing Room (Build)
  - Nick Fury sets objectives
  - Captain America defines North Star
  - Iron Man drafts architecture
  - Full team discusses tech stack

Phase 2: Avengers Tower Lab (Measure)
  - Spider-Man + Thor work in parallel
  - Captain America monitors alignment
  - Iron Man reviews
  - Thanos does real-time quality checks

Phase 3: Battle of New York (Analyze)
  - Thanos runs integration tests
  - Iron Man architecture review
  - Team fixes issues
  - Nick Fury adjusts priorities

Phase 4: Endgame Deploy (Deploy)
  - Thor configures infrastructure
  - Spider-Man optimizes builds
  - Captain America validates mission achievement
  - Thanos security audit
  - Nick Fury approves deployment
```

#### Dependency Management (Hybrid)
- **Upfront**: Tasks declare `blockedBy` relationships in the task graph
- **Dynamic**: Agents use `Teammate()` messages for runtime coordination
- Nick Fury monitors the dependency graph and auto-unblocks when prerequisites complete

#### Error Recovery (Nick Fury Auto-Recovery)
1. **Detection**: Monitor agent output for errors, timeouts, empty responses
2. **Classification**: Context limit, API error, hallucination, timeout
3. **Action by type**:
   - Context limit: Retry with summarized context
   - API error: Wait 10s, retry up to 3 times
   - Timeout: Extend timeout, retry once
   - Hallucination: Flag to user, re-prompt with constraints
4. **Escalation**: If retry fails, reassign to backup agent or alert user
5. **Continuity**: Other agents continue unaffected during recovery

#### Persona System
- Full Marvel character voice at ALL times
- Each persona has:
  - `name`: Display name
  - `character`: Marvel character name
  - `emoji`: Status emoji
  - `role`: Engineering role description
  - `personality`: Character personality prompt (200-500 words)
  - `catchphrases`: Array of signature lines used contextually
  - `communication_style`: Tone and pattern guidelines
- Persona intensity: Always full (per user requirement)
- Personas stored as JSON, injected into agent system prompts

#### Config Generator Output
Running `/avengers:init` creates:

```
.avengers/
  config.json          # Project team configuration
  roster.json          # Character definitions (extends global)
  state/
    phase.json         # Current workflow phase
    mission.json       # North Star definition
    tasks.json         # Task dependency graph
  templates/
    web-app.json       # Project type template (auto-selected)
AGENTS.md              # Generated agent personas for Claude Code
```

#### Persona Storage (Inheritance Model)
```
~/.avengers/
  roster.json          # Global default roster (all characters)
  config.json          # Global preferences

<project>/.avengers/
  roster.json          # Project overrides (extends global)
  config.json          # Project-specific settings
```

Resolution order: Project config > Global config > Plugin defaults

### Non-Functional

#### Performance
- Plugin load time: < 200ms
- Agent spawn time: < 1s per agent
- Phase transition: < 500ms
- Config generation: < 2s

#### Compatibility
- Claude Code: Latest stable
- Node.js: 18+
- OS: Windows, macOS, Linux
- Works with or without Agent Teams experimental feature
  - With Agent Teams: Full parallel agent orchestration
  - Without Agent Teams: Sequential Task-based delegation (fallback)

#### Package Size
- npm package < 5MB
- Zero native dependencies
- Minimal dependency tree

### Constraints
- Must work as a standalone plugin (no OMC dependency)
- Must not conflict with OMC if both are installed
- Build against current Claude Code APIs (accept breakage risk)
- TypeScript strict mode throughout
- All state files are JSON (human-readable, git-friendly)
- No external API calls (no telemetry, no phone-home)

## UI/UX Decisions

### Full Character Immersion
- Agents ALWAYS speak in character voice
- Status messages include character-appropriate emoji and quips
- Error messages are in-character ("Fury here. Stark's module hit a wall. Reassigning.")
- Phase transitions are narrated ("The team moves from the Briefing Room to Avengers Tower Lab...")

### Soft Phase Enforcement
- Current phase displayed in status
- Warnings (not blocks) when actions mismatch phase
- Example: Running deploy during Build phase triggers: "Fury: Hold it. We're still in the Lab phase. Sure you want to deploy without Battle-Testing? Override with --force."
- User can always override with `--force` flag

### Status Dashboard (`/avengers:status`)
```
AVENGERS STATUS - Phase: Avengers Tower Lab (Build)
Mission: "Help small businesses sell online easily"

  Nick Fury      idle       Monitoring team progress
  Iron Man       active     Reviewing auth architecture
  Spider-Man     active     Building login page UI
  Thor           active     Implementing REST API endpoints
  Cap            idle       Standing by for alignment check
  Thanos         queued     Waiting for code to review

Tasks: 3 active | 2 queued | 5 completed | 0 failed
```

## Edge Cases & Error Handling

| Scenario | Behavior |
|----------|----------|
| Agent hits context limit | Nick Fury retries with summarized context, then reassigns if still failing |
| User has no Agent Teams feature | Falls back to sequential Task delegation with same personas |
| Two agents edit same file | Nick Fury detects conflict, pauses second agent, asks user to resolve |
| User tries to add non-Marvel character | Allowed - system is extensible, but warns "Not a recognized Marvel character" |
| Project has no `.avengers/` config | `/avengers:assemble` auto-runs init with defaults |
| Nick Fury (orchestrator) itself fails | Alert user directly, suggest `/avengers:assemble` to restart |
| All 6 agents spawned but project only needs 3 | Unused agents go to idle state, no resource waste |
| Phase transition skipped (Briefing -> Deploy) | Soft warning listing skipped phases, allow with --force |
| Global and project roster conflict | Project roster wins (inheritance model) |
| Plugin conflicts with OMC | Separate namespace (`/avengers:` vs `/oh-my-claudecode:`), no shared state |

## Tradeoffs Made

| Decision | Chose | Over | Rationale |
|----------|-------|------|-----------|
| Full character voice | Always on | Configurable intensity | Immersion is the core value prop - diluting it defeats the purpose |
| Build for current APIs | Yes | Abstraction layer | Speed to market; Agent Teams API is still evolving, abstraction would be premature |
| Standalone plugin | Yes | OMC extension | Independence, simpler architecture, no coupling to OMC's release cycle |
| Soft phase enforcement | Yes | Strict gates | Respects developer autonomy; warnings > blocks for open source adoption |
| Hybrid dependencies | Yes | Pure graph or pure messages | Covers both planned workflows (graph) and dynamic coordination (messages) |
| TypeScript | Yes | Python | Native to Claude Code ecosystem, npm distribution, largest contributor pool |
| JSON state files | Yes | SQLite | Human-readable, git-friendly, no binary dependencies |
| Nick Fury auto-recovery | Yes | Manual user intervention | Seamless experience; orchestrator should handle operational concerns |

## Out of Scope

- **Custom non-Marvel themes** - This is an Avengers plugin, not a generic theming system. Other themes can be separate plugins.
- **Visual UI / TUI dashboard** - Terminal-based text output only. No ncurses or web UI.
- **Cloud sync** - All state is local. No accounts, no server.
- **LLM provider abstraction** - Claude Code only. No OpenAI/Gemini fallback.
- **Automated code generation** - The plugin orchestrates agents; it doesn't write code itself.
- **Mobile app companion** - Desktop CLI only.

## Open Questions

1. **Agent Teams API stability** - The experimental flag may change. Monitor Claude Code releases and adapt. No action needed now.
2. **npm package naming conflicts** - Verify `avengers-agent-team` is available on npm before publishing.
3. **Community contribution model** - How do we accept new character submissions? PR-based with persona quality review? To be defined after initial release.

## Architecture Overview

```
avengers-agent-team/
  src/
    index.ts                  # Plugin entry point
    commands/                 # Slash command handlers
      assemble.ts             # /avengers:assemble
      init.ts                 # /avengers:init
      phase.ts                # /avengers:phase
      status.ts               # /avengers:status
      roster.ts               # /avengers:roster
      mission.ts              # /avengers:mission
      debrief.ts              # /avengers:debrief
      disassemble.ts          # /avengers:disassemble
      setup.ts                # /avengers:setup
      help.ts                 # /avengers:help
    agents/
      personas/
        fury.ts               # Nick Fury persona definition
        ironman.ts            # Iron Man persona definition
        spiderman.ts          # Spider-Man persona definition
        thor.ts               # Thor persona definition
        cap.ts                # Captain America persona definition
        thanos.ts             # Thanos persona definition
      expansions/
        widow.ts              # Black Widow (Security)
        hulk.ts               # Hulk (Load Testing)
        hawkeye.ts            # Hawkeye (Debugging)
        strange.ts            # Doctor Strange (Incident Response)
        panther.ts            # Black Panther (DevOps)
        wanda.ts              # Scarlet Witch (Data/ML)
      registry.ts             # Agent registration and lookup
      orchestrator.ts         # Nick Fury orchestration logic
      recovery.ts             # Error detection and auto-recovery
    workflow/
      phases.ts               # Phase definitions and transitions
      enforcement.ts          # Soft enforcement logic
      dependencies.ts         # Task dependency graph
    config/
      global.ts               # Global config management (~/.avengers/)
      project.ts              # Project config management (.avengers/)
      templates/
        web-app.ts            # Web app role mappings
        cli-tool.ts           # CLI tool role mappings
        data-pipeline.ts      # Data pipeline role mappings
        mobile-app.ts         # Mobile app role mappings
      inheritance.ts          # Config resolution (project > global > default)
    state/
      manager.ts              # State read/write operations
      phase-state.ts          # Phase tracking state
      mission-state.ts        # Mission/North Star state
      task-state.ts           # Task graph state
    hooks/
      pre-tool-use.ts         # Phase enforcement warnings
      post-tool-use.ts        # State updates after actions
      stop.ts                 # Debrief prompt on session end
    utils/
      logger.ts               # Character-voiced logging
      narrator.ts             # Phase transition narration
      display.ts              # Status dashboard formatting
  tests/
    unit/
      agents/                 # Persona and registry tests
      commands/               # Command handler tests
      workflow/               # Phase and dependency tests
      config/                 # Config inheritance tests
      state/                  # State management tests
    integration/
      assemble.test.ts        # Full assembly flow
      phase-flow.test.ts      # Phase transition flow
      recovery.test.ts        # Error recovery scenarios
      roster.test.ts          # Roster expansion flow
  templates/                  # Project template files
    AGENTS.md.hbs             # Handlebars template for AGENTS.md generation
    config.default.json       # Default project config
    roster.default.json       # Default roster with core 6
  package.json
  tsconfig.json
  .github/
    workflows/
      ci.yml                  # Tests, lint, typecheck
      publish.yml             # npm publish on release
  README.md
  CONTRIBUTING.md
  LICENSE
```

## Testing Strategy

### Unit Tests (80%+ coverage target)
- Every persona generates valid system prompts
- Config inheritance resolves correctly
- Phase transitions follow valid state machine
- Dependency graph correctly computes execution order
- Recovery logic classifies errors and selects right action

### Integration Tests
- Full `/avengers:assemble` flow from cold start
- Phase transition with soft enforcement warnings
- Roster expansion with config inheritance
- Agent failure detection and auto-recovery
- Config generator produces valid project structure

### CI/CD Pipeline
- **On PR**: Lint (ESLint), typecheck (tsc --noEmit), unit tests, integration tests, coverage check (80%+)
- **On merge to main**: All above + build
- **On release tag**: All above + npm publish

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Plugin skeleton with TypeScript build
- Core 6 persona definitions
- `/avengers:setup` and `/avengers:help` commands
- Basic state management
- npm package structure

### Phase 2: Core Commands (Week 3-4)
- `/avengers:assemble` with Nick Fury orchestration
- `/avengers:init` config generator with templates
- `/avengers:phase` with soft enforcement
- `/avengers:status` dashboard
- `/avengers:mission` North Star tracking

### Phase 3: Advanced Features (Week 5-6)
- `/avengers:roster` with expandable characters
- Hybrid dependency management
- Nick Fury auto-recovery system
- Project type templates (web-app, cli-tool, data-pipeline, mobile-app)
- Config inheritance (global > project)

### Phase 4: Polish & Ship (Week 7-8)
- 80%+ test coverage
- CI/CD pipeline (GitHub Actions)
- README, CONTRIBUTING.md, examples
- npm publishing workflow
- Pre-built roster expansions (Black Widow, Hulk, Hawkeye, Doctor Strange, Black Panther, Scarlet Witch)
- `/avengers:debrief` and `/avengers:disassemble`
