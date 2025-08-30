@echo off
echo Starting Next.js development server...
set NODE_ENV=development
set ESLINT_NO_DEV_ERRORS=true
set DISABLE_ESLINT_PLUGIN=true
npx next dev --port 3001
pause
