'use strict';

/**
 * API DOC: http://www.protractortest.org/#/api
 */

describe('Bot: ', () => {
  require('dotenv').config();
  this.envVars = {
    host: process.env.HOST,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
    passes: process.env.PASSES,
  };

  this.EC = protractor.ExpectedConditions;

  console.log('envVars', this.envVars);

  it('should load an index correctly', () => {
    browser.get(this.envVars.host);
    browser.getCurrentUrl().then((url) => {
      expect(url).toMatch(this.envVars.host);

      element.all(by.css('app-index[class*="mat-body-1"]')).then((items) => {
        expect(items.length).toEqual(1);
      });
    });
  });
});
