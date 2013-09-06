REM Set the process name as process_name below
set process_name=node.exe
set process_start_path="C:\Users\Akshay\Documents\Workspace\bstack4win\src\bstack_server.js"
set 
REM Set timout value in seconds
set timeout_val=10
@ECHO OFF
:start
tasklist /FI "IMAGENAME eq %process_name%" 2>NUL | find /I /N "%process_name%">NUL
if "%ERRORLEVEL%" NEQ "0" cmd /c start node %process_start_path%
timeout %timeout_val%
goto start



