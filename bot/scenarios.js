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

	it('should load an index page with five images', () => {
		browser.get(this.envVars.host);
		browser.getCurrentUrl().then((url) => {
			expect(url).toMatch(this.envVars.host);

			element.all(by.css('a[id*="github"]')).then((items) => {
				expect(items.length).toEqual(1);
			});

			element.all(by.css('a[id*="codepen"]')).then((items) => {
				expect(items.length).toEqual(1);
			});

			element.all(by.css('a[id*="codewars"]')).then((items) => {
				expect(items.length).toEqual(1);
			});

			element.all(by.css('a[id*="hackerrank"]')).then((items) => {
				expect(items.length).toEqual(1);
			});
		});
	});

});
