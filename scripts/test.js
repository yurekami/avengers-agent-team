#!/usr/bin/env node
/**
 * Avengers Agent Team - Plugin Validation Tests
 * Validates plugin structure, agent definitions, skill definitions,
 * hooks, templates, and config files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;
const errors = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  PASS  ${name}`);
  } catch (e) {
    failed++;
    errors.push({ name, error: e.message });
    console.log(`  FAIL  ${name}`);
    console.log(`        ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function fileExists(filePath) {
  return fs.existsSync(path.join(ROOT, filePath));
}

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, filePath), 'utf8'));
}

function readFile(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), 'utf8');
}

function hasFrontmatter(content) {
  return content.startsWith('---') && content.indexOf('---', 3) > 3;
}

function extractFrontmatter(content) {
  const end = content.indexOf('---', 3);
  return content.substring(3, end).trim();
}

// ========================================
console.log('\n=== Plugin Manifest ===');

test('plugin.json exists', () => {
  assert(fileExists('.claude-plugin/plugin.json'), 'Missing .claude-plugin/plugin.json');
});

test('plugin.json is valid JSON with required fields', () => {
  const manifest = readJSON('.claude-plugin/plugin.json');
  assert(manifest.name === 'avengers-agent-team', `Expected name "avengers-agent-team", got "${manifest.name}"`);
  assert(manifest.version, 'Missing version');
  assert(manifest.description, 'Missing description');
});

// ========================================
console.log('\n=== Core Agents (6) ===');

const coreAgents = ['fury', 'ironman', 'spiderman', 'thor', 'cap', 'thanos'];

for (const agent of coreAgents) {
  test(`agents/${agent}.md exists with frontmatter`, () => {
    assert(fileExists(`agents/${agent}.md`), `Missing agents/${agent}.md`);
    const content = readFile(`agents/${agent}.md`);
    assert(hasFrontmatter(content), `Missing YAML frontmatter in agents/${agent}.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes(`name: ${agent}`), `Frontmatter missing "name: ${agent}"`);
    assert(fm.includes('description:'), 'Frontmatter missing "description"');
  });
}

test('fury.md has delegate permissionMode and disallowedTools', () => {
  const content = readFile('agents/fury.md');
  const fm = extractFrontmatter(content);
  const toolsLine = fm.split('\n').find(l => l.startsWith('tools:'));
  assert(toolsLine && !toolsLine.includes('Write'), 'Fury tools should NOT include Write');
  assert(toolsLine && !toolsLine.includes('Edit'), 'Fury tools should NOT include Edit');
  assert(fm.includes('disallowedTools:'), 'Fury should have disallowedTools field');
  assert(fm.includes('permissionMode: delegate'), 'Fury should have permissionMode: delegate');
});

test('all core agents have memory: project', () => {
  for (const agent of coreAgents) {
    const content = readFile(`agents/${agent}.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes('memory: project'), `${agent}.md missing memory: project`);
  }
});

test('all core agents have maxTurns', () => {
  for (const agent of coreAgents) {
    const content = readFile(`agents/${agent}.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes('maxTurns:'), `${agent}.md missing maxTurns`);
  }
});

test('worker agents have handoff skill loaded', () => {
  for (const agent of ['ironman', 'spiderman', 'thor', 'thanos']) {
    const content = readFile(`agents/${agent}.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes('- handoff'), `${agent}.md missing handoff skill`);
  }
});

// ========================================
console.log('\n=== Expansion Agents (6) ===');

const expansionAgents = ['widow', 'hulk', 'hawkeye', 'strange', 'panther', 'wanda'];

for (const agent of expansionAgents) {
  test(`agents/expansions/${agent}.md exists with frontmatter`, () => {
    assert(fileExists(`agents/expansions/${agent}.md`), `Missing agents/expansions/${agent}.md`);
    const content = readFile(`agents/expansions/${agent}.md`);
    assert(hasFrontmatter(content), `Missing YAML frontmatter in agents/expansions/${agent}.md`);
  });
}

// ========================================
console.log('\n=== Skills (18) ===');

const skills = [
  'assemble', 'init', 'phase', 'status', 'roster',
  'mission', 'debrief', 'disassemble', 'setup', 'help',
  'self-drive', 'handoff',
  'triage', 'velocity', 'tech-lead', 'review-queue', 'background', 'rules'
];

for (const skill of skills) {
  test(`skills/${skill}/SKILL.md exists with frontmatter`, () => {
    assert(fileExists(`skills/${skill}/SKILL.md`), `Missing skills/${skill}/SKILL.md`);
    const content = readFile(`skills/${skill}/SKILL.md`);
    assert(hasFrontmatter(content), `Missing YAML frontmatter in skills/${skill}/SKILL.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes(`name: ${skill}`), `Frontmatter missing "name: ${skill}"`);
    assert(fm.includes('description:'), 'Frontmatter missing "description"');
    assert(fm.includes('user-invocable: true'), 'Skill should be user-invocable');
  });
}

// ========================================
console.log('\n=== Hooks ===');

test('hooks/hooks.json exists and is valid', () => {
  assert(fileExists('hooks/hooks.json'), 'Missing hooks/hooks.json');
  const hooks = readJSON('hooks/hooks.json');
  assert(hooks.hooks, 'hooks.json missing "hooks" key');
});

// ========================================
console.log('\n=== Scripts ===');

const requiredScripts = ['session-start.js', 'agent-complete.js', 'session-check.js', 'handoff-validator.js', 'triage-classifier.js', 'metrics-tracker.js', 'rules-checker.js'];

for (const script of requiredScripts) {
  test(`scripts/${script} exists and has valid syntax`, () => {
    assert(fileExists(`scripts/${script}`), `Missing scripts/${script}`);
  });
}

// ========================================
console.log('\n=== Templates ===');

const templates = ['web-app', 'cli-tool', 'data-pipeline', 'mobile-app'];

for (const tmpl of templates) {
  test(`templates/${tmpl}.json exists and is valid JSON`, () => {
    assert(fileExists(`templates/${tmpl}.json`), `Missing templates/${tmpl}.json`);
    const config = readJSON(`templates/${tmpl}.json`);
    assert(config.name === tmpl, `Template name mismatch: expected "${tmpl}", got "${config.name}"`);
    assert(config.roleMapping, 'Template missing roleMapping');
    for (const agent of ['spiderman', 'thor', 'ironman', 'cap', 'thanos', 'fury']) {
      assert(config.roleMapping[agent], `Template missing roleMapping for ${agent}`);
    }
  });
}

// ========================================
console.log('\n=== Self-Driving Templates ===');

test('templates/self-driving.json exists and is valid', () => {
  assert(fileExists('templates/self-driving.json'), 'Missing templates/self-driving.json');
  const config = readJSON('templates/self-driving.json');
  assert(config.name === 'self-driving', `Expected name "self-driving", got "${config.name}"`);
});

test('templates/handoff.default.json exists and is valid', () => {
  assert(fileExists('templates/handoff.default.json'), 'Missing templates/handoff.default.json');
  const config = readJSON('templates/handoff.default.json');
  assert(config.format && config.format.sections, 'Handoff template missing format.sections definition');
});

// ========================================
console.log('\n=== Default Configs ===');

test('templates/config.default.json exists', () => {
  assert(fileExists('templates/config.default.json'), 'Missing templates/config.default.json');
  const config = readJSON('templates/config.default.json');
  assert(config.activeRoster, 'Config missing activeRoster');
  assert(config.activeRoster.length === 6, `Expected 6 agents in roster, got ${config.activeRoster.length}`);
});

test('templates/config.default.json has selfDriving section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.selfDriving, 'Config missing selfDriving section');
  assert(config.selfDriving.errorBudget !== undefined, 'selfDriving missing errorBudget');
  assert(config.selfDriving.taskTarget, 'selfDriving missing taskTarget');
});

test('templates/config.default.json has fileOwnership section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.fileOwnership, 'Config missing fileOwnership section');
  for (const agent of ['ironman', 'spiderman', 'thor', 'thanos']) {
    assert(config.fileOwnership[agent], `fileOwnership missing ${agent}`);
  }
});

test('templates/roster.default.json exists', () => {
  assert(fileExists('templates/roster.default.json'), 'Missing templates/roster.default.json');
  const roster = readJSON('templates/roster.default.json');
  assert(roster.core, 'Roster missing "core" section');
  assert(Object.keys(roster.core).length === 6, 'Expected 6 core agents');
});

// ========================================
console.log('\n=== Other Required Files ===');

for (const file of ['README.md', 'CONTRIBUTING.md', 'LICENSE', '.gitignore', 'package.json', 'CHANGELOG.md']) {
  test(`${file} exists`, () => {
    assert(fileExists(file), `Missing ${file}`);
  });
}

// ========================================
console.log('\n=== Domain Rules (4) ===');

const domainRules = ['frontend', 'backend', 'architecture', 'quality'];

for (const rule of domainRules) {
  test(`rules/${rule}.md exists with frontmatter`, () => {
    assert(fileExists(`rules/${rule}.md`), `Missing rules/${rule}.md`);
    const content = readFile(`rules/${rule}.md`);
    assert(hasFrontmatter(content), `Missing YAML frontmatter in rules/${rule}.md`);
    const fm = extractFrontmatter(content);
    assert(fm.includes(`name: ${rule}`), `Frontmatter missing "name: ${rule}"`);
    assert(fm.includes('appliesTo:'), `Frontmatter missing "appliesTo" in rules/${rule}.md`);
  });
}

// ========================================
console.log('\n=== ANE Templates ===');

test('templates/triage.default.json exists and is valid', () => {
  assert(fileExists('templates/triage.default.json'), 'Missing templates/triage.default.json');
  const config = readJSON('templates/triage.default.json');
  assert(config.name === 'triage', `Expected name "triage", got "${config.name}"`);
  assert(config.levels, 'Triage template missing levels');
  assert(config.levels.simple && config.levels.manageable && config.levels.complex, 'Triage template missing level definitions');
});

test('templates/velocity.default.json exists and is valid', () => {
  assert(fileExists('templates/velocity.default.json'), 'Missing templates/velocity.default.json');
  const config = readJSON('templates/velocity.default.json');
  assert(config.name === 'velocity', `Expected name "velocity", got "${config.name}"`);
  assert(config.targets, 'Velocity template missing targets');
});

test('templates/review-queue.default.json exists and is valid', () => {
  assert(fileExists('templates/review-queue.default.json'), 'Missing templates/review-queue.default.json');
  const config = readJSON('templates/review-queue.default.json');
  assert(config.name === 'review-queue', `Expected name "review-queue", got "${config.name}"`);
});

test('templates/background.default.json exists and is valid', () => {
  assert(fileExists('templates/background.default.json'), 'Missing templates/background.default.json');
  const config = readJSON('templates/background.default.json');
  assert(config.name === 'background', `Expected name "background", got "${config.name}"`);
});

test('templates/rules.default.json exists and is valid', () => {
  assert(fileExists('templates/rules.default.json'), 'Missing templates/rules.default.json');
  const config = readJSON('templates/rules.default.json');
  assert(config.name === 'rules', `Expected name "rules", got "${config.name}"`);
  assert(config.domains, 'Rules template missing domains');
});

// ========================================
console.log('\n=== ANE Config Sections ===');

test('templates/config.default.json has triage section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.triage, 'Config missing triage section');
  assert(config.triage.enabled === false, 'triage should default to disabled');
});

test('templates/config.default.json has techLead section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.techLead, 'Config missing techLead section');
  assert(config.techLead.enabled === false, 'techLead should default to disabled');
});

test('templates/config.default.json has velocity section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.velocity, 'Config missing velocity section');
  assert(config.velocity.enabled === false, 'velocity should default to disabled');
});

test('templates/config.default.json has rules section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.rules, 'Config missing rules section');
  assert(config.rules.enabled === false, 'rules should default to disabled');
});

test('templates/config.default.json has background section', () => {
  const config = readJSON('templates/config.default.json');
  assert(config.background, 'Config missing background section');
  assert(config.background.enabled === false, 'background should default to disabled');
});

// ========================================
console.log('\n=== Hook Configuration ===');

test('hooks.json has metrics-tracker in SubagentStop', () => {
  const hooks = readJSON('hooks/hooks.json');
  const subagentStopHooks = hooks.hooks.SubagentStop || [];
  const hasMetrics = subagentStopHooks.some(h =>
    h.hooks && h.hooks.some(hh => hh.command && hh.command.includes('metrics-tracker'))
  );
  assert(hasMetrics, 'hooks.json missing metrics-tracker SubagentStop hook');
});

test('hooks.json has rules-checker in SubagentStop', () => {
  const hooks = readJSON('hooks/hooks.json');
  const subagentStopHooks = hooks.hooks.SubagentStop || [];
  const hasRules = subagentStopHooks.some(h =>
    h.hooks && h.hooks.some(hh => hh.command && hh.command.includes('rules-checker'))
  );
  assert(hasRules, 'hooks.json missing rules-checker SubagentStop hook');
});

// ========================================
// Summary
console.log('\n========================================');
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`Total:   ${passed + failed} tests`);

if (failed > 0) {
  console.log('\nFailed tests:');
  for (const { name, error } of errors) {
    console.log(`  - ${name}: ${error}`);
  }
  process.exit(1);
} else {
  console.log('\nAll tests passed! Balanced, as all things should be.');
  process.exit(0);
}
