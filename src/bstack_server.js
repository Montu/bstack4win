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
proxywin = require('./proxy-win.js'),
helper = require('./helper.js')
// Variable declaration ends


my_http.createServer(function(request, response) {

	
	// Prepare URL data
	global.logger.info("Request received with URL: " + request.url)
	var parsed_url = url.parse(request.url, true)
	var var_path = parsed_url.pathname
	var query = parsed_url.query
	var split_path = var_path.split('/')

	
	// Load configuration file
	global.logger.info("Loading browser_mapper.json")
	var mapping = JSON.parse(fs.readFileSync(global.project_root+"/config/browser_mapper.json"))
	var browser_key = split_path[1]
	var browser_command = split_path[2]
	global.logger.info("Completed: Loading browser_mapper.json")
	
	//if(isBrowserSupported(browser_key) >= 0) {
	// Facing some weird error in isBrowserSupported implementation hence shifted to alternative implementation.
	if(helper._supported_browsers.indexOf(browser_key) >= 0)
	{
		
		// Load current browser data
		global.logger.info("Loading Current Browser Data | Browser Key : " + browser_key)
		var current_browser = mapping[browser_key]
		if (helper.isEmptyObject(current_browser)){
			 throw new Error("Wrong browser or wrong argument")
		}
		var browser_name = current_browser.browser_name
		var browser_exe_location = current_browser.browser_exe_location
		var browser_data_location = current_browser.browser_data_location
		var browser_config_location = current_browser.browser_config_location
		global.logger.info("Loaded browser data | Browser_name = " + browser_name)
		
		switch (browser_command) {
			case "start":
				exec (helper.prepareStartCmd(browser_exe_location), helper._callback_arg_func)
				response.writeHeader(200, {"Content-Type": "text/plain"})
				response.write(browser_name + " started")
				response.end()
				break
			case "close":
				exec (helper.prepareKillCmd(browser_key))
				fsex.remove(helper.prepareDeletePath(browser_data_location), helper._callback_arg_func)
				global.logger.info(helper.prepareDeletePath(browser_data_location))
				response.writeHeader(200, {"Content-Type": "text/plain"})
				response.write(browser_name + " Closed and Browswer data deleted!")
				response.end()
				break
			default:
				response.writeHeader(404, {"Content-Type": "text/plain"})
				response.write("No such command")
				response.end()
		}
		
		if (!helper.isEmptyObject(query)) {
			if(query.proxy == 'true' && helper.isDefined(query.ip) && helper.isDefined(query.port)) {
				var proxy_data = proxywin.generateProxyEditReg(query.ip, query.port)
				var reg_file_loc = proxywin.createRegFile(proxy_data, browser_key)
				if(proxywin.executeRegFile(reg_file_loc))
					global.logger.info("Successfully executed registry script: " + reg_file_loc)
				else
					global.logger.info("Unsuccessfully executed registry script: " + reg_file_loc)
			}
		}
	} else {
		response.writeHeader(404, {"Content-Type": "text/plain"})
		response.write("Browser Not Supported")
		response.end()
	}
	
	// Reset browser_key and browser_command | Not necessary
	browser_key = ''
	browser_command = ''
	query = ''
}).listen(8081)
global.logger.info("Server Running on port: 8081")
