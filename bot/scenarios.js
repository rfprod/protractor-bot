'use strict';

/*
*	API DOC: http://www.protractortest.org/#/api
*/

describe('Bot: ', () => {

	require('dotenv').load();
	this.envVars =  {
		host: process.env.HOST,
		login: process.env.LOGIN,
		password: process.env.PASSWORD,
		passes: process.env.PASSES
	};

	this.EC = protractor.ExpectedConditions;

	console.log('envVars', this.envVars);

	it('should load an index page, input login on users behalf and take action', () => {
		browser.get(this.envVars.host);
		browser.getCurrentUrl().then((url) => {
			expect(url).toMatch(this.envVars.host);

			const form = {
				username: element.all(by.css('input[id*=loginform-username]')),
				password: element.all(by.css('input[id*=loginform-password]'))
			};
			expect(form.username.count()).toEqual(1);
			expect(form.password.count()).toEqual(1);

			/*
			*	TODO
			*	- login on user's behalf using creadentials: this.envVars.login, this.envVars.password
			*	- press needed buttons to navigate to desired view or just load it using browser.get(this.envVars.host + '/desired-path-relative-to-host')
			*	- repeat action this.envVars.passes number of times
			*/
		});
	});

});
