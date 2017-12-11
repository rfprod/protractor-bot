require('dotenv').load();

console.log('process.env', process.env.HOST);
let envVars =  {
	host: process.env.HOST,
	login: process.env.LOGIN,
	password: process.env.PASSWORD,
	passes: process.env.PASSES
};

exports.config = {

	env: envVars,

	onPrepare: () => {
		// browser.angularAppRoot('html');
		browser.ignoreSynchronization = true;
		browser.driver.get(envVars.host);
	},

	specs: [
		'scenarios.js'
	],

	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: [ /*'--headless', */'--disable-gpu', '--window-size=1024x768' ]
		}
	},

	chromeOnly: true,

	directConnect: true,

	baseUrl: envVars.host,

	framework: 'jasmine',

	allScriptsTimeout: 30000,

	getPageTimeout: 30000,

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}

};
