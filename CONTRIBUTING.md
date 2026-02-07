# Contributing to avengers-agent-team

Thank you for contributing to the Avengers Initiative!

## How to Contribute

### Adding a New Avenger

1. Create `agents/expansions/your-character.md` with YAML frontmatter:
   ```yaml
   ---
   name: character-id
   description: "Character Name - Role. One-line description of when to use this agent."
   tools: Read, Write, Edit, Bash, Grep, Glob
   model: sonnet
   ---
   ```

2. Write the persona with:
   - Character identity and personality
   - Role and responsibilities
   - Communication style with signature lines
   - Technical standards for their domain
   - Phase-specific behavior

3. Test by loading the plugin locally:
   ```bash
   claude --plugin-dir ./avengers-agent-team
   ```

4. Submit a PR with the new agent file.

### Adding a Project Template

1. Create `templates/your-template.json` following existing template structure
2. Define role mappings for all 6 core agents
3. Include clear descriptions of how each role adapts

### Fixing Issues

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Test with Claude Code locally
4. Submit a PR with clear description

### Commit Messages

```
feat: Add Black Widow security specialist agent
fix: Correct Thanos review report format
docs: Update README quick start guide
```

## Code of Conduct

Be respectful, constructive, and collaborative. We're all on the same team.

## Questions?

Open an issue or start a discussion.

---

**"The world is changing. It's time we change with it."** - Nick Fury
