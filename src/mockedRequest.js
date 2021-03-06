var url = require('url');
var util = require('util');
var events = require('events');
var deepEqual = require('deep-equal');
var MockedResponse = require('./mockedResponse');

/**
 * MockedRequest
 */
function MockedRequest(options, expectation, callback) {
  events.EventEmitter.call(this);

  var self = this;
  var writtenData = '';

  if (typeof options === 'string') {
    options = url.parse(options);
  }

  if (typeof options === 'object') {
    if (options.url && (typeof options.url === 'string')) {
      var tempUrl = url.parse(options.url);

      for (var key in tempUrl) {
        options[key] = tempUrl[key];
      }
    } else if (options.uri && (typeof options.uri === 'object')) { // in the case of request module
      var origOptions = options;

      options = options.uri;
      options.method = origOptions.method;
      options.headers = origOptions.headers;
    }
  }

  /**
   * Overrides ClientRequest.end to try and find a matching
   * expectation for the request and issue the expected response.
   *
   * @api public
   */
  this.end = function () {
    verifyExpectation();

    var eBody = expectation.getResponse().getBody();
    var eHeaders = expectation.getResponse().getHeaders();
    var eStatusCode = expectation.getResponse().getStatusCode();

    var mResponse = new MockedResponse(eHeaders, eStatusCode);

    callback(mResponse);

    if (eBody) {
      if (typeof eBody === 'string') {
        mResponse.emit('data', eBody);
      } else if (typeof eBody === 'object') {
        mResponse.emit('data', JSON.stringify(eBody));
      }
    }

    mResponse.emit('end');
  };

  /**
   * Overrides ClientRequest.write to capture the request body.
   *
   * @param {String} data
   * @api public
   */
  this.write = function (data) {
    writtenData += data;
  };

  /**
   * Returns the actual href of the request.
   */
  var getActualHref = function () {
    var host = options.host;

    if (!options.host) {
      host = options.hostname + (options.port ? ':' + options.port : '');
    }

    var path = options.path || '/';
    var protocol = options.protocol || (options.port === 443 ? 'https:' : 'http:');

    if (protocol[protocol.length - 1] !== ':') {
      protocol += ':';
    }

    var href = (options.method ? options.method : 'GET').toUpperCase();
    href += ' ';
    href += protocol;
    href += '//';
    href += host;
    href += path;

    return href;
  };

  /**
   * Determines if the actual request satisfies the expectations.
   *
   * @api private
   */
  var verifyExpectation = function () {
    var aHref = getActualHref();
    var aHeaders = options.headers;
    var aBody = writtenData;

    var eHref = expectation.getHref();
    var eHeaders = expectation.getHeaders();
    var eBody = expectation.getBody();
    
    // validate methods
    if (eHref !== aHref) {
      throw new Error('Expected "' + eHref + '", but was "' + aHref + '"');
    }

    // check the case where expected headers were defined
    // but no headers were sent in the actual request
    if ((eHeaders && Object.keys(eHeaders).length > 0) && !(aHeaders && Object.keys(aHeaders).length > 0)) {
      throw new Error('There were expected headers, but the actual request contained none.');
    }

    // verify expected headers
    for (var key in eHeaders) {
      if (!aHeaders[key]) {
        throw new Error('Request does not contain expected header "' + key + '"');
      } else if (aHeaders[key] !== eHeaders[key]) {
        throw new Error('Value of header "' + key + '" expected to be "' + eHeaders[key] + '", but was "' + aHeaders[key] + '"');
      }
    }

    // check the case where an expected body was 
    // defined but the actual request didn't have one
    if (eBody && (!aBody || aBody.length === 0)) {
      throw new Error('There was an expected request body, but the actual request did not contain one.');
    }

    // verify the request body
    if (typeof eBody === 'string') {
      if (eBody.toUpperCase() !== aBody.toUpperCase()) {
        throw new Error('The request did not contain the expected body. Expected: "' + eBody + '", Actual: "' + aBody + '"');
      }
    }
    else if (typeof eBody === 'object') {
      try {
        aBody = JSON.parse(aBody);
      } catch (err) {
        throw new Error('The expected request body was an object, but the actual request body was invalid JSON.\n\nExpected: "' + JSON.stringify(eBody, null, 2) + '"\n\nActual: "' + aBody + '"');
      }

      if (!deepEqual(aBody, eBody)) {
        throw new Error('The expected request body does not equal the actual request body.\n\nExpected: "' + JSON.stringify(eBody, null, 2) + '"\n\nActual: "' + JSON.stringify(aBody, null, 2) + '"');
      }
    }
  };
}

/**
 * Inherits from EventEmitter
 */
util.inherits(MockedRequest, events.EventEmitter);

/**
 * Expose
 */
module.exports = MockedRequest;