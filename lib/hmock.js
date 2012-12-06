var log = require('winston')
	, http = require('http')
	, MockedRequest = require('./mockedRequest')
	, RequestExpectation = require('./requestExpectation');

/**
 * hmock
 */
function hmock() {
	// save the expectations
	http._expectations = [];

	// save the original
	http._request = http.request;

	/**
	 * Override http.request
	 *
	 * DISCLAIMER: I know most people think this is a horrible
	 * 						 practice; I agree, but at the end of the day
	 * 						 this gets the job done and it is only meant 
	 * 						 to be used during unit testing anyway.
	 */
	http.request = function(options, callback) {
		var req = new MockedRequest(options, callback);

		req.on('unexpected', function(params) {
			throw new Error('Unexpected request: '.concat(params.method.toUpperCase()).concat(' ').concat(params.href));
		});

		return req;
	};

	this.reset = function() {
		http._expectations = [];
	};

	this.expect = function() {
		var e = new RequestExpectation();

		http._expectations.push(e);

		return e;
	};

	this.verifyExpectations = function() {
		for (var i = 0; i < http._expectations.length; i++)
			if (!http._expectations[i].isSatisfied())
				throw new Error('Not all expectations were met during the previous test.');
	};
};

/**
 * Expose
 */
module.exports = new hmock();
module.exports.RequestExpectation = RequestExpectation;