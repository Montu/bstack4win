/* Usage: 
 * @Author : Akshay Bhardwaj
 * @Usage: Install node.js on your computer and run the batch file placed in project's root folder.
 */

// Variable declaration starts
var sys = require("sys"),
my_http = require("http"),
path = require("path"),
url = require('url'),
fs = require("fs"),
fsex = require("fs-extra"),
exec = require('child_process').exec,
plist = require('plist'),
global = require('../global.js'),
_supported_browsers = ['firefox','chrome','iexplore','opera']
// Variable declaration ends

// Helper Function Definitions start (This could be moved to _helper.js for clearity, which will be done in next iteration
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

// Helper function definitions end

my_http.createServer(function(request, response) {

	
	// Prepare URL data
	var parsed_url = url.parse(request.url, true)
	var var_path = parsed_url.pathname
	var query = parsed_url.query
	var split_path = var_path.split('/')

	
	// Load configuration file
	var mapping = JSON.parse(fs.readFileSync(global.project_root+"/config/browser_mapper.json"))
	
	var browser_key = split_path[1]
	var browser_command = split_path[2]
	
	//if(isBrowserSupported(browser_key) >= 0) {
	// Facing some weird error in isBrowserSupported implementation hence shifted to alternative implementation.
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
