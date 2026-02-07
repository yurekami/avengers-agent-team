# Changelog

All notable changes to the Avengers Agent Team plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-07

### Added
- Self-Driving Mode (`/self-drive`) for continuous autonomous development
- Handoff tracking (`/handoff`) for viewing agent handoff history and metrics
- Structured handoff protocol for all worker agents (TASK/DONE/TESTS/CONCERNS/DEVIATED/DISCOVERED/NEXT)
- File ownership enforcement per agent (Iron Man: architecture, Spider-Man: frontend, Thor: backend, Thanos: tests)
- Error budget tracking (5% default threshold)
- Handoff validator hook script for automated handoff quality checks
- Self-driving and handoff default templates
- `permissionMode: delegate` on Fury for built-in coordination-only enforcement
- `disallowedTools` on Fury to explicitly deny Write/Edit tools
- `maxTurns` limits on all agents
- `memory: project` for cross-session learning on all agents
- `skills` auto-loading (self-drive for Fury, handoff for workers)
- CHANGELOG.md

### Changed
- Fury agent transformed into strict Root Planner (no coding tools)
- All worker agents now include mandatory handoff reporting sections
- Captain America now includes Alignment Broadcast and Handoff Review protocols
- Thanos now includes Throughput-Aware QA and Error Budget protocols
- config.default.json expanded with selfDriving and fileOwnership sections
- README.md updated with Self-Driving Mode documentation
- test.js expanded from 40 to 47+ validation tests

## [1.0.0] - 2026-02-06

### Added
- Initial release of avengers-agent-team plugin
- 6 core agents: Fury, Iron Man, Spider-Man, Thor, Captain America, Thanos
- 6 expansion agents: Black Widow, Hulk, Hawkeye, Doctor Strange, Black Panther, Scarlet Witch
- 10 skills: assemble, init, phase, status, roster, mission, debrief, disassemble, setup, help
- 4-phase workflow: Briefing, Lab, Battle, Endgame
- 4 project templates: web-app, cli-tool, data-pipeline, mobile-app
- Session management hooks (start, stop, agent-complete)
- GitHub Actions CI workflow
- Full character immersion with Marvel personalities
