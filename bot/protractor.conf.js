const testUtils = require('./test-utils');
const isDocker = testUtils.isDocker();

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
		// browser.ignoreSynchronization = true;
		browser.driver.get(envVars.host);

		return browser.getProcessedConfig().then((/*config*/) => {
			// console.log('config:', config);
		});
	},

	specs: [
		'scenarios.js'
	],

	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: (!isDocker) ? [
				/*'--headless',*/
				'--disable-gpu',
				'--window-size=1680x1024'
			] : [
				'--headless',
				'--disable-gpu',
				'--window-size=1680x1024',
				'--no-sandbox'
			]
		}
	},

	chromeOnly: true,

	directConnect: true,

	baseUrl: envVars.host,

	framework: 'jasmine',

	plugins: [
		{
			package: 'jasmine2-protractor-utils',
			disableHTMLReport: false,
			disableScreenshot: false,
			screenshotOnExpectFailure: true, // default: false
			screenshotOnSpecFailure: true, // default: false
			screenshotPath: 'logs/e2e/screenshots', // default: 'reports/screenshots'
			clearFoldersBeforeTest: true, // default: false
			htmlReportDir: 'logs/e2e/report', // default: 'reports/htmlReports'
			failTestOnErrorLog: {
				failTestOnErrorLogLevel: 5000, // default: 900
				// excludeKeywords: []
			}
		}
	],

	allScriptsTimeout: 30000,

	getPageTimeout: 30000,

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}

};
