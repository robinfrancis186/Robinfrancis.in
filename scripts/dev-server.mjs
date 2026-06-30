#!/usr/bin/env node
/**
 * Enhanced Development Server
 * Starts Next.js with helpful logging and error handling
 */

import { spawn } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue.bold('\n🚀 Starting Next.js Development Server...\n'));

const next = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

next.on('error', (error) => {
  console.error(chalk.red.bold('\n❌ Failed to start dev server:'), error);
  process.exit(1);
});

next.on('close', (code) => {
  if (code !== 0) {
    console.error(chalk.red.bold(`\n❌ Dev server exited with code ${code}`));
    process.exit(code);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow.bold('\n\n👋 Shutting down dev server...'));
  next.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  next.kill('SIGTERM');
  process.exit(0);
});
