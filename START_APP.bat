@echo off
title Maha Prabhu Jewellers App Launcher
cd /d "%~dp0"
echo ========================================================
echo   MAHA PRABHU JEWELLERS - STARTING APPLICATION
echo ========================================================
echo.
echo Starting development server on http://localhost:3000...
echo The app will open in your default browser automatically.
echo.
start http://localhost:3000
npm run dev -- --port 3000 --host
pause
