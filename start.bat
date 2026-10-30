@echo off
chcp 65001 >nul
title 牛排安逸的小屋 - 本地预览服务
cd /d "%~dp0"
python preview.py
pause
