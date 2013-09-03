/* Usage: 
 * First call npm install to install dependencies
 * To start first install node.js on your computer and then run in shell : node bstact_server.js
 * In browser type: http://127.0.0.1:8081/firefox/start to start firefox and /firefox/close to close it
 * and completely delete the data. Support for Safari Added.
 * ** This could be more cleaned up by making a routes like config file which at
 * start of application is loaded on a mapping hash
 * **** Thoroughly tested for Firefox. Stop command partially tested for Chrome and Safari
 * Stop by default clears the entier browser data and makes it a fresh browser ready to run 
 * next time. 
 */

var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require('url'),
fs = require("fs"),
fsex = require("fs-extra"),
exec = require('child_process').exec,
plist = require('plist'),
global = require('../global.js'),
browser_location = "",
browser_name = "",
browser_data_location = "",
_supported_browsers = ['firefox','chrome','iexplore','opera']

var isEmptyObject = function(obj) {

	console.log("INside isEmptyObject: " + Object.keys(obj).length)
	return Object.keys(obj).length == 0
}

var prepareStartCmd = function(cmd) {
	console.log ("Command to prepare : " + cmd)
	return "\"" + cmd + "\""
}

var prepareKillCmd = function(browser_key) {
	return "taskkill /f /im " + browser_key + ".exe"
}

var get_env_var_based_addr = function (env_var_string) {
	switch (env_var_string) {
		case "%APPDATA%":
			return process.env.APPDATA
		case "%LOCALAPPDATA%":
			return process.env.LOCALAPPDATA
		default:
			return "unknown"
	}
}

var prepareDeletePath = function(browser_data_location) {
	split_path_array = browser_data_location.split("/")
	present_env_addr = get_env_var_based_addr (split_path_array[0])
	return_location = present_env_addr + '/' + split_path_array.splice(1).join('/')
	console.log("Delete path location : " + return_location)
	return return_location
}

var isBrowserSupported = function(browser_key) {
	return (_supported_browsers.indexOf(browser_key) >= 0)
}

var _callback_arg_func = function(error, stdout, stderr) {
					console.log('stdout: ' + stdout)
					console.log('stderr: ' + stderr)
					if(error != null) {
						console.log('exec error: ' + error)
					}
				}

// console.log("Directory name " + (__dirname || "Not Found"))

my_http.createServer(function(request, response) {

	
	// Prepare URL data
	//console.log("URL :" + request.url)
	var parsed_url = url.parse(request.url, true)
	//console.log(JSON.stringify(parsed_url))
	var var_path = parsed_url.pathname
	//console.log("var_path :" + var_path)
	var query = parsed_url.query
	var split_path = var_path.split('/')
	//console.log(split_path)
	//console.log(query.proxy + " " + query.address + " " + query.port + "printed\n")
	
	// Load configuration file
	var mapping = JSON.parse(fs.readFileSync(global.project_root+"/config/browser_mapper.json"))
	//console.log(JSON.stringify(mapping))
	
	var browser_key = split_path[1]
	var browser_command = split_path[2]
	
	//if(isBrowserSupported(browser_key) >= 0) {
	if(['firefox','chrome','iexplore','opera'].indexOf(browser_key) >= 0)
	{
		
		// Load current browser data
		console.log("Browser Key : " + browser_key)
		var current_browser = mapping[browser_key]
		if (isEmptyObject(current_browser)){
			 throw new Error("Wrong browser or wrong argument")
		}
		var browser_name = current_browser.browser_name
		var browser_exe_location = current_browser.browser_exe_location
		var browser_data_location = current_browser.browser_data_location
		var browser_config_location = current_browser.browser_config_location


		switch (browser_command) {
			case "start":
				exec (prepareStartCmd(browser_exe_location), _callback_arg_func)
				response.writeHeader(200, {"Content-Type": "text/plain"})
				response.write(browser_name + " started")
				response.end()
				break
			case "close":
				exec (prepareKillCmd(browser_key))
				fsex.remove(prepareDeletePath(browser_data_location), _callback_arg_func)
				console.log(prepareDeletePath(browser_data_location))
				response.writeHeader(200, {"Content-Type": "text/plain"})
				response.write(browser_name + " Closed and Browswer data deleted!")
				response.end()
				break
			default:
				response.writeHeader(404, {"Content-Type": "text/plain"})
				response.write("No such command")
				response.end()
		}
	} else {
		response.writeHeader(404, {"Content-Type": "text/plain"})
		response.write("Browser Not Supported")
		response.end()
	}
	browser_key = ''
	browser_command = ''
}).listen(8081)
sys.puts("Server Running on 8081")
