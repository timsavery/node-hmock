var url = require('url')
	, http = require('http')
	, MockedRequest = require('./mockedRequest')
	, MockedResponse = require('./mockedResponse')
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

		req.on('hit', function(id) {
			var idx = -1;

			for (var i = 0; i < http._expectations.length; i++) {
				if (http._expectations[i].getId() == id) {
					idx = i;
					break;
				}
			}

			http._expectations.pop(idx);
		});

		req.on('unexpected', function(params) {
			http._expectations = [];

			throw new Error('Unexpected request: '.concat(params.method.toUpperCase()).concat(' ').concat(params.href));
		});

		return req;
	};

	this.expect = function() {
		var e = new RequestExpectation();

		http._expectations.push(e);

		return e;
	};

	this.verifyExpectations = function() {
		if (http._expectations.length > 0) {
			http._expectations = [];

			throw new Error('Not all expectations were met during the previous test.');
		}
	};
};

/**
 * Expose
 */
module.exports = new hmock();