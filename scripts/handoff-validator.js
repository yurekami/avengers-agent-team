#!/usr/bin/env node
/**
 * Avengers Agent Team - Handoff Validator
 * Validates that agent completion messages contain all required handoff sections.
 * Logs handoffs to .avengers/state/handoffs.json
 * Returns exit code 2 (send feedback) if handoff is incomplete.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_SECTIONS = ['DONE', 'TESTS', 'CONCERNS', 'DEVIATED', 'DISCOVERED', 'NEXT'];
const NEVER_EMPTY_SECTIONS = ['CONCERNS', 'DISCOVERED'];

function parseHandoffSections(text) {
  const sections = {};
  for (const section of REQUIRED_SECTIONS) {
    const regex = new RegExp(`${section}:\\s*(.+?)(?=(?:${REQUIRED_SECTIONS.join('|')}):| *$)`, 's');
    const match = text.match(regex);
    sections[section] = match ? match[1].trim() : null;
  }
  return sections;
}

function validateHandoff(sections) {
  const missing = [];
  const empty = [];

  for (const section of REQUIRED_SECTIONS) {
    if (!sections[section]) {
      missing.push(section);
    }
  }

  for (const section of NEVER_EMPTY_SECTIONS) {
    if (sections[section] && sections[section].toLowerCase() === '') {
      empty.push(section);
    }
  }

  const totalMissing = missing.length + empty.length;
  let quality;
  if (totalMissing === 0) {
    quality = 'COMPLETE';
  } else if (totalMissing <= 2) {
    quality = 'PARTIAL';
  } else {
    quality = 'INSUFFICIENT';
  }

  return { missing, empty, quality };
}

async function main() {
  try {
    let input = '';

    // Read stdin
    for await (const chunk of process.stdin) {
      input += chunk;
    }

    let agentInfo = {};
    if (input.trim()) {
      try {
        agentInfo = JSON.parse(input);
      } catch (e) {
        // Not JSON, treat as raw text
        agentInfo = { output: input };
      }
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const stateDir = path.join(projectDir, '.avengers', 'state');
    const handoffsFile = path.join(stateDir, 'handoffs.json');
    const configFile = path.join(projectDir, '.avengers', 'config.json');

    // Check if self-driving mode is enabled
    let selfDrivingEnabled = false;
    if (fs.existsSync(configFile)) {
      try {
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        selfDrivingEnabled = config.selfDriving && config.selfDriving.enabled;
      } catch (e) {
        // Ignore config parse errors
      }
    }

    // Only validate handoffs if self-driving mode is enabled
    if (!selfDrivingEnabled) {
      process.exit(0);
    }

    const agentName = agentInfo.agent || agentInfo.name || 'Unknown';
    const agentOutput = agentInfo.output || agentInfo.response || '';

    // Parse handoff sections from agent output
    const sections = parseHandoffSections(agentOutput);
    const validation = validateHandoff(sections);

    // Ensure state directory exists
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }

    // Load existing handoffs
    let handoffs = { entries: [], metrics: { total: 0, complete: 0, partial: 0, insufficient: 0 } };
    if (fs.existsSync(handoffsFile)) {
      try {
        handoffs = JSON.parse(fs.readFileSync(handoffsFile, 'utf8'));
      } catch (e) {
        // Reset if corrupted
      }
    }

    // Log this handoff
    const handoffEntry = {
      id: handoffs.metrics.total + 1,
      agent: agentName,
      timestamp: new Date().toISOString(),
      task: sections.DONE ? sections.DONE.substring(0, 100) : 'Unknown',
      sections: sections,
      quality: validation.quality,
      missing: validation.missing,
      concerns: sections.CONCERNS || null
    };

    handoffs.entries.push(handoffEntry);
    handoffs.metrics.total++;
    handoffs.metrics[validation.quality.toLowerCase()]++;

    // Keep only last 100 handoffs to prevent file bloat
    if (handoffs.entries.length > 100) {
      handoffs.entries = handoffs.entries.slice(-100);
    }

    fs.writeFileSync(handoffsFile, JSON.stringify(handoffs, null, 2));

    // Output feedback based on quality
    if (validation.quality === 'INSUFFICIENT') {
      console.log(`HANDOFF INCOMPLETE - Agent ${agentName} is missing ${validation.missing.length} required sections: ${validation.missing.join(', ')}`);
      console.log('All handoffs must include: DONE, TESTS, CONCERNS, DEVIATED, DISCOVERED, NEXT');
      process.exit(2); // Send feedback to agent
    } else if (validation.quality === 'PARTIAL') {
      console.log(`HANDOFF PARTIAL - Agent ${agentName} is missing: ${validation.missing.join(', ')}. Please include all sections in future handoffs.`);
    } else {
      console.log(`HANDOFF COMPLETE - Agent ${agentName} provided a full handoff report.`);
    }
  } catch (error) {
    // Silently handle errors in hook context - don't break the pipeline
    process.exit(0);
  }
}

main();
