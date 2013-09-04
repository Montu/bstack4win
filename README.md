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
2.3 Sample calls:
	Start Firefox : 127.0.0.1:8081/firefox/start
	Close Firefox : 127.0.0.1:8081/firefox/close
	Start Chrome : 127.0.0.1:8081/chrome/start
	Close Chrome : 172.0.0.1:8081/chrome/close
	Start IE: 127.0.0.1:8081/iexplore/start
	Close IE: 127.0.0.1:8081/iexplore/close
	Start Opera: 127.0.0.1:8081/opera/start
	Close Opera: 127.0.0.1:8081/opera/close
	
2.4 Sample calls: (With proxy change)
	Start Firefox: http://127.0.0.1:8081/firefox/start/?proxy=true&ip=127.0.0.1&port=9012
	** So on with other browsers
	
** Code has been made modular but not subdivided into files. Further a configuration json file containing information regarding various aspects of browser is placed
in config folder. Hence to add another browser that file needs to be edited with relevant data.
