#!/usr/bin/env node

// Bypass npm and run Next.js dev directly
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables to disable strict checking
process.env.ESLINT_NO_DEV_ERRORS = 'true';
process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.NEXT_TELEMETRY_DISABLED = '1';

// Run Next.js dev server directly
const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');
const child = spawn('node', [nextBin, 'dev', '--port', '3001'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

child.on('error', (error) => {
  console.error('Failed to start dev server:', error);
});

child.on('close', (code) => {
  console.log(`Dev server exited with code ${code}`);
});
