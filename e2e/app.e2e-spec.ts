import { browser, element, by } from 'protractor';

describe('QuickStart E2E Tests', function () {

  let expectedMsg = 'My IgniteUI Angular2 App';


  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
        var txt =  browser.executeScript('return document.getElementById("mainheader").innerHTML;');
        expect(txt).toEqual(expectedMsg);
  });

});
