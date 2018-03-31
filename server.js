'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const srvInfo = require('./server/utils/srv-info.js');
const routes = require('./server/routes/index.js');
const reporter = require('./server/reporter/index.js');
const app = express();
const expressWs = require('express-ws')(app);
const fs = require('fs');

require('dotenv').load();

process.title = 'protractorBot';

const cwd = __dirname;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(compression({
	threshold: 0,
	level: -1
}));

app.use('/logs', express.static(cwd + '/logs'));

app.use((req, res, next) => {
	const regX = /(logs|fonts|e2e|report|html|css|js)/;
	if (regX.test(req.path)) {
		return next();
	} else {
		res.sendFile(cwd + '/logs/index.html');
	}
});

// headers config for all Express routes
app.all('/*', function(req, res, next) {
	// CORS headers
	res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain if needed
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	// add headers to be exposed
	res.header('Access-Control-Expose-Headers', 'Views');
	// cache control
	res.header('Cache-Control', 'public, no-cache, no-store, must-ravalidate, max-age=0');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	// handle OPTIONS method
	if (req.method == 'OPTIONS') res.status(200).end();
	else next();
});

/*
* nodemailer usage notice:
* To use Gmail you may need to configure "Allow Less Secure Apps" (https://www.google.com/settings/security/lesssecureapps)
* in your Gmail account unless you are using 2FA
* in which case you would have to create an Application Specific password (https://security.google.com/settings/security/apppasswords).
* You also may need to unlock your account with "Allow access to your Google account" (https://accounts.google.com/DisplayUnlockCaptcha)
* to use SMTP.
*/
let smtpConfig = {
	host: process.env.MAILER_HOST,
	port: process.env.MAILER_PORT,
	secure: true, // use SSL
	auth: {
		type: 'OAuth2',
		user: process.env.MAILER_EMAIL,
		clientId: process.env.MAILER_CLIENT_ID,
		clientSecret: process.env.MAILER_CLIENT_SECRET,
		refreshToken: process.env.MAILER_REFRESH_TOKEN,
		accessToken: 'empty'
	}
};
// smtpConfig.proxy = 'socks5://ip-address:port/';

/*
*	TODO: fix mail transporter
*/

const mailTransporter = nodemailer.createTransport(smtpConfig);
mailTransporter.verify((err, success) => {
	if (err) {
		console.log('Mail transporter diag error >>', err);
	} else {
		console.log('Mail transporter diag success >>', success);
	}
});

routes(app, cwd, fs, srvInfo);

reporter(cwd, schedule, mailTransporter);

const port = process.env.PORT || 8080,
	ip = process.env.IP;

function terminator(sig) {
	if (typeof sig === 'string') {
		console.log(`\n${Date(Date.now())}: Received signal ${sig} - terminating app...\n`);
		process.exit(0);
		console.log(`${Date(Date.now())}: Node server stopped`);
	}
}

(() => {
	/*
	*   termination handlers
	*/
	process.on('exit', () => { terminator('exit'); });
	// Removed 'SIGPIPE' from the list - bugz 852598.
	['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
		'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
	].forEach((element) => {
		process.on(element, () => {
			terminator(element);
		});
	});
})();

if (ip) {
	app.listen(port, ip, () => {
		console.log(`\n# > START > IP > Node.js listening on ${ip}:${port}...\n`);
	});
} else {
	app.listen(port, () => {
		console.log(`\n# > START > NO IP > Node.js listening on port ${port}...\n`);
	});
}
