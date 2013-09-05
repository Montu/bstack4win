var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
	name: "bstack_service_3",
	description: "This is bstack server.",
	script: 'C:\\Users\\Akshay\\Documents\\Workspace\\bstack4win\\src\\bstack_server.js'
	});

svc.user.domain = 'WORKGROUP';
svc.user.account = 'akshay';
svc.user.password = 'password';
// Listen for the "install" event, which indicates the
// process is available as a service

svc.on('install', function() {
	svc.start();
});

svc.install();
