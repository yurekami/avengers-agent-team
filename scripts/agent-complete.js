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

    let agentInfo = {};
    if (input.trim()) {
      try {
        agentInfo = JSON.parse(input);
      } catch (e) {
        // Ignore parse errors
      }
    }

    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const stateDir = path.join(projectDir, '.avengers', 'state');
    const agentsFile = path.join(stateDir, 'agents.json');

    const agentName = agentInfo.agent || agentInfo.name || 'Unknown';

    // Try to update agents.json if it exists
    if (fs.existsSync(agentsFile)) {
      try {
        const agentsData = JSON.parse(fs.readFileSync(agentsFile, 'utf8'));
        
        // Find and mark agent as idle
        if (agentsData.active && Array.isArray(agentsData.active)) {
          const index = agentsData.active.findIndex(a => a.name === agentName);
          if (index !== -1) {
            agentsData.active[index].status = 'idle';
            agentsData.active[index].lastCompleted = new Date().toISOString();
            
            // Create directory if needed
            if (!fs.existsSync(stateDir)) {
              fs.mkdirSync(stateDir, { recursive: true });
            }
            
            fs.writeFileSync(agentsFile, JSON.stringify(agentsData, null, 2));
          }
        }
      } catch (e) {
        // Silently continue
      }
    }

    console.log(`Agent ${agentName} completed their task.`);
  } catch (error) {
    // Silently handle errors in hook context
  }
}

main();
