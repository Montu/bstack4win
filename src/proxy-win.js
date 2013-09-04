var proxywin = exports,
fs = require('fs'),
exec = require('child_process').exec,
global = require('../global.js')

var _callback_exec = function (error, stdout, stderr) {
    global.logger.log('stdout: ' + stdout)
    global.logger.log('stderr: ' + stderr)
    if (error !== null) {
      global.logger.log('exec error: ' + error)
    }
}


proxywin.generateProxyEditReg = function(ip_addr, port) {
	var generated_string = "Windows Registry Editor Version 5.00\n"
	generated_string += "[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings]\n"
	generated_string += "\"MigrateProxy\"=dword:00000001\n"
	generated_string += "\"ProxyEnable\"=dword:00000001\n"
	generated_string += "\"ProxyServer\"=\"" + ip_addr + ":" +port+ "\"\n"
	generated_string += "\"ProxyOverride\"=\"<local>\"\n"
	global.logger.info("Created registry script string to alter proxy settings. File content : " + generated_string)
	return generated_string
}

proxywin.createRegFile = function(reg_str, key) {
	var file_name = global.project_root + "/tmp/reg/" + key+(new Date().getTime())+".reg"
	fs.writeFileSync(file_name, reg_str)
	global.logger.info("Created registry script to altery proxy settings. File Locaiton: " + file_name)
	return file_name
}

proxywin.executeRegFile = function(reg_file_name) {
	global.logger.info("Starting registry script execution -> file_name: " + reg_file_name)
	exec("regedit.exe -S " + reg_file_name, _callback_exec)
	global.logger.info("Finished registry script execution -> file_name: " + reg_file_name)
	
}
	
	
	