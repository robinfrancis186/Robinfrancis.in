#!/usr/bin/env node
/**
 * Enhanced Development Server
 * Starts Vite with helpful logging and error handling
 */

import { spawn } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue.bold('\n🚀 Starting Development Server...\n'));

const vite = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

vite.on('error', (error) => {
  console.error(chalk.red.bold('\n❌ Failed to start dev server:'), error);
  process.exit(1);
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.error(chalk.red.bold(`\n❌ Dev server exited with code ${code}`));
    process.exit(code);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(chalk.yellow.bold('\n\n👋 Shutting down dev server...'));
  vite.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  vite.kill('SIGTERM');
  process.exit(0);
});
