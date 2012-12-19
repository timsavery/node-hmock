var http = require('http')
	, MockedRequest = require('./mockedRequest')
	, RequestExpectation = require('./requestExpectation');

/**
 * hmock
 */
function hmock() {
	// expectation collection
	expectations = [];

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
		var req = new MockedRequest(options, expectations, callback);

		req.on('unexpected', function(params) {
			throw new Error('Unexpected request: '.concat(params.method.toUpperCase()).concat(' ').concat(params.href));
		});

		return req;
	};
	
	this.expect = function() {
		var e = new RequestExpectation();

		expectations.push(e);

		return e;
	};

	this.verifyExpectations = function() {
		var verified = true;

		for (var i = 0; i < expectations.length; i++) {
			if (!expectations[i].isSatisfied()) {
				verified = false;
				break;
			}
		}

		expectations = [];

		if (!verified) {
			throw new Error('Not all expectations were met during the test.');
		}
	};
};

/**
 * Expose
 */
module.exports = new hmock();
module.exports.RequestExpectation = RequestExpectation;