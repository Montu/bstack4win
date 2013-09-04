// Helper Function Definitions start (This could be moved to _helper.js for clearity, which will be done in next iteration
var helper = exports,
	global = require('../global.js')

helper._supported_browsers = ['firefox','chrome','iexplore','opera']

helper.isEmptyObject = function(obj) {

	global.logger.info("Inside isEmptyObject: " + Object.keys(obj).length)
	return Object.keys(obj).length === 0
}

helper.isUndefined = function(obj) {
	return typeof obj === 'undefined'
}

helper.isDefined = function(obj) {
	return !(typeof(obj) === 'undefined')
}

helper.prepareStartCmd = function(cmd) {
	global.logger.info ("Inside prepareStartCmd: Command to prepare : " + cmd)
	return "\"" + cmd + "\""
}

helper.prepareKillCmd = function(browser_key) {
	global.logger.info ("Inside prepareKillCmd: browser_key: " + browser_key)
	return "taskkill /f /im " + browser_key + ".exe"
}

helper.get_env_var_based_addr = function (env_var_string) {
	switch (env_var_string) {
		case "%APPDATA%":
			return process.env.APPDATA
		case "%LOCALAPPDATA%":
			return process.env.LOCALAPPDATA
		default:
			return "unknown"
	}
}

helper.prepareDeletePath = function(browser_data_location) {
	split_path_array = browser_data_location.split("/")
	present_env_addr = get_env_var_based_addr (split_path_array[0])
	return_location = present_env_addr + '/' + split_path_array.splice(1).join('/')
	console.log("Delete path location : " + return_location)
	return return_location
}

helper.isBrowserSupported = function(browser_key) {
	return (_supported_browsers.indexOf(browser_key) >= 0)
}

helper._callback_arg_func = function(error, stdout, stderr) {
					console.log('stdout: ' + stdout)
					console.log('stderr: ' + stderr)
					if(error != null) {
						console.log('exec error: ' + error)
					}
				}
				


// Helper function definitions end
