#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function main() {
  try {
    let input = '';
    
    // Read stdin
    for await (const chunk of process.stdin) {
      input += chunk;
    }

    let sessionInfo = {};
    if (input.trim()) {
      try {
        sessionInfo = JSON.parse(input);
      } catch (e) {
        // Ignore parse errors, continue with empty object
      }
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const stateDir = path.join(projectDir, '.avengers', 'state');
    const phaseFile = path.join(stateDir, 'phase.json');

    // Check if active session exists
    if (fs.existsSync(phaseFile)) {
      try {
        const phaseData = JSON.parse(fs.readFileSync(phaseFile, 'utf8'));
        const mission = phaseData.mission || 'Unknown mission';
        const phase = phaseData.phase || 'unknown';
        
        console.log(`AVENGERS BRIEFING: ${mission}`);
        console.log(`Current Phase: ${phase}`);
        console.log(`Use /avengers-agent-team:assemble to review roster.`);
      } catch (e) {
        // Fall through to welcome
        console.log('Welcome to Avengers Agent Team. Say /avengers-agent-team:assemble to begin.');
      }
    } else {
      console.log('Welcome to Avengers Agent Team. Say /avengers-agent-team:assemble to begin.');
    }
  } catch (error) {
    console.log('Welcome to Avengers Agent Team. Say /avengers-agent-team:assemble to begin.');
  }
}

main();
