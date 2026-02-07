#!/usr/bin/env node
/**
 * Avengers Agent Team - Rules Checker
 * SubagentStop hook that checks agent output against domain rules.
 * Pattern: same as handoff-validator.js
 */

const fs = require('fs');
const path = require('path');

// Auto-detection patterns per domain
const DETECTION_PATTERNS = {
  frontend: [
    { pattern: /style=\{\{/, message: 'Inline style detected', level: 'mustNot' },
    { pattern: /:\s*any\b/, message: 'any type detected', level: 'mustNot' },
    { pattern: /console\.log\(/, message: 'console.log detected', level: 'mustNot' },
    { pattern: /@ts-ignore/, message: '@ts-ignore detected', level: 'mustNot' },
    { pattern: /\bvar\s+/, message: 'var declaration detected', level: 'mustNot' }
  ],
  backend: [
    { pattern: /`[^`]*\$\{[^}]*\}[^`]*`[^;]*(?:query|exec)/i, message: 'String interpolation in SQL query', level: 'mustNot' },
    { pattern: /['"]sk-|api_key\s*=\s*['"]|password\s*=\s*['"][^'"]{3,}/, message: 'Hardcoded secret detected', level: 'mustNot' },
    { pattern: /eval\s*\(/, message: 'eval() usage detected', level: 'mustNot' },
    { pattern: /readFileSync|writeFileSync/, message: 'Sync file I/O detected', level: 'mustNot' },
  ],
  architecture: [
    { pattern: /export \* from/, message: 'Barrel re-export detected', level: 'mustNot' }
  ],
  quality: [
    { pattern: /\.skip\s*\(/, message: 'Skipped test detected', level: 'mustNot' },
    { pattern: /eslint-disable(?!\s*--)/, message: 'ESLint disable without justification', level: 'mustNot' }
  ]
};

// Map agent names to their domains
const AGENT_DOMAINS = {
  spiderman: 'frontend',
  'spider-man': 'frontend',
  thor: 'backend',
  ironman: 'architecture',
  'iron-man': 'architecture',
  thanos: 'quality'
};

async function main() {
  try {
    let input = '';
    for await (const chunk of process.stdin) {
      input += chunk;
    }

    let agentInfo = {};
    if (input.trim()) {
      try {
        agentInfo = JSON.parse(input);
      } catch (e) {
        agentInfo = { output: input };
      }
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const configFile = path.join(projectDir, '.avengers', 'config.json');

    // Check if rules engine is enabled
    let rulesEnabled = false;
    let enforcement = 'warn';
    if (fs.existsSync(configFile)) {
      try {
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        rulesEnabled = config.rules && config.rules.enabled;
        enforcement = (config.rules && config.rules.enforcement) || 'warn';
      } catch (e) {
        // Ignore config parse errors
      }
    }

    if (!rulesEnabled) {
      process.exit(0);
    }

    const agentName = (agentInfo.agent || agentInfo.name || '').toLowerCase();
    const domain = AGENT_DOMAINS[agentName];

    if (!domain) {
      // Agent doesn't have a domain mapping, skip
      process.exit(0);
    }

    const agentOutput = agentInfo.output || agentInfo.response || '';
    const patterns = DETECTION_PATTERNS[domain] || [];

    const violations = [];
    for (const { pattern, message, level } of patterns) {
      if (pattern.test(agentOutput)) {
        violations.push({ message, level });
      }
    }

    if (violations.length === 0) {
      process.exit(0);
    }

    const mustNotViolations = violations.filter(v => v.level === 'mustNot');
    const shouldViolations = violations.filter(v => v.level === 'should');

    // Output violations
    const lines = [];
    if (mustNotViolations.length > 0) {
      lines.push(`RULES VIOLATION (${domain}) - ${mustNotViolations.length} MUST NOT violation(s):`);
      for (const v of mustNotViolations) {
        lines.push(`  - ${v.message}`);
      }
    }
    if (shouldViolations.length > 0) {
      lines.push(`RULES WARNING (${domain}) - ${shouldViolations.length} SHOULD violation(s):`);
      for (const v of shouldViolations) {
        lines.push(`  - ${v.message}`);
      }
    }

    console.log(lines.join('\n'));

    // Exit code 2 sends feedback to agent for MUST NOT violations in block mode
    if (enforcement === 'block' && mustNotViolations.length > 0) {
      process.exit(2);
    }
  } catch (error) {
    // Silently handle errors
    process.exit(0);
  }
}

main();
