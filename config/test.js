var exec = require('child_process').exec
var terminal = require('child_process').spawn('cmd')
// var location =  "\"c:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe\""
//var location =  "\""+"%PROGRAMFILES(X86)%\\Mozilla Firefox\\firefox.exe"+"\""
var location =  "\""+"%PROGRAMFILES(X86)%/Mozilla Firefox/firefox.exe"+"\""
// terminal.stdout.on('data', function (data) {
	// console.log('stdout: ' + data)
// })

// terminal.on('exit', function(code) {
	// console.log('child process exited with code ' + code);
// });

// setTimeout(function() {
	// console.log('Sending stdin to terminal')
	// terminal.stdin.write(location + '\n')
	// terminal.stdin.end()
// }, 1000)

console.log(location)
child = exec(location, function (error, stdout, stderr) {
	console.log('stdout: ' + stdout)
	console.log('stderr: ' + stderr)
	if (error!== null) {
		console.log('exec error: ' + error)
	}
});