/*
 * @Author: Akshay Bhardwaj
 * @Description: Module containing global settings and functions related to logging
 */

var global = exports,
	winston = require('winston')
	
global.project_root = __dirname
global.log_addr = global.project_root + "/tmp/log/bstack.log"
global.logger = new (winston.Logger) ({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({filename: global.log_addr })
		]
	})

