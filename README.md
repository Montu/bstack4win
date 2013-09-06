bstack4win
==========

Bstack server ported to win. This is new repository just for segregation purpose. Code is also available in bstack-server repository
# New Features
1. Added comprehensive log support. Logs are generated in PROJECT_ROOT/tmp/log folder
2. Added logging/backup of registery changes kept in PROJECT_ROOT/tmp/reg folder. Registries are indexed
	using timestamp and browser for which call was made.
3. Other few minor cleanup changes

# Follow Instructions
0. Install node.js on your computer
1. Run run_bstack.bat file. This will first install dependencies and then run the server.
2. Server basics
2.1 Server runs on port 8081 which could be cleandup 
2.2 Server currently supports Chrome, Firefox, Opera and Internet Explorer.
2.3 Start command starts the browser and close command closes the browser and deletes user profile and related data.
2.4 Sample calls:
	Start Firefox : 127.0.0.1:8081/firefox/start
	Close Firefox : 127.0.0.1:8081/firefox/close
	Start Chrome : 127.0.0.1:8081/chrome/start
	Close Chrome : 172.0.0.1:8081/chrome/close
	Start IE: 127.0.0.1:8081/iexplore/start
	Close IE: 127.0.0.1:8081/iexplore/close
	Start Opera: 127.0.0.1:8081/opera/start
	Close Opera: 127.0.0.1:8081/opera/close
	
2.5 Sample calls: (With proxy change)
	Start Firefox: http://127.0.0.1:8081/firefox/start/?proxy=true&ip=127.0.0.1&port=9012
	** So on with other browsers

# Start/Stop server service 

3. Running as start stop server as service
3.1 Method 1: Using windows startup folder
	Change bastack_init.bat in order to link to absolute path of bstack_service.bat script in projects root 
	folder. Then move bstack_init.bat to windows startup folder located at C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
3.2 Method 2: Changes into registry. Make change in HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
	to add bstack_init.bat.
3.3 Next make changes to process_start_path variable in bstack_service.bat. Please direct this variable to right
	location of bstack_server.js in src folder of project root (** give absolute path **).
3.4 Just restart the server to see changes or click on bstack_init.bat in order to start the service without
	restarting.

4. Changing bstack_service.bat
4.1 timout_val -> controls how much time the scirpt should pause before rechecking the status of monitored
	program/process/script
4.2 process_name -> process being monitored. Here a child process of node.exe is being monitored as this 
	project is using node.js to run system. (** No need to change this **)
4.3 process_start_path -> which exe/script to restart if no instance found.
	
	
# Work done by batch files:
1. run_bstack.bat -> runs a singular instance of server. Which once killed doesn't restart
2. bstack_service.bat -> checks whether the start/stop server is running or not at regular time intervals.
	If not running starts the server and if running does nothing and waits for next iteration.
3. bstack_init.bat -> Its like a shortcut and just starts bstack_service.bat. Change the absolute path of
	bstack_service.bat in this file (based on your system) and run it. Should be placed in startup folder
	in order to make this service run at startup or one can add regsitry entry for this file at key location
	specified above.
	