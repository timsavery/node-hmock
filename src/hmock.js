var http = require('http');
var https = require('https');
var MockedRequest = require('./mockedRequest');
var RequestExpectation = require('./requestExpectation');

/**
 * hmock
 */
function hmock() {
  // expectation collection
  expectations = [];
  
  /**
   * Overrides http.request and https.request with a mocks and stores the originals in http._request and https._request respectivly.
   */
  this.mock = function () {
    // save the original
    http._request = http.request;
    https._request = https.request;
  
    /**
    * Override http.request
    *
    * DISCLAIMER: I know most people think this is a horrible
    *             practice; I agree, but at the end of the day
    *             this gets the job done and it is only meant 
    *             to be used during unit testing anyway.
    */
    http.request = function mockRequest(options, callback) {
      return new MockedRequest(options, expectations.shift(), callback);
    };
  
    /**
    * Override https.request
    *
    * DISCLAIMER: SEE ABOVE
    */
    https.request = function mockRequest(options, callback) {
      return new MockedRequest(options, expectations.shift(), callback);
    };
  };
  
  /**
   * Creates and returns a new expectation to be configured.
   *
   * @api public
   */
  this.expect = function () {
    var e = new RequestExpectation();

    expectations.push(e);

    return e;
  };

  /**
   * Verifies that all defines expectations have been satisfied.
   *
   * @api public
   */
  this.verify = function () {
    var verified = expectations.length === 0;

    expectations = [];

    if (!verified) {
      throw new Error('Not all expectations were met during the test.');
    }
  };
  
  /**
   * Restores the original request functions to http and https respectivly.
   */
  this.restore = function () {
    restoreRequest(http);
    restoreRequest(https);
  };
  
  function restoreRequest (agnosticHttp) {
    if (agnosticHttp.request.name === 'mockRequest' && agnosticHttp._request) {
      agnosticHttp.request = agnosticHttp._request;
      delete agnosticHttp._request;
    }
  }
  
}

/**
 * Expose
 */
module.exports = new hmock();