@echo off
echo ========================================================
echo   Starting ProcureSaathi (FastAPI Backend + Vite UI)
echo ========================================================

start "ProcureSaathi Backend (FastAPI)" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"
timeout /t 2 /nobreak >nul
start "ProcureSaathi Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo ProcureSaathi services launched!
echo - Backend API:  http://127.0.0.1:8000/docs
echo - Frontend App: http://127.0.0.1:5173
echo.
pause
