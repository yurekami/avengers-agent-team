#!/usr/bin/env node
/**
 * Avengers Agent Team - Triage Classifier
 * Helper script for programmatic task triage.
 * Called by hooks to auto-classify tasks.
 * Pattern: same stdin/stdout as handoff-validator.js
 */

const fs = require('fs');
const path = require('path');

const SIMPLE_KEYWORDS = ['fix typo', 'rename', 'update text', 'change color', 'bump version', 'update label', 'fix spacing', 'remove unused'];
const COMPLEX_KEYWORDS = ['refactor', 'redesign', 'migrate', 'overhaul', 'rewrite', 'restructure', 'rearchitect', 'split into'];
const MANAGEABLE_KEYWORDS = ['add feature', 'implement', 'create component', 'add endpoint', 'write test', 'add validation'];

function classifyTask(description) {
  const lower = description.toLowerCase();

  // Score each dimension
  let scope = 0.5;
  let ambiguity = 0.5;
  let risk = 0.5;

  // Scope scoring
  if (SIMPLE_KEYWORDS.some(k => lower.includes(k))) scope = 0.1;
  else if (COMPLEX_KEYWORDS.some(k => lower.includes(k))) scope = 0.9;
  else if (MANAGEABLE_KEYWORDS.some(k => lower.includes(k))) scope = 0.5;

  // Ambiguity scoring
  if (lower.includes('not sure') || lower.includes('maybe') || lower.includes('somehow')) ambiguity = 0.9;
  else if (lower.includes('specific') || lower.includes('exactly') || lower.includes('just')) ambiguity = 0.2;

  // Risk scoring
  if (lower.includes('database') || lower.includes('auth') || lower.includes('payment') || lower.includes('security')) risk = 0.8;
  else if (lower.includes('test') || lower.includes('doc') || lower.includes('comment') || lower.includes('readme')) risk = 0.1;

  // Weighted score
  const score = (scope * 0.4) + (ambiguity * 0.35) + (risk * 0.25);

  let level, codename, routing;
  if (score < 0.35) {
    level = 'simple';
    codename = 'Quick Strike';
    routing = 'direct-to-worker';
  } else if (score < 0.65) {
    level = 'manageable';
    codename = 'Solo Op';
    routing = 'background-queue';
  } else {
    level = 'complex';
    codename = 'Full Assemble';
    routing = 'full-assemble';
  }

  return { level, codename, routing, dimensions: { scope, ambiguity, risk }, score };
}

async function main() {
  try {
    let input = '';
    for await (const chunk of process.stdin) {
      input += chunk;
    }

    let taskInfo = {};
    if (input.trim()) {
      try {
        taskInfo = JSON.parse(input);
      } catch (e) {
        taskInfo = { description: input.trim() };
      }
    }

    const description = taskInfo.description || taskInfo.task || '';
    if (!description) {
      process.exit(0);
    }

    const result = classifyTask(description);
    console.log(JSON.stringify(result));
  } catch (error) {
    process.exit(0);
  }
}

main();
