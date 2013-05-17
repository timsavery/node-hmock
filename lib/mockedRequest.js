var url = require('url'),
		util = require('util'),
		events = require('events')
		deepEqual = require('deep-equal'),
		MockedResponse = require('./mockedResponse');

/**
 * MockedRequest
 */
function MockedRequest(options, expectation, callback) {
	events.EventEmitter.call(this);

	if (typeof options === 'string') {
		options = url.parse(options);
	}

	if (typeof options === 'object') {
		if (options.url && (typeof options.url === 'string')) {
			var tempUrl = url.parse(options.url);

			for (var key in tempUrl) {
				options[key] = tempUrl[key];
			}
		}
	}

	var self = this,
			writtenData = '',
			options = options,
			expectation = expectation;

	/**
	 * Overrides ClientRequest.end to try and find a matching
	 * expectation for the request and issue the expected response.
	 *
	 * @api public
	 */
	this.end = function() {
		verifyExpectation();

		var eBody = expectation.getResponse().getBody(),
				eHeaders = expectation.getResponse().getHeaders(),
				eStatusCode = expectation.getResponse().getStatusCode();

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
	this.write = function(data) {
		writtenData += data;
	};

	/**
	 * Returns the actual href of the request.
	 */
	function getActualHref() {
		var hostname = ((options.hostname || options.host) || 'localhost'),
				port = options.port || 80,
				path = options.path || '/',
				protocol = options.protocol || 'http:';

		if (protocol[protocol.length - 1] !== ':') {
			protocol += ':';
		}

		var href = protocol.concat('//').concat(hostname);

		if (port != 80) {
			href = href.concat(':').concat(port);
		}

		return href.concat(path);
	};

	/**
	 * Gets the method of the actual request.
	 */
	function getActualMethod() {
		return options.method ? options.method : 'GET';
	};

	/**
	 * Determines if the actual request satisfies the expectations.
	 *
	 * @api private
	 */
	function verifyExpectation() {
		var aHref = getActualHref(),
				aMethod = getActualMethod(),
				aHeaders = options.headers,
				aBody = writtenData;

		var eBody = expectation.getBody(),
				eHeaders = expectation.getHeaders(),
				eHref = expectation.getHref(),
				eMethod = expectation.getMethod();

		// validate methods
		if (eMethod.toUpperCase() !== aMethod.toUpperCase()) {
			throw new Error('Expected request method to be "' + eMethod + '", but was "' + aMethod + '"')
		}

		// validate hrefs
		if (eHref.toUpperCase() !== aHref.toUpperCase()) {
			throw new Error('Expected url to be "' + eHref + '", but was "' + aHref + '"');
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
				throw new Error('The expected request body was an object, but the actual request body was invalid JSON. Expected: "' + JSON.stringify(eBody) + '", Actual: "' + aBody + '"');
			}

			if (!deepEqual(aBody, eBody)) {
				throw new Error('The expected request body does not equal the actual request body. Expected: "' + JSON.stringify(eBody) + '", Actual: "' + JSON.stringify(aBody) + '"');
			}
		}
	};
};

/**
 * Inherits from EventEmitter
 */
util.inherits(MockedRequest, events.EventEmitter);

/**
 * Expose
 */
module.exports = MockedRequest;