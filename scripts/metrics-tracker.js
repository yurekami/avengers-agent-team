#!/usr/bin/env node
/**
 * Avengers Agent Team - Metrics Tracker
 * SubagentStop hook that updates velocity metrics on every agent completion.
 * Pattern: same as handoff-validator.js
 */

const fs = require('fs');
const path = require('path');

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
    const stateDir = path.join(projectDir, '.avengers', 'state');
    const velocityFile = path.join(stateDir, 'velocity.json');
    const configFile = path.join(projectDir, '.avengers', 'config.json');

    // Check if velocity tracking is enabled
    let velocityEnabled = false;
    if (fs.existsSync(configFile)) {
      try {
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        velocityEnabled = config.velocity && config.velocity.enabled;
      } catch (e) {
        // Ignore config parse errors
      }
    }

    if (!velocityEnabled) {
      process.exit(0);
    }

    // Ensure state directory exists
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }

    // Load existing velocity data
    let velocity = {
      entries: [],
      summary: {
        totalTasks: 0,
        totalErrors: 0,
        startTime: null,
        lastUpdate: null,
        currentAPM: 0,
        currentTasksPerHour: 0,
        errorRate: 0
      }
    };

    if (fs.existsSync(velocityFile)) {
      try {
        velocity = JSON.parse(fs.readFileSync(velocityFile, 'utf8'));
      } catch (e) {
        // Reset if corrupted
      }
    }

    const now = new Date().toISOString();
    const agentName = agentInfo.agent || agentInfo.name || 'Unknown';

    // Initialize start time on first entry
    if (!velocity.summary.startTime) {
      velocity.summary.startTime = now;
    }

    // Count errors from agent output (look for CRITICAL/HIGH in output)
    const output = agentInfo.output || agentInfo.response || '';
    const errorMatches = (output.match(/\[C\d{3}\]|\[H\d{3}\]/g) || []).length;

    // Add entry
    velocity.summary.totalTasks++;
    velocity.summary.totalErrors += errorMatches;

    const entry = {
      timestamp: now,
      agent: agentName,
      taskId: velocity.summary.totalTasks,
      completionCount: velocity.summary.totalTasks,
      runningAPM: 0,
      errorsFound: errorMatches
    };

    // Calculate APM
    const startMs = new Date(velocity.summary.startTime).getTime();
    const nowMs = new Date(now).getTime();
    const elapsedMinutes = Math.max((nowMs - startMs) / 60000, 1);
    const elapsedHours = Math.max(elapsedMinutes / 60, 0.0167);

    entry.runningAPM = parseFloat((velocity.summary.totalTasks / elapsedMinutes).toFixed(3));

    velocity.entries.push(entry);

    // Keep only last 100 entries (rolling window)
    if (velocity.entries.length > 100) {
      velocity.entries = velocity.entries.slice(-100);
    }

    // Update summary
    velocity.summary.lastUpdate = now;
    velocity.summary.currentAPM = entry.runningAPM;
    velocity.summary.currentTasksPerHour = parseFloat((velocity.summary.totalTasks / elapsedHours).toFixed(2));
    velocity.summary.errorRate = velocity.summary.totalTasks > 0
      ? parseFloat((velocity.summary.totalErrors / velocity.summary.totalTasks).toFixed(3))
      : 0;

    fs.writeFileSync(velocityFile, JSON.stringify(velocity, null, 2));

    // Report if at report interval
    const reportInterval = 10;
    if (velocity.summary.totalTasks % reportInterval === 0) {
      console.log(`VELOCITY REPORT - ${velocity.summary.totalTasks} tasks complete | APM: ${velocity.summary.currentAPM} | Error Rate: ${(velocity.summary.errorRate * 100).toFixed(1)}%`);
    }
  } catch (error) {
    // Silently handle errors in hook context
    process.exit(0);
  }
}

main();
