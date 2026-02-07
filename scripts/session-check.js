#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function main() {
  try {
    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const stateDir = path.join(projectDir, '.avengers', 'state');
    
    // Check if state directory exists
    if (!fs.existsSync(stateDir)) {
      return; // No active state
    }

    // Check for active tasks or incomplete missions
    const phaseFile = path.join(stateDir, 'phase.json');
    const agentsFile = path.join(stateDir, 'agents.json');
    
    let hasActiveTasks = false;

    // Check phase file
    if (fs.existsSync(phaseFile)) {
      try {
        const phaseData = JSON.parse(fs.readFileSync(phaseFile, 'utf8'));
        // If phase is not "complete" or "debrief", there are active tasks
        if (phaseData.phase && !['complete', 'debrief'].includes(phaseData.phase)) {
          hasActiveTasks = true;
        }
      } catch (e) {
        // Ignore
      }
    }

    // Check agents file
    if (fs.existsSync(agentsFile)) {
      try {
        const agentsData = JSON.parse(fs.readFileSync(agentsFile, 'utf8'));
        // If any agent is not idle, there are active tasks
        if (agentsData.active && Array.isArray(agentsData.active)) {
          hasActiveTasks = hasActiveTasks || agentsData.active.some(a => a.status !== 'idle');
        }
      } catch (e) {
        // Ignore
      }
    }

    if (hasActiveTasks) {
      console.log('Avengers still have active missions. Use /avengers-agent-team:debrief to wrap up or /avengers-agent-team:disassemble to end session.');
    }
  } catch (error) {
    // Silently handle errors in hook context
  }
}

main();
