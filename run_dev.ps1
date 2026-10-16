# ProcureSaathi Local Development Runner (PowerShell)
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  Launching ProcureSaathi Dev Services                  " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m uvicorn main:app --reload --port 8000"

Start-Sleep -Seconds 2

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nProcureSaathi Dev Services Started!" -ForegroundColor Cyan
Write-Host "• Backend Swagger API: http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host "• Frontend Dashboard:   http://127.0.0.1:5173" -ForegroundColor Yellow
