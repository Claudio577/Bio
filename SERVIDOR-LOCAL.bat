@echo off
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 goto fallback
start "BioMundo" "http://localhost:8000"
py -3 -m http.server 8000 --bind 127.0.0.1
goto end
:fallback
where python >nul 2>nul
if errorlevel 1 goto missing
start "BioMundo" "http://localhost:8000"
python -m http.server 8000 --bind 127.0.0.1
goto end
:missing
echo Python 3 nao encontrado. Abra index.html para jogar sem PWA.
echo Consulte o README.md para publicar no GitHub Pages.
:end
pause
